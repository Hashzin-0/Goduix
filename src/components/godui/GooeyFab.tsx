import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare, Share2, Heart, Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';
import { ComponentFusion } from '../../types/builder';
import { LiquidGroup, LiquidItem } from './libraries/liquid-gooey';

interface GooeyFabProps {
  theme: ThemeColors;
  className?: string;
  onActionClick?: (action: string) => void;
  fusions?: ComponentFusion[];
}

export const GooeyFab: React.FC<GooeyFabProps> = ({
  theme,
  className,
  onActionClick,
  fusions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const gooeyFusion = (fusions ?? []).find(
    (f) =>
      f.active &&
      (f.sourceEffect === 'gooey-morph' || f.sourceEffect === 'gooey-liquid') &&
      (f.targetSlot === 'interactive-items' ||
        f.targetSlot === 'active-item' ||
        f.targetSlot === 'main-container')
  );
  const gooIntensity = gooeyFusion?.intensity ?? 0.85;
  const gooColor = gooeyFusion?.customColor || theme.primary;

  const actions = [
    { id: 'share', label: 'Compartilhar', icon: <Share2 className="w-4 h-4" />, x: -52, y: -28 },
    { id: 'like', label: 'Favoritar', icon: <Heart className="w-4 h-4" />, x: -8, y: -62 },
    { id: 'code', label: 'Código', icon: <Code2 className="w-4 h-4" />, x: 40, y: -30 },
  ];

  return (
    <div className={cn('relative flex flex-col items-center select-none', className)}>
      {/* Silhouette layer: gooey filter merges FAB ↔ action bubbles when open */}
      <LiquidGroup
        blur={5 + gooIntensity * 4}
        contrast={16 + gooIntensity * 6}
        fill={gooColor}
        className="relative"
      >
        <div className="relative h-12 w-12">
          {/* Sub actions (filtered surface) */}
          <AnimatePresence>
            {isOpen &&
              actions.map((act) => (
                <div
                  key={act.id}
                  className="absolute left-1/2 top-1/2 h-10 w-10 -ml-5 -mt-5"
                >
                  <LiquidItem
                    x={act.x}
                    y={act.y}
                    transition="bouncy"
                    effect="morph"
                    className="h-10 w-10"
                  >
                    <button
                      onClick={() => {
                        onActionClick?.(act.id);
                        setIsOpen(false);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-100"
                      style={{
                        background: `linear-gradient(145deg, ${theme.primary}cc, ${theme.accent}aa)`,
                        boxShadow: `0 8px 20px -4px ${theme.glow}`,
                      }}
                      title={act.label}
                      aria-label={act.label}
                    >
                      {act.icon}
                    </button>
                  </LiquidItem>
                </div>
              ))}
          </AnimatePresence>

          {/* Main FAB trigger (participates in goo group) */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white cursor-pointer z-10"
            style={{
              background: `linear-gradient(160deg, ${theme.primary}ee, #09090bee 60%)`,
              boxShadow: `0 0 24px -2px ${theme.glow}, inset 0 1px 1px 0 rgba(255,255,255,0.35)`,
            }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 135 : 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </LiquidGroup>

      {/* Labels (crisp, outside the goo filter) */}
      <AnimatePresence>
        {isOpen && (
          <div className="pointer-events-none absolute inset-0 z-20">
            {actions.map((act) => (
              <span
                key={`${act.id}-label`}
                className="absolute left-1/2 top-1/2 px-2 py-0.5 rounded-md bg-zinc-950/90 border border-white/10 text-[11px] text-zinc-200 whitespace-nowrap"
                style={{
                  transform: `translate(calc(-50% + ${act.x * 1.55}px), calc(-50% + ${act.y * 1.45 - 28}px))`,
                }}
              >
                {act.label}
              </span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
