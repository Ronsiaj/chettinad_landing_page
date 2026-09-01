import { fadeReveal } from '../../animations/core/animationUtils';

export function initMaterialsAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.container, { duration: 1.4 });
}
