# Lease Buddy — Design System V3: "The Printed Brief"
Author: Jo — UI/UX Design Agent
Date: 2026-10-04
Status: Proposed — extreme evolution of V2, for comparison against V1/V2

---

## 1. Concept

**V1** was a friendly notepad. **V2** sharpened its edges — flat, hairline-ruled,
sage-and-paper. **V3** goes further than a visual refinement: it changes what
the product *is* in the user's hand.

> V3's core metaphor: **the printed brief.** The single sheet of paper a
> lawyer, broker, or analyst hands you before you walk into a negotiation.
> Not an app. A document. One you can trust because it reads like it was
> prepared by someone who already did the work.

Two references anchor this:

1. **Paper prototyping** — the raw, hand-annotated sketches designers use to
   test an idea before polish. They're honest. They show their work. A circled
   number or a bracketed comparison isn't decoration — it's someone telling
   you "look here, this matters."
2. **Kindle Paperwhite** — a device built entirely around making dense,
   complex text calm, authoritative, and easy to hold attention on for a long
   time. No chrome. No notifications fighting for your eye. Content *is* the
   interface.

Lease Buddy's job is to take a process most consumers find confusing and
adversarial (leasing/negotiating a car) and hand them **knowledge and
leverage**. V3's entire visual system is built to produce one emotional
result: *confidence*. The user should feel like they're holding something
that already knows more than the dealer does — and that they can read it in
under thirty seconds standing in a parking lot.

---

## 2. What Changes From V2

V2 kept color, type family, and spacing grid from V1 — it only changed shape
language (sharp corners, underline inputs, paper grain).

V3 keeps the **palette** and **spacing system** intact for brand continuity,
but pushes three new axes to an extreme:

| Axis | V2 | V3 |
|---|---|---|
| Color usage | Sage used freely (accents, buttons, borders) | Sage **rationed** — one hero element per screen only |
| Layout model | Sections (hairline + accent bar) inside a scrollable app | **Pages** — one page, one job, like a printed sheet |
| Typography | Inter only, weights 300–700 | Inter (UI) + **serif accent** (authority moments) |
| Annotation | None | **Confidence stamps** — circles, brackets, margin notes |
| Surface | Paper grain, flat | **E-ink simulation** — soft diffusion, no screen glow |

---

## 3. Core Principles

### 3.1 Grayscale-First Hierarchy
Color is not a layout tool in V3. By default, every screen renders in ink /
graphite / slate / fog — pure e-ink grayscale. Sage green is **earned**,
appearing only on:
- The single most important number or decision point on the page
  (e.g., the final negotiated-savings figure, the "walk away" price)
- The primary CTA button
- Active/selected states the user directly triggered

If you find yourself reaching for sage a second time on a screen, that's a
signal the hierarchy isn't done yet — simplify the screen, don't add more
color to compensate.

### 3.2 One Page, One Job
No app-style scrolling dashboards with five cards competing for attention.
Each screen is a single page with a clear top-to-bottom reading order, like
turning to the right page in a prepared dossier. Navigating between
"Vehicle Info" → "Your Deal" → "Negotiation Brief" is a **page turn**, not a
tab switch. This is reinforced by the page-turn transition (see §6 Motion)
and by numbering pages like a printed packet: `Page 2 of 4`.

### 3.3 Document, Not Interface
Remove every piece of UI chrome that doesn't serve reading:
- No card containers, no drop shadows implying "floating" surfaces
- No rounded corners anywhere (carried from V2, now absolute — zero exceptions,
  not even pill badges; use a bracket `[ ]` annotation instead of a pill)
- No persistent nav bar; navigation is a page-turn control at the bottom,
  styled like a page-number tab, not a tab bar
- Headers are typeset like a document title, not an app header

### 3.4 Serif as Authority Signal
Inter remains the voice of the *interface* — labels, inputs, buttons, body
copy. A single serif typeface (Source Serif 4) is reserved for exactly two
roles:
1. **The hero number** — the one figure the whole screen builds to
   (monthly payment delta, total savings, your calculated fair-market price)
2. **Dossier section headers** — "YOUR DEAL," "NEGOTIATION BRIEF,"
   "FAIR MARKET RANGE" — set in serif, small-caps-style tracking, as if
   printed as a section title on a prepared document

This single typographic contrast — sans-serif UI vs. serif authority moments
— mirrors exactly how a Kindle renders a sans-serif UI chrome around serif
book typography. It tells the user's eye: *this part is the interface, that
part is the truth.*

### 3.5 Confidence Stamps
Borrowing directly from paper-prototype annotation culture: small, precise
graphic marks used *sparingly* to direct attention to negotiating leverage.
Not hand-drawn/sketchy (that would undercut trust) — precise, ruler-straight,
ink-colored. Three marks, each with one job:

