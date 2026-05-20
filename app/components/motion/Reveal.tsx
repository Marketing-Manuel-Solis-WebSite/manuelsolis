'use client';

import { m } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { revealVariants, type RevealVariant } from './variants';

/**
 * Scroll/entrance reveal with depth. Thin client island: `children` are
 * rendered on the server and passed through, so no page content lands in the
 * client bundle. Transform/opacity only.
 *
 * Reduced-motion: handled by the global `MotionConfig reducedMotion="user"`
 * (Fase 1A) — transform offsets are skipped, only opacity animates. (§8)
 */
type RevealTag = 'div' | 'span' | 'p' | 'section' | 'li' | 'a';

interface RevealProps {
  as?: RevealTag;
  variant?: RevealVariant;
  delay?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  href?: string;
  id?: string;
  children?: ReactNode;
}

export default function Reveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  distance = 24,
  once = true,
  amount = 0.2,
  className,
  style,
  href,
  id,
  children,
}: RevealProps) {
  const Comp = m[as] as ElementType;
  return (
    <Comp
      className={className}
      style={style}
      href={href}
      id={id}
      variants={revealVariants(variant, distance)}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}
