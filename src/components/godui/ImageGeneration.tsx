'use client';

import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import { fusionColor } from './fusion';
import { renderFrame, type ImageFxPreset } from './libraries/img-fx/imageEngine';
import { useImageReveal } from './libraries/img-fx/useImageReveal';

export interface ImageGenerationHandle {
  triggerReveal: (opts?: { hold?: 'auto' | 'manual' }) => void;
  triggerHide: () => void;
  isImageActive: () => boolean;
}

export interface ImageGenerationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  theme: ThemeColors;
  children?: React.ReactNode;
  images?: string[];
  preset?: ImageFxPreset;
  autoReveal?: boolean;
  pixelScale?: number;
  strength?: number;
  paused?: boolean;
  borderRadius?: number;
  ariaLabel?: string;
  fusions?: ComponentFusion[];
  ref?: React.Ref<ImageGenerationHandle>;
}

const FUSION_SLOTS = new Set(['background', 'border', 'content', 'main-container']);
const FRAME_MS = 1000 / 15;

function clampStrength(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

export const ImageGeneration: React.FC<ImageGenerationProps> = ({
  theme,
  children,
  images = [],
  preset = 'pixels-organic',
  autoReveal = false,
  pixelScale = 1,
  strength = 1,
  paused = false,
  borderRadius,
  ariaLabel,
  fusions,
  ref,
  className,
  style,
  ...rest
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const pixelFusion = React.useMemo(() => {
    return (fusions ?? []).find(
      (f) =>
        f.active &&
        f.sourceEffect === 'pixel-reveal' &&
        FUSION_SLOTS.has(f.targetSlot)
    );
  }, [fusions]);

  const fusionTint = pixelFusion ? fusionColor(pixelFusion, theme) : null;
  const fusionIntensity = pixelFusion
    ? Math.min(1, Math.max(0, pixelFusion.intensity ?? 0.8))
    : 0;

  const {
    phase,
    activeImage,
    phaseRef,
    progressRef,
    imageRef,
    triggerReveal,
    triggerHide,
    isImageActive,
  } = useImageReveal({
    images,
    autoReveal,
    paused,
    reducedMotion,
  });

  const handleRef = React.useRef<ImageGenerationHandle>({
    triggerReveal,
    triggerHide,
    isImageActive,
  });
  handleRef.current = { triggerReveal, triggerHide, isImageActive };

  React.useImperativeHandle(
    ref,
    () => ({
      triggerReveal: (opts) => handleRef.current.triggerReveal(opts),
      triggerHide: () => handleRef.current.triggerHide(),
      isImageActive: () => handleRef.current.isImageActive(),
    }),
    []
  );

  const configRef = React.useRef({
    theme,
    preset,
    pixelScale,
    paused,
    fusionTint,
    fusionIntensity,
    reducedMotion,
  });
  configRef.current = {
    theme,
    preset,
    pixelScale,
    paused,
    fusionTint,
    fusionIntensity,
    reducedMotion,
  };

  const [autoRadius, setAutoRadius] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (borderRadius != null) {
      setAutoRadius(null);
      return;
    }
    const root = contentRef.current;
    if (!root) return;
    const target = (root.firstElementChild as HTMLElement | null) ?? root;
    const raw = window.getComputedStyle(target).borderTopLeftRadius;
    const px = parseFloat(raw);
    setAutoRadius(Number.isFinite(px) ? px : 0);
  }, [borderRadius, children]);

  const resolvedRadius = borderRadius ?? autoRadius ?? 0;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let simTime = 0;
    let frameAcc = 0;
    let cssW = 0;
    let cssH = 0;
    let needsPaint = true;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = w;
      cssH = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsPaint = true;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const paint = () => {
      if (cssW <= 0 || cssH <= 0) return;
      const cfg = configRef.current;
      renderFrame(ctx, {
        width: cssW,
        height: cssH,
        time: simTime,
        pixelScale: cfg.pixelScale,
        preset: cfg.preset,
        theme: cfg.theme,
        tint: cfg.fusionTint,
        intensity: cfg.fusionIntensity,
        phase: phaseRef.current,
        progress: progressRef.current,
        image: imageRef.current,
        reducedMotion: cfg.reducedMotion,
      });
      needsPaint = false;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(now - last, 120);
      last = now;

      const cfg = configRef.current;
      if (cfg.paused) {
        if (needsPaint) paint();
        return;
      }

      if (cfg.reducedMotion) {
        if (needsPaint || phaseRef.current !== 'idle') paint();
        return;
      }

      frameAcc += dt;
      const step = phaseRef.current === 'idle' ? FRAME_MS : FRAME_MS / 2;
      if (frameAcc >= step) {
        simTime += frameAcc / 1000;
        frameAcc = 0;
        paint();
        return;
      }

      if (needsPaint || phaseRef.current !== 'idle') {
        paint();
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [phaseRef, progressRef, imageRef]);

  const activeFusions = (fusions ?? []).filter((f) => f.active);
  const dataFusions = activeFusions
    .map((f) => `${f.sourceEffect}:${f.targetSlot}`)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        borderRadius: resolvedRadius || undefined,
        ...style,
      }}
      aria-label={ariaLabel}
      data-fusions={dataFusions || undefined}
      data-phase={phase}
      {...rest}
    >
      <div ref={contentRef} className="relative z-0">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          borderRadius: 'inherit',
          opacity: clampStrength(strength),
        }}
      />
      {activeImage ? (
        <span className="sr-only" aria-live="polite">
          Imagem revelada
        </span>
      ) : null}
    </div>
  );
};
