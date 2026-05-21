'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  m,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { tilt as t } from '../../lib/motion';

/**
 * 3D pointer tilt for cards. Thin client island: `children` are server-rendered
 * and pass straight through (no page content in the bundle). Transform/opacity
 * only — the card rotates on rotateX/rotateY toward the cursor, springs back to
 * 0° at rest.
 *
 * Crisp text (the CSS-3D gotcha): perspective lives on the OUTER wrapper, the
 * tilting element carries `preserve-3d` + `backface-visibility: hidden`, and the
 * spring returns to exactly 0° so the resting transform is identity and text
 * rasterizes sharp. `will-change` is managed by framer (added during the
 * animation, dropped at rest).
 *
 * Restraint: `maxTilt` is hard-capped at 6° (whisper-subtle = professional).
 *
 * Reduced-motion / coarse pointer (touch): tilt DISABLED — `children` render in
 * a plain wrapper, so any CSS hover on `className` (e.g. `.card-3d` lift) still
 * applies, just without pointer rotation. (§8)
 *
 * Efficiency: the pointer listener is on the element itself (only active while
 * hovered), and the bounding rect is cached on enter (no getBoundingClientRect
 * per move → no layout thrash). Springs share framer's rAF loop, so many cards
 * (20+) stay smooth.
 */
interface TiltProps {
  /** Max rotation in degrees. Hard-capped at 6°. */
  maxTilt?: number;
  /** Perspective distance in px (lower = stronger 3D). */
  perspective?: number;
  /** Optional hover scale (default 1 = off, for restraint). */
  scale?: number;
  /** Cursor-following sheen reactive to the tilt. Default off. */
  glare?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Tilt({
  maxTilt = t.max,
  perspective = t.perspective,
  scale = 1,
  glare = false,
  className,
  style,
  children,
}: TiltProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, t.spring);
  const sry = useSpring(ry, t.spring);

  // Glare position in % (centered at rest).
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const sgx = useSpring(gx, t.spring);
  const sgy = useSpring(gy, t.spring);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${sgx}% ${sgy}%, rgba(255,255,255,0.16), transparent 55%)`;

  // Restraint cap — never exceed 6° even if a caller passes more.
  const cap = Math.min(maxTilt, t.max);

  // Gate the tilt STRUCTURE behind a mount flag so the first client render
  // matches the server (flat div). Without this, the server renders the flat
  // branch (no window → finePointer false) while the client renders the
  // perspective wrapper + m.div → a hydration mismatch that regenerates the
  // tree. After mount we upgrade to the tilt structure (a normal client update).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const finePointer =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: fine)').matches
      : false;
  const active = mounted && !reduced && finePointer;

  const onEnter = useCallback(() => {
    if (!active || !ref.current) return;
    rect.current = ref.current.getBoundingClientRect();
  }, [active]);

  const onMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!active) return;
      const r = rect.current;
      if (!r) return;
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height; // 0..1
      ry.set((px - 0.5) * 2 * cap); // left/right → rotateY
      rx.set(-(py - 0.5) * 2 * cap); // up/down → rotateX (inverted = natural)
      if (glare) {
        gx.set(px * 100);
        gy.set(py * 100);
      }
    },
    [active, cap, glare, rx, ry, gx, gy]
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }, [rx, ry, gx, gy]);

  // Reduced-motion or touch: flat, no tilt. CSS hover on className still applies.
  if (!active) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective: `${perspective}px` }}>
      <m.div
        ref={ref}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={className}
        style={{
          ...style,
          ...(glare ? { position: 'relative' } : {}),
          rotateX: srx,
          rotateY: sry,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
        whileHover={scale !== 1 ? { scale } : undefined}
      >
        {children}
        {glare && (
          <m.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glareBg, opacity: 0, borderRadius: 'inherit' }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </m.div>
    </div>
  );
}

/**
 * Optional pop-out layer for use INSIDE a <Tilt>: translates a decorative
 * element forward on the Z axis so it floats above the card plane during the
 * tilt (the dimensional "depth" effect). Decorative only — keep body text on
 * the base plane (a translateZ'd text layer can render soft). Static transform.
 */
export function TiltLayer({
  depth = 24,
  className,
  style,
  children,
}: {
  depth?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ ...style, transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
