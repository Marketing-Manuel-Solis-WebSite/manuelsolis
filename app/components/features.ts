// Isolated framer-motion feature bundle for LazyMotion's dynamic import.
//
// Keeping `domAnimation` in its own module lets MotionProvider load it via
// `() => import('./features')`, so the animation engine (~15-20kb) is split
// into a separate async chunk fetched AFTER hydration instead of riding in
// the layout's First Load chunk on every route.
import { domAnimation } from 'framer-motion';

export default domAnimation;
