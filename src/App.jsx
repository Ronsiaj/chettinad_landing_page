import React from 'react';
import { useLenis } from './hooks/useLenis';
import { KolamIntro } from './components/intro/KolamIntro';
import { ChettinadHero } from './components/hero/ChettinadHero';
import { ArtOfLiving } from './components/architecture/ArtOfLiving';
import { CourtyardSection } from './components/architecture/CourtyardSection';
import { ThinnaiSection } from './components/thinnai/ThinnaiSection';
import { SemmannSection } from './components/materials/SemmannSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { CementOrLimeSection } from './components/materials/CementOrLimeSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

import './styles/globals.css';
import './styles/responsive.css';

export default function App() {
  useLenis();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#100704' }}>
      {/* GLOBAL FIXED HEADER WITH BRAND LOGO */}
      <Header />

      {/* PAGE LOAD BRAND INTRO (FULL-SCREEN KOLAM DRAWING SEQUENCE) */}
      <KolamIntro />

      {/* SECTION 1 — HERO GATEWAY (LOCKED) */}
      <ChettinadHero />

      {/* SECTION 2 — THE ART OF LIVING (CINEMATIC CAMERA PULLBACK) */}
      <ArtOfLiving />

      {/* SECTION 3 — THE COURTYARD (BANYAN TREE & ATMOSPHERIC WIND) */}
      <CourtyardSection />

      {/* SECTION 4 — THE THINNAI EXPERIENCE (WHERE LIFE BEGINS) */}
      <ThinnaiSection />

      {/* SECTION 5 — SEMMANN / THE RED EARTH (CHETTINAD SCROLL CONSTRUCTION) */}
      <SemmannSection />

      {/* SECTION 6 — PROJECTS / BUILT TO BELONG (CINEMATIC HORIZONTAL GALLERY) */}
      <ProjectsSection />

      {/* SECTION 7 — WHY US / PHILOSOPHY (EDITORIAL 5-PRINCIPLE REVEAL) */}
      <CementOrLimeSection />

      {/* SECTION 8 — TESTIMONIALS / VOICES FROM THE HOME (WAVES OF MEMORY) */}
      <TestimonialsSection />

      {/* SECTION 10 — FOOTER (THE FINAL ARCHITECTURAL FRAME) */}
      <Footer />
    </div>
  );
}
