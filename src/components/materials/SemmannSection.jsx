import React, { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import materialsVideo from '../../assets/videos/materials_video.mp4';

gsap.registerPlugin(ScrollTrigger);

/*
 * ═══════════════════════════════════════════════════════════════════════
 * SECTION 5 — MATERIALS
 * "From Earth to Home" — Scroll-Driven Construction Video Sequence
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Uses materials_video.mp4 scrubbed by vertical scroll.
 *
 * Construction Stages (mapped to scroll progress ranges 0.0 - 1.0):
 *   0.00–0.16  →  SEMMANN / Red Earth & Foundation
 *   0.16–0.40  →  BRICK + CRAFT / Walls Rising
 *   0.40–0.58  →  WOOD / Structural Timber
 *   0.58–0.75  →  LIME PLASTER / Breathable Surfaces
 *   0.75–0.90  →  ATHANGUDI / Flooring & Roof Details
 *   0.90–1.00  →  CRAFTED INTO HOME / Completed Mansion
 * ═══════════════════════════════════════════════════════════════════════
 */

const STAGES = [
  { start: 0,    end: 0.16, label: 'Semmann',           sub: 'Earth, shaped by generations.',                     color: '#C85A32' },
  { start: 0.16, end: 0.40, label: 'Brick + Craft',     sub: 'Built slowly. Built to last.',                      color: '#C85A32' },
  { start: 0.40, end: 0.58, label: 'Wood',              sub: 'Burma teak, carved by hand.',                       color: '#D4AF37' },
  { start: 0.58, end: 0.75, label: 'Lime Plaster',      sub: 'Breathable walls for a naturally cooler home.',     color: '#D5C4A1' },
  { start: 0.75, end: 0.90, label: 'Athangudi',         sub: 'Every tile carries the mark of the hand.',          color: '#D4AF37' },
  { start: 0.90, end: 1.00, label: 'Crafted Into Home', sub: 'Materials become architecture. Architecture becomes home.', color: '#F7F3E9' },
];

function getStageIndex(progress) {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (progress >= STAGES[i].start) return i;
  }
  return 0;
}

