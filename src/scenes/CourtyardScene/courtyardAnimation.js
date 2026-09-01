import { fadeReveal } from '../../animations/core/animationUtils';

export function initCourtyardAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.block, { duration: 1.6 });
}
