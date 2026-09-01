import { gsap } from '../core/gsapSetup';
import { ANIMATION_CONFIG } from '../animationConfig';

/**
 * HERO ENTRANCE ANIMATION
 * 
 * Subtle cinematic entrance on page load.
 * The architecture image is visible from the first frame — 
 * this animation refines the composition, not reveals it.
 * 
 * Sequence:
 * 1. Image settles from slight zoom (1.06 → 1.0) with brightness lift
 * 2. Overlay gradient softens into place
 * 3. Navigation fades in
 * 4. Editorial text elements stagger upward
 * 5. CTA and decorative elements appear last
 * 6. Scroll indicator pulses gently (looping)
 */
export function initHeroEntranceAnimation(elements) {
  const {
    heroImage,
    overlayGradient,
    navHeader,
    tagLabel,
    headline,
    subtitle,
    ctaButton,
    decorLine,
    scrollIndicator,
  } = elements;

  const isReducedMotion = ANIMATION_CONFIG.getReducedMotion();

  // Reduced motion: show everything immediately
  if (isReducedMotion) {
    const allEls = [heroImage, overlayGradient, navHeader, tagLabel, headline, subtitle, ctaButton, decorLine, scrollIndicator];
    allEls.forEach(el => {
      if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: 'none' });
    });
    return null;
  }

  // ── Initial states ──
  gsap.set(heroImage, { 
    scale: 1.06, 
    opacity: 0.7,
    filter: 'brightness(0.75) contrast(1.04)',
  });
  gsap.set(overlayGradient, { opacity: 0 });
  gsap.set(navHeader, { opacity: 0, y: -20 });
  gsap.set(tagLabel, { opacity: 0, y: 18 });
  gsap.set(headline, { opacity: 0, y: 40 });
  gsap.set(subtitle, { opacity: 0, y: 25 });
  gsap.set(ctaButton, { opacity: 0, y: 20 });
  gsap.set(decorLine, { scaleX: 0, transformOrigin: 'left center' });
  gsap.set(scrollIndicator, { opacity: 0, y: 10 });

  // ── Master entrance timeline ──
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Image settles (0.0s → 1.8s)
  tl.to(heroImage, {
    scale: 1.0,
    opacity: 1,
    filter: 'brightness(0.92) contrast(1.06)',
    duration: 2.0,
    ease: 'power2.out',
  }, 0);

  // 2. Gradient overlay fades in (0.3s → 1.3s)
  tl.to(overlayGradient, {
    opacity: 1,
    duration: 1.2,
    ease: 'power2.inOut',
  }, 0.3);

  // 3. Navigation header descends (0.6s → 1.4s)
  tl.to(navHeader, {
    opacity: 1,
    y: 0,
    duration: 0.9,
  }, 0.6);

  // 4. Decorative gold line extends (0.9s → 1.8s)
  tl.to(decorLine, {
    scaleX: 1,
    duration: 1.0,
    ease: 'power2.inOut',
  }, 0.9);

  // 5. Tag label (1.0s → 1.7s)
  tl.to(tagLabel, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, 1.0);

  // 6. Headline (1.15s → 2.15s)
  tl.to(headline, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
  }, 1.15);

  // 7. Subtitle (1.4s → 2.2s)
  tl.to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 0.9,
  }, 1.4);

  // 8. CTA button (1.7s → 2.4s)
  tl.to(ctaButton, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, 1.7);

  // 9. Scroll indicator (2.2s → 2.8s)
  tl.to(scrollIndicator, {
    opacity: 0.6,
    y: 0,
    duration: 0.7,
  }, 2.2);

  // 10. Gentle scroll indicator pulse (loops after entrance completes)
  tl.add(() => {
    gsap.to(scrollIndicator, {
      y: 6,
      duration: 1.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, 2.9);

  return tl;
}
