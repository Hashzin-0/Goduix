import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import { fusionColor } from './fusion';
import {
  useOrbLoop,
  type UseOrbLoopOptions,
} from './libraries/thinking-orbs/useOrbLoop';
import type { OrbState } from './libraries/thinking-orbs/orbEngine';

export interface ThinkingOrbProps
  extends Omit<React.CanvasHTMLAttributes<HTMLCanvasElement>, 'children'> {
  theme: ThemeColors;
  state?: OrbState;
  /** Tuned preset 64 (chat) / 20 (inline), or any square CSS px size. @default 64 */
  size?: 64 | 20 | number;
  /** Animation speed multiplier on the preset's baked speed. @default 1 */
  speed?: number;
  /** Freeze on the current frame. @default false */
  paused?: boolean;
  /** Overrides the per-state default aria-label. */
  ariaLabel?: string;
  fusions?: ComponentFusion[];
}

const LABELS: Record<OrbState, string> = {
  working: 'Thinking — working',
  searching: 'Thinking — searching',
  solving: 'Thinking — solving',
  listening: 'Thinking — listening',
  connecting: 'Thinking — connecting',
  weaving: 'Thinking — weaving',
  composing: 'Thinking — composing',
  breathing: 'Thinking — breathing',
  shaping: 'Thinking — shaping',
};

const FUSION_SLOTS = new Set(['badge', 'icon', 'border']);

export const ThinkingOrb: React.FC<ThinkingOrbProps> = ({
  theme,
  state = 'working',
  size = 64,
  speed = 1,
  paused = false,
  ariaLabel,
  fusions,
  className,
  style,
  ...rest
}) => {
  // Active fusion on a visual slot (badge/icon/border) — prefer orb-loader.
  const fusion = useMemo(() => {
    const active = (fusions ?? []).filter((f) => f.active);
    const match =
      active.find(
        (f) =>
          f.sourceEffect === 'orb-loader' &&
          (FUSION_SLOTS.has(f.targetSlot) || f.targetSlot === 'main-container')
      ) ??
      active.find((f) => FUSION_SLOTS.has(f.targetSlot));
    return match ?? null;
  }, [fusions]);

  const tint = fusion ? fusionColor(fusion, theme) : null;
  const intensity = fusion
    ? Math.min(1, Math.max(0.1, fusion.intensity ?? 0.8))
    : 0;

  const orbState = state as OrbState;
  const loopOpts: UseOrbLoopOptions = {
    state: orbState,
    size,
    speed,
    paused,
    dark: true,
    color: tint,
  };
  const setCanvasRef = useOrbLoop(loopOpts);

  const glowStyle: React.CSSProperties | undefined = fusion
    ? {
        boxShadow: `0 0 ${14 * intensity}px ${tint}${Math.round(intensity * 0x55)
          .toString(16)
          .padStart(2, '0')}`,
      }
    : undefined;

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full',
        'bg-zinc-900/80 border border-white/10',
        fusion && 'isolate',
        className
      )}
      style={{
        width: size,
        height: size,
        ...glowStyle,
        ...style,
      }}
      data-fusion={fusion ? fusion.sourceEffect : undefined}
    >
      <canvas
        ref={setCanvasRef}
        role="img"
        aria-label={ariaLabel ?? LABELS[orbState]}
        className="block"
        style={{ width: size, height: size }}
        {...rest}
      />
    </span>
  );
};

export type { OrbState };
