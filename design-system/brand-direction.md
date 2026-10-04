# Lease Buddy — Brand Direction

**Version:** 1.0  
**Author:** Jo (UI/UX Design Agent)  
**Date:** 2026-10-04

---

## Palette Decision: Light Mode ✅

**Recommendation: Light mode. Full stop.**

### Rationale

The existing dark mode (`#0f1117` bg, `#6366f1` indigo) was a development default, not a brand decision. It contradicts every stated brand directive:

- "Friendly and approachable" → dark mode reads as technical/developer tool
- "Notepad aesthetic" → notepads are light. The metaphor breaks on dark backgrounds.
- "Consumer advocate, not dealership-adjacent" → dark fintech UIs feel like dealer software. Wrong signal.
- Dense numerical data legibility → light mode wins. Black text on white outperforms white on near-black at small sizes, especially for tabular financial data.

### The Tradeoff (SicTransit must sign off)

The existing web app is dark. Migrating it means Dev rethemes the full component set. This is real work. But keeping dark mode means brand direction and product are permanently misaligned. **Light mode is worth the retheme cost.**

### Why Not Dual Mode

Dual mode doubles token sets, doubles QA surface, and fragments the brand. One great light experience. Dark mode is a v2 consideration if user research demands it.

---

## Color Palette

### Personality
Warm, calm, legible. A well-designed notebook: cream pages, precise ink lines, one confident accent that signals "you're in control."

### Primitives

| Name        | Hex       | Usage                                   |
|-------------|-----------|------------------------------------------|
| Ink         | `#1A1A1A` | Primary text, headings                  |
| Ink Muted   | `#6B6B6B` | Secondary text, labels                  |
| Ink Faint   | `#A8A8A8` | Placeholder, disabled                   |
| Paper       | `#F8F6F1` | Primary background (warm off-white)     |
| Paper 2     | `#F0EDE6` | Secondary surfaces, cards               |
| Paper 3     | `#E8E4DC` | Dividers, borders                       |
| White       | `#FFFFFF` | Input fields, overlaid surfaces         |
| Sage        | `#4A7C6F` | Primary accent — confirm, go, success   |
| Sage Light  | `#EBF4F1` | Accent backgrounds, highlights          |
| Sage Dark   | `#2E5248` | Hover/active on accent                  |
| Amber       | `#C17C2A` | Warning, caution                        |
| Amber Light | `#FFF4E0` | Warning backgrounds                     |
| Red         | `#C0392B` | Error, destructive                      |
| Red Light   | `#FDECEA` | Error backgrounds                       |
| Indigo      | `#6366F1` | Data visualization only (visual DNA link to prototype) |
| Indigo Light| `#EEEEFF` | Chart/graph backgrounds                 |

### Semantic Aliases

| Token                     | Maps To     |
|---------------------------|-------------|
| color.bg.default          | Paper       |
| color.bg.subtle           | Paper 2     |
| color.bg.muted            | Paper 3     |
| color.bg.inverse          | Ink         |
| color.surface.default     | White       |
| color.text.default        | Ink         |
| color.text.muted          | Ink Muted   |
| color.text.faint          | Ink Faint   |
| color.text.inverse        | White       |
| color.text.accent         | Sage        |
| color.border.default      | Paper 3     |
| color.border.strong       | Ink Muted   |
| color.accent.default      | Sage        |
| color.accent.subtle       | Sage Light  |
| color.accent.strong       | Sage Dark   |
| color.status.warning      | Amber       |
| color.status.warning.bg   | Amber Light |
| color.status.error        | Red         |
| color.status.error.bg     | Red Light   |
| color.status.success      | Sage        |
| color.status.success.bg   | Sage Light  |
| color.data.primary        | Indigo      |
| color.data.primary.bg     | Indigo Light|

---

## Typography System

### Font Family: Inter

Inter wins over DM Sans for one decisive reason: **tabular numerics**. `font-variant-numeric: tabular-nums` is built into Inter and is non-negotiable for a financial app where numbers must align in columns. Free, variable font, excellent mobile legibility.

### Type Scale (4px base grid)

