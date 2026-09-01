import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../ui/SceneTag';
import { PLACEHOLDER_ASSETS } from '../../data/placeholderAssets';
import { initHeroRevealAnimation } from '../../animations/hero/heroRevealAnimation';

/**
 * HERO REVEAL COMPONENT
 * 
 * Cinematic Chettinad Arch Reveal on page load:
 * 1. 100vw x 100vh dark teak viewport background.
 * 2. Small central Chettinad architectural arch expands automatically.
 * 3. Reveals underlying palace photograph through enlarging arch.
 * 4. Arch expands past viewport edges, resulting in 100% full-screen palace image.
 * 5. Minimal editorial title typography reveals gracefully.
 */
export function HeroReveal() {
  const containerRef = useRef(null);
  const archMaskRef = useRef(null);
  const palaceImageRef = useRef(null);
  const sceneTagRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    initHeroRevealAnimation(containerRef, {
      archMask: archMaskRef.current,
      palaceImage: palaceImageRef.current,
      sceneTag: sceneTagRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
    });
  }, { scope: containerRef });

  const asset = PLACEHOLDER_ASSETS.mansionExterior;

  return (
    <section 
      ref={containerRef} 
      id="scene-hero-reveal"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#100704',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
      }}
    >
      {/* SVG ClipPath Definition for Traditional Chettinad Arch */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="chettinadArchClipPath" clipPathUnits="objectBoundingBox">
            {/* Traditional Chettinad Arch: Rounded semicircular top, vertical downward sides */}
            <path d="M 0.25,1.0 L 0.25,0.42 C 0.25,0.14 0.75,0.14 0.75,0.42 L 0.75,1.0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* FULL VIEWPORT BACKGROUND PALACE LAYER (SEPARATE FROM MASK) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* ARCH REVEAL MASK WRAPPER */}
        <div
          ref={archMaskRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            clipPath: 'url(#chettinadArchClipPath)',
            transformOrigin: '50% 50%',
            willChange: 'transform',
          }}
        >
          {/* PALACE IMAGE LAYER */}
          <img
            ref={palaceImageRef}
            src={asset.url}
            alt={asset.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.95) contrast(1.05)',
              willChange: 'transform, filter',
            }}
          />
        </div>
      </div>

      {/* AMBIENT WARM ATMOSPHERE VIGNETTE OVERLAY */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(16, 7, 4, 0.65) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* EDITORIAL HERO CONTENT OVERLAY */}
      <div 
        style={{ 
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '960px',
          padding: '0 var(--container-padding-mobile)',
          pointerEvents: 'none',
        }}
      >
        <div ref={sceneTagRef} style={{ display: 'inline-block', marginBottom: '1rem' }}>
          <SceneTag number="01" text="KANADUKATHAN & KARAIKUDI" />
        </div>

        <h1 
          ref={titleRef}
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            color: 'var(--color-warm-ivory)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: '1.05',
            textShadow: '0 4px 30px rgba(0,0,0,0.95)',
          }}
        >
          CHETTINAD
          <br />
          <span style={{ color: 'var(--color-ochre)' }}>PALACE ARCHITECTURE</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="font-editorial"
          style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-sand)',
            marginTop: '1.25rem',
            letterSpacing: '0.08em',
            fontStyle: 'italic',
            textShadow: '0 2px 15px rgba(0,0,0,0.9)',
          }}
        >
          "Architecture rooted in heritage, crafted for eternity."
        </p>
      </div>
    </section>
  );
}
