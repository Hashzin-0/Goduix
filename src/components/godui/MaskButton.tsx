import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface MaskButtonProps {
  defaultLabel?: string;
  revealedLabel?: string;
  theme: ThemeColors;
  onClick?: () => void;
  className?: string;
}

export const MaskButton: React.FC<MaskButtonProps> = ({
  defaultLabel = 'Hover to Unlock',
  revealedLabel = 'Access Granted ✦',
  theme,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center p-3 select-none">
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative overflow-hidden px-7 py-3 rounded-2xl font-bold text-xs tracking-wider cursor-pointer border border-white/20 transition-all shadow-xl",
          className
        )}
        style={{
          boxShadow: isHovered ? `0 0 25px -4px ${theme.glow}` : 'none',
        }}
      >
        {/* Layer 1: Default Surface */}
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center gap-2 text-zinc-300">
          <Eye className="w-3.5 h-3.5 text-zinc-400" />
          <span>{defaultLabel}</span>
        </div>

        {/* Layer 2: Mask Revealed Surface (Sliding/Wiping over via clip-path) */}
        <motion.div
          animate={{
            clipPath: isHovered 
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
              : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center gap-2 font-bold text-zinc-950"
          style={{
            backgroundColor: theme.primary,
          }}
        >
          <ShieldCheck className="w-4 h-4 text-zinc-950" />
          <span>{revealedLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-950 ml-1" />
        </motion.div>

        {/* Phantom sizing label to preserve correct dimensions */}
        <span className="invisible pointer-events-none flex items-center gap-2">
          {revealedLabel.length > defaultLabel.length ? revealedLabel : defaultLabel}
        </span>
      </motion.button>
    </div>
  );
};
