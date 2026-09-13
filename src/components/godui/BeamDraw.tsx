'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type BeamDrawProps = {
  duration?: number;
  theme: ThemeColors;
  className?: string;
};

export const BeamDraw: React.FC<BeamDrawProps> = ({
  duration = 2,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative h-32', className)}>
      <svg className="w-full h-full" viewBox="0 0 400 100">
        <motion.path
          d="M0,50 C50,20 100,80 150,50 S250,20 300,50 S400,80 450,50"
          fill="none"
          stroke={theme.primary}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
