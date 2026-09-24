'use client';

import * as React from 'react';
import type { ImageFxPhase } from './imageEngine';

export type RevealPhase = ImageFxPhase;

export type RevealHoldMode = 'auto' | 'manual';

export interface TriggerRevealOptions {
  hold?: RevealHoldMode;
}

export interface UseImageRevealOptions {
  images?: string[];
  autoReveal?: boolean;
  revealDelayRange?: [number, number];
  revealHoldMs?: number;
  revealFadeOutMs?: number;
  revealMs?: number;
  paused?: boolean;
  reducedMotion?: boolean;
}

export interface UseImageRevealResult {
  phase: RevealPhase;
  activeImage: HTMLImageElement | null;
  phaseRef: React.RefObject<RevealPhase>;
  progressRef: React.RefObject<number>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  triggerReveal: (opts?: TriggerRevealOptions) => void;
  triggerHide: () => void;
  isImageActive: () => boolean;
}

type ImageCacheEntry = {
  img: HTMLImageElement | null;
  promise?: Promise<HTMLImageElement | null>;
};

const imageCache = new Map<string, ImageCacheEntry>();

function loadHtmlImage(url: string): Promise<HTMLImageElement | null> {
  const cached = imageCache.get(url);
  if (cached) {
    if (cached.promise) return cached.promise;
    return Promise.resolve(cached.img);
  }

  const entry: ImageCacheEntry = { img: null };
  imageCache.set(url, entry);

  entry.promise = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      entry.img = ok ? img : null;
      entry.promise = undefined;
      resolve(ok ? img : null);
    };

    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => finish(img.naturalWidth > 0);
    img.onerror = () => finish(false);
    img.src = url;

    if (img.complete && img.naturalWidth > 0) finish(true);
  });

  return entry.promise;
}

function pickImageUrl(images: string[], lastUrl: string | null): string | null {
  if (!images.length) return null;
  if (images.length === 1) return images[0];
  const pool = images.filter((url) => url && url !== lastUrl);
  const list = pool.length ? pool : images;
  const index = Math.floor(Math.random() * list.length);
  return list[index] ?? null;
}

function randomDelayMs(range: [number, number]): number {
  const min = Math.min(range[0], range[1]);
  const max = Math.max(range[0], range[1]);
  const lo = Number.isFinite(min) ? Math.max(0, min) : 2;
  const hi = Number.isFinite(max) ? Math.max(lo, max) : 4;
  return (lo + Math.random() * (hi - lo)) * 1000;
}

const DEFAULT_DELAY: [number, number] = [2, 4];
const DEFAULT_REVEAL_MS = 900;
const DEFAULT_HOLD_MS = 2000;
const DEFAULT_FADE_OUT_MS = 300;

/**
 * Orchestrates idle → reveal → visible → hide for the img-fx mosaic loader.
 * Auto-loop, imperative reveal/hide, and HTMLImageElement cache live here.
 */
