import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Upload,
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { COMPONENT_REGISTRY } from '../../data/componentRegistry';
import { cn } from '../../lib/utils';
import { LayerSlot } from './LayerSlot';
import { PresetGallery } from './PresetGallery';

export function MergeStack() {
  const {
    currentComposition,
    composerSelectedLayer,
    setComposerSelectedLayer,
    addLayer,
    removeLayer,
    reorderLayers,
  } = useBuilderStore();

  const component = currentComposition
    ? COMPONENT_REGISTRY[currentComposition.baseComponent]
    : null;

  const allLayerDefs = component?.layers || [];

  const missingLayers = useMemo(() => {
    if (!currentComposition) return [];
    const appliedIds = new Set(currentComposition.layers.map((l) => l.layerId));
    return allLayerDefs.filter((l) => !appliedIds.has(l.id));
  }, [currentComposition, allLayerDefs]);

  const handleDragStart = (index: number) => {
    (window as any).__mergeStackDragIndex = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = (window as any).__mergeStackDragIndex as number;
    if (fromIndex !== undefined && fromIndex !== toIndex) {
      reorderLayers(fromIndex, toIndex);
    }
    (window as any).__mergeStackDragIndex = undefined;
  };

  if (!currentComposition || !component) {
    return (
      <div className="flex flex-col h-full bg-zinc-900/30">
        <div className="px-3 py-3 border-b border-white/5">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Layers</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-zinc-600 text-center px-4">
            Selecione ou crie uma composição para ver as camadas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-900/30">
      <div className="px-3 py-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Layers</h3>
          <span className="text-[10px] text-zinc-600">
            {currentComposition.layers.length}/{allLayerDefs.length}
          </span>
        </div>
        <p className="text-[10px] text-zinc-500">
          {component.namePt || component.name}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        <AnimatePresence mode="popLayout">
          {currentComposition.layers.map((layer, index) => {
            const layerDef = allLayerDefs.find((l) => l.id === layer.layerId);
            if (!layerDef) return null;

            return (
              <motion.div
                key={layer.layerId}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <LayerSlot
                  layer={layer}
                  layerDef={layerDef}
                  isSelected={composerSelectedLayer === layer.layerId}
                  onSelect={() =>
                    setComposerSelectedLayer(
                      composerSelectedLayer === layer.layerId ? null : layer.layerId
                    )
                  }
                  onRemove={() => removeLayer(layer.layerId)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {missingLayers.length > 0 && (
          <div className="mt-2">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider px-1 mb-1">
              Camadas disponíveis
            </div>
            {missingLayers.map((layerDef) => (
              <motion.button
                key={layerDef.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => addLayer(layerDef.id)}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-white/5 text-left transition-all group mb-1"
              >
                <Plus className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                <div className="min-w-0">
                  <div className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                    {layerDef.labelPt || layerDef.label}
                  </div>
                  <div className="text-[10px] text-zinc-600 truncate">
                    {layerDef.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/5">
        <PresetGallery />
      </div>
    </div>
  );
}
