import { fadeReveal } from '../../animations/core/animationUtils';

export function initFinalAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.cta, { duration: 1.5 });
}
