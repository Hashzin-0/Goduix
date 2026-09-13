import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare, Share2, Heart, Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface GooeyFabProps {
  theme: ThemeColors;
  className?: string;
  onActionClick?: (action: string) => void;
}

export const GooeyFab: React.FC<GooeyFabProps> = ({
  theme,
  className,
  onActionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: 'share', label: 'Compartilhar', icon: <Share2 className="w-4 h-4" /> },
    { id: 'like', label: 'Favoritar', icon: <Heart className="w-4 h-4" /> },
    { id: 'code', label: 'Código', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <div className={cn("relative flex flex-col items-center select-none", className)}>
      {/* Sub actions expanded */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-14 flex flex-col items-center gap-2 mb-2 z-20">
            {actions.map((act, index) => (
              <motion.button
                key={act.id}
                initial={{ opacity: 0, y: 15, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 20,
                  delay: (actions.length - index - 1) * 0.05,
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onActionClick?.(act.id);
                  setIsOpen(false);
                }}
                className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 shadow-xl hover:text-white"
                style={{
                  boxShadow: `0 8px 20px -4px ${theme.glow}`,
                }}
                title={act.label}
              >
                {act.icon}
                <span className="absolute right-12 px-2 py-0.5 rounded-md bg-zinc-950 border border-white/10 text-[11px] text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {act.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-zinc-950/90 text-white shadow-2xl backdrop-blur-md cursor-pointer z-10"
        style={{
          boxShadow: `0 0 24px -2px ${theme.glow}, inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)`,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        >
          <Plus className="w-5 h-5 text-zinc-100" />
        </motion.div>
        
        {/* Ambient pulse flare */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-30 animate-ping"
          style={{ backgroundColor: theme.primary, animationDuration: '3s' }}
        />
      </motion.button>
    </div>
  );
};
