import React, { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import visual assets for the 5 principles
import authenticityImg from '../../assets/images/animation_images/authenticity.png';
import materialsImg from '../../assets/images/animation_images/athangudi_tiles_pattern_images.jpg';
import craftsmanshipImg from '../../assets/images/animation_images/craftmanship.jpg';
import climateImg from '../../assets/images/animation_images/central_courtyard.jpg';
import longevityImg from '../../assets/images/animation_images/longetivity.jpg';

gsap.registerPlugin(ScrollTrigger);

/*
 * ═══════════════════════════════════════════════════════════════════════
 * SECTION 7 — WHY US
 * "The Philosophy Behind Every Home"
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Central Message:
 *   "WE BUILD WITH THE KNOWLEDGE OF WHAT CAME BEFORE."
 *
 * The 5 Core Principles:
 *   01 — AUTHENTICITY   (Chettinad, not imitation.)
 *   02 — MATERIALS      (Built from the right materials.)
 *   03 — CRAFTSMANSHIP  (Made by skilled hands.)
 *   04 — CLIMATE        (Designed for the Tamil landscape.)
 *   05 — LONGEVITY      (Built for generations.)
 * ═══════════════════════════════════════════════════════════════════════
 */

const PRINCIPLES = [
  {
    number: '01',
    title: 'AUTHENTICITY',
    tagline: 'Chettinad, not imitation.',
    description:
      'Traditional proportions, spatial planning, and architectural details are preserved rather than simply copied as decoration.',
    image: authenticityImg,
    alt: 'Traditional Chettinad entryway arch and wooden portal',
    color: '#C85A32',
  },
  {
    number: '02',
    title: 'MATERIALS',
    tagline: 'Built from the right materials.',
    description:
      'Semmann earth, lime plaster, hand-poured Athangudi tiles, natural stone, and carved timber are used where appropriate.',
    image: materialsImg,
    alt: 'Athangudi tile floor with brass vessels and lime plaster wall',
    color: '#D4AF37',
  },
  {
    number: '03',
    title: 'CRAFTSMANSHIP',
    tagline: 'Made by skilled hands.',
    description:
      'Traditional woodworking, stone chiselling, and lime finishing techniques remain an important part of our process.',
    image: craftsmanshipImg,
    alt: 'Hand-carved Burma teak wooden pillar and doorway detail',
    color: '#C85A32',
  },
  {
    number: '04',
    title: 'CLIMATE',
    tagline: 'Designed for the Tamil landscape.',
    description:
      'Open courtyards, shaded verandas, louvered ventilation, and thick lime masonry walls create naturally cool living spaces.',
    image: climateImg,
    alt: 'Central Chettinad courtyard open to the sky with timber columns',
    color: '#D5C4A1',
  },
  {
    number: '05',
    title: 'LONGEVITY',
    tagline: 'Built for generations.',
    description:
      'The goal is not to create a house that simply looks traditional today. The goal is to create a home that ages beautifully for generations.',
    image: longevityImg,
    alt: 'Grand Chettinad mansion facade under dusk lighting',
    color: '#D4AF37',
  },
];

export function CementOrLimeSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const introBlockRef = useRef(null);

  const imgRefs = useRef([]);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  const setImgRef = useCallback((el, idx) => {
    imgRefs.current[idx] = el;
  }, []);

  const setCardRef = useCallback((el, idx) => {
    cardRefs.current[idx] = el;
  }, []);

  const setDotRef = useCallback((el, idx) => {
    dotRefs.current[idx] = el;
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinWrapperRef.current;
      if (!section || !pin) return;

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (imgRefs.current[0]) gsap.set(imgRefs.current[0], { opacity: 1 });
        if (cardRefs.current[0]) gsap.set(cardRefs.current[0], { opacity: 1, y: 0 });
        return;
      }

      // Initial States
      imgRefs.current.forEach((img, idx) => {
        if (!img) return;
        gsap.set(img, {
          opacity: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1 : 1.04,
        });
      });

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        gsap.set(card, {
          opacity: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 25,
        });
      });

      dotRefs.current.forEach((dot, idx) => {
        if (!dot) return;
        gsap.set(dot, {
          backgroundColor: idx === 0 ? '#D4AF37' : 'rgba(213, 196, 161, 0.25)',
          width: idx === 0 ? 20 : 6,
        });
      });

      if (introBlockRef.current) {
        gsap.set(introBlockRef.current, { opacity: 1, y: 0 });
      }

      // Master Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pin,
          start: 'top top',
          end: '+=400%',
          anticipatePin: 1,
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      // ── Step 0: Intro Statement Fades Out Slowly (0% → 15%) ──
      tl.to(
        introBlockRef.current,
        {
          opacity: 0.15,
          y: -15,
          duration: 0.15,
          ease: 'power2.in',
        },
        0.08
      );

      // ── Step 1 to 5: Sequential Principle Cross-Fades ──
      const stepDuration = 0.18;

      PRINCIPLES.forEach((_, idx) => {
        if (idx === 0) return; // First principle is already visible

        const prevIdx = idx - 1;
        const startTime = 0.15 + (idx - 1) * stepDuration;

        // Transition Images
        tl.to(
          imgRefs.current[prevIdx],
          {
            opacity: 0,
            scale: 1.02,
            duration: stepDuration * 0.8,
            ease: 'power2.inOut',
          },
          startTime
        ).to(
          imgRefs.current[idx],
          {
            opacity: 1,
            scale: 1,
            duration: stepDuration * 0.8,
            ease: 'power2.inOut',
          },
          startTime + stepDuration * 0.1
        );

        // Transition Editorial Cards
        tl.to(
          cardRefs.current[prevIdx],
          {
            opacity: 0,
            y: -20,
            duration: stepDuration * 0.5,
            ease: 'power2.in',
          },
          startTime
        ).to(
          cardRefs.current[idx],
          {
            opacity: 1,
            y: 0,
            duration: stepDuration * 0.6,
            ease: 'power3.out',
          },
          startTime + stepDuration * 0.3
        );

        // Transition Progress Dots
        if (dotRefs.current[prevIdx] && dotRefs.current[idx]) {
          tl.to(
            dotRefs.current[prevIdx],
            {
              backgroundColor: 'rgba(213, 196, 161, 0.25)',
              width: 6,
              duration: stepDuration * 0.5,
              ease: 'power2.inOut',
            },
            startTime
          ).to(
            dotRefs.current[idx],
            {
              backgroundColor: '#D4AF37',
              width: 20,
              duration: stepDuration * 0.5,
              ease: 'power2.inOut',
            },
            startTime + stepDuration * 0.1
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="why-us-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0C0503',
        color: 'var(--color-warm-ivory, #F7F3E9)',
        overflow: 'hidden',
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
        {/* Subtle Ambient Background Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `
              radial-gradient(ellipse 70% 60% at 30% 50%, rgba(200, 90, 50, 0.07) 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 75% 60%, rgba(212, 175, 55, 0.05) 0%, transparent 70%),
              linear-gradient(to bottom, #140905 0%, #0C0503 100%)
            `,
          }}
        />

        <style>{`
          @media (max-width: 768px) {
            .why-us-header-block {
              top: clamp(4.2rem, 8vh, 5.2rem) !important;
            }
            .why-us-header-block h2 {
              font-size: clamp(1.05rem, 3.8vw, 1.45rem) !important;
              line-height: 1.25 !important;
            }
            .why-us-layout-container {
              flex-direction: column !important;
              top: clamp(9.2rem, 19vh, 11rem) !important;
              bottom: 2.2rem !important;
              gap: 0.6rem !important;
              justify-content: flex-start !important;
            }
            .why-us-img-box {
              width: 100% !important;
              flex: 0 0 clamp(120px, 18vh, 165px) !important;
              height: clamp(120px, 18vh, 165px) !important;
            }
            .why-us-card-box {
              width: 100% !important;
              flex: 1 1 auto !important;
              height: auto !important;
            }
            .why-us-card-box > div {
              padding: clamp(0.8rem, 2vw, 1.2rem) !important;
              gap: 0.5rem !important;
            }
            .why-us-card-box h3 {
              font-size: clamp(1.05rem, 3.5vw, 1.35rem) !important;
              margin-bottom: 0.15rem !important;
            }
            .why-us-card-box p {
              font-size: clamp(0.82rem, 2.7vw, 0.95rem) !important;
              line-height: 1.38 !important;
            }
            .why-us-dots-bar {
              bottom: 0.5rem !important;
            }
          }
        `}</style>

        {/* ═══════════════════════════════════════════════════════
            TOP FIXED SECTION HEADER & STATEMENT
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={introBlockRef}
          className="why-us-header-block"
          style={{
            position: 'absolute',
            top: 'clamp(5.5rem, 11vh, 7.5rem)',
            left: 'clamp(4%, 6vw, 8%)',
            right: 'clamp(4%, 6vw, 8%)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            pointerEvents: 'none',
            willChange: 'opacity, transform',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta, #C85A32)',
                marginBottom: '0.4rem',
              }}
            >
              07 — Why Us
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
                letterSpacing: '0.06em',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                margin: 0,
                maxWidth: '780px',
                textShadow: '0 4px 30px rgba(0,0,0,0.9)',
              }}
            >
              We Build with the Knowledge of What Came Before.
            </h2>
          </div>

          <div
            style={{
              textAlign: 'right',
              display: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--text-sm)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                opacity: 0.8,
              }}
            >
              Architectural Philosophy
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            MAIN EDITORIAL LAYOUT (52% VISUAL / 48% TEXT)
            ═══════════════════════════════════════════════════════ */}
        <div
          className="why-us-layout-container"
          style={{
            position: 'absolute',
            inset: 0,
            top: 'clamp(9.5rem, 19vh, 12.5rem)',
            bottom: 'clamp(2rem, 5vh, 4rem)',
            left: 'clamp(4%, 6vw, 8%)',
            right: 'clamp(4%, 6vw, 8%)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {/* ── LEFT ARCHITECTURAL VISUAL CONTAINER ── */}
          <div
            className="why-us-img-box"
            style={{
              flex: '0 1 clamp(320px, 52vw, 680px)',
              width: '52vw',
              height: 'clamp(260px, 44vh, 460px)',
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#180D09',
              boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 0 1px rgba(212, 175, 55, 0.2)',
            }}
          >
            {PRINCIPLES.map((principle, idx) => (
              <div
                key={`img-${principle.number}`}
                ref={(el) => setImgRef(el, idx)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  willChange: 'opacity, transform',
                }}
              >
                <img
                  src={principle.image}
                  alt={principle.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                      linear-gradient(to top, rgba(12, 5, 3, 0.75) 0%, transparent 40%),
                      linear-gradient(to right, transparent 60%, rgba(12, 5, 3, 0.6) 100%)
                    `,
                    pointerEvents: 'none',
                  }}
                />

                {/* Subtle Visual Tag on Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    padding: '0.4rem 0.9rem',
                    backgroundColor: 'rgba(12, 5, 3, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '2px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.12em',
                    color: 'var(--color-sand)',
                    textTransform: 'uppercase',
                  }}
                >
                  Principle {principle.number} — {principle.title}
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT EDITORIAL PRINCIPLE CARD STACK ── */}
          <div
            className="why-us-card-box"
            style={{
              flex: '0 1 clamp(280px, 34vw, 420px)',
              position: 'relative',
              height: 'clamp(260px, 44vh, 460px)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {PRINCIPLES.map((principle, idx) => (
              <div
                key={`card-${principle.number}`}
                ref={(el) => setCardRef(el, idx)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  backgroundColor: 'rgba(18, 10, 7, 0.85)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '4px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                  willChange: 'opacity, transform',
                }}
              >
                {/* Principle Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                    fontWeight: 600,
                    color: principle.color,
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                  }}
                >
                  {principle.number}
                </div>

                {/* Principle Heading */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                      fontWeight: 400,
                      color: 'var(--color-warm-ivory)',
                      letterSpacing: '0.06em',
                      margin: '0 0 0.3rem 0',
                      textTransform: 'uppercase',
                    }}
                  >
                    {principle.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-sand, #D5C4A1)',
                      opacity: 0.9,
                    }}
                  >
                    {principle.tagline}
                  </div>
                </div>

                {/* Divider Line */}
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    backgroundColor: principle.color,
                    opacity: 0.6,
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                    fontStyle: 'italic',
                    color: 'var(--color-sand, #D5C4A1)',
                    lineHeight: 1.6,
                    margin: 0,
                    opacity: 0.95,
                  }}
                >
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM SCROLL INDICATOR / PROGRESS DOTS
            ═══════════════════════════════════════════════════════ */}
        <div
          className="why-us-dots-bar"
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            pointerEvents: 'none',
          }}
        >
          {PRINCIPLES.map((p, idx) => (
            <div
              key={`dot-${p.number}`}
              ref={(el) => setDotRef(el, idx)}
              style={{
                width: idx === 0 ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: idx === 0 ? '#D4AF37' : 'rgba(213, 196, 161, 0.25)',
                willChange: 'width, background-color',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
