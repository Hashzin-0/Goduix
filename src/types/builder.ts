import { ThemePalette } from '../types';

export type GodUIComponentType =
  // Core Components
  | 'dynamic-island'
  | 'godui-dock'
  | 'floating-toolbar'
  | 'liquid-glass-button'
  | 'shimmer-button'
  | 'magnetic-button'
  | 'hold-confirm-button'
  | 'gooey-fab'
  | 'spotlight-card'
  | 'tilt-3d-card'
  | 'bento-grid'
  | 'aurora-text'
  | 'voice-orb'
  | 'glass-footer'
  | 'blueprint-grid'
  | 'interactive-3d-mesh'
  | 'jelly-button'
  | 'magic-button'
  | 'mask-button'
  | 'multi-button'
  | 'magic-input'
  | 'elastic-text'
  | 'number-ticker'
  | 'scroll-text-reveal'
  | 'lamp'
  | 'ascii-dither'
  | 'inset-glass-card'
  | 'scroll-glow-container'
  // Buttons
  | 'progress-fold-button'
  | 'slide-confirm-button'
  // Inputs
  | 'otp-input'
  // Navigation
  | 'breadcrumbs'
  | 'combobox'
  | 'context-menu'
  | 'dropdown-menu'
  | 'filter-bar'
  | 'magic-tab'
  | 'mega-menu'
  | 'resizable-header'
  | 'segmented-control'
  | 'tab-bar'
  // Overlays
  | 'animated-tooltip'
  | 'command-palette'
  | 'drawer'
  | 'morphing-dialog'
  | 'toast'
  // Layout
  | 'accordion'
  | 'animated-testimonials'
  | 'app-showcase'
  | 'avatar-group'
  | 'card-swap'
  | 'container-scroll'
  | 'cover-flow'
  | 'gooey-stack'
  | 'hero-parallax'
  | 'image-accordion'
  | 'image-compare'
  | 'inertia-gallery'
  | 'morph-gallery'
  | 'orbit-carousel'
  | 'progressive-card-reveal'
  | 'reorder-list'
  | 'scroll-stack'
  | 'spin-viewer'
  | 'split-flap-display'
  | 'stepper'
  | 'sticky-scroll'
  | 'stack-badge'
  | 'store-badge'
  | 'swipe-deck'
  | 'three-d-marquee'
  | 'holographic-card'
  // Text
  | 'text-animate'
  | 'text-scramble'
  | 'highlighter'
  // AI
  | 'agent-flow'
  | 'agent-timeline'
  | 'conversation-thread'
  | 'prompt-composer'
  | 'prompt-suggestions'
  | 'source-citations'
  // Collaboration
  | 'comment-pin'
  | 'live-cursors'
  | 'notification-inbox'
  | 'presence-facepile'
  // Visualizations
  | 'animated-beam'
  | 'globe'
  | 'gravity'
  | 'orbiting-circles'
  | 'scroll-timeline'
  | 'world-map'
  // Effects
  | 'beam-draw'
  | 'border-beam'
  | 'confetti'
  | 'encrypted-card'
  | 'fluid-cursor'
  | 'image-trail'
  | 'liquid-image'
  | 'marquee'
  | 'particle-dissolve'
  | 'scroll-progress'
  | 'scroll-reveal'
  | 'spotlight-reveal'
  | 'terminal'
  // Backgrounds
  | 'flow-field'
  | 'light-rays'
  | 'liquid-metaballs'
  | 'pixel-grid'
  | 'topographic-drift'
  | 'warp-starfield'
  // Glass
  | 'liquid-glass-card'
  | 'liquid-glass-lens'
  // Static Effects
  | 'decorative-background'
  | 'effect-background'
  | 'geometric-background'
  | 'gradient-background';

export type ComponentCategory =
  | 'Navigation & Overlays'
  | 'Buttons & Actions'
  | 'Cards & Layout'
  | 'Typography & AI'
  | 'Footers & Backgrounds'
  | 'Inputs & Forms'
  | 'Creative & Shaders'
  | 'AI & Collaboration'
  | 'Visualizations'
  | 'Effects & Backgrounds'
  | 'Glass & Static';

// Animation Types for Components
export type EntranceAnimationType =
  | 'fade-spring'
  | 'blur-scale-up'
  | 'slide-up'
  | 'slide-down'
  | 'none';

export type ExitAnimationType =
  | 'fade-out'
  | 'scale-down'
  | 'slide-up-exit'
  | 'none';

