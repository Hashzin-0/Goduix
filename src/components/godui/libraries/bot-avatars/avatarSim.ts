import type {
  BotAvatarFace,
  BotAvatarFacePreset,
  BotAvatarState,
  BotAvatarType,
} from './shapes';
import { getBotAvatarParts, getBotAvatarPreset, getBotAvatarShape } from './shapes';

/* ── Types ──────────────────────────────────────────────────────────── */

export interface BotAvatarPose {
  /** radians; yaw > 0 turns the face to the viewer's right */
  yaw: number;
  /** radians; pitch > 0 looks up */
  pitch: number;
  roll: number;
  /** body-box units (the 100×100 design space) */
  x: number;
  y: number;
  sx: number;
  sy: number;
  /** 0 shut … 1 open, before blinks */
  eyeOpen: number;
  /** how far the lids are down right now, 0 … 1 */
  blink: number;
  lookX: number;
  lookY: number;
  /** the breathing cycle, −1 … 1 */
  breath: number;
  /** working only: how far the eyes have closed into a laugh, 0 … 1 */
  laugh: number;
  /** blend weights: default, working, sleeping — they sum to 1 */
  w: [number, number, number];
}

export interface DrawBotAvatarFrameOptions {
  type?: BotAvatarType;
  path?: Path2D;
  parts?: Path2D;
  face?: BotAvatarFace;
  faceX?: number;
  faceY?: number;
  faceScale?: number;
  color?: string;
  ink?: string;
  /** device pixel ratio the context is already scaled by (default 1) */
  dpr?: number;
}

export const BOT_AVATAR_OVERSCAN = 1.5;
export const BOT_AVATAR_RISE = 0.1;

const DARK_INK = '#1E1A33';
const LIGHT_INK = '#F7F5F2';
const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

/* ── Colour helpers (tiny local port of the library's shade/autoInk) ── */

function parseHex(color: string): [number, number, number] | null {
  const s = color.trim();
  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  const hsl = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);
  if (hsl) return hslToRgb([Number(hsl[1]) / 360, Number(hsl[2]) / 100, Number(hsl[3]) / 100]);
  return null;
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function shade(color: string, dl: number, ds = 0): string {
  const c = parseHex(color);
  if (!c) return color;
  const [h, s, l] = rgbToHsl(c);
  const ns = clamp01(s + ds + (dl < 0 ? -dl * 0.25 : 0));
  const nl = clamp01(l + dl);
  return `hsl(${(h * 360).toFixed(1)} ${(ns * 100).toFixed(1)}% ${(nl * 100).toFixed(1)}%)`;
}

export function luminance(color: string): number {
  const c = parseHex(color);
  if (!c) return 0.5;
  const lin = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
}

/** Face ink: dark on light bodies, light on dark bodies. */
export function autoInk(color: string): string {
  return luminance(color) < 0.13 ? LIGHT_INK : DARK_INK;
}

/* ── Deterministic rng ──────────────────────────────────────────────── */

