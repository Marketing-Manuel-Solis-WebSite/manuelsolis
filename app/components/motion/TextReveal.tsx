'use client';

import { m } from 'framer-motion';
import type { ElementType } from 'react';
import type { Variants } from 'framer-motion';
import { duration, ease } from '../../lib/motion';
import { staggerContainer } from './variants';

/**
 * Typographic reveal. The REAL text is always in the DOM (server-rendered) and
 * exposed to AT via `aria-label`; the per-token spans are `aria-hidden`, so
 * SEO/screen readers get the full string.
 *
 * - `word` (default): splits on spaces, each word is inline-block and animates
 *   opacity + a small translateY. No layout measurement → no CLS, no hydration
 *   mismatch.
 * - `line`: splits on EXPLICIT newlines (caller-controlled), each line masked
 *   with overflow-hidden and a translateY 110%→0 rise. Line height is the
 *   text's natural height; transform doesn't affect layout → no CLS. (Auto-wrap
 *   line detection is intentionally NOT done — it would require measurement.)
 *
 * Transform/opacity only. Reduced-motion handled by the global config. (§8)
 */
type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface TextRevealProps {
  as?: TextTag;
  splitBy?: 'word' | 'line';
  stagger?: number;
  delay?: number;
  className?: string;
  children: string;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: { opacity: 1, y: 0, transition: { duration: duration.fast, ease: ease.out } },
};

const lineVariants: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: duration.normal, ease: ease.out } },
};

export default function TextReveal({
  as = 'span',
  splitBy = 'word',
  stagger = 0.08,
  delay = 0,
  className,
  children,
}: TextRevealProps) {
  const Comp = m[as] as ElementType;

  if (splitBy === 'line') {
    const lines = children.split('\n');
    return (
      <Comp
        className={className}
        aria-label={children.replace(/\n/g, ' ')}
        variants={staggerContainer(0.12, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {lines.map((line, i) => (
          <span key={i} aria-hidden className="block overflow-hidden">
            <m.span className="block" variants={lineVariants}>
              {line}
            </m.span>
          </span>
        ))}
      </Comp>
    );
  }

  const words = children.split(' ');
  return (
    <Comp
      className={className}
      aria-label={children}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block whitespace-pre">
          <m.span className="inline-block" variants={wordVariants}>
            {word}
          </m.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Comp>
  );
}
