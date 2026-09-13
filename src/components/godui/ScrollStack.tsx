'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ScrollStackItem = {
  title: string;
  content?: string;
};

export type ScrollStackProps = {
  items: ScrollStackItem[];
  theme: ThemeColors;
  className?: string;
};

export const ScrollStack: React.FC<ScrollStackProps> = ({
  items,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {items.map((item, i) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
        const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
        const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
        
        return (
          <motion.div
            key={i}
            ref={ref}
            style={{ y, opacity }}
            className="sticky top-20 mb-8"
          >
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              {item.content && <p className="text-sm text-zinc-400 mt-2">{item.content}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
