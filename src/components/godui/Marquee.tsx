'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type MarqueeProps = {
  items: string[];
  speed?: number;
  reverse?: boolean;
  theme: ThemeColors;
  className?: string;
};

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 20,
  reverse = false,
  theme,
  className,
}) => {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-lg font-bold text-zinc-400">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
