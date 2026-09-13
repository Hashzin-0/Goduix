import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Home, 
  Compass, 
  Layers, 
  Terminal, 
  Sparkles, 
  FolderKanban, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';

interface DockProps {
  magnification?: number;
  distance?: number;
  showLabels?: boolean;
  position?: 'bottom' | 'inline';
  theme: ThemeColors;
  fusions?: ComponentFusion[];
  onItemClick?: (id: string, label: string) => void;
  className?: string;
}

interface DockItemConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const DOCK_ITEMS: DockItemConfig[] = [
  { id: 'home', label: 'Início', icon: Home, active: true },
  { id: 'explore', label: 'Explorar GodUI', icon: Compass },
  { id: 'components', label: 'Componentes', icon: Layers },
  { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
  { id: 'terminal', label: 'Console CLI', icon: Terminal },
  { id: 'projects', label: 'Projetos', icon: FolderKanban },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

interface DockIconProps {
  key?: string;
  item: DockItemConfig;
  mouseX: any;
  magnification: number;
  distance: number;
  showLabels: boolean;
  theme: ThemeColors;
  fusions?: ComponentFusion[];
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({
  item,
  mouseX,
  magnification,
  distance,
  showLabels,
  theme,
  fusions = [],
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const activeFusions = fusions.filter(f => f.active);
  const liquidGlassActive = activeFusions.find(f => f.sourceEffect === 'liquid-glass' && (f.targetSlot === 'active-item' || f.targetSlot === 'interactive-items'));
  const isLiquidStyled = (item.active && liquidGlassActive) || (hovered && liquidGlassActive);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={ref}
      style={{ 
        width, 
        height: width,
        boxShadow: isLiquidStyled 
          ? `0 10px 25px -5px ${theme.glow}, inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45)`
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center rounded-2xl transition-colors shadow-lg cursor-pointer group shrink-0 overflow-hidden",
        isLiquidStyled
          ? "bg-zinc-900/60 backdrop-blur-xl border border-white/35"
          : "bg-white/[0.08] hover:bg-white/[0.16] border border-white/10"
      )}
    >
      {/* Liquid Glass Highlight */}
      {isLiquidStyled && (
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-2xl" />
      )}

      {/* Tooltip bubble on hover */}
      {showLabels && hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: -45, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute -top-1 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-white/15 text-white text-xs font-medium shadow-2xl pointer-events-none whitespace-nowrap z-30"
        >
          {item.label}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-zinc-900 border-r border-b border-white/15" />
        </motion.div>
      )}

      <IconComponent className="w-5 h-5 text-zinc-100 group-hover:scale-110 transition-transform relative z-10" />

      {/* Active dot indicator */}
      {item.active && (
        <span
          className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full z-10 shadow-sm"
          style={{ backgroundColor: theme.primary }}
        />
      )}
    </motion.div>
  );
}

export const GodUIDock: React.FC<DockProps> = ({
  magnification = 64,
  distance = 140,
  showLabels = true,
  position = 'bottom',
  theme,
  fusions = [],
  onItemClick,
  className,
}) => {
  const mouseX = useMotionValue(Infinity);
  const activeFusions = fusions.filter(f => f.active);
  const gooeyFusion = activeFusions.find(f => f.sourceEffect === 'gooey-liquid');
  const shimmerContainer = activeFusions.find(f => f.sourceEffect === 'shimmer-beam' && f.targetSlot === 'main-container');

  return (
    <div
      className={cn(
        "flex justify-center items-center w-full z-40",
        position === 'bottom' ? 'sticky bottom-6 mt-8' : 'my-6',
        className
      )}
    >
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative flex items-end gap-2.5 px-4 py-3 rounded-3xl bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80"
        style={{
          boxShadow: `0 20px 50px -10px rgba(0,0,0,0.8), 0 0 25px -5px ${theme.glow}`,
        }}
      >
        {/* Gooey Liquid Fusion Aura (Background only, preserving icon clarity) */}
        {gooeyFusion && (
          <div 
            className="absolute inset-x-4 -bottom-1 h-3 rounded-full opacity-60 pointer-events-none blur-xs"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 16px ${theme.glow}`,
            }}
          />
        )}

        {shimmerContainer && (
          <div className="absolute -inset-[1px] rounded-3xl overflow-hidden pointer-events-none">
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

        {DOCK_ITEMS.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            magnification={magnification}
            distance={distance}
            showLabels={showLabels}
            theme={theme}
            fusions={fusions}
            onClick={() => onItemClick?.(item.id, item.label)}
          />
        ))}
      </motion.nav>
    </div>
  );
};
