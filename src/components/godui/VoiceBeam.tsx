'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import { fusionColor } from './fusion';
import {
  ensureVoiceKeyframes,
  getVoiceBloomStyle,
  getVoiceInnerStyle,
  getVoiceStrokeStyle,
  getVoiceSweepStyle,
  resolveVoicePalette,
  type VoiceColorVariant,
} from './libraries/voice-glow/voiceStyles';
import { useVoiceLevel } from './libraries/voice-glow/useVoiceLevel';

export interface VoiceBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Required GodUI theme — drives the 7-lobe palette (primary/accent/glow). */
  theme: ThemeColors;
  children?: React.ReactNode;
  /** Manual 0–1 drive (number or per-frame getter). Ignored while `stream` is live. */
  level?: number | (() => number);
  /** Optional mic / remote audio for AnalyserNode RMS → level. */
  stream?: MediaStream | null;
  /** Fade the beam layers on/off. @default true */
  active?: boolean;
  /** Hold the glow lit + travel a light sweep along the bottom edge. */
  processing?: boolean;
  /** Layer opacity 0–1. @default 1 */
  strength?: number;
  /** Resting breath while silent 0–1. @default 0.23 */
  idle?: number;
  /** Center hump height in px at full level. @default 60 */
  bend?: number;
  /** Analyser input gain. @default 3.1 */
  sensitivity?: number;
  /** `auto` = theme palette; `mono` = grayscale. @default 'auto' */
  colorVariant?: VoiceColorVariant;
  fusions?: ComponentFusion[];
  className?: string;
}

const FUSION_SLOTS = new Set(['border', 'background', 'before-glow']);

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof matchMedia === 'undefined') return;
    const mql = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export const VoiceBeam: React.FC<VoiceBeamProps> = ({
  theme,
  children,
  level,
  stream = null,
  active = true,
  processing = false,
  strength = 1,
  idle = 0.23,
  bend = 60,
  sensitivity = 3.1,
  colorVariant = 'auto',
  fusions,
  className,
  style,
  ...rest
}) => {
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    ensureVoiceKeyframes();
  }, []);

  // Active `voice-beam` fusion on border/background/before-glow → boost + tint.
  const fusion = React.useMemo(() => {
    const list = fusions ?? [];
    return (
      list.find(
        (f) =>
          f.active &&
          f.sourceEffect === 'voice-beam' &&
          FUSION_SLOTS.has(f.targetSlot)
      ) ?? null
    );
  }, [fusions]);

  const fusionTint = fusion ? fusionColor(fusion, theme) : null;
  const fusionIntensity = fusion
    ? Math.min(1, Math.max(0.1, fusion.intensity ?? 0.8))
    : 0;
  const customColor = fusion?.customColor || fusionTint;

  const effStrength = clampStrength(
    strength * (fusion ? 1 + fusionIntensity * 0.45 : 1)
  );

  const rawLevel = useVoiceLevel({
    level,
    stream: active ? stream : null,
    idle: active ? idle : 0,
    sensitivity,
    active,
    reducedMotion,
  });

  // Processing holds the glow lit so the sweep has colour to ride.
  const displayLevel = active
    ? processing
      ? Math.max(rawLevel, 0.55)
      : rawLevel
    : 0;

  const params = {
    level: displayLevel,
    bend,
    strength: active ? effStrength : 0,
    palette: resolveVoicePalette(
      theme,
      colorVariant as VoiceColorVariant,
      customColor
    ),
  };

  const strokeStyle = getVoiceStrokeStyle(params);
  const innerStyle = getVoiceInnerStyle(params);
  const bloomStyle = getVoiceBloomStyle(params);
  const sweepStyle = getVoiceSweepStyle(params);

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl', className)}
      style={{
        ...style,
        ['--vb-level' as string]: displayLevel.toFixed(3),
      }}
      data-listening={stream && active ? '' : undefined}
      data-processing={processing ? '' : undefined}
      data-fusion={fusion ? fusion.sourceEffect : undefined}
      {...rest}
    >
      {/* z-0 — edge stroke + inner glow (clipped to rounded wrapper) */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-0 rounded-[inherit]',
          'transition-opacity duration-500'
        )}
        style={strokeStyle}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-0 rounded-[inherit]',
          'transition-opacity duration-500'
        )}
        style={innerStyle}
      />

      {/* processing sweep along the bottom edge */}
      {active && processing && !reducedMotion && (
        <div
          aria-hidden
          className="voice-glow-processing-sweep pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden rounded-b-[inherit]"
          style={sweepStyle}
        />
      )}

      {/* z-10 — content */}
      <div className="relative z-10">{children}</div>

      {/* z-20 — blurred bloom above content */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-20 rounded-[inherit]',
          'mix-blend-screen transition-opacity duration-500'
        )}
        style={bloomStyle}
      />
    </div>
  );
};

function clampStrength(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(1, Math.max(0, n));
}
