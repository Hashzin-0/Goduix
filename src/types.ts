export type ComponentId = 
  | 'floating-island-header'
  | 'liquid-glass-button'
  | 'magic-shimmer-button'
  | 'gooey-fab'
  | 'magnetic-button'
  | 'inset-glass-card'
  | 'tilt-3d-card'
  | 'scroll-glow'
  | 'interactive-3d-mesh'
  | 'aurora-text'
  | 'bento-grid-section';

export type EntranceAnimation = 'fade-spring' | 'blur-scale-up' | 'slide-up' | 'none';
export type LoopingAnimation = 'gentle-float' | 'pulse-glow' | 'subtle-orbit' | 'none';
export type ThemePalette = 'godly-cyan' | 'neon-emerald' | 'hyper-violet' | 'liquid-amber' | 'clean-monochrome';

export interface ThemeColors {
  name: string;
  id: ThemePalette;
  primary: string;
  glow: string;
  accent: string;
  ring: string;
  gradient: string;
}

export interface ComposerConfig {
  activeComponents: Record<ComponentId, boolean>;
  theme: ThemePalette;
  entranceAnimation: EntranceAnimation;
  loopingAnimation: LoopingAnimation;
  
  // Customization props
  floatingIsland: {
    title: string;
    showNav: boolean;
    showBadge: boolean;
    compactOnScroll: boolean;
    blurAmount: number; // 4 to 24px
  };
  liquidGlass: {
    label: string;
    variant: 'liquid' | 'frost' | 'crystal';
    glowIntensity: number; // 0.1 to 1.0
    withShimmer: boolean;
  };
  insetCard: {
    title: string;
    description: string;
    specularHighlight: boolean;
    insetDepth: 'subtle' | 'deep' | 'ultra';
    borderGlow: boolean;
  };
  scrollGlow: {
    intensity: number;
    syncWithMouse: boolean;
    color: string;
  };
  threeMesh: {
    mode: 'wireframe-orb' | 'mesh-plane' | 'particle-field';
    wireframe: boolean;
    speed: number;
    opacity: number;
  };
  tiltCard: {
    maxTilt: number;
    glareOpacity: number;
    perspective: number;
  };
  bentoGrid: {
    columns: 2 | 3;
    showStats: boolean;
  };
}

export interface GodUIComponentMeta {
  id: ComponentId;
  name: string;
  category: 'Navigation' | 'Buttons & Actions' | 'Surfaces & Cards' | 'Effects & 3D' | 'Typography';
  description: string;
  iconName: string;
  tag: string;
}
