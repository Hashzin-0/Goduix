'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SplitFlapDisplayProps = {
  text: string;
  theme: ThemeColors;
  className?: string;
};

export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  text,
  theme,
  className,
}) => {
  return (
    <div className={cn('flex gap-1', className)}>
      {text.split('').map((char, i) => (
        <div
          key={i}
          className="relative w-10 h-14 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
            {char}
          </div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/30" />
        </div>
      ))}
    </div>
  );
};
