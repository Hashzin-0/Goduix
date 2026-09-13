'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type BorderBeamProps = {
  duration?: number;
  borderWidth?: number;
  theme: ThemeColors;
  className?: string;
  children?: React.ReactNode;
};

export const BorderBeam: React.FC<BorderBeamProps> = ({
  duration = 3,
  borderWidth = 2,
  theme,
  className,
  children,
}) => {
  return (
    <div className={cn('relative', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-1 rounded-2xl"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${theme.primary}, transparent)`,
          opacity: 0.5,
        }}
      />
      <div className="relative rounded-2xl bg-zinc-950 p-[1px]">
        {children}
      </div>
    </div>
  );
};