export function useImageReveal(options: UseImageRevealOptions = {}): UseImageRevealResult {
  const {
    images = [],
    autoReveal = false,
    revealDelayRange = DEFAULT_DELAY,
    revealHoldMs = DEFAULT_HOLD_MS,
    revealFadeOutMs = DEFAULT_FADE_OUT_MS,
    revealMs = DEFAULT_REVEAL_MS,
    paused = false,
    reducedMotion = false,
  } = options;

  const [phase, setPhaseState] = React.useState<RevealPhase>('idle');
  const [activeImage, setActiveImage] = React.useState<HTMLImageElement | null>(null);

  const phaseRef = React.useRef<RevealPhase>('idle');
  const progressRef = React.useRef(0);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const holdModeRef = React.useRef<RevealHoldMode>('auto');
  const loadingRef = React.useRef(false);
  const lastUrlRef = React.useRef<string | null>(null);
  const holdElapsedRef = React.useRef(0);
  const idleElapsedRef = React.useRef(0);
  const nextDelayRef = React.useRef(0);
  const mountedRef = React.useRef(true);

  const optionsRef = React.useRef({
    images,
    autoReveal,
    revealDelayRange,
    revealHoldMs,
    revealFadeOutMs,
    revealMs,
    paused,
    reducedMotion,
  });
  optionsRef.current = {
    images,
    autoReveal,
    revealDelayRange,
    revealHoldMs,
    revealFadeOutMs,
    revealMs,
    paused,
    reducedMotion,
  };

  const setPhase = React.useCallback((next: RevealPhase) => {
    if (phaseRef.current === next) return;
    phaseRef.current = next;
    if (mountedRef.current) setPhaseState(next);
  }, []);

  const clearActiveImage = React.useCallback(() => {
    imageRef.current = null;
    if (mountedRef.current) setActiveImage(null);
  }, []);

  const beginReveal = React.useCallback(
    (hold: RevealHoldMode, img: HTMLImageElement, url: string | null) => {
      holdModeRef.current = hold;
      holdElapsedRef.current = 0;
      idleElapsedRef.current = 0;
      nextDelayRef.current = 0;
      imageRef.current = img;
      lastUrlRef.current = url;
      if (mountedRef.current) setActiveImage(img);

      if (optionsRef.current.reducedMotion) {
        progressRef.current = 1;
        setPhase('visible');
        if (hold === 'auto') holdElapsedRef.current = 0;
        return;
      }

      progressRef.current = 0;
      setPhase('reveal');
    },
    [setPhase]
  );

  const triggerReveal = React.useCallback(
    (opts?: TriggerRevealOptions) => {
      const optsNow = optionsRef.current;
      if (optsNow.paused) return;
      if (phaseRef.current !== 'idle' || loadingRef.current) return;

      const list = optsNow.images;
      const url = pickImageUrl(list, lastUrlRef.current);
      if (!url) return;

      loadingRef.current = true;
      void loadHtmlImage(url).then((img) => {
        loadingRef.current = false;
        if (!mountedRef.current) return;
        if (phaseRef.current !== 'idle') return;
        if (optionsRef.current.paused) {
          idleElapsedRef.current = 0;
          return;
        }
        if (!img) {
          // Failed / blocked image — stay on theme mosaic and re-arm auto loop.
          idleElapsedRef.current = 0;
          nextDelayRef.current = 0;
          return;
        }
        beginReveal(opts?.hold ?? 'auto', img, url);
      });
    },
    [beginReveal]
  );

  const triggerHide = React.useCallback(() => {
    if (phaseRef.current === 'idle') return;
    if (phaseRef.current === 'visible' || phaseRef.current === 'reveal') {
      if (optionsRef.current.reducedMotion) {
        progressRef.current = 0;
        holdModeRef.current = 'manual';
        setPhase('idle');
        clearActiveImage();
        idleElapsedRef.current = 0;
        nextDelayRef.current = 0;
        return;
      }
      holdModeRef.current = 'manual';
      if (phaseRef.current === 'reveal') {
        // Snap to hide from current progress
      }
      holdElapsedRef.current = 0;
      setPhase('hide');
    }
  }, [clearActiveImage, setPhase]);

  const isImageActive = React.useCallback(() => {
    const p = phaseRef.current;
    return p === 'reveal' || p === 'visible';
  }, []);

  const goIdle = React.useCallback(() => {
    progressRef.current = 0;
    setPhase('idle');
    clearActiveImage();
    holdElapsedRef.current = 0;
    idleElapsedRef.current = 0;
    nextDelayRef.current = 0;
  }, [clearActiveImage, setPhase]);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Single rAF clock: progress, hold, and autoReveal delay.
  React.useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 100);
      last = now;

      const optsNow = optionsRef.current;
      if (optsNow.paused) return;

      const current = phaseRef.current;

      if (current === 'reveal') {
        const duration = Math.max(1, optsNow.revealMs);
        if (optsNow.reducedMotion) {
          progressRef.current = 1;
          setPhase('visible');
          holdElapsedRef.current = 0;
          return;
        }
        progressRef.current = Math.min(1, progressRef.current + dt / duration);
        if (progressRef.current >= 1) {
          progressRef.current = 1;
          holdElapsedRef.current = 0;
          setPhase('visible');
        }
        return;
      }

      if (current === 'visible') {
        if (holdModeRef.current !== 'auto') return;
        if (optsNow.reducedMotion) {
          // Still honor hold duration without motion churn.
        }
        holdElapsedRef.current += dt;
        if (holdElapsedRef.current >= Math.max(0, optsNow.revealHoldMs)) {
          if (optsNow.reducedMotion) {
            goIdle();
          } else {
            progressRef.current = 1;
            holdElapsedRef.current = 0;
            setPhase('hide');
          }
        }
        return;
      }

      if (current === 'hide') {
        if (optsNow.reducedMotion) {
          goIdle();
          return;
        }
        const fade = Math.max(1, optsNow.revealFadeOutMs);
        progressRef.current = Math.max(0, progressRef.current - dt / fade);
        if (progressRef.current <= 0) {
          goIdle();
        }
        return;
      }

      // idle
      if (!optsNow.autoReveal || loadingRef.current) {
        idleElapsedRef.current = 0;
        return;
      }
      if (nextDelayRef.current <= 0) {
        nextDelayRef.current = randomDelayMs(optsNow.revealDelayRange);
      }
      idleElapsedRef.current += dt;
      if (idleElapsedRef.current >= nextDelayRef.current) {
        idleElapsedRef.current = 0;
        nextDelayRef.current = 0;
        triggerReveal({ hold: 'auto' });
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [goIdle, setPhase, triggerReveal]);

  // Reset auto scheduler when autoReveal/paused toggles.
  React.useEffect(() => {
    idleElapsedRef.current = 0;
    nextDelayRef.current = 0;
  }, [autoReveal, paused]);

  return {
    phase,
    activeImage,
    phaseRef,
    progressRef,
    imageRef,
    triggerReveal,
    triggerHide,
    isImageActive,
  };
}
