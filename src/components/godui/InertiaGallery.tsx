'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type InertiaGalleryItem = {
  image: string;
  title?: string;
};

export type InertiaGalleryProps = {
  items: InertiaGalleryItem[];
  theme: ThemeColors;
  className?: string;
};

export const InertiaGallery: React.FC<InertiaGalleryProps> = ({
  items,
  theme,
  className,
}) => {
  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const velocity = React.useRef(0);
  const lastX = React.useRef(0);
  const lastTime = React.useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.clientX - lastX.current) / dt;
    }
    lastX.current = e.clientX;
    lastTime.current = now;
    x.set(x.get() + (e.clientX - startX.current));
    startX.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    const momentum = velocity.current * 500;
    animate(x, x.get() + momentum, { type: 'inertia', bounceStiffness: 300, bounceDamping: 30 });
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={cn('overflow-hidden cursor-grab active:cursor-grabbing', className)}
    >
      <motion.div style={{ x }} className="flex gap-4 px-4 py-2">
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
            <img src={item.image} alt="" className="w-full h-full object-cover" />
            {item.title && (
              <div className="p-2 text-xs text-zinc-300">{item.title}</div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
