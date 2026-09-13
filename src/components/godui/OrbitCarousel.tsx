'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type OrbitCarouselItem = {
  image: string;
  title?: string;
};

export type OrbitCarouselProps = {
  items: OrbitCarouselItem[];
  theme: ThemeColors;
  className?: string;
};

export const OrbitCarousel: React.FC<OrbitCarouselProps> = ({
  items,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(0);

  return (
    <div className={cn('relative h-80 w-80 mx-auto', className)}>
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        const isActive = i === active;

        return (
          <motion.div
            key={i}
            animate={{
              rotate: angle,
              translateZ: isActive ? 100 : 0,
              scale: isActive ? 1.2 : 0.8,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={() => setActive(i)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-white/20"
            style={{ transformOrigin: '0 0' }}
          >
            <img src={item.image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
};
