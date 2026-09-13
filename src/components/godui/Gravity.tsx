'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type GravityProps = {
  count?: number;
  theme: ThemeColors;
  className?: string;
};

export const Gravity: React.FC<GravityProps> = ({
  count = 20,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative h-64 overflow-hidden rounded-2xl bg-zinc-950', className)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary, boxShadow: `0 0 40px ${theme.glow}` }} />
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 80 + Math.random() * 60;
        
        return (
          <motion.div
            key={i}
            animate={{
              x: [Math.cos(angle) * radius, 0, Math.cos(angle) * radius * 0.8],
              y: [Math.sin(angle) * radius, 0, Math.sin(angle) * radius * 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: theme.accent, opacity: 0.6 }}
          />
        );
      })}
    </div>
  );
};
