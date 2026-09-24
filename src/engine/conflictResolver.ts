import { AppliedEffect, EffectModule } from '../types/composition';
import { getEffectById } from '../data/effectRegistry';

export interface ConflictInfo {
  effect1: string;
  effect2: string;
  property: string;
  resolution: 'keep-first' | 'keep-last' | 'merge' | 'remove-both';
}

export class ConflictResolver {
  // Check if two effects conflict
  checkConflict(effect1Id: string, effect2Id: string): ConflictInfo | null {
    const e1 = getEffectById(effect1Id);
    const e2 = getEffectById(effect2Id);
    if (!e1 || !e2) return null;

    // Direct conflict declaration
    if (e1.conflictsWith.includes(effect2Id) || e2.conflictsWith.includes(effect1Id)) {
      return {
        effect1: effect1Id,
        effect2: effect2Id,
        property: 'general',
        resolution: 'keep-last',
      };
    }

    // Property-level conflicts (same category, same layer)
    if (e1.category === e2.category && e1.mergeStrategy === 'replace' && e2.mergeStrategy === 'replace') {
      return {
        effect1: effect1Id,
        effect2: effect2Id,
        property: e1.category,
        resolution: 'keep-last',
      };
    }

    return null;
  }

  // Resolve a list of effects, removing conflicts
  resolve(effects: AppliedEffect[]): { resolved: AppliedEffect[]; conflicts: ConflictInfo[] } {
    const resolved: AppliedEffect[] = [];
    const conflicts: ConflictInfo[] = [];

    for (const effect of effects) {
      let hasConflict = false;
      for (const existing of resolved) {
        const conflict = this.checkConflict(effect.effectId, existing.effectId);
        if (conflict) {
          conflicts.push(conflict);
          // Keep the one with higher order (newer)
          if (effect.order > existing.order) {
            const idx = resolved.indexOf(existing);
            resolved[idx] = effect;
          }
          hasConflict = true;
          break;
        }
      }
      if (!hasConflict) {
        resolved.push(effect);
      }
    }

    return { resolved, conflicts };
  }

  // Check if adding an effect would conflict with existing effects
  wouldConflict(newEffectId: string, existingEffectIds: string[]): ConflictInfo | null {
    for (const existingId of existingEffectIds) {
      const conflict = this.checkConflict(newEffectId, existingId);
      if (conflict) return conflict;
    }
    return null;
  }
}

export const conflictResolver = new ConflictResolver();
