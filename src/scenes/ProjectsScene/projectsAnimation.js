import { fadeReveal } from '../../animations/core/animationUtils';

export function initProjectsAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.container, { duration: 1.4 });
}
