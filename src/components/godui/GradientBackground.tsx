'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type GradientBackgroundProps = {
  children?: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      <motion.div
        animate={{
          background: [
            `linear-gradient(135deg, ${theme.primary}20, transparent, ${theme.accent}20)`,
            `linear-gradient(225deg, ${theme.primary}20, transparent, ${theme.accent}20)`,
            `linear-gradient(315deg, ${theme.primary}20, transparent, ${theme.accent}20)`,
            `linear-gradient(45deg, ${theme.primary}20, transparent, ${theme.accent}20)`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
