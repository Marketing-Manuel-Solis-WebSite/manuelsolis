'use client';

import { m } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { revealVariants, staggerContainer, type RevealVariant } from './variants';

/**
 * Cascade container: staggers the entrance of its `<Stagger.Item>` children.
 * Children inherit the hidden/visible state from this container, so they do
 * NOT each carry their own viewport trigger — the spacing comes from
 * `staggerChildren`. Server-rendered children pass straight through.
 *
 * Reduced-motion: the global config strips transforms, so items fade in
 * near-simultaneously without movement. (§8)
 */
type StaggerTag = 'div' | 'ul' | 'ol' | 'section';

interface StaggerProps {
  as?: StaggerTag;
  gap?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  /** Ver `eager` en Reveal.tsx: pinta desde el servidor y renuncia a la entrada. */
  eager?: boolean;
  children?: ReactNode;
}

function Stagger({
  as = 'div',
  gap = 0.07,
  delayChildren = 0.1,
  once = true,
  amount = 0.2,
  className,
  style,
  eager = false,
  children,
}: StaggerProps) {
  const Comp = m[as] as ElementType;
  return (
    <Comp
      className={className}
      style={style}
      variants={staggerContainer(gap, delayChildren)}
      initial={eager ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

type ItemTag = 'div' | 'li' | 'span' | 'a' | 'article';

interface StaggerItemProps {
  as?: ItemTag;
  variant?: RevealVariant;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  href?: string;
  children?: ReactNode;
}

/** A single staggered child. Inherits visible/hidden from <Stagger>. */
export function StaggerItem({
  as = 'div',
  variant = 'up',
  distance = 24,
  className,
  style,
  href,
  children,
}: StaggerItemProps) {
  const Comp = m[as] as ElementType;
  return (
    <Comp className={className} style={style} href={href} variants={revealVariants(variant, distance)} custom={0}>
      {children}
    </Comp>
  );
}

export default Stagger;
