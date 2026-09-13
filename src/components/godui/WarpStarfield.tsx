'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type WarpStarfieldProps = {
  count?: number;
  theme: ThemeColors;
  className?: string;
};

export const WarpStarfield: React.FC<WarpStarfieldProps> = ({
  count = 100,
  theme,
  className,
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50%',
            y: '50%',
            opacity: 0,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 200}%`,
            y: `${50 + (Math.random() - 0.5) * 200}%`,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute w-px h-px bg-white"
          style={{
            boxShadow: `0 0 ${2 + Math.random() * 3}px ${theme.primary}`,
          }}
        />
      ))}
    </div>
  );
};
