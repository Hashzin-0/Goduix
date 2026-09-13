import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MousePointer2, 
  Hand, 
  Square, 
  Type, 
  MessageSquare, 
  Sparkles, 
  ZoomIn,
  Droplets,
  Layers,
  Magnet,
  Flame
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';

interface FloatingToolbarProps {
  badgeText?: string;
  allowMultiSelect?: boolean;
  theme: ThemeColors;
  fusions?: ComponentFusion[];
  onToolSelect?: (toolId: string) => void;
  className?: string;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  badgeText = 'Studio Mode',
  theme,
  fusions = [],
  onToolSelect,
  className,
}) => {
  const [activeTool, setActiveTool] = useState('select');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 50, y: 50 });
  const [tilt3D, setTilt3D] = useState({ rotateX: 0, rotateY: 0 });

  // Active Fusions Analysis
  const activeFusions = fusions.filter(f => f.active);
  const liquidGlassActiveItem = activeFusions.find(f => f.sourceEffect === 'liquid-glass' && f.targetSlot === 'active-item');
  const gooeyActiveItem = activeFusions.find(f => f.sourceEffect === 'gooey-liquid' && f.targetSlot === 'active-item');
  const shimmerActiveItem = activeFusions.find(f => f.sourceEffect === 'shimmer-beam' && f.targetSlot === 'active-item');
  const auroraActiveItem = activeFusions.find(f => f.sourceEffect === 'aurora-glow' && f.targetSlot === 'active-item');

  const containerLiquidGlass = activeFusions.find(f => f.sourceEffect === 'liquid-glass' && f.targetSlot === 'main-container');
  const containerTilt3D = activeFusions.find(f => f.sourceEffect === 'hologram-3d-tilt' && f.targetSlot === 'main-container');
  const containerSpotlight = activeFusions.find(f => f.sourceEffect === 'spotlight-beam' && f.targetSlot === 'main-container');
  const containerShimmer = activeFusions.find(f => f.sourceEffect === 'shimmer-beam' && f.targetSlot === 'main-container');
  const magneticItems = activeFusions.find(f => f.sourceEffect === 'magnetic-pull' && (f.targetSlot === 'interactive-items' || f.targetSlot === 'active-item'));
  const badgeAurora = activeFusions.find(f => (f.sourceEffect === 'aurora-glow' || f.sourceEffect === 'liquid-glass') && f.targetSlot === 'badge');

  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'hand', icon: Hand, label: 'Pan' },
    { id: 'shapes', icon: Square, label: 'Shapes' },
    { id: 'text', icon: Type, label: 'Typography' },
    { id: 'ai', icon: Sparkles, label: 'AI Magic' },
    { id: 'comment', icon: MessageSquare, label: 'Comments' },
    { id: 'zoom', icon: ZoomIn, label: 'Inspect' },
  ];

  const handleSelect = (id: string) => {
    setActiveTool(id);
    onToolSelect?.(id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseCoords({ x, y });

    if (containerTilt3D) {
      const offsetX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const offsetY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setTilt3D({
        rotateX: -offsetY * 12 * (containerTilt3D.intensity || 0.8),
        rotateY: offsetX * 12 * (containerTilt3D.intensity || 0.8),
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerTilt3D) {
      setTilt3D({ rotateX: 0, rotateY: 0 });
    }
  };

  return (
    <div className={cn("flex justify-center items-center py-2", className)}>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 15, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          rotateX: tilt3D.rotateX,
          rotateY: tilt3D.rotateY,
          transformPerspective: 800,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          "relative inline-flex items-center gap-1.5 p-1.5 rounded-2xl select-none transition-all",
          containerLiquidGlass 
            ? "bg-zinc-950/40 backdrop-blur-2xl border border-white/25 shadow-2xl"
            : "bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80"
        )}
        style={{
          boxShadow: containerLiquidGlass
            ? `0 20px 40px -15px rgba(0,0,0,0.8), 0 0 25px -5px ${theme.glow}, inset 0 1px 2px 0 rgba(255,255,255,0.3)`
            : `0 15px 35px -10px rgba(0,0,0,0.7), 0 0 20px -8px ${theme.glow}`,
        }}
      >
        {/* Gooey Organic Viscous Bridge Behind Buttons */}
        {gooeyActiveItem && (
          <div 
            className="absolute inset-0 pointer-events-none overflow-visible rounded-2xl"
            style={{ filter: 'url(#godui-gooey-filter)' }}
          >
            <motion.div
              layoutId="toolbar-gooey-liquid-pill"
              className="absolute h-9 w-9 rounded-xl opacity-75"
              style={{
                top: '6px',
                left: `${tools.findIndex(x => x.id === activeTool) * 40 + (badgeText ? 86 : 8)}px`,
                backgroundColor: theme.primary,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            />
          </div>
        )}

        {/* Spotlight Beam Fusion on Main Container */}
        {containerSpotlight && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(130px circle at ${mouseCoords.x}% ${mouseCoords.y}%, rgba(255,255,255,0.18), transparent 70%)`,
            }}
          />
        )}

        {/* Shimmer Beam Fusion on Container Perimeter */}
        {containerShimmer && (
          <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 opacity-40"
              style={{
                background: `conic-gradient(from 0deg, transparent 0deg, ${theme.primary} 60deg, transparent 120deg)`,
              }}
            />
          </div>
        )}

        {/* Badge with optional Aurora/Liquid Glass Fusion */}
        {badgeText && (
          <div className={cn(
            "relative flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-medium select-none mr-1 overflow-hidden",
            badgeAurora 
              ? "bg-cyan-500/10 border border-cyan-400/30 text-white shadow-sm"
              : "bg-white/[0.04] border border-white/5 text-zinc-400"
          )}>
            {badgeAurora && (
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 pointer-events-none"
              />
            )}
            <span 
              className="w-1.5 h-1.5 rounded-full relative z-10" 
              style={{ backgroundColor: theme.primary }} 
            />
            <span className="relative z-10">{badgeText}</span>
          </div>
        )}

        {/* Tool Items Container (Unfiltered, high-contrast crisp icons) */}
        <div className="flex items-center gap-1 relative z-10">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;

            return (
              <motion.button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                whileHover={magneticItems ? { scale: 1.15, y: -2 } : { scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                title={t.label}
                className={cn(
                  "relative p-2.5 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer group isolate",
                  isActive && "text-white font-medium"
                )}
              >
                {/* ACTIVE ITEM INDICATOR: FUSED EFFECTS RENDER HERE */}
                {isActive && (
                  <motion.div
                    layoutId="toolbar-active-indicator"
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      // FUSION 1: LIQUID GLASS EFFECT ON ACTIVE TOOL
                      liquidGlassActiveItem 
                        ? "bg-zinc-900/60 backdrop-blur-xl border border-white/30 overflow-hidden" 
                        // FUSION 2: AURORA GLOW ON ACTIVE TOOL
                        : auroraActiveItem
                        ? "bg-zinc-900/80 border border-cyan-500/40"
                        // DEFAULT INDICATOR
                        : "bg-white/10 border border-white/20"
                    )}
                    style={{
                      boxShadow: liquidGlassActiveItem
                        ? `0 8px 24px -4px ${theme.glow}, inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)`
                        : auroraActiveItem
                        ? `0 0 20px -2px ${theme.glow}`
                        : undefined,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: gooeyActiveItem ? 280 : 380, 
                      damping: gooeyActiveItem ? 18 : 30 
                    }}
                  >
                    {/* Liquid Glass Internal Refraction & Specular Shine */}
                    {liquidGlassActiveItem && (
                      <>
                        {/* Specular curved gloss highlight */}
                        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-xl" />
                        
                        {/* Liquid ambient colored core glow */}
                        <div 
                          className="absolute inset-0 opacity-40 pointer-events-none blur-sm"
                          style={{
                            background: `radial-gradient(circle at 50% 80%, ${theme.primary}, transparent 70%)`,
                          }}
                        />

                        {/* Optional Iridescent Rainbow Shimmer */}
                        {liquidGlassActiveItem.withShimmer && (
                          <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                          />
                        )}
                      </>
                    )}

                    {/* Laser Shimmer Beam on Active Item */}
                    {shimmerActiveItem && (
                      <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                          className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 opacity-60"
                          style={{
                            background: `conic-gradient(from 0deg, transparent 0deg, ${theme.primary} 70deg, transparent 140deg)`,
                          }}
                        />
                      </div>
                    )}

                    {/* Aurora Fluid Glow behind active indicator */}
                    {auroraActiveItem && (
                      <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-purple-500/20 to-emerald-500/30 blur-sm pointer-events-none"
                      />
                    )}
                  </motion.div>
                )}

                <Icon
                  className={cn(
                    "w-4 h-4 relative z-10 transition-transform group-hover:scale-110",
                    isActive && (liquidGlassActiveItem ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "text-cyan-400")
                  )}
                  style={{ color: isActive ? theme.primary : undefined }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Fusion Active Indicator Pip */}
        {activeFusions.length > 0 && (
          <div 
            className="flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 select-none shrink-0"
            title={`Fusão Ativa: ${activeFusions.map(f => f.sourceComponentName).join(', ')}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Mesclado</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
