import { gsap, ScrollTrigger } from '../../animations/core/gsapSetup';
import { ANIMATION_CONFIG } from '../../animations/animationConfig';

/**
 * SCENE 02 — GRAND MANSION APPROACH ANIMATION CONTROLLER
 * 
 * Camera approach simulation:
 * - Mansion scales 1.00 -> 1.28 centered toward the main entrance doorway
 * - Pins section to the viewport for smooth cinematic scrub
 * - Reveals minimal architectural caption as entrance comes into focus
 */
export function initHeroAnimation(containerRef, elements) {
  const {
    heroContainer,
    mansionImage,
    caption,
    portalGlow
  } = elements;

  if (!containerRef.current) return null;

  const isReducedMotion = ANIMATION_CONFIG.getReducedMotion();

  // Reduced Motion Fallback
  if (isReducedMotion) {
    gsap.set(mansionImage, { scale: 1 });
    gsap.set(caption, { opacity: 1, y: 0 });
    return null;
  }

  // Initial State Setup
  gsap.set(mansionImage, { scale: 1.0, transformOrigin: '50% 65%' });
  gsap.set(caption, { opacity: 0, y: 30 });
  gsap.set(portalGlow, { opacity: 0.2, scale: 0.8 });

  // ScrollTrigger Timeline with Pinned Viewport
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '+=150%',
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });

  // Step 1: Camera approach zoom toward the central entrance
  tl.to(mansionImage, {
    scale: 1.28,
    ease: 'none',
    duration: 2,
  }, 0);

  // Step 2: Warm sunlight portal glow expands as we get closer to entrance
  tl.to(portalGlow, {
    opacity: 0.75,
    scale: 1.25,
    ease: 'power1.out',
    duration: 1.8,
  }, 0.2);

  // Step 3: Minimal architectural caption reveal
  tl.to(caption, {
    opacity: 1,
    y: 0,
    ease: 'power2.out',
    duration: 1,
  }, 0.8);

  return tl;
}
