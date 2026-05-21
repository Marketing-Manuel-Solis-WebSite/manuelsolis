import { Variants } from 'framer-motion';

// ============================================================
// Unified Motion Design System — Manuel Solis Law Firm
// Apple/Stripe/Linear level animation constants
// ============================================================

// Easing curves
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1.0] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 120, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 25 },
};

// Duration presets
export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  slower: 1.2,
};

// Reusable animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: ease.out },
  },
};

// Container variants with stagger
export const stagger = (delay: number = 0.08): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
});

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

// Line reveal (for decorative dividers)
export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slower, ease: ease.inOut },
  },
};

// Counter animation helper
export const counterConfig = {
  duration: 2,
  ease: ease.out,
};

// Viewport defaults
export const viewport = {
  once: true,
  margin: '-80px' as const,
};

export const viewportEager = {
  once: true,
  margin: '-30px' as const,
};

// Hover scale for interactive elements
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
};

// Card tilt effect (use with onMouseMove handler)
export const tiltConfig = {
  maxTilt: 6, // degrees
  scale: 1.02,
  speed: 400,
};

// 3D dimensional tokens — consumed by the <Tilt> primitive.
// Restraint is a hard rule: `max` is the CAP for pointer tilt (whisper-subtle,
// professional — never exceed 6°). Spring returns the card to rest (0°) so the
// resting transform is identity and text rasterizes crisply. (DESIGN-LANGUAGE 3D)
export const tilt = {
  max: 6, // degrees — hard cap
  perspective: 1000, // px
  spring: { stiffness: 250, damping: 25, mass: 0.5 },
};

// Reduced-motion variants (instant transitions, no transforms)
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export const fadeInReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
