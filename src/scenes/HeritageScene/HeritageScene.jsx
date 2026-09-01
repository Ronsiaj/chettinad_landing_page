import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { Divider } from '../../components/ui/Divider';
import { ImagePlaceholder } from '../../components/common/ImagePlaceholder';
import { SCENES_DATA } from '../../data/scenesData';
import { initHeritageAnimation } from './heritageAnimation';

export function HeritageScene() {
  const sceneData = SCENES_DATA.find((s) => s.id === 'heritage');
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    initHeritageAnimation(containerRef, { content: contentRef.current });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="scene-heritage" className="scene-container">
      <div className="scene-inner" ref={contentRef}>
        <SceneTag number={sceneData.number} text={sceneData.tagline} />
        <h2 style={{ fontSize: 'var(--text-3xl)', marginTop: '1.5rem' }}>{sceneData.title}</h2>
        <p className="font-editorial" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-ochre)' }}>
          {sceneData.subtitle}
        </p>
        <Divider />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }} className="grid-2col">
          <ImagePlaceholder asset={sceneData.asset} aspect="4/3" />
          <div>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-sand)', lineHeight: 'var(--leading-loose)' }}>
              {sceneData.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
