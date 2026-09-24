import React, { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import { cn } from '../../lib/utils';
import {
  BOT_AVATAR_OVERSCAN,
  BOT_AVATAR_RISE,
  BOT_AVATAR_STATE_LABELS,
  BotAvatarSim,
  autoInk,
  drawBotAvatarFrame,
  restPose,
  type BotAvatarPose,
} from './libraries/bot-avatars/avatarSim';
import {
  getBotAvatarParts,
  getBotAvatarPreset,
  getBotAvatarShape,
  type BotAvatarFace,
  type BotAvatarState,
  type BotAvatarType,
} from './libraries/bot-avatars/shapes';

export interface BotAvatarProps
  extends Omit<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    'children' | 'color' | 'type' | 'width' | 'height'
  > {
  theme: ThemeColors;
  type?: BotAvatarType;
  state?: BotAvatarState;
  face?: BotAvatarFace;
  /** Rendered size in px. Default 64. */
  size?: number;
  /** Multiplier on every animation's speed. */
  speed?: number;
  paused?: boolean;
  /** Eyes/head follow the pointer; click hops. */
  interactive?: boolean;
  /** Override body colour. */
  color?: string;
  ariaLabel?: string;
  fusions?: ComponentFusion[];
}

const FUSION_SLOTS = new Set(['icon', 'badge', 'border']);

function hashSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const BotAvatar: React.FC<BotAvatarProps> = (props: BotAvatarProps) => {
  const {
    theme,
    type = 'clover',
    state = 'default',
    face,
    size = 64,
    speed = 1,
    paused = false,
    interactive = true,
    color,
    ariaLabel,
    fusions,
    className,
    style,
    onClick,
    ...rest
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<BotAvatarSim | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const speedRef = useRef(speed);
  const interactiveRef = useRef(interactive);
  const pausedRef = useRef(paused);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const cssSizeRef = useRef(size);

  speedRef.current = speed;
  interactiveRef.current = interactive;
  pausedRef.current = paused;

  const reactId = useId();
  const seed = hashSeed(reactId);
  const preset = getBotAvatarPreset(type);
  const faceKind: BotAvatarFace = face ?? preset.face;
  const stateKey: BotAvatarState = BOT_AVATAR_STATE_LABELS[state] ? state : 'default';

  /* fusion: active bot-face (or any) on icon/badge/border tints the body */
  const activeFusion = React.useMemo(
    () => (fusions ?? []).filter((f) => f.active && FUSION_SLOTS.has(f.targetSlot)),
    [fusions]
  );
  const fused = activeFusion.length > 0;
  const fusionColor =
    activeFusion.find((f) => f.customColor)?.customColor ?? (fused ? theme.primary : undefined);
  const bodyColor = color ?? fusionColor ?? preset.color;
  const ink = autoInk(bodyColor);
  const glowIntensity =
    activeFusion.reduce((max, f) => Math.max(max, f.intensity ?? 0.8), 0) || 0;
  const glowColor =
    activeFusion.find((f) => f.customColor)?.customColor ?? theme.glow ?? theme.primary;

  const path = React.useMemo(() => getBotAvatarShape(type), [type]);
  const parts = React.useMemo(() => getBotAvatarParts(type), [type]);

  const paint = useCallback(
    (pose: BotAvatarPose) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const px = cssSizeRef.current || size;
      if (!px) return;
      const dpr = Math.min(2, (typeof devicePixelRatio === 'number' && devicePixelRatio) || 1);
      const want = Math.round(px * BOT_AVATAR_OVERSCAN * dpr);
      if (canvas.width !== want || canvas.height !== want) {
        canvas.width = want;
        canvas.height = want;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBotAvatarFrame(ctx, px, pose, {
        type,
        path,
        parts,
        face: faceKind,
        faceX: preset.faceX,
        faceY: preset.faceY,
        faceScale: preset.faceScale,
        color: bodyColor,
        ink,
        dpr,
      });
    },
    [type, path, parts, faceKind, preset.faceX, preset.faceY, preset.faceScale, bodyColor, ink, size]
  );

  /* first paint + state sync */
  useLayoutEffect(() => {
    if (!simRef.current) simRef.current = new BotAvatarSim(seed, stateKey);
    else simRef.current.setState(stateKey);

    if (prefersReducedMotion()) {
      paint(restPose(stateKey));
      return;
    }
    paint(simRef.current.pose);
  }, [stateKey, seed, paint]);

  /* re-paint when colours / face change without advancing sim */
  useEffect(() => {
    if (simRef.current) paint(simRef.current.pose);
    else paint(restPose(stateKey));
  }, [paint, stateKey]);

  /* pointer tracking */
  useEffect(() => {
    if (!interactiveRef.current) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  /* rAF loop with IntersectionObserver pause + reduced-motion bail-out */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let onScreen = true;
    let running = false;

    const tick = (ts: number) => {
      rafRef.current = null;
      const sim = simRef.current;
      if (!sim) return;
      const last = lastTsRef.current || ts;
      lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - last) / 1000);

      const frozen = pausedRef.current || !(speedRef.current > 0);
      if (!frozen && onScreen) {
        if (interactiveRef.current && pointerRef.current.active) {
          const r = canvas.getBoundingClientRect();
          const box = r.width / BOT_AVATAR_OVERSCAN || 1;
          const dx = (pointerRef.current.x - (r.left + r.width / 2)) / box;
          const dy =
            (pointerRef.current.y - (r.top + r.height / 2 + BOT_AVATAR_RISE * box)) / box;
          const d = Math.hypot(dx, dy);
          const strength = d < 1 ? 1 : d > 3 ? 0 : 1 - (d - 1) / 2;
          sim.setPointer(dx / Math.max(1, d), dy / Math.max(1, d), strength);
        } else {
          sim.setPointer(0, 0, 0);
        }
        sim.update(dt * speedRef.current);
      }
      paint(sim.pose);

      if (!pausedRef.current && speedRef.current > 0 && onScreen) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || pausedRef.current) return;
      running = true;
      lastTsRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? true;
          if (onScreen) start();
          else stop();
        },
        { rootMargin: '40px' }
      );
      io.observe(canvas);
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    /* restart when paused/speed props flip back on */
    const poll = window.setInterval(() => {
      if (!pausedRef.current && speedRef.current > 0 && onScreen && !running) start();
      else if ((pausedRef.current || !(speedRef.current > 0)) && running) stop();
    }, 250);

    return () => {
      stop();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(poll);
    };
  }, [paint]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (interactiveRef.current && !pausedRef.current && !prefersReducedMotion()) {
      simRef.current?.poke();
      paint(simRef.current?.pose ?? restPose(stateKey));
    }
    onClick?.(e);
  };

  /* layout box stays `size` square; the canvas overscans for hops */
  const box = size;
  const canvasPx = size * BOT_AVATAR_OVERSCAN;
  const pull = (k: number) => -size * k;
  const side = (BOT_AVATAR_OVERSCAN - 1) / 2;

  const aria =
    ariaLabel ??
    `${preset.label} bot, ${BOT_AVATAR_STATE_LABELS[stateKey]}`;

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    width: box,
    height: box,
    flex: 'none',
    ...(fused
      ? {
          borderRadius: '50%',
          boxShadow: `0 0 0 ${Math.max(1, glowIntensity * 2)}px ${glowColor}66, 0 0 ${
            12 * glowIntensity
          }px ${glowColor}44`,
        }
      : {}),
    ...style,
  };

  const canvasStyle: React.CSSProperties = {
    position: 'absolute',
    width: canvasPx,
    height: canvasPx,
    left: pull(side),
    top: pull(side + BOT_AVATAR_RISE),
    maxWidth: 'none',
  };

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0',
        fused && 'rounded-full',
        fused && 'transition-shadow duration-300',
        className
      )}
      style={wrapperStyle}
      data-bot-avatar={type}
      data-state={stateKey}
      data-fused={fused ? '1' : undefined}
      data-fusion-effect={activeFusion[0]?.sourceEffect}
      data-fusion-slot={activeFusion[0]?.targetSlot}
    >
      {fused && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute -inset-[3px] rounded-full z-0',
            activeFusion.some((f) => f.trigger === 'hover') && 'group-hover:opacity-100'
          )}
          style={{
            boxShadow: `0 0 ${10 * glowIntensity}px ${glowColor}55`,
            opacity: 0.55 + glowIntensity * 0.45,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={aria}
        className="relative z-10 block cursor-default"
        style={canvasStyle}
        onClick={handleClick}
        {...rest}
      />
    </span>
  );
};

BotAvatar.displayName = 'BotAvatar';
