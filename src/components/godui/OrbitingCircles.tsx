'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type OrbitingCirclesProps = {
  orbits?: number;
  itemsPerOrbit?: number;
  theme: ThemeColors;
  className?: string;
};

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  orbits = 3,
  itemsPerOrbit = 6,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative w-64 h-64', className)}>
      {Array.from({ length: orbits }).map((_, orbitIndex) => {
        const radius = 60 + orbitIndex * 35;
        const duration = 10 + orbitIndex * 5;
        
        return (
          <motion.div
            key={orbitIndex}
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div
              className="absolute rounded-full border border-white/5"
              style={{
                width: radius * 2,
                height: radius * 2,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            {Array.from({ length: itemsPerOrbit }).map((_, itemIndex) => {
              const angle = (itemIndex / itemsPerOrbit) * Math.PI * 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={itemIndex}
                  className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: theme.primary,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    opacity: 0.3 + (orbitIndex * 0.2),
                  }}
                />
              );
            })}
          </motion.div>
        );
      })}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
    </div>
  );
};
