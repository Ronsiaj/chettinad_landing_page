import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { Divider } from '../../components/ui/Divider';
import { ImagePlaceholder } from '../../components/common/ImagePlaceholder';
import { SCENES_DATA } from '../../data/scenesData';
import { initCourtyardAnimation } from './courtyardAnimation';

export function CourtyardScene() {
  const sceneData = SCENES_DATA.find((s) => s.id === 'courtyard');
  const containerRef = useRef(null);
  const blockRef = useRef(null);

  useGSAP(() => {
    initCourtyardAnimation(containerRef, { block: blockRef.current });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="scene-courtyard" className="scene-container">
      <div className="scene-inner" ref={blockRef}>
        <SceneTag number={sceneData.number} text={sceneData.tagline} />
        <h2 style={{ fontSize: 'var(--text-3xl)', marginTop: '1.5rem' }}>{sceneData.title}</h2>
        <p className="font-editorial" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-ochre)' }}>
          {sceneData.subtitle}
        </p>
        <Divider />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }} className="grid-2col">
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-sand)', lineHeight: 'var(--leading-loose)' }}>
            {sceneData.description}
          </p>
          <ImagePlaceholder asset={sceneData.asset} aspect="4/3" />
        </div>
      </div>
    </section>
  );
}
