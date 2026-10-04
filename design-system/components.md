# Lease Buddy — Component Inventory

**Version:** 1.0
**Author:** Jo — UI/UX Design Agent
**Date:** 2026-10-04
**Status:** Ready for Figma + Dev handoff

Components are organized by category. Each entry includes: name, description, variants, states, and design notes.

Token references use the CSS custom property names from `tokens.css`.

---

## Table of Contents

1. [Foundation](#1-foundation)
2. [Calculator Inputs](#2-calculator-inputs)
3. [Comparison Views](#3-comparison-views)
4. [Negotiation Assistant](#4-negotiation-assistant)
5. [Navigation](#5-navigation)
6. [Feedback States](#6-feedback-states)
7. [Overlays](#7-overlays)
8. [Typography Components](#8-typography-components)
9. [Layout Components](#9-layout-components)

---

## 1. Foundation

### 1.1 Color Chip
**Description:** Visual swatch for design system documentation only. Not a product component.
**Variants:** `square`, `circle`
**States:** Static
**Notes:** Dev-facing only.

---

### 1.2 Focus Ring
**Description:** Consistent keyboard-focus indicator applied via `:focus-visible`.
**Implementation:** `box-shadow: var(--shadow-focus)` — 3px sage ring. Error context: `var(--shadow-focus-error)`.
**Notes:** Never use `outline: none` without replacing it. Focus ring is a WCAG 2.4.7 requirement.

---

## 2. Calculator Inputs

### 2.1 Text Input
**Description:** Single-line text/number input for values like MSRP, negotiated price, fees.

**Variants:**
- `default` — standard text entry
- `currency` — prefixed with `$`, right-aligned value, tabular numerals
- `percentage` — suffixed with `%`
- `with-helper` — helper text below the input

**States:**
- `rest` — border `var(--border-default)`, bg `var(--bg-inset)`
- `focused` — border `var(--border-focus)`, shadow `var(--shadow-focus)`
- `filled` — same as rest, value color `var(--text-primary)`
- `error` — border `var(--status-error-border)`, shadow `var(--shadow-focus-error)`
- `disabled` — bg `var(--color-parchment)`, text `var(--text-disabled)`, no interaction
- `read-only` — no border, no bg, value only — used in output fields

**Design Notes:**
- Currency inputs: `$` prefix left-aligned in input, value right-aligned. Use `text-align: right` on the value. Dollar sign color: `var(--text-muted)`.
- All numeric inputs: `font-variant-numeric: tabular-nums`, `inputmode="decimal"` for mobile keyboard.
- Label sits above input, `var(--text-sm)`, `var(--weight-medium)`, `var(--text-secondary)`.
- Helper text below: `var(--text-xs)`, `var(--text-muted)`.
- Error message replaces helper text: `var(--text-xs)`, `var(--status-error-text)`.
- Height: 44px (minimum touch target). Padding: `var(--space-3)` vertical, `var(--space-4)` horizontal.
- Border radius: `var(--radius-md)`.

---

### 2.2 Slider
**Description:** Range input for continuous values — MSRP range, money factor, mileage per year, residual %.

**Variants:**
- `default` — single handle
- `with-labels` — min/max labels beneath track
- `with-current-value` — floating tooltip above handle showing live value

**States:**
- `rest` — track `var(--bg-inset)`, fill `var(--accent-muted)`, handle `var(--color-white)` with `var(--shadow-sm)`
- `active` (dragging) — handle enlarges to 24px, fill `var(--accent)`, shadow `var(--shadow-focus)`
- `disabled` — track `var(--color-parchment)`, handle `var(--color-fog)`, no interaction

**Design Notes:**
- Track height: 4px. Handle: 20px diameter at rest, 24px on active.
- Handle must have visible border: 2px `var(--accent)` — distinguishes it from background.
- Touch target for handle: minimum 44×44px regardless of visual size (use padding/pseudo-element).
- Value tooltip: appears on drag-start, dismisses on drag-end. Positioned above handle, arrow pointing down. Background `var(--bg-surface)`, text `var(--text-primary)`, `var(--text-sm)`, `var(--shadow-md)`.
- Min/max labels: `var(--text-xs)`, `var(--text-muted)`, flush to track ends.

---

### 2.3 Stepper Input
**Description:** Number input with increment/decrement buttons. Used for term (months), mileage increments.

**Variants:**
- `inline` — minus button | value | plus button in a row
- `stacked` — value above, buttons below (compact contexts)

**States:**
- `rest` — standard border treatment
- `focused` (value field) — focus ring on value field
- `at-min` — decrement button disabled
- `at-max` — increment button disabled
- `disabled` — entire component non-interactive

**Design Notes:**
- Button size: 36×36px minimum.
- Value field: center-aligned, `var(--weight-semibold)`, tabular numerals.
- Buttons: `-` and `+` symbols, `var(--text-lg)`, `var(--text-secondary)`.
- Border radius: `var(--radius-md)`.

---

### 2.4 Toggle (Switch)
**Description:** Binary on/off toggle. Used for "Capitalize Acq. Fee?", tax method switches.

**Variants:**
- `default` — label right of toggle
- `label-left` — label left, toggle right (used in form rows)
- `with-description` — label + smaller description text below label

**States:**
- `off-rest` — track `var(--color-parchment)`, handle `var(--color-white)`
- `off-hover` — track `var(--border-default)` (slightly darker)
- `on-rest` — track `var(--accent)`, handle `var(--color-white)`
- `on-hover` — track `var(--accent-hover)`
- `focused` — focus ring on track
- `disabled-off` — track `var(--color-parchment)`, handle `var(--color-fog)`, opacity 0.5
- `disabled-on` — track `var(--accent-muted)`, handle `var(--color-fog)`, opacity 0.5

**Design Notes:**
- Track: 44px × 24px, `var(--radius-full)`.
- Handle: 20px diameter, positioned 2px from edge.
- Handle transitions left↔right on toggle: `var(--duration-normal)` `var(--ease-spring)`.
- Track color transitions: `var(--duration-normal)` `var(--ease-standard)`.
- `role="switch"` and `aria-checked` required for accessibility.

---

### 2.5 Select / Dropdown
**Description:** Controlled select for Year, Make, Model, Trim, Term, Tax Method.

**Variants:**
- `native` — uses OS `<select>` element; preferred on mobile for UX
- `custom` — styled listbox for desktop; allows richer option rendering

**States:**
- `rest` — bg `var(--bg-inset)`, border `var(--border-default)`
- `open` — border `var(--border-focus)`, shadow `var(--shadow-md)` on dropdown panel
- `selected` — chevron rotates 180°
- `disabled` — text `var(--text-disabled)`, bg `var(--bg-inset)`, cursor not-allowed
- `error` — border `var(--status-error-border)`

**Design Notes:**
- Chevron icon: `chevron-down`, 16px, `var(--text-muted)`. Rotates on open.
- Dropdown panel: bg `var(--bg-surface)`, `var(--shadow-lg)`, `var(--radius-md)`, max-height 240px with scroll.
- Option items: 44px height, `var(--space-4)` horizontal padding.
- Selected option: checkmark icon right, text `var(--accent)`.
- Hover option: bg `var(--accent-subtle)`.
- Use native select on mobile by default — custom only where explicit design spec warrants it.

---

### 2.6 Number Display (Output)
**Description:** Read-only calculated output. Not an input — displays computed results.

**Variants:**
- `hero` — Monthly payment: large, centered, prominent
- `inline` — Used in rows alongside labels (depreciation, finance fee, tax)
- `delta` — Shows change from baseline with directional indicator (+ / -)

**States:**
- `calculated` — value present, normal display
- `pending` — value being computed (brief); show placeholder dash "—"
- `unavailable` — inputs incomplete; dash "—"

**Design Notes:**
- Hero: `var(--text-2xl)` or `var(--text-3xl)`, `var(--weight-bold)`, `var(--text-primary)`.
- Hero sub-line (pre-tax, due at signing): `var(--text-sm)`, `var(--text-muted)`.
- Inline: `var(--text-base)` or `var(--text-md)`, `var(--weight-semibold)`.
- Delta positive: `var(--status-success-text)`. Delta negative: `var(--status-error-text)`.
- **Number updates snap instantly** (`var(--duration-instant)`) — no counting animations.
- All values: `font-variant-numeric: tabular-nums`.

---

### 2.7 Accordion / Disclosure
**Description:** Collapsible section used for "Tax & Advanced", "Verification Worksheet", "Tax Audit".

**Variants:**
- `default` — full-width with chevron
- `bordered` — card-style bordered container
- `flush` — no card treatment, inline with content

**States:**
- `collapsed` — chevron pointing right or down (down preferred)
- `expanded` — chevron rotated 180°, content visible
- `focused` — focus ring on trigger

**Design Notes:**
- Trigger: full-width clickable area, minimum 48px height.
- Chevron: `var(--duration-normal)` `var(--ease-standard)` rotation transition.
- Content expand: height animation `var(--duration-normal)` `var(--ease-decelerate)`. Use CSS grid row expansion (`grid-template-rows: 0fr / 1fr`) for smooth height animation without JS measurement.
- Trigger label: `var(--text-base)`, `var(--weight-medium)`, `var(--text-primary)`.
- Secondary label (optional, right-aligned): `var(--text-sm)`, `var(--text-muted)` — e.g., "tap to expand".
- `aria-expanded` on trigger required.

---

### 2.8 Section Header (Form)
**Description:** Section divider within the calculator form. Labels groups of related inputs.

**Variants:**
- `default` — text label with horizontal rule
- `numbered` — step number badge + label (for wizard-style flow)
- `collapsible` — doubles as accordion trigger

**Design Notes:**
- Text: `var(--text-lg)`, `var(--weight-semibold)`, `var(--text-primary)`.
- Rule: 1px `var(--border-default)`.
- Top margin: `var(--space-8)`. Bottom margin: `var(--space-4)`.

---

## 3. Comparison Views

### 3.1 Lease Card
**Description:** Single-deal summary card. The atom of the comparison view.

**Variants:**
- `default` — standard card
- `highlighted` — accent border, "Best Deal" or "Saved" badge
- `compact` — reduced padding, smaller type for list views
- `skeleton` — loading placeholder

**States:**
- `default` — `var(--bg-surface)`, `var(--shadow-sm)`, `var(--radius-lg)`
- `hover` — `var(--shadow-md)`, subtle lift
- `selected` — `var(--border-focus)` 2px border, `var(--accent-subtle)` bg tint
- `loading` (skeleton) — animated shimmer on placeholder elements

**Design Notes:**
- Card padding: `var(--space-5)` all sides.
- Vehicle label: `var(--text-sm)`, `var(--weight-medium)`, `var(--text-muted)` — "2024 Honda Accord Sport 2.0T"
- Monthly payment: `var(--text-2xl)`, `var(--weight-bold)`, `var(--text-primary)`.
- Secondary figures (cap cost, term, mileage, MF): two-column grid, `var(--text-sm)`, label `var(--text-muted)`, value `var(--weight-medium)`.
- "Best Deal" badge: pill, `var(--accent)` bg, white text, `var(--text-xs)`, `var(--weight-semibold)`.
- Skeleton: use `var(--color-parchment)` placeholder blocks with CSS keyframe shimmer.

---

### 3.2 Comparison Grid (Side-by-Side)
**Description:** Two or more Lease Cards arranged horizontally for direct comparison. Core comparison UI.

**Variants:**
- `2-up` — two cards side by side (primary mobile layout: horizontal scroll)
- `3-up` — three cards, horizontal scroll on mobile
- `stacked` — vertical list, used on narrow viewports

**States:** Inherits from Lease Card.

**Design Notes:**
- Mobile: horizontal scroll snap. Cards: 280px minimum width, `var(--space-4)` gap.
- Scroll indicator: faint gradient fade at right edge showing more content.
- Sticky header row showing vehicle names during horizontal scroll.
- Empty slot: dashed border card with "+ Add Deal" CTA. Border: 2px dashed `var(--color-sage-300)`.

---

### 3.3 Data Table (Comparison Detail)
**Description:** Row-by-row comparison of deal components across multiple deals. Used in detailed comparison view.

**Variants:**
- `2-column` — label + single value
- `multi-column` — label + N deal values
- `with-delta` — includes a diff column showing variance from baseline

**States:**
- Row `default` — alternating bg: `var(--bg-app)` / `var(--bg-surface)`
- Row `highlighted` — `var(--accent-subtle)` bg — for rows with meaningful differences
- Row `hover` — `var(--color-sage-50)` on hover

**Design Notes:**
- Label column: `var(--text-sm)`, `var(--text-muted)`, left-aligned.
- Value columns: `var(--text-base)`, `var(--weight-medium)`, right-aligned, `font-variant-numeric: tabular-nums`.
- Delta column: colored text (positive = success-text, negative = error-text), plus/minus prefix.
- Divider lines: 1px `var(--border-default)` between rows.
- Sticky first column (label) on horizontal scroll.
- Section grouping: use `var(--text-xs)`, `var(--weight-semibold)`, `var(--tracking-widest)`, uppercase for group headers — "DEAL TERMS", "FEES", "MONTHLY BREAKDOWN".

---

### 3.4 Diff Highlight
**Description:** Inline visual indicator for values that differ meaningfully from a baseline.

**Variants:**
- `positive-diff` — green pill/tag, better than baseline
- `negative-diff` — red pill/tag, worse than baseline
- `neutral-diff` — gray, no meaningful change

**Design Notes:**
- Pill: `var(--radius-full)`, `var(--space-1)` vertical `var(--space-2)` horizontal padding.
- `var(--text-xs)`, `var(--weight-semibold)`.
- Positive: bg `var(--status-success-bg)`, text `var(--status-success-text)`.
- Negative: bg `var(--status-error-bg)`, text `var(--status-error-text)`.

---

### 3.5 Cost Driver Bar Chart
**Description:** Horizontal stacked bar showing depreciation / finance fee / tax breakdown. Already exists in the app.

**Variants:**
- `stacked` — single bar with three color segments
- `grouped` — one bar per cost component per deal (comparison view)

**Design Notes:**
- Segments: Depreciation = `var(--accent)`. Finance fee = `var(--color-sage-300)`. Tax = `var(--color-parchment)` with darker border.
- Labels below bar: `var(--text-xs)`, `var(--text-muted)`.
- Values above each segment or in legend: `var(--text-xs)`, `var(--weight-semibold)`.
- Bar height: 12px, `var(--radius-full)`.

---

## 4. Negotiation Assistant

### 4.1 Tip Card
**Description:** A callout card surfacing a negotiation insight or recommendation. Consumer-advocate voice.

**Variants:**
- `info` — general tip (sage)
- `warning` — potential issue (amber) — e.g., "This MF is marked up"
- `action` — specific action to take (sage, with CTA button)
- `success` — deal looks good (green)

**States:**
- `default` — visible
- `dismissed` — collapses/fades out
- `expanded` — additional detail revealed via disclosure

**Design Notes:**
- Border-left accent: 4px, color matches variant (accent/warning/success).
- Background: matching status `--status-*-bg` color.
- Icon: 20px, left of title, matching `--status-*-text` color.
- Title: `var(--text-base)`, `var(--weight-semibold)`.
- Body: `var(--text-sm)`, `var(--text-secondary)`, `var(--leading-relaxed)`.
- Dismiss: `x` icon, top-right, `var(--text-muted)`.
- Radius: `var(--radius-md)`.
- Padding: `var(--space-4)`.

---

### 4.2 Script Prompt
**Description:** A word-for-word script the user can read to their dealer. High utility, needs to be readable and copiable.

**Variants:**
- `condensed` — one-liner script (e.g., "What's your buy-rate money factor?")
- `full-script` — multi-sentence negotiation script with role labels
- `copyable` — includes a copy-to-clipboard button

**States:**
- `default`
- `copied` — "Copied!" confirmation for 2s after copy action

**Design Notes:**
- Distinct visual treatment from tip cards — should feel like a quoted document.
- Background: `var(--bg-inset)`, left border: 4px `var(--accent-muted)`, `var(--radius-sm)` right side.
- Text: `var(--text-sm)`, `var(--leading-relaxed)`, slightly indented.
- "You say:" label: `var(--text-xs)`, `var(--weight-semibold)`, `var(--tracking-widest)`, uppercase, `var(--text-muted)`.
- Copy button: icon-only (`copy` icon), top-right corner, `var(--text-muted)` at rest → `var(--accent)` on hover.
- "Copied!" state: check-circle icon, `var(--status-success-text)`, 2s then resets.

---

### 4.3 Negotiation Score / Deal Gauge
**Description:** A visual indicator showing how good the current deal is. Contextualizes the numbers emotionally.

**Variants:**
- `gauge` — semicircular arc from red to green, needle at current position
- `score-card` — numeric score (0–100) with label ("Fair Deal", "Excellent", "Overpriced")
- `compact` — single color-coded pill for use in cards

**States:**
- `poor` — red zone
- `fair` — amber zone
- `good` — sage zone
- `excellent` — strong sage/green zone

**Design Notes:**
- Gauge uses SVG arc, not emoji or image.
- Score label: `var(--text-xl)`, `var(--weight-bold)`. Sub-label: `var(--text-sm)`, `var(--text-muted)`.
- Avoid gamification language — keep tone factual ("Below market" not "You win!").

---

### 4.4 Chat Bubble (Wizard Alternative)
**Description:** If negotiation assistant uses a conversational UI rather than tip cards, these are the message bubbles.

**Variants:**
- `assistant` — left-aligned, `var(--bg-surface)` background
- `user` — right-aligned, `var(--accent-subtle)` background
- `system` — centered, small text, used for step transitions

**States:** Standard message states.

**Design Notes:**
- `assistant` bubble: `var(--radius-lg)` all corners except bottom-left `var(--radius-sm)`.
- `user` bubble: `var(--radius-lg)` all corners except bottom-right `var(--radius-sm)`.
- Padding: `var(--space-3)` vertical, `var(--space-4)` horizontal.
- Avoid making this feel like a chatbot — assistant messages should feel like authored tips, not AI responses.

---

### 4.5 Step Indicator (Wizard)
**Description:** Progress indicator for the negotiation wizard flow.

**Variants:**
- `dots` — simple dot progress (compact)
- `numbered` — numbered circles with connecting lines
- `labeled` — numbered circles + step labels

**States:**
- `complete` — filled `var(--accent)`, check icon
- `current` — filled `var(--accent)`, step number, pulsing ring optional
- `upcoming` — `var(--bg-inset)` fill, `var(--border-default)` border, step number `var(--text-muted)`

**Design Notes:**
- Connecting line: 2px `var(--border-default)`. Complete segments: `var(--accent-muted)`.
- Step circles: 32px diameter for numbered, 8px for dot variant.

---

## 5. Navigation

### 5.1 Bottom Tab Bar (Mobile)
**Description:** Primary navigation. Fixed to bottom of viewport on mobile.

**Tabs (4 items):**
1. Calculate (`calculator` icon) — main calculator
2. Compare (`columns` icon) — side-by-side comparison
3. Negotiate (`shield-check` icon) — negotiation assistant
4. Saved (`bookmark` icon) — saved deals

**States per tab:**
- `inactive` — icon `var(--text-muted)`, label `var(--text-xs)` `var(--text-muted)`, `var(--weight-medium)`
- `active` — icon `var(--accent)`, label `var(--text-xs)` `var(--accent)`, `var(--weight-semibold)`
- `active` indicator — small dot or pill above icon, `var(--accent)`, 4–6px

**Design Notes:**
- Height: 56px + safe area inset (CSS `env(safe-area-inset-bottom)`).
- Background: `var(--bg-surface)`, border-top: 1px `var(--border-default)`.
- Shadow: `var(--shadow-sm)` on top edge (inverted).
- Touch target per tab: full height, ~25% width (4-tab layout).
- No labels on very small screens (< 320px) — icon only.
- Active indicator: small dot (6px `var(--radius-full)`, `var(--accent)`) centered above icon.

---

### 5.2 Top App Bar (Mobile Header)
**Description:** Screen title and contextual actions. Sits at top of each screen.

**Variants:**
- `simple` — title only
- `with-back` — back chevron + title
- `with-action` — title + right action button (share, save, settings)
- `transparent` — overlays content on scroll-up

**States:**
- `default` — bg `var(--bg-surface)`, border-bottom 1px `var(--border-default)`
- `scrolled` — shadow `var(--shadow-sm)` appears on scroll

**Design Notes:**
- Height: 56px.
- Title: `var(--text-lg)`, `var(--weight-semibold)`, centered.
- Back button: 44×44px touch target, `chevron-left` icon.
- Logo lockup: horizontal, used on the calculator home screen top bar.
- Background: `var(--bg-surface)`, sticky at top.
- Safe area: includes `env(safe-area-inset-top)` padding for iOS notch.

---

### 5.3 Section Nav / Tab Strip (In-Page)
**Description:** Horizontal tabs within a screen. Used to switch between views within a section (e.g., "Calculator" / "Budget-to-Deal" within the Calculate screen).

**Variants:**
- `underline` — text tabs with active underline (primary)
- `pill` — segmented control style, filled active state

**States per item:**
- `inactive` — `var(--text-muted)`, `var(--weight-medium)`
- `active` — `var(--text-primary)`, `var(--weight-semibold)`, underline `var(--accent)` 2px

**Design Notes:**
- Underline tab: active indicator animates horizontally with `var(--duration-fast)` `var(--ease-standard)`.
- Pill tab: active bg `var(--accent)`, text `var(--text-on-accent)`. Container bg `var(--bg-inset)`, `var(--radius-md)`.
- Height: 40px.
- Horizontal scroll if more than 4 tabs.

---

## 6. Feedback States

### 6.1 Loading State — Skeleton
**Description:** Placeholder content shown while data is loading. Prevents layout shift.

**Variants:**
- `text-line` — single line placeholder
- `value-block` — square/rectangular block (numbers, cards)
- `card-skeleton` — full Lease Card in skeleton form

**Design Notes:**
- Color: `var(--color-parchment)`.
- Animation: CSS `@keyframes` shimmer — linear gradient sweeping left to right, 1.5s infinite.
- Match exact dimensions of real content to prevent layout shift on load.
- Respect `prefers-reduced-motion`: static color, no animation.

---

### 6.2 Loading State — Spinner
**Description:** Used for action-triggered loading (save, fetch, calculate). Not for page load.

**Variants:**
- `inline` — 16px, next to triggering element
- `button` — replaces button label during async action
- `overlay` — centered on a card/section being refreshed

**Design Notes:**
- Stroke: `var(--accent)`. Track: `var(--accent-muted)`.
- Animation: 600ms linear infinite rotation.
- `role="status"` with `aria-label="Loading"` required.

---

### 6.3 Empty State
**Description:** Shown when a section has no content yet. The "start here" state.

**Variants:**
- `calculator-empty` — calculator with no inputs yet
- `comparison-empty` — comparison view with no saved deals
- `saved-empty` — no saved deals

**Design Notes:**
- Illustration: simple, stroke-based spot illustration (consistent with icon style).
- Title: `var(--text-lg)`, `var(--weight-semibold)`, `var(--text-primary)`.
- Body: `var(--text-base)`, `var(--text-muted)`, `var(--leading-relaxed)`, max 2 lines.
- CTA: Primary Button below body (where applicable).
- Layout: centered, `var(--space-12)` top/bottom padding.
- Warm, inviting tone — "Enter your deal details above to see the math."

---

### 6.4 Error State
**Description:** Shown when something goes wrong — network error, invalid input, failed fetch.

**Variants:**
- `inline-field` — error message under an input field
- `section-error` — error replacing a section's content
- `toast-error` — ephemeral notification (see Toast component)

**Design Notes:**
- Inline field: `var(--text-xs)`, `var(--status-error-text)`, `alert-circle` icon 12px, appears below input.
- Section error: icon + message centered in section space, with retry action.
- Calm language. "We couldn't load that data. Try again." Not: "Error 503."

---

### 6.5 Success State
**Description:** Confirms a completed action — deal saved, calculation verified.

**Variants:**
- `inline` — check icon + brief message inline
- `toast` — ephemeral (see Toast)
- `hero` — full-screen confirmation (post-share, post-save)

**Design Notes:**
- Color: `var(--status-success-text)`, `check-circle` icon.
- Message: brief — "Deal saved." Not "Your deal has been successfully saved to your account."

---

### 6.6 Toast / Snackbar
**Description:** Ephemeral notification that appears briefly and auto-dismisses.

**Variants:**
- `info`
- `success`
- `warning`
- `error`
- `with-action` — includes an undo or dismiss text action

**States:**
- `entering` — slides up from bottom, `var(--duration-moderate)` `var(--ease-decelerate)`
- `visible` — stable, auto-dismiss after 4s
- `exiting` — slides down, `var(--duration-fast)` `var(--ease-accelerate)`

**Design Notes:**
- Position: bottom-center, above bottom tab bar. `var(--z-toast)`.
- Min-width: 240px. Max-width: min(480px, calc(100vw - 32px)).
- Padding: `var(--space-3)` `var(--space-4)`.
- Background: `var(--color-ink)` (dark, regardless of theme — high contrast by design).
- Text: `var(--color-warm-white)`, `var(--text-sm)`.
- Action text: `var(--accent)` (on dark bg, use lighter sage — `var(--color-sage-300)`).
- `role="status"` or `role="alert"` depending on urgency.

---

### 6.7 Warning Banner (Inline)
**Description:** Persistent inline warning for conditions the user should know about. Not dismissible unless resolved.

**Examples:** "Down payment isn't covered by GAP." "This money factor appears to be marked up."

**Design Notes:**
- Uses Tip Card `warning` variant — see §4.1.
- Distinguish from Toasts: banners are persistent and contextual; toasts are ephemeral and global.

---

## 7. Overlays

### 7.1 Modal
**Description:** Full-focus overlay for important decisions or detailed content. Use sparingly.

**Variants:**
- `confirm` — two-action (confirm / cancel)
- `info` — content-only with single dismiss action
- `form` — contains form inputs (e.g., Save Deal with name input)

**States:**
- `entering` — backdrop fades in `var(--duration-moderate)`, dialog scales from 0.96 → 1.0 `var(--duration-moderate)` `var(--ease-decelerate)`
- `visible`
- `exiting` — reverse of entering

**Design Notes:**
- Backdrop: `var(--bg-overlay)`, `var(--z-overlay)`.
- Dialog: `var(--bg-surface)`, `var(--shadow-xl)`, `var(--radius-xl)`, `var(--z-modal)`.
- Max-width: 480px. Centered on desktop. On mobile: bottom sheet preferred (see §7.2).
- Padding: `var(--space-6)`.
- Close button: `x` icon, top-right, `var(--text-muted)`.
- Focus trap inside modal when open. Return focus to trigger on close.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal title.

---

### 7.2 Bottom Sheet
**Description:** Mobile-first overlay that slides up from the bottom. Preferred over modals on mobile.

**Variants:**
- `snap-partial` — reveals ~50% of screen height, drag to expand
- `snap-full` — full-height (used for complex content)
- `fixed-height` — non-draggable, fixed to content height

**States:**
- `closed` — off-screen
- `entering` — slides up, `var(--duration-moderate)` `var(--ease-decelerate)`
- `partial` — 50% snap point
- `full` — expanded
- `exiting` — slides down

**Design Notes:**
- Handle (drag indicator): 32px × 4px pill, `var(--color-parchment)`, centered at top of sheet.
- Background: `var(--bg-surface)`, `var(--radius-2xl)` top corners only.
- Backdrop: `var(--bg-overlay)`.
- Safe area: `padding-bottom: env(safe-area-inset-bottom)`.
- `z-index: var(--z-modal)`.
- Content inside sheet scrolls independently if content height > sheet height.

---

### 7.3 Tooltip
**Description:** Contextual definition or explanation shown on tap (mobile) or hover (desktop).

**Variants:**
- `above` — appears above trigger
- `below` — appears below trigger
- `inline-help` — appears inline next to a field label

**States:**
- `hidden` — not rendered
- `visible` — appears after 200ms hover delay (desktop) or tap (mobile)

**Design Notes:**
- Background: `var(--color-ink)`, `var(--color-warm-white)` text, `var(--text-xs)`.
- Padding: `var(--space-2)` `var(--space-3)`.
- Max-width: 240px. `var(--radius-md)`. `var(--shadow-lg)`.
- `z-index: var(--z-tooltip)`.
- Trigger: `info` icon (16px, `var(--text-muted)`) placed after field label.
- On mobile: tooltip behavior via tap toggle, not hover.
- Keep content to ≤ 2 lines. Longer explanations belong in a Bottom Sheet or Accordion.
- `role="tooltip"`, `aria-describedby` linking trigger to tooltip content.

---

### 7.4 Popover
**Description:** Anchored overlay with more space than a tooltip. Used for filter panels, quick settings.

**Variants:**
- `default` — anchored below trigger
- `with-arrow` — directional arrow pointing to trigger

**States:** hidden / visible

**Design Notes:**
- Background: `var(--bg-surface)`, `var(--shadow-xl)`, `var(--radius-lg)`.
- `z-index: var(--z-dropdown)`.
- Dismiss on: click outside, Escape key, scroll past threshold.

---

## 8. Typography Components

### 8.1 Heading
**Description:** Semantic headings h1–h4 with consistent token-based styling.

| Level | Size Token  | Weight   | Use                    |
|-------|-------------|----------|------------------------|
| h1    | text-3xl    | bold     | Screen hero (rare)     |
| h2    | text-xl     | semibold | Screen title           |
| h3    | text-lg     | semibold | Section header         |
| h4    | text-base   | semibold | Card title, sub-section|

---

### 8.2 Body Text
| Variant   | Size Token | Weight  | Use                       |
|-----------|------------|---------|---------------------------|
| large     | text-md    | regular | Lead paragraph            |
| default   | text-base  | regular | Standard body             |
| small     | text-sm    | regular | Helper text, captions     |
| micro     | text-xs    | regular | Legal, footnotes          |

---

### 8.3 Label
**Description:** Form field label. Always above the associated input.

- Size: `var(--text-sm)`
- Weight: `var(--weight-medium)`
- Color: `var(--text-secondary)`
- Spacing below: `var(--space-2)`

---

### 8.4 Helper Text
**Description:** Supplementary context below a field.

- Size: `var(--text-xs)`
- Weight: `var(--weight-regular)`
- Color: `var(--text-muted)`

---

### 8.5 Financial Figure
**Description:** Styled wrapper for all monetary/numeric values.

- Always: `font-variant-numeric: tabular-nums`
- Currency symbol: styled separately, `var(--text-muted)`, slightly smaller
- Negative values: `var(--status-error-text)`
- Positive delta: `var(--status-success-text)`

---

## 9. Layout Components

### 9.1 Card
**Description:** Base surface component. Everything that groups related content.

**Variants:**
- `flat` — no shadow, `var(--bg-surface)` bg
- `raised` — `var(--shadow-sm)`, `var(--bg-surface)`
- `outlined` — 1px `var(--border-default)` border, no shadow, `var(--bg-surface)`
- `inset` — `var(--bg-inset)`, inner-shadow feel

**Design Notes:**
- Border radius: `var(--radius-lg)` default.
- Padding: `var(--space-5)` default.

---

### 9.2 Divider
**Description:** Horizontal rule to separate content.

**Variants:**
- `full` — full-width
- `inset` — with `var(--space-4)` horizontal margin

**Design Notes:**
- Height: 1px. Color: `var(--border-default)`.
- Margin: `var(--space-4)` vertical.

---

### 9.3 Badge / Pill
**Description:** Small label used for status, deal quality, categories.

**Variants:** `default`, `success`, `warning`, `error`, `accent`, `neutral`

**Design Notes:**
- Padding: `var(--space-1)` `var(--space-2)`.
- Font: `var(--text-xs)`, `var(--weight-semibold)`.
- Radius: `var(--radius-full)`.

---

### 9.4 Button (Primary)
**Description:** Main CTA. "Calculate", "Save Deal", "Copy Script."

**Variants:**
- `primary` — filled `var(--accent)`, white text
- `secondary` — outlined `var(--accent)` border, `var(--accent)` text, transparent bg
- `ghost` — no border, `var(--text-secondary)` text
- `destructive` — filled `var(--status-error-text)` bg

**Sizes:**
- `sm` — 32px height, `var(--text-sm)`
- `md` — 40px height, `var(--text-base)` (default)
- `lg` — 48px height, `var(--text-md)`

**States:**
- `rest`, `hover` (darken 8%), `pressed` (darken 12%), `disabled` (opacity 0.4), `loading` (spinner replaces label)

**Design Notes:**
- Border radius: `var(--radius-md)`.
- Min-width: 80px.
- Full-width variant: `width: 100%` for mobile CTAs.
- Loading: spinner left of label (or replaces label), button remains same size.
- `disabled` buttons: non-interactive, not `pointer-events: none` — `aria-disabled` preferred so button is still focusable.

---

### 9.5 Icon Button
**Description:** Square button containing only an icon. Used for close, copy, share, settings.

**Sizes:** `sm` (32px), `md` (40px), `lg` (48px)

**States:** `rest`, `hover`, `pressed`, `disabled`

**Design Notes:**
- Touch target always minimum 44×44px regardless of visual size.
- `aria-label` required — icon buttons have no visible text label.

---

### 9.6 Page Container
**Description:** Wrapper that sets max-width and horizontal padding for all screens.

**Design Notes:**
- Mobile: `width: 100%`, `padding: 0 var(--space-4)`.
- Tablet+: `max-width: 768px`, `margin: 0 auto`.
- Content below top app bar, above bottom tab bar.
- Bottom padding: `calc(var(--space-14) + env(safe-area-inset-bottom))` — clears bottom nav.

---

*End of Component Inventory — v1.0*
