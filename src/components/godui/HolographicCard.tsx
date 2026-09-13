'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type HolographicCardProps = {
  title?: string;
  children?: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const HolographicCard: React.FC<HolographicCardProps> = ({
  title,
  children,
  theme,
  className,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative rounded-2xl overflow-hidden p-6',
        'bg-zinc-900 border border-white/10',
        className
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `linear-gradient(${mousePos.x * 360}deg,
            ${theme.primary}40,
            transparent 40%,
            #ff008040 50%,
            transparent 60%,
            #00ff8040)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, white, transparent 50%)`,
        }}
      />
      {title && <h3 className="relative z-10 text-lg font-bold text-white">{title}</h3>}
      {children && <div className="relative z-10 mt-2">{children}</div>}
    </motion.div>
  );
};
