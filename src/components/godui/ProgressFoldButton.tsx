'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ProgressFoldButtonProps = {
  label?: string;
  progress?: number;
  foldAngle?: number;
  theme: ThemeColors;
  onClick?: () => void;
  className?: string;
};

export const ProgressFoldButton: React.FC<ProgressFoldButtonProps> = ({
  label = 'Fold & Submit',
  progress = 0,
  foldAngle = 15,
  theme,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-xl font-medium text-white overflow-hidden',
        'bg-zinc-900 border border-white/10 shadow-lg',
        className
      )}
      style={{
        transform: isHovered ? `perspective(800px) rotateX(-${foldAngle}deg)` : undefined,
        transformOrigin: 'bottom center',
        transition: 'transform 0.3s ease',
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-80"
        style={{
          background: `linear-gradient(90deg, ${theme.primary} ${progress}%, transparent ${progress}%)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{label}</span>
    </motion.button>
  );
};
