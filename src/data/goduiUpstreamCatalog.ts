/**
 * GodUI upstream registry manifest.
 * Source: https://github.com/LucasBassetti/godui (MIT).
 * This is registry metadata, not fabricated demo content. Component source files
 * are imported in subsequent integration batches and must preserve upstream notices.
 */
export type GodUIUpstreamKind = 'primitive' | 'motion';

export interface GodUIUpstreamEntry {
  id: string;
  name: string;
  kind: GodUIUpstreamKind;
  upstreamPaths: readonly string[];
  mergeSlots: readonly string[];
  /** Dependencies to validate before enabling this component in the builder. */
  dependencies: readonly string[];
}

const sharedRadix = ['react', 'react-dom', 'radix-ui', 'motion'];
const entries: readonly GodUIUpstreamEntry[] = [
  { id: 'godui-motion', name: 'GodUI Motion', kind: 'motion', upstreamPaths: ['packages/components/src/hooks/use-flip-group.ts', 'packages/components/src/hooks/use-active-indicator.ts', 'packages/components/src/hooks/use-animate-on-change.ts', 'packages/components/src/hooks/use-merged-ref.ts', 'packages/components/src/hooks/use-reveal.ts'], mergeSlots: ['root', 'content', 'indicator'], dependencies: ['react', 'motion'] },
  { id: 'button', name: 'Button', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/button.tsx'], mergeSlots: ['root', 'icon', 'label', 'leading', 'trailing'], dependencies: ['react', 'class-variance-authority', 'clsx', 'tailwind-merge'] },
  { id: 'dialog', name: 'Dialog', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/dialog.tsx'], mergeSlots: ['root', 'trigger', 'overlay', 'content', 'title', 'description', 'close'], dependencies: sharedRadix },
  { id: 'alert-dialog', name: 'Alert Dialog', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/alert-dialog.tsx'], mergeSlots: ['root', 'trigger', 'overlay', 'content', 'title', 'description', 'action', 'cancel'], dependencies: sharedRadix },
  { id: 'sheet', name: 'Sheet', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/sheet.tsx'], mergeSlots: ['root', 'trigger', 'overlay', 'content', 'header', 'footer', 'title', 'description', 'close'], dependencies: ['react', 'react-dom', 'vaul'] },
  { id: 'sidebar', name: 'Sidebar', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/sidebar.tsx'], mergeSlots: ['root', 'header', 'content', 'footer', 'trigger', 'group', 'menu', 'menu-item'], dependencies: ['react', 'react-dom', 'radix-ui'] },
  { id: 'popover', name: 'Popover', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/popover.tsx'], mergeSlots: ['root', 'trigger', 'content', 'anchor'], dependencies: sharedRadix },
  { id: 'dropdown-menu', name: 'Dropdown Menu', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/dropdown-menu.tsx'], mergeSlots: ['root', 'trigger', 'content', 'item', 'checkbox-item', 'radio-item', 'separator', 'label'], dependencies: sharedRadix },
  { id: 'tooltip', name: 'Tooltip', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/tooltip.tsx'], mergeSlots: ['root', 'trigger', 'content', 'provider'], dependencies: sharedRadix },
  { id: 'tabs', name: 'Tabs', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/tabs.tsx'], mergeSlots: ['root', 'list', 'trigger', 'content', 'indicator'], dependencies: sharedRadix },
  { id: 'accordion', name: 'Accordion', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/accordion.tsx'], mergeSlots: ['root', 'item', 'trigger', 'content', 'icon'], dependencies: sharedRadix },
  { id: 'switch', name: 'Switch', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/switch.tsx'], mergeSlots: ['root', 'thumb', 'label'], dependencies: sharedRadix },
  { id: 'sonner', name: 'Sonner', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/sonner.tsx'], mergeSlots: ['root', 'toast', 'title', 'description', 'action', 'close'], dependencies: ['react', 'sonner'] },
  { id: 'drawer', name: 'Drawer', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/drawer.tsx'], mergeSlots: ['root', 'trigger', 'overlay', 'content', 'header', 'footer', 'title', 'description'], dependencies: ['react', 'react-dom', 'vaul'] },
  { id: 'input', name: 'Input', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/input.tsx'], mergeSlots: ['root', 'leading', 'field', 'trailing'], dependencies: ['react', 'class-variance-authority', 'clsx', 'tailwind-merge'] },
  { id: 'textarea', name: 'Textarea', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/textarea.tsx'], mergeSlots: ['root', 'field', 'leading', 'trailing'], dependencies: ['react', 'clsx', 'tailwind-merge'] },
  { id: 'input-group', name: 'Input Group', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/input-group.tsx'], mergeSlots: ['root', 'addon', 'input', 'text', 'button'], dependencies: ['react', 'radix-ui'] },
  { id: 'checkbox', name: 'Checkbox', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/checkbox.tsx'], mergeSlots: ['root', 'indicator', 'label'], dependencies: sharedRadix },
  { id: 'radio-group', name: 'Radio Group', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/radio-group.tsx'], mergeSlots: ['root', 'item', 'indicator', 'label'], dependencies: sharedRadix },
  { id: 'toggle', name: 'Toggle', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/toggle.tsx'], mergeSlots: ['root', 'icon', 'label'], dependencies: ['react', 'class-variance-authority', 'radix-ui'] },
  { id: 'toggle-group', name: 'Toggle Group', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/toggle-group.tsx'], mergeSlots: ['root', 'item', 'icon', 'label'], dependencies: ['react', 'radix-ui'] },
  { id: 'slider', name: 'Slider', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/slider.tsx'], mergeSlots: ['root', 'track', 'range', 'thumb'], dependencies: sharedRadix },
  { id: 'collapsible', name: 'Collapsible', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/collapsible.tsx'], mergeSlots: ['root', 'trigger', 'content'], dependencies: sharedRadix },
  { id: 'hover-card', name: 'Hover Card', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/hover-card.tsx'], mergeSlots: ['root', 'trigger', 'content'], dependencies: sharedRadix },
  { id: 'context-menu', name: 'Context Menu', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/context-menu.tsx'], mergeSlots: ['root', 'trigger', 'content', 'item', 'separator', 'label'], dependencies: sharedRadix },
  { id: 'select', name: 'Select', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/select.tsx'], mergeSlots: ['root', 'trigger', 'value', 'content', 'item', 'indicator'], dependencies: sharedRadix },
  { id: 'command', name: 'Command', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/command.tsx'], mergeSlots: ['root', 'input', 'list', 'group', 'item', 'empty'], dependencies: ['react', 'cmdk'] },
  { id: 'combobox', name: 'Combobox', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/combobox.tsx'], mergeSlots: ['root', 'trigger', 'input', 'content', 'item', 'tag'], dependencies: ['react', 'cmdk', 'radix-ui'] },
  { id: 'input-otp', name: 'Input OTP', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/input-otp.tsx'], mergeSlots: ['root', 'group', 'slot', 'separator'], dependencies: ['react', 'input-otp'] },
  { id: 'progress', name: 'Progress', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/progress.tsx'], mergeSlots: ['root', 'track', 'indicator', 'label'], dependencies: sharedRadix },
  { id: 'menubar', name: 'Menubar', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/menubar.tsx'], mergeSlots: ['root', 'menu', 'trigger', 'content', 'item', 'separator'], dependencies: sharedRadix },
  { id: 'navigation-menu', name: 'Navigation Menu', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/navigation-menu.tsx', 'packages/components/src/ui/navigation-menu-viewport-frame.tsx'], mergeSlots: ['root', 'list', 'item', 'trigger', 'content', 'viewport', 'indicator'], dependencies: sharedRadix },
  { id: 'carousel', name: 'Carousel', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/carousel.tsx'], mergeSlots: ['root', 'viewport', 'container', 'item', 'previous', 'next', 'indicators'], dependencies: ['react', 'embla-carousel-react'] },
  { id: 'skeleton', name: 'Skeleton', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/skeleton.tsx'], mergeSlots: ['root'], dependencies: ['react'] },
  { id: 'calendar', name: 'Calendar', kind: 'primitive', upstreamPaths: ['packages/components/src/ui/calendar.tsx'], mergeSlots: ['root', 'header', 'navigation', 'grid', 'day', 'range'], dependencies: ['react', 'react-day-picker', 'date-fns'] },
] as const;

export const GODUI_UPSTREAM_CATALOG = entries;
export const GODUI_UPSTREAM_BY_ID = Object.fromEntries(entries.map((entry) => [entry.id, entry])) as Record<string, GodUIUpstreamEntry>;
