# GodUI upstream integration — implementation notes

Source project: https://github.com/LucasBassetti/godui  
License: MIT; see `src/components/godui/vendor/godui-LICENSE` (retained upstream copyright notice).

## Integration model

Goduix remains the application and Merge engine. GodUI is a component source, not a replacement application or a second builder. Upstream components are to be imported as local source, with dependency and license metadata preserved.

Each imported component must be represented in four separate layers:

1. **Visual implementation** — upstream component source, isolated under the GodUI namespace.
2. **Public props** — explicit typed props and validated inspector schema; no `eval`, arbitrary HTML, or arbitrary executable CSS.
3. **Merge adapter** — stable component ID plus named layer slots, so effects can target `root`, `content`, `background`, `border`, `icon`, `label`, etc. without changing the upstream API.
4. **Builder registration** — catalog entry, defaults, prop fields, renderer registration, and fusion donor/slot metadata.

Do not flatten a compound component into a single opaque preview. Preserve its semantic subcomponents and expose only slots that actually exist. Never advertise a component as enabled until its source and dependencies are present and its renderer is wired.

## Source registry snapshot

`src/data/goduiUpstreamCatalog.ts` records the 35 source entries in the upstream core registry (including the shared motion item). This is metadata for controlled import and does not claim that the upstream source has already been vendored.

## Dependency and behavior rules

- Keep the existing React 19, Tailwind CSS v4, Motion, and Zustand architecture.
- Reuse already installed dependencies; add only required missing packages after compatibility review.
- Preserve the existing Merge/Fusion data contract and component IDs; use adapters instead of replacing stored schemas.
- Preserve keyboard interactions, reduced-motion behavior, data-slot semantics, and upstream attribution.
- Imported registry components must be tested for prop parity, runtime interaction, accessibility, and Merge slot targeting before activation.
- No mock component implementations or placeholder previews are permitted as substitutes for upstream source.

## Batch plan

1. Registry contract and upstream license (this change).
2. Vendor core primitive source files and reconcile shared dependencies/tokens.
3. Add explicit adapters and inspector prop schemas for each imported primitive.
4. Register each component in the renderer and Merge/Fusion slot catalog.
5. Run lint, build, component behavior tests, and Merge regression checks; enable only verified entries.
6. Import expressive Lab components in separate batches, retaining their GPU/performance notes and dependency boundaries.
