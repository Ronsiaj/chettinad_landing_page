import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SceneTag } from '../ui/SceneTag';
import { PortalMask } from './PortalMask';
import { initMasterCinematicAnimation } from './masterCinematicAnimation';

import frame01Svg from '../../assets/images/placeholders/frame01_exterior.svg';
import frame02Svg from '../../assets/images/placeholders/frame02_entrance.svg';
import frame04Svg from '../../assets/images/placeholders/frame04_corridor.svg';
import frame05Svg from '../../assets/images/placeholders/frame05_courtyard.svg';
import frame06Svg from '../../assets/images/placeholders/frame06_athangudi.svg';
import frame07Svg from '../../assets/images/placeholders/frame07_craftsmanship.svg';

/**
 * REFACTORED MASTER CINEMATIC STAGE
 * 
 * Z-INDEX ARCHITECTURE:
 * z-index 10 = Base Background Scene (Scene 01 Exterior)
 * z-index 20 = Incoming Scene (Nested inside PortalMask)
 * z-index 30 = Architectural Arch / Doorway Mask Frame
 * z-index 40 = Foreground Teak Door Panels (Left & Right 3D swing doors)
 * z-index 50 = UI / Editorial Text Overlay
 */
export function MasterCinematicStage() {
  const stageRef = useRef(null);

  // Scene & Mask Refs
  const scene01Ref = useRef(null);
  
  const mask02Ref = useRef(null);
  const scene02Ref = useRef(null);

  const scene03DoorsRef = useRef(null);
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);

  const mask04Ref = useRef(null);
  const scene04Ref = useRef(null);

  const mask05Ref = useRef(null);
  const scene05Ref = useRef(null);

  const mask06Ref = useRef(null);
  const scene06Ref = useRef(null);

  const mask07Ref = useRef(null);
  const scene07Ref = useRef(null);

  // Overlay Text Refs
  const title01Ref = useRef(null);
  const title02Ref = useRef(null);
  const title03Ref = useRef(null);

  useGSAP(() => {
    initMasterCinematicAnimation(stageRef, {
      scene01: scene01Ref.current,
      scene02: scene02Ref.current,
      mask02: mask02Ref.current,
      scene03Doors: scene03DoorsRef.current,
      doorLeft: doorLeftRef.current,
      doorRight: doorRightRef.current,
      scene04: scene04Ref.current,
      mask04: mask04Ref.current,
      scene05: scene05Ref.current,
      mask05: mask05Ref.current,
      scene06: scene06Ref.current,
      mask06: mask06Ref.current,
      scene07: scene07Ref.current,
      mask07: mask07Ref.current,
      title01: title01Ref.current,
      title02: title02Ref.current,
      title03: title03Ref.current,
    });
  }, { scope: stageRef });

  return (
    <section 
      ref={stageRef} 
      id="master-cinematic-stage"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#100704',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* ========================================================================= */}
      {/* Z-INDEX 10: BASE BACKGROUND SCENE — SCENE 01 EXTERIOR                   */}
      {/* ========================================================================= */}
      <div 
        ref={scene01Ref}
        data-scene="01"
        className="scene-wrapper scene--active"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          willChange: 'transform, opacity',
        }}
      >
        <img 
          src={frame01Svg} 
          alt="Chettinad Mansion Exterior" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* ========================================================================= */}
      {/* Z-INDEX 20/30: SCENE 02 ENTRANCE — NESTED INSIDE ARCH PORTAL MASK        */}
      {/* ========================================================================= */}
      <PortalMask maskRef={mask02Ref} type="arch" style={{ zIndex: 20 }}>
        <div 
          ref={scene02Ref}
          data-scene="02"
          className="scene-wrapper scene--prepared"
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
          }}
        >
          <img 
            src={frame02Svg} 
            alt="Mansion Entrance Archway" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </PortalMask>

      {/* ========================================================================= */}
      {/* Z-INDEX 20/30: SCENE 04 CORRIDOR — NESTED INSIDE DOOR PORTAL MASK         */}
      {/* (Rendered directly behind the 3D Teak Doors)                              */}
      {/* ========================================================================= */}
      <PortalMask maskRef={mask04Ref} type="door" style={{ zIndex: 20 }}>
        <div 
          ref={scene04Ref}
          data-scene="04"
          className="scene-wrapper scene--prepared"
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
          }}
        >
          <img 
            src={frame04Svg} 
            alt="Columned Corridor Walkway" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </PortalMask>

      {/* ========================================================================= */}
      {/* Z-INDEX 40: SCENE 03 FOREGROUND BURMA TEAK DOUBLE DOORS (3D SWING)        */}
      {/* ========================================================================= */}
      <div 
        ref={scene03DoorsRef}
        data-scene="03"
        className="scene-doors-wrapper"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 50vw, 680px)',
          height: 'clamp(420px, 65vh, 800px)',
          display: 'none',
          opacity: 0,
          visibility: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 40,
          perspective: '1200px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Left Teak Door Panel */}
          <div
            ref={doorLeftRef}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#3D2319',
              backgroundImage: 'linear-gradient(135deg, #3D2319 0%, #1A0E0A 100%)',
              border: '4px solid #180D09',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justify: 'flex-end',
              paddingRight: '12px',
              willChange: 'transform',
              boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '3px solid #D4AF37', backgroundColor: '#100704' }} />
          </div>

          {/* Right Teak Door Panel */}
          <div
            ref={doorRightRef}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#3D2319',
              backgroundImage: 'linear-gradient(225deg, #3D2319 0%, #1A0E0A 100%)',
              border: '4px solid #180D09',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justify: 'flex-start',
              paddingLeft: '12px',
              willChange: 'transform',
              boxShadow: 'inset 6px 0 12px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '3px solid #D4AF37', backgroundColor: '#100704' }} />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Z-INDEX 20/30: SCENE 05 COURTYARD — NESTED INSIDE ARCH PORTAL MASK       */}
      {/* ========================================================================= */}
      <PortalMask maskRef={mask05Ref} type="arch" style={{ zIndex: 20 }}>
        <div 
          ref={scene05Ref}
          data-scene="05"
          className="scene-wrapper scene--prepared"
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
          }}
        >
          <img 
            src={frame05Svg} 
            alt="Valavu Central Courtyard" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </PortalMask>

      {/* ========================================================================= */}
      {/* Z-INDEX 20/30: SCENE 06 ATHANGUDI TILES — NESTED INSIDE FLOOR PORTAL MASK  */}
      {/* ========================================================================= */}
      <PortalMask maskRef={mask06Ref} type="floor" style={{ zIndex: 20 }}>
        <div 
          ref={scene06Ref}
          data-scene="06"
          className="scene-wrapper scene--prepared"
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
          }}
        >
          <img 
            src={frame06Svg} 
            alt="Athangudi Tile Floor Pattern" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </PortalMask>

      {/* ========================================================================= */}
      {/* Z-INDEX 20/30: SCENE 07 CRAFTSMANSHIP — NESTED INSIDE DETAIL PORTAL MASK  */}
      {/* ========================================================================= */}
      <PortalMask maskRef={mask07Ref} type="arch" style={{ zIndex: 20 }}>
        <div 
          ref={scene07Ref}
          data-scene="07"
          className="scene-wrapper scene--prepared"
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
          }}
        >
          <img 
            src={frame07Svg} 
            alt="Heritage Craftsmanship Detail" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </PortalMask>

      {/* ========================================================================= */}
      {/* Z-INDEX 50: UI / EDITORIAL TEXT OVERLAYS                                 */}
      {/* ========================================================================= */}

      {/* Title Overlay 01 (Exterior Arrival) */}
      <div
        ref={title01Ref}
        style={{
          position: 'absolute',
          top: 'clamp(5rem, 15vh, 8rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          textAlign: 'center',
          width: 'min(90%, 800px)',
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          pointerEvents: 'none',
        }}
      >
        <SceneTag number="01" text="KANADUKATHAN & KARAIKUDI" />
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            color: 'var(--color-warm-ivory)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '0.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          CHETTINAD
        </h1>
      </div>

      {/* Title Overlay 02 (Courtyard Valavu) */}
      <div
        ref={title02Ref}
        style={{
          position: 'absolute',
          top: 'clamp(5rem, 15vh, 8rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          textAlign: 'center',
          width: 'min(90%, 800px)',
          opacity: 0,
          visibility: 'hidden',
          display: 'none',
          pointerEvents: 'none',
        }}
      >
        <SceneTag number="05" text="VALAVU ARCHITECTURE" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--color-warm-ivory)',
            letterSpacing: '0.12em',
            marginTop: '0.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          A HOUSE BUILT AROUND COURTYARDS
        </h2>
      </div>

      {/* Title Overlay 03 (Craftsmanship) */}
      <div
        ref={title03Ref}
        style={{
          position: 'absolute',
          bottom: 'var(--space-12)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          textAlign: 'center',
          width: 'min(90%, 800px)',
          opacity: 0,
          visibility: 'hidden',
          display: 'none',
          pointerEvents: 'none',
        }}
      >
        <SceneTag number="07" text="HEREDITARY MASTER ARTISANS" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--color-warm-ivory)',
            letterSpacing: '0.12em',
            marginTop: '0.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          CRAFTED BY HAND
        </h2>
      </div>
    </section>
  );
}
