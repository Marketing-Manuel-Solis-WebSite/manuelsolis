// Motion primitives — server-first animation islands (DESIGN-LANGUAGE.md).
// Each receives server-rendered children; transform/opacity only; respects
// reduced-motion (§8). Use under the global MotionProvider (LazyMotion strict).
export { default as Reveal } from './Reveal';
export { default as Stagger, StaggerItem } from './Stagger';
export { default as Parallax } from './Parallax';
export { default as MagneticButton } from './MagneticButton';
export { default as Shimmer } from './Shimmer';
export { default as TextReveal } from './TextReveal';
export { default as Tilt, TiltLayer } from './Tilt';
export type { RevealVariant } from './variants';
