import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImageSequence } from '../hooks/useImageSequence';
import './HeroSequence.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

export default function HeroSequence() {
  const {
    canvasRef,
    containerRef,
    isFirstFrameLoaded,
    loadProgress,
    drawFrame,
  } = useImageSequence();

  const scrollTriggerRef = useRef(null);

  // Set up GSAP ScrollTrigger to scrub through frames
  useEffect(() => {
    if (!isFirstFrameLoaded) return;

    const frameObj = { frame: 0 };

    const tween = gsap.to(frameObj, {
      frame: TOTAL_FRAMES - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: () => {
          drawFrame(Math.round(frameObj.frame));
        },
      },
    });

    scrollTriggerRef.current = tween.scrollTrigger;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      tween.kill();
    };
  }, [isFirstFrameLoaded, drawFrame, containerRef]);

  return (
    <div className="hero-sequence" ref={containerRef}>
      {/* Scrollable space — 5× viewport to give scroll runway */}
      <div className="hero-sequence__scroll-spacer" />

      {/* Sticky canvas viewport */}
      <div className="hero-sequence__sticky">
        <canvas
          ref={canvasRef}
          className="hero-sequence__canvas"
        />

        {/* Loading indicator — fades out once fully loaded */}
        {loadProgress < 100 && isFirstFrameLoaded && (
          <div className="hero-sequence__loader">
            <div className="hero-sequence__loader-bar">
              <div
                className="hero-sequence__loader-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Initial loading screen before first frame */}
        {!isFirstFrameLoaded && (
          <div className="hero-sequence__preloader">
            <div className="hero-sequence__preloader-spinner" />
          </div>
        )}
      </div>
    </div>
  );
}
