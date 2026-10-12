import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { COMPONENT_REGISTRY } from '../../data/componentRegistry';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { THEMES } from '../../data/themes';
import { mergeEngine } from '../../engine/mergeEngine';
import { EffectConfigurator } from './EffectConfigurator';
import { SpotlightCard } from '../godui/SpotlightCard';
import { Tilt3DCard } from '../godui/Tilt3DCard';
import { HolographicCard } from '../godui/HolographicCard';
import { LiquidGlassCard } from '../godui/LiquidGlassCard';
import { InsetGlassCard } from '../godui/InsetGlassCard';

export function ComposeCanvas() {
  const store = useBuilderStore();
  const { currentComposition, composerConfiguringEffect } = store;

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

  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const props = { ...GODUI_CATALOG[currentComposition.baseComponent]?.defaultProps };
  const renderBaseComponent = (): React.ReactNode => {
    switch (currentComposition.baseComponent) {
      case 'spotlight-card':
        return <SpotlightCard title={props.title} description={props.description} enableBorderBeam={props.enableBorderBeam ?? true} spotlightColor={props.spotlightColor} tagText={props.tagText} theme={theme} />;
      case 'tilt-3d-card':
        return <Tilt3DCard title={props.title || 'Spatial Gyro Substrate'} category={props.badge || 'Z-Space 3D'} theme={theme} maxTilt={props.maxTilt || 18} glareOpacity={props.glareOpacity || 0.35} />;
      case 'holographic-card':
        return <HolographicCard />;
      case 'liquid-glass-card':
        return <LiquidGlassCard />;
      case 'inset-glass-card':
        return <InsetGlassCard title={props.title || 'Inset Glass Surface'} description={props.description || 'Superfície de vidro com profundidade e reflexos.'} badge={props.badge || 'GodUI'} insetDepth={props.insetDepth || 'ultra'} theme={theme} />;
      default:
        return (
          <div className="rounded-2xl border border-dashed border-white/15 bg-zinc-900/70 p-6 text-center">
            <p className="text-sm font-semibold text-white">{component.namePt || component.name}</p>
            <p className="mt-1 text-xs text-zinc-400">A visualização deste componente ainda não está conectada ao Composer.</p>
          </div>
        );
    }
  };

  const effectLayers = resolvedLayers.filter((layer) => layer.effects.length > 0);
  let content: React.ReactNode = renderBaseComponent();

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
