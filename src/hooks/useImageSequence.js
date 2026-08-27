import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_PREFIX = 'ezgif-frame-';

/**
 * Generates the image path for a given frame number (1-indexed).
 */
function getFramePath(frameNumber) {
  const padded = String(frameNumber).padStart(3, '0');
  return `/src/assets/images/${FRAME_PREFIX}${padded}.jpg`;
}

/**
 * Custom hook to manage image sequence loading and canvas rendering.
 *
 * Strategy:
 *  1. Load frame 1 immediately (critical path).
 *  2. Load remaining frames in small progressive batches.
 *  3. Draw the current frame to a canvas on each scroll update.
 *
 * @returns {{ canvasRef, containerRef, isFirstFrameLoaded, loadProgress, totalFrames }}
 */
export function useImageSequence() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const loadedCountRef = useRef(0);

  // Draw a specific frame index onto the canvas
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Cover the canvas while preserving the image aspect ratio
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const imgAspect = imgW / imgH;
    const canvasAspect = canvasW / canvasH;

    let drawW, drawH, drawX, drawY;

    if (canvasAspect > imgAspect) {
      // Canvas is wider – fit width, crop height
      drawW = canvasW;
      drawH = canvasW / imgAspect;
      drawX = 0;
      drawY = (canvasH - drawH) / 2;
    } else {
      // Canvas is taller – fit height, crop width
      drawH = canvasH;
      drawW = canvasH * imgAspect;
      drawX = (canvasW - drawW) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    currentFrameRef.current = frameIndex;
  }, []);

  // Resize the canvas to match the container / viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Redraw the current frame at the new resolution
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Load images
  useEffect(() => {
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index + 1); // 1-indexed filenames
        img.onload = () => {
          images[index] = img;
          loadedCountRef.current += 1;
          setLoadProgress(Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));
          if (index === 0) {
            setIsFirstFrameLoaded(true);
            // Draw frame 1 immediately
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index + 1}`);
          resolve();
        };
      });
    };

    // Phase 1: Load the first frame immediately
    loadImage(0).then(async () => {
      // Phase 2: Load remaining frames in batches of 8
      const BATCH_SIZE = 8;
      const remaining = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        remaining.push(i);
      }

      for (let b = 0; b < remaining.length; b += BATCH_SIZE) {
        const batch = remaining.slice(b, b + BATCH_SIZE);
        await Promise.all(batch.map((idx) => loadImage(idx)));
      }
    });
  }, [drawFrame]);

  // Handle resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  return {
    canvasRef,
    containerRef,
    isFirstFrameLoaded,
    loadProgress,
    totalFrames: TOTAL_FRAMES,
    drawFrame,
    imagesRef,
  };
}
