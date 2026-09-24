'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import {
  BEAM_SIZE_META,
  beamBorderStyle,
  lineBorderStyle,
  pulseBorderStyle,
  resolveBeamPalette,
  type BeamColorVariant,
  type BeamSize,
} from './libraries/border-beam/beamStyles';

export type BorderBeamProps = {
  duration?: number;
  borderWidth?: number;
  /** Libraries.dev size preset (rotate family + pulse family). */
  size?: BeamSize;
  colorVariant?: BeamColorVariant;
  /** Effect opacity 0–1 (beam layers only). */
  strength?: number;
  active?: boolean;
  theme: ThemeColors;
  className?: string;
  children?: React.ReactNode;
  fusions?: ComponentFusion[];
};

const STYLE_ID = 'godui-border-beam-keyframes';
const KEYFRAMES = `
@keyframes border-beam-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes border-beam-breathe{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes border-beam-line{0%{background-position:200% 0}100%{background-position:-200% 0}}
`;

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  duration,
  borderWidth = 2,
  size = 'md',
  colorVariant = 'colorful' as BeamColorVariant,
  strength = 1,
  active = true,
  theme,
  className,
  children,
  fusions,
}) => {
  React.useEffect(ensureKeyframes, []);

  const reduced = React.useMemo(() => {
    if (typeof matchMedia === 'undefined') return false;
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const meta = BEAM_SIZE_META[size] ?? BEAM_SIZE_META.md;
  const cycle = duration ?? meta.duration;
  const palette = resolveBeamPalette(colorVariant as BeamColorVariant, theme);

  const beamFusion = React.useMemo(
    () =>
      (fusions ?? []).find(
        (f) =>
          f.active &&
          (f.sourceEffect === 'beam-pulse' || f.sourceEffect === 'shimmer-beam') &&
          (f.targetSlot === 'border' ||
            f.targetSlot === 'after-shine' ||
            f.targetSlot === 'before-glow')
      ) ?? null,
    [fusions]
  );

  const effStrength = beamFusion
    ? Math.max(strength, 0.4 + 0.6 * (beamFusion.intensity ?? 0.85))
    : strength;
  const isPulse = size === 'pulse-inner' || size === 'pulse-outside';
  const isLine = size === 'line';

  const layerStyle: React.CSSProperties = isPulse
    ? pulseBorderStyle(palette, effStrength, size === 'pulse-outside')
    : isLine
      ? lineBorderStyle(palette, effStrength)
      : beamBorderStyle(palette, effStrength);

  const anim = !active || reduced
    ? undefined
    : isPulse
      ? `border-beam-breathe ${cycle}s ease-in-out infinite`
      : isLine
        ? `border-beam-line ${cycle}s linear infinite`
        : `border-beam-rotate ${cycle}s linear infinite`;

  return (
    <div
      className={cn(
        'relative inline-flex',
        size === 'pulse-outside' && 'overflow-visible',
        className
      )}
      data-beam-size={size}
      data-beam-active={active ? '1' : '0'}
    >
      {/* Outer rotating / breathing ring */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -inset-[3px] rounded-[inherit] z-0',
          size === 'line' && 'inset-x-0 -bottom-[3px] -top-auto h-[3px] rounded-full',
          size === 'pulse-outside' && '-inset-2 rounded-[inherit]'
        )}
        style={{
          ...layerStyle,
          animation: anim,
          animationPlayState: active && !reduced ? 'running' : 'paused',
          borderWidth,
          padding: isPulse && size !== 'pulse-outside' ? 0 : undefined,
        }}
      />
      {/* Hairline ring ride */}
      {size !== 'pulse-outside' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 z-10"
          style={{ opacity: 0.6 + effStrength * 0.4 }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
};
