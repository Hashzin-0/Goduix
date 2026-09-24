// React hook: shared-clock rAF loop feeding the pure orb drawing engine.
// Respects prefers-reduced-motion (static frame), pauses when `paused` is
// true, when the tab is hidden, or when the canvas is offscreen.

import { useCallback, useEffect, useRef } from 'react';
import {
  drawThinkingOrb,
  parseTint,
  resolveOrbDrawConfig,
  STATIC_FRAME_TIME,
  type DrawThinkingOrbOptions,
  type ModeOpts,
  type OrbState,
  type OrbTint,
} from './orbEngine';

export interface UseOrbLoopOptions {
  /** Which of the nine animations to show. */
  state: OrbState;
  /** CSS pixel size of the square canvas box. */
  size: number;
  /** Speed multiplier on the preset's baked speed. @default 1 */
  speed?: number;
  /** Freeze on the current frame. @default false */
  paused?: boolean;
  /** Dark substrate (light ink) vs light substrate (dark ink). @default true */
  dark?: boolean;
  /** Optional CSS color tint for the ink ramp. */
  color?: string | null;
  /** Extra mode knobs merged over the resolved preset. */
  opts?: ModeOpts;
}

/**
 * Attach a canvas and run the orb animation on it.
 * Returns a ref callback to place on the target <canvas>.
 *
 * - DPR capped at 2; backing store sized once per (size, dpr) change.
 * - One rAF loop per instance, phased off `performance.now()` so multiple
 *   orbs stay in phase.
 * - `prefers-reduced-motion: reduce` paints one static frame and skips rAF.
 * - Offscreen (IntersectionObserver) and hidden-tab pause, resume in phase.
 * - All listeners and the rAF are cleaned up on unmount / dep change.
 */
export function useOrbLoop({
  state,
  size,
  speed = 1,
  paused = false,
  dark = true,
  color = null,
  opts: optsOverride,
}: UseOrbLoopOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedRef = useRef(false);
  const tintRef = useRef<OrbTint | null>(parseTint(color));
  const optsKey = optsOverride ? JSON.stringify(optsOverride) : '';

  // Keep latest deps in refs so the rAF closure never goes stale mid-frame.
  const stateRef = useRef(state);
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);
  const darkRef = useRef(dark);
  const optsRef = useRef(optsOverride);
  stateRef.current = state;
  sizeRef.current = size;
  speedRef.current = speed;
  darkRef.current = dark;
  optsRef.current = optsOverride;
  tintRef.current = parseTint(color);

  const paint = useCallback((timeSec: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const sz = sizeRef.current;
    const dpr = Math.min(
      2,
      (typeof devicePixelRatio !== 'undefined' && devicePixelRatio) || 1
    );
    // Keep backing store in sync without thrashing when already correct.
    const bw = Math.round(sz * dpr);
    if (canvas.width !== bw || canvas.height !== bw) {
      canvas.width = bw;
      canvas.height = bw;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, sz, sz);

    const drawOpts: DrawThinkingOrbOptions = {
      state: stateRef.current,
      size: sz,
      time: timeSec,
      dark: darkRef.current,
      tint: tintRef.current,
      opts: optsRef.current,
    };
    // Fold the preset's baked speed into the shared wall clock so every
    // instance stays phase-locked: t = (now/1000) * baseSpeed * speedMul.
    const { speed: baseSpeed } = resolveOrbDrawConfig(stateRef.current, sz);
    drawOpts.time = timeSec * baseSpeed * speedRef.current;
    drawThinkingOrb(ctx, drawOpts);
  }, []);

  const setCanvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      canvasRef.current = node;
      // Kick a paint when the ref attaches so a paused/static orb still shows.
      if (node) paint(STATIC_FRAME_TIME);
    },
    [paint]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mql =
      typeof matchMedia !== 'undefined'
        ? matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    const reduced = mql?.matches ?? false;
    reducedRef.current = reduced;

    // Size the canvas once for this (size, dpr) pair.
    const dpr = Math.min(
      2,
      (typeof devicePixelRatio !== 'undefined' && devicePixelRatio) || 1
    );
    const bw = Math.round(size * dpr);
    canvas.width = bw;
    canvas.height = bw;

    const drawAtNow = () => paint(performance.now() / 1000);

    // Reduced motion → one static representative frame, no rAF.
    if (reduced) {
      const { speed: baseSpeed } = resolveOrbDrawConfig(state, size);
      paint(STATIC_FRAME_TIME / Math.max(0.001, baseSpeed * speed));
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      drawAtNow();
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || paused) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Always paint at least one frame (covers paused / initially offscreen).
    drawAtNow();

    let visible = true;
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              if (visible && document.visibilityState !== 'hidden') start();
              else stop();
            },
            { rootMargin: '40px' }
          )
        : null;
    io?.observe(canvas);

    const onVis = () => {
      if (document.visibilityState === 'hidden') stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
      if (e.matches) {
        stop();
        const { speed: baseSpeed } = resolveOrbDrawConfig(stateRef.current, sizeRef.current);
        paint(STATIC_FRAME_TIME / Math.max(0.001, baseSpeed * speedRef.current));
      } else {
        start();
      }
    };
    mql?.addEventListener('change', onMotionChange);

    if (!io) start();
    else if (!paused && visible && document.visibilityState !== 'hidden') start();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mql?.removeEventListener('change', onMotionChange);
    };
  }, [state, size, speed, paused, dark, color, optsKey, paint]);

  return setCanvasRef;
}
