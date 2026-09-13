'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type LightRaysProps = {
  count?: number;
  theme: ThemeColors;
  className?: string;
};

export const LightRays: React.FC<LightRaysProps> = ({
  count = 8,
  theme,
  className,
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const delay = i * 0.2;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.3, 0], scaleY: [0, 1, 0] }}
            transition={{ duration: 3, delay, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 origin-top"
            style={{
              width: '2px',
              height: '100%',
              background: `linear-gradient(to bottom, ${theme.primary}, transparent)`,
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};
