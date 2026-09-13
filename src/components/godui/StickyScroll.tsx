'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type StickyScrollItem = {
  title: string;
  content: string;
};

export type StickyScrollProps = {
  items: StickyScrollItem[];
  theme: ThemeColors;
  className?: string;
};

export const StickyScroll: React.FC<StickyScrollProps> = ({
  items,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {items.map((item, i) => (
        <div key={i} className="min-h-[50vh] flex items-center">
          <div className="sticky top-1/4 max-w-md mx-auto p-8 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-sm text-zinc-400 mt-2">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
