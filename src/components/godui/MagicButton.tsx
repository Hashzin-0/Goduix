import React from 'react';
import { motion } from 'motion/react';
import { Wand2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface MagicButtonProps {
  label?: string;
  enableRainbowEdge?: boolean;
  depth?: number;
  theme: ThemeColors;
  onClick?: () => void;
  className?: string;
}

export const MagicButton: React.FC<MagicButtonProps> = ({
  label = 'Magic Button',
  enableRainbowEdge = true,
  depth = 4,
  theme,
  onClick,
  className,
}) => {
  return (
    <div className="relative inline-flex items-center justify-center p-3">
      {/* Outer 3D bounding wrapper */}
      <div className="relative group select-none">
        {/* Animated Rainbow Edge border underneath */}
        {enableRainbowEdge && (
          <div className="absolute -inset-[2px] rounded-2xl overflow-hidden pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
              style={{
                background: 'conic-gradient(from 0deg, #ff4545, #ffaa00, #00ffaa, #00b4d8, #a855f7, #ff4545)',
              }}
            />
          </div>
        )}

        {/* 3D Base Shadow / Bottom Edge */}
        <div 
          className="absolute inset-0 rounded-2xl bg-zinc-950 border border-white/10"
          style={{ transform: `translateY(${depth}px)` }}
        />

        {/* 3D Pushable Front Face */}
        <motion.button
          onClick={onClick}
          whileHover={{ y: -1 }}
          whileTap={{ y: depth, transition: { type: 'spring', stiffness: 600, damping: 20 } }}
          className={cn(
            "relative px-6 py-3 rounded-2xl font-bold text-xs tracking-wide cursor-pointer",
            "bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/20 text-white",
            "shadow-xl flex items-center gap-2.5 transition-colors",
            className
          )}
          style={{
            boxShadow: `0 4px 15px -3px ${theme.glow}, inset 0 1px 1px rgba(255,255,255,0.3)`,
          }}
        >
          <div 
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: theme.primary }}
          />
          <Wand2 className="w-3.5 h-3.5 text-white/90" />
          <span>{label}</span>
        </motion.button>
      </div>
    </div>
  );
};
