import { fadeReveal } from '../../animations/core/animationUtils';

export function initCraftsmanshipAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.wrap, { duration: 1.4 });
}
