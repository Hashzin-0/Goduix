import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { COMPONENT_REGISTRY } from '../../data/componentRegistry';
import { mergeEngine } from '../../engine/mergeEngine';
import { cn } from '../../lib/utils';
import { EffectConfigurator } from './EffectConfigurator';

export function ComposeCanvas() {
  const { currentComposition, composerConfiguringEffect } = useBuilderStore();

  const component = currentComposition
    ? COMPONENT_REGISTRY[currentComposition.baseComponent]
    : null;

  const resolvedLayers = useMemo(() => {
    if (!currentComposition || !component) return [];
    return mergeEngine.resolve(currentComposition, component.layers);
  }, [currentComposition, component]);

  if (!currentComposition || !component) {
    return (
      <div className="flex flex-col h-full bg-zinc-950 items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto rounded-3xl border border-dashed border-white/10 flex items-center justify-center">
            <div className="text-zinc-600 text-sm">Preview</div>
          </div>
          <p className="text-xs text-zinc-600 max-w-[240px]">
            Selecione um componente para visualizar a composição em tempo real
          </p>
        </div>
      </div>
    );
  }

  const effectLayers = resolvedLayers.filter((l) => l.effects.length > 0);

  let content: React.ReactNode = (
    <div className="p-8 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/50 border border-white/5">
        <div className="w-2 h-2 rounded-full bg-zinc-500" />
        <span className="text-sm text-zinc-400">{component.namePt || component.name}</span>
      </div>
    </div>
  );

  for (let i = effectLayers.length - 1; i >= 0; i--) {
    const layer = effectLayers[i];
    for (let j = layer.effects.length - 1; j >= 0; j--) {
      const resolvedEffect = layer.effects[j];
      const Renderer = resolvedEffect.renderer;
      if (Renderer) {
        content = (
          <Renderer key={`${layer.layerId}-${resolvedEffect.effectId}`} config={resolvedEffect.config}>
            {content}
          </Renderer>
        );
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative flex items-center justify-center min-h-full p-8">
          <motion.div
            key={currentComposition.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg"
          >
            {content}
          </motion.div>
        </div>
      </div>

      {composerConfiguringEffect && (
        <EffectConfigurator
          layerId={composerConfiguringEffect.layerId}
          effectId={composerConfiguringEffect.effectId}
        />
      )}
    </div>
  );
}
