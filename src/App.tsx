import React, { useState } from 'react';
import { BuilderNavbar } from './components/builder/BuilderNavbar';
import { ComponentLibraryPanel } from './components/builder/ComponentLibraryPanel';
import { RealtimeCanvas } from './components/builder/RealtimeCanvas';
import { ComponentInspectorPanel } from './components/builder/ComponentInspectorPanel';
import { ComponentDocsModal } from './components/builder/ComponentDocsModal';
import { ExportPageModal } from './components/builder/ExportPageModal';
import { FusionModal } from './components/builder/FusionModal';
import { ComposerView } from './components/composer/ComposerView';
import { useBuilderStore } from './store/useBuilderStore';

export default function App() {
  const store = useBuilderStore();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const isComposer = store.viewMode === 'composer';

  return (
    <div className="h-dvh w-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <BuilderNavbar onOpenExportModal={() => setIsExportModalOpen(true)} />

      <div className="flex-1 min-h-0 flex overflow-hidden relative w-full">
        {isComposer ? (
          <ComposerView />
        ) : (
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            <aside className="w-full h-[280px] lg:h-full lg:w-[300px] xl:w-[320px] shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              <ComponentLibraryPanel />
            </aside>
            <main className="min-h-[460px] lg:min-h-0 lg:flex-1 h-full flex flex-col overflow-hidden relative">
              <RealtimeCanvas />
            </main>
            <aside className="w-full max-h-[420px] lg:max-h-full lg:h-full lg:w-[300px] xl:w-[320px] shrink-0 overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
              <ComponentInspectorPanel />
            </aside>
          </div>
        )}
      </div>

      <ComponentDocsModal />
      <FusionModal />
      <ExportPageModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
