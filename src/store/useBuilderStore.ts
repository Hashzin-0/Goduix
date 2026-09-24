import { create } from 'zustand';
import { 
  BuilderComponentInstance, 
  GodUIComponentType, 
  ViewportMode, 
  ViewMode,
  InteractionEvent,
  ComponentFusion,
  FusionEffectType,
  FusionTargetSlot,
  FusionTriggerType,
  DraggingFusionItem,
  ActiveDropZone,
  ComponentAnimations
} from '../types/builder';
import { ThemePalette } from '../types';
import { GODUI_CATALOG } from '../data/goduiCatalog';
import { PAGE_TEMPLATES } from '../data/templates';
import { FUSION_PRESETS, FUSION_DONORS, getComponentSignatureEffect } from '../data/fusionCatalog';
import {
  ComposedComponent,
  ComposedLayer,
  AppliedEffect,
  DesignToken,
  DraggingEffectItem,
  CompositionPreset,
} from '../types/composition';
import { COMPONENT_REGISTRY } from '../data/componentRegistry';
import { getEffectById } from '../data/effectRegistry';
import { conflictResolver } from '../engine/conflictResolver';
import { mergeEngine } from '../engine/mergeEngine';
import { generateCode, ExportFormat } from '../engine/codeGenerator';
import { COMPOSITION_PRESETS } from '../data/compositionPresets';

interface BuilderState {
  // Canvas State
  components: BuilderComponentInstance[];
  selectedId: string | null;
  viewport: ViewportMode;
  viewMode: ViewMode;
  theme: ThemePalette;

  // History for Undo/Redo
  history: BuilderComponentInstance[][];
  historyIndex: number;

  // Real-time Interactions & Live Feedback
  interactionEvents: InteractionEvent[];
  activeToast: { message: string; type: 'info' | 'success' | 'warning' } | null;

  // Animation Play & Replay Engine
  componentReplayKeys: Record<string, number>;
  globalReplayKey: number;
  replayComponentAnimation: (componentId?: string, type?: 'entrance' | 'exit') => void;
  setComponentAnimations: (componentId: string, animations: ComponentAnimations) => void;

  // Page Scroll Simulation
  scrollSimulationProgress: number; // 0 to 100
  isScrollSimulationActive: boolean;
  setScrollSimulationProgress: (val: number) => void;
  toggleScrollSimulation: () => void;

  // Drag and Drop Fusion Engine State
  draggingItem: DraggingFusionItem | null;
  activeHoverDropZone: ActiveDropZone | null;
  sourceMergeComponentId: string | null; // For canvas component selection/merge
  setDraggingItem: (item: DraggingFusionItem | null) => void;
  setActiveHoverDropZone: (zone: ActiveDropZone | null) => void;
  setSourceMergeComponent: (id: string | null) => void;
  dropEffectOnSlot: (
    componentId: string, 
    slot: FusionTargetSlot, 
    effectType?: FusionEffectType, 
    trigger?: FusionTriggerType
  ) => void;
  mergeCanvasComponents: (
    sourceId: string, 
    targetId: string, 
    slot: FusionTargetSlot, 
    chosenEffect?: FusionEffectType, 
    trigger?: FusionTriggerType
  ) => void;

  // Component documentation modal state
  inspectingDocType: GodUIComponentType | null;

  // Mobile Navigation Tab
  mobileTab: 'canvas' | 'library' | 'inspector';
  setMobileTab: (tab: 'canvas' | 'library' | 'inspector') => void;

  // Fusion & Infusion Engine Modal State
  isFusionModalOpen: boolean;
  activeFusionComponentId: string | null;
  openFusionModal: (componentId: string) => void;
  closeFusionModal: () => void;
  addFusion: (componentId: string, fusion: Omit<ComponentFusion, 'id'>) => void;
  removeFusion: (componentId: string, fusionId: string) => void;
  updateFusion: (componentId: string, fusionId: string, updates: Partial<ComponentFusion>) => void;
  toggleFusion: (componentId: string, fusionId: string) => void;
  applyFusionPreset: (componentId: string, presetId: string) => void;

