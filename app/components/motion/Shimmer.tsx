'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '../../lib/motion';

/**
 * Gold (or white) light sweep across a premium surface, on hover or on view.
 * The sweep is a transform-only (`translateX`) overlay inside an
 * `overflow-hidden` wrapper; `children` (server-rendered) pass through.
 *
 * Reduced-motion: DISABLED (overlay not rendered → static surface). (§8)
 */
interface ShimmerProps {
  trigger?: 'hover' | 'inView';
  tint?: 'gold' | 'white';
  className?: string;
  children?: ReactNode;
}

export default function Shimmer({ trigger = 'hover', tint = 'gold', className, children }: ShimmerProps) {
  const reduced = useReducedMotion();
  const gradient =
    tint === 'gold'
      ? 'linear-gradient(105deg, transparent 40%, rgba(178,144,77,0.12) 50%, transparent 60%)'
      : 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.14) 50%, transparent 60%)';

  const state =
    trigger === 'hover'
      ? ({ initial: 'rest', whileHover: 'hover' } as const)
      : ({ initial: 'rest', whileInView: 'hover', viewport: { once: true } } as const);

  return (
    <m.span className={`relative inline-block overflow-hidden ${className ?? ''}`} {...state}>
      {children}
      {!reduced && (
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: gradient, willChange: 'transform' }}
          variants={{ rest: { x: '-120%' }, hover: { x: '120%' } }}
          transition={{ duration: 0.9, ease: ease.inOut }}
        />
      )}
    </m.span>
  );
}
