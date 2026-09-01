import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import thinnaiImg from '../../assets/images/architecture/chettinad_thinnai_space.png';

gsap.registerPlugin(ScrollTrigger);

/*
 * ═══════════════════════════════════════════════════════════════════════
 * SECTION 5 — HOME EXPERIENCE / THINNAI
 * "The Threshold" — Cinematic Aperture Reveal
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Animation Concept:
 * The Thinnai is a threshold space — between outside and inside, public
 * and private. The animation mirrors this: the viewer peers through a
 * narrow vertical opening which slowly widens to reveal the full
 * architectural composition, as if approaching and passing through a
 * Chettinad doorway.
 *
 * Scroll Narrative:
 *   0–12%   "The Glimpse"       — Narrow slit of warm architecture
 *   12–42%  "The Threshold"     — Dark curtains retract, space opens up
 *   42–55%  "Full Reveal"       — Complete Thinnai, glass card appears
 *   55–80%  "The Experience"    — Settle into the space, warmth swells
 *   80–100% "The Departure"     — Gentle fade toward Section 6
 *
 * Technical approach:
 *   - Two gradient curtain panels retract outward (width animation)
 *   - Single image with brightness/warmth filter transition
 *   - Very subtle scale (1.0 → 1.06) at the image's vanishing point
 *   - Warm light overlay intensifies as curtains open
 *   - Inner pin wrapper for React DOM safety
 * ═══════════════════════════════════════════════════════════════════════
 */