  // Actions
  addComponent: (type: GodUIComponentType, targetIndex?: number) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  reorderComponents: (startIndex: number, endIndex: number) => void;
  moveComponent: (id: string, direction: 'up' | 'down') => void;
  updateComponentProps: (id: string, newProps: Record<string, any>) => void;
  toggleVisibility: (id: string) => void;
  selectComponent: (id: string | null) => void;
  
  setViewport: (viewport: ViewportMode) => void;
  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: ThemePalette) => void;
  setInspectingDocType: (type: GodUIComponentType | null) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Template & Reset
  loadTemplate: (templateId: string) => void;
  clearCanvas: () => void;

  // Interactions
  triggerInteraction: (source: string, action: string, details: string) => void;
  dismissToast: () => void;

  // ============================================
  // COMPOSER STATE
  // ============================================

  // Current composition
  currentComposition: ComposedComponent | null;
  composerHistory: ComposedComponent[][];
  composerHistoryIndex: number;

  // Drag state for composer
  draggingEffect: DraggingEffectItem | null;
  activeComposerDropZone: { compositionId: string; layerId: string } | null;

  // Composer UI state
  composerSelectedLayer: string | null;
  composerConfiguringEffect: { layerId: string; effectId: string } | null;
  composerPreviewFormat: ExportFormat;

  // Saved presets
  savedCompositionPresets: CompositionPreset[];

  // Composer Actions
  createComposition: (base: GodUIComponentType, name?: string) => void;
  loadComposition: (composition: ComposedComponent) => void;
  clearComposition: () => void;

  // Layer management
  addLayer: (layerId: string) => void;
  removeLayer: (layerId: string) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;

  // Effect management
  applyEffect: (layerId: string, effectId: string) => void;
  removeEffect: (layerId: string, effectId: string) => void;
  configureEffect: (layerId: string, effectId: string, config: Record<string, any>) => void;
  toggleEffect: (layerId: string, effectId: string) => void;
  reorderEffects: (layerId: string, fromIndex: number, toIndex: number) => void;

  // Token management
  setToken: (key: string, value: string | number) => void;
  removeToken: (key: string) => void;

  // Preset management
  loadPreset: (presetId: string) => void;
  saveAsPreset: (name: string, namePt: string, category: string, tags: string[]) => void;

  // Composer drag state
  setDraggingEffect: (item: DraggingEffectItem | null) => void;
  setActiveComposerDropZone: (zone: { compositionId: string; layerId: string } | null) => void;
  setComposerSelectedLayer: (layerId: string | null) => void;
  setComposerConfiguringEffect: (target: { layerId: string; effectId: string } | null) => void;
  setComposerPreviewFormat: (format: ExportFormat) => void;

  // Code generation
  generateCompositionCode: (format?: ExportFormat) => string;
}

