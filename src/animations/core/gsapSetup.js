import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once centrally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Global default defaults for GSAP
  gsap.defaults({
    ease: 'power3.out',
    duration: 1.2,
  });
}

export { gsap, ScrollTrigger };
