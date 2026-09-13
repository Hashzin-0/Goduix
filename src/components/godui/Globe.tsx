'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type GlobeProps = {
  size?: number;
  dots?: number;
  theme: ThemeColors;
  className?: string;
};

export const Globe: React.FC<GlobeProps> = ({
  size = 200,
  dots = 50,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="relative rounded-full border border-white/10"
        style={{
          width: size,
          height: size,
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: dots }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / dots);
          const theta = Math.sqrt(dots * Math.PI) * phi;
          const x = Math.cos(theta) * Math.sin(phi) * (size / 2 - 10);
          const y = Math.sin(theta) * Math.sin(phi) * (size / 2 - 10);
          const z = Math.cos(phi) * (size / 2 - 10);
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: theme.primary,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
                opacity: 0.3 + (z + size / 2) / size * 0.7,
              }}
            />
          );
        })}
      </motion.div>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${theme.primary}10 70%, transparent 100%)`,
        }}
      />
    </div>
  );
};
