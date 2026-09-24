import * as React from 'react';
import { GodUIComponentType, ComponentCategory, PropFieldSchema } from './builder';

// ============================================================
// EFFECT CATEGORIES
// ============================================================

export type EffectCategory =
  | 'background'
  | 'border'
  | 'shadow'
  | 'hover'
  | 'click'
  | 'animation'
  | 'typography'
  | 'structure'
  | 'layout'
  | 'loading'
  | 'transition';

// ============================================================
// MERGE STRATEGIES
// ============================================================

export type MergeStrategy = 'replace' | 'stack' | 'compose';

// ============================================================
// LAYER DEFINITION
// ============================================================

export interface LayerDefinition {
  id: string;
  label: string;
  labelPt: string;
  required: boolean;
  accepts: EffectCategory[];
  conflictsWith: string[];
  mergeStrategy: MergeStrategy;
  order: number;
  icon: string;
  description: string;
}

// ============================================================
// EFFECT CONFIG SCHEMA
// ============================================================

export interface EffectConfigField {
  key: string;
  label: string;
  type: 'color' | 'number' | 'select' | 'boolean' | 'slider' | 'text';
  default: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
}

// ============================================================
// EFFECT MODULE
// ============================================================

export interface EffectRendererProps {
  config: Record<string, any>;
  children: React.ReactNode;
  isActive?: boolean;
}

export interface EffectPreviewProps {
  config: Record<string, any>;
}

export interface EffectModule {
  id: string;
  category: EffectCategory;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  icon: string;
  badge?: string;
  color: string;

  // Composition metadata
  compatibleWith: string[];
  acceptedByLayers: string[];
  conflictsWith: string[];
  mergeStrategy: MergeStrategy;

  // Dependencies
  requires: string[];
  enhances: string[];

  // Configuration
  configSchema: EffectConfigField[];
  defaultConfig: Record<string, any>;

  // Rendering
  renderer: React.ComponentType<EffectRendererProps>;
  previewRenderer?: React.ComponentType<EffectPreviewProps>;
}

// ============================================================
// APPLIED EFFECT
// ============================================================

export interface AppliedEffect {
  effectId: string;
  config: Record<string, any>;
  enabled: boolean;
  order: number;
}

// ============================================================
// COMPOSED LAYER
// ============================================================

export interface ComposedLayer {
  layerId: string;
  effects: AppliedEffect[];
}

// ============================================================
// DESIGN TOKEN
// ============================================================

export type TokenCategory =
  | 'spacing'
  | 'radius'
  | 'duration'
  | 'easing'
  | 'color'
  | 'shadow'
  | 'border'
  | 'typography';

export interface DesignToken {
  key: string;
  value: string | number;
  unit?: string;
  category: TokenCategory;
  label: string;
  labelPt: string;
}

// ============================================================
// COMPOSED COMPONENT
// ============================================================

export interface ComposedComponent {
  id: string;
  name: string;
  baseComponent: GodUIComponentType;
  layers: ComposedLayer[];
  tokens: DesignToken[];
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

// ============================================================
// COMPONENT REGISTRATION
// ============================================================

export interface ComponentRegistration {
  type: GodUIComponentType;
  name: string;
  namePt: string;
  category: ComponentCategory;
  description: string;
  descriptionPt: string;
  icon: string;
  badge: string;

  // Layer architecture
  layers: LayerDefinition[];
  layerEffectMap: Record<string, string[]>;

  // Dependencies
  dependencies: string[];

  // Default composition
  defaultComposition: Partial<ComposedComponent>;

  // Prop schema
  propFields: PropFieldSchema[];
  defaultProps: Record<string, any>;

  // Code generation
  sampleCode: string;
  registryName: string;
}

// ============================================================
// COMPOSITION PRESET
// ============================================================

export interface CompositionPreset {
  id: string;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  category: string;
  baseComponent: GodUIComponentType;
  layers: ComposedLayer[];
  tokens: DesignToken[];
  tags: string[];
  author?: string;
}

// ============================================================
// RESOLVED EFFECT (output of merge engine)
// ============================================================

export interface ResolvedEffect {
  effectId: string;
  category: EffectCategory;
  config: Record<string, any>;
  order: number;
  mergeStrategy: MergeStrategy;
  renderer: React.ComponentType<EffectRendererProps>;
}

export interface ResolvedLayer {
  layerId: string;
  effects: ResolvedEffect[];
}

// ============================================================
// COMPATIBILITY RESULT
// ============================================================

export interface CompatibilityResult {
  compatible: boolean;
  reason?: string;
  conflicts?: string[];
  suggestions?: string[];
}

// ============================================================
// DRAG STATE FOR COMPOSER
// ============================================================

export interface DraggingEffectItem {
  effectId: string;
  category: EffectCategory;
  name: string;
  icon: string;
  color: string;
}

export interface ActiveComposerDropZone {
  compositionId: string;
  layerId: string;
}

// ============================================================
// EXPORT FORMAT
// ============================================================

export type ExportFormat = 'react-tsx' | 'react-css' | 'html-css' | 'tailwind';

export interface ExportResult {
  format: ExportFormat;
  code: string;
  filename: string;
  dependencies: string[];
}
