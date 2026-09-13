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
}));
