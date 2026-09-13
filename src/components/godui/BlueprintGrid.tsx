import React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface BlueprintGridProps {
  gridSize?: number;
  glowIntensity?: number;
  showCoordinates?: boolean;
  theme: ThemeColors;
  className?: string;
}

export const BlueprintGrid: React.FC<BlueprintGridProps> = ({
  gridSize = 32,
  glowIntensity = 0.6,
  showCoordinates = true,
  theme,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden z-0",
        className
      )}
    >
      {/* Central radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.primary} 0%, transparent 70%)`,
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Blueprint grid lines */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)',
        }}
      />

      {/* Crosshair markers in corners */}
      {showCoordinates && (
        <div className="absolute top-6 left-8 flex items-center gap-2 font-mono text-[10px] text-zinc-600 select-none opacity-60">
          <span>+ GRID 00:32</span>
          <span>•</span>
          <span>LAT 45.184</span>
        </div>
      )}
    </div>
  );
};
