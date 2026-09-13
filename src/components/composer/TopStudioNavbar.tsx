import React from 'react';
import { 
  Sparkles, Monitor, Tablet, Smartphone, 
  Code2, Download, ExternalLink, Layers, Eye
} from 'lucide-react';
import { ComposerConfig } from '../../types';
import { THEMES } from '../../data/themes';
import { cn } from '../../lib/utils';

interface TopStudioNavbarProps {
  config: ComposerConfig;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onViewportChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  viewMode: 'composite' | 'gallery';
  onViewModeChange: (mode: 'composite' | 'gallery') => void;
  onOpenExportModal: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const TopStudioNavbar: React.FC<TopStudioNavbarProps> = ({
  config,
  viewportMode,
  onViewportChange,
  viewMode,
  onViewModeChange,
  onOpenExportModal,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const theme = THEMES[config.theme] || THEMES['godly-cyan'];
  const activeCount = Object.values(config.activeComponents).filter(Boolean).length;

  return (
    <header className="h-14 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 md:hidden"
        >
          <Layers className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center shadow-inner">
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primary }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-100 tracking-tight">
                GodUI Studio
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                godui.design
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Composite vs Component Gallery */}
      <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-white/10 text-xs font-medium">
        <button
          onClick={() => onViewModeChange('composite')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors",
            viewMode === 'composite'
              ? "bg-white/10 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Composição Unificada</span>
          <span className="sm:hidden">Composto</span>
        </button>

        <button
          onClick={() => onViewModeChange('gallery')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors",
            viewMode === 'gallery'
              ? "bg-white/10 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Galeria Isolada</span>
          <span className="sm:hidden">Galeria</span>
        </button>
      </div>

      {/* Viewport controls (Desktop, Tablet, Mobile) */}
      <div className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-lg border border-white/5">
        <button
          onClick={() => onViewportChange('desktop')}
          title="Desktop (100%)"
          className={cn(
            "p-1.5 rounded-md transition-colors",
            viewportMode === 'desktop' ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Monitor className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onViewportChange('tablet')}
          title="Tablet (768px)"
          className={cn(
            "p-1.5 rounded-md transition-colors",
            viewportMode === 'tablet' ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Tablet className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onViewportChange('mobile')}
          title="Mobile (390px)"
          className={cn(
            "p-1.5 rounded-md transition-colors",
            viewportMode === 'mobile' ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Smartphone className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Export CTA Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-zinc-950 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Exportar Código</span>
        </button>
      </div>
    </header>
  );
};
