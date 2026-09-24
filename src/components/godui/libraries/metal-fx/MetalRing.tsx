'use client';

import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../../lib/utils';
import {
  MetalPalette,
  MetalVariant,
  conicGradient,
  metalRingWidth,
} from './metalPalettes';

export interface MetalRingProps {
  strength?: number;
  paused?: boolean;
  variant?: MetalVariant;
  palette: MetalPalette;
  borderRadius?: number;
  className?: string;
}

const STYLE_ID = 'godui-metal-fx-keyframes';

const KEYFRAMES = `@keyframes metal-fx-orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes metal-fx-orbit-rev{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
@keyframes metal-fx-sheen{from{background-position:200% 0}to{background-position:-200% 0}}`;

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(1, Math.max(0, n));
}

const RING_MASK = {
  WebkitMask:
    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
} as const;

export const MetalRing: React.FC<MetalRingProps> = ({
  strength = 1,
  paused = false,
  variant = 'button' as MetalVariant,
  palette,
  borderRadius = 9999,
  className,
}) => {
  const reduced = useReducedMotion() ?? false;
  const s = clamp01(strength);
  const ringW = metalRingWidth(variant as MetalVariant);
  const orbiting = s > 0 && !reduced;
  const playState = paused ? 'paused' : 'running';
  const radius = `${borderRadius}px`;

  React.useEffect(() => {
    ensureKeyframes();
  }, []);

  if (s <= 0) return null;

  const orbitStyle: React.CSSProperties = {
    animation: orbiting ? 'metal-fx-orbit 3.6s linear infinite' : undefined,
    animationPlayState: orbiting ? playState : undefined,
  };

  const orbitRevStyle: React.CSSProperties = {
    animation: orbiting ? 'metal-fx-orbit-rev 7.2s linear infinite' : undefined,
    animationPlayState: orbiting ? playState : undefined,
  };

  const sheenAnimation = orbiting
    ? 'metal-fx-sheen 4.8s ease-in-out infinite'
    : undefined;

  if (variant === 'text') {
    return (
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 z-10', className)}
        style={{ borderRadius: radius }}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: radius,
            background: `radial-gradient(ellipse 70% 90% at 50% 50%, ${palette.specular}18, transparent 70%)`,
            opacity: 0.55 * s,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            borderRadius: radius,
            background: `radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), ${palette.specular}55, transparent 68%)`,
            mixBlendMode: 'screen',
            opacity: 0.85 * s,
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 z-10', className)}
      style={{ borderRadius: radius }}
    >
      <div
        className="absolute -inset-px"
        style={{
          borderRadius: `${borderRadius + 3}px`,
          boxShadow: `0 0 ${14 * s}px ${palette.glow}, 0 0 ${4 * s}px ${palette.shadow}55`,
          opacity: 0.55 * s,
        }}
      />

      {ringW > 0 && (
        <>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: radius,
              padding: `${ringW}px`,
              ...RING_MASK,
            }}
          >
            <div
              className="absolute"
              style={{
                inset: '-120%',
                background: conicGradient(palette, 0),
                opacity: 0.5 + 0.5 * s,
              }}
            />
            <div
              className="absolute"
              style={{
                inset: '-120%',
                background: `conic-gradient(from 0deg, transparent 0deg, ${palette.specular} 28deg, transparent 75deg, transparent 165deg, rgba(255,255,255,0.55) 205deg, transparent 255deg)`,
                opacity: 0.75 * s,
                ...orbitStyle,
              }}
            />
            <div
              className="absolute"
              style={{
                inset: '-120%',
                background: `conic-gradient(from 40deg, transparent 0deg, ${palette.glow} 18deg, transparent 55deg, transparent 220deg, ${palette.specular}88 248deg, transparent 290deg)`,
                opacity: 0.5 * s,
                mixBlendMode: 'screen',
                ...orbitRevStyle,
              }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              borderRadius: radius,
              padding: `${ringW}px`,
              background: `linear-gradient(120deg, transparent 30%, ${palette.specular} 50%, transparent 70%)`,
              backgroundSize: '200% 100%',
              animation: sheenAnimation,
              animationPlayState: orbiting ? playState : undefined,
              opacity: 0.35 * s,
              ...RING_MASK,
            }}
          />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          background: `radial-gradient(170px circle at var(--mx, 50%) var(--my, 50%), ${palette.specular}66, transparent 70%)`,
          mixBlendMode: 'screen',
          opacity: 0.9 * s,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          padding: `${Math.max(ringW, 1)}px`,
          background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), ${palette.specular}bb, transparent 62%)`,
          opacity: 0.75 * s,
          ...RING_MASK,
        }}
      />
    </div>
  );
};

MetalRing.displayName = 'MetalRing';
