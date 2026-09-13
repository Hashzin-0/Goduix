import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Bookmark, Heart, Download, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface MultiButtonAction {
  id: string;
  label: string;
  iconName: 'heart' | 'bookmark' | 'share' | 'download';
}

interface MultiButtonProps {
  theme: ThemeColors;
  onActionClick?: (actionId: string) => void;
  className?: string;
}

export const MultiButton: React.FC<MultiButtonProps> = ({
  theme,
  onActionClick,
  className,
}) => {
  const [activeAction, setActiveAction] = useState<string>('bookmark');
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const actions: MultiButtonAction[] = [
    { id: 'like', label: 'Like', iconName: 'heart' },
    { id: 'bookmark', label: 'Salvar', iconName: 'bookmark' },
    { id: 'share', label: 'Compartilhar', iconName: 'share' },
    { id: 'download', label: 'Exportar', iconName: 'download' },
  ];

  const renderIcon = (iconName: string, isSelected: boolean) => {
    const props = { className: cn("w-3.5 h-3.5 shrink-0 transition-colors", isSelected ? "text-white" : "text-zinc-400") };
    switch (iconName) {
      case 'heart': return <Heart {...props} fill={isSelected ? "currentColor" : "none"} />;
      case 'bookmark': return <Bookmark {...props} fill={isSelected ? "currentColor" : "none"} />;
      case 'share': return <Share2 {...props} />;
      case 'download': return <Download {...props} />;
      default: return <Check {...props} />;
    }
  };

  return (
    <div className={cn("relative inline-flex items-center p-1.5 rounded-full bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl select-none", className)}>
      {actions.map((action) => {
        const isSelected = activeAction === action.id;
        const isHovered = hoveredAction === action.id;

        return (
          <motion.button
            key={action.id}
            onClick={() => {
              setActiveAction(action.id);
              onActionClick?.(action.id);
            }}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "relative px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors z-10",
              isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {/* Sliding background indicator pill */}
            {isSelected && (
              <motion.div
                layoutId="multibutton-indicator"
                className="absolute inset-0 rounded-full border border-white/20"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 2px 14px -2px ${theme.glow}`,
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {renderIcon(action.iconName, isSelected)}
              <motion.span
                animate={{
                  width: isSelected || isHovered ? 'auto' : 0,
                  opacity: isSelected || isHovered ? 1 : 0,
                }}
                className="overflow-hidden whitespace-nowrap text-[11px]"
              >
                {action.label}
              </motion.span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
