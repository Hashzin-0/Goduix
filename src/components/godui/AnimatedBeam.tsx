'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type AnimatedBeamProps = {
  direction?: 'horizontal' | 'vertical';
  duration?: number;
  theme: ThemeColors;
  className?: string;
};

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  direction = 'horizontal',
  duration = 2,
  theme,
  className,
}) => {
  const isHorizontal = direction === 'horizontal';
  
  return (
    <div className={cn('relative', isHorizontal ? 'h-px w-full' : 'w-px h-full', className)}>
      <div className="absolute inset-0 bg-white/10" />
      <motion.div
        animate={{
          [isHorizontal ? 'x' : 'y']: ['0%', '100%'],
        }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{
          [isHorizontal ? 'width' : 'height']: '30%',
          [isHorizontal ? 'height' : 'width']: '2px',
          background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, ${theme.primary}, transparent)`,
          boxShadow: `0 0 20px ${theme.glow}`,
        }}
      />
    </div>
  );
};
