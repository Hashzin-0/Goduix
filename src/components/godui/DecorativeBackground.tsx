'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type DecorativeBackgroundProps = {
  variant?: 'dots' | 'grid' | 'waves';
  theme: ThemeColors;
  className?: string;
};

export const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
  variant = 'dots',
  theme,
  className,
}) => {
  const patterns = {
    dots: `radial-gradient(${theme.primary}15 1px, transparent 1px)`,
    grid: `linear-gradient(${theme.primary}10 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}10 1px, transparent 1px)`,
    waves: `repeating-linear-gradient(45deg, ${theme.primary}05, ${theme.primary}05 10px, transparent 10px, transparent 20px)`,
  };

  const sizes = {
    dots: '20px 20px',
    grid: '40px 40px',
    waves: 'auto',
  };

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: patterns[variant],
        backgroundSize: sizes[variant],
      }}
    />
  );
};
