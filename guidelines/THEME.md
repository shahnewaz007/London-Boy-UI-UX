# London Boy — Theme & Design System Guidelines

> **Source of truth:** [`src/app/lib/design.ts`](../src/app/lib/design.ts)
>
> All values in this document are exported from that file. **Always import from `design.ts` rather than writing raw values.** If you need to change anything brand-wide, update `design.ts` and every component updates automatically.

---

## Table of Contents

1. [Typography](#1-typography)
2. [Colour Palette](#2-colour-palette)
3. [Spacing & Layout](#3-spacing--layout)
4. [Component Style Objects (`TEXT`)](#4-component-style-objects-text)
5. [Button Styles](#5-button-styles)
6. [Usage Patterns](#6-usage-patterns)
7. [Responsive Header Offset](#7-responsive-header-offset)
8. [Do / Don't](#8-do--dont)

---

## 1. Typography

### Font Families

| Token | Value | Used for |
|---|---|---|
| `FAMILY.display` | `'Klein', sans-serif` | Logo, all `<h1>`/`<h2>` headings, sale titles |
| `FAMILY.body` | `'Klein Text', sans-serif` | All body copy, labels, nav links, UI text |

> `theme.css` sets `body { font-family: 'Klein Text' }` and `h1, h2 { font-family: 'Klein' }` globally. Override only when necessary.

---

### Type Scale

| Token | Value | Usage |
|---|---|---|
| `SIZE.micro` | `0.6rem` | Badge stamps — "NEW", "SALE" |
| `SIZE.label` | `0.75rem` | Uppercase eyebrow labels, section labels ("Men's", "London Boy") |
| `SIZE.small` | `0.85rem` | CTA buttons, "VIEW ALL" links, captions, breadcrumbs, original prices |
| `SIZE.ui` | `0.9rem` | Desktop nav links, filter controls |
| `SIZE.body` | `0.95rem` | **Default body text** — product names, prices, descriptions, newsletter |
| `SIZE.bodyLg` | `1.05rem` | Hero subtitles and sale panel body paragraphs |
| `SIZE.sectionHeading` | `1.75rem` | Section `<h2>` — "Men's Socks", "Women's Socks" |
| `SIZE.pageTitle` | `clamp(1.8rem, 4vw, 3rem)` | Page `<h1>` — Products, Cart, Profile |
| `SIZE.bannerTitle` | `clamp(1.6rem, 3.5vw, 2.8rem)` | Editorial `CategoryBanner` `<h2>` |
| `SIZE.heroTitle` | `clamp(1.8rem, 4.2vw, 3.6rem)` | Hero main headline |
| `SIZE.saleTitle` | `clamp(2.4rem, 3.8vw, 3.6rem)` | Hero sale panel headline |

---

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `WEIGHT.regular` | `400` | Everything by default |
| `WEIGHT.medium` | `500` | Newsletter CTA button, column headings |
| `WEIGHT.semibold` | `600` | Badge counts, cart totals |

> The brand uses **weight 400 (regular) for almost everything** — headings, body, nav. Do not use bold headings unless there is a clear functional reason.

---

### Letter Spacing

| Token | Value | Usage |
|---|---|---|
| `TRACKING.label` | `0.2em` | Uppercase eyebrow labels |
| `TRACKING.logo` | `0.22em` | Logo "LONDON BOY" |
| `TRACKING.nav` | `0.12em` | Desktop nav links |
| `TRACKING.button` | `0.1em` | CTA buttons, "VIEW ALL" links |
| `TRACKING.wide` | `0.18em` | Secondary footer/mobile labels |

---

### Line Heights

| Token | Value | Usage |
|---|---|---|
| `LINE.tight` | `1.15` | Large display headings (banners, hero) |
| `LINE.snug` | `1.4` | Tight UI text |
| `LINE.base` | `1.5` | Default body (set in `theme.css`) |
| `LINE.relaxed` | `1.8` | Descriptions, editorial subtitles |

---

## 2. Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `COLOR.primary` | `#000000` | Primary text, borders, icon strokes, CTA outlines |
| `COLOR.inverse` | `#ffffff` | Inverse text on dark surfaces, hover state text |
| `COLOR.background` | `#ffffff` | Page background |
| `COLOR.surfaceDark` | `#0a0a0a` | Promo bar, footer, dark CTA backgrounds, badge bg |
| `COLOR.accent` | `#c0392b` | SALE nav link, sale badge, promotional red |
| `COLOR.textMuted` | `#9ca3af` | Eyebrow labels, placeholder text, original prices |
| `COLOR.textSecondary` | `#6b7280` | Filter labels, secondary UI text |
| `COLOR.textBody` | `#4b5563` | Editorial body copy, descriptions |
| `COLOR.border` | `#e5e7eb` | Standard card/input borders |
| `COLOR.borderLight` | `#f3f4f6` | Dividers, subtle separators |
| `COLOR.surface` | `#f9fafb` | Card backgrounds, image placeholders |

---

## 3. Spacing & Layout

### Container

```tsx
// Always wrap page content in the standard container:
<section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionY}`}>
```

| Token | Tailwind classes | Description |
|---|---|---|
| `LAYOUT.container` | `max-w-[1400px] mx-auto` | Max-width centred container |
| `LAYOUT.px` | `px-4 sm:px-6 lg:px-8` | Responsive horizontal padding |
| `LAYOUT.sectionY` | `py-16` | Standard section vertical rhythm |
| `LAYOUT.sectionYSm` | `py-8` | Compact sections (banners, tighter blocks) |

### Header Height CSS Variable

The header height is exposed as a CSS custom property for use in `paddingTop` / Tailwind arbitrary values:

| Breakpoint | `--header-h` value | Breakdown |
|---|---|---|
| Mobile (`< 1024px`) | `104px` | 40px promo bar + 64px nav |
| Desktop (`≥ 1024px`) | `120px` | 40px promo bar + 80px nav |

```tsx
// Tailwind — use on all pages below the fixed header:
className="pt-[var(--header-h)]"

// Inline — use in Hero:
style={{ paddingTop: 'var(--header-h)' }}
```

---

## 4. Component Style Objects (`TEXT`)

Pre-built `style={}` objects. Spread directly into JSX:

```tsx
import { TEXT } from '../lib/design';

<p style={TEXT.eyebrow}>Men's</p>
<h2 style={TEXT.sectionTitle}>Men's Socks</h2>
<p style={TEXT.body}>Premium merino wool, crafted for all-day wear.</p>
<Link style={TEXT.ctaLink}>VIEW ALL</Link>
```

| Token | Font size | Weight | Other |
|---|---|---|---|
| `TEXT.eyebrow` | `0.75rem` | 400 | uppercase, tracking `0.2em`, muted grey |
| `TEXT.sectionTitle` | `1.75rem` | 400 | black |
| `TEXT.bannerTitle` | fluid `1.6–2.8rem` | 400 | line-height tight |
| `TEXT.pageTitle` | fluid `1.8–3rem` | 400 | black |
| `TEXT.body` | `0.95rem` | 400 | line-height relaxed, body grey |
| `TEXT.productName` | `0.95rem` | 400 | black |
| `TEXT.price` | `0.95rem` | 400 | black |
| `TEXT.priceOriginal` | `0.85rem` | 400 | muted grey, use with `line-through` class |
| `TEXT.ctaLink` | `0.85rem` | 400 | tracking `0.1em`, black |
| `TEXT.buttonLabel` | `0.85rem` | 400 | tracking `0.1em` |
| `TEXT.navLink` | `0.9rem` | 400 | tracking `0.12em`, no underline |
| `TEXT.mobileNavLink` | `0.95rem` | 400 | tracking `0.1em` |
| `TEXT.filterLabel` | `0.85rem` | 400 | uppercase, tracking `0.18em`, secondary grey |
| `TEXT.badge` | `0.6rem` | — | white text on `#0a0a0a` bg |

---

## 5. Button Styles

### Outline CTA (bordered button)

```tsx
import { BUTTON } from '../lib/design';

<button
  className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
  style={BUTTON.outline}
>
  EXPLORE COLLECTION
</button>
```

### Solid Dark Button (newsletter, add to cart)

```tsx
<button
  className="px-8 py-3.5 hover:opacity-90 transition-opacity text-white"
  style={BUTTON.solid}
>
  Sign Up
</button>
```

| Token | Font size | Weight | Notes |
|---|---|---|---|
| `BUTTON.outline` | `0.85rem` | 400 | tracking `0.1em` — pair with border+hover Tailwind classes |
| `BUTTON.solid` | `0.95rem` | 500 | dark bg (`#0a0a0a`), white text |

---

## 6. Usage Patterns

### Page layout skeleton

```tsx
import { TEXT, LAYOUT } from '../lib/design';

export function MyPage() {
  return (
    <div className="pt-[var(--header-h)] min-h-screen bg-white">

      {/* Page title bar */}
      <div className="border-b border-gray-100">
        <div className={`${LAYOUT.container} ${LAYOUT.px} py-10`}>
          <p style={TEXT.eyebrow}>London Boy</p>
          <h1 style={TEXT.pageTitle}>Page Title</h1>
        </div>
      </div>

      {/* Content section */}
      <section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionY}`}>
        {/* ... */}
      </section>

    </div>
  );
}
```

### Product section with eyebrow + CTA link

```tsx
<section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionY}`}>
  <div className="flex items-center justify-between mb-8">
    <div>
      <p style={TEXT.eyebrow}>Men's</p>
      <h2 style={TEXT.sectionTitle}>Men's Socks</h2>
    </div>
    <Link to="/products?gender=men" style={TEXT.ctaLink} className="hover:underline">
      VIEW ALL
    </Link>
  </div>
  {/* product grid */}
</section>
```

### Dark section (newsletter, promotional)

```tsx
import { COLOR, TEXT } from '../lib/design';

<section style={{ backgroundColor: COLOR.surfaceDark }} className="py-20">
  <h2 className="text-white" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400 }}>
    Get 10% Off When You Sign Up
  </h2>
  <p className="text-white/70" style={TEXT.body}>...</p>
</section>
```

---

## 7. Responsive Header Offset

The fixed header has two heights — set as a CSS variable in `src/styles/theme.css`:

```css
:root { --header-h: 104px; }  /* mobile: 40px promo + 64px nav */

@media (min-width: 1024px) {
  :root { --header-h: 120px; } /* desktop: 40px promo + 80px nav */
}
```

**All pages** that sit below the fixed header must use:
```tsx
className="pt-[var(--header-h)]"
```

Never hardcode `pt-[120px]` — it will overflow on mobile.

---

## 8. Do / Don't

### Typography

| ✅ Do | ❌ Don't |
|---|---|
| Use `TEXT.*` objects from `design.ts` | Write raw `fontSize: '0.95rem'` inline |
| Use `SIZE.*` constants if composing custom styles | Mix Tailwind `text-sm` with inline `fontSize` |
| Use weight `400` for almost all text | Default to `font-bold` or `font-semibold` on headings |
| Use fluid `clamp()` sizes for display text | Use fixed px for responsive display headings |

### Colour

| ✅ Do | ❌ Don't |
|---|---|
| Reference `COLOR.*` tokens | Write raw `#9ca3af` or `text-gray-400` in new code |
| Use `COLOR.surfaceDark` for all dark sections | Mix `bg-black` and `bg-[#0a0a0a]` inconsistently |
| Use `COLOR.accent` for sale/promotional red only | Use red for anything other than sale/discount UI |

### Layout

| ✅ Do | ❌ Don't |
|---|---|
| Use `LAYOUT.container` + `LAYOUT.px` on every section | Repeat `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8` by hand |
| Use `LAYOUT.sectionY` for standard vertical rhythm | Mix arbitrary `py-12`, `py-14`, `py-20` across sections |
| Use `pt-[var(--header-h)]` for page top offset | Hardcode `pt-[120px]` |

### Buttons

| ✅ Do | ❌ Don't |
|---|---|
| Outline: `BUTTON.outline` + border/hover Tailwind classes | Write `fontSize: '0.85rem'` + `letterSpacing: '0.1em'` directly |
| Solid: `BUTTON.solid` for filled dark buttons | Create new button variants without adding to `design.ts` first |

---

*Last updated: April 2026*
