'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';

// Dynamic import: the domAnimation feature bundle is fetched in a separate
// async chunk after hydration (NOT part of First Load). See ./features.ts.
const loadFeatures = () => import('./features').then((mod) => mod.default);

/**
 * Lazy-loads framer-motion's animation feature set on the client so that
 * the full motion bundle is NOT part of the First Load JS of every route.
 *
 * - `domAnimation` (~15kb) covers animations, variants, exit animations
 *   (AnimatePresence) and hover/tap/focus gestures — everything used across
 *   the site except shared-layout (`layoutId`) animations.
 * - `strict` forbids the heavyweight `motion.*` components: only `m.*` is
 *   allowed, which keeps the lazy split honest (a stray `motion.*` throws).
 *
 * The single exception is `TestimoniosClient`, which uses `layoutId` and
 * therefore mounts its own nested `<LazyMotion features={domMax}>`.
 *
 * `MotionConfig reducedMotion="user"` makes every `m.*` animation honor the
 * OS-level "reduce motion" preference (transform-based motion is skipped,
 * opacity/color still animate) without per-component handling.
 *
 * Mounted high in the client tree (inside LanguageProvider in
 * app/[lang]/layout.tsx) so all page/component animations are covered.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
