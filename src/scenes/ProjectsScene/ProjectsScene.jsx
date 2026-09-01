import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../../components/ui/SceneTag';
import { Divider } from '../../components/ui/Divider';
import { ImagePlaceholder } from '../../components/common/ImagePlaceholder';
import { SCENES_DATA } from '../../data/scenesData';
import { initProjectsAnimation } from './projectsAnimation';

export function ProjectsScene() {
  const sceneData = SCENES_DATA.find((s) => s.id === 'projects');
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    initProjectsAnimation(containerRef, { container: wrapperRef.current });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="scene-projects" className="scene-container">
      <div className="scene-inner" ref={wrapperRef}>
        <SceneTag number={sceneData.number} text={sceneData.tagline} />
        <h2 style={{ fontSize: 'var(--text-3xl)', marginTop: '1.5rem' }}>{sceneData.title}</h2>
        <p className="font-editorial" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-ochre)' }}>
          {sceneData.subtitle}
        </p>
        <Divider />
        <div style={{ marginTop: '2rem' }}>
          <ImagePlaceholder asset={sceneData.asset} aspect="21/9" />
        </div>
      </div>
    </section>
  );
}
