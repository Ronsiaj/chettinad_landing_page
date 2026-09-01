import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { initHeroEntranceAnimation } from '../../animations/hero/heroEntranceAnimation';

import heroMansionPng from '../../assets/images/hero/hero_mansion.png';

/**
 * HERO SECTION — Cinematic Chettinad Architecture Introduction
 * 
 * The mansion photograph IS the hero. Everything else supports it.
 * Text has minimal footprint. Overlay is subtle — just enough for legibility.
 * 
 * Layer Stack:
 *   z-index 1  — Full-viewport architecture photograph
 *   z-index 5  — Subtle gradient (bottom edge only, for text legibility)
 *   z-index 10 — Minimal editorial text + CTA
 *   z-index 20 — Navigation
 */
export function HeroSection() {
  const heroImageRef = useRef(null);
  const overlayGradientRef = useRef(null);
  const navHeaderRef = useRef(null);
  const tagLabelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const decorLineRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    initHeroEntranceAnimation({
      heroImage: heroImageRef.current,
      overlayGradient: overlayGradientRef.current,
      navHeader: navHeaderRef.current,
      tagLabel: tagLabelRef.current,
      headline: headlineRef.current,
      subtitle: subtitleRef.current,
      ctaButton: ctaButtonRef.current,
      decorLine: decorLineRef.current,
      scrollIndicator: scrollIndicatorRef.current,
    });
  });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        backgroundColor: '#100704',
      }}
    >
      {/* ── FULL-VIEWPORT ARCHITECTURE PHOTOGRAPH ── */}
      <div
        ref={heroImageRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          willChange: 'transform, opacity',
        }}
      >
        <img
          src={heroMansionPng}
          alt="Grand Chettinad mansion exterior at golden hour, Kanadukathan"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 30%',
            display: 'block',
          }}
        />
      </div>

      {/* ── MINIMAL GRADIENT — bottom edge only for text legibility ── */}
      <div
        ref={overlayGradientRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          background: `
            linear-gradient(
              to top,
              rgba(16, 7, 4, 0.85) 0%,
              rgba(16, 7, 4, 0.45) 18%,
              transparent 38%
            ),
            linear-gradient(
              to bottom,
              rgba(16, 7, 4, 0.35) 0%,
              transparent 12%
            )
          `,
        }}
      />

      {/* ── NAVIGATION ── */}
      <header
        ref={navHeaderRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: 'clamp(1rem, 2.5vh, 1.5rem) clamp(1.25rem, 4vw, 3rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-terracotta)',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 6px rgba(200, 90, 50, 0.5)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.75rem, 1.6vw, 0.95rem)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'var(--color-warm-ivory)',
            }}
          >
            CHETTINAD HERITAGE
          </span>
        </div>

        <a
          href="tel:+914428150900"
          style={{
            padding: '0.4rem 1.1rem',
            border: '1px solid rgba(198, 139, 52, 0.5)',
            borderRadius: '200px',
            color: 'var(--color-warm-ivory)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-terracotta)';
            e.currentTarget.style.borderColor = 'var(--color-terracotta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(198, 139, 52, 0.5)';
          }}
        >
          Inquire
        </a>
      </header>

      {/* ── EDITORIAL CONTENT — minimal footprint at bottom-left ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 10,
          padding: 'clamp(1.5rem, 4vh, 3rem) clamp(1.25rem, 4vw, 3rem)',
          maxWidth: '680px',
        }}
      >
        {/* Gold accent line */}
        <div
          ref={decorLineRef}
          style={{
            width: '48px',
            height: '1px',
            backgroundColor: 'var(--color-ochre)',
            marginBottom: '1rem',
          }}
        />

        {/* Tag */}
        <div ref={tagLabelRef} style={{ marginBottom: '0.6rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
            }}
          >
            Kanadukathan · Karaikudi
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
            fontWeight: 400,
            color: 'var(--color-warm-ivory)',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            marginBottom: '0.6rem',
          }}
        >
          Heritage Built{' '}
          <span
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 400,
              fontStyle: 'italic',
              textTransform: 'none',
              letterSpacing: '0.01em',
              color: 'var(--color-ochre)',
              fontSize: '0.78em',
            }}
          >
            to Endure
          </span>
        </h1>

        {/* One-liner */}
        <p
          ref={subtitleRef}
          className="font-editorial"
          style={{
            fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
            color: 'var(--color-sand)',
            lineHeight: 1.55,
            maxWidth: '420px',
            marginBottom: 'clamp(1rem, 2.5vh, 1.5rem)',
            fontStyle: 'italic',
            opacity: 0.85,
          }}
        >
          Authentic Chettinad mansions crafted with Burma teak,
          Athangudi tiles & hereditary artisan knowledge.
        </p>

        {/* CTA */}
        <div ref={ctaButtonRef}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.65rem 1.5rem',
              border: '1px solid rgba(198, 139, 52, 0.5)',
              borderRadius: '200px',
              backgroundColor: 'transparent',
              color: 'var(--color-warm-ivory)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.6rem, 0.8vw, 0.68rem)',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(200, 90, 50, 0.85)';
              e.currentTarget.style.borderColor = 'rgba(200, 90, 50, 0.85)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(198, 139, 52, 0.5)';
            }}
          >
            Explore Our Work
            <span style={{ width: '16px', height: '1px', backgroundColor: 'var(--color-ochre)' }} />
          </button>
        </div>
      </div>

      {/* ── SCROLL INDICATOR — quiet, bottom-right ── */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          right: 'clamp(1.25rem, 4vw, 3rem)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.5rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-sand)',
            opacity: 0.5,
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, var(--color-ochre), transparent)',
            opacity: 0.5,
          }}
        />
      </div>
    </section>
  );
}
