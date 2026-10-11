# Semantic Merge Engine

## Current implementation

- The planner proposes ranked destinations using component catalog metadata and property names.
- The builder mounts a configuration island for the selected donor and target.
- Content and behavior properties are excluded from automatic suggestions.
- Direct property writes are limited to properties already exposed by the target.

## Safety contract

1. Analyze donor and target before mutation.
2. Ask the user to choose property and region.
3. Reject duplicate writes, complex-object copying, and destructive whole-component operations.
4. Preserve target structure, layout, event handlers, and content by default.
5. Add a typed adapter before claiming a target region is supported.

## Limitations

This is a safe planning slice, not universal visual composition. The current renderer does not expose a generic per-region adapter for every registered component, and the existing drag-and-drop path still uses the legacy fusion action. The next stage must add typed region adapters, route canvas drops into this planner, and add unit tests for keyboard/button cases, conflict detection, undo/redo, and unsupported regions. Never report a visual effect as applied unless the destination renderer consumes its configuration.
