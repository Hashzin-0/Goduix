import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Layout, 
  Monitor, 
  Smartphone, 
  Tablet,
  CheckCircle2,
  Info,
  AlertTriangle
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ComponentRenderer } from './ComponentRenderer';
import { PAGE_TEMPLATES } from '../../data/templates';
import { cn } from '../../lib/utils';
import { THEMES } from '../../data/themes';

export const RealtimeCanvas: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  const selectedComponent = store.components.find(c => c.id === store.selectedId);

  const viewportWidths = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[390px] max-w-full',
  };

  return (
    <div
      onClick={() => store.selectComponent(null)}
      className="relative flex-1 h-full overflow-y-auto bg-zinc-950 flex flex-col items-center px-2 sm:px-4 py-4 sm:py-8"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${theme.glow}, transparent 65%)`,
      }}
    >
      {/* Toast Notification for real-time interactions */}
      <AnimatePresence>
        {store.activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 sm:top-18 left-4 right-4 sm:left-auto sm:right-auto z-50 flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-white/20 text-white shadow-2xl backdrop-blur-xl text-xs max-w-sm mx-auto"
          >
            <div className="flex items-center gap-2 truncate">
              <div
                className="w-2 h-2 rounded-full animate-ping shrink-0"
                style={{ backgroundColor: theme.primary }}
              />
              <span className="font-medium truncate">{store.activeToast.message}</span>
            </div>
            <button
              onClick={() => store.dismissToast()}
              className="text-zinc-500 hover:text-white ml-2 text-xs p-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Drag & Drop Fusion Active Bar */}
      <AnimatePresence>
        {store.draggingItem && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            className="sticky top-2 z-50 flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-cyan-950/90 border-2 border-cyan-400 text-white shadow-2xl shadow-cyan-950/50 backdrop-blur-xl max-w-xl mx-auto w-full"
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold text-cyan-200 truncate">
                  ⚡ Fusão Ativa: Solte em qualquer Slot (Borda, Ícone, Container...)
                </div>
                <div className="text-[10px] text-zinc-300 font-mono">
                  Arrastando: <strong>{store.draggingItem.effectName || store.draggingItem.sourceComponentName}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                store.setDraggingItem(null);
                store.setActiveHoverDropZone(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white cursor-pointer shrink-0 transition-colors"
            >
              Cancelar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Selected Component Action Pill on Mobile */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="lg:hidden fixed bottom-18 left-3 right-3 z-40 flex items-center justify-between p-3 rounded-2xl bg-zinc-950/95 border border-cyan-500/40 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 truncate">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold truncate">{selectedComponent.name}</div>
                <div className="text-[10px] text-zinc-400 font-mono">Selecionado</div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                store.setMobileTab('inspector');
              }}
              className="px-3 py-1.5 rounded-xl text-zinc-950 font-bold text-xs flex items-center gap-1 shrink-0 shadow cursor-pointer"
              style={{ backgroundColor: theme.primary }}
            >
              <span>Ajustar Props</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frame wrapper based on viewport */}
      <div
        className={cn(
          "transition-all duration-300 relative",
          viewportWidths[store.viewport],
          store.viewport === 'mobile' && "rounded-[48px] border-[10px] border-zinc-900 shadow-2xl overflow-hidden min-h-[820px] bg-zinc-950 px-2 py-4 mt-4 mb-24",
          store.viewport === 'tablet' && "rounded-[32px] border-[8px] border-zinc-900 shadow-2xl overflow-hidden min-h-[900px] bg-zinc-950 px-4 py-6 mt-4 mb-24",
          store.viewport === 'desktop' && "mt-4 mb-24"
        )}
      >
        {/* Mobile Dynamic Island Hardware Simulation */}
        {store.viewport === 'mobile' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-zinc-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-950/80 border border-blue-900" />
          </div>
        )}

        {/* Empty Canvas State */}
        {store.components.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/40 my-16 space-y-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <Layout className="w-8 h-8" style={{ color: theme.primary }} />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold text-white tracking-tight">O Canvas está Vazio</h3>
              <p className="text-xs text-zinc-400">
                Selecione componentes na biblioteca para adicioná-los, ou carregue um dos templates completos abaixo:
              </p>
            </div>

            {/* Mobile quick button to open library */}
            <button
              onClick={() => store.setMobileTab('library')}
              className="lg:hidden px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-950 flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: theme.primary }}
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Componentes</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
              {PAGE_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => store.loadTemplate(tmpl.id)}
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-left transition-all group cursor-pointer"
                >
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-400">
                    {tmpl.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1 line-clamp-2">
                    {tmpl.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-24">
            {store.components.map((instance, index) => (
              <ComponentRenderer
                key={instance.id}
                instance={instance}
                index={index}
                total={store.components.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
