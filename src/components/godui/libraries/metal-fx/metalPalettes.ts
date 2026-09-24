import { ThemeColors } from '../../../../types';

export type MetalPreset = 'chromatic' | 'silver' | 'gold' | 'theme';
export type MetalVariant = 'button' | 'circle' | 'text' | 'badge';

export interface MetalPalette {
  conic: string[];
  text: string[];
  specular: string;
  glow: string;
  shadow: string;
}

export const METAL_PRESETS: Record<
  Exclude<MetalPreset, 'theme'>,
  MetalPalette
> = {
  chromatic: {
    conic: [
      '#f8fafc',
      '#c4b5fd',
      '#67e8f9',
      '#fde68a',
      '#fda4af',
      '#a5b4fc',
      '#99f6e4',
      '#f8fafc',
      '#94a3b8',
      '#f8fafc',
    ],
    text: ['#fef3c7', '#f472b6', '#c4b5fd', '#67e8f9', '#a7f3d0', '#fde68a'],
    specular: 'rgba(255,255,255,0.95)',
    glow: 'rgba(168, 85, 247, 0.4)',
    shadow: '#1e1b4b',
  },
  silver: {
    conic: [
      '#ffffff',
      '#e2e8f0',
      '#94a3b8',
      '#f8fafc',
      '#64748b',
      '#cbd5e1',
      '#f1f5f9',
      '#94a3b8',
      '#ffffff',
      '#e2e8f0',
      '#ffffff',
    ],
    text: ['#ffffff', '#cbd5e1', '#64748b', '#f8fafc', '#94a3b8', '#e2e8f0'],
    specular: 'rgba(255,255,255,0.98)',
    glow: 'rgba(226, 232, 240, 0.45)',
    shadow: '#0f172a',
  },
  gold: {
    conic: [
      '#fffbeb',
      '#fde68a',
      '#f59e0b',
      '#fef3c7',
      '#b45309',
      '#fbbf24',
      '#f59e0b',
      '#fff7ed',
      '#d97706',
      '#fde68a',
      '#fffbeb',
    ],
    text: ['#fef3c7', '#f59e0b', '#fde68a', '#b45309', '#fffbeb', '#f59e0b'],
    specular: 'rgba(255, 251, 235, 0.98)',
    glow: 'rgba(245, 158, 11, 0.45)',
    shadow: '#451a03',
  },
};

function themePalette(theme: ThemeColors): MetalPalette {
  return {
    conic: [
      '#f8fafc',
      theme.primary,
      theme.accent,
      '#94a3b8',
      '#f1f5f9',
      theme.primary,
      '#64748b',
      '#e2e8f0',
      theme.accent,
      '#f8fafc',
    ],
    text: [
      '#ffffff',
      theme.primary,
      '#e2e8f0',
      theme.accent,
      '#f8fafc',
      theme.primary,
    ],
    specular: 'rgba(255,255,255,0.96)',
    glow: theme.glow,
    shadow: '#0f172a',
  };
}

export function tintMetalPalette(
  palette: MetalPalette,
  color: string,
  amount = 0.55
): MetalPalette {
  const mixStops = (stops: string[], everyOther: boolean) =>
    stops.map((stop, i) => {
      const hit = everyOther ? i % 2 === 1 : i % 2 === 0;
      if (!hit) return stop;
      if (amount >= 0.99) return color;
      if (amount <= 0.01) return stop;
      return `color-mix(in oklab, ${stop} ${Math.round((1 - amount) * 100)}%, ${color} ${Math.round(amount * 100)}%)`;
    });

  return {
    conic: [color, ...mixStops(palette.conic, true), color],
    text: [color, ...mixStops(palette.text, false), color],
    specular: color === palette.specular ? palette.specular : color,
    glow: color,
    shadow: palette.shadow,
  };
}

export function resolveMetalPalette(
  preset: MetalPreset,
  theme: ThemeColors,
  customColor?: string
): MetalPalette {
  const base =
    preset === 'theme' ? themePalette(theme) : METAL_PRESETS[preset];
  if (customColor && customColor.trim()) {
    return tintMetalPalette(base, customColor.trim());
  }
  return base;
}

export function defaultRadiusForVariant(variant: MetalVariant): number {
  return variant === 'text' ? 0 : 9999;
}

export function resolveBorderRadius(
  variant: MetalVariant,
  explicit?: number,
  measured?: number
): number {
  if (explicit !== undefined && Number.isFinite(explicit)) return explicit;
  if (measured !== undefined && Number.isFinite(measured)) return measured;
  return defaultRadiusForVariant(variant);
}

export function parseCssBorderRadius(value: string | null | undefined):
  | number
  | undefined {
  if (!value) return undefined;
  const first = value.trim().split(/[\s/]+/)[0];
  if (!first) return undefined;
  if (first.endsWith('%')) {
    const pct = Number.parseFloat(first);
    if (!Number.isFinite(pct)) return undefined;
    return pct >= 40 ? 9999 : undefined;
  }
  const px = Number.parseFloat(first);
  return Number.isFinite(px) ? px : undefined;
}

export function metalRingWidth(variant: MetalVariant): number {
  switch (variant) {
    case 'circle':
    case 'badge':
      return 2;
    case 'button':
      return 1;
    case 'text':
    default:
      return 0;
  }
}

export function conicGradient(palette: MetalPalette, fromDeg = 0): string {
  return `conic-gradient(from ${fromDeg}deg, ${palette.conic.join(', ')})`;
}

export function textGradient(palette: MetalPalette): string {
  return `linear-gradient(115deg, ${palette.text.join(', ')})`;
}
