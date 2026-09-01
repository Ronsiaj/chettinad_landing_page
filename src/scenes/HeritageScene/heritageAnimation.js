import { fadeReveal } from '../../animations/core/animationUtils';

export function initHeritageAnimation(containerRef, elementsRef) {
  if (!containerRef.current) return null;
  return fadeReveal(elementsRef.content, { duration: 1.4 });
}
