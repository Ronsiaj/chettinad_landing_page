/**
 * Global Animation Configuration for Chettinad Heritage Landing Page
 * Ensures consistent cinematic timing, speeds, and easing across all scenes.
 */

export const ANIMATION_CONFIG = {
  // Easing presets
  ease: {
    cinematic: 'power3.out',
    smooth: 'power2.inOut',
    reveal: 'power4.out',
    parallax: 'none',
    gentle: 'sine.out',
  },

  // Timings (in seconds)
  duration: {
    fast: 0.5,
    medium: 1.0,
    slow: 1.8,
    cinematic: 2.4,
  },

  // Stagger delays
  stagger: {
    tight: 0.1,
    medium: 0.2,
    relaxed: 0.35,
  },

  // ScrollTrigger Defaults
  scroll: {
    scrubSpeed: 1, // 1 second smooth catch up for scrub animations
    startOffset: 'top 85%',
    endOffset: 'bottom 15%',
    triggerHook: 'top 80%',
  },

  // Motion reduction flag check
  getReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};
