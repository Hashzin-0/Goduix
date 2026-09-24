import type { CSSProperties } from 'react';
import { ThemeColors } from '../../../../types';

export type BeamSize = 'sm' | 'md' | 'line' | 'pulse-inner' | 'pulse-outside';
export type BeamColorVariant = 'colorful' | 'mono' | 'ocean' | 'sunset';

export interface BeamPalette {
  stops: string[];
  hueShift: boolean;
}

export const BEAM_SIZE_META: Record<
  BeamSize,
  { duration: number; ringWidth: number; label: string }
> = {
  sm: { duration: 1.96, ringWidth: 1, label: 'Compacto' },
  md: { duration: 1.96, ringWidth: 2, label: 'Padrão' },
  line: { duration: 3.1, ringWidth: 2, label: 'Linha inferior' },
  'pulse-inner': { duration: 2.3, ringWidth: 1, label: 'Pulso interno' },
  'pulse-outside': { duration: 2.3, ringWidth: 1, label: 'Pulso externo' },
};

export function resolveBeamPalette(
  variant: BeamColorVariant,
  theme: ThemeColors
): BeamPalette {
  switch (variant) {
    case 'mono':
      return { stops: ['#f4f4f5', '#a1a1aa', '#52525b', '#e4e4e7'], hueShift: false };
    case 'ocean':
      return {
        stops: ['#38bdf8', '#818cf8', '#22d3ee', '#6366f1', '#38bdf8'],
        hueShift: true,
      };
    case 'sunset':
      return {
        stops: ['#fb923c', '#f43f5e', '#fbbf24', '#ef4444', '#fb923c'],
        hueShift: true,
      };
    case 'colorful':
    default:
      return {
        stops: [theme.primary, theme.accent, theme.ring, '#f472b6', theme.primary],
        hueShift: true,
      };
  }
}

export function beamBorderStyle(palette: BeamPalette, strength: number): CSSProperties {
  const s = Math.min(1, Math.max(0, strength));
  return {
    background: `conic-gradient(from 0deg, transparent 0%, ${palette.stops.join(', ')}, transparent 100%)`,
    opacity: 0.35 + s * 0.55,
  };
}

export function pulseBorderStyle(palette: BeamPalette, strength: number, outside: boolean): CSSProperties {
  const s = Math.min(1, Math.max(0, strength));
  const mid = palette.stops[Math.floor(palette.stops.length / 2)] || palette.stops[0];
  if (outside) {
    return {
      background: `radial-gradient(closest-side, transparent 70%, ${mid}${Math.round(s * 80).toString(16).padStart(2, '0')} 100%)`,
      opacity: 0.4 + s * 0.6,
    };
  }
  return {
    boxShadow: `inset 0 0 ${8 + s * 16}px ${mid}${Math.round(s * 60).toString(16).padStart(2, '0')}, 0 0 ${4 + s * 10}px ${mid}${Math.round(s * 40).toString(16).padStart(2, '0')}`,
    opacity: 0.45 + s * 0.55,
  };
}

export function lineBorderStyle(palette: BeamPalette, strength: number): CSSProperties {
  const s = Math.min(1, Math.max(0, strength));
  return {
    background: `linear-gradient(90deg, transparent, ${palette.stops.join(', ')}, transparent)`,
    backgroundSize: '200% 100%',
    opacity: 0.5 + s * 0.5,
  };
}
