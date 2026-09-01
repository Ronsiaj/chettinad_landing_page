import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { PLACEHOLDER_ASSETS } from '../../data/placeholderAssets';
import { initHeroAnimation } from './heroAnimation';

export function HeroScene() {
  const containerRef = useRef(null);
  const heroContainerRef = useRef(null);
  const mansionImageRef = useRef(null);
  const captionRef = useRef(null);
  const portalGlowRef = useRef(null);

  useGSAP(() => {
    initHeroAnimation(containerRef, {
      heroContainer: heroContainerRef.current,
      mansionImage: mansionImageRef.current,
      caption: captionRef.current,
      portalGlow: portalGlowRef.current,
    });
  }, { scope: containerRef });

  const asset = PLACEHOLDER_ASSETS.mansionExterior;

  return (
    <section 
      ref={containerRef} 
      id="scene-hero" 
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#100704',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Full Viewport Image Container */}
      <div
        ref={heroContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          ref={mansionImageRef}
          src={asset.url}
          alt={asset.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.95) contrast(1.08)',
            willChange: 'transform',
          }}
        />

        {/* Ambient Portal Light Layer */}
        <div
          ref={portalGlowRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 65%, rgba(247, 243, 233, 0.4) 0%, rgba(198, 139, 52, 0.25) 30%, transparent 70%)',
            pointerEvents: 'none',
            mixBlendMode: 'soft-light',
          }}
        />
      </div>

      {/* Minimal Architectural Caption Overlay */}
      <div 
        ref={captionRef}
        style={{
          position: 'absolute',
          bottom: 'var(--space-12)',
          left: 'var(--container-padding-desktop)',
          right: 'var(--container-padding-desktop)',
          zIndex: 10,
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div>
          <SceneTag number="02" text="APPROACHING THE MANSION" />
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-2xl)',
              color: 'var(--color-warm-ivory)',
              marginTop: '0.5rem',
              letterSpacing: '0.1em',
              textShadow: '0 4px 20px rgba(0,0,0,0.85)',
            }}
          >
            PALATIAL SPLENDOR
          </h2>
        </div>

        <p 
          className="font-editorial"
          style={{ 
            fontSize: 'var(--text-lg)',
            color: 'var(--color-ochre)',
            fontStyle: 'italic',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            maxWidth: '360px',
            textAlign: 'right'
          }}
        >
          Burma teak pillars, carved overhangs, and natural stone foundations.
        </p>
      </div>
    </section>
  );
}
