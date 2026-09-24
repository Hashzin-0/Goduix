import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Trash2,
  Settings,
  GripVertical,
  AlertTriangle,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { getEffectById } from '../../data/effectRegistry';
import { ComposedLayer, LayerDefinition, AppliedEffect } from '../../types/composition';
import { cn } from '../../lib/utils';
import { EffectChip } from './EffectChip';

const LAYER_ICONS: Record<string, React.FC<any>> = {
  Paintbrush: Paintbrush,
  Square: Square,
  Layers: Layers,
  MousePointer: MousePointer,
  MousePointerClick: MousePointerClick,
  Play: Play,
  Type: Type,
  Box: Box,
  Loader: Loader2,
  ArrowRightLeft: ArrowRightLeft,
};

interface LayerSlotProps {
  layer: ComposedLayer;
  layerDef: LayerDefinition;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

export function LayerSlot({ layer, layerDef, isSelected, onSelect, onRemove }: LayerSlotProps) {
  const { composerConfiguringEffect, setComposerConfiguringEffect, setDraggingEffect } =
    useBuilderStore();

  const Icon = LAYER_ICONS[layerDef.icon] || Layers;

  const enabledCount = layer.effects.filter((e) => e.enabled).length;
  const totalCount = layer.effects.length;

  const getStatusColor = () => {
    if (totalCount === 0) return 'text-zinc-600';
    if (enabledCount === totalCount) return 'text-emerald-400';
    if (enabledCount > 0) return 'text-yellow-400';
    return 'text-zinc-600';
  };

  const getStatusIcon = () => {
    if (totalCount === 0) return Circle;
    if (enabledCount === totalCount) return CheckCircle2;
    return AlertTriangle;
  };

  const StatusIcon = getStatusIcon();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const effectData = e.dataTransfer.getData('application/json');
    if (effectData) {
      try {
        const parsed = JSON.parse(effectData);
        if (parsed.effectId) {
          useBuilderStore.getState().applyEffect(layerDef.id, parsed.effectId);
        }
      } catch {}
    }
    setDraggingEffect(null);
    (window as any).__activeComposerDropZone = null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    (window as any).__activeComposerDropZone = {
      compositionId: useBuilderStore.getState().currentComposition?.id || '',
      layerId: layerDef.id,
    };
  };

  const handleDragLeave = () => {
    (window as any).__activeComposerDropZone = null;
  };

  return (
    <div
      onClick={onSelect}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'rounded-lg border transition-all cursor-pointer group',
        isSelected
          ? 'border-cyan-500/40 bg-cyan-500/5'
          : 'border-white/5 bg-zinc-800/30 hover:border-white/10 hover:bg-white/[0.02]'
      )}
    >
      <div className="flex items-center gap-2 px-2.5 py-2">
        <GripVertical className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />

        <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="text-xs text-white font-medium truncate">
            {layerDef.labelPt || layerDef.label}
          </div>
        </div>

        <StatusIcon className={cn('w-3 h-3 shrink-0', getStatusColor())} />

        {totalCount > 0 && (
          <span className="text-[10px] text-zinc-500 shrink-0">
            {enabledCount}/{totalCount}
          </span>
        )}

        {!layerDef.required && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-3 h-3 text-zinc-500 hover:text-red-400" />
          </button>
        )}
      </div>

      {totalCount > 0 && (
        <div className="px-2.5 pb-2 space-y-1">
          {layer.effects.map((effect) => {
            const effectModule = getEffectById(effect.effectId);
            if (!effectModule) return null;

            return (
              <div key={effect.effectId} className="flex items-center gap-1.5">
                <EffectChip
                  effect={effectModule}
                  applied
                  enabled={effect.enabled}
                  onToggle={() =>
                    useBuilderStore.getState().toggleEffect(layerDef.id, effect.effectId)
                  }
                  onConfigure={() =>
                    setComposerConfiguringEffect(
                      composerConfiguringEffect?.effectId === effect.effectId
                        ? null
                        : { layerId: layerDef.id, effectId: effect.effectId }
                    )
                  }
                  onRemove={() =>
                    useBuilderStore.getState().removeEffect(layerDef.id, effect.effectId)
                  }
                  compact
                />
              </div>
            );
          })}
        </div>
      )}

      {totalCount === 0 && (
        <div className="px-2.5 pb-2">
          <div className="text-[10px] text-zinc-600 text-center py-1 border border-dashed border-white/5 rounded">
            Arraste um efeito aqui
          </div>
        </div>
      )}
    </div>
  );
}
