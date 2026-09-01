import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { Divider } from '../../components/ui/Divider';
import { SCENES_DATA } from '../../data/scenesData';
import { initFinalAnimation } from './finalAnimation';

export function FinalScene() {
  const sceneData = SCENES_DATA.find((s) => s.id === 'final');
  const containerRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(() => {
    initFinalAnimation(containerRef, { cta: ctaRef.current });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="scene-final" className="scene-container" style={{ textAlign: 'center', minHeight: '80vh' }}>
      <div className="scene-inner" ref={ctaRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SceneTag number={sceneData.number} text={sceneData.tagline} />
        
        <h2 style={{ fontSize: 'var(--text-4xl)', marginTop: '1.5rem', fontFamily: 'var(--font-display)' }}>
          {sceneData.title}
        </h2>
        
        <p className="font-editorial" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-ochre)', marginTop: '0.5rem' }}>
          {sceneData.subtitle}
        </p>

        <Divider />

        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-sand)', marginTop: '1.5rem', lineHeight: 'var(--leading-loose)' }}>
          {sceneData.description}
        </p>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--color-terracotta)',
              color: 'var(--color-warm-ivory)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              boxShadow: '0 8px 24px rgba(200, 90, 50, 0.3)',
              transition: 'transform 0.3s ease, background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-rust)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-terracotta)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Schedule Consultation
          </button>

          <button
            style={{
              padding: '1rem 2.5rem',
              border: '1px solid var(--color-ochre)',
              color: 'var(--color-warm-ivory)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-terracotta)';
              e.currentTarget.style.backgroundColor = 'rgba(200, 90, 50, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-ochre)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Explore Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}
