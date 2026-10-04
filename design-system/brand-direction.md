# Lease Buddy — Brand Direction

**Version:** 1.1
**Author:** Jo (UI/UX Design Agent)
**Date:** 2026-10-04
**Status:** Approved — SicTransit confirmed light-first + dark toggle on 2026-10-04

---

## Palette Decision: Light-First, Dark Mode as Future User Toggle ✅

**Primary system: light mode (warm off-white + sage green)**
**Dark mode: supported from day one as a `[data-theme="dark"]` CSS override — ships as a user-toggleable theme in a later phase**

This is resolved. Both themes are designed into the token architecture from the start. Light is the default and the primary design surface. Dark is a first-class citizen in the token structure — not an afterthought — so it slots in without a rewrite when it ships.

### Why Light is Primary

The existing dark app (`#0f1117` / `#6366f1`) was a development default, not a brand decision. Light wins on three grounds:

1. **The notepad metaphor only works on light.** Notepads are cream. The approachable, tactile quality of the brief collapses on a near-black background — you get Bloomberg terminal, not helpful friend.
2. **Data legibility.** Dense financial tables, worksheet lines, cost breakdowns — all scan faster in black-on-cream than white-on-dark at small sizes. Legibility is product quality.
3. **Consumer-advocate positioning.** Dark fintech UIs read as dealer software or developer dashboards. Light reads as "built for you." That distinction is load-bearing for this product.

### Why Dark Mode Ships Later (Not Never)

Dark mode is a valid user preference, not a wrong aesthetic. The decision to ship it later is scope management, not rejection. Many users prefer dark for evening use. The token architecture supports it fully — Dev can activate it by toggling a single attribute. Shipping it is a QA and product scope decision, not a design one.

### Token Architecture for Dual Theme

Tokens are structured in two layers:

- **Primitives** (`color.primitive.*`) — raw color values defined once, mode-agnostic. These never change between themes.
- **Semantic aliases** (`color.semantic.*`) — reference primitives; these are what components consume. The light-mode values are the defaults in `:root`. A `[data-theme="dark"]` block remaps only the semantic layer to different primitive values.

This means: adding dark mode = filling in the `[data-theme="dark"]` CSS block. No new primitives, no component-level changes, no rewrites.

---

## Color Palette

### Personality
Warm, calm, precise. A well-made notebook: cream pages, clean ink lines, one confident accent that says "you've got this." Not clinical white. Not corporate navy. Approachable but not frivolous.

### Primitives (mode-agnostic)

| Name         | Hex       | Role                                              |
|--------------|-----------|---------------------------------------------------|
| Warm White   | `#faf9f6` | Primary app background                            |
| Paper        | `#f4f2ed` | Card and surface backgrounds                      |
| Parchment    | `#ede9e0` | Inset wells, input backgrounds, borders           |
| Ink          | `#1a1a1a` | Primary text                                      |
| Graphite     | `#3d3d3d` | Secondary text                                    |
| Slate        | `#6b7280` | Muted text, labels                                |
| Fog          | `#9ca3af` | Placeholder, disabled                             |
| White        | `#ffffff` | Active overlaid surfaces                          |
| Sage 50      | `#eef3f0` | Accent subtlest tint                              |
| Sage 100     | `#d4e4dc` | Accent muted tint                                 |
| Sage 300     | `#8ab5a4` | Accent on dark surfaces                           |
| Sage 500     | `#5c7a6b` | Primary accent — confirm, success, go             |
| Sage 700     | `#3d5a4f` | Accent hover and active press (light)             |
| Sage 900     | `#1e2e28` | Accent subtle on dark surfaces                    |
| Amber 300    | `#fcd34d` | Warning border (dark mode)                        |
| Amber 500    | `#f59e0b` | Warning text and icon                             |
| Red 100      | `#fee2e2` | Error background (light)                          |
| Red 400      | `#f87171` | Error border / text (dark)                        |
| Red 600      | `#dc2626` | Error text (light)                                |
| Green 100    | `#dcfce7` | Success background (light)                        |
| Green 400    | `#4ade80` | Success border / text (dark)                      |
| Green 600    | `#16a34a` | Success text (light)                              |
| Dark Base    | `#0f1117` | Dark mode app background                          |
| Dark Surface | `#1a1d27` | Dark mode card surface                            |
| Dark Raised  | `#22263a` | Dark mode inset/raised surface                    |
| Dark Border  | `#2a2d3a` | Dark mode border                                  |

### Semantic Aliases (light default → dark override)

| Semantic Token        | Light value    | Dark value         |
|-----------------------|----------------|--------------------|
| bg.app                | Warm White     | Dark Base          |
| bg.surface            | Paper          | Dark Surface       |
| bg.inset              | Parchment      | Dark Raised        |
| text.primary          | Ink            | `#f0ede8`          |
| text.secondary        | Graphite       | `#9ca3af`          |
| text.muted            | Slate          | `#6b7280`          |
| text.placeholder      | Fog            | `#6b7280`          |
| border.default        | Parchment      | Dark Border        |
| border.focus          | Sage 500       | Sage 300           |
| accent.default        | Sage 500       | Sage 300           |
| accent.hover          | Sage 700       | Sage 100           |
| accent.subtle         | Sage 50        | Sage 900           |
| status.error.text     | Red 600        | Red 400            |
| status.warning.text   | Amber 500      | Amber 300          |
| status.success.text   | Green 600      | Green 400          |

