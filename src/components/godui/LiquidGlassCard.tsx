'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type LiquidGlassCardProps = {
  children: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  theme,
  className,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative rounded-2xl overflow-hidden p-6',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        className
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.2), transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
