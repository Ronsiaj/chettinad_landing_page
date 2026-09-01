import { gsap, ScrollTrigger } from '../../animations/core/gsapSetup';
import { ANIMATION_CONFIG } from '../../animations/animationConfig';

/**
 * SCENE 01 — ARRIVAL ANIMATION CONTROLLER
 * 
 * Scroll-driven camera arrival animation:
 * - Ambient light gradually brightens
 * - Chettinad mansion scales 1.10 -> 1.00 & shifts vertically
 * - Editorial typography reveals line-by-line and dissolves as scroll pushes forward
 */
export function initIntroAnimation(containerRef, elements) {
  const {
    bgLight,
    mansionFrame,
    title,
    subtitle,
    tagline,
  } = elements;

  if (!containerRef.current) return null;

  const isReducedMotion = ANIMATION_CONFIG.getReducedMotion();

  // Reduced Motion Fallback
  if (isReducedMotion) {
    gsap.set(bgLight, { opacity: 0.8 });
    gsap.set(mansionFrame, { opacity: 1, scale: 1, yPercent: 0 });
    gsap.set([tagline, title, subtitle], { opacity: 1, y: 0 });
    return null;
  }

  // Initial State Setup
  gsap.set(bgLight, { opacity: 0.15, scale: 0.9 });
  gsap.set(mansionFrame, { opacity: 0.25, scale: 1.10, yPercent: 5 });
  gsap.set([tagline, title, subtitle], { opacity: 0, y: 35 });

  // ScrollTrigger Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  // Step 1: Atmosphere & Mansion Emergence
  tl.to(bgLight, {
    opacity: 0.85,
    scale: 1,
    ease: 'power1.out',
    duration: 1,
  }, 0);

  tl.to(mansionFrame, {
    opacity: 1,
    scale: 1.00,
    yPercent: 0,
    ease: 'power2.out',
    duration: 1.5,
  }, 0);

  // Step 2: Editorial Typography Reveal
  tl.to([tagline, title, subtitle], {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    ease: 'power3.out',
    duration: 1,
  }, 0.2);

  // Step 3: Dissolve typography as camera pushes forward toward Scene 02
  tl.to([tagline, title, subtitle], {
    opacity: 0.25,
    y: -25,
    ease: 'power2.in',
    duration: 1,
  }, 1.2);

  tl.to(mansionFrame, {
    scale: 0.98,
    ease: 'none',
    duration: 1,
  }, 1.2);

  return tl;
}
