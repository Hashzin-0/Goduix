'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ConfettiProps = {
  count?: number;
  active?: boolean;
  theme: ThemeColors;
  className?: string;
};

export const Confetti: React.FC<ConfettiProps> = ({
  count = 50,
  active = true,
  theme,
  className,
}) => {
  if (!active) return null;

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-50', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: Math.random() * 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
          className="absolute w-2 h-3 rounded-sm"
          style={{
            backgroundColor: [theme.primary, theme.accent, '#ff0080', '#00ff80', '#ffff00'][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
};
