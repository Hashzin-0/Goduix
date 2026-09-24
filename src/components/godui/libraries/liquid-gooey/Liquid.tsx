import React from 'react';
import { cn } from '../../../../lib/utils';

/**
 * Shared SVG goo filter (silhouette-layer architecture from liquid-gooey):
 * blur + alpha contrast merges touching blobs while content stays crisp on top.
 */
export const LiquidGooeyFilter: React.FC<{
  id?: string;
  blur?: number;
  contrast?: number;
  className?: string;
}> = ({ id = 'godui-liquid-gooey', blur = 6, contrast = 18, className }) => (
  <svg
    className={cn('absolute w-0 h-0', className)}
    aria-hidden
    focusable="false"
  >
    <defs>
      <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} -${contrast * 0.35}`}
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
);

export interface LiquidItemMotion {
  x?: number;
  y?: number;
  scale?: number;
  /** Spring-ish transition in ms for component-driven motion. */
  duration?: number;
  delay?: number;
}

export interface LiquidItemProps {
  x?: number;
  y?: number;
  scale?: number;
  transition?: 'snappy' | 'smooth' | 'bouncy';
  delay?: number;
  /** 'morph' merges on contact; 'move' trails with velocity stretch. */
  effect?: 'morph' | 'move';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const TRANSITION_MS = {
  snappy: 180,
  smooth: 320,
  bouncy: 420,
} as const;

/**
 * Component-driven liquid item: content rides on top (crisp), silhouette
 * bridges when items touch (filter on the group). Motion uses transform only.
 */
export const LiquidItem: React.FC<LiquidItemProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  transition = 'bouncy',
  delay = 0,
  effect = 'morph',
  className,
  style,
  children,
}) => {
  const ms = TRANSITION_MS[transition] ?? TRANSITION_MS.bouncy;
  return (
    <div
      className={cn('relative z-10 will-change-transform', className)}
      data-liquid-effect={effect}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transition: `transform ${ms}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export interface LiquidGroupProps {
  /** Goo blur sigma — higher bridges from farther away. */
  blur?: number;
  contrast?: number;
  /** Silhouette color (content should be transparent). */
  fill?: string;
  shadow?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Group that runs the goo filter on its silhouette layer. */
export const LiquidGroup: React.FC<LiquidGroupProps> = ({
  blur = 6,
  contrast = 18,
  fill,
  shadow,
  className,
  style,
  children,
}) => {
  const filterId = React.useId().replace(/:/g, '');
  return (
    <div className={cn('relative', className)} style={style}>
      <LiquidGooeyFilter id={`goo-${filterId}`} blur={blur} contrast={contrast} />
      <div
        className="relative"
        style={{
          filter: `url(#goo-${filterId})`,
          ...(fill ? { color: fill } : {}),
          ...(shadow ? { filter: `url(#goo-${filterId})`, boxShadow: shadow } : {}),
        }}
        data-liquid-fill={fill}
      >
        {children}
      </div>
      {/* Crisp content overlay pattern: children render twice is costly —
          instead items inside are transparent-bg and the filtered layer is the visual surface. */}
    </div>
  );
};
