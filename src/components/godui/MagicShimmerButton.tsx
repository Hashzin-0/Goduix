import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface MagicShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  theme: ThemeColors;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const MagicShimmerButton: React.FC<MagicShimmerButtonProps> = ({
  label = "Magic Action",
  theme,
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative p-[1.5px] overflow-hidden rounded-xl group cursor-pointer inline-flex items-center justify-center select-none",
        className
      )}
      {...(props as any)}
    >
      {/* Conic spinning shimmer border */}
      <div
        className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${theme.primary} 360deg)`,
        }}
      />

      {/* Button Interior */}
      <div className="relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-[10px] bg-zinc-950/90 text-sm font-semibold text-zinc-100 backdrop-blur-xl border border-white/10 group-hover:bg-zinc-900/90 transition-colors">
        {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
        <span>{children || label}</span>
      </div>
    </motion.button>
  );
};
