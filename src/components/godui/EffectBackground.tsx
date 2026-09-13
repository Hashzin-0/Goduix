'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type EffectBackgroundProps = {
  children: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const EffectBackground: React.FC<EffectBackgroundProps> = ({
  children,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, ${theme.primary}20, transparent 50%)`,
            `radial-gradient(circle at 80% 50%, ${theme.accent}20, transparent 50%)`,
            `radial-gradient(circle at 20% 50%, ${theme.primary}20, transparent 50%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