- **Circle** — drawn around the single number the user should lead with in
  negotiation (e.g., circle the fair-market price, not the dealer's ask)
- **Bracket** — `⎡ ⎤` spanning two numbers being compared (dealer price vs.
  fair price), making the delta impossible to miss
- **Underscore-tick** — a short double-tick under a term (e.g., "money
  factor") that has a definition on tap — mimics a reader underlining a word
  to look up later

These are UI components, not illustrations — built in CSS/SVG at fixed
geometry, applied programmatically to the single most important data point
per screen. Never more than one per screen.

### 3.6 E-Ink Surface Simulation
V2's paper grain was a static texture. V3 goes further: the surface behaves
like e-ink rendering, not a backlit screen.
- Background: a very slightly warm, slightly uneven off-white — never pure
  white, never glowing
- No glossy highlights, no gradients implying depth or light source
- Text renders with print-like density: pure ink black (`#1A1A1A`) at full
  opacity, no anti-aliased softness implied by color — weight and tracking
  carry the hierarchy instead
- Page transitions mimic e-ink refresh: a brief, calm cross-fade rather than
  a slide or spring — nothing about this interface should feel "snappy"
  (snappy reads as "app." Calm reads as "document you can trust.")

---

## 4. Color

### 4.1 Palette (unchanged primitives from V1/V2 — see Rule 3.1 for usage discipline)

Same primitive palette as V1/V2: warm off-white, paper, parchment, ink,
graphite, slate, fog; sage 50/100/300/500/700/900; status colors; dark-mode
primitives. **No new colors are introduced in V3.** The entire V3 differentiation
is a *discipline of restraint* applied to the existing system, not a new palette.

### 4.2 Usage Rationing (V3-specific rule)
This is the one new color *rule*, and it's the most important change in the
whole system:

> **Sage appears at most once per screen as a fill or stroke on a
> non-interactive element**, plus the primary CTA button. Everything else is
> grayscale. If a secondary action also "needs" to stand out, it doesn't —
> move it to a secondary page or de-emphasize the primary element instead.

---

## 5. Typography

### 5.1 Typefaces
- **Inter** (unchanged from V1/V2) — all interface text: labels, body, inputs,
  buttons, navigation, metadata
- **Source Serif 4** (new in V3) — reserved exclusively for hero numbers and
  dossier section headers. Open-source, metrically generous, reads as
  "published" rather than "typed."

### 5.2 Scale additions for V3
- `--text-hero-serif`: 48px / serif / weight 600 — the single biggest number
  on any screen (e.g., "$127/mo you could save")
- `--text-dossier-header`: 13px / serif / weight 600 / uppercase /
  tracking-widest — section titles styled like a printed document header

### 5.3 Tabular Numerics (unchanged, non-negotiable)
All rendered financial figures — in Inter or serif — use
`font-variant-numeric: tabular-nums lining-nums`. This rule carries forward
from V1/V2 without modification.

---

## 6. Layout & Spacing

- Spacing grid (4px base) unchanged from V1/V2 — system continuity matters
  more here than novelty.
- **Margins widen in V3.** Where V2 used `--space-4` (16px) page padding, V3
  uses `--space-6` (24px) minimum, `--space-8` (32px) preferred. A document
  that feels crowded doesn't feel authoritative. Whitespace is doing active
  work here — it signals "this was composed, not crammed."
- Single-column layout, strictly. No side-by-side cards. If two numbers need
  comparing, stack them vertically with a bracket annotation connecting them
  (§3.5), never place them in adjacent boxes.

---

## 7. Motion

- No bounce, spring, or overshoot (carried from V1/V2 — still absolute).
- **New in V3:** page transitions use a 220ms cross-fade with a very subtle
  (4px) vertical settle — mimicking an e-ink refresh, not a slide-in panel.
  Calculation updates still use counter-style digit rolling (unchanged from
  V1/V2).
- Confidence stamps (circle/bracket/tick) animate in with a single
  stroke-draw animation (250ms, ease-standard) the first time they appear on
  a screen — like a pen marking the page. This is the only "drawn" motion
  allowed in the system, reserved for this one component family.

---

## 8. Iconography

Lucide Icons, outline, 1.5px stroke — unchanged from V1/V2. In V3, icons are
used even more sparingly than V2: prefer a text label over an icon+label pair
wherever space allows. The document metaphor is undercut by too much iconography;
icons should feel like the occasional margin glyph on a printed page, not UI
wallpaper.

---

## 9. Voice & Tone (unchanged from V1)

Still a consumer advocate, not dealership-adjacent. V3's visual restraint
should be matched by copy restraint: shorter sentences, more declarative
statements, less hedging. "Your fair price is $340/mo" reads stronger than
"We estimate your fair price could be around $340/mo."

---

## 10. What V3 Deliberately Does NOT Do

- It does not add new colors
- It does not change the spacing grid
- It does not abandon tabular numerics, Lucide icons, or the no-bounce motion rule
- It does not use hand-drawn/sketchy rendering for confidence stamps — those
  stay precise and ruler-straight; sketchy would undercut authority
- It does not apply serif to any interactive element (buttons, inputs,
  nav) — serif is exclusively for the two reserved roles in §3.4

---

## 11. Comparison at a Glance

| | V1 | V2 | V3 |
|---|---|---|---|
| Metaphor | Friendly notepad | Sharp-lined notepad | Printed negotiation brief |
| Corners | Rounded | Sharp (0px) | Sharp (0px), absolute |
| Color discipline | Free use of sage | Free use of sage | Rationed — one hero element/screen |
| Typography | Inter only | Inter only (+ weight 300) | Inter (UI) + Serif (authority) |
| Layout | Cards | Hairline sections | Single-page dossier |
| Annotation | None | None | Confidence stamps (circle/bracket/tick) |
| Emotional target | Approachable | Precise, distinctive | Authoritative, confidence-inspiring |

V3 is the most opinionated of the three systems. It asks the most of
engineering (serif font load, stamp components, stricter page-based nav) and
gives back the most differentiated product in the category — nothing in the
car-buying space looks or feels like this.
