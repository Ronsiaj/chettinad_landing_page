import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/images/animation_images/construction_logo.png';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.6rem clamp(4%, 5vw, 6%)' : '1.1rem clamp(4%, 5vw, 6%)',
        backgroundColor: scrolled ? 'rgba(12, 5, 3, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      {/* Brand Logo & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <img
          src={logoImg}
          alt="Karaikudi Construction Logo"
          style={{
            height: scrolled ? '36px' : '44px',
            width: 'auto',
            transition: 'height 0.4s ease',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--color-warm-ivory)',
              textTransform: 'uppercase',
            }}
          >
            Karaikudi Construction
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)',
              letterSpacing: '0.15em',
              color: 'var(--color-terracotta, #C85A32)',
              textTransform: 'uppercase',
            }}
          >
            Traditional Chettinad Architecture
          </span>
        </div>
      </div>

      {/* Right Navigation / Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>

        <a
          href="tel:+914428150900"
          style={{
            padding: '0.4rem 1.2rem',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '200px',
            color: 'var(--color-warm-ivory)',
            backgroundColor: 'rgba(200, 90, 50, 0.15)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(4px)',
            textDecoration: 'none',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-terracotta)';
            e.currentTarget.style.borderColor = 'var(--color-terracotta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(200, 90, 50, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
          }}
        >
          Inquire
        </a>
      </div>
    </header>
  );
}
