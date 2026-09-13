import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'liquid' | 'frost' | 'crystal';
  glowIntensity?: number;
  withShimmer?: boolean;
  theme: ThemeColors;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  label = "Get Started",
  variant = "liquid",
  glowIntensity = 0.5,
  withShimmer = true,
  theme,
  icon,
  children,
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl",
        "text-sm font-semibold tracking-wide text-zinc-100",
        "transition-all duration-300 select-none overflow-hidden cursor-pointer",
        "border border-white/20 bg-zinc-950/40 backdrop-blur-md shadow-lg",
        className
      )}
      style={{
        boxShadow: isHovered 
          ? `0 12px 30px -8px ${theme.glow}, inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)`
          : `0 4px 14px -3px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`,
      }}
      {...(props as any)}
    >
      {/* Specular Liquid Gradient tracking cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.22), transparent 70%)`,
        }}
      />

      {/* Internal ambient color glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${theme.primary}, transparent 70%)`,
        }}
      />

      {/* Glass Top Edge Reflection */}
      <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      {/* Optional Continuous Shimmer Bar */}
      {withShimmer && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", repeatDelay: 1.5 }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="text-zinc-200 transition-transform group-hover:rotate-6">{icon}</span>}
        <span>{children || label}</span>
      </span>
    </motion.button>
  );
};
