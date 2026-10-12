import type { HTMLAttributes, ReactNode } from 'react';
import type { MergeComponentMetadata } from '@/src/types/goduiMergeAdapter';

export interface MergeComponentBoundaryProps
  extends HTMLAttributes<HTMLDivElement>, MergeComponentMetadata {
  children: ReactNode;
}

/**
 * Adds a stable, inspectable DOM boundary for Merge without changing a
 * component's public props or owning its visual state.
 */
export function MergeComponentBoundary({
  componentId,
  componentType,
  layers,
  metadata,
  children,
  ...rootProps
}: MergeComponentBoundaryProps) {
  return (
    <div
      {...rootProps}
      data-merge-component={componentType}
      data-merge-instance={componentId}
      data-merge-layer="root"
      data-merge-layer-count={layers.length}
      data-merge-metadata={metadata ? JSON.stringify(metadata) : undefined}
    >
      {children}
    </div>
  );
}
