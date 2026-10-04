# Lease Buddy — Brand Direction V2: Sharp Lines & Paper

**Version:** 2.0
**Author:** Jo (UI/UX Design Agent)
**Date:** 2026-10-04
**Status:** Approved direction — evolution of V1; V1 preserved for comparison at design-system/
**Builds on:** V1 color system (sage green, warm paper, Inter, Lucide) — shape language only changes

---

## What Changed from V1

V1 established the color system and typographic foundation. V2 evolves the shape language and surface treatment only. The palette is identical.

| Element          | V1                           | V2                                       |
|------------------|------------------------------|------------------------------------------|
| Border radius    | 4-16px rounded corners       | 0px everywhere -- sharp corners only     |
| Card borders     | Full 1px border all sides    | Bottom rule or left accent bar only      |
| Input style      | Full-border box, 48px target | Underline only, 52px tap target          |
| Background       | Flat warm white #faf9f6      | Warm white + subtle SVG paper grain      |
| Section grouping | Card containers              | Ruled hairlines + left sage accent bar   |
| Type weight range| 400-700                      | 300-700 (wider contrast, more hierarchy) |

---

## Design Rationale

### Sharp Corners

Rounded corners are the default for ~90% of apps. Zero radius is a deliberate choice -- precise, confident, purposeful. On a warm paper background, sharp edges do not feel cold; the warmth comes from color and texture, not geometry. This is the single biggest differentiator from generic mobile UI.

The assumption that rounded corners equal friendly on mobile is outdated. Linear, Notion, and most serious productivity tools use minimal or zero radius. Users respond to clarity and confidence.

### Paper Treatment

V1 background was flat warm white -- correct but not distinctive. V2 adds a subtle SVG noise texture at 2.5% opacity layered over #faf9f6. Invisible at a glance, adds tactile warmth that reads as paper rather than screen. Inline SVG, zero HTTP requests, works in both themes.

### Ruled Lines as Structure

V1 used full-border card containers to group content. V2 replaces them with 1px #ede9e0 hairlines as the primary structural element. The app reads like a well-organized document, not a dashboard.

Sections needing stronger grouping use a left accent bar: 3px vertical sage #5c7a6b on the left edge. Creates hierarchy without enclosing content in a box. On mobile: takes zero horizontal space, immediately scannable.

### Underline Inputs

Full-border inputs feel like a tax return. Underline inputs feel like a notepad. The underline (1.5px #ede9e0 at rest, 2px sage on focus) anchors the field without boxing it. Combined with zero radius everywhere, this creates a coherent "document you fill in" experience.

Mobile tap target increased from 48px to 52px -- underlines need more vertical area to be reliably hittable with a finger.

### Wider Type Weight Range

V1 used Inter 400-700. V2 extends to Inter Light 300 for secondary/helper text and metadata. Hero numbers at 700 pop harder against 300-weight labels -- more tension, more hierarchy on the page.

---

## Mobile-Specific Notes

All V2 changes work well on mobile and in several cases work better than V1:
- Underline inputs take less vertical space and scroll more naturally in long forms
- Ruled dividers open up narrow screens vs. full-border cards which create claustrophobia at 390px width
- Left accent bars group sections without consuming horizontal space
- Sharp corners on buttons are standard in precision/productivity apps

Tap target requirement already reflected in tokens: underline inputs minimum 52px tall.

---

## Color System (unchanged from V1)

All V1 colors carry forward exactly. No color changes in V2.
- Sage green accent: #5c7a6b
- Warm white background: #faf9f6
- Paper surfaces: #f4f2ed, #ede9e0
- Ink text: #1a1a1a
- Status colors: amber, red, green (unchanged)
- Dual-theme architecture: light-first, [data-theme="dark"] extension point (unchanged)

V2 adds new applications of existing colors:
- Paper grain texture: SVG noise at 2.5% opacity over #faf9f6
- Left accent bar: 3px sage #5c7a6b -- same color, new structural use

---

## Typography (V2 changes from V1)

| Role        | Size  | Weight    | Line-Height | Notes                               |
|-------------|-------|-----------|-------------|-------------------------------------|
| display-xl  | 38px  | 700 Bold  | 1.2         | Monthly payment hero figure only    |
| display-lg  | 30px  | 600 Semi  | 1.2         | Section totals, key outputs         |
| display-md  | 20px  | 600 Semi  | 1.35        | Screen titles, section headings     |
| body-lg     | 18px  | 400 Reg   | 1.5         | Primary body copy                   |
| body-base   | 16px  | 400 Reg   | 1.5         | Standard body                       |
| body-sm     | 13px  | 300 Light | 1.5         | V2 change: was 400 Regular in V1    |
| label-lg    | 14px  | 500 Med   | 1.4         | Input labels, nav items             |
| label-md    | 12px  | 500 Med   | 1.4         | Badges, tags                        |
| label-sm    | 11px  | 500 Med   | 1.3         | Table headers, micro labels         |
| meta        | 11px  | 300 Light | 1.3         | V2 new role: timestamps, fine print |
| mono        | 13px  | 400 Reg   | 1.5         | Money factor, worksheet lines       |

Rule unchanged: All financial figures use font-variant-numeric: tabular-nums lining-nums.
Google Fonts: load wght@300;400;500;600;700 -- Inter 300 must be explicitly included.

---

## Shape Language Specification

### Border Radius: 0px everywhere

No exceptions on interactive elements. Only permitted curves:
- 9999px -- drag handles (pill shape for grip), pill badges only
- 2px -- drag handle grip bar only (prevents sharp edge on a physical grab target)
- Logo mark geometry (brand identity, not UI chrome)

### Section Grouping

Default section: 1px #ede9e0 hairline top and bottom. No side borders. 16px vertical padding.

Grouped/featured section: 3px sage #5c7a6b left border. No other borders. Content indented 16px from bar.

Elevated surface (modal, bottom sheet): No border. Shadow only. Sharp corners. Background #f4f2ed.

### Input States

| State     | Treatment                                              |
|-----------|--------------------------------------------------------|
| Default   | Bottom border 1.5px #ede9e0 only. No other borders.   |
| Focus     | Bottom border 2px sage #5c7a6b. No glow or ring.      |
| Error     | Bottom border 2px red #dc2626.                         |
| Disabled  | Bottom border 1px #ede9e0, opacity 0.4.               |
| Read-only | No border. Background #ede9e0.                         |

### Button States

| Variant     | Default                                   | Hover              |
|-------------|-------------------------------------------|--------------------|
| Primary     | Sage #5c7a6b fill, white text, 0px radius | Sage 700 #3d5a4f   |
| Secondary   | 1.5px sage border, sage text, clear fill  | Sage 50 bg         |
| Ghost       | No border, no fill, ink text              | Parchment bg       |
| Destructive | 1.5px red border, red text, clear fill    | Red 100 bg         |

No scale transform, no shadow lift on hover. Color change only.

---

## Open Decisions (V2-specific)

| # | Decision | Priority |
|---|----------|----------|
| 1 | Paper grain opacity: 2.5% recommended -- needs visual review in Figma | High |
| 2 | Bottom sheet drag handle: 2px radius retained as functional exception -- confirm or go fully sharp | Low |
| 3 | Segmented controls / tab bar: sharp corners confirmed for consistency? | Medium |
| 4 | V1 vs V2 direction: SicTransit to select preferred direction or hybrid | Blocking for Figma sprint |
