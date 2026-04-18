/**
 * London Boy — Design System Tokens
 *
 * Single source of truth for typography, colour, spacing, and pre-built
 * style objects used across every page and component. When tweaking the
 * brand look, change values here and every component updates automatically.
 *
 * Usage:
 *   import { COLOR, FONT, TEXT, UI } from '@/lib/design';
 *   <p style={TEXT.eyebrow}>NEW ARRIVALS</p>
 *   <h2 style={TEXT.sectionTitle}>Men's Socks</h2>
 */

// ─── Font Families ────────────────────────────────────────────────────────────
export const FAMILY = {
  display: "'Klein', sans-serif",  // headings, logo, sale titles
  body: "'Klein Text', sans-serif", // all body, UI, labels
} as const;

// ─── Type Scale ───────────────────────────────────────────────────────────────
export const SIZE = {
  /** Badge stamps — "NEW", "SALE" */
  micro: '0.6rem',
  /** Uppercase eyebrow labels, section labels — "Men's", "London Boy" */
  label: '0.75rem',
  /** Secondary links, CTA buttons, captions, breadcrumbs */
  small: '0.85rem',
  /** UI controls — nav links, filter text */
  ui: '0.9rem',
  /** Body copy, product names, prices, descriptions */
  body: '0.95rem',
  /** Slightly larger body for hero paragraphs */
  bodyLg: '1.05rem',
  /** Section h2 — "Men's Socks", "Women's Socks" */
  sectionHeading: '1.75rem',
  /** Fluid — page h1 titles (Products, Cart, etc.) */
  pageTitle: 'clamp(1.8rem, 4vw, 3rem)',
  /** Fluid — editorial banner h2 */
  bannerTitle: 'clamp(1.6rem, 3.5vw, 2.8rem)',
  /** Fluid — hero main headline */
  heroTitle: 'clamp(1.8rem, 4.2vw, 3.6rem)',
  /** Fluid — sale panel headline */
  saleTitle: 'clamp(2.4rem, 3.8vw, 3.6rem)',
} as const;

// ─── Font Weights ─────────────────────────────────────────────────────────────
export const WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

// ─── Letter Spacing ───────────────────────────────────────────────────────────
export const TRACKING = {
  /** Eyebrow labels, section labels */
  label: '0.2em',
  /** Logo */
  logo: '0.22em',
  /** Desktop nav links */
  nav: '0.12em',
  /** CTA buttons, "VIEW ALL" links */
  button: '0.1em',
  /** Wide-spaced secondary labels */
  wide: '0.18em',
} as const;

// ─── Line Heights ─────────────────────────────────────────────────────────────
export const LINE = {
  tight: 1.15,
  snug: 1.4,
  base: 1.5,
  relaxed: 1.8,
} as const;

// ─── Colour Palette ───────────────────────────────────────────────────────────
export const COLOR = {
  /** Pure black — primary text, borders, buttons */
  primary: '#000000',
  /** White — inverse text, backgrounds */
  inverse: '#ffffff',
  /** Page background */
  background: '#ffffff',
  /** Dark surfaces — promo bar, footer, dark CTAs */
  surfaceDark: '#0a0a0a',
  /** Sale / accent red */
  accent: '#c0392b',
  /** Muted / placeholder text (Tailwind gray-400) */
  textMuted: '#9ca3af',
  /** Secondary body text (Tailwind gray-500) */
  textSecondary: '#6b7280',
  /** Editorial body copy (Tailwind gray-600) */
  textBody: '#4b5563',
  /** Standard border (Tailwind gray-200) */
  border: '#e5e7eb',
  /** Light dividers (Tailwind gray-100) */
  borderLight: '#f3f4f6',
  /** Input / card background (Tailwind gray-50) */
  surface: '#f9fafb',
} as const;

