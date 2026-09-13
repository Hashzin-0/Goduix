'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SpinViewerProps = {
  images: string[];
  theme: ThemeColors;
  className?: string;
};

export const SpinViewer: React.FC<SpinViewerProps> = ({
  images,
  theme,
  className,
}) => {
  const [current, setCurrent] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startX = React.useRef(0);
  
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 20) {
      setCurrent(prev => (prev + (diff > 0 ? 1 : -1) + images.length) % images.length);
      startX.current = e.clientX;
    }
  };
  
  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      className={cn('relative w-64 h-64 mx-auto cursor-grab active:cursor-grabbing', className)}
    >
      <img
        src={images[current]}
        alt=""
        className="w-full h-full object-contain"
        draggable={false}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={cn('w-1.5 h-1.5 rounded-full transition-colors', i === current ? 'bg-white' : 'bg-white/30')}
          />
        ))}
      </div>
    </div>
  );
};
