'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SwipeDeckItem = {
  image?: string;
  title: string;
  description?: string;
};

export type SwipeDeckProps = {
  items: SwipeDeckItem[];
  theme: ThemeColors;
  onSwipe?: (direction: 'left' | 'right', index: number) => void;
  className?: string;
};

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  items,
  theme,
  onSwipe,
  className,
}) => {
  const [current, setCurrent] = React.useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe?.(direction, current);
      setCurrent(prev => Math.min(prev + 1, items.length - 1));
    }
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 });
  };

  if (current >= items.length) {
    return <div className={cn('text-center text-zinc-500 py-12', className)}>Fim do deck</div>;
  }

  return (
    <div className={cn('relative h-80 w-64 mx-auto', className)}>
      {items.slice(current, current + 3).reverse().map((item, i) => {
        const realIndex = items.length - 1 - i;
        return (
          <motion.div
            key={current + realIndex}
            drag={i === 0 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{
              x: i === 0 ? x : 0,
              rotate: i === 0 ? rotate : 0,
              scale: 1 - i * 0.05,
              zIndex: 10 - i,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 cursor-grab active:cursor-grabbing"
          >
            {item.image && <img src={item.image} alt="" className="w-full h-1/2 object-cover" />}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              {item.description && <p className="text-xs text-zinc-400 mt-1">{item.description}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
