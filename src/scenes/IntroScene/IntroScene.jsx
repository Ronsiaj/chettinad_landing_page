import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { PLACEHOLDER_ASSETS } from '../../data/placeholderAssets';
import { initIntroAnimation } from './introAnimation';

export function IntroScene() {
  const containerRef = useRef(null);
  const bgLightRef = useRef(null);
  const mansionFrameRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    initIntroAnimation(containerRef, {
      bgLight: bgLightRef.current,
      mansionFrame: mansionFrameRef.current,
      tagline: taglineRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
    });
  }, { scope: containerRef });

  const asset = PLACEHOLDER_ASSETS.mansionExterior;

  return (
    <section 
      ref={containerRef} 
      id="scene-intro" 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#100704',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(5rem, 10vh, 8rem) var(--container-padding-mobile) var(--space-12)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Warm Atmosphere Light */}
      <div 
        ref={bgLightRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(200, 90, 50, 0.35) 0%, rgba(198, 139, 52, 0.18) 40%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Editorial Title & Supporting Line */}
      <div 
        style={{ 
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
          marginBottom: 'var(--space-8)'
        }}
      >
        <div ref={taglineRef} style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
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
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          }}
        >
          CHETTINAD
          <br />
          <span style={{ color: 'var(--color-ochre)' }}>HERITAGE ARCHITECTURE</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="font-editorial"
          style={{ 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-sand)',
            marginTop: '1rem',
            letterSpacing: '0.08em',
            fontStyle: 'italic'
          }}
        >
          "Architecture rooted in tradition."
        </p>
      </div>

      {/* Mansion Visual Atmosphere Frame */}
      <div
        ref={mansionFrameRef}
        style={{
          position: 'relative',
          width: 'min(100%, 1280px)',
          aspectRatio: '16/9',
          borderRadius: '4px',
          border: '1px solid rgba(198, 139, 52, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden',
          zIndex: 5,
        }}
      >
        <img
          src={asset.url}
          alt={asset.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.9) contrast(1.05)',
          }}
        />

        <div 
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            padding: '4px 10px',
            backgroundColor: 'rgba(16, 7, 4, 0.8)',
            border: '1px solid rgba(198, 139, 52, 0.3)',
            color: 'var(--color-ochre)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            borderRadius: '2px',
          }}
        >
          HERITAGE ARRIVAL • 01
        </div>
      </div>
    </section>
  );
}
