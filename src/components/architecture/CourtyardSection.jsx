import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import courtyardImg from '../../assets/images/architecture/chettinad_courtyard_sky.png';
import banyanLeft from '../../assets/images/architecture/banyan_branch_left.png';
import banyanRight from '../../assets/images/architecture/banyan_branch_right.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * SECTION 3 — THE COURTYARD (MUTRAM)
 *
 * Open-air courtyard experience with atmospheric wind-sway banyan tree branches
 * in the foreground, presenting the courtyard as the emotional heart of a Chettinad home.
 * Reverted to original component design while keeping DOM safety pin wrapper for React.
 */
export function CourtyardSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const bgImgRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const branchLeftRef = useRef(null);
  const branchRightRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const bgImg = bgImgRef.current;
      const badge = badgeRef.current;
      const heading = headingRef.current;
      const text = textRef.current;
      const bLeft = branchLeftRef.current;
      const bRight = branchRightRef.current;

      if (!section || !pinWrapper || !bgImg) return;

      // Reduced motion check
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(bgImg, { scale: 1 });
        const validFadeElements = [badge, heading, text, bLeft, bRight].filter(Boolean);
        if (validFadeElements.length) gsap.set(validFadeElements, { opacity: 1, y: 0 });
        return;
      }

      // Initial States
      gsap.set(bgImg, { scale: 1.12, y: 0 });
      if (badge) gsap.set(badge, { opacity: 0, y: 20 });
      if (heading) gsap.set(heading, { opacity: 0, y: 40 });
      if (text) gsap.set(text, { opacity: 0, y: 30 });
      if (bLeft) gsap.set(bLeft, { opacity: 0, x: -30, y: -20 });
      if (bRight) gsap.set(bRight, { opacity: 0, x: 30, y: 20 });

      // Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pinWrapper,
          start: 'top top',
          end: '+=180%',
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 1. Background slow camera zoom-out (scale 1.12 → 1.0)
      tl.to(
        bgImg,
        {
          scale: 1.0,
          y: -15,
          ease: 'none',
          duration: 0.5,
        },
        0
      );

      // 2. Foreground Banyan Branches enter smoothly
      if (bLeft) {
        tl.to(
          bLeft,
          {
            opacity: 0.92,
            x: 0,
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.1
        );
      }

      if (bRight) {
        tl.to(
          bRight,
          {
            opacity: 0.92,
            x: 0,
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.12
        );
      }

      // 3. Content Text Reveal
      if (badge) {
        tl.to(
          badge,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.2,
          },
          0.25
        );
      }

      if (heading) {
        tl.to(
          heading,
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.3
        );
      }

      if (text) {
        tl.to(
          text,
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.25,
          },
          0.4
        );
      }

      // 4. Subtle Parallax offset between foreground branches and background courtyard during exit
      if (bLeft) {
        tl.to(
          bLeft,
          {
            y: -40,
            x: -15,
            ease: 'none',
            duration: 0.4,
          },
          0.6
        );
      }

      if (bRight) {
        tl.to(
          bRight,
          {
            y: -60,
            x: 15,
            ease: 'none',
            duration: 0.4,
          },
          0.6
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#100704',
        color: '#F7F3E9',
      }}
    >
      <div
        ref={pinWrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* CSS KEYFRAMES FOR NATURAL ORGANIC WIND-SWAY ANIMATION */}
        <style>{`
          @keyframes banyanSwayLeft {
            0% {
              transform: rotate(-1.5deg) translate(0px, 0px);
            }
            50% {
              transform: rotate(1.2deg) translate(6px, 4px);
            }
            100% {
              transform: rotate(-1.5deg) translate(0px, 0px);
            }
          }

          @keyframes banyanSwayRight {
            0% {
              transform: rotate(1.0deg) translate(0px, 0px);
            }
            50% {
              transform: rotate(-1.8deg) translate(-7px, -4px);
            }
            100% {
              transform: rotate(1.0deg) translate(0px, 0px);
            }
          }

          .banyan-sway-left {
            animation: banyanSwayLeft 5.8s ease-in-out infinite;
          }

          .banyan-sway-right {
            animation: banyanSwayRight 7.2s ease-in-out infinite;
            animation-delay: 1.4s;
          }
        `}</style>

        {/* LAYER 1: BACKGROUND — Open-Air Courtyard Image (Mutram) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <img
            ref={bgImgRef}
            src={courtyardImg}
            alt="Chettinad open-air courtyard Mutram with carved teak pillars and sky view"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 42%',
              willChange: 'transform',
              filter: 'brightness(0.55) contrast(1.1)',
            }}
          />
          {/* Soft Multi-stop Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 50% 45%, rgba(16, 7, 4, 0.28) 0%, rgba(16, 7, 4, 0.85) 82%),
                linear-gradient(to bottom, rgba(16, 7, 4, 0.75) 0%, rgba(16, 7, 4, 0.35) 42%, rgba(16, 7, 4, 0.94) 100%)
              `,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* LAYER 2: FOREGROUND CONTENT — Centered Editorial Layout */}
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            maxWidth: '920px',
            margin: '0 auto',
            padding: 'clamp(5.5rem, 10vh, 7rem) clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 4vh, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* UPPER / CENTER AREA: EDITORIAL HEADINGS & NARRATIVE */}
          <div
            style={{
              maxWidth: '780px',
              margin: 'clamp(1rem, 3vh, 2rem) auto 0',
              textAlign: 'center',
              pointerEvents: 'auto',
            }}
          >
            {/* Eyebrow */}
            <div
              ref={badgeRef}
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(0.7rem, 0.85vw, 0.85rem)',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#C68B34',
                marginBottom: 'clamp(0.5rem, 1vh, 0.85rem)',
                willChange: 'transform, opacity',
              }}
            >
              03 — THE HEART OF THE HOME
            </div>

            {/* Main Section Heading */}
            <h2
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 400,
                color: '#F7F3E9',
                letterSpacing: '0.08em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(16, 7, 4, 0.95)',
                marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                willChange: 'transform, opacity',
              }}
            >
              THE COURTYARD
            </h2>

            {/* Narrative Content Block */}
            <div
              ref={textRef}
              style={{
                willChange: 'transform, opacity',
              }}
            >
              {/* Main Statement */}
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                  color: '#E8DCC4',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  textShadow: '0 2px 20px rgba(0,0,0,0.85)',
                  maxWidth: '740px',
                  margin: '0 auto clamp(0.5rem, 1vh, 0.85rem)',
                }}
              >
                "At the centre of every Chettinad home, life gathers around an open sky."
              </p>

              {/* Supporting Copy */}
              <p
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.98rem)',
                  color: 'rgba(213, 196, 161, 0.78)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  letterSpacing: '0.015em',
                  textShadow: '0 2px 16px rgba(0,0,0,0.85)',
                  maxWidth: '680px',
                  margin: '0 auto',
                }}
              >
                More than an architectural feature, the courtyard creates a natural connection between the spaces of the home — bringing together light, air, shade and everyday life.
              </p>
            </div>
          </div>

          {/* LOWER AREA: THREE SHORT COURTYARD PRINCIPLES */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'clamp(1rem, 2.5vw, 2.5rem)',
              width: '100%',
              maxWidth: '880px',
              margin: 'clamp(1rem, 2.5vh, 2rem) auto 0',
              borderTop: '1px solid rgba(198, 139, 52, 0.25)',
              paddingTop: 'clamp(1rem, 2vh, 1.75rem)',
              textAlign: 'center',
              pointerEvents: 'auto',
            }}
          >
            {/* 01 — OPEN TO THE SKY */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#C68B34',
                  marginBottom: '0.3rem',
                }}
              >
                01
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(1.05rem, 1.3vw, 1.35rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                OPEN TO THE SKY
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1.02rem)',
                  color: 'rgba(213, 196, 161, 0.85)',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                "Light enters naturally through the heart of the home."
              </p>
            </div>

            {/* 02 — A PLACE TO GATHER */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#C68B34',
                  marginBottom: '0.3rem',
                }}
              >
                02
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(1.05rem, 1.3vw, 1.35rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                A PLACE TO GATHER
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1.02rem)',
                  color: 'rgba(213, 196, 161, 0.85)',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                "Spaces designed for conversation, rest and everyday life."
              </p>
            </div>

            {/* 03 — CONNECTED TO NATURE */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: '#C68B34',
                  marginBottom: '0.3rem',
                }}
              >
                03
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cinzel Decorative", "Cinzel", serif)',
                  fontSize: 'clamp(1.05rem, 1.3vw, 1.35rem)',
                  fontWeight: 400,
                  color: '#F7F3E9',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                CONNECTED TO NATURE
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-editorial, "Cormorant Garamond", serif)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1.02rem)',
                  color: 'rgba(213, 196, 161, 0.85)',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                "Architecture that keeps the outdoors within reach."
              </p>
            </div>
          </div>
        </div>

        {/* LAYER 3: FOREGROUND — Banyan Tree Branches with Wind Sway */}
        <div
          ref={branchLeftRef}
          style={{
            position: 'absolute',
            top: '-3%',
            left: '-3%',
            zIndex: 3,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={banyanLeft}
            alt="Banyan tree branch foreground top left"
            className="banyan-sway-left"
            style={{
              width: 'clamp(220px, 32vw, 440px)',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.6)) contrast(1.05)',
              transformOrigin: 'top left',
            }}
          />
        </div>

        <div
          ref={branchRightRef}
          style={{
            position: 'absolute',
            bottom: '-3%',
            right: '-3%',
            zIndex: 3,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={banyanRight}
            alt="Banyan tree branch foreground bottom right"
            className="banyan-sway-right"
            style={{
              width: 'clamp(220px, 32vw, 440px)',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.6)) contrast(1.05)',
              transformOrigin: 'bottom right',
            }}
          />
        </div>
      </div>
    </section>
  );
}
