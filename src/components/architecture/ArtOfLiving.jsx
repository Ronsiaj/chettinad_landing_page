import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import courtyardImg from '../../assets/images/architecture/chettinad_courtyard.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * SECTION 2 — "THE ART OF LIVING"
 *
 * Introducing the home-builder's architectural philosophy.
 * Scroll-driven camera pullback sequence (scale 1.18 → 1.0) over the central Chettinad courtyard.
 * Uses inner pin wrapper to completely isolate GSAP pin-spacer from React Virtual DOM reconciliation.
 */
export function ArtOfLiving() {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const bgImageRef = useRef(null);
  const textContainerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const dividerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const pinWrapper = pinWrapperRef.current;
      const bgImage = bgImageRef.current;
      const badge = badgeRef.current;
      const heading = headingRef.current;
      const divider = dividerRef.current;
      const text = textRef.current;

      if (!container || !pinWrapper || !bgImage || !heading || !text) return;

      // ── Reduced motion fallback ──
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(bgImage, { scale: 1 });
        const validFadeElements = [badge, heading, divider, text].filter(Boolean);
        if (validFadeElements.length) gsap.set(validFadeElements, { opacity: 1, y: 0 });
        return;
      }

      // ── Initial states ──
      gsap.set(bgImage, { scale: 1.18, y: 0 });
      if (badge) gsap.set(badge, { opacity: 0, y: 20 });
      if (heading) gsap.set(heading, { opacity: 0, y: 40 });
      if (divider) gsap.set(divider, { opacity: 0, y: 30 });
      if (text) gsap.set(text, { opacity: 0, y: 30 });

      // ── Master ScrollTrigger Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: pinWrapper,
          start: 'top top',
          end: '+=220%',
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 [0.0 → 0.45]: Camera pullback effect on main architecture image
      tl.to(
        bgImage,
        {
          scale: 1.0,
          y: -20,
          ease: 'none',
          duration: 0.45,
        },
        0
      );

      // Phase 2 [0.15 → 0.55]: Badge, Heading, Main Statement & Supporting Essay Reveal
      if (badge) {
        tl.to(
          badge,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.2,
          },
          0.15
        );
      }

      if (heading) {
        tl.to(
          heading,
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.2
        );
      }

      if (divider) {
        tl.to(
          divider,
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.28
        );
      }

      if (text) {
        tl.to(
          text,
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.34
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#120906',
        color: '#F7F3E9',
      }}
    >
      <div
        ref={pinWrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            BACKGROUND ARCHITECTURE LAYER — Camera Pullback (Scale 1.18 → 1.0)
            Central Chettinad courtyard image serving as dominant visual anchor
            ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <img
            ref={bgImageRef}
            src={courtyardImg}
            alt="Chettinad heritage mansion courtyard with carved teak pillars and open-sky light well"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 48%',
              willChange: 'transform',
              filter: 'brightness(0.52) contrast(1.12)',
            }}
          />
          {/* Editorial Vignette & Multi-stage Shading Overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 50% 45%, rgba(18, 9, 6, 0.35) 0%, rgba(18, 9, 6, 0.88) 78%),
                linear-gradient(to bottom, rgba(18, 9, 6, 0.82) 0%, rgba(18, 9, 6, 0.45) 42%, rgba(18, 9, 6, 0.96) 100%)
              `,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FOREGROUND CONTENT — Editorial Layout & Typography
            ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(5.5rem, 10vh, 7rem) clamp(1.5rem, 4vw, 3.5rem) clamp(2rem, 5vh, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* UPPER / CENTER AREA: PHILOSOPHY ESSAY & HEADING */}
          <div
            ref={textContainerRef}
            style={{
              textAlign: 'center',
              maxWidth: '860px',
              margin: '0 auto',
              pointerEvents: 'auto',
            }}
          >
            {/* Eyebrow */}
            <div
              ref={badgeRef}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(0.7rem, 0.85vw, 0.85rem)',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#C68B34',
                marginBottom: 'clamp(0.6rem, 1.2vh, 1rem)',
                willChange: 'transform, opacity',
              }}
            >
              OUR PHILOSOPHY
            </div>

            {/* Main Editorial Heading */}
            <h2
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                fontSize: 'clamp(2.3rem, 5.2vw, 4.6rem)',
                fontWeight: 400,
                color: '#F7F3E9',
                letterSpacing: '0.08em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                textShadow: '0 4px 30px rgba(0,0,0,0.85)',
                marginBottom: 'clamp(0.85rem, 1.8vh, 1.4rem)',
                willChange: 'transform, opacity',
              }}
            >
              THE ART OF LIVING
            </h2>

            {/* Main Statement */}
            <div
              ref={dividerRef}
              style={{
                fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)',
                color: '#E8DCC4',
                fontStyle: 'italic',
                lineHeight: 1.5,
                textShadow: '0 2px 20px rgba(0,0,0,0.85)',
                maxWidth: '840px',
                margin: '0 auto clamp(0.75rem, 1.5vh, 1.25rem)',
                willChange: 'transform, opacity',
              }}
            >
              "We build homes rooted in the timeless character of Chettinad — where architecture, craftsmanship and everyday life come together."
            </div>

            {/* Supporting Paragraph */}
            <p
              ref={textRef}
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(0.85rem, 1.05vw, 1.025rem)',
                color: 'rgba(213, 196, 161, 0.78)',
                fontWeight: 300,
                lineHeight: 1.7,
                letterSpacing: '0.015em',
                textShadow: '0 2px 16px rgba(0,0,0,0.85)',
                maxWidth: '780px',
                margin: '0 auto',
                willChange: 'transform, opacity',
              }}
            >
              Chettinad homes were never designed simply to impress. Their courtyards, corridors, handcrafted details and natural materials were thoughtfully composed around the way people live. We carry that philosophy forward, creating homes that respect tradition while belonging to the present.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
