/**
 * Metadata contract for the DOM boundary between imported GodUI primitives
 * and Goduix's Merge/Fusion engine.
 *
 * Layer names are stable semantic slots (for example "root", "content",
 * "icon" or "label"), not executable styles or component implementations.
 */
export interface MergeComponentMetadata {
  /** Stable identifier for this rendered component instance. */
  componentId: string;
  /** Registered component identifier/type understood by the host builder. */
  componentType: string;
  /** Semantic Merge layer slots exposed by this component. */
  layers: readonly string[];
  /** Optional serializable metadata for inspection and tooling. */
  metadata?: Record<string, unknown>;
}
