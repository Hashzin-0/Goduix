import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface ScrollGlowContainerProps {
  scrollProgress: number; // 0 to 1
  theme: ThemeColors;
  intensity?: number;
  syncWithMouse?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ScrollGlowContainer: React.FC<ScrollGlowContainerProps> = ({
  scrollProgress,
  theme,
  intensity = 0.8,
  syncWithMouse = true,
  className,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!syncWithMouse || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // Calculate dynamic glow metrics from scroll
  const glowOpacity = Math.min(1, Math.max(0.2, scrollProgress * 1.4)) * intensity;
  const glowSpread = 250 + scrollProgress * 300;
  const beamPosition = scrollProgress * 100;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Scroll-Reactive Top Progress Beam */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-white/10 z-30 pointer-events-none">
        <motion.div
          className="h-full"
          style={{
            width: `${Math.max(5, scrollProgress * 100)}%`,
            backgroundColor: theme.primary,
            boxShadow: `0 0 16px 2px ${theme.glow}, 0 0 30px ${theme.primary}`,
          }}
        />
      </div>

      {/* Dynamic Scroll Spotlight Aurora (reacting to scroll depth and position) */}
      <motion.div
        className="absolute top-0 inset-x-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          height: `${glowSpread}px`,
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at ${mousePos.x}% 0%, ${theme.glow} 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* Secondary Ambient Bottom Halo */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10 transition-opacity duration-500 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${theme.glow} 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};
