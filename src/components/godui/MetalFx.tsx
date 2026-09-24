'use client';

import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import {
  MetalPreset,
  MetalVariant,
  resolveBorderRadius,
  resolveMetalPalette,
  textGradient,
} from './libraries/metal-fx/metalPalettes';
import { MetalRing } from './libraries/metal-fx/MetalRing';

export interface MetalFxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme: ThemeColors;
  children?: React.ReactNode;
  variant?: MetalVariant;
  preset?: MetalPreset;
  strength?: number;
  paused?: boolean;
  borderRadius?: number;
  label?: string;
  fusions?: ComponentFusion[];
}

const FUSION_SLOTS = ['border', 'active-item', 'badge'] as const;

function clamp01(n: number, fallback = 1): number {
  if (n === undefined || !Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}

function findMetalFusion(fusions: ComponentFusion[] | undefined) {
  if (!fusions?.length) return null;
  return (
    fusions.find(
      (f) =>
        f.active &&
        f.sourceEffect === 'metal-rim' &&
        (FUSION_SLOTS as readonly string[]).includes(f.targetSlot)
    ) ?? null
  );
}

const STYLE_ID = 'godui-metal-fx-keyframes';

const KEYFRAMES = `@keyframes metal-fx-orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes metal-fx-orbit-rev{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
@keyframes metal-fx-sheen{from{background-position:200% 0}to{background-position:-200% 0}}`;

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

export const MetalFx: React.FC<MetalFxProps> = ({
  theme,
  children,
  variant = 'button' as MetalVariant,
  preset = 'chromatic' as MetalPreset,
  strength = 1,
  paused = false,
  borderRadius,
  label,
  fusions,
  className,
  onMouseMove,
  onMouseLeave,
  style,
  ...rest
}) => {
  const reduced = useReducedMotion() ?? false;
  const hostRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const [measuredRadius, setMeasuredRadius] = React.useState<
    number | undefined
  >(undefined);

  const metalFusion = React.useMemo(
    () => findMetalFusion(fusions),
    [fusions]
  );

  const palette = React.useMemo(
    () =>
      resolveMetalPalette(
        preset as MetalPreset,
        theme,
        metalFusion?.customColor ?? undefined
      ),
    [preset, theme, metalFusion?.customColor]
  );

  const baseStrength = clamp01(strength, 1);
  const effectiveStrength = metalFusion
    ? Math.max(
        baseStrength,
        clamp01(0.4 + 0.6 * clamp01(metalFusion.intensity, 0.8), 0.8)
      )
    : baseStrength;

  React.useEffect(() => {
    ensureKeyframes();
  }, []);

  React.useEffect(() => {
    if (borderRadius !== undefined) return;
    const target = childRef.current;
    if (!target) return;

    const update = () => {
      const raw = window.getComputedStyle(target).borderRadius;
      const first = raw?.trim().split(/[\s/]+/)[0];
      if (!first) {
        setMeasuredRadius(undefined);
        return;
      }
      if (first.endsWith('%')) {
        const pct = Number.parseFloat(first);
        setMeasuredRadius(
          Number.isFinite(pct) && pct >= 40 ? 9999 : undefined
        );
        return;
      }
      const px = Number.parseFloat(first);
      setMeasuredRadius(Number.isFinite(px) ? px : undefined);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(target);
    return () => ro.disconnect();
  }, [borderRadius, children, variant]);

  const resolvedRadius = resolveBorderRadius(
    variant as MetalVariant,
    borderRadius,
    measuredRadius
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = hostRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        el.style.setProperty(
          '--mx',
          `${((e.clientX - rect.left) / rect.width) * 100}%`
        );
        el.style.setProperty(
          '--my',
          `${((e.clientY - rect.top) / rect.height) * 100}%`
        );
      }
    }
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = hostRef.current;
    if (el) {
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    }
    onMouseLeave?.(e);
  };

  const radiusStyle = {
    borderRadius: `${resolvedRadius}px`,
  } as const;

  const orbiting = effectiveStrength > 0 && !reduced;
  const playState = paused ? 'paused' : 'running';

  const textStyle: React.CSSProperties = {
    ...radiusStyle,
    backgroundImage: textGradient(palette),
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: orbiting
      ? 'metal-fx-sheen 5.2s ease-in-out infinite'
      : undefined,
    animationPlayState: orbiting ? playState : undefined,
  };

  const textChild =
    variant === 'text'
      ? typeof children === 'string'
        ? children
        : children == null || children === false
          ? label
          : null
      : null;

  if (variant === 'text' && textChild) {
    return (
      <div
        ref={hostRef}
        data-metal-fx="text"
        data-metal-fusion={
          metalFusion
            ? `${metalFusion.sourceEffect}:${metalFusion.targetSlot}`
            : undefined
        }
        className={cn('relative inline-flex select-none', className)}
        style={
          {
            ...radiusStyle,
            ...style,
            ['--mx' as string]: '50%',
            ['--my' as string]: '50%',
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <MetalRing
          strength={effectiveStrength}
          paused={paused}
          variant="text"
          palette={palette}
          borderRadius={resolvedRadius}
        />
        <span className="relative z-10" style={textStyle}>
          {textChild}
        </span>
      </div>
    );
  }

  const badgeContent =
    variant === 'badge'
      ? children != null && children !== false
        ? children
        : label
      : null;

  return (
    <div
      ref={hostRef}
      data-metal-fx={variant}
      data-metal-fusion={
        metalFusion
          ? `${metalFusion.sourceEffect}:${metalFusion.targetSlot}`
          : undefined
      }
      className={cn(
        'relative inline-flex items-center justify-center',
        variant === 'button' || variant === 'circle' || variant === 'badge'
          ? 'isolate'
          : undefined,
        className
      )}
      style={
        {
          ...radiusStyle,
          ...style,
          ['--mx' as string]: '50%',
          ['--my' as string]: '50%',
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {variant === 'badge' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            ...radiusStyle,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(248,250,252,0.92) 55%, rgba(226,232,240,0.95) 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 2px rgba(15,23,42,0.12)',
          }}
        />
      )}

      <MetalRing
        strength={effectiveStrength}
        paused={paused}
        variant={variant}
        palette={palette}
        borderRadius={resolvedRadius}
      />

      <div
        ref={childRef}
        className={cn(
          'relative',
          variant === 'badge' ? 'z-10' : 'z-[1]',
          variant === 'badge' &&
            'px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-zinc-900',
          variant === 'circle' && 'flex items-center justify-center'
        )}
        style={variant === 'badge' && !children && label ? radiusStyle : undefined}
      >
        {badgeContent ?? children ?? (label ? label : null)}
      </div>
    </div>
  );
};

MetalFx.displayName = 'MetalFx';
