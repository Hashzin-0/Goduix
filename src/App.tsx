import React, { useState } from 'react';
import { BuilderNavbar } from './components/builder/BuilderNavbar';
import { ComponentLibraryPanel } from './components/builder/ComponentLibraryPanel';
import { RealtimeCanvas } from './components/builder/RealtimeCanvas';
import { ComponentInspectorPanel } from './components/builder/ComponentInspectorPanel';
import { GeneratedCodeView } from './components/builder/GeneratedCodeView';
import { ComponentDocsModal } from './components/builder/ComponentDocsModal';
import { ExportPageModal } from './components/builder/ExportPageModal';
import { FusionModal } from './components/builder/FusionModal';
import { ComposerView } from './components/composer/ComposerView';
import { useBuilderStore } from './store/useBuilderStore';
import { THEMES } from './data/themes';
import { cn } from './lib/utils';
import { 
  Eye, 
  Sliders, 
  Layers, 
  Layout, 
  Code2, 
  PlusCircle, 
  Palette,
  Sparkles,
  Wand2
} from 'lucide-react';

export default function App() {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <BuilderNavbar onOpenExportModal={() => setIsExportModalOpen(true)} />

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden relative w-full">
        {/* VIEW 1: CODE EXPORT PREVIEW */}
        {store.viewMode === 'code' ? (
          <GeneratedCodeView />
        ) : store.viewMode === 'preview' ? (
          /* VIEW 2: PURE CLEAN LIVE PREVIEW (NO INSPECTOR CHROME) */
          <div className="flex-1 h-full relative flex flex-col w-full">
            {/* Quick Floating Pill to return to editor */}
            <div className="absolute top-4 left-4 z-40">
              <button
                onClick={() => store.setViewMode('builder')}
                className="px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/20 text-white text-xs font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-1.5 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Voltar ao Editor</span>
              </button>
            </div>
            <RealtimeCanvas />
          </div>
        ) : store.viewMode === 'composer' ? (
          /* VIEW 4: COMPOSER MODE */
          <ComposerView />
        ) : (
          /* VIEW 3: BUILDER MODE (DESKTOP THREE-PANEL + MOBILE RESPONSIVE TABS) */
          <>
            {/* Desktop Layout (Large Screens): 3 Panels Side-by-Side */}
            <div className="hidden lg:flex flex-1 h-full overflow-hidden w-full">
              {/* Left Library & Structure Panel */}
              <ComponentLibraryPanel />

              {/* Center Real-Time Canvas */}
              <main className="flex-1 h-full flex flex-col overflow-hidden relative">
                <RealtimeCanvas />
              </main>

              {/* Right Component Inspector & Global Props Panel */}
              <ComponentInspectorPanel />
            </div>

            {/* Mobile / Tablet Layout (Small Screens): Active Screen Switcher */}
            <div className="flex lg:hidden flex-1 flex-col h-full overflow-hidden w-full relative">
              {store.mobileTab === 'canvas' && (
                <main className="flex-1 h-full flex flex-col overflow-hidden relative w-full">
                  <RealtimeCanvas />
                </main>
              )}

              {store.mobileTab === 'library' && (
                <div className="flex-1 h-full overflow-hidden relative w-full">
                  <ComponentLibraryPanel />
                </div>
              )}

              {store.mobileTab === 'inspector' && (
                <div className="flex-1 h-full overflow-hidden relative w-full">
                  <ComponentInspectorPanel />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile Responsive Bottom Navigation Dock (Visible on mobile/tablet in Builder mode) */}
      {store.viewMode === 'builder' && (
        <nav className="lg:hidden h-14 bg-zinc-950/95 border-t border-white/10 px-2 flex items-center justify-around z-30 backdrop-blur-xl shrink-0">
          {/* Tab 1: Canvas */}
          <button
            onClick={() => store.setMobileTab('canvas')}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative",
              store.mobileTab === 'canvas' ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <div className="relative">
              <Layout className="w-4 h-4" style={{ color: store.mobileTab === 'canvas' ? theme.primary : undefined }} />
              {store.components.length > 0 && (
                <span 
                  className="absolute -top-1.5 -right-2.5 px-1 min-w-3.5 h-3.5 rounded-full text-[9px] font-mono font-bold text-zinc-950 flex items-center justify-center"
                  style={{ backgroundColor: theme.primary }}
                >
                  {store.components.length}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Canvas</span>
          </button>

          {/* Tab 2: Biblioteca */}
          <button
            onClick={() => store.setMobileTab('library')}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative",
              store.mobileTab === 'library' ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <PlusCircle className="w-4 h-4" style={{ color: store.mobileTab === 'library' ? theme.primary : undefined }} />
            <span className="text-[10px] mt-0.5 font-medium">Componentes</span>
          </button>

          {/* Tab 3: Inspetor / Propriedades */}
          <button
            onClick={() => store.setMobileTab('inspector')}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative",
              store.mobileTab === 'inspector' ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <div className="relative">
              <Sliders className="w-4 h-4" style={{ color: store.mobileTab === 'inspector' ? theme.primary : undefined }} />
              {store.selectedId && (
                <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">
              {store.selectedId ? 'Editar' : 'Tema'}
            </span>
          </button>

          {/* Quick Preview Toggle on Mobile */}
          <button
            onClick={() => store.setViewMode('preview')}
            className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] mt-0.5 font-medium">Preview</span>
          </button>

          {/* Quick Code Toggle on Mobile */}
          <button
            onClick={() => store.setViewMode('code')}
            className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 font-medium">Código</span>
          </button>

          {/* Composer Mode Toggle on Mobile */}
          <button
            onClick={() => store.setViewMode('composer')}
            className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] mt-0.5 font-medium">Compor</span>
          </button>
        </nav>
      )}

      {/* Component Documentation & Code Modal */}
      <ComponentDocsModal />

      {/* Fusion Engine Modal */}
      <FusionModal />

      {/* Full Page Export Modal */}
      <ExportPageModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
