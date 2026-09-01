import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { Divider } from '../../components/ui/Divider';
import { ImagePlaceholder } from '../../components/common/ImagePlaceholder';
import { SCENES_DATA } from '../../data/scenesData';
import { initArchitectureAnimation } from './architectureAnimation';

export function ArchitectureScene() {
  const limeData = SCENES_DATA.find((s) => s.id === 'lime-plaster');
  const coolingData = SCENES_DATA.find((s) => s.id === 'cooling');
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    initArchitectureAnimation(containerRef, { box: boxRef.current });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="scene-architecture" className="scene-container">
      <div className="scene-inner" ref={boxRef}>
        <SceneTag number={coolingData.number} text={coolingData.tagline} />
        <h2 style={{ fontSize: 'var(--text-3xl)', marginTop: '1.5rem' }}>{coolingData.title}</h2>
        <p className="font-editorial" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-ochre)' }}>
          {coolingData.subtitle}
        </p>
        <Divider />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }} className="grid-2col">
          <ImagePlaceholder asset={coolingData.asset} aspect="16/10" />
          <ImagePlaceholder asset={limeData.asset} aspect="16/10" />
        </div>
      </div>
    </section>
  );
}
