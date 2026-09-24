// Pure style/palette helpers for the bottom voice-glow beam.
// Adapted from Libraries.dev voice-glow (MIT © Jakub Antalik) for GodUI themes.
import type { CSSProperties } from 'react';
import type { ThemeColors } from '../../../../types';

export type VoiceColorVariant = 'auto' | 'mono';

export interface VoiceStyleParams {
  /** Smoothed 0–1 drive level. */
  level: number;
  /** Center hump height in px at full level. */
  bend: number;
  /** Layer opacity multiplier 0–1. */
  strength: number;
  /** 7-lobe palette, visual left→right (hot center at index 3). */
  palette: string[];
}

export const VOICE_LOBE_COUNT = 7;
export const VOICE_CENTER_INDEX = (VOICE_LOBE_COUNT - 1) / 2;

export function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

/** Soft knee: quiet input stays quiet, loud input approaches 1. */
export function saturateVoice(n: number): number {
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  // 1 - e^{-x} keeps the low end nearly linear
  return 1 - Math.exp(-n * 1.35);
}

function parseColor(color: string): [number, number, number, number] {
  const c = color.trim();
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
      return [r, g, b, a];
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return [r, g, b, a];
    }
  }
  const rgba = c.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/i
  );
  if (rgba) {
    const aRaw = rgba[4];
    let a = 1;
    if (aRaw !== undefined) {
      a = aRaw.endsWith('%') ? parseFloat(aRaw) / 100 : parseFloat(aRaw);
    }
    return [
      Math.round(Number(rgba[1])),
      Math.round(Number(rgba[2])),
      Math.round(Number(rgba[3])),
      Number.isFinite(a) ? a : 1,
    ];
  }
  return [128, 128, 128, 1];
}

