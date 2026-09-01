import { gsap } from '../core/gsapSetup';
import { ANIMATION_CONFIG } from '../animationConfig';

/**
 * CINEMATIC HERO ARCH REVEAL ANIMATION
 * 
 * Auto-plays on page load without scroll interaction:
 * 1. Screen starts dark teak.
 * 2. Small central traditional Chettinad arch mask expands outward (0.15 -> 10.0).
 * 3. Reveals underlying palace image through the enlarging architectural opening.
 * 4. Arch expands past viewport boundaries, leaving palace image 100% full screen.
 * 5. Minimal editorial title typography reveals gracefully.
 */
export function initHeroRevealAnimation(containerRef, elements) {
  if (!containerRef.current) return null;

  const isReducedMotion = ANIMATION_CONFIG.getReducedMotion();

  const {
    archMask,
    palaceImage,
    sceneTag,
    title,
    subtitle,
  } = elements;

  // Reduced Motion Fallback
  if (isReducedMotion) {
    if (archMask) gsap.set(archMask, { scale: 10, transformOrigin: 'center center' });
    if (palaceImage) gsap.set(palaceImage, { scale: 1 });
    if (sceneTag) gsap.set(sceneTag, { opacity: 1, y: 0 });
    if (title) gsap.set(title, { opacity: 1, y: 0 });
    if (subtitle) gsap.set(subtitle, { opacity: 1, y: 0 });
    return null;
  }

  // STEP 0: INITIAL STATES
  if (archMask) {
    gsap.set(archMask, { 
      scale: 0.12, 
      transformOrigin: '50% 50%',
      willChange: 'transform',
    });
  }

  if (palaceImage) {
    gsap.set(palaceImage, { 
      scale: 1.18, 
      filter: 'brightness(0.9) contrast(1.05)',
      willChange: 'transform',
    });
  }

  if (sceneTag) gsap.set(sceneTag, { opacity: 0, y: -15 });
  if (title) gsap.set(title, { opacity: 0, y: 35 });
  if (subtitle) gsap.set(subtitle, { opacity: 0, y: 25 });

  // AUTOMATIC PAGE-LOAD TIMELINE
  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' }
  });

  // 1. ARCH MASK EXPANSION (0.0s -> 2.8s)
  tl.to(archMask, {
    scale: 12.0,
    duration: 3.0,
    ease: 'power3.inOut',
  }, 0.2);

  // 2. PALACE IMAGE CAMERA SETTLE (0.2s -> 3.2s)
  tl.to(palaceImage, {
    scale: 1.0,
    filter: 'brightness(0.95) contrast(1.05)',
    duration: 3.0,
    ease: 'power2.out',
  }, 0.2);

  // 3. EDITORIAL TYPOGRAPHY REVEAL (2.2s -> 3.2s)
  tl.to(sceneTag, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, 2.2);

  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out',
  }, 2.4);

  tl.to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out',
  }, 2.6);

  return tl;
}
