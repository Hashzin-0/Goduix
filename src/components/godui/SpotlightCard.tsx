import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface SpotlightCardProps {
  title?: string;
  description?: string;
  enableBorderBeam?: boolean;
  spotlightColor?: string;
  tagText?: string;
  theme: ThemeColors;
  className?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title = 'Optical Substrate',
  description = 'Superfície com refração interna, malha escura de precisão e reflexo especular dinâmico.',
  enableBorderBeam = true,
  spotlightColor,
  tagText = '0% CSS Conflict',
  theme,
  className,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const activeSpotlight = spotlightColor || theme.glow;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative rounded-3xl p-8 overflow-hidden group cursor-pointer transition-all duration-300",
        "bg-zinc-950/80 backdrop-blur-2xl border border-white/10 text-white shadow-2xl",
        "hover:border-white/20",
        className
      )}
    >
      {/* Border Beam effect */}
      {enableBorderBeam && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${theme.primary} 60deg, transparent 120deg)`,
            }}
          />
          <div className="absolute inset-[1px] rounded-[23px] bg-zinc-950" />
        </div>
      )}

      {/* Mouse Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${activeSpotlight}, transparent 75%)`,
          zIndex: 1,
        }}
      />

      {/* Internal Grid pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
            {tagText}
          </div>
          <Sparkles className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors">
            {title}
          </h3>
          <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
          <span>Componente Oficial GodUI</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
