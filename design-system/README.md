# Lease Buddy Design System

**Version:** 1.0.0
**Maintained by:** Jo — UI/UX Design Agent
**Last updated:** 2026-10-04

---

## What's In Here

```
design-system/
├── README.md                 ← You are here
├── BRAND-DIRECTION.md        ← Brand decisions, palette rationale, typography, voice/tone
├── COMPONENT-INVENTORY.md   ← Full component spec for every UI pattern in the app
├── tokens.json               ← W3C DTCG design tokens (source of truth)
└── tokens.css                ← CSS custom properties generated from tokens.json
```

---

## Quick Start for Dev

### 1. Import the tokens

Add to your main CSS entry point:

```css
@import './design-system/tokens.css';
```

Or link in HTML:

```html
<link rel="stylesheet" href="/design-system/tokens.css" />
```

The file includes the Google Fonts import for Inter automatically.

### 2. Use semantic tokens in your CSS

Always reference **semantic tokens**, not primitives:

```css
/* ✅ Correct — semantic token */
.card {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: var(--border-thin) solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
}

/* ❌ Avoid — raw value or primitive token */
.card {
  background: #f4f2ed;
  color: var(--color-ink);
}
```

Semantic tokens (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`) swap automatically when dark mode is applied. Primitives (`--color-*`) do not.

### 3. Enable dark mode

Dark mode responds to a `data-theme="dark"` attribute on the root element:

```js
// Enable dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Disable dark mode (returns to light)
document.documentElement.removeAttribute('data-theme');

// Toggle
const isDark = document.documentElement.hasAttribute('data-theme');
document.documentElement.toggleAttribute('data-theme');
// Note: use setAttribute('data-theme', 'dark') for the toggle-on case
```

> **Note:** Light mode is the primary design surface for v1. Dark mode tokens are available and complete, but the designed UI targets light mode. Wire up the toggle for future use, but don't prioritize dark mode QA at launch.

### 4. Financial figures — tabular numerals

Any element displaying a monetary or numeric calculated value must render with tabular numerals to prevent layout jumping during live updates:

```css
.your-value-element {
  font-variant-numeric: tabular-nums;
}
```

Convenience classes from `tokens.css`:

```html
<span class="tabular">$1,234.56</span>
<span data-value>$1,234.56</span>
```

### 5. Motion

Use duration and easing tokens for all transitions:

```css
.accordion-content {
  transition: height var(--duration-normal) var(--ease-decelerate);
}

.modal {
  transition: opacity var(--duration-moderate) var(--ease-standard),
              transform var(--duration-moderate) var(--ease-decelerate);
}
```

`prefers-reduced-motion` is handled globally in `tokens.css` — all `--duration-*` tokens resolve to `0ms` under that media query. You do not need to repeat the media query in component CSS.

---

## Token Reference

### Color — Semantic Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--bg-app` | #faf9f6 (warm white) | #0f1117 |
| `--bg-surface` | #f4f2ed (paper) | #1a1d27 |
| `--bg-inset` | #ede9e0 (parchment) | #22263a |
| `--text-primary` | #1a1a1a (ink) | #f0ede8 |
| `--text-secondary` | #3d3d3d (graphite) | #9ca3af |
| `--text-muted` | #6b7280 (slate) | #6b7280 |
| `--accent` | #5c7a6b (sage 500) | #8ab5a4 (sage 300) |
| `--accent-hover` | #3d5a4f (sage 700) | #d4e4dc (sage 100) |
| `--border-default` | #ede9e0 (parchment) | #2a2d3a |
| `--border-focus` | #5c7a6b (sage 500) | #8ab5a4 (sage 300) |

Full token list: `tokens.json` (W3C DTCG format) and `tokens.css`.

### Spacing — 4px Grid

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |

### Typography

| Token | Value |
|-------|-------|
| `--font-base` | 'Inter', system-ui, sans-serif |
| `--text-sm` | 13px |
| `--text-base` | 16px |
| `--text-lg` | 20px |
| `--text-xl` | 24px |
| `--text-2xl` | 30px |
| `--weight-regular` | 400 |
| `--weight-semibold` | 600 |
| `--weight-bold` | 700 |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Tags, chips |
| `--radius-md` | 8px | Inputs, buttons |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals |
| `--radius-2xl` | 24px | Bottom sheets (top corners) |
| `--radius-full` | 9999px | Pills, toggles |

---

## Component Documentation

See `COMPONENT-INVENTORY.md` for complete specs on every UI component:

- **§2** — Calculator inputs (text inputs, sliders, toggles, selects, steppers, accordions)
- **§3** — Comparison views (lease cards, data tables, diff highlights, cost breakdown)
- **§4** — Negotiation assistant (tip cards, scripts, deal gauge, wizard steps)
- **§5** — Navigation (bottom tab bar, top app bar, in-page tabs)
- **§6** — Feedback states (skeleton, spinner, empty, error, success, toast)
- **§7** — Overlays (modal, bottom sheet, tooltip, popover)
- **§8** — Typography components
- **§9** — Layout components (card, button, page container)

---

## Brand Direction

See `BRAND-DIRECTION.md` for:

- Palette decision rationale (light vs dark vs dual)
- Full color primitive and semantic palette
- Typography system and Inter usage notes
- Iconography direction (Lucide, 1.5px stroke)
- Motion and animation principles
- Voice and tone guide
- Logo / wordmark direction

---

## Contributing

This system is maintained by Jo. Changes to foundational tokens (color, spacing, type scale) require a design review before implementation.

**Workflow:**
1. Jo updates `BRAND-DIRECTION.md` and `tokens.json` for any foundational changes
2. `tokens.css` is regenerated to match
3. `COMPONENT-INVENTORY.md` updated if component specs change
4. Dev implements against the updated spec
5. SicTransit reviews at preview URL before merge

---

## Open Questions (for SicTransit)

1. **Dark mode at launch?** Tokens are ready. Is the toggle wired in v1 or post-launch?
2. **Logo SVG** — direction is defined in BRAND-DIRECTION.md §7. Needs execution.
3. **Figma file** — Design system components will be built in Figma next. Confirm this is the right sequence before starting that sprint.
