# Lease Buddy Web — Technical Reference

Single-file interactive lease calculator. No build step, no server required.
All math runs locally in the browser.

---

## 1. Logic Manifest — Core Lease Formulas

These are the formulas implemented in `LeaseCalc.calculate()`. Every number in
the UI is derived from this sequence in order.

### Adjusted Cap Cost

```
Adjusted Cap Cost = Negotiated Cap Cost
                  − Down Payment
                  − Trade-in Value
                  − Manufacturer Rebates
                  + Doc Fee
                  + Acquisition Fee  (if capitalized)
```

> **Why rebates are a separate line:** Rebates are manufacturer money, not dealer
> discount. They must appear as a distinct subtraction *after* the negotiated cap
> cost so users can verify the dealer did not absorb them into the selling price.

### Residual Value

```
Residual Value = MSRP × Residual %
```

Set by the lender/manufacturer. Not negotiable. Higher residual = lower payment.

### Depreciation Fee (monthly)

```
Depreciation Fee = (Adjusted Cap Cost − Residual Value) ÷ Term (months)
```

The portion of the car's value consumed each month.

### Rent Charge / Finance Fee (monthly)

```
Finance Fee = (Adjusted Cap Cost + Residual Value) × Money Factor
```

The monthly interest cost — analogous to interest on a loan. Commonly called
the "rent charge" on dealer worksheets.

### Base Payment (pre-tax)

```
Base Payment = Depreciation Fee + Finance Fee
```

### Monthly Payment (with tax — Monthly method)

```
Monthly Payment = Base Payment × (1 + Tax Rate)
```

See Section 2 for other tax methods.

### Effective APR

```
Effective APR = Money Factor × 2,400
```

Approximate conversion only. Dealers sometimes quote a marked-up money factor
without disclosure — the effective APR makes the cost visible.

### Due at Signing

```
Due at Signing = First Month Payment
              + Acquisition Fee  (if not capitalized)
              + Down Payment
              + Upfront Tax      (if Full Sale Price or Upfront Total method)
```

### Total Cost of Lease

```
Total Cost = (Monthly Payment × Term)
           + Down Payment
           + Acquisition Fee  (if not capitalized)
           + Disposition Fee
           + Upfront Tax      (if applicable)
```

### Backsolve — Maximum Cap Cost from Target Payment

Algebraic inverse of the payment formula. Given a target monthly payment,
solves for the maximum adjusted cap cost that hits it:

```
Pre-Tax Payment = Target Payment ÷ (1 + Tax Rate)   [Monthly method only]
                  Target Payment                      [Full Sale / Upfront methods]

Target Adj Cap Cost = (Pre-Tax Payment − Residual × (MF − 1/Term))
                    ÷ (1/Term + MF)

Max Cap Cost = Target Adj Cap Cost
             − Doc Fee
             − Acquisition Fee  (if capitalized)
             + Down Payment + Trade-in + Rebates
```

This is the "walk away number" — the most a user should pay for the car to hit
their target monthly payment.

---

## 2. Tax Presets — Three Methods

Selected via the Tax Method segmented control. Default: **Monthly**.

### Monthly (default)

**Formula:**
```
Monthly Tax    = Base Payment × Tax Rate
Monthly Payment = Base Payment + Monthly Tax
Total Tax       = Monthly Tax × Term
```

**Affects:** Monthly payment, total cost. Does not add to due-at-signing beyond
the first month's tax.

**When it applies:** Most US states. The standard method for consumer auto leases.

**Backsolve:** Tax rate is inverted before solving (`Pre-Tax = Target ÷ (1 + rate)`).

---

### Full Sale Price

**Formula:**
```
Upfront Tax     = Cap Cost × Tax Rate   (or Cap Cost − Rebates, if rebate not taxable)
Monthly Payment = Base Payment           (no tax component)
Due at Signing += Upfront Tax
Total Cost     += Upfront Tax
```

**Affects:** Due at signing and total cost only. Monthly payment is the pre-tax
base payment.

**When it applies:** Texas, Minnesota, Illinois, and a small number of other
states that tax the full selling price at point of sale rather than spreading
tax across monthly payments.

**Backsolve:** Tax multiplier = 1 (monthly payment has no tax component).

---

### Upfront Total

**Formula:**
```
Total Lease Payments = Base Payment × Term
Upfront Tax          = Total Lease Payments × Tax Rate
Monthly Payment      = Base Payment           (no tax component)
Due at Signing      += Upfront Tax
Total Cost          += Upfront Tax
```

**Affects:** Due at signing and total cost only. Monthly payment is the pre-tax
base payment.

**When it applies:** Less common. Used in some state lease structures where tax
on the full lease obligation is collected upfront.

**Backsolve:** Tax multiplier = 1 (same as Full Sale Price — monthly payment
has no tax component).

---

### Taxable Rebate Toggle

Located next to the Manufacturer Rebates input. Checkbox, default OFF.

| State | Effect on taxable base |
|-------|------------------------|
| OFF (default) | Rebate reduces adjusted cap cost before tax base is established. Rebate is not taxed. |
| ON | Rebate amount is added back into the taxable base before tax is calculated. |

