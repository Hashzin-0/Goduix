'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ScrollRevealProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  theme: ThemeColors;
  className?: string;
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  theme,
  className,
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
