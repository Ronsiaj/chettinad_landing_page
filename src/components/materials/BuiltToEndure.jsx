import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import limePlasterImg from '../../assets/images/architecture/chettinad_lime_plaster.png';
import brickSandImg from '../../assets/images/architecture/chettinad_brick_sand.png';
import tileImg from '../../assets/images/architecture/chettinad_materials.png';
import mansionImg from '../../assets/images/animation_images/home_entrance.jpeg';

gsap.registerPlugin(ScrollTrigger);

/**
 * SECTION 5 — "BUILT TO ENDURE"
 *
 * Cinematic material & construction heritage sequence showcasing:
 * 01 — LIME PLASTER (Vellai Karakku smooth breathable plaster)
 * 02 — BRICK & SAND (Traditional terracotta & river sand masonry)
 * 03 — ATHANGUDI TILES (Handcrafted patterned tile flooring)
 * 04 — FINAL COMPOSITION (Materials → Architecture → Heritage)
 */
export function BuiltToEndure() {
  const sectionRef = useRef(null);

  // Header refs
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  // Frame refs for 4 visual states
  const limeFrameRef = useRef(null);
  const brickFrameRef = useRef(null);
  const tileFrameRef = useRef(null);
  const finalFrameRef = useRef(null);

  // Text container refs for material stories
  const limeTextRef = useRef(null);
  const brickTextRef = useRef(null);
  const tileTextRef = useRef(null);
  const finalStatementRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const badge = badgeRef.current;
      const heading = headingRef.current;
      const text = textRef.current;

      const fLime = limeFrameRef.current;
      const fBrick = brickFrameRef.current;
      const fTile = tileFrameRef.current;
      const fFinal = finalFrameRef.current;

      const tLime = limeTextRef.current;
      const tBrick = brickTextRef.current;
      const tTile = tileTextRef.current;
      const statement = finalStatementRef.current;

      if (!section || !heading) return;

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([badge, heading, text, tLime, tBrick, tTile, statement], { opacity: 1, y: 0 });
        gsap.set([fLime, fBrick, fTile, fFinal], { opacity: 1, scale: 1 });
        return;
      }

      // Initial States
      gsap.set([badge, heading, text], { opacity: 0, y: 30 });
      gsap.set([fLime, fBrick, fTile, fFinal], { opacity: 0, scale: 1.1, y: 15 });
      gsap.set([tLime, tBrick, tTile], { opacity: 0, y: 25 });
      gsap.set(statement, { opacity: 0, y: 30 });

      // First visual (Lime Plaster) starts active
      gsap.set(fLime, { opacity: 1, scale: 1.12, y: 0 });

      // Master Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=280%',
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ── STEP 0: Section Entrance (0.0 → 0.15) ──
      tl.to(badge, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0)
        .to(heading, { opacity: 1, y: 0, duration: 0.15, ease: 'power3.out' }, 0.04)
        .to(text, { opacity: 1, y: 0, duration: 0.15, ease: 'power3.out' }, 0.08);

      // ── STEP 1: LIME PLASTER (0.12 → 0.38) ──
      tl.to(fLime, { scale: 1.0, duration: 0.22, ease: 'none' }, 0.12)
        .to(tLime, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.16);

      // ── STEP 2: BRICK & SAND (0.38 → 0.64) ──
      tl.to(fLime, { opacity: 0, scale: 0.95, duration: 0.18, ease: 'power2.inOut' }, 0.38)
        .to(tLime, { opacity: 0, y: -15, duration: 0.15, ease: 'power2.in' }, 0.38)
        .to(fBrick, { opacity: 1, scale: 1.0, y: 0, duration: 0.2, ease: 'power3.out' }, 0.41)
        .to(tBrick, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.45);

      // ── STEP 3: ATHANGUDI TILES (0.64 → 0.88) ──
      tl.to(fBrick, { opacity: 0, scale: 0.95, duration: 0.18, ease: 'power2.inOut' }, 0.64)
        .to(tBrick, { opacity: 0, y: -15, duration: 0.15, ease: 'power2.in' }, 0.64)
        .to(fTile, { opacity: 1, scale: 1.0, y: 0, duration: 0.2, ease: 'power3.out' }, 0.67)
        .to(tTile, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.71);

      // ── STEP 4: FINAL COMPOSITION ("Materials become Architecture") (0.88 → 1.0) ──
      tl.to(fTile, { opacity: 0, scale: 0.95, duration: 0.15, ease: 'power2.inOut' }, 0.88)
        .to(tTile, { opacity: 0, y: -15, duration: 0.12, ease: 'power2.in' }, 0.88)
        .to(fFinal, { opacity: 1, scale: 1.0, y: 0, duration: 0.18, ease: 'power3.out' }, 0.9)
        .to(statement, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.92);
    },
    { scope: sectionRef }
  );

  const materialsData = [
    {
      id: 'lime',
      frameRef: limeFrameRef,
      textRef: limeTextRef,
      tag: '01 / MATERIAL',
      title: 'LIME PLASTER',
      description:
        'Smooth, breathable surfaces that give Chettinad buildings their distinctive texture and timeless appearance.',
      image: limePlasterImg,
      alt: 'Chettinad smooth lime plaster wall texture',
    },
    {
      id: 'brick',
      frameRef: brickFrameRef,
      textRef: brickTextRef,
      tag: '02 / BRICK & SAND',
      title: 'BRICK & SAND',
      description:
        'Traditional building materials forming the strong structural foundation of these enduring homes.',
      image: brickSandImg,
      alt: 'Traditional Chettinad terracotta brick and river sand masonry',
    },
    {
      id: 'tile',
      frameRef: tileFrameRef,
      textRef: tileTextRef,
      tag: '03 / ATHANGUDI TILES',
      title: 'ATHANGUDI TILES',
      description:
        'Handcrafted patterned tiles that bring colour, geometry and character beneath every step.',
      image: tileImg,
      alt: 'Handcrafted geometric Athangudi floor tiles',
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#100704',
        color: '#F7F3E9',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION HEADER (TOP CENTER)
          ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 3.5vh, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: '90%',
          maxWidth: '860px',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: 'clamp(0.68rem, 0.75vw, 0.8rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C68B34',
            backgroundColor: 'rgba(198, 139, 52, 0.1)',
            border: '1px solid rgba(198, 139, 52, 0.25)',
            padding: '0.3rem 1rem',
            borderRadius: '100px',
            backdropFilter: 'blur(8px)',
            marginBottom: '0.6rem',
            willChange: 'transform, opacity',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#C85A32',
            }}
          />
          MATERIAL HERITAGE & TRADITIONAL MASONRY
        </div>

        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
            fontWeight: 400,
            color: '#F7F3E9',
            letterSpacing: '0.06em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
            textShadow: '0 4px 24px rgba(0,0,0,0.9)',
            marginBottom: '0.5rem',
            willChange: 'transform, opacity',
          }}
        >
          Built to Endure
        </h2>

        <p
          ref={textRef}
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            lineHeight: 1.5,
            maxWidth: '680px',
            margin: '0 auto',
            textShadow: '0 2px 16px rgba(0,0,0,0.8)',
            willChange: 'transform, opacity',
          }}
        >
          Chettinad homes are shaped by materials chosen with care — lime plaster, traditional
          brick and sand construction, and handcrafted Athangudi tiles that give each space its
          enduring character.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN MATERIAL VISUAL DISPLAY (CENTER EDITORIAL STACK)
          ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -48%)',
          width: 'clamp(300px, 68vw, 980px)',
          height: 'clamp(280px, 48vh, 520px)',
          zIndex: 2,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 100px rgba(16, 7, 4, 0.9)',
          border: '1px solid rgba(213, 196, 161, 0.2)',
        }}
      >
        {/* 01 — LIME PLASTER */}
        <div
          ref={limeFrameRef}
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={limePlasterImg}
            alt="Smooth egg-shell white lime plaster wall"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.8) contrast(1.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(16, 7, 4, 0.9) 0%, transparent 50%, rgba(16, 7, 4, 0.4) 100%)',
            }}
          />
        </div>

        {/* 02 — BRICK & SAND */}
        <div
          ref={brickFrameRef}
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={brickSandImg}
            alt="Traditional terracotta brick and sand construction"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.75) contrast(1.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(16, 7, 4, 0.9) 0%, transparent 50%, rgba(16, 7, 4, 0.4) 100%)',
            }}
          />
        </div>

        {/* 03 — ATHANGUDI TILES */}
        <div
          ref={tileFrameRef}
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={tileImg}
            alt="Handcrafted geometric Athangudi floor tiles"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.8) contrast(1.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(16, 7, 4, 0.9) 0%, transparent 50%, rgba(16, 7, 4, 0.4) 100%)',
            }}
          />
        </div>

        {/* 04 — FINAL COMPOSITION ("Materials Become Architecture") */}
        <div
          ref={finalFrameRef}
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={mansionImg}
            alt="Chettinad heritage mansion architectural synthesis"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.7) contrast(1.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 50% 50%, rgba(16, 7, 4, 0.3) 0%, rgba(16, 7, 4, 0.9) 85%)',
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MATERIAL TEXT OVERLAYS & FINAL STATEMENT
          ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 6vh, 4rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: '90%',
          maxWidth: '720px',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        {materialsData.map((item) => (
          <div
            key={item.id}
            ref={item.textRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              willChange: 'transform, opacity',
              backgroundColor: 'rgba(16, 7, 4, 0.78)',
              border: '1px solid rgba(198, 139, 52, 0.3)',
              borderRadius: '12px',
              padding: 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(1rem, 2vw, 1.75rem)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(0.68rem, 0.75vw, 0.8rem)',
                letterSpacing: '0.22em',
                color: '#D4AF37',
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
              }}
            >
              {item.tag}
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-display, "Cinzel", serif)',
                fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                fontWeight: 500,
                color: '#F7F3E9',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                color: '#D5C4A1',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}

        {/* Final Statement (Step 4) */}
        <div
          ref={finalStatementRef}
          style={{
            position: 'relative',
            marginTop: '1rem',
            willChange: 'transform, opacity',
            backgroundColor: 'rgba(16, 7, 4, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '12px',
            padding: 'clamp(0.85rem, 1.5vw, 1.35rem) clamp(1.25rem, 2.5vw, 2rem)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
              fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
              color: '#F7F3E9',
              letterSpacing: '0.06em',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
            }}
          >
            Built to Endure
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
              fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
              color: '#D5C4A1',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              margin: 0,
            }}
          >
            "Materials become architecture. Architecture becomes heritage."
          </p>
        </div>
      </div>
    </section>
  );
}
