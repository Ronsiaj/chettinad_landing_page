import React, { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Architectural background images for memory transition
import testimonial1Img from '../../assets/images/animation_images/authenticity.png';
import testimonial2Img from '../../assets/images/animation_images/central_courtyard.jpg';
import testimonial3Img from '../../assets/images/animation_images/craftmanship.jpg';
import testimonial4Img from '../../assets/images/animation_images/longetivity.jpg';

gsap.registerPlugin(ScrollTrigger);

/*
 * ═══════════════════════════════════════════════════════════════════════
 * SECTION 9 — TESTIMONIALS
 * "Waves of Memory — Voices from the Home"
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Narrative:
 *   "A home is measured by the life it holds."
 *
 * Animation Mechanism:
 *   - Scroll-controlled organic SVG wave transition between testimonials.
 *   - Soft curved wave sweeps across the viewport, carrying one memory into the next.
 *   - Synchronized background architectural photo transitions & editorial quotes.
 *   - Concludes with emotional closing: "A HOME BECOMES A MEMORY."
 * ═══════════════════════════════════════════════════════════════════════
 */

const TESTIMONIALS_DATA = [
  {
    id: 't1',
    number: '01',
    quote:
      'Living in a home built with natural lime plaster and Athangudi tile floors completely changed how our family experiences space. The summer heat never enters here.',
    author: 'M. RAMANATHAN',
    project: 'Kanadukathan Residence',
    location: 'Karaikudi, Tamil Nadu',
    image: testimonial1Img,
    alt: 'Kanadukathan Chettinad residence portal',
  },
  {
    id: 't2',
    number: '02',
    quote:
      'The central open courtyard brings rain, wind, and morning sunlight straight into our living room. It feels less like a house and more like a sanctuary.',
    author: 'MEENAKSHI & S. ALAGAPPAN',
    project: 'Visalam Heritage Villa',
    location: 'Kottaiyur, Chettinad',
    image: testimonial2Img,
    alt: 'Central Chettinad courtyard open to sky',
  },
  {
    id: 't3',
    number: '03',
    quote:
      'The woodwork alone tells a story of generations. Walking down the teak corridors every day feels like living inside a piece of living history.',
    author: 'K. MUTHUKUMAR',
    project: 'Palathur Estate',
    location: 'Palathur, Tamil Nadu',
    image: testimonial3Img,
    alt: 'Hand-carved Burma teak column detail',
  },
  {
    id: 't4',
    number: '04',
    quote:
      "They didn't just build a structure for us. They captured the spirit, microclimate, and soul of traditional Chettinad living.",
    author: 'DR. A. ARUNACHALAM',
    project: 'Athangudi Courtyard House',
    location: 'Athangudi, Tamil Nadu',
    image: testimonial4Img,
    alt: 'Chettinad mansion dusk facade',
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const wavePathRef = useRef(null);
  const introHeaderRef = useRef(null);
  const closingBlockRef = useRef(null);

  const bgImgRefs = useRef([]);
  const quoteCardRefs = useRef([]);

  const setBgImgRef = useCallback((el, idx) => {
    bgImgRefs.current[idx] = el;
  }, []);

  const setQuoteCardRef = useCallback((el, idx) => {
    quoteCardRefs.current[idx] = el;
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinWrapperRef.current;
      const wavePath = wavePathRef.current;
      if (!section || !pin || !wavePath) return;

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (bgImgRefs.current[0]) gsap.set(bgImgRefs.current[0], { opacity: 1 });
        if (quoteCardRefs.current[0]) gsap.set(quoteCardRefs.current[0], { opacity: 1, y: 0 });
        return;
      }

      // Initial state setups
      bgImgRefs.current.forEach((img, idx) => {
        if (!img) return;
        gsap.set(img, {
          opacity: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1 : 1.05,
        });
      });

      quoteCardRefs.current.forEach((card, idx) => {
        if (!card) return;
        gsap.set(card, {
          opacity: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 30,
        });
      });

      if (closingBlockRef.current) {
        gsap.set(closingBlockRef.current, { opacity: 0, y: 35 });
      }

      // Initial SVG wave position (hidden off-screen right)
      gsap.set(wavePath, {
        attr: {
          d: 'M 1400,0 C 1200,300 1350,600 1200,1000 L 1400,1000 Z',
        },
        opacity: 0,
      });

      // Master Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pin,
          start: 'top top',
          end: '+=420%',
          anticipatePin: 1,
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      // ── Step 0: Header Intro Subtly Fades Out (0% → 12%) ──
      tl.to(
        introHeaderRef.current,
        {
          opacity: 0.2,
          y: -15,
          duration: 0.12,
          ease: 'power2.in',
        },
        0.08
      );

      // ── Step 1 to 4: Sequential Testimonial Wave Transitions ──
      const stepDuration = 0.2;

      TESTIMONIALS_DATA.forEach((_, idx) => {
        if (idx === 0) return;

        const prevIdx = idx - 1;
        const startTime = 0.14 + (idx - 1) * stepDuration;

        // Wave Sweep Animation across screen
        tl.to(
          wavePath,
          {
            opacity: 0.85,
            duration: stepDuration * 0.3,
            ease: 'sine.in',
          },
          startTime
        )
          .to(
            wavePath,
            {
              attr: {
                d: 'M -200,0 C 300,200 100,700 800,1000 L 1400,1000 Z',
              },
              duration: stepDuration * 0.5,
              ease: 'power2.inOut',
            },
            startTime
          )
          // Hide Previous Background & Reveal Next Background
          .to(
            bgImgRefs.current[prevIdx],
            {
              opacity: 0,
              scale: 1.03,
              duration: stepDuration * 0.4,
              ease: 'power2.inOut',
            },
            startTime + stepDuration * 0.2
          )
          .to(
            bgImgRefs.current[idx],
            {
              opacity: 1,
              scale: 1,
              duration: stepDuration * 0.4,
              ease: 'power2.inOut',
            },
            startTime + stepDuration * 0.3
          )
          // Hide Previous Quote Card & Reveal Next Quote Card
          .to(
            quoteCardRefs.current[prevIdx],
            {
              opacity: 0,
              y: -25,
              duration: stepDuration * 0.3,
              ease: 'power2.in',
            },
            startTime + stepDuration * 0.1
          )
          .to(
            quoteCardRefs.current[idx],
            {
              opacity: 1,
              y: 0,
              duration: stepDuration * 0.4,
              ease: 'power3.out',
            },
            startTime + stepDuration * 0.4
          )
          // Settle Wave Off-Screen Left
          .to(
            wavePath,
            {
              attr: {
                d: 'M -400,0 C -300,400 -400,700 -200,1000 L -400,1000 Z',
              },
              opacity: 0,
              duration: stepDuration * 0.3,
              ease: 'sine.out',
            },
            startTime + stepDuration * 0.5
          )
          // Reset Wave position for next cycle
          .set(
            wavePath,
            {
              attr: {
                d: 'M 1400,0 C 1200,300 1350,600 1200,1000 L 1400,1000 Z',
              },
            },
            startTime + stepDuration * 0.85
          );
      });

      // ── Step 5: Final Emotional Closing Reveal (88% → 100%) ──
      const lastIdx = TESTIMONIALS_DATA.length - 1;
      tl.to(
        quoteCardRefs.current[lastIdx],
        {
          opacity: 0,
          y: -20,
          duration: 0.1,
          ease: 'power2.in',
        },
        0.88
      ).to(
        closingBlockRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'power3.out',
        },
        0.9
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials-section"
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
        {/* ═══════════════════════════════════════════════════════
            LAYER 1: BACKGROUND ARCHITECTURAL IMAGE STACK
            Subtly shifts with each testimonial
            ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        >
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={`bg-${t.id}`}
              ref={(el) => setBgImgRef(el, idx)}
              style={{
                position: 'absolute',
                inset: 0,
                willChange: 'opacity, transform',
              }}
            >
              <img
                src={t.image}
                alt={t.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.35) contrast(1.15)',
                  display: 'block',
                }}
              />
            </div>
          ))}

          {/* Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse at 50% 50%, rgba(12, 5, 3, 0.4) 0%, rgba(12, 5, 3, 0.95) 85%),
                linear-gradient(to bottom, rgba(12, 5, 3, 0.8) 0%, transparent 40%, rgba(12, 5, 3, 0.9) 100%)
              `,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════
            LAYER 2: CINEMATIC ORGANIC SVG WAVE LAYER
            Sweeps across viewport during scroll transitions
            ═══════════════════════════════════════════════════════ */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 3,
            pointerEvents: 'none',
          }}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C85A32" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#180D09" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            ref={wavePathRef}
            fill="url(#waveGradient)"
            d="M 1400,0 C 1200,300 1350,600 1200,1000 L 1400,1000 Z"
            style={{ willChange: 'd, opacity' }}
          />
        </svg>

        <style>{`
          @media (max-width: 768px) {
            .testimonials-header-block {
              top: clamp(4.5rem, 9vh, 5.5rem) !important;
            }
            .testimonials-header-quote {
              display: none !important;
            }
            .testimonials-stack-container {
              padding-top: clamp(8rem, 16vh, 10rem) !important;
              padding-left: 1.2rem !important;
              padding-right: 1.2rem !important;
            }
            .testimonials-quote-card {
              gap: 1rem !important;
            }
            .testimonials-quote-card blockquote {
              font-size: clamp(1rem, 3.8vw, 1.35rem) !important;
              line-height: 1.45 !important;
            }
          }
        `}</style>

        {/* ═══════════════════════════════════════════════════════
            LAYER 3: FIXED SECTION HEADER
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={introHeaderRef}
          className="testimonials-header-block"
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
              08 — Testimonials
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
                letterSpacing: '0.06em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
              }}
            >
              Voices from the Home
            </h2>
          </div>

          <div className="testimonials-header-quote" style={{ textAlign: 'right' }}>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                margin: 0,
                opacity: 0.9,
              }}
            >
              "A home is measured by the life it holds."
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            LAYER 4: EDITORIAL TESTIMONIAL QUOTE STACK
            ═══════════════════════════════════════════════════════ */}
        <div
          className="testimonials-stack-container"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 clamp(6%, 10vw, 14%)',
          }}
        >
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={t.id}
              ref={(el) => setQuoteCardRef(el, idx)}
              className="testimonials-quote-card"
              style={{
                position: 'absolute',
                width: '100%',
                maxWidth: '920px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.8rem',
                opacity: idx === 0 ? 1 : 0,
                willChange: 'opacity, transform',
              }}
            >
              {/* Memory Number Badge */}
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold, #D4AF37)',
                  backgroundColor: 'rgba(12, 5, 3, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '0.3rem 1rem',
                  borderRadius: '100px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Memory {t.number} / 04
              </div>

              {/* Editorial Client Quote */}
              <blockquote
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-warm-ivory)',
                  lineHeight: 1.4,
                  margin: 0,
                  textShadow: '0 4px 30px rgba(0,0,0,0.95)',
                }}
              >
                “{t.quote}”
              </blockquote>

              {/* Client Name & Location */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-terracotta, #C85A32)',
                  }}
                >
                  — {t.author}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-sand, #D5C4A1)',
                    letterSpacing: '0.08em',
                    opacity: 0.85,
                  }}
                >
                  {t.project} • {t.location}
                </div>
              </div>
            </div>
          ))}

          {/* ═══════════════════════════════════════════════════════
              FINAL EMOTIONAL CLOSING BLOCK
              ═══════════════════════════════════════════════════════ */}
          <div
            ref={closingBlockRef}
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '840px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              opacity: 0,
              willChange: 'opacity, transform',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
                letterSpacing: '0.06em',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 4px 30px rgba(0,0,0,0.95)',
              }}
            >
              A Home Becomes a Memory.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                margin: 0,
              }}
            >
              "And the memories are what make it yours."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
