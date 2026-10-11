/** Typed contract shared by component adapters and the Merge/Fusion engine. */
import type { CSSProperties } from 'react';

export type MergeLayerRole =
  | 'root' | 'content' | 'background' | 'border' | 'overlay'
  | 'icon' | 'label' | 'leading' | 'trailing' | 'trigger'
  | 'indicator' | 'media' | 'header' | 'footer'
  | (string & {});

export interface MergeLayerDescriptor {
  id: string;
  role: MergeLayerRole;
  label: string;
  /** Design tokens and CSS variables only; never executable code. */
  style?: CSSProperties;
  enabled?: boolean;
}

export interface MergeComponentMetadata {
  componentId: string;
  componentType: string;
  layers: readonly MergeLayerDescriptor[];
  metadata?: Readonly<Record<string, string | number | boolean>>;
}
