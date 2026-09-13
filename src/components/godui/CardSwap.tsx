'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type CardSwapItem = {
  title: string;
  description?: string;
  image?: string;
};

export type CardSwapProps = {
  items: CardSwapItem[];
  theme: ThemeColors;
  className?: string;
};

export const CardSwap: React.FC<CardSwapProps> = ({
  items,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className={cn('relative h-64 w-full max-w-sm mx-auto', className)}>
      {items.map((item, i) => {
        const offset = (i - active + items.length) % items.length;
        const isActive = offset === 0;

        return (
          <motion.div
            key={i}
            animate={{
              x: offset * 20,
              scale: isActive ? 1 : 0.9 - offset * 0.05,
              opacity: isActive ? 1 : 0.5 - offset * 0.1,
              zIndex: items.length - offset,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              'absolute inset-0 rounded-2xl overflow-hidden',
              'bg-zinc-900 border border-white/10'
            )}
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
