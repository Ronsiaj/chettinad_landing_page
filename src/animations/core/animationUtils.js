import { gsap } from './gsapSetup';
import { ANIMATION_CONFIG } from '../animationConfig';

/**
 * Reusable helper utilities for Chettinad landing page animations.
 * Provides modular, safe GSAP reveal & scroll effects.
 */

/**
 * Simple fade & slide up reveal for content blocks.
 */
export function fadeReveal(target, options = {}) {
  if (!target || ANIMATION_CONFIG.getReducedMotion()) return null;

  const {
    y = 40,
    opacity = 0,
    duration = ANIMATION_CONFIG.duration.medium,
    ease = ANIMATION_CONFIG.ease.cinematic,
    delay = 0,
    scrollTrigger = null,
  } = options;

  return gsap.fromTo(
    target,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      delay,
      scrollTrigger,
    }
  );
}

/**
 * Architectural Image Reveal effect (clip-path or scale reveal).
 */
export function imageReveal(target, options = {}) {
  if (!target || ANIMATION_CONFIG.getReducedMotion()) return null;

  const {
    scale = 1.15,
    duration = ANIMATION_CONFIG.duration.slow,
    ease = ANIMATION_CONFIG.ease.reveal,
    scrollTrigger = null,
  } = options;

  return gsap.fromTo(
    target,
    { scale, filter: 'brightness(0.7)' },
    {
      scale: 1,
      filter: 'brightness(1)',
      duration,
      ease,
      scrollTrigger,
    }
  );
}

/**
 * Cinematic text reveal (word or line stagger).
 */
export function textReveal(targetElements, options = {}) {
  if (!targetElements || ANIMATION_CONFIG.getReducedMotion()) return null;

  const {
    y = 30,
    stagger = ANIMATION_CONFIG.stagger.medium,
    duration = ANIMATION_CONFIG.duration.medium,
    ease = ANIMATION_CONFIG.ease.cinematic,
    scrollTrigger = null,
  } = options;

  return gsap.fromTo(
    targetElements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger,
    }
  );
}

/**
 * Smooth Parallax scroll utility for architectural layers.
 */
export function parallax(target, options = {}) {
  if (!target || ANIMATION_CONFIG.getReducedMotion()) return null;

  const {
    yPercent = -20,
    trigger = target,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
  } = options;

  return gsap.to(target, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });
}

/**
 * Stagger reveal for lists, cards, or tile patterns.
 */
export function staggerReveal(targets, options = {}) {
  if (!targets || ANIMATION_CONFIG.getReducedMotion()) return null;

  const {
    y = 50,
    stagger = ANIMATION_CONFIG.stagger.relaxed,
    duration = ANIMATION_CONFIG.duration.medium,
    ease = ANIMATION_CONFIG.ease.cinematic,
    scrollTrigger = null,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger,
    }
  );
}
