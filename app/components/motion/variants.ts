// Shared reveal variants for the motion primitives. Plain data/functions
// (no 'use client') so client islands can import them. Transform/opacity only.
import type { Variants } from 'framer-motion';
import { duration, ease } from '../../lib/motion';

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur';

function hiddenFor(variant: RevealVariant, distance: number): Record<string, number> {
  switch (variant) {
    case 'up': return { opacity: 0, y: distance };
    case 'down': return { opacity: 0, y: -distance };
    case 'left': return { opacity: 0, x: distance };
    case 'right': return { opacity: 0, x: -distance };
    case 'scale': return { opacity: 0, scale: 0.96 };
    // `blur` is implemented as a soft scale emerge (NOT filter:blur) to honor
    // the transform/opacity-only rule and let reducedMotion handle it for free.
    case 'blur': return { opacity: 0, scale: 0.94 };
    case 'fade':
    default: return { opacity: 0 };
  }
}

/**
 * Reveal variants with a function `visible` so a per-instance `delay` can be
 * passed via framer's `custom` prop. Works standalone and as a stagger child
 * (where `custom` is 0 and the parent supplies the spacing).
 */
export function revealVariants(variant: RevealVariant, distance: number): Variants {
  return {
    hidden: hiddenFor(variant, distance),
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: duration.normal, ease: ease.out, delay },
    }),
  };
}

/** Container variants that stagger the entrance of child variant components. */
export function staggerContainer(gap: number, delayChildren: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren } },
  };
}
