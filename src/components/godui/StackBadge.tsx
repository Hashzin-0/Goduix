'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type StackBadgeItem = {
  label: string;
  color?: string;
};

export type StackBadgeProps = {
  items: StackBadgeItem[];
  theme: ThemeColors;
  className?: string;
};

export const StackBadge: React.FC<StackBadgeProps> = ({
  items,
  theme,
  className,
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          animate={{
            y: hovered === i ? -8 : 0,
            scale: hovered === i ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="px-4 py-2 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: item.color || theme.primary }}
        >
          {item.label}
        </motion.div>
      ))}
    </div>
  );
};
