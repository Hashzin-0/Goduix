import React from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Sliders, 
  Code2, 
  Undo2, 
  Redo2, 
  Sparkles, 
  Download, 
  Palette,
  Layers,
  ChevronDown,
  LayoutTemplate
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ViewportMode, ViewMode } from '../../types/builder';
import { THEMES } from '../../data/themes';
import { PAGE_TEMPLATES } from '../../data/templates';
import { cn } from '../../lib/utils';

interface BuilderNavbarProps {
  onOpenExportModal: () => void;
}

export const BuilderNavbar: React.FC<BuilderNavbarProps> = ({ onOpenExportModal }) => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  return (
    <header className="h-14 w-full bg-zinc-950/95 border-b border-white/10 px-4 flex items-center justify-between z-30 select-none backdrop-blur-xl">
      {/* Brand & Mode */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm text-zinc-950 shadow-md transition-colors"
            style={{ backgroundColor: theme.primary }}
          >
            G
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-white tracking-tight text-xs sm:text-sm">
                GodUI
              </span>
              <span className="hidden xs:inline font-bold text-white tracking-tight text-xs sm:text-sm">
                Builder
              </span>
              <span className="hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-400">
                godui.design
              </span>
            </div>
          </div>
        </div>

        {/* Undo / Redo controls */}
        <div className="flex items-center gap-0.5 ml-1 sm:ml-4 pl-1 sm:pl-4 border-l border-white/10">
          <button
            onClick={() => store.undo()}
            disabled={!store.canUndo()}
            title="Desfazer (Undo)"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => store.redo()}
            disabled={!store.canRedo()}
            title="Refazer (Redo)"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport switchers & Mode switchers (Center) */}
      <div className="flex items-center gap-2">
        {/* Mode Selector */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10">
          <button
            onClick={() => store.setViewMode('builder')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer",
              store.viewMode === 'builder'
                ? "bg-white/15 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Editor</span>
          </button>

          <button
            onClick={() => store.setViewMode('preview')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer",
              store.viewMode === 'preview'
                ? "bg-white/15 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Preview Real</span>
          </button>

          <button
            onClick={() => store.setViewMode('code')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer",
              store.viewMode === 'code'
                ? "bg-white/15 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Código</span>
          </button>
        </div>

        {/* Viewport simulation buttons */}
        <div className="hidden lg:flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10">
          <button
            onClick={() => store.setViewport('desktop')}
            title="Desktop"
            className={cn(
              "p-1.5 rounded-lg transition-all cursor-pointer",
              store.viewport === 'desktop' ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => store.setViewport('tablet')}
            title="Tablet (768px)"
            className={cn(
              "p-1.5 rounded-lg transition-all cursor-pointer",
              store.viewport === 'tablet' ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => store.setViewport('mobile')}
            title="Mobile (390px)"
            className={cn(
              "p-1.5 rounded-lg transition-all cursor-pointer",
              store.viewport === 'mobile' ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right controls: Theme & Export */}
      <div className="flex items-center gap-2.5">
        {/* Quick template selector */}
        <div className="hidden xl:block">
          <select
            onChange={(e) => {
              if (e.target.value) store.loadTemplate(e.target.value);
            }}
            defaultValue=""
            className="bg-zinc-900 border border-white/10 text-zinc-300 text-xs rounded-xl px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-cyan-500/50"
          >
            <option value="" disabled>Carregar Template...</option>
            {PAGE_TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Export Project Button */}
        <button
          onClick={onOpenExportModal}
          className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg text-zinc-950 hover:brightness-110 shrink-0"
          style={{ backgroundColor: theme.primary }}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exportar Código</span>
          <span className="sm:hidden">Exportar</span>
        </button>
      </div>
    </header>
  );
};
