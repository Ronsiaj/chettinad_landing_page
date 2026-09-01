import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import finalFrameImg from '../../assets/images/animation_images/authenticity.png';
import logoImg from '../../assets/images/animation_images/construction_logo.png';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);
  const finalImageRef = useRef(null);
  const messageRef = useRef(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      const finalImage = finalImageRef.current;
      const message = messageRef.current;

      if (!footer || !finalImage || !message) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([finalImage, message], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(finalImage, { scale: 1.06, opacity: 0.7 });
      gsap.set(message, { opacity: 0, y: 25 });

      gsap.to(finalImage, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.to(message, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: message,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: footerRef }
  );

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0C0503',
        color: 'var(--color-warm-ivory, #F7F3E9)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .footer-frame-container {
            min-height: 440px !important;
            padding: 3rem 1rem !important;
          }
          .footer-closing-heading {
            font-size: clamp(1.4rem, 5.2vw, 2.1rem) !important;
            letter-spacing: 0.05em !important;
          }
          .footer-closing-quote {
            font-size: clamp(0.95rem, 3.5vw, 1.15rem) !important;
            margin-bottom: 1.8rem !important;
          }
          .footer-info-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center !important;
          }
          .footer-brand-col {
            align-items: center !important;
          }
          .footer-nav-col ul {
            align-items: center !important;
          }
          .footer-nav-col button {
            text-align: center !important;
          }
          .footer-copyright-bar {
            flex-direction: column !important;
            text-align: center !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          PART 1: THE FINAL ARCHITECTURAL FRAME (EMOTIONAL END)
          ═══════════════════════════════════════════════════════ */}
      <div
        className="footer-frame-container"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(420px, 60vh, 680px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* Architectural Image Background */}
        <div
          ref={finalImageRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={finalFrameImg}
            alt="Chettinad mansion portal evening frame"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.32) contrast(1.15)',
              display: 'block',
            }}
          />
          {/* Soft Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(to bottom, #0C0503 0%, transparent 30%, transparent 70%, #0C0503 100%),
                radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(12, 5, 3, 0.85) 90%)
              `,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Closing Message */}
        <div
          ref={messageRef}
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: '840px',
            willChange: 'opacity, transform',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Official Brand Logo */}
          <img
            src={logoImg}
            alt="Karaikudi Construction Logo"
            style={{
              height: 'clamp(60px, 10vh, 90px)',
              width: 'auto',
              marginBottom: '1.2rem',
              filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.8))',
            }}
          />

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #C85A32)',
              marginBottom: '1rem',
            }}
          >
            Karaikudi Construction
          </div>

          <h2
            className="footer-closing-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 400,
              color: 'var(--color-warm-ivory)',
              letterSpacing: '0.08em',
              lineHeight: 1.15,
              textTransform: 'uppercase',
              margin: '0 0 1.2rem 0',
              textShadow: '0 4px 30px rgba(0,0,0,0.95)',
            }}
          >
            Built from Tradition.
            <br />
            Made for Generations.
          </h2>

          <p
            className="footer-closing-quote"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
              fontStyle: 'italic',
              color: 'var(--color-sand, #D5C4A1)',
              margin: '0 0 2.5rem 0',
              opacity: 0.9,
            }}
          >
            "A home shaped by the land, crafted by hand, and made to remain."
          </p>

          <a
            href="tel:+914428150900"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-ivory)',
              backgroundColor: 'rgba(200, 90, 50, 0.25)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              padding: '0.9rem 2.2rem',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(200, 90, 50, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(200, 90, 50, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            }}
          >
            Enquire About A Home
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PART 2: MINIMAL EDITORIAL FOOTER INFORMATION
          ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          backgroundColor: '#070302',
          borderTop: '1px solid rgba(212, 175, 55, 0.15)',
          padding: 'clamp(3rem, 6vh, 4.5rem) clamp(4%, 6vw, 8%) 2.5rem',
        }}
      >
        <div
          className="footer-info-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* BRAND COL */}
          <div className="footer-brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <img
                src={logoImg}
                alt="Karaikudi Construction Logo"
                style={{ height: '48px', width: 'auto' }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em',
                  color: 'var(--color-warm-ivory)',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Karaikudi Construction
              </h3>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                color: 'var(--color-sand, #D5C4A1)',
                opacity: 0.75,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Preserving classical Chettinad architecture with hand-carved woodwork, Athangudi tiles, and natural lime plaster.
            </p>
          </div>

          {/* NAVIGATION COL */}
          <div className="footer-nav-col">
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta, #C85A32)',
                marginBottom: '1rem',
              }}
            >
              Navigation
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
              }}
            >
              {[
                { label: '01 — Hero Gateway', id: 'hero-section' },
                { label: '02 — Art of Living', id: 'art-of-living' },
                { label: '03 — The Courtyard', id: 'courtyard-section' },
                { label: '04 — Thinnai Experience', id: 'thinnai-section' },
                { label: '05 — Construction & Materials', id: 'semmann-section' },
                { label: '06 — Projects Portfolio', id: 'projects-section' },
                { label: '07 — Architectural Philosophy', id: 'why-us-section' },
                { label: '08 — Voices from Home', id: 'testimonials-section' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: 'var(--color-sand, #D5C4A1)',
                      opacity: 0.8,
                      cursor: 'pointer',
                      transition: 'opacity 0.2s ease, color 0.2s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.color = '#D4AF37';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.color = 'var(--color-sand, #D5C4A1)';
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & LOCATIONS COL */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta, #C85A32)',
                marginBottom: '1rem',
              }}
            >
              Presence & Contact
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--color-sand, #D5C4A1)',
                opacity: 0.85,
                lineHeight: 1.7,
              }}
            >
              <div>Karaikudi • Kanadukathan</div>
              <div>Chettinad, Tamil Nadu</div>
              <div style={{ marginTop: '0.8rem', color: '#D4AF37' }}>
                enquiry@karaikudiconstruction.com
              </div>
              <div>
                <a href="tel:+914428150900" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 44 2815 0900
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div
          className="footer-copyright-bar"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: '1.8rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: 'rgba(213, 196, 161, 0.5)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Karaikudi Construction. All Rights Reserved.
          </div>
          <div>
            Traditional Chettinad Vernacular Architecture
          </div>
        </div>
      </div>
    </footer>
  );
}
