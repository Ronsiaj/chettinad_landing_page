import React from 'react';
import { useLenis } from '../../hooks/useLenis';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

export function CinematicLayout({ children }) {
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  return (
    <div className="relative min-h-screen bg-dark-teak text-warm-ivory overflow-x-hidden">
      {/* Fixed Film Vignette Overlay */}
      <div className="cinematic-vignette" />

      {/* Global Navigation Header */}
      <Header />

      {/* Main Scene Stack */}
      <main style={{ position: 'relative', zIndex: 'var(--z-base)' }}>
        {children}
      </main>

      {/* Cinematic Footer */}
      <Footer />
    </div>
  );
}
