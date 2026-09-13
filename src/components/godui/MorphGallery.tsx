'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type MorphGalleryItem = {
  image: string;
  title: string;
  description?: string;
};

export type MorphGalleryProps = {
  items: MorphGalleryItem[];
  theme: ThemeColors;
  className?: string;
};

export const MorphGallery: React.FC<MorphGalleryProps> = ({
  items,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(0);

  return (
    <div className={cn('relative', className)}>
      <div className="relative h-80 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <img src={items[active].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl font-bold text-white">{items[active].title}</h3>
              {items[active].description && (
                <p className="text-sm text-zinc-300 mt-1">{items[active].description}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2 mt-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'flex-1 h-16 rounded-xl overflow-hidden border-2 transition-colors',
              i === active ? 'border-white/40' : 'border-transparent opacity-60 hover:opacity-100'
            )}
          >
            <img src={item.image} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
