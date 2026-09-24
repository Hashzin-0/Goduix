import type { ThemeColors } from '../../../../types';

export type ImageFxPreset = 'pixels-organic' | 'pixels-mechanic' | 'sweep-gradient';

export type ImageFxPhase = 'idle' | 'reveal' | 'visible' | 'hide';

export interface ColorRgb {
  r: number;
  g: number;
  b: number;
}

export const BASE_CELL_PX = 12;
export const MOSAIC_ALPHA = 0.95;

export function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

export function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function valueNoise(x: number, y: number, t: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smoothstep(x - xi);
  const yf = smoothstep(y - yi);
  const offset = t * 0.37;
  const a = hash2(xi + offset, yi);
  const b = hash2(xi + 1 + offset, yi);
  const c = hash2(xi + offset, yi + 1);
  const d = hash2(xi + 1 + offset, yi + 1);
  const top = a + (b - a) * xf;
  const bottom = c + (d - c) * xf;
  return top + (bottom - top) * yf;
}

function clampChannel(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : n > 255 ? 255 : Math.round(n);
}

export function parseColor(color: string): ColorRgb | null {
  if (!color) return null;
  const value = color.trim();

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      if ([r, g, b].every((n) => Number.isFinite(n))) return { r, g, b };
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if ([r, g, b].every((n) => Number.isFinite(n))) return { r, g, b };
    }
    return null;
  }

  const rgba = value.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (rgba) {
    return {
      r: clampChannel(Number(rgba[1])),
      g: clampChannel(Number(rgba[2])),
      b: clampChannel(Number(rgba[3])),
    };
  }

  return null;
}

