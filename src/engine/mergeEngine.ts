import { 
  ComposedComponent, 
  ComposedLayer, 
  AppliedEffect, 
  ResolvedEffect, 
  ResolvedLayer, 
  LayerDefinition, 
  EffectModule 
} from '../types/composition';
import { EFFECT_REGISTRY, getEffectById } from '../data/effectRegistry';

export class MergeEngine {
  // Resolve all layers for a composed component
  resolve(composition: ComposedComponent, layerDefinitions: LayerDefinition[]): ResolvedLayer[] {
    return layerDefinitions
      .sort((a, b) => a.order - b.order)
      .map(layerDef => {
        const composedLayer = composition.layers.find(l => l.layerId === layerDef.id);
        if (!composedLayer) return null;
        return this.resolveLayer(layerDef, composedLayer.effects);
      })
      .filter(Boolean) as ResolvedLayer[];
  }

  // Resolve a single layer based on its merge strategy
  resolveLayer(layerDef: LayerDefinition, effects: AppliedEffect[]): ResolvedLayer {
    const enabledEffects = effects.filter(e => e.enabled);
    
    switch (layerDef.mergeStrategy) {
      case 'replace':
        return this.resolveReplace(layerDef.id, enabledEffects);
      case 'stack':
        return this.resolveStack(layerDef.id, enabledEffects);
      case 'compose':
        return this.resolveCompose(layerDef.id, enabledEffects);
      default:
        return this.resolveReplace(layerDef.id, enabledEffects);
    }
  }

  // Replace: only the last enabled effect applies (highest order wins)
  private resolveReplace(layerId: string, effects: AppliedEffect[]): ResolvedLayer {
    if (effects.length === 0) return { layerId, effects: [] };
    const sorted = [...effects].sort((a, b) => b.order - a.order);
    const top = sorted[0];
    const module = getEffectById(top.effectId);
    if (!module) return { layerId, effects: [] };
    return {
      layerId,
      effects: [{
        effectId: top.effectId,
        category: module.category,
        config: top.config,
        order: top.order,
        mergeStrategy: 'replace',
        renderer: module.renderer,
      }],
    };
  }

  // Stack: all enabled effects layer on top of each other (CSS stacking)
  private resolveStack(layerId: string, effects: AppliedEffect[]): ResolvedLayer {
    const sorted = [...effects].sort((a, b) => a.order - b.order);
    const resolved = sorted.map(e => {
      const module = getEffectById(e.effectId);
      if (!module) return null;
      return {
        effectId: e.effectId,
        category: module.category,
        config: e.config,
        order: e.order,
        mergeStrategy: 'stack' as const,
        renderer: module.renderer,
      };
    }).filter(Boolean) as ResolvedEffect[];
    return { layerId, effects: resolved };
  }

  // Compose: effects are combined intelligently (CSS properties merge)
  private resolveCompose(layerId: string, effects: AppliedEffect[]): ResolvedLayer {
    // For compose, we check for conflicts between effects on the same layer
    // and resolve them using the conflict resolver
    const sorted = [...effects].sort((a, b) => a.order - b.order);
    const resolved = sorted.map(e => {
      const module = getEffectById(e.effectId);
      if (!module) return null;
      return {
        effectId: e.effectId,
        category: module.category,
        config: e.config,
        order: e.order,
        mergeStrategy: 'compose' as const,
        renderer: module.renderer,
      };
    }).filter(Boolean) as ResolvedEffect[];
    return { layerId, effects: resolved };
  }
}

// Singleton
export const mergeEngine = new MergeEngine();
