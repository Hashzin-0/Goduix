import React, { createContext, useContext, useMemo } from 'react';
import { ThemeColors } from '../../../types';
import { ComponentFusion, FusionEffectType, FusionTargetSlot } from '../../../types/builder';

export interface FusionContextValue {
  fusions: ComponentFusion[];
  theme: ThemeColors;
}

const FusionContext = createContext<FusionContextValue | null>(null);

export const FusionProvider: React.FC<{
  fusions: ComponentFusion[];
  theme: ThemeColors;
  children: React.ReactNode;
}> = ({ fusions, theme, children }) => {
  const value = useMemo(() => ({ fusions, theme }), [fusions, theme]);
  return <FusionContext.Provider value={value}>{children}</FusionContext.Provider>;
};

export function useFusionContext(): FusionContextValue | null {
  return useContext(FusionContext);
}

export function useActiveFusions(): ComponentFusion[] {
  const ctx = useContext(FusionContext);
  if (!ctx) return [];
  return ctx.fusions.filter((f) => f.active);
}

function matches<T extends string>(value: T | T[] | undefined, current: T): boolean {
  if (value === undefined) return true;
  return Array.isArray(value) ? value.includes(current) : value === current;
}

/** Find one active fusion by optional effect + slot filters. */
export function useFusion(
  effect?: FusionEffectType | FusionEffectType[],
  slot?: FusionTargetSlot | FusionTargetSlot[]
): ComponentFusion | null {
  const active = useActiveFusions();
  return (
    active.find(
      (f) => matches(effect, f.sourceEffect) && matches(slot, f.targetSlot)
    ) ?? null
  );
}

/** All active fusions targeting a given slot (or any slot if omitted). */
export function useFusionsForSlot(
  slot?: FusionTargetSlot | FusionTargetSlot[],
  effect?: FusionEffectType | FusionEffectType[]
): ComponentFusion[] {
  const active = useActiveFusions();
  return active.filter(
    (f) => matches(slot, f.targetSlot) && matches(effect, f.sourceEffect)
  );
}

/** Convenience: fusion applied to an inner element slot (title, icon, badge...). */
export function useFusionSlot(slot: FusionTargetSlot): ComponentFusion | null {
  return useFusion(undefined, slot);
}

export function mergeFusions(
  propFusions: ComponentFusion[] | undefined,
  contextFusions: ComponentFusion[]
): ComponentFusion[] {
  if (propFusions && propFusions.length > 0) return propFusions;
  return contextFusions;
}