export type LoopingAnimationType =
  | 'gentle-float'
  | 'pulse-glow'
  | 'subtle-orbit'
  | 'none';

export interface ComponentAnimations {
  entrance?: EntranceAnimationType;
  exit?: ExitAnimationType;
  looping?: LoopingAnimationType;
}

export interface PropFieldSchema {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'color';
  defaultValue: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface GodUIMeta {
  type: GodUIComponentType;
  name: string;
  category: ComponentCategory;
  description: string;
  iconName: string;
  badge: string;
  registryName: string;
  dependencies: string[];
  propFields: PropFieldSchema[];
  defaultProps: Record<string, any>;
  sampleCode: string;
}

export type FusionEffectType =
  | 'liquid-glass'
  | 'gooey-liquid'
  | 'magnetic-pull'
  | 'shimmer-beam'
  | 'hologram-3d-tilt'
  | 'spotlight-beam'
  | 'aurora-glow'
  | 'hold-confirm-ring'
  | 'jelly-bounce'
  | 'magic-sparkle'
  | 'lamp-beam'
  | 'ascii-dither-fx'
  // Full site component effects
  | 'dock-magnification'
  | 'island-morph'
  | 'toolbar-pill-morph'
  | 'voice-pulse'
  | 'radial-satellite'
  | 'mask-wipe'
  | 'bento-gradient-border'
  | 'blueprint-laser'
  | 'mesh-3d-wire'
  | 'elastic-stretch'
  | 'number-odometer'
  | 'scroll-reveal'
  | 'magic-rainbow-stroke'
  | 'glass-refraction';

export type FusionTargetSlot =
  | 'border'            // Borda / Contorno / Stroke exterior
  | 'background'        // Fundo / Container principal
  | 'icon'              // Ícone / Glifos
  | 'active-item'       // Card / Item ativo selecionado (ex: ferramenta ativa)
  | 'interactive-items' // Todos os botões / itens clicáveis
  | 'title'             // Título principal / Tipografia
  | 'subtitle'          // Subtítulo / Descrição
  | 'badge'             // Badge / Chip / Tag
  | 'before-glow'       // Pseudo-elemento ::before (Aura luminosa)
  | 'after-shine'       // Pseudo-elemento ::after (Feixe de luz / Shimmer)
  | 'content'           // Conteúdo central / Área interna
  | 'main-container'    // Alias para background
  | 'hover-state';      // Alias para hover

export type FusionTriggerType =
  | 'always'            // Sempre ativo / Contínuo
  | 'hover'             // Ao passar o mouse (Hover)
  | 'click'             // Ao clicar (Click)
  | 'entrance'          // Na animação de entrada (Mount / InView)
  | 'exit'              // Na animação de saída (Exit)
  | 'open'              // Ao abrir / expandir (Open)
  | 'close'             // Ao fechar / recolher (Close)
  | 'longpress'         // Pressionamento sustentado (Hold / Longpress)
  | 'active';           // Quando o elemento está ativo / selecionado

export interface ComponentFusion {
  id: string;
  sourceEffect: FusionEffectType;
  sourceComponentName: string;
  targetSlot: FusionTargetSlot;
  trigger?: FusionTriggerType; // Gatilho: entrada, hover, saída, click, open, close, longpress, active, always
  intensity: number; // 0.1 to 1.0 (default: 0.8)
  withShimmer?: boolean;
  withGlow?: boolean;
  customColor?: string;
  strokeWidth?: number;
  active: boolean;
}

export interface DraggingFusionItem {
  type: 'effect' | 'component';
  effectType: FusionEffectType;
  effectName: string;
  sourceComponentName: string;
  sourceComponentType?: GodUIComponentType;
  sourceInstanceId?: string; // If dragged directly from another canvas component
  suggestedSlot?: FusionTargetSlot;
}

export interface ActiveDropZone {
  componentId: string;
  slot: FusionTargetSlot;
}

export interface BuilderComponentInstance {
  id: string;
  type: GodUIComponentType;
  name: string;
  props: Record<string, any>;
  isVisible: boolean;
  fusions?: ComponentFusion[];
  animations?: ComponentAnimations;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';
export type ViewMode = 'builder' | 'preview' | 'code' | 'composer';

export interface InteractionEvent {
  id: string;
  timestamp: number;
  sourceComponent: string;
  action: string;
  details: string;
}
