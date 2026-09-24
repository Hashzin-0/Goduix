import React from 'react';
import { ThemeColors } from '../../../types';
import {
  ComponentFusion,
  FusionEffectType,
  FusionTargetSlot,
} from '../../../types/builder';
import { cn } from '../../../lib/utils';

/** Visual descriptor resolved from a fusion — consumed by FusionWrapper layers. */
export interface FusionVisual {
  key: string;
  fusion: ComponentFusion;
  /** Ring/border treatment on the wrapper */
  border?: {
    className?: string;
    style?: React.CSSProperties;
    animated?: 'spin' | 'pulse' | 'none';
  };
  /** Surface behind content */
  background?: {
    className?: string;
    style?: React.CSSProperties;
  };
  /** ::before-style atmospheric glow */
  glow?: {
    className?: string;
    style?: React.CSSProperties;
  };
  /** ::after-style specular sweep */
  shine?: {
    className?: string;
    style?: React.CSSProperties;
    animated?: 'sweep' | 'none';
  };
  /** Extra wrapper classes (hover-state, content treatments) */
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

const CONTAINER_SLOTS: FusionTargetSlot[] = [
  'border',
  'background',
  'main-container',
  'before-glow',
  'after-shine',
  'hover-state',
  'content',
];

export function isContainerSlot(slot: FusionTargetSlot): boolean {
  return CONTAINER_SLOTS.includes(slot);
}

export function fusionColor(f: ComponentFusion, theme: ThemeColors): string {
  return f.customColor || theme.primary;
}

function clamp01(n: number | undefined, fallback = 0.85): number {
  if (n === undefined || Number.isNaN(n)) return fallback;
  return Math.min(1, Math.max(0.1, n));
}

/** Resolve visual layers for one fusion targeting a container slot. */
export function resolveFusionVisual(
  f: ComponentFusion,
  theme: ThemeColors
): FusionVisual {
  const color = fusionColor(f, theme);
  const glowColor = f.withGlow !== false ? theme.glow : color;
  const intensity = clamp01(f.intensity);
  const visual: FusionVisual = { key: f.id, fusion: f };

  const hoverOnly = f.trigger === 'hover';
  const clickOnly = f.trigger === 'click';
  // visibility handled by wrapper via data attributes / group classes
  void hoverOnly;
  void clickOnly;

  switch (f.sourceEffect) {
    case 'liquid-glass':
      visual.border = {
        className: 'border-white/25',
        style: {
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,${0.35 * intensity}), 0 0 0 1px rgba(255,255,255,${0.12 * intensity})`,
        },
        animated: 'none',
      };
      visual.background = {
        className: 'backdrop-blur-2xl',
        style: {
          background: `linear-gradient(135deg, rgba(255,255,255,${0.08 * intensity}), rgba(255,255,255,${0.03 * intensity}))`,
        },
      };
      visual.glow = {
        style: {
          background: `radial-gradient(60% 80% at 30% 20%, ${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')}, transparent 70%)`,
        },
      };
      visual.shine = {
        animated: 'sweep',
        style: {
          background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,${0.25 * intensity}) 50%, transparent 70%)`,
        },
      };
      break;

    case 'gooey-liquid':
    case 'gooey-morph':
      visual.border = {
        style: {
          boxShadow: `0 0 0 ${1 + intensity}px ${color}55, 0 0 ${18 * intensity}px ${color}44`,
        },
        animated: f.sourceEffect === 'gooey-morph' ? 'pulse' : 'none',
      };
      visual.background = {
        style: {
          background: `radial-gradient(80% 120% at 50% 100%, ${color}${Math.round(intensity * 35).toString(16).padStart(2, '0')}, transparent 70%)`,
        },
      };
      visual.glow = {
        style: {
          background: `radial-gradient(50% 50% at 50% 80%, ${color}${Math.round(intensity * 50).toString(16).padStart(2, '0')}, transparent 70%)`,
          filter: 'blur(12px)',
        },
      };
      break;

    case 'magnetic-pull':
      visual.border = {
        style: {
          boxShadow: `0 0 ${12 * intensity}px ${glowColor}66, inset 0 0 ${8 * intensity}px ${glowColor}22`,
        },
      };
      visual.wrapperClassName =
        'transition-transform duration-200 [ease:cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02]';
      break;

    case 'shimmer-beam':
    case 'beam-pulse':
      visual.border = {
        animated: f.sourceEffect === 'beam-pulse' ? 'pulse' : 'spin',
        style: {
          background:
            f.sourceEffect === 'beam-pulse'
              ? `conic-gradient(from 0deg, transparent, ${color}, transparent)`
              : `conic-gradient(from 0deg, transparent 0%, ${color} 25%, transparent 50%)`,
          opacity: 0.55 * intensity + 0.2,
        },
      };
      visual.shine = {
        animated: 'sweep',
        style: {
          background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
        },
      };
      break;

    case 'aurora-glow':
      visual.background = {
        style: {
          background: `linear-gradient(135deg, ${theme.primary}${Math.round(intensity * 45).toString(16).padStart(2, '0')}, ${theme.accent}${Math.round(intensity * 35).toString(16).padStart(2, '0')}, ${theme.ring}${Math.round(intensity * 30).toString(16).padStart(2, '0')})`,
          backgroundSize: '200% 200%',
        },
      };
      visual.glow = {
        style: {
          background: `radial-gradient(40% 60% at 20% 0%, ${theme.primary}${Math.round(intensity * 60).toString(16).padStart(2, '0')}, transparent 70%), radial-gradient(50% 50% at 80% 100%, ${theme.accent}${Math.round(intensity * 50).toString(16).padStart(2, '0')}, transparent 70%)`,
          filter: 'blur(14px)',
        },
      };
      visual.border = {
        style: {
          boxShadow: `inset 0 0 ${20 * intensity}px ${theme.primary}33, 0 0 ${16 * intensity}px ${theme.accent}33`,
        },
      };
      break;

    case 'spotlight-beam':
      visual.glow = {
        style: {
          background: `radial-gradient(45% 55% at var(--fusion-spot-x, 50%) var(--fusion-spot-y, 0%), ${color}${Math.round(intensity * 70).toString(16).padStart(2, '0')}, transparent 70%)`,
        },
      };
      break;

    case 'voice-beam':
    case 'voice-pulse':
      visual.border = {
        animated: 'pulse',
        style: {
          background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.accent}, transparent)`,
          opacity: 0.65 * intensity,
        },
      };
      visual.glow = {
        style: {
          background: `radial-gradient(80% 40% at 50% 100%, ${theme.primary}${Math.round(intensity * 70).toString(16).padStart(2, '0')}, ${theme.accent}${Math.round(intensity * 40).toString(16).padStart(2, '0')} 40%, transparent 75%)`,
          filter: `blur(${6 + intensity * 8}px)`,
        },
      };
      break;

    case 'metal-rim':
      visual.border = {
        animated: 'spin',
        style: {
          background: `conic-gradient(from 0deg, #e8e8ef, ${color}, #9aa0b4, #f5f6fa, #6b7285, ${color}, #e8e8ef)`,
          opacity: 0.7 + intensity * 0.3,
        },
      };
      visual.shine = {
        animated: 'sweep',
        style: {
          background: `linear-gradient(120deg, transparent 35%, rgba(255,255,255,${0.45 * intensity}) 50%, transparent 65%)`,
        },
      };
      visual.glow = {
        style: {
          background: `radial-gradient(40% 40% at 50% 50%, rgba(220,225,240,${0.2 * intensity}), transparent 70%)`,
        },
      };
      break;

    case 'pixel-reveal':
      visual.background = {
        style: {
          backgroundImage: `linear-gradient(${color}${Math.round(intensity * 30).toString(16).padStart(2, '0')} 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}${Math.round(intensity * 25).toString(16).padStart(2, '0')} 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        },
      };
      visual.border = {
        style: {
          boxShadow: `inset 0 0 0 1px ${color}44`,
        },
        animated: 'pulse',
      };
      break;

    case 'orb-loader':
      visual.glow = {
        style: {
          background: `radial-gradient(circle at 50% 50%, transparent ${30 - intensity * 10}%, ${color}${Math.round(intensity * 45).toString(16).padStart(2, '0')} ${45}%, transparent 70%)`,
        },
      };
      visual.border = {
        style: {
          boxShadow: `0 0 ${14 * intensity}px ${color}55`,
        },
        animated: 'pulse',
      };
      break;

    case 'bot-face':
      visual.border = {
        style: {
          boxShadow: `0 0 0 ${intensity * 2}px ${color}66, 0 0 ${12 * intensity}px ${color}44`,
        },
        animated: 'pulse',
      };
      visual.background = {
        style: {
          background: `radial-gradient(circle at 30% 30%, ${color}${Math.round(intensity * 30).toString(16).padStart(2, '0')}, transparent 60%)`,
        },
      };
      break;

    case 'hologram-3d-tilt':
      visual.border = {
        style: {
          background: `linear-gradient(120deg, ${theme.primary}88, ${theme.accent}66, ${theme.ring}88, ${theme.primary}88)`,
          backgroundSize: '300% 300%',
        },
        animated: 'spin',
      };
      visual.shine = {
        animated: 'sweep',
        style: {
          background: `linear-gradient(160deg, transparent 40%, rgba(255,255,255,${0.3 * intensity}) 50%, transparent 60%)`,
        },
      };
      break;

    case 'bento-gradient-border':
    case 'magic-rainbow-stroke':
      visual.border = {
        animated: 'spin',
        style: {
          background: `conic-gradient(from 0deg, ${theme.primary}, ${theme.accent}, ${theme.ring}, #f472b6, ${theme.primary})`,
        },
      };
      break;

    case 'glass-refraction':
      visual.border = {
        style: {
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,${0.2 * intensity}), inset 0 8px 24px -12px rgba(255,255,255,${0.25 * intensity})`,
        },
      };
      visual.background = {
        className: 'backdrop-blur-xl',
        style: { background: `rgba(255,255,255,${0.04 * intensity})` },
      };
      break;

    case 'ascii-dither-fx':
    case 'blueprint-laser':
      visual.border = {
        style: {
          backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)`,
          opacity: 0.5 + intensity * 0.5,
        },
      };
      break;

    case 'lamp-beam':
    case 'scroll-reveal':
      visual.glow = {
        style: {
          background: `radial-gradient(70% 50% at 50% 100%, ${color}${Math.round(intensity * 55).toString(16).padStart(2, '0')}, transparent 75%)`,
        },
      };
      break;

    case 'jelly-bounce':
      visual.wrapperClassName =
        'transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]';
      break;

    case 'hold-confirm-ring':
      visual.border = {
        style: {
          boxShadow: `0 0 0 ${intensity * 3}px ${color}55`,
        },
        animated: 'pulse',
      };
      break;

    case 'magic-sparkle':
      visual.shine = {
        animated: 'sweep',
        style: {
          background: `radial-gradient(circle at 20% 30%, ${color}88 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, ${theme.accent}88 0 2px, transparent 3px), radial-gradient(circle at 60% 20%, ${theme.ring}66 0 1.5px, transparent 2.5px)`,
        },
      };
      break;

    case 'elastic-stretch':
    case 'number-odometer':
      visual.border = {
        style: { boxShadow: `inset 0 0 ${10 * intensity}px ${color}33` },
      };
      break;

    case 'mask-wipe':
      visual.shine = {
        animated: 'sweep',
        style: {
          background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
        },
      };
      break;

    case 'radial-satellite':
    case 'dock-magnification':
    case 'island-morph':
    case 'toolbar-pill-morph':
    case 'mesh-3d-wire':
    default: {
      // Generic branded treatment so every effect is always visible on a slot
      visual.border = {
        style: {
          boxShadow: `0 0 0 1px ${color}${Math.round(intensity * 80).toString(16).padStart(2, '0')}, 0 0 ${12 * intensity}px ${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')}`,
        },
      };
      visual.glow = {
        style: {
          background: `radial-gradient(50% 50% at 50% 50%, ${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')}, transparent 70%)`,
          filter: 'blur(10px)',
        },
      };
      break;
    }
  }

  return visual;
}

export function visualsForSlot(
  fusions: ComponentFusion[],
  slots: FusionTargetSlot[],
  theme: ThemeColors
): FusionVisual[] {
  return fusions
    .filter((f) => f.active && slots.includes(f.targetSlot))
    .map((f) => resolveFusionVisual(f, theme));
}

export function triggerGroupClass(f: ComponentFusion): string {
  switch (f.trigger) {
    case 'hover':
      return 'opacity-0 group-hover:opacity-100 transition-opacity duration-200 [ease:cubic-bezier(0.23,1,0.32,1)]';
    case 'click':
      return 'opacity-0 data-[fused-click="1"]:opacity-100 transition-opacity duration-150';
    case 'entrance':
      return 'animate-[fusion-fade-in_0.45s_cubic-bezier(0.23,1,0.32,1)_both]';
    case 'always':
    case undefined:
    default:
      return '';
  }
}

export function layerClassName(
  visual: FusionVisual,
  base: string,
  extra?: string
): string {
  return cn(base, visual.border?.className, extra);
}
