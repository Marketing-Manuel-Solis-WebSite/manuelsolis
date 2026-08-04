// ============================================================
// Unified Motion Design System — Manuel Solis Law Firm
// Apple/Stripe/Linear level animation constants
// ============================================================
// ALCANCE: solo escalas de tokens (easings, duraciones, 3D). Las variantes
// reutilizables viven en `app/components/motion/variants.ts`
// (`revealVariants` / `staggerContainer`), que es lo que consumen las
// primitivas <Reveal>/<Stagger>/<TextReveal>. No añadas variantes aquí: se
// duplicarían y volverían a quedar sin consumir.

// Easing curves — espejo TS de los tokens --ease-* de @theme en globals.css.
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1.0] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 120, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 25 },
};

// Duration presets (segundos) — espejo de los tokens --duration-* (ms).
export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  slower: 1.2,
};

// 3D dimensional tokens — consumed by the <Tilt> primitive.
// Restraint is a hard rule: `max` is the CAP for pointer tilt (whisper-subtle,
// professional — never exceed 6°). Spring returns the card to rest (0°) so the
// resting transform is identity and text rasterizes crisply. (DESIGN-LANGUAGE 3D)
export const tilt = {
  max: 6, // degrees — hard cap
  perspective: 1000, // px
  spring: { stiffness: 250, damping: 25, mass: 0.5 },
};
