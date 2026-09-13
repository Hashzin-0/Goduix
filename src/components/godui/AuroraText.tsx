import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface AuroraTextProps {
  text: string;
  theme: ThemeColors;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AuroraText: React.FC<AuroraTextProps> = ({
  text,
  theme,
  className,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl font-bold tracking-tight',
    md: 'text-3xl md:text-5xl font-extrabold tracking-tight',
    lg: 'text-4xl md:text-6xl font-extrabold tracking-tighter',
    xl: 'text-5xl md:text-7xl font-black tracking-tighter',
  }[size];

  return (
    <span
      className={cn(
        "relative inline-block select-none",
        sizeClasses,
        className
      )}
    >
      {/* Background Animated Gradient Text */}
      <span
        className={cn(
          "bg-clip-text text-transparent bg-gradient-to-r",
          theme.gradient,
          "animate-[shimmer_5s_ease-in-out_infinite] bg-[length:200%_auto]"
        )}
      >
        {text}
      </span>

      {/* Subtle Aurora Bloom blur behind */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 blur-2xl opacity-40 bg-clip-text text-transparent bg-gradient-to-r pointer-events-none",
          theme.gradient
        )}
      >
        {text}
      </span>
    </span>
  );
};
