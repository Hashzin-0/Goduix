'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ImageTrailProps = {
  images: string[];
  theme: ThemeColors;
  className?: string;
};

export const ImageTrail: React.FC<ImageTrailProps> = ({
  images,
  theme,
  className,
}) => {
  const [trail, setTrail] = React.useState<{ x: number; y: number; img: string }[]>([]);
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setTrail(prev => {
        const next = [...prev, { x: e.clientX, y: e.clientY, img: images[indexRef.current % images.length] }];
        indexRef.current++;
        return next.slice(-8);
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [images]);

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-40', className)}>
      {trail.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="absolute w-12 h-12 rounded-lg overflow-hidden -translate-x-1/2 -translate-y-1/2"
          style={{ left: item.x, top: item.y, zIndex: i }}
        >
          <img src={item.img} alt="" className="w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
};
