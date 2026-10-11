# GodUI vendored primitives

Upstream project: https://github.com/LucasBassetti/godui  
License: MIT — see `../godui-LICENSE`.

## Imported in this batch

- `GodUIInput`: native input primitive; forwards standard React input props and custom classes.
- `GodUITextarea`: native textarea primitive; forwards standard React textarea props and custom classes.

Both components preserve upstream `data-slot` semantics and expose `data-merge-layer="content"` for layer inspection. They use the existing project `cn()` helper and do not introduce runtime dependencies.

They are intentionally not advertised in the builder catalog yet. Builder activation requires a separate change to the public component union, prop inspector schema, renderer, defaults, and Merge/Fusion slot mapping. This avoids exposing components that have not passed the project's build/runtime verification.

## Styling contract

These primitives use the GodUI/shadcn token names (for example `border-input`, `bg-background`, and `ring-ring`). They rely on the host app's Tailwind theme tokens; no global theme or CSS is overwritten here.