export function ThinnaiSection() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);

  // Visual layers
  const imageRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const warmthRef = useRef(null);
  const glowRef = useRef(null);

  // Typography
  const titleGroupRef = useRef(null);
  const glassCardRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinWrapperRef.current;
      if (!section || !pin) return;

      const image = imageRef.current;
      const curtainL = curtainLeftRef.current;
      const curtainR = curtainRightRef.current;
      const warmth = warmthRef.current;
      const glow = glowRef.current;
      const titleGroup = titleGroupRef.current;
      const glassCard = glassCardRef.current;

      // ── Reduced Motion ──
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (curtainL) gsap.set(curtainL, { width: 0 });
        if (curtainR) gsap.set(curtainR, { width: 0 });
        if (titleGroup) gsap.set(titleGroup, { opacity: 1 });
        if (glassCard) gsap.set(glassCard, { opacity: 1, y: 0 });
        return;
      }

      // ── Initial States ──
      // Image: dimmed and slightly cool — "pre-dawn" atmosphere
      if (image) {
        gsap.set(image, {
          scale: 1.0,
          transformOrigin: '42% 46%', // near the image's vanishing point
          filter: 'brightness(0.55) contrast(1.05) saturate(0.75)',
        });
      }

      // Curtains: each covers 42% of viewport width
      if (curtainL) gsap.set(curtainL, { width: '42vw' });
      if (curtainR) gsap.set(curtainR, { width: '42vw' });

      // Warm sunlight atmosphere — invisible initially
      if (warmth) gsap.set(warmth, { opacity: 0 });

      // Center glow (light bleeding through the narrow slit)
      if (glow) gsap.set(glow, { opacity: 0.6 });

      // Typography
      if (titleGroup) gsap.set(titleGroup, { opacity: 0, y: 20 });
      if (glassCard) gsap.set(glassCard, { opacity: 0, y: 35 });

      // ── Master Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pin,
          start: 'top top',
          end: '+=280%',
          anticipatePin: 1,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      /* ─────────────────────────────────────────────────────────
         PHASE 1: "THE GLIMPSE" (0% – 12%)
         Narrow vertical slit visible. Title fades in.
         ───────────────────────────────────────────────────────── */
      if (titleGroup) {
        tl.to(titleGroup, {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        }, 0.02);
      }

      /* ─────────────────────────────────────────────────────────
         PHASE 2: "THE THRESHOLD OPENS" (12% – 42%)
         Curtains retract outward. Architecture revealed.
         Image brightens and warms. Center glow fades.
         Very subtle forward scale begins.
         ───────────────────────────────────────────────────────── */
      // Left curtain retracts
      if (curtainL) {
        tl.to(curtainL, {
          width: 0,
          duration: 0.30,
          ease: 'power2.inOut',
        }, 0.12);
      }

      // Right curtain retracts
      if (curtainR) {
        tl.to(curtainR, {
          width: 0,
          duration: 0.30,
          ease: 'power2.inOut',
        }, 0.12);
      }

      // Image warms up — like morning light filling the room
      if (image) {
        tl.to(image, {
          scale: 1.04,
          filter: 'brightness(0.78) contrast(1.12) saturate(1.0)',
          duration: 0.30,
          ease: 'none',
        }, 0.12);
      }

      // Center glow fades as full image is revealed
      if (glow) {
        tl.to(glow, {
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        }, 0.18);
      }

      // Warm atmospheric overlay begins
      if (warmth) {
        tl.to(warmth, {
          opacity: 0.55,
          duration: 0.25,
          ease: 'sine.inOut',
        }, 0.20);
      }

      /* ─────────────────────────────────────────────────────────
         PHASE 3: "FULL REVEAL" (42% – 55%)
         Complete Thinnai visible. Title fades, glass card appears.
         ───────────────────────────────────────────────────────── */
      // Title exits
      if (titleGroup) {
        tl.to(titleGroup, {
          opacity: 0,
          y: -20,
          duration: 0.10,
          ease: 'power2.in',
        }, 0.40);
      }

      // Glass editorial card enters
      if (glassCard) {
        tl.to(glassCard, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power3.out',
        }, 0.46);
      }

      /* ─────────────────────────────────────────────────────────
         PHASE 4: "THE EXPERIENCE" (55% – 80%)
         Settle into the space. Subtle scale continues.
         Warm light intensifies. Architecture is the hero.
         ───────────────────────────────────────────────────────── */
      if (image) {
        tl.to(image, {
          scale: 1.06,
          filter: 'brightness(0.82) contrast(1.12) saturate(1.05)',
          duration: 0.25,
          ease: 'none',
        }, 0.55);
      }

      if (warmth) {
        tl.to(warmth, {
          opacity: 0.7,
          duration: 0.20,
          ease: 'sine.in',
        }, 0.60);
      }

      /* ─────────────────────────────────────────────────────────
         PHASE 5: "THE DEPARTURE" (80% – 100%)
         Glass card fades. Gentle darkening toward Section 6.
         ───────────────────────────────────────────────────────── */
      if (glassCard) {
        tl.to(glassCard, {
          opacity: 0,
          y: -15,
          duration: 0.12,
          ease: 'power2.in',
        }, 0.82);
      }

      // Final subtle darkening for clean transition
      if (image) {
        tl.to(image, {
          filter: 'brightness(0.6) contrast(1.1) saturate(0.85)',
          duration: 0.18,
          ease: 'power2.in',
        }, 0.84);
      }

      if (warmth) {
        tl.to(warmth, {
          opacity: 0.25,
          duration: 0.15,
          ease: 'power2.in',
        }, 0.85);
      }
    },
    { scope: sectionRef }
  );

  /* ───────────────────────────────────────────────────────────────────
     RENDER
     ─────────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="thinnai-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--color-dark-teak-deep, #180D09)',
        color: 'var(--color-warm-ivory, #F7F3E9)',
      }}
    >
      {/* Inner Pin Wrapper — GSAP pins this; React never touches it */}
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
            THE THINNAI IMAGE
            Full-screen architectural photograph. Starts dimmed.
            Scale origin at the image's vanishing point (42% 46%)
            so the subtle zoom feels like stepping forward.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={imageRef}
          style={{
            position: 'absolute',
            inset: '-4%',
            zIndex: 1,
            willChange: 'transform, filter',
          }}
        >
          <img
            src={thinnaiImg}
            alt="Traditional Chettinad Thinnai — carved Burma teak pillars framing Athangudi tile flooring, wooden seating benches, brass deepam, with an open courtyard garden beyond"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 46%',
              display: 'block',
            }}
          />
          {/* Cinematic vignette — keeps edges dark like a film frame */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse 80% 75% at 42% 48%,
                  transparent 25%,
                  rgba(12, 5, 3, 0.65) 100%
                ),
                linear-gradient(to bottom,
                  rgba(12, 5, 3, 0.5) 0%,
                  transparent 30%,
                  transparent 75%,
                  rgba(12, 5, 3, 0.8) 100%
                )
              `,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════
            WARM ATMOSPHERIC LIGHT
            Golden radial glow that intensifies as the space
            is "entered" — simulates warm morning sunlight
            filling the Thinnai.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={warmthRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            willChange: 'opacity',
            background: `
              radial-gradient(ellipse 70% 65% at 45% 55%,
                rgba(255, 210, 130, 0.18) 0%,
                rgba(200, 160, 80, 0.06) 50%,
                transparent 100%
              )
            `,
            mixBlendMode: 'screen',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            CENTER GLOW — "Light Through the Crack"
            A narrow vertical warm glow visible in the initial
            slit opening. Fades out as the curtains retract.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            top: '10%',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12vw',
            zIndex: 5,
            pointerEvents: 'none',
            willChange: 'opacity',
            background: `
              radial-gradient(ellipse 100% 100% at 50% 50%,
                rgba(255, 215, 140, 0.15) 0%,
                rgba(212, 175, 55, 0.05) 40%,
                transparent 100%
              )
            `,
            mixBlendMode: 'screen',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            LEFT CURTAIN
            Dark gradient panel covering the left side.
            Starts at 42vw wide, retracts to 0.
            Gradient edge creates a soft cinematic transition
            rather than a hard cut.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={curtainLeftRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 6,
            willChange: 'width',
            background: `linear-gradient(to right,
              #0C0503 0%,
              #0C0503 65%,
              rgba(12, 5, 3, 0.85) 80%,
              rgba(12, 5, 3, 0.4) 92%,
              transparent 100%
            )`,
            pointerEvents: 'none',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            RIGHT CURTAIN
            Mirror of the left curtain.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={curtainRightRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 6,
            willChange: 'width',
            background: `linear-gradient(to left,
              #0C0503 0%,
              #0C0503 65%,
              rgba(12, 5, 3, 0.85) 80%,
              rgba(12, 5, 3, 0.4) 92%,
              transparent 100%
            )`,
            pointerEvents: 'none',
          }}
        />

        {/* ═══════════════════════════════════════════════════════
            ARRIVAL TITLE — "The Glimpse"
            Appears early while only the narrow slit is visible.
            Centered in the viewport for maximum impact.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={titleGroupRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            textAlign: 'center',
            willChange: 'opacity, transform',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
              marginBottom: 'var(--space-4)',
            }}
          >
            04 — Home Experience
          </div>
          {/* Display Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 400,
              color: 'var(--color-warm-ivory)',
              letterSpacing: '0.1em',
              lineHeight: 'var(--leading-tight)',
              textTransform: 'uppercase',
              textShadow: '0 4px 40px rgba(0,0,0,0.9), 0 0 80px rgba(12, 5, 3, 0.95)',
              margin: 0,
            }}
          >
            Thinnai
          </h2>
          {/* Subtle tagline below heading */}
          <div
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'var(--text-base)',
              fontStyle: 'italic',
              color: 'var(--color-sand)',
              marginTop: 'var(--space-4)',
              letterSpacing: '0.02em',
              opacity: 0.75,
            }}
          >
            The space between home and world
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            GLASS EDITORIAL CARD — "The Experience"
            Appears at full reveal. Positioned in the lower-right
            negative space to avoid covering the Thinnai's
            central architectural composition.
            ═══════════════════════════════════════════════════════ */}
        <div
          ref={glassCardRef}
          style={{
            position: 'absolute',
            bottom: 'clamp(2.5rem, 7vh, 5rem)',
            right: 'clamp(4%, 6vw, 8%)',
            zIndex: 10,
            width: 'min(88%, 460px)',
            backgroundColor: 'var(--glass-dark-bg)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid var(--glass-dark-border)',
            borderRadius: '12px',
            padding: 'clamp(1.25rem, 2.8vw, 2rem)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.65)',
            willChange: 'opacity, transform',
          }}
        >
          {/* Tagline */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Where Life Gathers
          </div>
          {/* Quote */}
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-warm-ivory)',
              fontStyle: 'italic',
              lineHeight: 'var(--leading-relaxed)',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              margin: '0 0 var(--space-2) 0',
            }}
          >
            "Where the home becomes a place to gather."
          </p>
          {/* Supporting */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-sand)',
              fontWeight: 300,
              lineHeight: 'var(--leading-relaxed)',
              letterSpacing: '0.015em',
              opacity: 0.8,
              margin: 0,
            }}
          >
            Space for conversation, rest and everyday life.
          </p>
        </div>
      </div>
    </section>
  );
}
