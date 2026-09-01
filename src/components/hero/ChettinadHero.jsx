import React, { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import heroVideo from '../../assets/videos/hero_section_video.mp4';

/*
 * ═══════════════════════════════════════════════════════════════════════
 * CHETTINAD HERO — Full-Screen Cinematic Architectural Video Experience
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Concept:
 *   A full-screen architectural video playing once from opening facade
 *   to final frame reveal. When the video ends, the final frame holds stationary,
 *   a subtle dark overlay settles, and the editorial title card reveals:
 *     "BUILT FROM TRADITION"
 *     "BUILT FOR GENERATIONS."
 * ═══════════════════════════════════════════════════════════════════════
 */

export function ChettinadHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // Handle video end state
  const handleVideoEnd = useCallback(() => {
    setIsVideoEnded(true);

    const overlay = overlayRef.current;
    const content = contentRef.current;
    const scrollInd = scrollIndicatorRef.current;

    if (!overlay || !content) return;

    // Timeline for title card reveal over stationary final frame
    const tl = gsap.timeline();

    tl.to(overlay, {
      opacity: 0.55,
      duration: 1.2,
      ease: 'power2.inOut',
    })
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        scrollInd,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      );
  }, []);

  useGSAP(
    () => {
      // Initial states
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0.2 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, y: 30 });
      if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0.6 });
        if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0 });
        if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 });
      }
    },
    { scope: containerRef }
  );

  const scrollToNextSection = () => {
    const nextEl = document.getElementById('art-of-living');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#100704',
      }}
    >
      {/* ═══════════════════════════════════════════════════════
          FULL-SCREEN CINEMATIC ARCHITECTURAL VIDEO
          ═══════════════════════════════════════════════════════ */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
          display: 'block',
        }}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support HTML5 video playback.
      </video>

      {/* ═══════════════════════════════════════════════════════
          SUBTLE SHADING OVERLAY
          Gradually darkens when video finishes to highlight text
          ═══════════════════════════════════════════════════════ */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(16, 7, 4, 0.4) 0%, rgba(16, 7, 4, 0.85) 90%),
            linear-gradient(to bottom, rgba(16, 7, 4, 0.5) 0%, transparent 35%, rgba(16, 7, 4, 0.9) 100%)
          `,
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          PLAYBACK EDITORIAL EMBLEM (BEFORE VIDEO ENDS)
          ═══════════════════════════════════════════════════════ */}
      {!isVideoEnded && (
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(2.5rem, 5vh, 4rem)',
            left: 'clamp(4%, 6vw, 8%)',
            zIndex: 5,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#D4AF37',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-ivory)',
              opacity: 0.8,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            A Home Rooted in Tradition
          </span>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          HERO CONTENT OVERLAY — Revealed upon Video End
          ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(5.5rem, 11vh, 7.5rem) clamp(4%, 6vw, 8%) clamp(3rem, 6vh, 5rem)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={contentRef}
          style={{
            maxWidth: '920px',
            willChange: 'opacity, transform',
            pointerEvents: 'auto',
          }}
        >
          {/* Editorial Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #C85A32)',
              marginBottom: '1rem',
            }}
          >
            Built from Tradition
          </div>

          {/* Main Display Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
              fontWeight: 400,
              color: 'var(--color-warm-ivory)',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              margin: '0 0 1.5rem 0',
              textShadow: '0 4px 35px rgba(0,0,0,0.95)',
            }}
          >
            Built for Generations.
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)',
              fontStyle: 'italic',
              color: 'var(--color-sand, #D5C4A1)',
              lineHeight: 1.5,
              maxWidth: '740px',
              margin: '0 auto',
              opacity: 0.95,
              textShadow: '0 2px 18px rgba(0,0,0,0.9)',
            }}
          >
            Timeless Chettinad architecture, crafted with the knowledge, materials and traditions that have endured for centuries.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            MINIMAL SCROLL INDICATOR
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={scrollIndicatorRef}
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 4vh, 3.5rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            pointerEvents: 'auto',
            willChange: 'opacity, transform',
          }}
          onClick={scrollToNextSection}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-sand, #D5C4A1)',
              opacity: 0.8,
            }}
          >
            Scroll to Explore
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: 'bounceSlow 2s infinite ease-in-out',
            }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>
    </section>
  );
}
