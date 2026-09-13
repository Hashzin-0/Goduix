'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type FluidCursorProps = {
  theme: ThemeColors;
  className?: string;
};

export const FluidCursor: React.FC<FluidCursorProps> = ({
  theme,
  className,
}) => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      animate={{ x: pos.x - 100, y: pos.y - 100 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={cn('fixed pointer-events-none z-50 w-48 h-48 rounded-full', className)}
      style={{
        background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
        opacity: 0.4,
      }}
    />
  );
};
