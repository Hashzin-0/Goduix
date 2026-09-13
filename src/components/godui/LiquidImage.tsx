'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type LiquidImageProps = {
  src: string;
  alt?: string;
  theme: ThemeColors;
  className?: string;
};

export const LiquidImage: React.FC<LiquidImageProps> = ({
  src,
  alt = '',
  theme,
  className,
}) => {
  return (
    <div className={cn('relative rounded-2xl overflow-hidden', className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}40, transparent, ${theme.accent}40)`,
        }}
      />
    </div>
  );
};
