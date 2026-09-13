'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type LiquidMetaballsProps = {
  count?: number;
  theme: ThemeColors;
  className?: string;
};

export const LiquidMetaballs: React.FC<LiquidMetaballsProps> = ({
  count = 5,
  theme,
  className,
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg className="hidden">
        <defs>
          <filter id="metaball-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: 'url(#metaball-filter)' }}>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full"
            style={{
              width: 40 + Math.random() * 60,
              height: 40 + Math.random() * 60,
              backgroundColor: `${theme.primary}80`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
