'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type LiquidGlassLensProps = {
  children: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const LiquidGlassLens: React.FC<LiquidGlassLensProps> = ({
  children,
  theme,
  className,
}) => {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'relative rounded-full overflow-hidden p-8',
        'bg-white/5 backdrop-blur-2xl border border-white/20',
        className
      )}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${theme.primary}20, transparent 60%)`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
