'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Layered parallax: translates `children` against scroll progress to create
 * depth. Decorative only — never wrap LCP/primary text. Transform only,
 * `will-change: transform`. Uses framer's `useScroll` (shared, rAF-driven).
 *
 * Reduced-motion: DISABLED entirely (renders a static layer) — vestibular
 * safety. (§8)
 */
interface ParallaxProps {
  speed?: number;
  axis?: 'x' | 'y';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Parallax({ speed = 0.2, axis = 'y', className, style, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const range = 80 * speed;
  const offset = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ ...style, ...(axis === 'y' ? { y: offset } : { x: offset }), willChange: 'transform' }}
    >
      {children}
    </m.div>
  );
}
