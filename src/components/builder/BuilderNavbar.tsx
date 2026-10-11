import React from 'react';
import {
  Monitor, Tablet, Smartphone, Undo2, Redo2, Download, Eye, Wand2,
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { THEMES } from '../../data/themes';
import { cn } from '../../lib/utils';

interface BuilderNavbarProps {
  onOpenExportModal: () => void;
}

export const BuilderNavbar: React.FC<BuilderNavbarProps> = ({ onOpenExportModal }) => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const isComposer = store.viewMode === 'composer';

  return (
    <header className="h-14 w-full bg-zinc-950/95 border-b border-white/10 px-3 sm:px-5 flex items-center justify-between gap-3 z-30 shrink-0 backdrop-blur-xl">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm text-zinc-950 shrink-0" style={{ backgroundColor: theme.primary }}>G</div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm">GodUI</span>
            <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-400">Studio</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-0.5 ml-1 pl-3 border-l border-white/10">
          <button onClick={() => store.undo()} disabled={!store.canUndo()} title="Desfazer" className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-25 transition-colors">
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={() => store.redo()} disabled={!store.canRedo()} title="Refazer" className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-25 transition-colors">
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <nav aria-label="Modo de trabalho" className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 shrink-0">
        <button
          onClick={() => store.setViewMode('builder')}
          aria-pressed={!isComposer}
          className={cn("px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5", !isComposer ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white")}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Viewer</span>
        </button>
        <button
          onClick={() => store.setViewMode('composer')}
          aria-pressed={isComposer}
          className={cn("px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5", isComposer ? "bg-violet-500/25 text-white shadow-sm" : "text-zinc-400 hover:text-white")}
        >
          <Wand2 className="w-3.5 h-3.5 text-violet-400" />
          <span>Composer</span>
        </button>
      </nav>

      <div className="flex items-center gap-1.5 shrink-0">
        <div className="hidden md:flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {([
            ['desktop', Monitor, 'Desktop'],
            ['tablet', Tablet, 'Tablet'],
            ['mobile', Smartphone, 'Mobile'],
          ] as const).map(([viewport, Icon, label]) => (
            <button key={viewport} onClick={() => store.setViewport(viewport)} title={label} aria-pressed={store.viewport === viewport}
              className={cn("p-1.5 rounded-lg transition-colors", store.viewport === viewport ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white")}>
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
        <button onClick={onOpenExportModal} className="px-3 py-2 rounded-lg bg-cyan-400 text-zinc-950 text-xs font-bold hover:bg-cyan-300 transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
      </div>
    </header>
  );
};
