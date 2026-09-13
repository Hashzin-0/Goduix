'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type WorldMapPoint = {
  x: number;
  y: number;
  label?: string;
};

export type WorldMapProps = {
  points?: WorldMapPoint[];
  theme: ThemeColors;
  className?: string;
};

export const WorldMap: React.FC<WorldMapProps> = ({
  points = [],
  theme,
  className,
}) => {
  return (
    <div className={cn('relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-zinc-950', className)}>
      <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20">
        <path
          d="M150,200 Q200,150 250,180 T350,160 T450,200 T550,180 T650,200 T750,160 T850,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-zinc-600"
        />
      </svg>
      {points.map((point, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            backgroundColor: theme.primary,
            boxShadow: `0 0 10px ${theme.glow}`,
          }}
        >
          {point.label && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-zinc-400">
              {point.label}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
