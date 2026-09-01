import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * PREMIUM FULL-SCREEN BRAND INTRO & KOLAM DRAWING SEQUENCE
 *
 * 1. Warm earthy lime plaster & terracotta background.
 * 2. Pulli dots appear geometrically at grid points.
 * 3. Fine white rice-flour SVG Kolam lines draw themselves stroke-by-stroke.
 * 4. Complete Kolam pattern reveals brand name "CHETTINAD HERITAGE" & tagline.
 * 5. Pause for appreciation.
 * 6. Kolam expands into a Chettinad arch geometry and dissolves.
 * 7. Seamlessly reveals the Hero section in full view.
 * 8. Runs ONLY ONCE per page load.
 */
export function KolamIntro({ onComplete }) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef(null);

  // SVG Elements
  const dotsRef = useRef([]);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);
  const path4Ref = useRef(null);
  const outerRingRef = useRef(null);

  // Text & Brand Elements
  const brandNameRef = useRef(null);
  const taglineRef = useRef(null);
  const contentGroupRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const dots = dotsRef.current.filter(Boolean);
      const paths = [path1Ref.current, path2Ref.current, path3Ref.current, path4Ref.current].filter(
        Boolean
      );
      const outerRing = outerRingRef.current;
      const brandName = brandNameRef.current;
      const tagline = taglineRef.current;
      const contentGroup = contentGroupRef.current;

      if (!container) return;

      // Accessibility reduced motion check
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsDone(true);
        if (onComplete) onComplete();
        return;
      }

      // Initial States: Hide dots, paths, and brand text
      gsap.set(dots, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      paths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 400;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });
      });

      if (outerRing && outerRing.getTotalLength) {
        const ringLen = outerRing.getTotalLength();
        gsap.set(outerRing, { strokeDasharray: ringLen, strokeDashoffset: ringLen, opacity: 0.7 });
      }

      gsap.set([brandName, tagline], { opacity: 0, y: 15 });

      // Master Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // ── STEP 1: Geometric Guide Dots (Pulli) Appear (0.2s - 0.8s) ──
      tl.to(
        dots,
        {
          scale: 1,
          opacity: 0.9,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(1.7)',
        },
        0.2
      );

      // ── STEP 2: Fine Rice-Flour Kolam Lines Draw (0.7s - 2.6s) ──
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: 'power2.inOut',
        },
        0.7
      );

      if (outerRing) {
        tl.to(
          outerRing,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.out',
          },
          1.4
        );
      }

      // ── STEP 3: Brand Name & Tagline Emerge from Kolam Center (2.5s - 3.4s) ──
      tl.to(
        brandName,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        2.5
      ).to(
        tagline,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        2.8
      );

      // ── STEP 4: Brief Appreciation Pause (3.4s - 4.2s) ──
      tl.to({}, { duration: 0.8 }, 3.4);

      // ── STEP 5: Kolam Expands into Chettinad Arch Geometry & Dissolves (4.2s - 5.0s) ──
      tl.to(
        contentGroup,
        {
          scale: 1.4,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        4.2
      ).to(
        container,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        4.4
      );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  // Grid coordinates for Pulli dots
  const dotCoords = [
    { x: 200, y: 200 }, // Center
    { x: 200, y: 140 }, // Top
    { x: 200, y: 260 }, // Bottom
    { x: 140, y: 200 }, // Left
    { x: 260, y: 200 }, // Right
    { x: 158, y: 158 }, // Top-Left
    { x: 242, y: 158 }, // Top-Right
    { x: 158, y: 242 }, // Bottom-Left
    { x: 242, y: 242 }, // Bottom-Right
    { x: 200, y: 90 }, // Outer Top
    { x: 200, y: 310 }, // Outer Bottom
    { x: 90, y: 200 }, // Outer Left
    { x: 310, y: 200 }, // Outer Right
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#100704',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => setIsDone(true)}
      title="Click to skip intro"
    >
      {/* ═══════════════════════════════════════════════════════════
          EARTHY LIME PLASTER & TERRACOTTA BACKGROUND PATINA
          ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(198, 139, 52, 0.12) 0%, transparent 65%),
            radial-gradient(circle at 50% 30%, rgba(200, 90, 50, 0.08) 0%, transparent 70%),
            linear-gradient(to bottom, #140805 0%, #0C0503 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          CENTER BRAND & KOLAM VECTOR GROUP
          ═══════════════════════════════════════════════════════════ */}
      <div
        ref={contentGroupRef}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        {/* Authentic Geometrical Pulli Kolam SVG */}
        <svg
          width="360"
          height="360"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 12px rgba(247, 243, 233, 0.35))',
            marginBottom: '1rem',
          }}
        >
          {/* Outer Chettinad Arch Guide Ring */}
          <circle
            ref={outerRingRef}
            cx="200"
            cy="200"
            r="175"
            stroke="#C68B34"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* 4-Fold Symmetrical Rice-Flour Kolam Loops */}
          <path
            ref={path1Ref}
            d="M 200,90 Q 250,90 250,140 Q 250,190 200,190 Q 150,190 150,140 Q 150,90 200,90 Z"
            stroke="#F7F3E9"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            ref={path2Ref}
            d="M 200,310 Q 250,310 250,260 Q 250,210 200,210 Q 150,210 150,260 Q 150,310 200,310 Z"
            stroke="#F7F3E9"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            ref={path3Ref}
            d="M 90,200 Q 90,250 140,250 Q 190,250 190,200 Q 190,150 140,150 Q 90,150 90,200 Z"
            stroke="#F7F3E9"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            ref={path4Ref}
            d="M 310,200 Q 310,250 260,250 Q 210,250 210,200 Q 210,150 260,150 Q 310,150 310,200 Z"
            stroke="#F7F3E9"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pulli Guide Dots (Rice Powder Points) */}
          {dotCoords.map((coord, i) => (
            <circle
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              cx={coord.x}
              cy={coord.y}
              r={i === 0 ? "4" : "3"}
              fill={i === 0 ? "#C85A32" : "#F7F3E9"}
            />
          ))}
        </svg>

        {/* Brand Name */}
        <h1
          ref={brandNameRef}
          style={{
            fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)',
            fontWeight: 400,
            color: '#F7F3E9',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 30px rgba(198, 139, 52, 0.4)',
            textAlign: 'center',
            margin: '0.4rem 0 0.2rem 0',
            willChange: 'transform, opacity',
          }}
        >
          Chettinad Heritage
        </h1>

        {/* Architectural Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
            fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
            color: '#D5C4A1',
            fontStyle: 'italic',
            letterSpacing: '0.12em',
            textAlign: 'center',
            margin: 0,
            willChange: 'transform, opacity',
          }}
        >
          Architectural Storytelling & Vernacular Heritage
        </p>
      </div>

      {/* Skip Button Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          color: 'rgba(213, 196, 161, 0.45)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        Click anywhere to skip
      </div>
    </div>
  );
}