---

## Typography

### Font Family: Inter

Decisive choice. One reason dominates: **tabular numerics**. `font-variant-numeric: tabular-nums lining-nums` is native to Inter — financial figures align in columns automatically. Non-negotiable for a lease calculator. Inter is also free (Google Fonts / variable), excellent on mobile, and pairs naturally with the Lucide icon set.

### Type Scale

| Role        | Size  | Weight | Line-Height | Use                                       |
|-------------|-------|--------|-------------|-------------------------------------------|
| display-xl  | 38px  | 700    | 1.2         | Monthly payment hero figure only          |
| display-lg  | 30px  | 600    | 1.2         | Section totals, key financial outputs     |
| display-md  | 20px  | 600    | 1.35        | Screen titles, card headings              |
| body-lg     | 18px  | 400    | 1.5         | Primary body copy                         |
| body-base   | 16px  | 400    | 1.5         | Standard body                             |
| body-sm     | 13px  | 400    | 1.5         | Helper text, secondary info               |
| label-lg    | 16px  | 500    | 1.5         | Input labels, navigation items            |
| label-md    | 13px  | 500    | 1.5         | Badges, tags, chips                       |
| label-sm    | 11px  | 500    | 1.3         | Table headers, micro labels               |
| mono        | 13px  | 400    | 1.5         | Money factor, worksheet lines             |

**Non-negotiable rule:** All rendered financial figures use `font-variant-numeric: tabular-nums lining-nums`.

---

## Iconography

**Library:** Lucide Icons (MIT, open source)
**Stroke weight:** 1.5px uniform
**Rendered size default:** 20px (touch targets always ≥ 44×44px)
**Style:** Outline only. No filled variants ever mixed in.

Key icons: `car`, `calculator`, `message-circle`, `bar-chart-2`, `chevron-down`, `info`, `alert-triangle`, `check-circle`, `copy`, `x`.

---

## Motion & Interaction

Motion communicates state. Never decoration.

| Token    | Value | Use                                        |
|----------|-------|--------------------------------------------|
| instant  | 0ms   | No animation (reduced motion, JS updates)  |
| fast     | 100ms | Hover states, focus rings                  |
| normal   | 150ms | Button press, toggle                       |
| moderate | 200ms | Accordion expand, number update animation  |
| slow     | 300ms | Bottom sheet, modal enter/exit             |

Easing: `cubic-bezier(0.4, 0, 0.2, 1)` standard. `cubic-bezier(0, 0, 0.2, 1)` for overlays entering. `cubic-bezier(0.4, 0, 1, 1)` for exiting.

**Payment hero animation:** When calculation updates, run a brief pulse (200ms) on the hero figure. Confirms "the math just ran." The one purposeful motion moment in the product.

**Reduced motion:** All durations collapse to 0ms when `prefers-reduced-motion: reduce` is active. This is already handled in `tokens.css`.

**No bounce. No spring. No overshoot.** This is a financial tool.

---

## Voice & Tone

A knowledgeable friend who knows car leasing — not a lawyer, not a dealer.

- Speak plainly. Jargon on first use always gets a plain-English explanation inline.
- Warnings are user advocacy, not legal disclaimers. Write them like advice.
- Labels ≤ 3 words. Tooltips for anything needing explanation.

✅ "Residual % — Set by the lender. Higher is better for you."
✅ "Ask your dealer for the buy-rate money factor before you negotiate."
✅ "⚠ Down payments aren't covered by GAP insurance if the car is totaled."
❌ "Please enter the capitalized cost reduction amount"
❌ "Tax calculations are estimates and may vary. Consult a tax professional."

---

## Logo & Wordmark

### Mark: Ruled-Lines Notepad Icon

A minimal geometric icon: portrait rectangle, 2px corner radius, 4 thin horizontal ruled lines inside. Bottom line terminates with a small checkmark endpoint. Pure geometry — no illustration, no gradient, no shadow. Monochromatic. Functional at 16px (favicon) through 48px (splash). Not a car. Not a dollar sign.

### Wordmark

`lease buddy` — all lowercase, Inter.
- `lease` — Inter Regular (400)
- `buddy` — Inter SemiBold (600)

Weight contrast creates identity without color. Mark sits left of wordmark, 8px gap.

### Color Treatments

| Context     | Mark              | Wordmark           |
|-------------|-------------------|--------------------|
| Light bg    | Sage `#5c7a6b`    | Ink `#1a1a1a`      |
| Dark bg     | White `#ffffff`   | White `#ffffff`    |
| App icon    | White on Sage bg  | —                  |
| Monochrome  | Ink `#1a1a1a`     | Ink `#1a1a1a`      |

---

## Open Decisions for SicTransit

| # | Decision | Priority |
|---|----------|----------|
| 1 | **Dark mode toggle scope** — does Dev wire the theme toggle switch in v1 or post-launch? CSS is fully ready either way. | High |
| 2 | **Logo SVG execution** — concept fully specced; needs Figma pass to produce the actual asset. Ready once MCP gateway restart is done. | High |
| 3 | **"Lease Buddy" trademark check** — confirm name is clear before any public launch. | Medium |
| 4 | **Dark mode accent** — architecture uses lighter Sage (300) on dark. Confirm or request Indigo instead for stronger contrast with the existing dark app aesthetic. | Low |
