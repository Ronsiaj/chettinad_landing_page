import React, { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import local photorealistic project images
import project1Img from '../../assets/images/projects/project_01_kanadukathan.png';
import project2Img from '../../assets/images/projects/project_02_visalam.png';
import project3Img from '../../assets/images/projects/project_03_athangudi.png';
import project4Img from '../../assets/images/projects/project_04_palathur.png';

gsap.registerPlugin(ScrollTrigger);

/*
 * ═══════════════════════════════════════════════════════════════════════
 * SECTION 7 — PROJECTS
 * "Built to Belong" — Cinematic Horizontal Architectural Gallery
 * ═══════════════════════════════════════════════════════════════════════
 *
 * A scroll-controlled horizontal architectural gallery showcasing
 * completed Chettinad heritage homes.
 *
 * Flow:
 *   VERTICAL SCROLL → SECTION PINNED → PROJECTS MOVE HORIZONTALLY
 *
 * Technical:
 *   - Pinned container with GSAP ScrollTrigger xPercent animation
 *   - Isolated inner pin wrapper to prevent React Virtual DOM conflicts
 *   - Staggered typography reveals as projects sweep into view
 *   - Active project index counter (01/04 ... 04/04)
 *   - Fully responsive layout (horizontal gallery on desktop/tablet)
 * ═══════════════════════════════════════════════════════════════════════
 */

const PROJECTS_DATA = [
  {
    id: 'kanadukathan',
    number: '01',
    title: 'Kanadukathan Residence',
    category: 'Traditional Chettinad Residence',
    location: 'Karaikudi, Tamil Nadu',
    description: 'Restored 19th-century merchant home featuring hand-carved Burma teak pillars and expansive sunlit Athangudi tile courtyards.',
    image: project1Img,
    aspect: '16/9',
  },
  {
    id: 'visalam',
    number: '02',
    title: 'Visalam Heritage Villa',
    category: 'Restored Heritage Mansion',
    location: 'Kottaiyur, Chettinad',
    description: 'Dual-storied heritage villa with pastel egg-white lime plaster facades and double courtyard passive air circulation.',
    image: project2Img,
    aspect: '16/9',
  },
  {
    id: 'athangudi-house',
    number: '03',
    title: 'Athangudi Courtyard House',
    category: 'Contemporary Heritage Residence',
    location: 'Athangudi, Tamil Nadu',
    description: 'Modern family sanctuary built with locally crafted red semmann bricks and bespoke mineral-pigment Athangudi tile floors.',
    image: project3Img,
    aspect: '16/9',
  },
  {
    id: 'palathur',
    number: '04',
    title: 'Palathur Estate',
    category: 'Heritage Retreat & Living Monument',
    location: 'Palathur, Tamil Nadu',
    description: 'Expansive estate corridor featuring mirror-polished lime plaster, brass light fixtures, and heirloom granite masonry.',
    image: project4Img,
    aspect: '16/9',
  },
];

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const activeCounterRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRef = useCallback((el, idx) => {
    cardRefs.current[idx] = el;
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinWrapperRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track) return;

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Calculate total horizontal scroll distance
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Primary Horizontal Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pin,
          start: 'top top',
          end: () => `+=${getScrollAmount() + window.innerHeight * 0.5}`,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Calculate active index (0 to 3) based on scroll progress
            const progress = self.progress;
            const total = PROJECTS_DATA.length;
            const activeIndex = Math.min(
              Math.floor(progress * total),
              total - 1
            );

            if (activeCounterRef.current) {
              activeCounterRef.current.textContent = `0${activeIndex + 1} / 0${total}`;
            }
          },
        },
      });

      // Move track horizontally
      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      // Animate project typography & images as they pass through viewport center
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const img = card.querySelector('.project-img');
        const info = card.querySelector('.project-info');

        if (img && info) {
          gsap.fromTo(
            img,
            { scale: 1.05, filter: 'brightness(0.75)' },
            {
              scale: 1,
              filter: 'brightness(1)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left 85%',
                end: 'right 15%',
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            info,
            { opacity: 0.3, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left 70%',
                end: 'left 30%',
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects-section"
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Subtle Ambient Background Lighting */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `
              radial-gradient(circle at 20% 30%, rgba(200, 90, 50, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.06) 0%, transparent 60%)
            `,
            zIndex: 1,
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            TOP FIXED HEADER
            Maintains context as projects move horizontally
            ═══════════════════════════════════════════════════════ */}
        <div
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
              06 — Projects
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
              }}
            >
              Built to Belong
            </h2>
          </div>

          {/* Active Project Counter */}
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <div
              ref={activeCounterRef}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--color-gold, #D4AF37)',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              01 / 04
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--text-xs)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                opacity: 0.7,
                marginTop: '0.2rem',
              }}
            >
              Portfolio Showcase
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            HORIZONTAL PROJECTS TRACK
            Flex container sliding horizontally via GSAP
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: 'clamp(10rem, 20vh, 13rem)',
            paddingBottom: 'clamp(2rem, 4vh, 3rem)',
            paddingLeft: 'clamp(4%, 6vw, 8%)',
            paddingRight: '30vw',
            gap: 'clamp(2rem, 5vw, 6rem)',
            willChange: 'transform',
            zIndex: 2,
          }}
        >
          {/* INTROEDITORIAL CALLOUT SLIDE */}
          <div
            style={{
              flexShrink: 0,
              width: 'clamp(280px, 28vw, 420px)',
              marginRight: '2rem',
              marginTop: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              "Homes shaped by Chettinad tradition, craftsmanship, and living place."
            </p>
            <div
              style={{
                width: '60px',
                height: '1px',
                backgroundColor: 'var(--color-terracotta, #C85A32)',
                marginTop: '2rem',
              }}
            />
          </div>

          {/* PROJECT CARDS */}
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => setCardRef(el, idx)}
              style={{
                flexShrink: 0,
                width: 'clamp(300px, 58vw, 820px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Architectural Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(220px, 40vh, 460px)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  backgroundColor: '#180D09',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease-out',
                  }}
                />

                {/* Gentle Image Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(12, 5, 3, 0.7) 0%, transparent 40%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Subtle Project Tag on Image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    padding: '0.4rem 0.8rem',
                    backgroundColor: 'rgba(12, 5, 3, 0.65)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '2px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    color: 'var(--color-sand)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.number} / {project.category}
                </div>
              </div>

              {/* Project Info Block */}
              <div
                className="project-info"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '0.5rem 0.2rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)',
                      fontWeight: 400,
                      color: 'var(--color-warm-ivory)',
                      letterSpacing: '0.04em',
                      margin: '0 0 0.4rem 0',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                      fontStyle: 'italic',
                      color: 'var(--color-sand, #D5C4A1)',
                      margin: 0,
                      maxWidth: '650px',
                      opacity: 0.9,
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div
                  style={{
                    textAlign: 'right',
                    minWidth: '160px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-terracotta, #C85A32)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Location
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-warm-ivory)',
                      fontWeight: 400,
                    }}
                  >
                    {project.location}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* OUTRO TRANSITION SLIDE TO SECTION 8 */}
          <div
            style={{
              flexShrink: 0,
              width: 'clamp(280px, 32vw, 480px)',
              paddingLeft: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
                marginBottom: '0.8rem',
              }}
            >
              Next — Craft Philosophy
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
                letterSpacing: '0.04em',
                lineHeight: 1.2,
                margin: '0 0 1rem 0',
                textTransform: 'uppercase',
              }}
            >
              Why We Build This Way
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--text-base)',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Every material chosen serves longevity, comfort, and timeless beauty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
