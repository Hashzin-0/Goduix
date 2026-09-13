import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Command, ChevronRight, Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';

interface FloatingIslandHeaderProps {
  title?: string;
  showNav?: boolean;
  showBadge?: boolean;
  compactOnScroll?: boolean;
  blurAmount?: number;
  theme: ThemeColors;
  scrollProgress?: number;
  fusions?: ComponentFusion[];
  className?: string;
  onCtaClick?: () => void;
}

export const FloatingIslandHeader: React.FC<FloatingIslandHeaderProps> = ({
  title = "GodUI Studio",
  showNav = true,
  showBadge = true,
  compactOnScroll = true,
  blurAmount = 16,
  theme,
  scrollProgress = 0,
  fusions = [],
  className,
  onCtaClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const isCompact = compactOnScroll && scrollProgress > 0.08 && !isExpanded;

  const activeFusions = fusions.filter(f => f.active);
  const liquidGlassActive = activeFusions.find(f => f.sourceEffect === 'liquid-glass');
  const auroraGlow = activeFusions.find(f => f.sourceEffect === 'aurora-glow');
  const shimmerBeam = activeFusions.find(f => f.sourceEffect === 'shimmer-beam');

  const navItems = ['Overview', 'Components', 'Playground', 'Docs'];

  return (
    <motion.header
      id="godui-floating-island-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={cn(
        "sticky top-4 z-50 flex justify-center items-center w-full px-4 pointer-events-none",
        className
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
        }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between transition-colors duration-300",
          "rounded-full border border-white/10 shadow-2xl shadow-black/60",
          "bg-zinc-950/75 text-zinc-100",
          isCompact ? "px-3 py-1.5 gap-2.5 max-w-xs" : "px-4 sm:px-6 py-2.5 gap-4 sm:gap-8 max-w-3xl w-full"
        )}
      >
        {/* Subtle top specular border highlight */}
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Brand / Logo + Island indicator */}
        <div className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/90 border border-white/15 relative overflow-hidden shadow-inner"
          >
            <div
              className="absolute inset-0 opacity-40 blur-sm pointer-events-none"
              style={{ background: theme.glow }}
            />
            <Sparkles className="w-4 h-4 text-zinc-200 relative z-10" />
          </motion.div>

          {!isCompact && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-zinc-100 whitespace-nowrap">
                {title}
              </span>
              {showBadge && (
                <span
                  className="hidden md:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
                  v2.4
                </span>
              )}
            </div>
          )}
        </div>

        {/* Interactive Nav Tabs */}
        {showNav && !isCompact && (
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/40 p-1 rounded-full border border-white/5">
            {navItems.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap",
                    isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-island-tab"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Compact quick label if condensed */}
        {isCompact && (
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
            <span className="truncate max-w-[120px]">{title}</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
          </div>
        )}

        {/* Actions / Trigger CTA */}
        <div className="flex items-center gap-2">
          <motion.button
            id="island-cta-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onCtaClick}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 text-xs font-medium rounded-full transition-all overflow-hidden",
              "border border-white/20 bg-gradient-to-b from-white/15 to-white/5 text-white shadow-md hover:shadow-lg",
              isCompact ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5"
            )}
            style={{
              boxShadow: `0 0 15px -3px ${theme.glow}`,
            }}
          >
            <span className="relative z-10 whitespace-nowrap">
              {isCompact ? "Expandir" : "Explorar"}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  );
};
