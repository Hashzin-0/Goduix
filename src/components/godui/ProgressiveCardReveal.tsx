'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ProgressiveCardRevealItem = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export type ProgressiveCardRevealProps = {
  items: ProgressiveCardRevealItem[];
  theme: ThemeColors;
  className?: string;
};

export const ProgressiveCardReveal: React.FC<ProgressiveCardRevealProps> = ({
  items,
  theme,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10"
        >
          {item.icon && <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}20` }}>{item.icon}</div>}
          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
          {item.description && <p className="text-xs text-zinc-400 mt-2">{item.description}</p>}
        </motion.div>
      ))}
    </div>
  );
};
