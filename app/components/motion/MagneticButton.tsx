'use client';

import { useRef } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { ReactNode, MouseEvent, Ref } from 'react';

/**
 * Magnetic CTA: gently pulls toward the cursor + hover/tap scale. The pointer
 * listener is attached to the element itself (only active while hovered), not
 * a global listener. Transform only, `will-change: transform`.
 *
 * - Touch / coarse pointer: no magnetism, degrades to tap-scale.
 * - Reduced-motion: no magnetism; hover/tap scale is auto-skipped by the
 *   global `reducedMotion="user"` → effectively no movement. (§8)
 * - Wraps a real <a>/<button> so focus/keyboard stay intact.
 */
interface MagneticButtonProps {
  as?: 'a' | 'button';
  strength?: number;
  radius?: number;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  children?: ReactNode;
}

export default function MagneticButton({
  as = 'button',
  strength = 0.3,
  radius = 120,
  href,
  onClick,
  type,
  className,
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const finePointer =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: fine)').matches
      : false;
  const magnetic = !reduced && finePointer;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    onClick,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className,
    style: { x: sx, y: sy, willChange: 'transform', display: 'inline-flex' },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  } as const;

  if (as === 'a') {
    return (
      <m.a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </m.a>
    );
  }
  return (
    <m.button ref={ref as Ref<HTMLButtonElement>} type={type ?? 'button'} {...shared}>
      {children}
    </m.button>
  );
}
