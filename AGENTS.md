# AGENTS.md

## What This Is

GodUI Component Composer — a real-time website builder with a **Fusion Engine** that merges visual effects across components. Pick a component, pick an effect donor, and fuse: e.g., apply Liquid Glass reflections to a Toolbar's active item, or Gooey SVG transitions to a Dock's icons.

## Commands

- **Dev server**: `bun run dev` (port 3000, host 0.0.0.0)
- **Build**: `bun run build`
- **Lint/typecheck**: `bun run lint` (runs `tsc --noEmit`)

There are no tests, no formatter, and no CI workflows.

## HMR Note

`DISABLE_HMR` env var disables HMR and file watching to prevent flickering during agent edits. Do not modify the `server.hmr` or `server.watch` config in `vite.config.ts`.

## Path Alias

`@/` resolves to the project root (e.g., `@/src/store/useBuilderStore`). Configured in both `vite.config.ts` and `tsconfig.json`.

## Architecture

**Single-app structure** (no monorepo, no packages):

```
src/
  main.tsx          → Entry point (React 19 StrictMode)
  App.tsx           → Layout shell: 3-panel builder, preview, code views
  store/            → Zustand state (useBuilderStore)
  components/
    builder/        → App chrome (navbar, library panel, inspector, canvas, modals)
    godui/          → The 26+ GodUI primitive components (Liquid Glass Button, Tilt 3D Card, etc.)
    composer/       → Composition UI (selector, gallery, export)
  data/             → Static catalogs and configs
    goduiCatalog.ts → Full component registry: metadata, prop schemas, default props, sample code
    fusionCatalog.ts→ Effect donor registry: 20+ effect types, fusion slots, triggers, presets
    templates.ts    → Page templates (pre-composed component sets)
    themes.ts       → 5 color palettes
  types.ts          → Legacy shared types (ComponentId, ThemePalette, ComposerConfig)
  types/builder.ts  → Core builder types (GodUIComponentType, FusionEffectType, ComponentFusion, etc.)
  lib/utils.ts      → `cn()` helper (clsx + tailwind-merge)
```

## The Fusion System

This is the core domain concept. Understand it before modifying anything.

- **FusionEffectType** (`types/builder.ts`): 20+ effect types (e.g., `liquid-glass`, `gooey-liquid`, `magnetic-pull`, `shimmer-beam`).
- **FusionTargetSlot** (`types/builder.ts`): Where to apply the effect (e.g., `active-item`, `border`, `background`, `main-container`, `before-glow`).
- **FusionTriggerType** (`types/builder.ts`): When the effect fires (e.g., `hover`, `click`, `always`, `entrance`).
- **ComponentFusion** (`types/builder.ts`): The fusion config stored on each component instance (`BuilderComponentInstance.fusions[]`).
- **FUSION_DONORS** (`data/fusionCatalog.ts`): Metadata for each effect — which source component it comes from, what features it exposes, which slots it's compatible with.
- **FUSION_PRESETS** (`data/fusionCatalog.ts`): Pre-built fusion recipes (e.g., "Toolbar com Vidro Liquido no Item Ativo").
- **Merge flow**: `useBuilderStore.mergeCanvasComponents()` or `dropEffectOnSlot()` → creates a `ComponentFusion` → appends to target component's `fusions[]` → UI reads fusions to apply visual effects.

## Adding a New Component

1. Create the component file in `src/components/godui/`.
2. Add the `GodUIComponentType` string to the union in `src/types/builder.ts`.
3. Register it in `src/data/goduiCatalog.ts` with metadata, prop fields, default props, and sample code.
4. Add its signature `FusionEffectType` mapping in `fusionCatalog.ts` → `getComponentSignatureEffect()`.
5. Add fusion donors to `FUSION_DONORS` if the component contributes effects to the fusion system.
6. Import and render it in `src/components/builder/ComponentRenderer.tsx`.

## UI Language

The app UI is in **Brazilian Portuguese**. Keep user-facing strings in Portuguese when editing existing components or modals.

## Stack Details

- **React 19** with `motion/react` (the Framer Motion successor package).
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js` needed).
- **Three.js** for the 3D mesh component (`interactive-3d-mesh`).
- **Zustand v5** for all state (single store in `useBuilderStore.ts`).
- **Lucide React** for icons.
- **Fonts**: Plus Jakarta Sans (sans), JetBrains Mono (mono).
- `sampleCode` in `GODUI_CATALOG` uses `motion/react` imports — not `framer-motion`.
