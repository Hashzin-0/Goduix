'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type GooeyStackItem = {
  title: string;
  color?: string;
};

export type GooeyStackProps = {
  items: GooeyStackItem[];
  theme: ThemeColors;
  className?: string;
};

export const GooeyStack: React.FC<GooeyStackProps> = ({
  items,
  theme,
  className,
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  
  return (
    <div className={cn('relative', className)}>
      <svg className="hidden">
        <defs>
          <filter id="gooey-stack-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: 'url(#gooey-stack-filter)' }} className="relative">
        {items.map((item, i) => (
          <motion.div
            key={i}
            animate={{
              y: hovered === i ? -10 : (items.length - 1 - i) * 4,
              scale: hovered === i ? 1.05 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'relative h-14 rounded-2xl flex items-center justify-center cursor-pointer',
              'text-white font-medium text-sm'
            )}
            style={{ backgroundColor: item.color || theme.primary }}
          >
            {item.title}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
