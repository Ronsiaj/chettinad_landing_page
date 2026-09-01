import { fadeReveal } from '../../animations/core/animationUtils';

export function initArchitectureAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.box, { duration: 1.4 });
}
