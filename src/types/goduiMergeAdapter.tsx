import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

/**
 * Stable contract between a visual component and the Merge/Fusion engine.
 * Each layer is addressable independently; presentation stays in the component,
 * while Merge owns the effect configuration and lifecycle.
 */
export type MergeLayerRole =
  | 'root' | 'content' | 'background' | 'border' | 'overlay'
  | 'icon' | 'label' | 'leading' | 'trailing' | 'trigger'
  | 'indicator' | 'media' | 'header' | 'footer';

export interface MergeLayerDescriptor {
  id: string;
  role: MergeLayerRole | (string & {});
  label: string;
  /** CSS variables and design tokens only; no executable code. */
  style?: CSSProperties;
  enabled?: boolean;
}

export interface MergeComponentProps extends HTMLAttributes<HTMLDivElement> {
  componentId: string;
  componentType: string;
  layers: readonly MergeLayerDescriptor[];
  children: ReactNode;
  /** Metadata consumed by the inspector; never evaluated as code. */
  mergeMetadata?: Readonly<Record<string, string | number | boolean>>;
}

/**
 * DOM boundary for components that expose independent Merge layers.
 * Layer nodes are intentionally semantic/data-addressable so the Merge
 * renderer can target a slot without reaching into component internals.
 */
export function MergeComponentBoundary({
  componentId,
  componentType,
  layers,
  children,
  mergeMetadata,
  style,
  ...rootProps
}: MergeComponentProps) {
  return (
    <div
      {...rootProps}
      data-merge-component={componentType}
      data-merge-instance={componentId}
      data-merge-layer="root"
      data-merge-layer-count={layers.length}
      data-merge-metadata={mergeMetadata ? JSON.stringify(mergeMetadata) : undefined}
      style={style}
    >
      {children}
    </div>
  );
}