| Token        | Size  | Weight | Line Height | Use                             |
|--------------|-------|--------|-------------|----------------------------------|
| display-xl   | 32px  | 700    | 1.2         | Hero monthly payment number      |
| display-lg   | 24px  | 600    | 1.25        | Section totals, key outputs      |
| display-md   | 20px  | 600    | 1.3         | Card headings                    |
| body-lg      | 16px  | 400    | 1.5         | Primary body copy                |
| body-md      | 14px  | 400    | 1.5         | Standard body, form labels       |
| body-sm      | 13px  | 400    | 1.5         | Helper text, secondary info      |
| label-lg     | 14px  | 500    | 1.4         | Input labels, nav items          |
| label-md     | 12px  | 500    | 1.4         | Chip labels, tags                |
| label-sm     | 11px  | 500    | 1.3         | Table headers, micro labels      |
| mono-md      | 14px  | 400    | 1.5         | Money factor, precise values     |
| mono-sm      | 12px  | 400    | 1.4         | Worksheet numbers                |

**Rule:** All financial figures use `font-variant-numeric: tabular-nums lining-nums`. No exceptions.

---

## Iconography

**Library:** Lucide Icons (MIT, open source)  
**Stroke weight:** 1.5px  
**Default size:** 20px (touch targets minimum 24px)  
**Style:** Outline only. No filled variants. Consistent with the minimalist line aesthetic.

Key icons: car outline (vehicle), calculator (math), message-circle (negotiation), bar-chart-2 (breakdown), chevron-down (expand), info (tooltip), alert-triangle (warning), check-circle (success).

---

## Motion & Interaction

- **Fast:** 120ms — hover, focus ring
- **Medium:** 200ms — state transitions, accordion expand
- **Slow:** 280–320ms — bottom sheets, modals
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` standard; `cubic-bezier(0, 0, 0.2, 1)` ease-out for overlays
- **Payment output:** Subtle counter animation (200ms) when calculation updates — confirms to user the math ran
- **No bounce. No spring. No overshoot.** This is a financial tool. Playful physics undermines trust.

---

## Voice & Tone

Clear, direct, on the user's side. A knowledgeable friend who knows car leasing — not a lawyer, not a dealer.

- Speak plainly: "Monthly payment" not "periodic obligation"
- Be honest about complexity without being alarming
- Warn protectively: GAP insurance note is user advocacy, not a legal disclaimer
- Labels ≤ 3 words. Tooltips for anything that needs explanation.

✅ "Residual % — Set by the lender. Higher is better for you."  
✅ "Ask your dealer for the buy-rate money factor."  
✅ "⚠ Down payments aren't covered by GAP insurance if the car is totaled."  
❌ "Please enter the capitalized cost reduction amount"

---

## Logo & Wordmark

### Mark: Ruled-Lines Notepad Icon
A minimal geometric icon: portrait rectangle, 2px corner radius, 4 horizontal ruled lines inside, bottom line terminates with a small checkmark or `$` endpoint. Monochromatic. Works at 16px (favicon) through 48px (splash). Not a car. Not a dollar sign. The notepad metaphor in its simplest geometric form.

### Wordmark
`lease buddy` — all lowercase, Inter.
- `lease` — Inter Regular (400)
- `buddy` — Inter SemiBold (600)

Weight contrast creates hierarchy without color. Mark left of wordmark, 8px gap.

### Color Treatments
| Context        | Mark          | Wordmark      |
|----------------|---------------|----------------|
| Light bg       | Sage #4A7C6F  | Ink #1A1A1A   |
| Dark / inverse | White         | White          |
| App icon       | White on Sage bg | —           |
| Monochrome     | Ink           | Ink            |

---

## Open Decisions for SicTransit

| # | Decision | Priority |
|---|----------|----------|
| 1 | **Confirm light mode direction** — this doc recommends it, needs your sign-off before Dev rethemes | BLOCKING |
| 2 | Logo mark SVG execution — Jo can spec in Figma once MCP is connected | High |
| 3 | App name finalized as "Lease Buddy"? Any legal/trademark check needed? | Medium |
| 4 | Indigo retained for data viz only — confirm or cut entirely | Low |