**Monthly method + taxable rebate ON:**
```
Taxable Base = Base Payment + (Rebates ÷ Term)
Monthly Tax  = Taxable Base × Tax Rate
```

**Full Sale Price + taxable rebate ON:**
```
Taxable Base = Cap Cost   (rebate not subtracted)
Upfront Tax  = Cap Cost × Tax Rate
```

**Upfront Total + taxable rebate ON:**
```
Taxable Base = (Base Payment × Term) + Rebates
Upfront Tax  = Taxable Base × Tax Rate
```

> Note: Some states require manufacturer rebates to be included in the taxable
> base. Check your state's rules before advising users.

---

## 3. Architecture — Real-time Updates & State

### Single-file, no framework

The entire application is one `index.html` file. No build step, no bundler,
no framework. Vanilla DOM manipulation with direct value reads and writes.

**Rationale:** The single-file constraint eliminates the need for a module
system or build pipeline. The number of reactive values (~15 inputs, ~30 outputs)
is well within the range where direct DOM manipulation outperforms any
framework overhead. No virtual DOM needed.

### Input/slider sync

Each major input has a paired `<input type="range">` slider and a number field.
Both fire the same `update()` handler on `input` events:

```
slider.addEventListener("input", () => {
  numberInput.value = slider.value;
  update();
});
numberInput.addEventListener("input", () => {
  slider.value = numberInput.value;
  update();
});
```

The Money Factor slider uses an integer scale (1–500) mapped to the actual
money factor range (0.00001–0.00500) via division by 100,000.

### `calculate()` flow

```
readInputs()          → collect all current values from DOM
LeaseCalc.calculate() → run full math sequence (see Section 1)
updateHero()          → monthly payment, due-at-signing, total cost
updateBacksolve()     → Budget-to-Deal panel
updateCostBar()       → stacked bar widths, stat cards
updateWorksheet()     → step-by-step verification lines
updateTaxAudit()      → plain-English tax breakdown
```

Called on every input event (keystrokes and slider drags). No debouncing —
the math is synchronous and fast enough for real-time feedback at this scale.

### `backsolve()` flow

Algebraic inverse of `calculate()`. Called from `updateBacksolve()` with the
current target payment value.

1. Invert tax (if Monthly method)
2. Solve the linear payment equation for adjusted cap cost
3. Strip fees to recover negotiated cap cost
4. Run `calculate()` at the solved cap cost to verify (round-trip check)
5. Push max cap cost, discount from MSRP, and verified payment to DOM

### ZIP lookup flow

```
User enters ZIP → clicks "Look up" (or presses Enter)
fetch("https://api.zippopotam.us/us/{zip}")
  → parse state abbreviation from response
  → look up rate in STATE_TAX object
  → set taxRate input + slider values
  → trigger update()
  → show state name + rate in status line (green)

On failure (network error, unknown ZIP, unrecognized state):
  → show "Could not detect state — enter rate manually" (amber)
  → do not modify tax rate
```

The `detectedState` variable holds `{abbr, name, rate}` when a lookup succeeds.
It is read by `updateTaxAudit()` to show the state name in the Tax Audit panel.

### Tax Audit panel

Reads directly from the same `breakdown` object returned by `calculate()`.
No separate state. Renders after every calculation pass alongside the
Verification Worksheet.

### Tooltip system

8 terms have an `ⓘ` button (`data-tip` attribute). Click events are delegated
to `document`. A single `activeTip` variable tracks the currently open tooltip.
Click the same button again, or click anywhere outside, to dismiss.

Tooltips are positioned absolutely relative to their trigger button using
`getBoundingClientRect()` + scroll offset. Clamped to viewport width.

---

## 4. Dependencies

All external resources are loaded via CDN. No API keys required for any of them.

| Resource | URL | Purpose | Auth |
|----------|-----|---------|------|
| Tailwind CSS | `https://cdn.tailwindcss.com` | Utility-first CSS framework. No build step required. | None |
| Inter (Google Fonts) | `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700` | Primary UI typeface. Monospace (`font-mono`) used for payment figures and worksheet math. | None |
| Zippopotam API | `https://api.zippopotam.us/us/{zip}` | Free ZIP-to-state lookup. Returns state name and abbreviation. No API key, no documented rate limit. Use gracefully — one request per user action. | None |

### Evaluated and rejected

| Resource | Reason rejected |
|----------|-----------------|
| Chart.js | Evaluated for the cost driver bar. CSS `flex` widths with smooth `transition` achieved the same visual result with zero additional dependency. |

### State tax data

The `STATE_TAX` object in `index.html` is a hardcoded lookup table of
**state-level sales tax rates** for all 50 states + DC, sourced from the
Tax Foundation's 2026 state sales tax data (published July 2026).

> **Note:** These are state-level rates only. Combined state + local rates vary
> significantly by county and city. Users in high-local-tax areas should verify
> their actual rate with their state's department of revenue and override the
> auto-filled value manually.

Key rates for reference:
- Highest state rate: California (7.25%)
- Zero-rate states: Alaska, Delaware, Montana, New Hampshire, Oregon (0%)
- Lowest non-zero: Colorado (2.9%)

---

*Last updated: 2026-09-21. Update STATE_TAX rates annually or when Tax Foundation publishes new data.*