export function toCss(rgb: ColorRgb, alpha = 1): string {
  const a = clamp01(alpha);
  if (a >= 1) return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Number(a.toFixed(3))})`;
}

export function mixColors(a: ColorRgb, b: ColorRgb, t: number): ColorRgb {
  const k = clamp01(t);
  return {
    r: Math.round(a.r + (b.r - a.r) * k),
    g: Math.round(a.g + (b.g - a.g) * k),
    b: Math.round(a.b + (b.b - a.b) * k),
  };
}

export function shadeColor(color: ColorRgb, amount: number): ColorRgb {
  if (amount >= 0) {
    return {
      r: Math.round(color.r + (255 - color.r) * amount),
      g: Math.round(color.g + (255 - color.g) * amount),
      b: Math.round(color.b + (255 - color.b) * amount),
    };
  }
  const k = 1 + amount;
  return {
    r: Math.round(color.r * k),
    g: Math.round(color.g * k),
    b: Math.round(color.b * k),
  };
}

function ensureRgb(color: string | null | undefined, fallback: ColorRgb): ColorRgb {
  if (!color) return fallback;
  return parseColor(color) ?? fallback;
}

/**
 * Theme-adaptive preset palettes. Optional fusion `tint` re-colors every slot
 * around the tint (or falls through to theme colors when null).
 */
export function getPresetPalette(
  preset: ImageFxPreset,
  theme: ThemeColors,
  tint?: string | null
): string[] {
  const primary = ensureRgb(theme.primary, { r: 6, g: 182, b: 212 });
  const accent = ensureRgb(theme.accent, { r: 56, g: 189, b: 248 });
  const glow = ensureRgb(theme.glow, primary);

  if (tint) {
    const base = parseColor(tint) ?? primary;
    if (preset === 'pixels-mechanic') {
      return [
        toCss(base),
        toCss(mixColors(base, { r: 249, g: 115, b: 22 }, 0.45)),
        toCss(mixColors(base, { r: 239, g: 68, b: 68 }, 0.4)),
        toCss(shadeColor(base, -0.45)),
        toCss(shadeColor(base, 0.35)),
        toCss(mixColors(base, { r: 20, g: 10, b: 8 }, 0.55)),
      ];
    }
    if (preset === 'sweep-gradient') {
      return [
        toCss(shadeColor(base, -0.5)),
        toCss(base),
        toCss(mixColors(base, accent, 0.5)),
        toCss(shadeColor(base, 0.35)),
        toCss(mixColors(base, glow, 0.65)),
        toCss(shadeColor(base, 0.55)),
      ];
    }
    return [
      toCss(base),
      toCss(mixColors(base, { r: 13, g: 148, b: 136 }, 0.4)),
      toCss(mixColors(base, { r: 52, g: 211, b: 153 }, 0.35)),
      toCss(mixColors(base, accent, 0.45)),
      toCss(shadeColor(base, -0.4)),
      toCss(shadeColor(base, 0.3)),
    ];
  }

  if (preset === 'pixels-mechanic') {
    return [
      toCss(primary),
      toCss(accent),
      toCss(mixColors(primary, { r: 249, g: 115, b: 22 }, 0.5)),
      toCss(mixColors(accent, { r: 239, g: 68, b: 68 }, 0.45)),
      toCss(shadeColor(primary, -0.55)),
      toCss(shadeColor(accent, 0.25)),
      toCss(mixColors(primary, { r: 127, g: 29, b: 29 }, 0.5)),
    ];
  }

  if (preset === 'sweep-gradient') {
    return [
      toCss(shadeColor(primary, -0.55)),
      toCss(mixColors(primary, accent, 0.35)),
      toCss(primary),
      toCss(accent),
      toCss(mixColors(accent, glow, 0.6)),
      toCss(shadeColor(accent, 0.4)),
      toCss(shadeColor(accent, 0.65)),
    ];
  }

  return [
    toCss(primary),
    toCss(mixColors(primary, { r: 13, g: 148, b: 136 }, 0.45)),
    toCss(mixColors(glow, { r: 16, g: 185, b: 129 }, 0.4)),
    toCss(accent),
    toCss(mixColors(accent, { r: 163, g: 230, b: 53 }, 0.25)),
    toCss(shadeColor(primary, -0.45)),
    toCss(shadeColor(accent, 0.3)),
  ];
}

/** Theme gradient stops — `theme.gradient` is Tailwind class names, not CSS. */
export function getThemeGradientStops(theme: ThemeColors): [ColorRgb, ColorRgb, ColorRgb] {
  const primary = ensureRgb(theme.primary, { r: 6, g: 182, b: 212 });
  const accent = ensureRgb(theme.accent, primary);
  const glow = ensureRgb(theme.glow, accent);
  return [
    shadeColor(primary, -0.55),
    mixColors(primary, accent, 0.5),
    shadeColor(accent, 0.15),
  ];
}

export interface GridSpec {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
}

export function computeGrid(width: number, height: number, pixelScale: number): GridSpec {
  const scale = Number.isFinite(pixelScale) && pixelScale > 0 ? pixelScale : 1;
  const cell = Math.max(4, BASE_CELL_PX * scale);
  const cols = Math.max(1, Math.ceil(width / cell));
  const rows = Math.max(1, Math.ceil(height / cell));
  return {
    cols,
    rows,
    cellW: width / cols,
    cellH: height / rows,
  };
}

/**
 * Per-cell dissolve amount (0..1) driven by reveal progress.
 * Sweep uses a traveling diagonal band; pixel presets use stable noise + flow.
 */
export function cellRevealAmount(
  col: number,
  row: number,
  grid: GridSpec,
  progress: number,
  preset: ImageFxPreset,
  time: number,
  reducedMotion: boolean
): number {
  const p = clamp01(progress);
  if (p <= 0) return 0;
  if (p >= 1) return 1;

  const { cols, rows } = grid;
  let threshold: number;

  if (preset === 'sweep-gradient') {
    const maxDiag = Math.max(1, cols + rows - 2);
    const diag = (col + row) / maxDiag;
    const jitter = reducedMotion ? 0 : hash2(col * 3.1, row * 7.7) * 0.12;
    threshold = clamp01(diag * 0.88 + hash2(col, row) * 0.08 + jitter);
  } else if (preset === 'pixels-mechanic') {
    const base = hash2(col * 1.7 + 11, row * 2.3 + 7);
    const noise = reducedMotion
      ? 0
      : (hash2(col + Math.floor(time * 9), row + Math.floor(time * 5)) - 0.5) * 0.18;
    threshold = clamp01(base * 0.92 + noise);
  } else {
    const flow = reducedMotion
      ? 0
      : (valueNoise(col * 0.35, row * 0.35, time * 0.6) - 0.5) * 0.25;
    threshold = clamp01(hash2(col, row) * 0.82 + 0.09 + flow);
  }

  const edge = preset === 'pixels-mechanic' ? 0.06 : 0.14;
  return clamp01((p - threshold) / edge);
}

function drawThemeWash(
  ctx: CanvasRenderingContext2D,
  theme: ThemeColors,
  width: number,
  height: number
): void {
  const [c0, c1, c2] = getThemeGradientStops(theme);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, toCss(c0));
  gradient.addColorStop(0.5, toCss(c1));
  gradient.addColorStop(1, toCss(c2));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function mosaicCellFill(
  col: number,
  row: number,
  grid: GridSpec,
  preset: ImageFxPreset,
  palette: string[],
  time: number,
  reducedMotion: boolean,
  intensity: number
): { color: string; alpha: number } {
  const { cols, rows } = grid;
  const flickerBoost = 1 + clamp01(intensity) * 0.9;
  let colorIdx: number;
  let alphaScale = 1;

  if (reducedMotion) {
    colorIdx = Math.floor(hash2(col, row) * palette.length) % palette.length;
  } else if (preset === 'pixels-mechanic') {
    const mechTick = Math.floor(time * 10 * flickerBoost);
    const h = hash2(col + mechTick * 17.3, row + mechTick * 31.7);
    colorIdx = Math.floor(h * palette.length) % palette.length;
    if (h > 0.88) alphaScale = 0.55;
  } else if (preset === 'sweep-gradient') {
    const maxDiag = Math.max(1, cols + rows - 2);
    const diag = (col + row) / maxDiag;
    const band = (diag + time * 0.35) % 1;
    colorIdx = Math.floor(band * palette.length) % palette.length;
    const fl = hash2(col + Math.floor(time * 12), row + Math.floor(time * 7));
    if (fl > 0.82) colorIdx = (colorIdx + 1) % palette.length;
    if (fl < 0.08) alphaScale = 0.7;
  } else {
    const organicT = time * 0.4;
    const flow =
      valueNoise(col * 0.22, row * 0.22, organicT) * 0.65 +
      valueNoise(col * 0.09 + 40, row * 0.09 + 12, organicT * 0.7) * 0.35;
    colorIdx = Math.floor(flow * palette.length) % palette.length;
    const soft = hash2(col, row);
    if (soft > 0.9) alphaScale = 0.75;
    alphaScale *= 0.85 + soft * 0.15;
  }

  return {
    color: palette[colorIdx] ?? palette[0],
    alpha: alphaScale,
  };
}

function drawMosaic(
  ctx: CanvasRenderingContext2D,
  state: RenderFrameState,
  grid: GridSpec,
  palette: string[]
): void {
  const { width, height, time, preset, theme, intensity, reducedMotion, phase, progress } = state;
  const { cols, rows, cellW, cellH } = grid;
  const blending = Boolean(state.image) && phase !== 'idle' && progress > 0 && progress < 1;

  ctx.save();
  ctx.globalAlpha = MOSAIC_ALPHA;
  drawThemeWash(ctx, theme, width, height);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const fill = mosaicCellFill(
        col,
        row,
        grid,
        preset,
        palette,
        time,
        reducedMotion,
        intensity
      );

      let alpha = MOSAIC_ALPHA * fill.alpha;
      if (blending) {
        const amount = cellRevealAmount(col, row, grid, progress, preset, time, reducedMotion);
        alpha *= 1 - amount;
        if (alpha <= 0.01) continue;
      }

      ctx.globalAlpha = alpha;
      ctx.fillStyle = fill.color;
      ctx.fillRect(col * cellW, row * cellH, cellW + 1, cellH + 1);
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
): void {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih || !width || !height) return;
  const imageRatio = iw / ih;
  const boxRatio = width / height;
  let dw: number;
  let dh: number;
  if (imageRatio > boxRatio) {
    dh = height;
    dw = height * imageRatio;
  } else {
    dw = width;
    dh = width / imageRatio;
  }
  ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
}

function drawRevealImage(
  ctx: CanvasRenderingContext2D,
  state: RenderFrameState,
  grid: GridSpec
): void {
  const img = state.image;
  if (!img) return;
  const { width, height, progress, preset, time, reducedMotion } = state;
  const { cols, rows, cellW, cellH } = grid;
  const p = clamp01(progress);

  if (p >= 1) {
    drawImageCover(ctx, img, width, height);
    return;
  }
  if (p <= 0) return;

  for (let row = 0; row < rows; row++) {
    let runStart = -1;
    for (let col = 0; col <= cols; col++) {
      const active =
        col < cols &&
        cellRevealAmount(col, row, grid, p, preset, time, reducedMotion) > 0.5;
      if (active && runStart < 0) runStart = col;
      if ((!active || col === cols) && runStart >= 0) {
        const x = runStart * cellW;
        const w = (col - runStart) * cellW;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, row * cellH, w, cellH);
        ctx.clip();
        drawImageCover(ctx, img, width, height);
        ctx.restore();
        runStart = -1;
      }
    }
  }
}

export interface RenderFrameState {
  width: number;
  height: number;
  time: number;
  pixelScale: number;
  preset: ImageFxPreset;
  theme: ThemeColors;
  tint?: string | null;
  intensity: number;
  phase: ImageFxPhase;
  progress: number;
  image: HTMLImageElement | null;
  reducedMotion: boolean;
}

/** Full frame: mosaic base + cell-by-cell image dissolve during reveal/hide. */
export function renderFrame(ctx: CanvasRenderingContext2D, state: RenderFrameState): void {
  const { width, height, phase, progress, image } = state;
  if (width <= 0 || height <= 0) return;

  ctx.clearRect(0, 0, width, height);

  const palette = getPresetPalette(state.preset, state.theme, state.tint);
  const grid = computeGrid(width, height, state.pixelScale);

  if (image && phase === 'visible') {
    drawImageCover(ctx, image, width, height);
    return;
  }

  if (image && phase !== 'idle' && progress >= 1) {
    drawImageCover(ctx, image, width, height);
    return;
  }

  if (image && phase !== 'idle' && progress > 0) {
    drawMosaic(ctx, state, grid, palette);
    drawRevealImage(ctx, state, grid);
    return;
  }

  drawMosaic(
    ctx,
    { ...state, phase: 'idle', progress: 0, image: null },
    grid,
    palette
  );
}
