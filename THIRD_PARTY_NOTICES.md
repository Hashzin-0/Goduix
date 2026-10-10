# Third-party component notices

This file records the upstream projects used by GodUI integrations. Keep each notice with the corresponding component when distributing the app.

## robot-heads

- Source: https://github.com/fayazara/robot-heads
- Package: `robot-heads@0.3.0`
- License: MIT
- Usage: imported as a dependency; no source files from the upstream project are vendored here.
- Copyright: Fayaz Ahmed and contributors.

## morphicons

- Source: https://github.com/guillermolg00/morphicons
- Package: `morphicons`
- License: MIT
- Usage: imported as a dependency. `lucide` is used for icon path data; `lucide-react` remains the project's normal icon component package.
- Copyright: Guillermo López and contributors.

## VoiceStudio

- Source: https://github.com/debpalash/VoiceStudio
- License: AGPL-3.0-only
- Usage in this phase: external-link/connector affordance only. No VoiceStudio application source, assets, or code are copied into GodUI. The browser-native voice panel is a separate implementation and does not claim to provide VoiceStudio's local TTS/ASR engines.
- Before embedding or modifying VoiceStudio itself, review its AGPL obligations and model-specific licenses. A proprietary embedding would require a separate licensing assessment.

## Plasma UI

- Source: https://github.com/CruxGarden/plasma-ui
- Package: `@cruxgarden/plasma-ui@0.8.0`
- License: MIT
- Usage: imported as a dependency. The GodUI adapter switches to a lightweight CSS fallback on narrow screens and when reduced motion is requested.
- Copyright: Crux Garden.

## WeArePixelFlow Liquid Gooey Cursor

- Source/inspiration: https://github.com/wearepixelflow/liquid-gooey-cursor
- Usage in this phase: independent React/CSS/SVG recreation of the local metaball interaction; no source files or bundled assets are copied.

## Complete Shelf

- Source/reference: https://github.com/MengTo/complete-shelf
- Usage in this phase: independent CSS/React recreation of the interactive bookshelf concept. The upstream repository's license was not confirmed, so its source and assets are not copied.

## SVGL

- Source/API: https://github.com/pheralb/svgl and https://api.svgl.app
- License: MIT for project code; individual logo assets retain the rights and usage terms described by their contributors/brand owners.
- Usage: queried at runtime for logo discovery; GodUI does not bundle the entire SVGL catalog.

## theSVG

- Source/API: https://github.com/GLINCKER/thesvg and https://thesvg.org/docs/api
- License: MIT for project code; individual brand assets may be subject to trademark and owner-specific rights.
- Usage: the public static manifest and SVG CDN are queried at runtime. GodUI does not mirror or bundle the full library.