// ─── Layout helpers (Tailwind class strings) ──────────────────────────────────
export const LAYOUT = {
  /** Outer container — max-width + centered */
  container: 'max-w-[1400px] mx-auto',
  /** Standard horizontal page padding */
  px: 'px-4 sm:px-6 lg:px-8',
  /** Full section vertical rhythm */
  sectionY: 'py-16',
  /** Compact section (banners, tighter blocks) */
  sectionYSm: 'py-8',
} as const;

// ─── Pre-built React style objects ────────────────────────────────────────────
// Spread directly into JSX: <p style={TEXT.eyebrow}>
export const TEXT = {
  /** Uppercase tracking label above headings */
  eyebrow: {
    fontSize: SIZE.label,
    letterSpacing: TRACKING.label,
    color: COLOR.textMuted,
    textTransform: 'uppercase' as const,
    fontWeight: WEIGHT.regular,
  },

  /** Section h2 — product grid titles */
  sectionTitle: {
    fontSize: SIZE.sectionHeading,
    fontWeight: WEIGHT.regular,
    color: COLOR.primary,
  },

  /** Fluid editorial banner h2 */
  bannerTitle: {
    fontSize: SIZE.bannerTitle,
    fontWeight: WEIGHT.regular,
    lineHeight: LINE.tight,
    color: COLOR.primary,
  },

  /** Fluid page h1 */
  pageTitle: {
    fontSize: SIZE.pageTitle,
    fontWeight: WEIGHT.regular,
    color: COLOR.primary,
  },

  /** Standard body / description */
  body: {
    fontSize: SIZE.body,
    lineHeight: LINE.relaxed,
    color: COLOR.textBody,
    fontWeight: WEIGHT.regular,
  },

  /** Product name in card */
  productName: {
    fontSize: SIZE.body,
    fontWeight: WEIGHT.regular,
    color: COLOR.primary,
  },

  /** Price */
  price: {
    fontSize: SIZE.body,
    fontWeight: WEIGHT.regular,
    color: COLOR.primary,
  },

  /** Struck-through original price */
  priceOriginal: {
    fontSize: SIZE.small,
    color: COLOR.textMuted,
  },

  /** "VIEW ALL" / secondary navigation links */
  ctaLink: {
    fontSize: SIZE.small,
    letterSpacing: TRACKING.button,
    color: COLOR.primary,
    fontWeight: WEIGHT.regular,
  },

  /** Button / CTA label inside bordered buttons */
  buttonLabel: {
    fontSize: SIZE.small,
    letterSpacing: TRACKING.button,
    fontWeight: WEIGHT.regular,
  },

  /** Desktop nav link */
  navLink: {
    fontSize: SIZE.ui,
    fontWeight: WEIGHT.regular,
    letterSpacing: TRACKING.nav,
    color: COLOR.primary,
    textDecoration: 'none' as const,
  },

  /** Mobile nav drawer link */
  mobileNavLink: {
    fontSize: SIZE.body,
    letterSpacing: TRACKING.button,
    fontWeight: WEIGHT.regular,
  },

  /** Filter / sidebar label */
  filterLabel: {
    fontSize: SIZE.small,
    letterSpacing: TRACKING.wide,
    color: COLOR.textSecondary,
    textTransform: 'uppercase' as const,
  },

  /** Badge stamp on product images */
  badge: {
    fontSize: SIZE.micro,
    letterSpacing: TRACKING.wide,
    backgroundColor: COLOR.surfaceDark,
    color: COLOR.inverse,
  },
} as const;

// ─── Common border-button style (outline CTA) ─────────────────────────────────
/** Spread this + className="border border-black hover:bg-black hover:text-white transition-colors" */
export const BUTTON = {
  outline: {
    fontSize: SIZE.small,
    letterSpacing: TRACKING.button,
    fontWeight: WEIGHT.regular,
  },
  /** Solid dark button (newsletter, add to cart) */
  solid: {
    fontSize: SIZE.body,
    letterSpacing: TRACKING.button,
    fontWeight: WEIGHT.medium,
    backgroundColor: COLOR.surfaceDark,
    color: COLOR.inverse,
  },
} as const;
