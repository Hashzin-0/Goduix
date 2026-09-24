import { CompatibilityResult, EffectModule, ComponentRegistration, AppliedEffect } from '../types/composition';
import { getEffectById } from '../data/effectRegistry';
import { COMPONENT_REGISTRY } from '../data/componentRegistry';

export class CompatibilityChecker {
  // Check if an effect can be applied to a specific component's layer
  canApplyEffect(
    effectId: string,
    componentType: string,
    layerId: string,
    currentEffects: AppliedEffect[] = []
  ): CompatibilityResult {
    const effect = getEffectById(effectId);
    const component = COMPONENT_REGISTRY[componentType as keyof typeof COMPONENT_REGISTRY];
    
    if (!effect) {
      return { compatible: false, reason: `Effect '${effectId}' not found` };
    }
    
    if (!component) {
      return { compatible: false, reason: `Component '${componentType}' not found` };
    }

    // Check if effect is accepted by this layer
    if (!effect.acceptedByLayers.includes(layerId)) {
      return {
        compatible: false,
        reason: `Effect '${effect.name}' cannot be applied to layer '${layerId}'`,
      };
    }

    // Check if component has this layer
    const hasLayer = component.layers.some(l => l.id === layerId);
    if (!hasLayer) {
      return {
        compatible: false,
        reason: `Component '${component.name}' does not have a '${layerId}' layer`,
      };
    }

    // Check component compatibility
    if (effect.compatibleWith.length > 0 && !effect.compatibleWith.includes(componentType)) {
      return {
        compatible: false,
        reason: `Effect '${effect.name}' is not compatible with component '${component.name}'`,
      };
    }

    // Check conflicts with existing effects
    const currentEffectIds = currentEffects.map(e => e.effectId);
    for (const existingId of currentEffectIds) {
      if (effect.conflictsWith.includes(existingId)) {
        return {
          compatible: false,
          reason: `Effect '${effect.name}' conflicts with already applied effect '${existingId}'`,
          conflicts: [existingId],
        };
      }
      const existingEffect = getEffectById(existingId);
      if (existingEffect && existingEffect.conflictsWith.includes(effectId)) {
        return {
          compatible: false,
          reason: `Effect '${existingEffect.name}' conflicts with '${effect.name}'`,
          conflicts: [existingId],
        };
      }
    }

    // Check requirements
    for (const req of effect.requires) {
      if (!currentEffectIds.includes(req)) {
        return {
          compatible: false,
          reason: `Effect '${effect.name}' requires '${req}' to be applied first`,
          suggestions: [req],
        };
      }
    }

    return { compatible: true };
  }

  // Get all compatible effects for a given layer on a given component
  getCompatibleEffects(
    componentType: string,
    layerId: string,
    currentEffects: AppliedEffect[] = []
  ): EffectModule[] {
    const component = COMPONENT_REGISTRY[componentType as keyof typeof COMPONENT_REGISTRY];
    if (!component) return [];

    const layer = component.layers.find(l => l.id === layerId);
    if (!layer) return [];

    const currentEffectIds = currentEffects.map(e => e.effectId);
    const compatibleEffectIds = component.layerEffectMap[layerId] || [];

    return compatibleEffectIds
      .map(id => getEffectById(id))
      .filter((effect): effect is EffectModule => {
        if (!effect) return false;
        const result = this.canApplyEffect(effect.id, componentType, layerId, currentEffects);
        return result.compatible;
      });
  }

  // Get compatibility status for a layer
  getLayerStatus(
    componentType: string,
    layerId: string,
    currentEffects: AppliedEffect[]
  ): { status: 'empty' | 'active' | 'conflict'; count: number } {
    const enabled = currentEffects.filter(e => e.enabled);
    if (enabled.length === 0) return { status: 'empty', count: 0 };
    
    // Check for conflicts
    for (let i = 0; i < enabled.length; i++) {
      for (let j = i + 1; j < enabled.length; j++) {
        const conflict = this.canApplyEffect(
          enabled[j].effectId,
          componentType,
          layerId,
          enabled.slice(0, j)
        );
        if (!conflict.compatible && conflict.conflicts) {
          return { status: 'conflict', count: enabled.length };
        }
      }
    }
    
    return { status: 'active', count: enabled.length };
  }
}

export const compatibilityChecker = new CompatibilityChecker();