export function SemmannSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const videoRef = useRef(null);

  // Typography refs — one per construction stage
  const stageRefs = useRef([]);
  const headerRef = useRef(null);
  const progressLineRef = useRef(null);

  const currentStageRef = useRef(-1);

  // Assign stage refs
  const setStageRef = useCallback((el, idx) => {
    stageRefs.current[idx] = el;
  }, []);

  // GSAP ScrollTrigger scrub
  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinWrapperRef.current;
      const video = videoRef.current;
      if (!section || !pin || !video) return;

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (stageRefs.current[STAGES.length - 1]) {
          gsap.set(stageRefs.current[STAGES.length - 1], { opacity: 1, y: 0 });
        }
        return;
      }

      // Hide all stage labels initially
      stageRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 20 });
      });

      // Header visible
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1 });

      ScrollTrigger.create({
        trigger: section,
        pin: pin,
        start: 'top top',
        end: '+=350%',
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Scrub video current time
          if (video && video.duration && !isNaN(video.duration)) {
            video.currentTime = progress * video.duration;
          }

          // Stage Label Transitions
          const newStage = getStageIndex(progress);
          if (newStage !== currentStageRef.current) {
            const oldStage = currentStageRef.current;

            // Fade out old stage label
            if (oldStage >= 0 && stageRefs.current[oldStage]) {
              gsap.to(stageRefs.current[oldStage], {
                opacity: 0,
                y: -15,
                duration: 0.4,
                ease: 'power2.in',
                overwrite: true,
              });
            }

            // Fade in new stage label
            if (stageRefs.current[newStage]) {
              gsap.to(stageRefs.current[newStage], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                overwrite: true,
              });
            }

            currentStageRef.current = newStage;
          }

          // Progress Fill Line Update
          if (progressLineRef.current) {
            progressLineRef.current.style.height = `${progress * 100}%`;
          }

          // Header fades after first 8%
          if (headerRef.current) {
            if (progress > 0.08 && headerRef.current._hidden !== true) {
              gsap.to(headerRef.current, {
                opacity: 0,
                y: -15,
                duration: 0.4,
                ease: 'power2.in',
              });
              headerRef.current._hidden = true;
            } else if (progress <= 0.08 && headerRef.current._hidden === true) {
              gsap.to(headerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
              });
              headerRef.current._hidden = false;
            }
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="materials-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--color-dark-teak-deep, #180D09)',
        color: 'var(--color-warm-ivory, #F7F3E9)',
      }}
    >
      {/* Inner Pin Wrapper */}
      <div
        ref={pinWrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#0C0503',
        }}
      >
        {/* ═══════════════════════════════════════════════════════
            SCROLL-CONTROLLED MATERIALS CONSTRUCTION VIDEO
            ═══════════════════════════════════════════════════════ */}
        <video
          ref={videoRef}
          src={materialsVideo}
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            display: 'block',
          }}
        />

        {/* Cinematic vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background: `
              radial-gradient(ellipse 85% 80% at 50% 48%,
                transparent 30%,
                rgba(12, 5, 3, 0.55) 100%
              ),
              linear-gradient(to bottom,
                rgba(12, 5, 3, 0.45) 0%,
                transparent 25%,
                transparent 80%,
                rgba(12, 5, 3, 0.75) 100%
              )
            `,
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            HEADER — "05 — MATERIALS" / "FROM EARTH"
            Visible at the start, fades as construction begins.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={headerRef}
          style={{
            position: 'absolute',
            top: 'clamp(8%, 14vh, 18%)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            textAlign: 'center',
            willChange: 'opacity, transform',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #C85A32)',
              marginBottom: 'var(--space-3)',
            }}
          >
            05 — Materials
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 400,
              color: 'var(--color-warm-ivory)',
              letterSpacing: '0.08em',
              lineHeight: 'var(--leading-tight)',
              textTransform: 'uppercase',
              textShadow: '0 4px 40px rgba(0,0,0,0.9)',
              margin: 0,
            }}
          >
            From Earth
          </h2>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CONSTRUCTION STAGE LABELS
            ═══════════════════════════════════════════════════════ */}
        {STAGES.map((stage, idx) => (
          <div
            key={stage.label}
            ref={(el) => setStageRef(el, idx)}
            style={{
              position: 'absolute',
              bottom: 'clamp(2.5rem, 7vh, 5rem)',
              left: 'clamp(4%, 6vw, 8%)',
              zIndex: 10,
              maxWidth: '420px',
              willChange: 'opacity, transform',
            }}
          >
            {/* Stage Index */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: stage.color,
                marginBottom: 'var(--space-2)',
              }}
            >
              {String(idx + 1).padStart(2, '0')} / {stage.label}
            </div>
            {/* Stage Heading */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
                letterSpacing: '0.06em',
                lineHeight: 'var(--leading-tight)',
                textTransform: 'uppercase',
                textShadow: '0 3px 24px rgba(0,0,0,0.9)',
                margin: '0 0 var(--space-2) 0',
              }}
            >
              {stage.label}
            </h3>
            {/* Stage Description */}
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--text-base)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                lineHeight: 'var(--leading-relaxed)',
                textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                margin: 0,
                opacity: 0.9,
              }}
            >
              {stage.sub}
            </p>
          </div>
        ))}

        {/* ═══════════════════════════════════════════════════════
            SCROLL PROGRESS TRACK
            ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: 'clamp(1rem, 2vw, 2rem)',
            width: '2px',
            height: '70%',
            zIndex: 8,
            pointerEvents: 'none',
            backgroundColor: 'rgba(213, 196, 161, 0.12)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressLineRef}
            style={{
              width: '100%',
              height: '0%',
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 8px rgba(212, 175, 55, 0.8)',
              transition: 'height 0.1s linear',
            }}
          />
          {STAGES.map((stage, idx) => (
            <div
              key={`marker-${idx}`}
              style={{
                position: 'absolute',
                top: `${stage.start * 100}%`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'rgba(213, 196, 161, 0.4)',
                border: '1px solid rgba(212, 175, 55, 0.6)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
