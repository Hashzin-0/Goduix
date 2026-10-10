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
