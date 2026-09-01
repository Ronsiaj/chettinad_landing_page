import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import craftsmanshipImg from '../../assets/images/architecture/chettinad_craftsmanship.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * SECTION 4 — "CRAFTED BY GENERATIONS"
 *
 * Showcasing the human hands, heritage skill, and craftsmanship behind Chettinad homes.
 * Features a scroll-driven slow detail inspection reveal on carved Burma teak architecture.
 * Uses inner pin wrapper to completely isolate GSAP pin-spacer from React Virtual DOM reconciliation.
 */
export function CraftedByGenerations() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const detailImgRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const statementRef = useRef(null);
  const textRef = useRef(null);
  const principle1Ref = useRef(null);
  const principle2Ref = useRef(null);
  const principle3Ref = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const detailImg = detailImgRef.current;
      const badge = badgeRef.current;
      const heading = headingRef.current;
      const statement = statementRef.current;
      const text = textRef.current;
      const p1 = principle1Ref.current;
      const p2 = principle2Ref.current;
      const p3 = principle3Ref.current;

      if (!section || !pinWrapper || !detailImg) return;

      // Reduced motion check
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(detailImg, { scale: 1 });
        const validFade = [badge, heading, statement, text, p1, p2, p3].filter(Boolean);
        if (validFade.length) gsap.set(validFade, { opacity: 1, y: 0 });
        return;
      }

      // Initial States
      gsap.set(detailImg, { scale: 1.18, y: 0 });
      if (badge) gsap.set(badge, { opacity: 0, y: 20 });
      if (heading) gsap.set(heading, { opacity: 0, y: 35 });
      if (statement) gsap.set(statement, { opacity: 0, y: 30 });
      if (text) gsap.set(text, { opacity: 0, y: 30 });
      
      const validPrinciples = [p1, p2, p3].filter(Boolean);
      if (validPrinciples.length) gsap.set(validPrinciples, { opacity: 0, y: 35 });

      // Master Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinWrapper,
          start: 'top top',
          end: '+=200%',
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 1. Slow Architectural Detail Inspection Reveal (Scale 1.18 → 1.0)
      tl.to(
        detailImg,
        {
          scale: 1.0,
          y: -15,
          ease: 'none',
          duration: 0.5,
        },
        0
      );

      // 2. Right Column Text Reveal
      if (badge) tl.to(badge, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.15);
      if (heading) tl.to(heading, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.25 }, 0.2);
      if (statement) tl.to(statement, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.28 }, 0.28);
      if (text) tl.to(text, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.25 }, 0.34);

      // 3. Staggered Lower Principles Reveal
      if (p1) tl.to(p1, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.25 }, 0.48);
      if (p2) tl.to(p2, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.25 }, 0.60);
      if (p3) tl.to(p3, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.25 }, 0.72);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#140A07',
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
            ATMOSPHERIC VIGNETTE & BACKGROUND LIGHTING
            ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 30% 50%, rgba(32, 16, 11, 0.65) 0%, rgba(20, 10, 7, 0.95) 75%),
              linear-gradient(to bottom, rgba(20, 10, 7, 0.8) 0%, rgba(20, 10, 7, 0.5) 40%, rgba(20, 10, 7, 0.98) 100%)
            `,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ═══════════════════════════════════════════════════════════
            SECTION CONTENT — EDITORIAL SPLIT COMPOSITION
            ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vh, 3.5rem) clamp(1.5rem, 4vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          {/* UPPER AREA: MAIN VISUAL (LEFT) & EDITORIAL NARRATIVE (RIGHT) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
              width: '100%',
              marginTop: 'clamp(0.5rem, 2vh, 1.5rem)',
              pointerEvents: 'auto',
            }}
          >
            {/* LEFT / MAIN VISUAL: CARVED CHETTINAD PILLAR & CRAFTSMANSHIP DETAIL */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(260px, 42vh, 440px)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(20, 10, 7, 0.6)',
                border: '1px solid rgba(198, 139, 52, 0.28)',
                backgroundColor: '#1C0D08',
              }}
            >
              <img
                ref={detailImgRef}
                src={craftsmanshipImg}
                alt="Authentic Chettinad carved Burma teakwood pillar capital macro detail"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                  willChange: 'transform',
                  filter: 'brightness(0.82) contrast(1.12)',
                }}
              />
              {/* Inner Architectural Vignette Frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(circle at 50% 50%, transparent 40%, rgba(20, 10, 7, 0.65) 100%),
                    linear-gradient(to top, rgba(20, 10, 7, 0.7) 0%, transparent 40%)
                  `,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* RIGHT / NARRATIVE: HEADINGS & ESSAY */}
            <div style={{ maxWidth: '620px' }}>
              {/* Eyebrow */}
              <div
                ref={badgeRef}
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 'clamp(0.7rem, 0.85vw, 0.85rem)',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#C68B34',
                  marginBottom: 'clamp(0.5rem, 1vh, 0.85rem)',
                  willChange: 'transform, opacity',
                }}
              >
                04 — CRAFT & DETAIL
              </div>

              {/* Main Heading */}
              <h2
                ref={headingRef}
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.08em',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  textShadow: '0 4px 30px rgba(0,0,0,0.85)',
                  marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                  willChange: 'transform, opacity',
                }}
              >
                CRAFTED BY GENERATIONS
              </h2>

              {/* Main Statement */}
              <p
                ref={statementRef}
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                  color: '#E8DCC4',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  textShadow: '0 2px 20px rgba(0,0,0,0.85)',
                  marginBottom: 'clamp(0.6rem, 1.2vh, 0.9rem)',
                  willChange: 'transform, opacity',
                }}
              >
                "Every home carries the character of the hands that shaped it."
              </p>

              {/* Supporting Paragraph */}
              <p
                ref={textRef}
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 'clamp(0.85rem, 1vw, 1.02rem)',
                  color: 'rgba(213, 196, 161, 0.78)',
                  fontWeight: 300,
                  lineHeight: 1.68,
                  letterSpacing: '0.015em',
                  textShadow: '0 2px 16px rgba(0,0,0,0.85)',
                  margin: 0,
                  willChange: 'transform, opacity',
                }}
              >
                From carved Burma teak to handcrafted surfaces and carefully finished architectural details, traditional craftsmanship gives each Chettinad home its enduring character.
              </p>
            </div>
          </div>

          {/* LOWER AREA: THREE CRAFTSMANSHIP PRINCIPLES (REFINED TYPOGRAPHY) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              width: '100%',
              borderTop: '1px solid rgba(198, 139, 52, 0.25)',
              paddingTop: 'clamp(1rem, 2vh, 1.75rem)',
              marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              pointerEvents: 'auto',
            }}
          >
            {/* 01 — CARVED WOOD */}
            <div ref={principle1Ref} style={{ willChange: 'transform, opacity' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#C68B34',
                  marginBottom: '0.35rem',
                }}
              >
                01
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(1.1rem, 1.4vw, 1.45rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                CARVED WOOD
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                  color: 'rgba(213, 196, 161, 0.85)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                "Burma teak shaped into pillars, brackets, doors and details that become part of the architecture."
              </p>
            </div>

            {/* 02 — HANDCRAFTED TILE */}
            <div ref={principle2Ref} style={{ willChange: 'transform, opacity' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#C68B34',
                  marginBottom: '0.35rem',
                }}
              >
                02
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(1.1rem, 1.4vw, 1.45rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                HANDCRAFTED TILE
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                  color: 'rgba(213, 196, 161, 0.85)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                "Athangudi tiles laid by hand, bringing pattern, colour and character to every floor."
              </p>
            </div>

            {/* 03 — TIMELESS DETAIL */}
            <div ref={principle3Ref} style={{ willChange: 'transform, opacity' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#C68B34',
                  marginBottom: '0.35rem',
                }}
              >
                03
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(1.1rem, 1.4vw, 1.45rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                TIMELESS DETAIL
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                  color: 'rgba(213, 196, 161, 0.85)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                "Small architectural details that transform a house into a home with identity."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
