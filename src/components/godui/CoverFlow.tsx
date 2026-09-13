'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type CoverFlowItem = {
  title: string;
  image?: string;
};

export type CoverFlowProps = {
  items: CoverFlowItem[];
  theme: ThemeColors;
  className?: string;
};

export const CoverFlow: React.FC<CoverFlowProps> = ({
  items,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(0);
  
  return (
    <div className={cn('relative h-64 flex items-center justify-center', className)}>
      <button
        onClick={() => setActive(Math.max(0, active - 1))}
        className="absolute left-4 z-50 p-2 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700"
      >
        ←
      </button>
      <div className="relative w-64 h-48" style={{ perspective: '1000px' }}>
        {items.map((item, i) => {
          const offset = i - active;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          
          return (
            <motion.div
              key={i}
              animate={{
                x: offset * 80,
                rotateY: offset * -25,
                scale: isActive ? 1 : 0.8 - absOffset * 0.1,
                opacity: absOffset > 2 ? 0 : 1,
                zIndex: items.length - absOffset,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                'absolute inset-0 rounded-2xl overflow-hidden',
                'bg-zinc-900 border border-white/10'
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-sm font-medium text-white">{item.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <button
        onClick={() => setActive(Math.min(items.length - 1, active + 1))}
        className="absolute right-4 z-50 p-2 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700"
      >
        →
      </button>
    </div>
  );
};
