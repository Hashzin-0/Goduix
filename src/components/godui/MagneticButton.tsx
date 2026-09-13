import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  label?: string;
  theme: ThemeColors;
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  label,
  theme,
  strength = 0.35,
  className,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.1 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl touch-none",
        "bg-zinc-900/80 border border-white/10 text-xs font-medium text-zinc-200",
        "backdrop-blur-md shadow-md hover:border-white/20 transition-colors cursor-pointer select-none",
        className
      )}
      style={{
        boxShadow: `0 4px 20px -5px ${theme.glow}`,
      }}
      {...(props as any)}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children || label || 'Magnetic Action'}
      </span>
    </motion.button>
  );
};
