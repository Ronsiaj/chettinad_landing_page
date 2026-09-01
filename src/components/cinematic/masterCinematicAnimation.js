import { gsap } from '../../animations/core/gsapSetup';
import { ANIMATION_CONFIG } from '../../animations/animationConfig';

/**
 * REFACTORED MASTER CINEMATIC ANIMATION CONTROLLER (AUTOALPHA & VISIBILITY FIXED)
 * 
 * Manages 7 spatial scene states using GSAP autoAlpha (visibility + opacity):
 * - Time 0.0 -> 2.0: Scene 01 (Exterior) -> Scene 02 (Entrance Archway Mask Expansion)
 * - Time 2.0 -> 4.0: Scene 02 -> Scene 03 (3D Teak Door Swing) -> Scene 04 (Corridor Pass-Through)
 * - Time 4.0 -> 6.0: Scene 04 -> Scene 05 (Valavu Courtyard)
 * - Time 6.0 -> 8.0: Scene 05 -> Scene 06 (Athangudi Tile Floor Tilt)
 * - Time 8.0 -> 10.0: Scene 06 -> Scene 07 (Heritage Craftsmanship Detail)
 */
export function initMasterCinematicAnimation(stageRef, elements) {
  if (!stageRef.current) return null;

  const isReducedMotion = ANIMATION_CONFIG.getReducedMotion();

  const {
    scene01,
    scene02,
    mask02,
    scene03Doors,
    doorLeft,
    doorRight,
    scene04,
    mask04,
    scene05,
    mask05,
    scene06,
    mask06,
    scene07,
    mask07,
    title01,
    title02,
    title03,
  } = elements;

  const setSceneState = (el, state) => {
    if (!el) return;
    el.setAttribute('data-state', state);
    el.classList.remove('scene--prepared', 'scene--active', 'scene--exiting');
    el.classList.add(`scene--${state}`);
  };

  // Reduced Motion Fallback
  if (isReducedMotion) {
    [scene01, scene02, scene04, scene05, scene06, scene07].forEach((el) => {
      if (el) {
        gsap.set(el, { autoAlpha: 1, scale: 1 });
        setSceneState(el, 'active');
      }
    });
    if (mask02) gsap.set(mask02, { autoAlpha: 1, clipPath: 'none' });
    if (mask04) gsap.set(mask04, { autoAlpha: 1, clipPath: 'none' });
    if (mask05) gsap.set(mask05, { autoAlpha: 1, clipPath: 'none' });
    if (mask06) gsap.set(mask06, { autoAlpha: 1, clipPath: 'none' });
    if (mask07) gsap.set(mask07, { autoAlpha: 1, clipPath: 'none' });
    if (doorLeft) gsap.set(doorLeft, { rotateY: -85 });
    if (doorRight) gsap.set(doorRight, { rotateY: 85 });
    return null;
  }

  // STEP 0: INITIAL STATES (Strict AutoAlpha & Clip-Path setup)

  // Scene 01 (Exterior) -> ACTIVE AT START
  gsap.set(scene01, { autoAlpha: 1, scale: 1.0, transformOrigin: '50% 65%' });
  setSceneState(scene01, 'active');

  // Scene 02 (Entrance) -> PREPARED inside Mask 02
  gsap.set(mask02, { autoAlpha: 0, clipPath: 'inset(22% 38% 12% 38% round 160px 160px 0 0)' });
  gsap.set(scene02, { autoAlpha: 1, scale: 0.65, transformOrigin: '50% 65%' });
  setSceneState(scene02, 'prepared');

  // Scene 03 (3D Doors) -> PREPARED
  gsap.set(scene03Doors, { autoAlpha: 0, scale: 1.0 });
  gsap.set(doorLeft, { rotateY: 0, transformOrigin: 'left center' });
  gsap.set(doorRight, { rotateY: 0, transformOrigin: 'right center' });
  if (scene03Doors) setSceneState(scene03Doors, 'prepared');

  // Scene 04 (Corridor) -> PREPARED inside Mask 04
  gsap.set(mask04, { autoAlpha: 0, clipPath: 'inset(16% 32% 10% 32% round 140px 140px 0 0)' });
  gsap.set(scene04, { autoAlpha: 1, scale: 0.75 });
  setSceneState(scene04, 'prepared');

  // Scene 05 (Courtyard) -> PREPARED inside Mask 05
  gsap.set(mask05, { autoAlpha: 0, clipPath: 'inset(25% 35% 15% 35% round 160px 160px 0 0)' });
  gsap.set(scene05, { autoAlpha: 1, scale: 0.7 });
  setSceneState(scene05, 'prepared');

  // Scene 06 (Athangudi Tiles) -> PREPARED inside Mask 06
  gsap.set(mask06, { autoAlpha: 0, clipPath: 'inset(55% 15% 5% 15% round 12px)' });
  gsap.set(scene06, { autoAlpha: 1, scale: 0.8, yPercent: 30 });
  setSceneState(scene06, 'prepared');

  // Scene 07 (Craftsmanship) -> PREPARED inside Mask 07
  gsap.set(mask07, { autoAlpha: 0, clipPath: 'inset(30% 30% 30% 30% round 20px)' });
  gsap.set(scene07, { autoAlpha: 1, scale: 0.6 });
  setSceneState(scene07, 'prepared');

  // Text Overlays
  gsap.set(title01, { autoAlpha: 1, y: 0 });
  gsap.set([title02, title03], { autoAlpha: 0, y: 30 });

  // SINGLE MASTER SCROLLTRIGGER TIMELINE
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stageRef.current,
      start: 'top top',
      end: '+=600%',
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });

  // -------------------------------------------------------------
  // TIME 0.0 -> 2.0: SCENE 01 (Exterior) -> SCENE 02 (Entrance Arch)
  // -------------------------------------------------------------
  tl.addLabel('scene01', 0)
    .set(mask02, { autoAlpha: 1 }, 0)
    .to(scene01, {
      scale: 2.3,
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene01, 'exiting'),
    }, 0)
    .to(mask02, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene02, 'active'),
    }, 0)
    .to(scene02, {
      scale: 1.0,
      ease: 'none',
      duration: 2,
    }, 0)
    .to(title01, {
      autoAlpha: 0,
      y: -30,
      ease: 'none',
      duration: 1,
    }, 0.5);

  // -------------------------------------------------------------
  // TIME 2.0 -> 4.0: SCENE 02 -> SCENE 03 (Teak Doors) -> SCENE 04 (Corridor)
  // -------------------------------------------------------------
  tl.addLabel('scene02', 2)
    .set(scene03Doors, { autoAlpha: 1 }, 2)
    .set(mask04, { autoAlpha: 1 }, 2)
    .to(scene02, {
      scale: 1.8,
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene02, 'exiting'),
    }, 2)
    .to(doorLeft, {
      rotateY: -85,
      ease: 'none',
      duration: 2,
    }, 2)
    .to(doorRight, {
      rotateY: 85,
      ease: 'none',
      duration: 2,
    }, 2)
    .to(scene03Doors, {
      scale: 2.2,
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
    }, 2)
    .to(mask04, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene04, 'active'),
    }, 2)
    .to(scene04, {
      scale: 1.0,
      ease: 'none',
      duration: 2,
    }, 2);

  // -------------------------------------------------------------
  // TIME 4.0 -> 6.0: SCENE 04 (Corridor) -> SCENE 05 (Valavu Courtyard)
  // -------------------------------------------------------------
  tl.addLabel('scene04', 4)
    .set(mask05, { autoAlpha: 1 }, 4)
    .to(scene04, {
      scale: 2.4,
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene04, 'exiting'),
    }, 4)
    .to(mask04, {
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
    }, 4)
    .to(mask05, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene05, 'active'),
    }, 4)
    .to(scene05, {
      scale: 1.0,
      ease: 'none',
      duration: 2,
    }, 4)
    .to(title02, {
      autoAlpha: 1,
      y: 0,
      ease: 'none',
      duration: 0.8,
    }, 4.5)
    .to(title02, {
      autoAlpha: 0,
      y: -20,
      ease: 'none',
      duration: 0.8,
    }, 5.5);

  // -------------------------------------------------------------
  // TIME 6.0 -> 8.0: SCENE 05 (Courtyard) -> SCENE 06 (Athangudi Tiles)
  // -------------------------------------------------------------
  tl.addLabel('scene05', 6)
    .set(mask06, { autoAlpha: 1 }, 6)
    .to(scene05, {
      scale: 1.5,
      yPercent: -30,
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene05, 'exiting'),
    }, 6)
    .to(mask05, {
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
    }, 6)
    .to(mask06, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene06, 'active'),
    }, 6)
    .to(scene06, {
      scale: 1.0,
      yPercent: 0,
      ease: 'none',
      duration: 2,
    }, 6);

  // -------------------------------------------------------------
  // TIME 8.0 -> 10.0: SCENE 06 (Athangudi Tiles) -> SCENE 07 (Craftsmanship)
  // -------------------------------------------------------------
  tl.addLabel('scene06', 8)
    .set(mask07, { autoAlpha: 1 }, 8)
    .to(scene06, {
      scale: 1.8,
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene06, 'exiting'),
    }, 8)
    .to(mask06, {
      autoAlpha: 0,
      ease: 'none',
      duration: 2,
    }, 8)
    .to(mask07, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      duration: 2,
      onStart: () => setSceneState(scene07, 'active'),
    }, 8)
    .to(scene07, {
      scale: 1.0,
      ease: 'none',
      duration: 2,
    }, 8)
    .to(title03, {
      autoAlpha: 1,
      y: 0,
      ease: 'none',
      duration: 1.2,
    }, 8.5);

  tl.addLabel('scene07', 10);

  return tl;
}
