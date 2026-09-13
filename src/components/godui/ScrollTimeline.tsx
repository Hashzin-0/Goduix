'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ScrollTimelineItem = {
  title: string;
  description?: string;
};

export type ScrollTimelineProps = {
  items: ScrollTimelineItem[];
  theme: ThemeColors;
  className?: string;
};

export const ScrollTimeline: React.FC<ScrollTimelineProps> = ({
  items,
  theme,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn('relative pl-8', className)}>
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-zinc-800">
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="w-full bg-gradient-to-b"
          style={{ background: `linear-gradient(to bottom, ${theme.primary}, ${theme.accent})` }}
        />
      </div>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative pb-8"
        >
          <div
            className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-zinc-900"
            style={{ backgroundColor: theme.primary }}
          />
          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
          {item.description && <p className="text-xs text-zinc-400 mt-1">{item.description}</p>}
        </motion.div>
      ))}
    </div>
  );
};
