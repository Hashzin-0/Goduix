'use client';

import * as React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ScrollProgressProps = {
  theme: ThemeColors;
  className?: string;
};

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  theme,
  className,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className={cn('fixed top-0 left-0 right-0 h-1 z-50 origin-left', className)}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
          boxShadow: `0 0 10px ${theme.glow}`,
        }}
      />
    </motion.div>
  );
};
