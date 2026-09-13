import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface JellyButtonProps {
  label?: string;
  squishIntensity?: number; // 0.1 to 1.0
  theme: ThemeColors;
  onClick?: () => void;
  className?: string;
}

export const JellyButton: React.FC<JellyButtonProps> = ({
  label = 'Squishy Jelly',
  squishIntensity = 0.8,
  theme,
  onClick,
  className,
}) => {
  const [isJiggling, setIsJiggling] = useState(false);

  const handleClick = () => {
    setIsJiggling(true);
    setTimeout(() => setIsJiggling(false), 600);
    onClick?.();
  };

  const squishX = 1 + 0.3 * squishIntensity;
  const squishY = 1 - 0.25 * squishIntensity;

  return (
    <div className="relative inline-flex items-center justify-center p-2">
      <motion.button
        onClick={handleClick}
        animate={
          isJiggling
            ? {
                scaleX: [1, squishX, 0.9, 1.1, 0.96, 1],
                scaleY: [1, squishY, 1.15, 0.92, 1.04, 1],
              }
            : { scaleX: 1, scaleY: 1 }
        }
        whileHover={{
          scaleX: 1.05,
          scaleY: 0.96,
          transition: { type: 'spring', stiffness: 400, damping: 12 },
        }}
        whileTap={{
          scaleX: squishX,
          scaleY: squishY,
          transition: { type: 'spring', stiffness: 500, damping: 10 },
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 14 }}
        className={cn(
          "relative px-6 py-3 rounded-2xl font-semibold text-xs tracking-wide select-none cursor-pointer",
          "bg-gradient-to-b from-white/15 to-white/5 border border-white/20 text-white",
          "shadow-lg backdrop-blur-md overflow-hidden transition-colors group",
          className
        )}
        style={{
          boxShadow: `0 8px 30px -6px ${theme.glow}, inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Specular gelatin highlight curved bubble */}
        <div className="absolute top-1 inset-x-3 h-2.5 rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none opacity-80" />

        {/* Jelly colored core glow */}
        <div 
          className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity blur-md"
          style={{
            background: `radial-gradient(circle at 50% 120%, ${theme.primary}, transparent 70%)`
          }}
        />

        <span className="relative z-10 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>{label}</span>
        </span>
      </motion.button>
    </div>
  );
};
