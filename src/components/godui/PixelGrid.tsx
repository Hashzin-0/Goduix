'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type PixelGridProps = {
  pixelSize?: number;
  theme: ThemeColors;
  className?: string;
};

export const PixelGrid: React.FC<PixelGridProps> = ({
  pixelSize = 4,
  theme,
  className,
}) => {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${theme.primary}10 1px, transparent 1px), linear-gradient(to bottom, ${theme.primary}10 1px, transparent 1px)`,
        backgroundSize: `${pixelSize}px ${pixelSize}px`,
      }}
    />
  );
};
