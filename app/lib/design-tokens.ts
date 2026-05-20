/**
 * Design tokens — TS bridge to the SINGLE SOURCE OF TRUTH.
 *
 * The canonical tokens live in `app/globals.css` under `@theme` (Tailwind
 * v4), which generates both CSS variables and utility classes. This module
 * does NOT duplicate any value — color/depth tokens are exposed as
 * `var(--...)` references (use them in inline `style`/framer `style` props),
 * and numeric motion values (which framer-motion interpolates) are
 * re-exported from `app/lib/motion.ts`, the framer source. There is nothing
 * to keep in sync by hand, so the previous drift between this file and
 * globals.css is gone.
 *
 * Prefer Tailwind utilities (e.g. `bg-navy-500`, `text-gold-500`,
 * `ease-out-expo`, `shadow-glow-gold`) in JSX; reach for these refs only when
 * you need a token inside an inline style or a motion `style` prop.
 */

import { duration, ease } from './motion';

/** Color tokens → reference the @theme CSS variables (no duplication). */
export const colors = {
  gold: {
    50: 'var(--color-gold-50)',
    100: 'var(--color-gold-100)',
    200: 'var(--color-gold-200)',
    300: 'var(--color-gold-300)',
    400: 'var(--color-gold-400)',
    500: 'var(--color-gold-500)',
    600: 'var(--color-gold-600)',
    700: 'var(--color-gold-700)',
  },
  navy: {
    200: 'var(--color-navy-200)',
    300: 'var(--color-navy-300)',
    400: 'var(--color-navy-400)',
    500: 'var(--color-navy-500)',
    600: 'var(--color-navy-600)',
    700: 'var(--color-navy-700)',
    800: 'var(--color-navy-800)',
    900: 'var(--color-navy-900)',
  },
  /** Surface/border tokens consumed by the .glass* utilities. */
  surfaces: {
    glass: 'var(--surface-glass)',
    elevated: 'var(--surface-elevated)',
    borderSubtle: 'var(--border-subtle)',
    borderMuted: 'var(--border-muted)',
  },
} as const;

/** Depth tokens (glows) → reference the @theme shadow variables. */
export const depth = {
  glowGold: 'var(--shadow-glow-gold)',
  glowGoldStrong: 'var(--shadow-glow-gold-strong)',
  glowBlue: 'var(--shadow-glow-blue)',
} as const;

/**
 * Motion scale for framer-motion (numbers/arrays it can interpolate),
 * re-exported from app/lib/motion.ts. The CSS-side equivalents are the
 * `--duration-*` (ms) and `--ease-*` (cubic-bezier) tokens in @theme.
 */
export const motion = { duration, ease } as const;

/** Border radius scale (rem). */
export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
} as const;

/** Z-index ladder for layering fixed/floating elements. */
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 40,
  fixedNav: 50,
  popup: 60,
  modal: 70,
  toast: 80,
} as const;

export type Colors = typeof colors;
export type Depth = typeof depth;
export type Motion = typeof motion;