// Generate an initial default page from the first template
const initialTemplate = PAGE_TEMPLATES[0];
const initialComponents: BuilderComponentInstance[] = initialTemplate.components.map((c, index) => ({
  ...c,
  id: `comp-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
}));

const MAX_HISTORY = 25;

export const useBuilderStore = create<BuilderState>((set, get) => ({
  components: initialComponents,
  selectedId: initialComponents[1]?.id || null,
  viewport: 'desktop',
  viewMode: 'builder',
  theme: 'godly-cyan',

  history: [initialComponents],
  historyIndex: 0,

  interactionEvents: [],
  activeToast: null,
  inspectingDocType: null,
  mobileTab: 'canvas',

  isFusionModalOpen: false,
  activeFusionComponentId: null,

  // Animation Play & Replay Engine
  componentReplayKeys: {},
  globalReplayKey: 0,

  replayComponentAnimation: (componentId, type = 'entrance') => {
    const keySuffix = type === 'exit' ? '-exit' : '';
    if (componentId) {
      set((state) => ({
        componentReplayKeys: {
          ...state.componentReplayKeys,
          [`${componentId}${keySuffix}`]: (state.componentReplayKeys[`${componentId}${keySuffix}`] || 0) + 1,
        },
        activeToast: {
          message: type === 'exit' ? '◀ Animação de saída reproduzida!' : '▶️ Animação de entrada reproduzida!',
          type: 'info',
        },
      }));
    } else {
      set((state) => {
        const nextKeys: Record<string, number> = {};
        state.components.forEach((c) => {
          nextKeys[`${c.id}${keySuffix}`] = (state.componentReplayKeys[`${c.id}${keySuffix}`] || 0) + 1;
        });
        return {
          componentReplayKeys: nextKeys,
          globalReplayKey: state.globalReplayKey + 1,
          activeToast: {
            message: type === 'exit' ? '◀ Todas as animações de saída reiniciadas!' : '▶️ Todas as animações de entrada reiniciadas!',
            type: 'info',
          },
        };
      });
    }
  },

  setComponentAnimations: (componentId, animations) => {
    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== componentId) return comp;
      return { ...comp, animations };
    });

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: updatedList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  // Page Scroll Simulation
  scrollSimulationProgress: 0,
  isScrollSimulationActive: false,

  setScrollSimulationProgress: (val) => {
    const clamped = Math.max(0, Math.min(100, val));
    set({ scrollSimulationProgress: clamped });
  },

  toggleScrollSimulation: () => {
    set((state) => ({
      isScrollSimulationActive: !state.isScrollSimulationActive,
      activeToast: {
        message: !state.isScrollSimulationActive
          ? '📜 Modo de Simulação de Scroll da Página Ativado'
          : 'Modo de Rolagem Padrão Restaurado',
        type: 'info',
      },
    }));
  },

  // Drag and Drop Fusion State
  draggingItem: null,
  activeHoverDropZone: null,
  sourceMergeComponentId: null,

  setDraggingItem: (item) => set({ draggingItem: item }),

  setActiveHoverDropZone: (zone) => set({ activeHoverDropZone: zone }),

  setSourceMergeComponent: (id) => set({ sourceMergeComponentId: id }),

  mergeCanvasComponents: (sourceId, targetId, slot, explicitEffectType, trigger = 'hover') => {
    if (sourceId === targetId) return;

    const sourceComp = get().components.find((c) => c.id === sourceId);
    const targetComp = get().components.find((c) => c.id === targetId);
    if (!sourceComp || !targetComp) return;

    const effectType = explicitEffectType || getComponentSignatureEffect(sourceComp.type);
    const donorMeta = FUSION_DONORS[effectType];
    const sourceEffectName = donorMeta?.name || `${sourceComp.name} Efeito`;

    const newFusion: ComponentFusion = {
      id: `fusion-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sourceEffect: effectType,
      sourceComponentName: `${sourceComp.name} (${donorMeta?.name || effectType})`,
      targetSlot: slot,
      trigger: trigger,
      intensity: 0.85,
      withShimmer: true,
      withGlow: true,
      active: true,
    };

    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== targetId) return comp;
      const existing = comp.fusions || [];
      return {
        ...comp,
        fusions: [...existing, newFusion],
      };
    });

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    const slotNames: Record<string, string> = {
      'border': 'Borda (Stroke)',
      'background': 'Fundo / Container',
      'icon': 'Ícones',
      'active-item': 'Item Ativo (Clicado)',
      'interactive-items': 'Botões Interativos',
      'title': 'Título',
      'subtitle': 'Subtítulo',
      'badge': 'Badge / Tag',
      'before-glow': 'Camada ::before (Glow)',
      'after-shine': 'Camada ::after (Shimmer)',
      'content': 'Conteúdo Central',
      'main-container': 'Container',
      'hover-state': 'Hover'
    };

    set({
      components: updatedList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      selectedId: targetId,
      sourceMergeComponentId: null,
      draggingItem: null,
      activeHoverDropZone: null,
      activeToast: {
        message: `⚡ Fusão Concluída! ${sourceComp.name} ➔ ${targetComp.name} [${slotNames[slot] || slot}]!`,
        type: 'success',
      },
    });
  },

  dropEffectOnSlot: (componentId, slot, explicitEffectType, trigger = 'hover') => {
    const dragging = get().draggingItem;
    const effectType = explicitEffectType || dragging?.effectType || 'liquid-glass';
    const donorMeta = FUSION_DONORS[effectType];
    const sourceName = donorMeta?.name || dragging?.effectName || 'Efeito';

    const targetComponent = get().components.find(c => c.id === componentId);
    if (!targetComponent) return;

    const newFusion: ComponentFusion = {
      id: `fusion-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sourceEffect: effectType,
      sourceComponentName: sourceName,
      targetSlot: slot,
      trigger: trigger,
      intensity: 0.85,
      withShimmer: true,
      withGlow: true,
      active: true,
    };

    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== componentId) return comp;
      const existing = comp.fusions || [];
      return {
        ...comp,
        fusions: [...existing, newFusion],
      };
    });

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    const slotNames: Record<string, string> = {
      'border': 'Borda (Stroke)',
      'background': 'Fundo / Container',
      'icon': 'Ícones',
      'active-item': 'Item Ativo (Clicado)',
      'interactive-items': 'Botões Interativos',
      'title': 'Título',
      'subtitle': 'Subtítulo',
      'badge': 'Badge / Tag',
      'before-glow': 'Camada ::before (Glow)',
      'after-shine': 'Camada ::after (Shimmer)',
      'content': 'Conteúdo Central',
      'main-container': 'Container',
      'hover-state': 'Hover'
    };

    set({
      components: updatedList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      selectedId: componentId,
      draggingItem: null,
      activeHoverDropZone: null,
      activeToast: {
        message: `⚡ Fusão Aplicada! ${sourceName} fundido em [${slotNames[slot] || slot}] de ${targetComponent.name}!`,
        type: 'success',
      },
    });
  },

  openFusionModal: (componentId) => set({
    isFusionModalOpen: true,
    activeFusionComponentId: componentId,
  }),

  closeFusionModal: () => set({
    isFusionModalOpen: false,
    activeFusionComponentId: null,
  }),

  addFusion: (componentId, fusionData) => {
    const newFusion: ComponentFusion = {
      ...fusionData,
      id: `fusion-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };

    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== componentId) return comp;
      const existing = comp.fusions || [];
      return {
        ...comp,
        fusions: [...existing, newFusion],
      };
    });

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: updatedList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      isFusionModalOpen: false,
      activeToast: {
        message: `Fusão Aplicada: ${fusionData.sourceComponentName} ➔ ${fusionData.targetSlot}`,
        type: 'success',
      },
    });
  },

  removeFusion: (componentId, fusionId) => {
    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== componentId) return comp;
      return {
        ...comp,
        fusions: (comp.fusions || []).filter(f => f.id !== fusionId),
      };
    });

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: updatedList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      activeToast: {
        message: 'Fusão removida com sucesso',
        type: 'info',
      },
    });
  },

  updateFusion: (componentId, fusionId, updates) => {
    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== componentId) return comp;
      return {
        ...comp,
        fusions: (comp.fusions || []).map(f => f.id === fusionId ? { ...f, ...updates } : f),
      };
    });

    set({ components: updatedList });
  },

  toggleFusion: (componentId, fusionId) => {
    const currentList = get().components;
    const updatedList = currentList.map((comp) => {
      if (comp.id !== componentId) return comp;
      return {
        ...comp,
        fusions: (comp.fusions || []).map(f => f.id === fusionId ? { ...f, active: !f.active } : f),
      };
    });

    set({ components: updatedList });
  },

  applyFusionPreset: (componentId, presetId) => {
    const preset = FUSION_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    get().addFusion(componentId, {
      sourceEffect: preset.donorEffect,
      sourceComponentName: preset.name,
      targetSlot: preset.targetSlot,
      intensity: preset.intensity,
      withShimmer: preset.withShimmer,
      active: true,
    });
  },

  setMobileTab: (tab) => set({ mobileTab: tab }),
  setInspectingDocType: (type) => set({ inspectingDocType: type }),

  addComponent: (type, targetIndex) => {
    const meta = GODUI_CATALOG[type];
    if (!meta) return;

    const newComponent: BuilderComponentInstance = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type,
      name: meta.name,
      props: { ...meta.defaultProps },
      isVisible: true,
    };

    const currentList = get().components;
    let updatedList: BuilderComponentInstance[];

    if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= currentList.length) {
      updatedList = [
        ...currentList.slice(0, targetIndex),
        newComponent,
        ...currentList.slice(targetIndex),
      ];
    } else {
      updatedList = [...currentList, newComponent];
    }

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: updatedList,
      selectedId: newComponent.id,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      activeToast: {
        message: `Adicionado: ${meta.name}`,
        type: 'success',
      },
    });
  },

  removeComponent: (id) => {
    const currentList = get().components;
    const toRemove = currentList.find(c => c.id === id);
    const updatedList = currentList.filter(c => c.id !== id);

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: updatedList,
      selectedId: get().selectedId === id ? null : get().selectedId,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      activeToast: toRemove ? { message: `Removido: ${toRemove.name}`, type: 'info' } : null,
    });
  },

  duplicateComponent: (id) => {
    const currentList = get().components;
    const index = currentList.findIndex(c => c.id === id);
    if (index === -1) return;

    const original = currentList[index];
    const duplicated: BuilderComponentInstance = {
      ...original,
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: `${original.name} (Cópia)`,
      props: JSON.parse(JSON.stringify(original.props)),
    };

    const updatedList = [
      ...currentList.slice(0, index + 1),
      duplicated,
      ...currentList.slice(index + 1),
    ];

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(updatedList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: updatedList,
      selectedId: duplicated.id,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      activeToast: { message: `Duplicado: ${original.name}`, type: 'success' },
    });
  },

  reorderComponents: (startIndex, endIndex) => {
    const currentList = [...get().components];
    const [removed] = currentList.splice(startIndex, 1);
    currentList.splice(endIndex, 0, removed);

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(currentList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: currentList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  moveComponent: (id, direction) => {
    const currentList = [...get().components];
    const index = currentList.findIndex(c => c.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const [moved] = currentList.splice(index, 1);
    currentList.splice(targetIndex, 0, moved);

    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push(currentList);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();

    set({
      components: currentList,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  updateComponentProps: (id, newProps) => {
    const currentList = get().components.map(comp => {
      if (comp.id === id) {
        return {
          ...comp,
          props: { ...comp.props, ...newProps },
        };
      }
      return comp;
    });

    set({ components: currentList });
  },

  toggleVisibility: (id) => {
    const currentList = get().components.map(comp => {
      if (comp.id === id) {
        return { ...comp, isVisible: !comp.isVisible };
      }
      return comp;
    });
    set({ components: currentList });
  },

  selectComponent: (id) => set({ selectedId: id }),

  setViewport: (viewport) => set({ viewport }),
  setViewMode: (viewMode) => set({ viewMode }),
  setTheme: (theme) => set({ theme }),

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        components: history[newIndex],
        historyIndex: newIndex,
        selectedId: null,
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        components: history[newIndex],
        historyIndex: newIndex,
        selectedId: null,
      });
    }
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  loadTemplate: (templateId) => {
    const template = PAGE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const newComponents: BuilderComponentInstance[] = template.components.map((c, i) => ({
      ...c,
      id: `comp-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`,
    }));

    const newHistory = [newComponents];
    set({
      components: newComponents,
      selectedId: newComponents[0]?.id || null,
      history: newHistory,
      historyIndex: 0,
      activeToast: { message: `Template Carregado: ${template.name}`, type: 'success' },
    });
  },

  clearCanvas: () => {
    const newHistory = get().history.slice(0, get().historyIndex + 1);
    newHistory.push([]);
    set({
      components: [],
      selectedId: null,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      activeToast: { message: 'Canvas limpo', type: 'info' },
    });
  },

  triggerInteraction: (source, action, details) => {
    const newEvent: InteractionEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: Date.now(),
      sourceComponent: source,
      action,
      details,
    };

    set(state => ({
      interactionEvents: [newEvent, ...state.interactionEvents.slice(0, 19)],
      activeToast: {
        message: `${source}: ${action}`,
        type: 'info',
      },
    }));
  },

  dismissToast: () => set({ activeToast: null }),

  // ============================================
  // COMPOSER STATE & ACTIONS
  // ============================================

  currentComposition: null,
  composerHistory: [],
  composerHistoryIndex: -1,
  draggingEffect: null,
  activeComposerDropZone: null,
  composerSelectedLayer: null,
  composerConfiguringEffect: null,
  composerPreviewFormat: 'react-tsx',
  savedCompositionPresets: COMPOSITION_PRESETS,

  createComposition: (base, name) => {
    const component = COMPONENT_REGISTRY[base];
    if (!component) return;

    const composition: ComposedComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: name || `My ${component.name}`,
      baseComponent: base,
      layers: component.layers.map(l => ({
        layerId: l.id,
        effects: [],
      })),
      tokens: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [],
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([composition]);

    set({
      currentComposition: composition,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
      composerSelectedLayer: null,
      composerConfiguringEffect: null,
      activeToast: { message: `Composição criada: ${composition.name}`, type: 'success' },
    });
  },

  loadComposition: (composition) => {
    set({
      currentComposition: { ...composition, updatedAt: Date.now() },
      composerSelectedLayer: null,
      composerConfiguringEffect: null,
    });
  },

  clearComposition: () => {
    set({
      currentComposition: null,
      composerSelectedLayer: null,
      composerConfiguringEffect: null,
      composerHistory: [],
      composerHistoryIndex: -1,
    });
  },

  addLayer: (layerId) => {
    const comp = get().currentComposition;
    if (!comp) return;
    if (comp.layers.some(l => l.layerId === layerId)) return;

    const component = COMPONENT_REGISTRY[comp.baseComponent];
    const layerDef = component?.layers.find(l => l.id === layerId);
    if (!layerDef) return;

    const newLayer: ComposedLayer = { layerId, effects: [] };
    const newComp: ComposedComponent = {
      ...comp,
      layers: [...comp.layers, newLayer].sort((a, b) => {
        const aDef = component?.layers.find(l => l.id === a.layerId);
        const bDef = component?.layers.find(l => l.id === b.layerId);
        return (aDef?.order || 0) - (bDef?.order || 0);
      }),
      updatedAt: Date.now(),
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([newComp]);

    set({
      currentComposition: newComp,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
    });
  },

  removeLayer: (layerId) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newComp: ComposedComponent = {
      ...comp,
      layers: comp.layers.filter(l => l.layerId !== layerId),
      updatedAt: Date.now(),
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([newComp]);

    set({
      currentComposition: newComp,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
      composerSelectedLayer: get().composerSelectedLayer === layerId ? null : get().composerSelectedLayer,
    });
  },

  reorderLayers: (fromIndex, toIndex) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newLayers = [...comp.layers];
    const [removed] = newLayers.splice(fromIndex, 1);
    newLayers.splice(toIndex, 0, removed);

    const newComp: ComposedComponent = {
      ...comp,
      layers: newLayers,
      updatedAt: Date.now(),
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([newComp]);

    set({
      currentComposition: newComp,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
    });
  },

  applyEffect: (layerId, effectId) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const effect = getEffectById(effectId);
    if (!effect) return;

    // Check conflicts
    const layer = comp.layers.find(l => l.layerId === layerId);
    const currentEffectIds = (layer?.effects || []).map(e => e.effectId);
    const conflict = conflictResolver.wouldConflict(effectId, currentEffectIds);
    if (conflict) {
      set({
        activeToast: {
          message: `Conflito: ${conflict.resolution === 'keep-last' ? 'Este efeito conflita com um existente' : 'Este efeito entra em conflito com um efeito existente'}`,
          type: 'warning',
        },
      });
      return;
    }

    const newEffect: AppliedEffect = {
      effectId,
      config: { ...effect.defaultConfig },
      enabled: true,
      order: (layer?.effects.length || 0),
    };

    const newComp: ComposedComponent = {
      ...comp,
      layers: comp.layers.map(l => {
        if (l.layerId !== layerId) return l;
        return { ...l, effects: [...l.effects, newEffect] };
      }),
      updatedAt: Date.now(),
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([newComp]);

    set({
      currentComposition: newComp,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
      activeToast: { message: `Efeito aplicado: ${effect.name}`, type: 'success' },
    });
  },

  removeEffect: (layerId, effectId) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newComp: ComposedComponent = {
      ...comp,
      layers: comp.layers.map(l => {
        if (l.layerId !== layerId) return l;
        return { ...l, effects: l.effects.filter(e => e.effectId !== effectId) };
      }),
      updatedAt: Date.now(),
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([newComp]);

    set({
      currentComposition: newComp,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
      composerConfiguringEffect: get().composerConfiguringEffect?.effectId === effectId
        ? null
        : get().composerConfiguringEffect,
    });
  },

  configureEffect: (layerId, effectId, config) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newComp: ComposedComponent = {
      ...comp,
      layers: comp.layers.map(l => {
        if (l.layerId !== layerId) return l;
        return {
          ...l,
          effects: l.effects.map(e => {
            if (e.effectId !== effectId) return e;
            return { ...e, config: { ...e.config, ...config } };
          }),
        };
      }),
      updatedAt: Date.now(),
    };

    set({ currentComposition: newComp });
  },

  toggleEffect: (layerId, effectId) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newComp: ComposedComponent = {
      ...comp,
      layers: comp.layers.map(l => {
        if (l.layerId !== layerId) return l;
        return {
          ...l,
          effects: l.effects.map(e => {
            if (e.effectId !== effectId) return e;
            return { ...e, enabled: !e.enabled };
          }),
        };
      }),
      updatedAt: Date.now(),
    };

    set({ currentComposition: newComp });
  },

  reorderEffects: (layerId, fromIndex, toIndex) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newComp: ComposedComponent = {
      ...comp,
      layers: comp.layers.map(l => {
        if (l.layerId !== layerId) return l;
        const newEffects = [...l.effects];
        const [removed] = newEffects.splice(fromIndex, 1);
        newEffects.splice(toIndex, 0, removed);
        return { ...l, effects: newEffects.map((e, i) => ({ ...e, order: i })) };
      }),
      updatedAt: Date.now(),
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([newComp]);

    set({
      currentComposition: newComp,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
    });
  },

  setToken: (key, value) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const existing = comp.tokens.find(t => t.key === key);
    let newTokens: DesignToken[];

    if (existing) {
      newTokens = comp.tokens.map(t => t.key === key ? { ...t, value } : t);
    } else {
      newTokens = [...comp.tokens, { key, value, category: 'spacing', label: key, labelPt: key }];
    }

    const newComp: ComposedComponent = {
      ...comp,
      tokens: newTokens,
      updatedAt: Date.now(),
    };

    set({ currentComposition: newComp });
  },

  removeToken: (key) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const newComp: ComposedComponent = {
      ...comp,
      tokens: comp.tokens.filter(t => t.key !== key),
      updatedAt: Date.now(),
    };

    set({ currentComposition: newComp });
  },

  loadPreset: (presetId) => {
    const preset = COMPOSITION_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    const composition: ComposedComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: preset.name,
      baseComponent: preset.baseComponent,
      layers: preset.layers.map(l => ({
        layerId: l.layerId,
        effects: l.effects.map(e => ({
          ...e,
          config: { ...e.config },
        })),
      })),
      tokens: preset.tokens.map(t => ({ ...t })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [...preset.tags],
    };

    const history = get().composerHistory.slice(0, get().composerHistoryIndex + 1);
    history.push([composition]);

    set({
      currentComposition: composition,
      composerHistory: history,
      composerHistoryIndex: history.length - 1,
      composerSelectedLayer: null,
      composerConfiguringEffect: null,
      activeToast: { message: `Preset carregado: ${preset.name}`, type: 'success' },
    });
  },

  saveAsPreset: (name, namePt, category, tags) => {
    const comp = get().currentComposition;
    if (!comp) return;

    const preset: CompositionPreset = {
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      namePt,
      description: `Custom preset: ${name}`,
      descriptionPt: `Preset personalizado: ${namePt}`,
      category,
      baseComponent: comp.baseComponent,
      layers: comp.layers.map(l => ({
        layerId: l.layerId,
        effects: l.effects.map(e => ({
          effectId: e.effectId,
          config: { ...e.config },
          enabled: e.enabled,
          order: e.order,
        })),
      })),
      tokens: comp.tokens.map(t => ({ ...t })),
      tags,
    };

    set(state => ({
      savedCompositionPresets: [...state.savedCompositionPresets, preset],
      activeToast: { message: `Preset salvo: ${name}`, type: 'success' },
    }));
  },

  setDraggingEffect: (item) => set({ draggingEffect: item }),
  setActiveComposerDropZone: (zone) => set({ activeComposerDropZone: zone }),
  setComposerSelectedLayer: (layerId) => set({ composerSelectedLayer: layerId }),
  setComposerConfiguringEffect: (target) => set({ composerConfiguringEffect: target }),
  setComposerPreviewFormat: (format) => set({ composerPreviewFormat: format }),

  generateCompositionCode: (format) => {
    const comp = get().currentComposition;
    if (!comp) return '';
    const result = generateCode(comp, format || get().composerPreviewFormat);
    return result.code;
  },
}));