function rng(seed: number): () => number {
  let a = (Math.floor(seed * 0x9e3779b1) >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function approach(cur: number, target: number, rate: number, dt: number): number {
  return cur + (target - cur) * (1 - Math.exp(-rate * dt));
}

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const easeSine = (p: number) => 0.5 - 0.5 * Math.cos(Math.PI * p);

/* ── Rest targets per state ─────────────────────────────────────────── */

interface Rest {
  pitch: number;
  roll: number;
  y: number;
  lookY: number;
}

const REST: Record<BotAvatarState, Rest> = {
  default: { pitch: 0, roll: 0, y: 0, lookY: 0 },
  working: { pitch: 5 * DEG, roll: 0, y: 0, lookY: 0 },
  sleeping: { pitch: -16 * DEG, roll: 6 * DEG, y: 3, lookY: 1 },
};

export const BOT_AVATAR_STATE_LABELS: Record<BotAvatarState, string> = {
  default: 'idle',
  working: 'working',
  sleeping: 'sleeping',
};

/* ── The still pose of a state (reduced motion / first paint) ──────── */

export function restPose(state: BotAvatarState): BotAvatarPose {
  const r = REST[state];
  return {
    yaw: 0,
    pitch: r.pitch,
    roll: r.roll,
    x: 0,
    y: r.y,
    sx: 1,
    sy: 1,
    eyeOpen: 1,
    blink: state === 'sleeping' ? 1 : 0,
    lookX: 0,
    lookY: r.lookY,
    breath: 0,
    laugh: 0,
    w: [
      state === 'default' ? 1 : 0,
      state === 'working' ? 1 : 0,
      state === 'sleeping' ? 1 : 0,
    ],
  };
}

/* ── Sim ────────────────────────────────────────────────────────────── */

const HOP_T = 0.68;
const HOP_H = 18;
const HOP_SPIN_H = 26;
const GAZE_HOLD_MIN = 2.6;
const GAZE_HOLD_MAX = 4.4;
const SWITCH_TO: Record<BotAvatarState, number> = { default: 1.2, working: 0.7, sleeping: 1.4 };
const SWITCH_FROM_SLEEP = 1;

/**
 * Pose simulation: state targets, blink loop, look-around, hop timing.
 * Advance with `update(dt)` (seconds, already scaled by speed).
 */
export class BotAvatarSim {
  readonly pose: BotAvatarPose = restPose('default');
  state: BotAvatarState = 'default';

  private rand: () => number;
  private t = 0;
  private wFrom: [number, number, number] = [1, 0, 0];
  private tr = 1;
  private trDuration = 1.2;

  /* rig channels, lerped toward targets */
  private yaw = 0;
  private pitch = 0;
  private roll = 0;
  private lookX = 0;
  private lookY = 0;
  private yawTarget = 0;
  private pitchTarget = 0;
  private rollTarget = 0;
  private lookXTarget = 0;
  private lookYTarget = 0;

  private gazeDir: [number, number] = [0, 0];
  private gazeAt = 0;

  private blinkP = -1;
  private blinkAt = 0;
  private blinkAgain = false;

  private hopPhase = 0;
  private hopCount = 0;
  private hopGain = 0;

  private nodP = -1;
  private nodAt = 0;

  private laughP = -1;
  private laughAt = 0;

  private flipP = -1;
  private flipDuration = 1.2;
  private flipAt = 0;
  private flipSide = 1;
  private flipPoked = false;

  private breathPhase = 0;
  private ptrX = 0;
  private ptrY = 0;
  private ptrS = 0;
  private ptrTargetX = 0;
  private ptrTargetY = 0;
  private ptrTargetS = 0;

  private event(p: number, dt: number, duration: number): number {
    if (p < 0) return -1;
    const next = p + dt / duration;
    return next >= 1 ? -1 : next;
  }

  constructor(seed = 0.5, state: BotAvatarState = 'default') {
    this.rand = rng(Math.floor(seed * 1e6) + 1);
    this.t = this.rand() * 10;
    this.hopPhase = this.rand();
    this.breathPhase = this.rand();
    this.blinkAt = this.t + 1 + this.rand() * 3;
    this.flipAt = this.nextFlip(this.t, 1);
    this.nodAt = this.t + 3 + this.rand() * 4;
    this.laughAt = this.t + 0.6 + this.rand() * 1.5;
    this.setState(state, true);
  }

  setState(next: BotAvatarState, immediate = false) {
    if (next === this.state && !immediate) return;
    const from = this.state;
    this.state = next;
    const w = this.pose.w;
    if (immediate) {
      for (let i = 0; i < 3; i++) w[i] = i === ['default', 'working', 'sleeping'].indexOf(next) ? 1 : 0;
      this.tr = 1;
    } else {
      this.wFrom = [w[0], w[1], w[2]];
      this.tr = 0;
      this.trDuration = from === 'sleeping' ? SWITCH_FROM_SLEEP : SWITCH_TO[next];
    }
    this.gazeAt = 0;
    this.gazeDir = [0, 0];
    if (next === 'working') {
      this.hopPhase = 0;
      this.hopCount = 0;
      this.laughAt = this.t + 0.5 + this.rand() * 1.2;
    }
    if (next === 'sleeping') {
      this.nodAt = this.t + 2.5 + this.rand() * 4;
    }
    if (next === 'default') {
      this.flipAt = this.nextFlip(this.t, 0.6);
    }
  }

  /** Pointer relative to the head (−1 … 1), and pull strength (0–1). */
  setPointer(x: number, y: number, strength: number) {
    this.ptrTargetX = Math.max(-1.2, Math.min(1.2, x));
    this.ptrTargetY = Math.max(-1.2, Math.min(1.2, y));
    this.ptrTargetS = Math.max(0, Math.min(1, strength));
  }

  /** A hop and a full turn, right now, whatever the state. */
  poke() {
    if (this.flipP >= 0 && this.flipP < 0.5) return;
    this.flipPoked = true;
    this.flipDuration = 1.4;
    this.flipSide = this.rand() < 0.5 ? -1 : 1;
    this.flipP = 0;
    this.flipAt = this.nextFlip(this.t, 1.1);
  }

  private nextGaze(): [number, number] {
    const r = this.rand;
    const [px, py] = this.gazeDir;
    if (px !== 0 || py !== 0) {
      const p = r();
      if (p < 0.66) return [-px, -py];
      if (p < 0.85) return [-px, py];
      return [0, 0];
    }
    const corners: Array<[number, number]> = [[1, -1], [-1, 1], [-1, -1], [1, 1]];
    return corners[Math.floor(r() * corners.length)];
  }

  private nextFlip(t: number, k: number) {
    const every = 8;
    return every > 0 ? t + every * k * (0.625 + this.rand() * 0.75) : Infinity;
  }

  /** Advance by `dt` seconds (already scaled by speed). */
  update(dt: number) {
    dt = Math.min(dt, 0.05);
    this.t += dt;
    const t = this.t;
    const p = this.pose;
    const w = p.w;

    /* state blend: soft start, soft finish */
    if (this.tr < 1) {
      this.tr = Math.min(1, this.tr + dt / this.trDuration);
      const e = easeSine(this.tr);
      const states: BotAvatarState[] = ['default', 'working', 'sleeping'];
      for (let i = 0; i < 3; i++) {
        const target = states[i] === this.state ? 1 : 0;
        w[i] = this.wFrom[i] + (target - this.wFrom[i]) * e;
      }
    }
    const [wd, ww, ws] = w;

    /* rest targets, blended */
    let restPitch = 0, restRoll = 0, restY = 0, restLookY = 0;
    const states: BotAvatarState[] = ['default', 'working', 'sleeping'];
    for (let i = 0; i < 3; i++) {
      const r = REST[states[i]];
      restPitch += r.pitch * w[i];
      restRoll += r.roll * w[i];
      restY += r.y * w[i];
      restLookY += r.lookY * w[i];
    }

    /* idle gaze: hold a corner, then swing across */
    if (this.state === 'default' && t >= this.gazeAt) {
      const [gx, gy] = this.nextGaze();
      this.gazeDir = [gx, gy];
      const reach = 0.84 + this.rand() * 0.16;
      this.yawTarget = gx * 35 * DEG * reach;
      this.pitchTarget = gy * 14 * DEG * reach;
      this.rollTarget = gx * 3.2 * DEG * reach;
      this.gazeAt = t + GAZE_HOLD_MIN + this.rand() * (GAZE_HOLD_MAX - GAZE_HOLD_MIN);
    } else if (this.state === 'working') {
      this.yawTarget = (this.rand() * 2 - 1) * 8 * DEG;
      this.pitchTarget = (this.rand() * 2 - 1) * 3 * DEG;
      this.rollTarget = 0;
      this.gazeAt = t + 0.9 + this.rand() * 0.9;
      if (t >= this.gazeAt) this.gazeAt = t; /* re-roll soon */
    } else if (this.state === 'sleeping') {
      this.yawTarget = 7 * DEG * Math.sin(t * 0.4);
      this.pitchTarget = 3 * DEG;
      this.rollTarget = 2 * DEG;
    }

    /* pointer pull */
    this.ptrS = approach(this.ptrS, this.ptrTargetS, 8, dt);
    this.ptrX = approach(this.ptrX, this.ptrTargetX, 14, dt);
    this.ptrY = approach(this.ptrY, this.ptrTargetY, 14, dt);
    const ps = this.ptrS;
    const quiet = 1 - 0.75 * ps;

    /* lerp rig channels toward targets */
    const rate = this.state === 'sleeping' ? 1.4 : this.state === 'working' ? 4 : 2.4;
    this.yaw = approach(this.yaw, this.yawTarget * quiet + 22 * DEG * this.ptrX * ps, rate, dt);
    this.pitch = approach(
      this.pitch,
      restPitch + this.pitchTarget * quiet - 12 * DEG * this.ptrY * ps,
      rate,
      dt
    );
    this.roll = approach(this.roll, restRoll + this.rollTarget * quiet, rate, dt);
    this.lookX = approach(this.lookX, this.lookXTarget * quiet + 4.5 * this.ptrX * ps, 12, dt);
    this.lookY = approach(this.lookY, restLookY + this.lookYTarget * quiet + 3 * this.ptrY * ps, 12, dt);

    /* eyes wander a touch on their own */
    if (t >= this.gazeAt + 0.5 || this.state !== 'default') {
      this.lookXTarget = (this.rand() * 2 - 1) * (this.state === 'sleeping' ? 0 : 3.6);
      this.lookYTarget = (this.rand() * 2 - 1) * (this.state === 'sleeping' ? 0 : 2.4);
    }

    /* ── events ── */
    let spin = 0, hopY = 0, sx = 1, sy = 1, pitchAdd = 0, rollAdd = 0;
    let blinkClose = 0, laugh = 0;

    /* blinks: idle and working */
    if (t >= this.blinkAt && this.blinkP < 0 && wd + ww > 0.5) {
      this.blinkP = 0;
      this.blinkAgain = !this.blinkAgain && this.rand() < 0.22;
      this.blinkAt = t + (this.blinkAgain ? 0.28 : 2.2 + this.rand() * 2.6);
    }
    this.blinkP = this.event(this.blinkP, dt, 0.17);
    if (this.blinkP >= 0) blinkClose = Math.sin(Math.PI * this.blinkP);

    /* idle: a full turn with a jump now and then */
    if (this.state === 'default' && t >= this.flipAt && this.flipP < 0) {
      this.flipPoked = false;
      this.flipDuration = 1.3;
      this.flipSide = this.rand() < 0.5 ? -1 : 1;
      this.flipP = 0;
      this.flipAt = this.nextFlip(t, 1);
    }
    this.flipP = this.event(this.flipP, dt, this.flipDuration);
    if (this.flipP >= 0) {
      const q = this.flipP;
      const arc = Math.sin(Math.PI * q);
      spin += TAU * easeInOut(q);
      hopY -= 26 * arc;
      const land = Math.exp(-Math.pow(Math.min(Math.abs(q - 1) * 8, 3), 2));
      sx += 0.16 * land - 0.06 * arc;
      sy += -0.18 * land + 0.09 * arc;
      rollAdd += this.flipSide * 6 * DEG * arc;
      laugh = Math.max(laugh, arc * 0.85);
    }

    /* working: hops; every third one spins */
    if (this.state === 'working') this.hopGain = ww;
    if (this.hopGain > 0.02 && (this.state === 'working' || this.hopPhase > 0)) {
      this.hopPhase += dt / HOP_T;
      if (this.hopPhase >= 1) {
        if (this.state === 'working') {
          this.hopPhase -= 1;
          this.hopCount += 1;
        } else if (this.hopPhase > 1.6) {
          this.hopPhase = 0;
          this.hopGain = 0;
        }
      }
      const g = this.hopGain;
      const q = Math.min(1, this.hopPhase);
      const arc = Math.sin(Math.PI * q);
      const spinning = this.hopCount % 3 === 2;
      const h = spinning ? HOP_SPIN_H : HOP_H;
      hopY -= h * arc * g;
      const land = Math.exp(-Math.pow(Math.min(Math.abs(this.hopPhase - 1) * 8, 3), 2));
      sx += (0.16 * land - 0.06 * arc) * g;
      sy += (-0.18 * land + 0.09 * arc) * g;
      if (spinning) {
        spin += TAU * easeInOut(q) * g;
        laugh = Math.max(laugh, arc * g);
      }
      rollAdd += (this.hopCount % 2 === 0 ? 1 : -1) * 6 * DEG * arc * g;
    }

    /* working: occasional laugh */
    if (this.state === 'working' && t >= this.laughAt && this.laughP < 0) {
      this.laughP = 0;
      this.laughAt = t + 1.6 + this.rand() * 2.2;
    }
    this.laughP = this.event(this.laughP, dt, 0.8);
    if (this.laughP >= 0) {
      const q = this.laughP;
      laugh = Math.max(laugh, q < 0.18 ? q / 0.18 : q > 0.78 ? (1 - q) / 0.22 : 1);
    }

    /* sleeping: head drops, then jerks back */
    if (this.state === 'sleeping' && t >= this.nodAt && this.nodP < 0) {
      this.nodP = 0;
      this.nodAt = t + 4 + this.rand() * 4;
    }
    this.nodP = this.event(this.nodP, dt, 1.7);
    if (this.nodP >= 0) {
      const q = this.nodP;
      const dip = q < 0.72 ? easeInOut(q / 0.72) : 1 - easeInOut((q - 0.72) / 0.28);
      pitchAdd -= 13 * DEG * dip * ws;
    }

    /* breathing: deeper and slower asleep */
    this.breathPhase += dt / (3.6 + 1.2 * ws);
    const breath = Math.sin(this.breathPhase * TAU);
    p.breath = breath;
    sx += breath * (0.008 + 0.014 * ws);
    sy += breath * (0.012 + 0.02 * ws);
    const bob = Math.sin((t * TAU) / 3.4) * 2 * (1 - ws);

    /* compose */
    p.yaw = this.yaw + spin;
    p.pitch = this.pitch + pitchAdd;
    p.roll = this.roll + rollAdd;
    p.x = 0;
    p.y = restY + hopY + bob;
    p.sx = sx;
    p.sy = sy;
    p.eyeOpen = 1;
    p.laugh = approach(p.laugh, laugh, 30, dt);
    /* sleeping lids close through their own weight */
    const sleepLid = ws * 0.92;
    p.blink = Math.min(1, Math.max(blinkClose, sleepLid, p.laugh));
    p.lookX = this.lookX;
    p.lookY = this.lookY;
  }
}

/* ── Renderer ───────────────────────────────────────────────────────── */

const EYE_GAP = 25;
const EYE_RX = 6.3;
const EYE_RY = 7.4;
const EYE_Y_OFFSET = { eyes: 1, mouth: -3.5 } as const;

function mixHex(a: string, b: string, t: number): string {
  const ca = parseHex(a) ?? [128, 128, 128];
  const cb = parseHex(b) ?? [128, 128, 128];
  const m = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
}

/**
 * Draw one frame. `size` is the layout box in CSS px; the canvas should be
 * `size * BOT_AVATAR_OVERSCAN` square with the body centre `BOT_AVATAR_RISE *
 * size` below the middle (so hops are not clipped). The context must
 * already be scaled for the device pixel ratio.
 */
export function drawBotAvatarFrame(
  ctx: CanvasRenderingContext2D,
  size: number,
  pose: BotAvatarPose,
  opts: DrawBotAvatarFrameOptions
): void {
  const type = opts.type ?? 'clover';
  const preset = getBotAvatarPreset(type);
  const path = opts.path ?? getBotAvatarShape(type);
  const parts = opts.parts ?? getBotAvatarParts(type);
  const face: BotAvatarFace = opts.face ?? preset.face;
  const faceX = opts.faceX ?? preset.faceX;
  const faceY = opts.faceY ?? preset.faceY;
  const faceScale = opts.faceScale ?? preset.faceScale;
  const color = opts.color ?? preset.color;
  const ink = opts.ink ?? autoInk(color);

  const full = size * BOT_AVATAR_OVERSCAN;
  ctx.clearRect(0, 0, full, full);

  const S = size / 100;
  const [wd, ww, ws] = pose.w;

  /* body transform: centre + rise + pose offset, roll, squash about base */
  const cr = Math.cos(pose.roll);
  const sr = Math.sin(pose.roll);
  const lift = 50 * (1 - pose.sy) * S;
  const cx = full / 2 + pose.x * S - sr * lift;
  const cy = full / 2 + BOT_AVATAR_RISE * size + pose.y * S + cr * lift;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(pose.roll);
  ctx.scale(pose.sx * S, pose.sy * S);
  ctx.translate(-50, -50);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  /* cheap vertical shade: lit top, deeper bottom */
  const top = shade(color, 0.1, 0.04);
  const mid = color;
  const bottom = shade(color, -0.22, 0.06);
  const rim = shade(color, -0.06, 0.02);

  /* soft drop shadow under the body */
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.translate(0, 4);
  ctx.filter = 'blur(2px)';
  ctx.fill(path);
  ctx.filter = 'none';
  ctx.restore();

  /* thin parts (antennae) behind */
  if (parts) {
    ctx.fillStyle = rim;
    ctx.fill(parts);
  }

  /* depth: a slightly offset dark copy reads as extrusion */
  const yawShift = Math.sin(pose.yaw) * 5;
  const pitchShift = Math.sin(pose.pitch) * 3;
  ctx.save();
  ctx.translate(yawShift * 0.45 + 1.2, pitchShift * 0.35 + 1.6);
  ctx.fillStyle = bottom;
  ctx.fill(path);
  ctx.restore();

  /* main body with vertical gradient shade */
  const grad = ctx.createLinearGradient(0, 8, 0, 96);
  grad.addColorStop(0, top);
  grad.addColorStop(0.42, mid);
  grad.addColorStop(1, bottom);
  ctx.fillStyle = grad;
  ctx.fill(path);

  /* lit rim along the top-left */
  ctx.save();
  ctx.clip(path);
  const hl = ctx.createRadialGradient(32, 26, 4, 32, 26, 70);
  hl.addColorStop(0, 'rgba(255,255,255,0.35)');
  hl.addColorStop(0.55, 'rgba(255,255,255,0.08)');
  hl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl;
  ctx.fillRect(0, 0, 100, 100);
  const sh = ctx.createLinearGradient(55, 40, 90, 95);
  sh.addColorStop(0, 'rgba(0,0,0,0)');
  sh.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = sh;
  ctx.fillRect(0, 0, 100, 100);
  ctx.restore();

  /* face on the front cap — clipped to the body */
  const facing = Math.cos(pose.yaw) * Math.cos(pose.pitch);
  if (facing > -0.15) {
    ctx.save();
    ctx.clip(path);
    ctx.translate(faceX - 50, faceY - 50);
    ctx.scale(faceScale, faceScale);
    drawFace(ctx, pose, face, ink, wd, ww, ws);
    ctx.restore();
  }

  ctx.restore();
}

function drawFace(
  ctx: CanvasRenderingContext2D,
  pose: BotAvatarPose,
  face: BotAvatarFace,
  ink: string,
  wd: number,
  ww: number,
  ws: number
): void {
  const ey = EYE_Y_OFFSET[face];
  const half = EYE_GAP / 2;
  const yaw = pose.yaw;
  const pitch = pose.pitch;

  /* sphere-ish feature placement so a head turn slides features round */
  const place = (x: number, y: number, fn: () => void) => {
    const lon = Math.asin(Math.max(-1, Math.min(1, x / 30))) + yaw;
    const lat = Math.asin(Math.max(-1, Math.min(1, -y / 30))) + pitch;
    const cl = Math.cos(lat);
    const sx = Math.cos(lon);
    const z = Math.cos(lon) * cl;
    if (z <= 0.05) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, z * 5);
    ctx.translate(30 * Math.sin(lon) * cl, -30 * Math.sin(lat));
    ctx.scale(Math.max(0.05, Math.abs(sx) * (sx < 0 ? 1 : 1)), Math.max(0.05, cl));
    /* squash horizontal when turning away */
    ctx.scale(sx >= 0 ? sx : 0.15, 1);
    fn();
    ctx.restore();
  };

  const open = Math.max(0, Math.min(1, pose.eyeOpen * (1 - pose.blink)));
  const shut = 1 - open;
  const laugh = ww * pose.laugh;

  for (const side of [-1, 1] as const) {
    const dx = pose.lookX;
    const dy = pose.lookY;
    place(side * half + dx * 0.4, ey + dy * 0.4, () => {
      if (open < 0.12 || laugh > 0.5) {
        /* shut or laughing arc: a short stroked curve */
        ctx.strokeStyle = ink;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        if (laugh > 0.35 || open < 0.12) {
          const arcUp = laugh > open;
          const y = arcUp ? -2 : 0.5;
          ctx.moveTo(-5.2, arcUp ? y + 1.5 : y);
          ctx.quadraticCurveTo(0, arcUp ? y - 7 : y - 1.5, 5.2, arcUp ? y + 1.5 : y);
        }
        ctx.stroke();
      } else {
        /* open eye: white/sclera ellipse + pupil offset by look */
        const rx = EYE_RX * (0.55 + 0.45 * open);
        const ry = EYE_RY * open;
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
        ctx.fill();
        /* small specular */
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.beginPath();
        ctx.ellipse(-rx * 0.28, -ry * 0.32, rx * 0.28, ry * 0.24, 0, 0, TAU);
        ctx.fill();
        void shut;
      }
    });
  }

  if (face === 'mouth') {
    const mx = pose.lookX * 0.35;
    const my = wd * 12.5 + ww * 11.6 + ws * 15.5;
    place(mx, my, () => {
      ctx.strokeStyle = ink;
      ctx.fillStyle = ink;
      const smile = wd * 0.55 + ww * 1.0;
      const sleepO = ws * 2.7 * (1 + 0.25 * pose.breath);
      if (ws > 0.55 && ww < 0.3) {
        /* small "o" while asleep */
        ctx.beginPath();
        ctx.ellipse(0, 0, sleepO, sleepO * 1.15, 0, 0, TAU);
        ctx.fill();
      } else if (ww > 0.4) {
        /* wide smile while working */
        ctx.lineWidth = 3.4;
        ctx.beginPath();
        ctx.arc(0, -3.5, 9.5, 0.35, Math.PI - 0.35, false);
        ctx.stroke();
      } else {
        /* neutral-to-soft idle mouth */
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.arc(0, -2.5, 6.5 * (0.7 + 0.3 * smile), 0.4, Math.PI - 0.4, false);
        ctx.stroke();
      }
    });
  }
}
