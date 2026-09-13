'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type AnimatedTooltipProps = {
  content: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
};

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  content,
  side = 'top',
  theme,
  children,
  className,
}) => {
  const [visible, setVisible] = React.useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              'absolute z-50 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
              'bg-zinc-800 text-white border border-white/10 shadow-xl',
              positionClasses[side]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