function toHex(r: number, g: number, b: number): string {
  const clamp = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${clamp(r)}${clamp(g)}${clamp(b)}`;
}

export function withAlpha(color: string, alpha: number): string {
  const [r, g, b] = parseColor(color);
  const a = clamp01(alpha);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = parseColor(a);
  const [br, bg, bb] = parseColor(b);
  const k = clamp01(t);
  return toHex(ar + (br - ar) * k, ag + (bg - ag) * k, ab + (bb - ab) * k);
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const hh = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh < 60) [r, g, b] = [c, x, 0];
  else if (hh < 120) [r, g, b] = [x, c, 0];
  else if (hh < 180) [r, g, b] = [0, c, x];
  else if (hh < 240) [r, g, b] = [0, x, c];
  else if (hh < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return toHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

function shiftHue(color: string, deg: number): string {
  const [r, g, b] = parseColor(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  return hslToHex(h + deg, s, l);
}

function solid(color: string): string {
  const [r, g, b] = parseColor(color);
  return toHex(r, g, b);
}

/**
 * 7 lobes, visual left→right, hot center at index 3.
 * `auto` derives pairs from theme primary/accent/glow; `mono` is grayscale.
 * `customColor` (fusion) becomes the hot center when provided.
 */
export function resolveVoicePalette(
  theme: ThemeColors,
  colorVariant: VoiceColorVariant = 'auto',
  customColor?: string | null
): string[] {
  if (colorVariant === 'mono') {
    return ['#71717a', '#a1a1aa', '#d4d4d8', '#fafafa', '#d4d4d8', '#a1a1aa', '#71717a'];
  }

  const primary = customColor || theme.primary;
  const accent = theme.accent;
  const glow = solid(theme.glow);

  const center = mixHex(primary, '#ffffff', 0.42);
  const innerL = mixHex(accent, primary, 0.2);
  const innerR = mixHex(primary, accent, 0.35);
  const midL = mixHex(glow, accent, 0.35);
  const midR = mixHex(primary, glow, 0.45);
  const outerL = shiftHue(accent, -38);
  const outerR = shiftHue(mixHex(primary, accent, 0.5), 42);

  // left→right: outerL, midL, innerL, center, innerR, midR, outerR
  return [outerL, midL, innerL, center, innerR, midR, outerR];
}

function paletteStops(palette: string[], alpha: number): string {
  const n = Math.max(1, palette.length - 1);
  return palette
    .map((c, i) => `${withAlpha(c, alpha)} ${((i / n) * 100).toFixed(1)}%`)
    .join(', ');
}

interface LobeGeometry {
  x: number;
  /** Horizontal radius as % of wrapper width. */
  rx: number;
  /** Vertical radius in px from the bottom edge. */
  ry: number;
  alpha: number;
}

function lobeGeometry(level: number, bend: number, index: number): LobeGeometry {
  const t = index - VOICE_CENTER_INDEX; // -3..3
  const abs = Math.abs(t);
  const reach = 48 + level * 96;
  const hump = Math.max(0, bend) * level;
  // Center rises most; side lobes fall off toward the edges.
  const humpWeight = abs === 0 ? 1 : Math.max(0, 1 - abs / VOICE_CENTER_INDEX) * 0.55;
  const x = 50 + t * (11 + level * 5);
  const rx = 16 + level * 10 - abs * 1.2;
  const ry = reach + hump * humpWeight;
  const alpha =
    (0.35 + 0.65 * level) * (abs === 0 ? 1 : Math.max(0.35, 0.85 - abs * 0.14));
  return { x, rx: Math.max(6, rx), ry: Math.max(16, ry), alpha };
}

/** 1px bottom edge stroke — palette painted into the rounded bottom ring. */
export function getVoiceStrokeStyle(params: VoiceStyleParams): CSSProperties {
  const level = clamp01(params.level);
  const strength = clamp01(params.strength);
  const opacity = strength * (0.4 + 0.6 * level);
  return {
    background: `linear-gradient(90deg, ${paletteStops(params.palette, 0.95)})`,
    // Show only the bottom edge of the (rounded) layer so it follows border-radius.
    WebkitMaskImage:
      'linear-gradient(to top, #000 0px, #000 1.5px, transparent 1.5px)',
    maskImage: 'linear-gradient(to top, #000 0px, #000 1.5px, transparent 1.5px)',
    opacity,
  };
}

/** Soft inner lobes + center hump inside the element (z-0 under content). */
export function getVoiceInnerStyle(params: VoiceStyleParams): CSSProperties {
  const level = clamp01(params.level);
  const strength = clamp01(params.strength);
  const { palette, bend } = params;

  const lobes = palette
    .map((color, i) => {
      const g = lobeGeometry(level, bend, i);
      const a = g.alpha * strength * 0.72;
      return `radial-gradient(${g.rx.toFixed(1)}% ${g.ry.toFixed(0)}px at ${g.x.toFixed(1)}% 100%, ${withAlpha(color, a)} 0%, ${withAlpha(color, a * 0.35)} 42%, transparent 72%)`;
    })
    .join(', ');

  const center = palette[VOICE_CENTER_INDEX] ?? palette[0] ?? '#fff';
  const hump = Math.max(0, bend) * level;
  const dome =
    hump > 0.5
      ? `radial-gradient(ellipse 42% ${(hump + 36).toFixed(0)}px at 50% 100%, ${withAlpha(center, 0.45 * level * strength)} 0%, transparent 68%),`
      : '';

  return {
    background: `${dome}${lobes}`,
    opacity: 0.55 + 0.45 * level,
  };
}

/** Blurred bloom above content (z-20, mix-blend-screen). */
export function getVoiceBloomStyle(params: VoiceStyleParams): CSSProperties {
  const level = clamp01(params.level);
  const strength = clamp01(params.strength);
  const { palette, bend } = params;

  const lobes = palette
    .map((color, i) => {
      const g = lobeGeometry(level, bend, i);
      const a = g.alpha * strength * 0.55;
      const rx = (g.rx * 1.15).toFixed(1);
      const ry = (g.ry * 1.25).toFixed(0);
      return `radial-gradient(${rx}% ${ry}px at ${g.x.toFixed(1)}% 100%, ${withAlpha(color, a)} 0%, ${withAlpha(color, a * 0.3)} 45%, transparent 75%)`;
    })
    .join(', ');

  return {
    background: lobes,
    filter: `blur(${(14 + level * 22).toFixed(0)}px)`,
    opacity: strength * (0.45 + 0.55 * level),
  };
}

/** Horizontal light sweep along the bottom edge while `processing`. */
export function getVoiceSweepStyle(params: VoiceStyleParams): CSSProperties {
  const level = clamp01(Math.max(params.level, 0.55));
  const strength = clamp01(params.strength);
  const center =
    params.palette[VOICE_CENTER_INDEX] ?? params.palette[0] ?? '#ffffff';
  return {
    height: 2,
    background: `linear-gradient(90deg, transparent 0%, ${withAlpha(center, 0.15)} 35%, ${withAlpha(center, 0.95)} 50%, ${withAlpha(center, 0.15)} 65%, transparent 100%)`,
    backgroundSize: '220% 100%',
    backgroundRepeat: 'no-repeat',
    animation: 'voice-glow-sweep 1.35s cubic-bezier(0.45, 0, 0.55, 1) infinite',
    opacity: strength * (0.7 + 0.3 * level),
    pointerEvents: 'none',
  } as CSSProperties;
}

let keyframesReady = false;

/** Inject shared sweep keyframes once (idempotent, browser-only). */
export function ensureVoiceKeyframes(): void {
  if (keyframesReady || typeof document === 'undefined') return;
  if (document.getElementById('voice-glow-keyframes')) {
    keyframesReady = true;
    return;
  }
  const el = document.createElement('style');
  el.id = 'voice-glow-keyframes';
  el.textContent = `
@keyframes voice-glow-sweep {
  0% { background-position: 220% 0; }
  100% { background-position: -120% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .voice-glow-processing-sweep { animation: none !important; }
}`;
  document.head.appendChild(el);
  keyframesReady = true;
}

/** Optional canvas helper: bottom-centered lobes on a 2D context. */
export function drawVoiceGlow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  params: VoiceStyleParams
): void {
  const level = clamp01(params.level);
  const strength = clamp01(params.strength);
  if (width <= 0 || height <= 0) return;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  params.palette.forEach((color, i) => {
    const g = lobeGeometry(level, params.bend, i);
    const cx = (g.x / 100) * width;
    const rx = (g.rx / 100) * width;
    const ry = Math.min(g.ry, height * 1.5);
    const a = g.alpha * strength * 0.65;
    const [r, ch, b] = parseColor(color);

    const grad = ctx.createRadialGradient(cx, height, 0, cx, height, Math.max(rx, ry));
    grad.addColorStop(0, `rgba(${r}, ${ch}, ${b}, ${a})`);
    grad.addColorStop(0.45, `rgba(${r}, ${ch}, ${b}, ${a * 0.3})`);
    grad.addColorStop(1, `rgba(${r}, ${ch}, ${b}, 0)`);

    ctx.save();
    ctx.translate(cx, height);
    ctx.scale(1, ry / Math.max(rx, 1));
    ctx.translate(-cx, -height);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, height, Math.max(rx, ry), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.restore();
}
