import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import mansionEntranceImg from '../../assets/images/animation_images/home_entrance.jpeg';
import courtyardSkyImg from '../../assets/images/architecture/chettinad_lime_plaster.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * SECTION: "NATURALLY COOL"
 *
 * Demonstrates climate-responsive Chettinad architecture through scroll-driven
 * environmental animation (moving sunlight vector, shifting pillar shadows,
 * courtyard skylight illumination, and subtle natural airflow stream).
 *
 * Progression:
 *   01 / SHADE    : Deep transitional spaces & roof overhangs.
 *   02 / AIR      : Courtyards & natural cross-ventilation.
 *   03 / MATERIAL : Substantial thermal mass & natural materials.
 *   04 / SPACE    : Vernacular climate-responsive spatial planning.
 *
 * Final Conclusion:
 *   "Architecture can be more than shelter. It can respond to the place it belongs to."
 */
export function NaturallyCoolSection() {
  const sectionRef = useRef(null);
  const landscapeContainerRef = useRef(null);

  // Environmental Lighting & Shadow Layer Refs
  const sunlightVectorRef = useRef(null);
  const courtyardLightBeamRef = useRef(null);
  const pillarShadowRef = useRef(null);
  const airflowStreamRef = useRef(null);
  const cloudSkyRef = useRef(null);

  // Text Reveal Refs
  const headerHUDRef = useRef(null);
  const cardShadeRef = useRef(null);
  const cardAirRef = useRef(null);
  const cardMaterialRef = useRef(null);
  const cardSpaceRef = useRef(null);
  const vernacularBadgeRef = useRef(null);
  const finalConclusionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const landscapeContainer = landscapeContainerRef.current;
      const sunlightVector = sunlightVectorRef.current;
      const courtyardLightBeam = courtyardLightBeamRef.current;
      const pillarShadow = pillarShadowRef.current;
      const airflowStream = airflowStreamRef.current;

      const headerHUD = headerHUDRef.current;
      const cardShade = cardShadeRef.current;
      const cardAir = cardAirRef.current;
      const cardMaterial = cardMaterialRef.current;
      const cardSpace = cardSpaceRef.current;
      const vernacularBadge = vernacularBadgeRef.current;
      const finalConclusion = finalConclusionRef.current;

      if (!section || !landscapeContainer) return;

      // Reduced motion accessibility fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(headerHUD, { opacity: 1, y: 0 });
        gsap.set([cardShade, cardAir, cardMaterial, cardSpace], { opacity: 1, y: 0 });
        return;
      }

      // Initial States
      gsap.set(headerHUD, { opacity: 1, y: 0 });
      gsap.set(sunlightVector, { opacity: 0.35, x: -40, y: -20 });
      gsap.set(courtyardLightBeam, { opacity: 0.2, scaleY: 0.8 });
      gsap.set(pillarShadow, { x: -30, opacity: 0.7 });
      gsap.set(airflowStream, { opacity: 0.05, x: -60 });

      gsap.set([cardShade, cardAir, cardMaterial, cardSpace], { opacity: 0, y: 30 });
      gsap.set(vernacularBadge, { opacity: 0, scale: 0.95 });
      gsap.set(finalConclusion, { opacity: 0, y: 35 });

      // Master Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=340%',
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ── STEP 1: STRONG EXTERIOR SUN → SHADED THINNAI (0.0 → 0.25) ──
      tl.to(
        sunlightVector,
        {
          opacity: 0.75,
          x: 20,
          y: 10,
          duration: 0.22,
          ease: 'power1.inOut',
        },
        0
      )
        .to(
          pillarShadow,
          {
            x: 0,
            opacity: 0.85,
            duration: 0.22,
            ease: 'power1.inOut',
          },
          0
        )
        .to(cardShade, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.08);

      // ── STEP 2: COURTYARD SKYLIGHT ILLUMINATION & CROSS AIRFLOW (0.25 → 0.50) ──
      tl.to(cardShade, { opacity: 0, y: -15, duration: 0.12, ease: 'power2.in' }, 0.25)
        .to(
          courtyardLightBeam,
          {
            opacity: 0.8,
            scaleY: 1.0,
            duration: 0.22,
            ease: 'sine.inOut',
          },
          0.26
        )
        .to(
          airflowStream,
          {
            opacity: 0.45,
            x: 40,
            duration: 0.25,
            ease: 'sine.inOut',
          },
          0.28
        )
        .to(cardAir, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.3);

      // ── STEP 3: SUBSTANTIAL THERMAL MASS & MATERIAL PROPERTIES (0.50 → 0.75) ──
      tl.to(cardAir, { opacity: 0, y: -15, duration: 0.12, ease: 'power2.in' }, 0.5)
        .to(
          pillarShadow,
          {
            x: 35,
            opacity: 0.9,
            duration: 0.22,
            ease: 'power1.inOut',
          },
          0.52
        )
        .to(cardMaterial, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.54)
        .to(vernacularBadge, { opacity: 1, scale: 1.0, duration: 0.18, ease: 'back.out(1.4)' }, 0.62);

      // ── STEP 4: VERNACULAR SPATIAL PLANNING & FINAL CONCLUSION (0.75 → 1.0) ──
      tl.to([cardMaterial, vernacularBadge], { opacity: 0, y: -15, duration: 0.14, ease: 'power2.in' }, 0.75)
        .to(cardSpace, { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' }, 0.78)
        .to(cardSpace, { opacity: 0, y: -15, duration: 0.12, ease: 'power2.in' }, 0.88)
        .to(finalConclusion, { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }, 0.9);
    },
    { scope: sectionRef }
  );

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
          CSS KEYFRAMES FOR SLOW SKY CLOUD DRIFT
          ═══════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes cloudDriftAnimation {
          0% { transform: translateX(0%); }
          100% { transform: translateX(12%); }
        }

        .sky-cloud-layer {
          animation: cloudDriftAnimation 35s ease-in-out infinite alternate;
          will-change: transform;
        }

        @keyframes breezeWaveAnimation {
          0% { transform: translateX(-20px) skewX(-2deg); opacity: 0.1; }
          50% { transform: translateX(30px) skewX(2deg); opacity: 0.35; }
          100% { transform: translateX(-20px) skewX(-2deg); opacity: 0.1; }
        }

        .airflow-breeze-stream {
          animation: breezeWaveAnimation 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1: BACKGROUND ATMOSPHERE & SKY
          ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(ellipse at 48% 28%, rgba(212, 175, 55, 0.12) 0%, transparent 70%),
            linear-gradient(to bottom, #180C07 0%, #100704 100%)
          `,
        }}
      />

      {/* Cloud Sky Subtle Layer */}
      <div
        ref={cloudSkyRef}
        className="sky-cloud-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: '-10%',
          width: '120%',
          height: '40vh',
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255, 225, 170, 0.14) 0%, transparent 75%)',
        }}
      />

      {/* Dynamic Sunlight Ray Vector */}
      <div
        ref={sunlightVectorRef}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '25%',
          width: '50vw',
          height: '80vh',
          zIndex: 4,
          pointerEvents: 'none',
          background:
            'linear-gradient(135deg, rgba(255, 220, 150, 0.28) 0%, rgba(255, 200, 120, 0.08) 50%, transparent 80%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
          willChange: 'transform, opacity',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2: HEADER HUD & MAIN TITLE
          ═══════════════════════════════════════════════════════════ */}
      <div
        ref={headerHUDRef}
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 4vh, 2.75rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '90%',
          maxWidth: '820px',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: 'clamp(0.68rem, 0.75vw, 0.8rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '0.35rem 1.2rem',
            borderRadius: '100px',
            backdropFilter: 'blur(10px)',
            display: 'inline-block',
            marginBottom: '0.6rem',
          }}
        >
          CLIMATE-RESPONSIVE ARCHITECTURE
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 400,
            color: '#F7F3E9',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            margin: '0 0 0.3rem 0',
            textShadow: '0 4px 20px rgba(0,0,0,0.95)',
          }}
        >
          Naturally Cool
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.05rem, 1.4vw, 1.35rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          Before air conditioning, architecture itself responded to the climate.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3: CENTRAL CINEMATIC ARCHITECTURAL ENVIRONMENT
          (Relationship between Exterior, Thinnai, Courtyard & Interior)
          ═══════════════════════════════════════════════════════════ */}
      <div
        ref={landscapeContainerRef}
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -46%)',
          width: 'clamp(320px, 72vw, 1020px)',
          height: 'clamp(280px, 48vh, 520px)',
          zIndex: 3,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 100px rgba(16, 7, 4, 0.95)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          willChange: 'transform',
        }}
      >
        {/* Architectural Image Scene */}
        <img
          src={mansionEntranceImg}
          alt="Traditional Chettinad mansion architecture showing Thinnai and Courtyard"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.82) contrast(1.12)',
          }}
        />

        {/* Dynamic Roof Edge & Pillar Shifting Shadow Layer */}
        <div
          ref={pillarShadowRef}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, rgba(16, 7, 4, 0.82) 0%, transparent 45%, rgba(16, 7, 4, 0.7) 100%)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Courtyard Vertical Light Beam (Connection from sky to interior) */}
        <div
          ref={courtyardLightBeamRef}
          style={{
            position: 'absolute',
            top: 0,
            left: '42%',
            width: '160px',
            height: '100%',
            background:
              'linear-gradient(to bottom, rgba(255, 230, 170, 0.28) 0%, rgba(212, 175, 55, 0.08) 60%, transparent 100%)',
            filter: 'blur(12px)',
            transformOrigin: 'top center',
            mixBlendMode: 'screen',
            willChange: 'transform, opacity',
          }}
        />

        {/* Translucent Natural Airflow Stream Layer */}
        <div
          ref={airflowStreamRef}
          className="airflow-breeze-stream"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255, 235, 190, 0.12) 40%, rgba(255, 235, 190, 0.18) 60%, transparent 100%)',
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        />

        {/* Vignette Depth Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(16, 7, 4, 0.88) 0%, transparent 50%, rgba(16, 7, 4, 0.4) 100%)',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 4: SEQUENTIAL CLIMATE PRINCIPLE CARDS & TEASERS
          ═══════════════════════════════════════════════════════════ */}
      {/* 01 / SHADE */}
      <div
        ref={cardShadeRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5.5vh, 4.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '680px',
          backgroundColor: 'rgba(16, 7, 4, 0.85)',
          border: '1px solid rgba(200, 90, 50, 0.4)',
          borderRadius: '12px',
          padding: '1rem 1.6rem',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: '#C85A32',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.25rem',
          }}
        >
          01 / TRANSITIONAL SHADE
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
            color: '#F7F3E9',
            margin: '0 0 0.35rem 0',
          }}
        >
          Shade
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Deep transitional spaces reduce direct exposure to harsh sunlight.
        </p>
      </div>

      {/* 02 / AIR */}
      <div
        ref={cardAirRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5.5vh, 4.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '680px',
          backgroundColor: 'rgba(16, 7, 4, 0.85)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '12px',
          padding: '1rem 1.6rem',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.25rem',
          }}
        >
          02 / NATURAL AIRFLOW
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
            color: '#F7F3E9',
            margin: '0 0 0.35rem 0',
          }}
        >
          Air
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Openings and courtyards help support natural air movement.
        </p>
      </div>

      {/* 03 / MATERIAL */}
      <div
        ref={cardMaterialRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5.5vh, 4.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '680px',
          backgroundColor: 'rgba(16, 7, 4, 0.85)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '12px',
          padding: '1rem 1.6rem',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.25rem',
          }}
        >
          03 / THERMAL MASS
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
            color: '#F7F3E9',
            margin: '0 0 0.35rem 0',
          }}
        >
          Material
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Traditional materials and substantial building elements contribute to the building's thermal behaviour.
        </p>
      </div>

      {/* 04 / SPACE */}
      <div
        ref={cardSpaceRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5.5vh, 4.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '680px',
          backgroundColor: 'rgba(16, 7, 4, 0.85)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '12px',
          padding: '1rem 1.6rem',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.25rem',
          }}
        >
          04 / VERNACULAR PLANNING
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
            color: '#F7F3E9',
            margin: '0 0 0.35rem 0',
          }}
        >
          Space
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Vernacular planning responds to the climate, culture and everyday life of the region.
        </p>
      </div>

      {/* VERNACULAR ARCHITECTURE BADGE STATEMENT */}
      <div
        ref={vernacularBadgeRef}
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(16, 7, 4, 0.92)',
          border: '1px solid rgba(212, 175, 55, 0.5)',
          borderRadius: '100px',
          padding: '0.6rem 2rem',
          textAlign: 'center',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.95)',
          zIndex: 12,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
            fontSize: '0.72rem',
            letterSpacing: '0.24em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.15rem',
          }}
        >
          VERNACULAR ARCHITECTURE
        </span>
        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: '1.1rem',
            color: '#F7F3E9',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Building with the place, rather than against it.
        </p>
      </div>

      {/* FINAL CONCLUSION STATEMENT */}
      <div
        ref={finalConclusionRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 6vh, 4.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '720px',
          backgroundColor: 'rgba(16, 7, 4, 0.92)',
          border: '1px solid rgba(212, 175, 55, 0.5)',
          borderRadius: '12px',
          padding: '1.25rem 2rem',
          textAlign: 'center',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.95)',
          zIndex: 12,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
            color: '#F7F3E9',
            letterSpacing: '0.06em',
            margin: '0 0 0.4rem 0',
            textTransform: 'uppercase',
          }}
        >
          Architecture can be more than shelter.
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          It can respond to the place it belongs to.
        </p>
      </div>
    </section>
  );
}
