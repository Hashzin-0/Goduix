import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
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
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { EFFECT_REGISTRY, getEffectsByCategory, getEffectCategories } from '../../data/effectRegistry';
import { EffectCategory, EffectModule } from '../../types/composition';
import { cn } from '../../lib/utils';
import { EffectChip } from './EffectChip';

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

const CATEGORY_COLORS: Record<string, string> = {
  background: '#3b82f6',
  border: '#8b5cf6',
  shadow: '#6366f1',
  hover: '#10b981',
  click: '#f59e0b',
  animation: '#ec4899',
  typography: '#06b6d4',
  structure: '#64748b',
  layout: '#a855f7',
  loading: '#f97316',
  transition: '#14b8a6',
};

export function EffectPalette() {
  const { currentComposition, composerSelectedLayer, draggingEffect } = useBuilderStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EffectCategory | null>(null);

  const categories = useMemo(() => getEffectCategories(), []);

  const filteredEffects = useMemo(() => {
    const allEffects = Object.values(EFFECT_REGISTRY);
    let filtered = allEffects;

    if (selectedCategory) {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.namePt.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.descriptionPt.toLowerCase().includes(q)
      );
    }

    if (currentComposition && composerSelectedLayer) {
      const componentLayers = currentComposition.layers;
      const targetLayer = componentLayers.find((l) => l.layerId === composerSelectedLayer);
      if (targetLayer) {
        const appliedIds = new Set(targetLayer.effects.map((e) => e.effectId));
        filtered = filtered.filter((e) => !appliedIds.has(e.id));
      }
    }

    return filtered;
  }, [search, selectedCategory, currentComposition, composerSelectedLayer]);

  const groupedEffects = useMemo(() => {
    const groups: Record<string, EffectModule[]> = {};
    for (const effect of filteredEffects) {
      if (!groups[effect.category]) groups[effect.category] = [];
      groups[effect.category].push(effect);
    }
    return groups;
  }, [filteredEffects]);

  return (
    <div className="flex flex-col h-full bg-zinc-900/30">
      <div className="px-3 py-3 border-b border-white/5">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Efeitos</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar efeitos..."
            className="w-full bg-zinc-800 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="px-2 py-2 border-b border-white/5 overflow-x-auto">
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors',
              !selectedCategory
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            )}
          >
            Todos
          </button>
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Layers;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors',
                  selectedCategory === cat.id
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                )}
              >
                <Icon className="w-3 h-3" style={{ color: CATEGORY_COLORS[cat.id] }} />
                {cat.labelPt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
        {(Object.entries(groupedEffects) as [string, EffectModule[]][]).map(([category, effects]) => {
          const catMeta = categories.find((c) => c.id === category);
          const Icon = CATEGORY_ICONS[category] || Layers;
          const color = CATEGORY_COLORS[category] || '#64748b';

          return (
            <div key={category}>
              <div className="flex items-center gap-1.5 px-1 mb-1.5">
                <Icon className="w-3 h-3" style={{ color }} />
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {catMeta?.labelPt || category}
                </span>
                <span className="text-[10px] text-zinc-600 ml-auto">{effects.length}</span>
              </div>
              <div className="space-y-1">
                {effects.map((effect: EffectModule) => (
                  <EffectChip effect={effect} />
                ))}
              </div>
            </div>
          );
        })}

        {filteredEffects.length === 0 && (
          <div className="text-center py-8 text-zinc-500 text-xs">
            Nenhum efeito encontrado
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-white/5 bg-zinc-900/50">
        <div className="text-[10px] text-zinc-600">
          {filteredEffects.length} efeito{filteredEffects.length !== 1 ? 's' : ''} disponível{filteredEffects.length !== 1 ? 'eis' : ''}
        </div>
      </div>
    </div>
  );
}
