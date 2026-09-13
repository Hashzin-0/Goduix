'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ImageAccordionItem = {
  image: string;
  title?: string;
};

export type ImageAccordionProps = {
  items: ImageAccordionItem[];
  theme: ThemeColors;
  className?: string;
};

export const ImageAccordion: React.FC<ImageAccordionProps> = ({
  items,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(0);
  
  return (
    <div className={cn('flex h-64 gap-1', className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          animate={{ flex: active === i ? 3 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onMouseEnter={() => setActive(i)}
          className="relative rounded-xl overflow-hidden cursor-pointer"
        >
          <img src={item.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          {active === i && item.title && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 text-white font-medium"
            >
              {item.title}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
