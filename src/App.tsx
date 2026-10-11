import React, { useState } from 'react';
import { Eye, Layers, SlidersHorizontal } from 'lucide-react';
import { BuilderNavbar } from './components/builder/BuilderNavbar';
import { ComponentLibraryPanel } from './components/builder/ComponentLibraryPanel';
import { RealtimeCanvas } from './components/builder/RealtimeCanvas';
import { ComponentInspectorPanel } from './components/builder/ComponentInspectorPanel';
import { ComponentDocsModal } from './components/builder/ComponentDocsModal';
import { ExportPageModal } from './components/builder/ExportPageModal';
import { SemanticMergeIsland } from './components/builder/SemanticMergeIslandV3';
import { ComposerView } from './components/composer/ComposerView';
import { useBuilderStore } from './store/useBuilderStore';
import { cn } from './lib/utils';

export default function App() {
  const store = useBuilderStore();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const isComposer = store.viewMode === 'composer';

  const mobileTabs = [
    { id: 'library' as const, label: 'Componentes', Icon: Layers },
    { id: 'canvas' as const, label: 'Canvas', Icon: Eye },
    { id: 'inspector' as const, label: 'Tema e ajustes', Icon: SlidersHorizontal },
  ];

  return (
    <div className="h-dvh w-full flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <BuilderNavbar onOpenExportModal={() => setIsExportModalOpen(true)} />

      <div className="flex-1 min-h-0 flex overflow-hidden relative w-full">
        {isComposer ? (
          <ComposerView />
        ) : (
          <>
            {/* Mobile: one workspace panel at a time, with a persistent tab bar. */}
            <div className="lg:hidden flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden">
              <main className={cn('flex-1 min-h-0 min-w-0 overflow-hidden', store.mobileTab !== 'library' && 'hidden')}>
                <ComponentLibraryPanel />
              </main>
              <main className={cn('flex-1 min-h-0 min-w-0 overflow-hidden', store.mobileTab !== 'canvas' && 'hidden')}>
                <RealtimeCanvas />
              </main>
              <main className={cn('flex-1 min-h-0 min-w-0 overflow-hidden', store.mobileTab !== 'inspector' && 'hidden')}>
                <ComponentInspectorPanel />
              </main>

              <nav aria-label="Painéis do editor" className="shrink-0 grid grid-cols-3 border-t border-white/10 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)]">
                {mobileTabs.map(({ id, label, Icon }) => {
                  const active = store.mobileTab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => store.setMobileTab(id)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'min-h-14 px-2 py-2 flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors',
                        active ? 'text-cyan-300 bg-cyan-400/10' : 'text-zinc-400 hover:text-white'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Desktop: keep the established three-panel editor layout. */}
            <div className="hidden lg:flex flex-1 min-h-0 min-w-0 overflow-hidden">
              <aside className="h-full w-[300px] xl:w-[320px] shrink-0 overflow-hidden border-r border-white/10">
                <ComponentLibraryPanel />
              </aside>
              <main className="flex-1 min-h-0 min-w-0 h-full flex flex-col overflow-hidden relative">
                <RealtimeCanvas />
              </main>
              <aside className="h-full w-[300px] xl:w-[320px] shrink-0 overflow-y-auto border-l border-white/10">
                <ComponentInspectorPanel />
              </aside>
            </div>
          </>
        )}
      </div>

      <ComponentDocsModal />
      <SemanticMergeIsland />
      <ExportPageModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
