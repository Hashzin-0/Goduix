import React, { useEffect, useRef, useState } from 'react';
import { ThemeColors } from '../../../types';
import { ComponentFusion, FusionTargetSlot } from '../../../types/builder';
import { cn } from '../../../lib/utils';
import { FusionProvider, useFusionContext } from './FusionContext';
import {
  FusionVisual,
  isContainerSlot,
  resolveFusionVisual,
  triggerGroupClass,
} from './fusionVisuals';

interface FusionWrapperProps {
  fusions?: ComponentFusion[];
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
}

function useClickTrigger(enabled: boolean) {
  const [clicked, setClicked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enabled]);

  const onMouseDown = () => {
    if (!enabled) return;
    setClicked(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setClicked(false), 450);
  };

  return { clicked, onMouseDown };
}

function FusionLayers({ visuals }: { visuals: FusionVisual[] }) {
  const backgrounds = visuals.filter((v) => v.background);
  const glows = visuals.filter((v) => v.glow);
  const borders = visuals.filter((v) => v.border);
  const shines = visuals.filter((v) => v.shine);

  return (
    <>
      {glows.map((v) => (
        <div
          key={`glow-${v.key}`}
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] z-0',
            triggerGroupClass(v.fusion)
          )}
          style={v.glow?.style}
        />
      ))}
      {backgrounds.map((v) => (
        <div
          key={`bg-${v.key}`}
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] z-0',
            v.background?.className,
            triggerGroupClass(v.fusion)
          )}
          style={v.background?.style}
        />
      ))}
      {borders.map((v) => (
        <div
          key={`border-${v.key}`}
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] z-20 border border-transparent p-px',
            v.border?.className,
            v.border?.animated === 'spin' &&
              'after:hidden animate-[fusion-spin-border_3.5s_linear_infinite] [background-clip:padding-box]',
            v.border?.animated === 'pulse' &&
              'animate-[fusion-pulse-border_2.4s_ease-in-out_infinite]',
            triggerGroupClass(v.fusion)
          )}
          style={{
            ...v.border?.style,
            // paint animated border effects via background layers on a ring element
            ...(v.border?.animated === 'spin' || v.border?.animated === 'pulse'
              ? {}
              : {}),
            ...(v.border?.animated
              ? {
                  // use mask so animated gradient only shows on the ring
                  WebkitMask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '1px',
                }
              : {}),
          }}
        />
      ))}
      {shines.map((v) => (
        <div
          key={`shine-${v.key}`}
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-30',
            v.shine?.animated === 'sweep' &&
              'animate-[fusion-sweep_2.8s_cubic-bezier(0.77,0,0.175,1)_infinite]',
            triggerGroupClass(v.fusion)
          )}
          style={{
            ...v.shine?.style,
            ...(v.shine?.animated === 'sweep'
              ? { backgroundSize: '200% 100%' }
              : {}),
          }}
        />
      ))}
    </>
  );
}

/**
 * Universal fusion layer for ANY GodUI component.
 * - Container slots (border/background/before/after/hover/content) render as overlay layers.
 * - Element slots (title/icon/badge/active-item/...) flow through context via useFusionSlot.
 * - Zero-cost when there are no active fusions.
 */
export const FusionWrapper: React.FC<FusionWrapperProps> = ({
  fusions,
  theme,
  children,
  className,
}) => {
  const active = React.useMemo(
    () => (fusions ?? []).filter((f) => f.active),
    [fusions]
  );

  if (active.length === 0) {
    return <>{children}</>;
  }

  const containerVisuals = active
    .filter((f) => isContainerSlot(f.targetSlot))
    .map((f) => resolveFusionVisual(f, theme));

  const hasClick = active.some((f) => f.trigger === 'click');
  const { clicked, onMouseDown } = useClickTrigger(hasClick);

  const wrapperClasses = cn(
    'group relative',
    containerVisuals.map((v) => v.wrapperClassName),
    className
  );
  const wrapperStyle: React.CSSProperties = {
    ...(containerVisuals.length
      ? containerVisuals.reduce(
          (acc, v) => ({ ...acc, ...v.wrapperStyle }),
          {} as React.CSSProperties
        )
      : {}),
  };

  // Merge border/background onto wrapper itself so rounded corners clip content
  const borderVisuals = containerVisuals.filter((v) => v.border && v.border.animated === 'none');
  const mergedBorderStyle = borderVisuals.reduce(
    (acc, v) => ({ ...acc, ...(v.border?.style ?? {}) }),
    {} as React.CSSProperties
  );
  const mergedBorderClass = borderVisuals
    .map((v) => v.border?.className)
    .filter(Boolean)
    .join(' ');

  const dataFusions = active
    .map((f) => `${f.sourceEffect}:${f.targetSlot}`)
    .join(' ');

  return (
    <FusionProvider fusions={active} theme={theme}>
      <div
        className={cn(wrapperClasses, mergedBorderClass)}
        style={{ ...wrapperStyle, ...mergedBorderStyle }}
        data-fusions={dataFusions}
        data-fused-click={hasClick && clicked ? '1' : undefined}
        onMouseDown={onMouseDown}
      >
        <FusionLayers visuals={containerVisuals} />
        <div className="relative">{children}</div>
      </div>
    </FusionProvider>
  );
};

/** Opt-in precise slot for inner elements (title, icon, badge, active-item...). */
export const FusionSlot: React.FC<{
  slot: FusionTargetSlot;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'span' | 'button';
}> = ({ slot, children, className, style, as = 'div' }) => {
  const ctx = useFusionContext();
  const fusions = (ctx?.fusions ?? []).filter(
    (f) => f.active && f.targetSlot === slot
  );
  const Tag = as as any;

  if (fusions.length === 0 || !ctx) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const visuals = fusions.map((f) => resolveFusionVisual(f, ctx.theme));
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...visuals.reduce(
      (acc, v) => ({ ...acc, ...(v.border?.style ?? {}), ...(v.background?.style ?? {}) }),
      {} as React.CSSProperties
    ),
  };
  const mergedClass = cn(
    className,
    visuals.map((v) => v.border?.className),
    visuals.map((v) => v.background?.className),
    visuals.map((v) => triggerGroupClass(v.fusion))
  );

  return (
    <Tag className={mergedClass} style={mergedStyle} data-fusion-slot-el={slot}>
      {children}
    </Tag>
  );
};

export type { FusionTargetSlot };
