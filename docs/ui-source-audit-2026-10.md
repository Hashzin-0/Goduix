# UI source audit — October 2026

## Scope

This audit determines which additional public UI projects can safely supply code or assets for GodUI. A repository being public, having a README, or having a license badge inferred by a search result is not enough: the license must be verified at the source repository.

## WeArePixelFlow

| Repository | License evidence | Decision |
| --- | --- | --- |
| [folder-hover-animation](https://github.com/wearepixelflow/folder-hover-animation) | Upstream README explicitly states MIT | Already integrated as `PixelFlowFolderHover`; React adaptation supports focus and click as well as hover. |
| [pricing-card-section](https://github.com/wearepixelflow/pricing-card-section) | Upstream README explicitly states MIT | Already integrated as `PixelFlowPricingCards`; uses demonstration prices and does not implement checkout. |
| [black-hole-login-page](https://github.com/wearepixelflow/black-hole-login-page) | README lists a `LICENSE` file, but the repository's `LICENSE` path returned 404 during this audit; no license was verified | Do not copy code, shaders, or assets. Reconsider only after a valid license is published and verified. |

### Outcome

The two WeArePixelFlow projects with verified MIT terms are already represented in GodUI. The black-hole project is not eligible for code or asset reuse until its license can be verified. Avoid adding a third component from this source solely to increase the catalog count.

## Next source family: vgpu

- Repository: [vercel-labs/vgpu](https://github.com/vercel-labs/vgpu)
- License: MIT, verified from the repository metadata and `LICENSE` file.
- Description: cross-runtime WebGPU library for shaders, 3D scenes, GPU tensors, and visualization.
- Integration guardrails:
  1. Select a small, visually distinct effect rather than importing the full library.
  2. Check whether the GodUI runtime and the user's browser support WebGPU before initialization.
  3. Provide a tested non-WebGPU fallback; never leave the builder preview blank when WebGPU is unavailable.
  4. Respect reduced-motion preferences and clean up GPU resources on unmount.
  5. Record upstream attribution and keep the component registered in the builder and Fusion catalog.

## Decision

Complete the verified-license WeArePixelFlow pass without copying from unlicensed repositories, then move to a focused vgpu/WebGPU component with graceful fallback. Build and typecheck are intentionally deferred to the Vercel preview, consistent with the project's workflow.
