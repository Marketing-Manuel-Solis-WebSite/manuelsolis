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
type RevealTag = 'div' | 'span' | 'p' | 'section' | 'li' | 'a' | 'h2' | 'h3';

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
  /**
   * Renderiza VISIBLE desde el servidor, sin estado inicial oculto.
   *
   * Por defecto este componente emite `style="opacity:0"` en el HTML servido y
   * solo se hace visible cuando framer-motion hidrata y descarga su chunk
   * asíncrono, que no está precargado. Para adorno es correcto. Para un
   * control con el que el visitante tiene que interactuar —un formulario, un
   * teléfono, un CTA— convierte ese chunk en un punto único de fallo: si no
   * llega, el elemento queda invisible, funcional y sin error en ningún log.
   *
   * `eager` deja el elemento pintado desde el primer byte y renuncia a la
   * animación de entrada. Es el intercambio correcto en cualquier cosa que
   * capte un lead.
   */
  eager?: boolean;
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
  eager = false,
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
      initial={eager ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}
