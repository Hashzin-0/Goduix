import React from 'react';
import { motion } from 'motion/react';
import {
  Paintbrush,
  Square,
  Layers,
  MousePointer,
  MousePointerClick,
  Play,
  Type,
  Box,
  Loader2,
  ArrowRightLeft,
  GripVertical,
  Settings,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { EffectModule } from '../../types/composition';
import { cn } from '../../lib/utils';

const CATEGORY_ICONS: Record<string, React.FC<any>> = {
  background: Paintbrush,
  border: Square,
  shadow: Layers,
  hover: MousePointer,
  click: MousePointerClick,
  animation: Play,
  typography: Type,
  structure: Box,
  layout: Layers,
  loading: Loader2,
  transition: ArrowRightLeft,
};

interface EffectChipProps {
  effect: EffectModule;
  applied?: boolean;
  enabled?: boolean;
  compact?: boolean;
  onToggle?: () => void;
  onConfigure?: () => void;
  onRemove?: () => void;
}

export function EffectChip({
  effect,
  applied = false,
  enabled = true,
  compact = false,
  onToggle,
  onConfigure,
  onRemove,
}: EffectChipProps) {
  const Icon = CATEGORY_ICONS[effect.category] || Layers;

  const handleDragStart = (e: React.DragEvent) => {
    const data = {
      effectId: effect.id,
      category: effect.category,
      name: effect.name,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'copy';
  };

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] transition-all group/chip',
          enabled
            ? 'bg-zinc-800/80 border border-white/5'
            : 'bg-zinc-800/40 border border-white/5 opacity-50'
        )}
      >
        <Icon className="w-3 h-3 shrink-0" style={{ color: effect.color }} />
        <span className={cn('font-medium truncate', enabled ? 'text-zinc-300' : 'text-zinc-500')}>
          {effect.namePt || effect.name}
        </span>
        <div className="flex items-center gap-0.5 opacity-0 group-hover/chip:opacity-100 transition-opacity">
          {onToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="p-0.5 rounded hover:bg-white/10"
            >
              {enabled ? (
                <Eye className="w-2.5 h-2.5 text-emerald-400" />
              ) : (
                <EyeOff className="w-2.5 h-2.5 text-zinc-500" />
              )}
            </button>
          )}
          {onConfigure && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfigure();
              }}
              className="p-0.5 rounded hover:bg-white/10"
            >
              <Settings className="w-2.5 h-2.5 text-zinc-400" />
            </button>
          )}
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-0.5 rounded hover:bg-red-500/20"
            >
              <Trash2 className="w-2.5 h-2.5 text-zinc-500 hover:text-red-400" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      draggable={!applied}
      onDragStart={handleDragStart}
      className={cn(
        'flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all cursor-grab active:cursor-grabbing group/chip',
        applied
          ? 'bg-zinc-800/50 border-white/5'
          : 'bg-zinc-800/30 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
      )}
    >
      {!applied && (
        <GripVertical className="w-3 h-3 text-zinc-600 opacity-0 group-hover/chip:opacity-100 transition-opacity shrink-0" />
      )}

      <div
        className="w-6 h-6 rounded flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${effect.color}20` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: effect.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className={cn('text-xs font-medium', enabled ? 'text-white' : 'text-zinc-400')}>
          {effect.namePt || effect.name}
        </div>
        {!applied && (
          <div className="text-[10px] text-zinc-500 truncate">{effect.descriptionPt || effect.description}</div>
        )}
      </div>

      {applied && (
        <div className="flex items-center gap-0.5">
          {onToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              {enabled ? (
                <Eye className="w-3 h-3 text-emerald-400" />
              ) : (
                <EyeOff className="w-3 h-3 text-zinc-500" />
              )}
            </button>
          )}
          {onConfigure && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfigure();
              }}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <Settings className="w-3 h-3 text-zinc-400" />
            </button>
          )}
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1 rounded hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-3 h-3 text-zinc-500 hover:text-red-400" />
            </button>
          )}
        </div>
      )}

      {effect.badge && !applied && (
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-zinc-400 font-medium shrink-0">
          {effect.badge}
        </span>
      )}
    </div>
  );
}
