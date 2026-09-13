'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ThreeDMarqueeItem = {
  image: string;
};

export type ThreeDMarqueeProps = {
  items: ThreeDMarqueeItem[];
  speed?: number;
  theme: ThemeColors;
  className?: string;
};

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  items,
  speed = 20,
  theme,
  className,
}) => {
  return (
    <div className={cn('overflow-hidden [perspective:800px]', className)}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 [transform-style:preserve-3d]"
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden [transform:rotateY(15deg)]"
            style={{ transform: `rotateY(15deg) translateZ(${(i % 3) * 10}px)` }}
          >
            <img src={item.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
