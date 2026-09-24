import { DesignToken, TokenCategory } from '../types/composition';

// ============================================================
// DEFAULT DESIGN TOKENS
// ============================================================

export const DEFAULT_TOKENS: DesignToken[] = [
  { key: 'radius', value: 12, unit: 'px', category: 'radius', label: 'Border Radius', labelPt: 'Raio da Borda' },
  { key: 'radius-lg', value: 20, unit: 'px', category: 'radius', label: 'Large Radius', labelPt: 'Raio Grande' },
  { key: 'radius-sm', value: 6, unit: 'px', category: 'radius', label: 'Small Radius', labelPt: 'Raio Pequeno' },
  { key: 'duration', value: 300, unit: 'ms', category: 'duration', label: 'Duration', labelPt: 'Duração' },
  { key: 'duration-fast', value: 150, unit: 'ms', category: 'duration', label: 'Fast Duration', labelPt: 'Duração Rápida' },
  { key: 'duration-slow', value: 500, unit: 'ms', category: 'duration', label: 'Slow Duration', labelPt: 'Duração Lenta' },
  { key: 'easing', value: 'cubic-bezier(0.4, 0, 0.2, 1)', category: 'easing', label: 'Easing', labelPt: 'Curva de Aceleração' },
  { key: 'easing-bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', category: 'easing', label: 'Bounce Easing', labelPt: 'Curva Elástica' },
  { key: 'easing-smooth', value: 'cubic-bezier(0.25, 0.1, 0.25, 1)', category: 'easing', label: 'Smooth Easing', labelPt: 'Curva Suave' },
  { key: 'primary-color', value: '#00f5ff', category: 'color', label: 'Primary Color', labelPt: 'Cor Primária' },
  { key: 'accent-color', value: '#8b5cf6', category: 'color', label: 'Accent Color', labelPt: 'Cor de Destaque' },
  { key: 'bg-color', value: '#0a0a0f', category: 'color', label: 'Background Color', labelPt: 'Cor de Fundo' },
  { key: 'text-color', value: '#ffffff', category: 'color', label: 'Text Color', labelPt: 'Cor do Texto' },
  { key: 'border-color', value: 'rgba(255, 255, 255, 0.1)', category: 'border', label: 'Border Color', labelPt: 'Cor da Borda' },
  { key: 'border-width', value: 1, unit: 'px', category: 'border', label: 'Border Width', labelPt: 'Espessura da Borda' },
  { key: 'shadow-color', value: 'rgba(0, 0, 0, 0.3)', category: 'shadow', label: 'Shadow Color', labelPt: 'Cor da Sombra' },
  { key: 'shadow-blur', value: 20, unit: 'px', category: 'shadow', label: 'Shadow Blur', labelPt: 'Desfoque da Sombra' },
  { key: 'shadow-spread', value: 0, unit: 'px', category: 'shadow', label: 'Shadow Spread', labelPt: 'Expansão da Sombra' },
  { key: 'glow-color', value: '#00f5ff', category: 'color', label: 'Glow Color', labelPt: 'Cor do Brilho' },
  { key: 'glow-intensity', value: 0.6, category: 'spacing', label: 'Glow Intensity', labelPt: 'Intensidade do Brilho' },
  { key: 'padding', value: 16, unit: 'px', category: 'spacing', label: 'Padding', labelPt: 'Espaçamento Interno' },
  { key: 'padding-lg', value: 24, unit: 'px', category: 'spacing', label: 'Large Padding', labelPt: 'Espaçamento Grande' },
  { key: 'padding-sm', value: 8, unit: 'px', category: 'spacing', label: 'Small Padding', labelPt: 'Espaçamento Pequeno' },
  { key: 'gap', value: 8, unit: 'px', category: 'spacing', label: 'Gap', labelPt: 'Espaçamento' },
  { key: 'font-size', value: 14, unit: 'px', category: 'typography', label: 'Font Size', labelPt: 'Tamanho da Fonte' },
  { key: 'font-size-lg', value: 18, unit: 'px', category: 'typography', label: 'Large Font Size', labelPt: 'Tamanho Grande da Fonte' },
  { key: 'font-size-sm', value: 12, unit: 'px', category: 'typography', label: 'Small Font Size', labelPt: 'Tamanho Pequeno da Fonte' },
  { key: 'line-height', value: 1.5, category: 'typography', label: 'Line Height', labelPt: 'Altura da Linha' },
];

// ============================================================
// TOKEN UTILITIES
// ============================================================

export function getTokenValue(
  tokens: DesignToken[],
  key: string,
  fallback?: any
): any {
  const token = tokens.find(t => t.key === key);
  if (token) return token.value;
  const defaultToken = DEFAULT_TOKENS.find(t => t.key === key);
  if (defaultToken) return defaultToken.value;
  return fallback;
}

export function getTokenWithUnit(
  tokens: DesignToken[],
  key: string,
  fallback?: any
): string {
  const token = tokens.find(t => t.key === key);
  const value = token?.value ?? fallback;
  const unit = token?.unit;
  if (unit && typeof value === 'number') return `${value}${unit}`;
  return String(value);
}

export function getRadius(tokens: DesignToken[], size: 'sm' | 'md' | 'lg' = 'md'): string {
  const key = size === 'sm' ? 'radius-sm' : size === 'lg' ? 'radius-lg' : 'radius';
  return getTokenWithUnit(tokens, key, '12px');
}

export function getDuration(tokens: DesignToken[], speed: 'fast' | 'normal' | 'slow' = 'normal'): string {
  const key = speed === 'fast' ? 'duration-fast' : speed === 'slow' ? 'duration-slow' : 'duration';
  return getTokenWithUnit(tokens, key, '300ms');
}

export function getEasing(tokens: DesignToken[], type: 'default' | 'bounce' | 'smooth' = 'default'): string {
  const key = type === 'bounce' ? 'easing-bounce' : type === 'smooth' ? 'easing-smooth' : 'easing';
  return getTokenValue(tokens, key, 'cubic-bezier(0.4, 0, 0.2, 1)') as string;
}

export function buildTokenOverrides(
  overrides: Partial<Record<string, any>>
): DesignToken[] {
  return Object.entries(overrides).map(([key, value]) => {
    const existing = DEFAULT_TOKENS.find(t => t.key === key);
    return {
      key,
      value,
      unit: existing?.unit,
      category: existing?.category || 'spacing',
      label: existing?.label || key,
      labelPt: existing?.labelPt || key,
    };
  });
}
