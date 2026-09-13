import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface InsetGlassCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  specularHighlight?: boolean;
  insetDepth?: 'subtle' | 'deep' | 'ultra';
  borderGlow?: boolean;
  theme: ThemeColors;
  className?: string;
  children?: React.ReactNode;
}

export const InsetGlassCard: React.FC<InsetGlassCardProps> = ({
  title = "Ultra-Deep Inset Surface",
  subtitle = "GodUI Glass & Depth Architecture",
  description = "Combina camadas ópticas de reflexão especular com chanfro interno negativo, criando uma sensação tátil de física sólida sob vidro fosco.",
  badge = "Inset Specular",
  specularHighlight = true,
  insetDepth = 'deep',
  borderGlow = true,
  theme,
  className,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Depth shadow configurations
  const depthStyles = {
    subtle: 'shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),inset_0_-1px_1px_0_rgba(0,0,0,0.4)]',
    deep: 'shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.18),inset_0_-2px_4px_0_rgba(0,0,0,0.6),0_10px_30px_-10px_rgba(0,0,0,0.8)]',
    ultra: 'shadow-[inset_0_2px_3px_0_rgba(255,255,255,0.25),inset_0_-3px_8px_0_rgba(0,0,0,0.85),0_20px_40px_-15px_rgba(0,0,0,0.9)]',
  }[insetDepth];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden p-6 md:p-8",
        "bg-zinc-950/80 border border-white/10 backdrop-blur-xl",
        "transition-all duration-300",
        depthStyles,
        borderGlow && "hover:border-white/20",
        className
      )}
    >
      {/* Dynamic Cursor Spotlight Reflection */}
      {specularHighlight && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.07), transparent 80%)`,
          }}
        />
      )}

      {/* Ambient Accent Light in the corner */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
        style={{ backgroundColor: theme.primary }}
      />

      {/* Micro-dot grid background inside the card */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" 
      />

      {/* Header bar / Badge */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/5 border border-white/10 text-zinc-300 shadow-inner">
          <Sparkles className="w-3 h-3 text-zinc-400" />
          {badge}
        </span>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary, boxShadow: `0 0 8px ${theme.glow}` }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-xl font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            {subtitle}
          </p>
        )}
        <p className="text-sm text-zinc-400 leading-relaxed pt-1">
          {description}
        </p>
      </div>

      {children && <div className="relative z-10 mt-6">{children}</div>}

      {/* Bottom specular edge bar */}
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
    </motion.div>
  );
};
