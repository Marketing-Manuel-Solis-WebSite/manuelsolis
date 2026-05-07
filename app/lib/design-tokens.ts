/**
 * Design tokens for Manuel Solis Law Firm — v3.0 base.
 *
 * Single source of truth for colors, typography, spacing modifiers,
 * and motion durations used across the site. Mirrors the CSS custom
 * properties declared in app/globals.css; importing from here keeps
 * TypeScript code in sync with the stylesheet.
 *
 * Usage in components:
 *   import { colors, motion } from '@/lib/design-tokens';
 *   <div style={{ background: colors.gold[500] }}>...</div>
 *
 * If you change a value here, mirror it in globals.css (and vice
 * versa). A future Phase may add a build-time codegen to keep them
 * synchronized automatically.
 *
 * See DISCOVERY_v3.md §10.3.
 */

export const colors = {
  /** Brand gold — primary action accent. */
  gold: {
    50: '#FDF8F0',
    100: '#F9EDD8',
    200: '#F0D9A8',
    300: '#E5C17A',
    400: '#D4A94E',
    500: '#B2904D', // dominant CTA color
    600: '#96773E',
    700: '#7A5F30',
  },
  /** Brand navy — dominant background and text on light surfaces. */
  navy: {
    900: '#000814',
    800: '#000A20',
    700: '#000510',
    600: '#001026',
    500: '#001540', // primary surface
    400: '#001E5C',
    300: '#002868',
    200: '#0b1c33',
  },
  /** Emergency / alert (used by the Hero detained-relative popup). */
  emergency: {
    900: 'rgb(127, 29, 29)', // red-900
    500: 'rgb(239, 68, 68)', // red-500
  },
  /** Channel-specific brand colors. */
  channels: {
    whatsapp: '#25D366',
    whatsappPressed: '#1da851',
  },
  /** Surface tokens used in glass-morphism utilities. */
  surfaces: {
    glass: 'rgba(255, 255, 255, 0.03)',
    elevated: 'rgba(255, 255, 255, 0.06)',
    borderSubtle: 'rgba(178, 144, 77, 0.15)',
    borderMuted: 'rgba(255, 255, 255, 0.08)',
  },
} as const;

export const typography = {
  family: {
    /** Loaded via next/font/google in app/layout.tsx (--font-outfit). */
    primary: 'var(--font-outfit), -apple-system, BlinkMacSystemFont, sans-serif',
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
} as const;

export const motion = {
  duration: {
    fast: 0.2,
    base: 0.3,
    slow: 0.5,
    deliberate: 0.8,
  },
  easing: {
    standard: [0.25, 1, 0.5, 1] as const, // ease-out smooth
    spring: { type: 'spring', stiffness: 200, damping: 18 } as const,
  },
} as const;

/** Z-index ladder for layering fixed/floating elements. */
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 40,
  fixedNav: 50, // header, mobile sticky bar
  popup: 60, // hero popup, dropdown menus
  modal: 70,
  toast: 80,
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Motion = typeof motion;
