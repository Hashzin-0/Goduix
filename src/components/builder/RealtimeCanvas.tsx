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
import { GODUI_CATALOG } from '../../data/goduiCatalog';

export const RealtimeCanvas: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  const selectedComponent = store.components.find(c => c.id === store.selectedId);

  type QuickLibraryDrag = {
    pointerId: number;
    type: keyof typeof GODUI_CATALOG;
    name: string;
    startX: number;
    startY: number;
    active: boolean;
    cancelled: boolean;
  };

  const quickDragRef = React.useRef<QuickLibraryDrag | null>(null);
  const suppressQuickClickUntilRef = React.useRef(0);
  const [quickDrag, setQuickDrag] = React.useState<{
    x: number;
    y: number;
    name: string;
    overCanvas: boolean;
    dropMode: 'insert' | 'merge';
  } | null>(null);

  const handleQuickDragStart = (
    event: React.PointerEvent<HTMLButtonElement>,
    item: (typeof GODUI_CATALOG)[keyof typeof GODUI_CATALOG],
  ) => {
    if (event.pointerType === 'mouse' || event.button !== 0) return;

    quickDragRef.current = {
      pointerId: event.pointerId,
      type: item.type,
      name: item.name,
      startX: event.clientX,
      startY: event.clientY,
      active: false,
      cancelled: false,
    };

    // Keep receiving pointer events after the finger leaves the card. The
    // carousel's touch-pan-x still allows horizontal swiping.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Some browsers may revoke capture during native scrolling.
    }
  };

  const handleQuickDragMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = quickDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || drag.cancelled) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.active) {
      if (Math.hypot(deltaX, deltaY) < 10) return;

      // Horizontal movement belongs to the quick-library carousel, not DnD.
      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        drag.cancelled = true;
        return;
      }

      drag.active = true;
    }

    event.preventDefault();
    const hit = document.elementFromPoint(event.clientX, event.clientY);
    const componentTarget = hit?.closest<HTMLElement>('[data-goduix-component-card]');
    const canvasTarget = hit?.closest('[data-goduix-new-component-drop-target]');
    const rect = componentTarget?.getBoundingClientRect();
    const edge = rect && (event.clientY < rect.top + rect.height * 0.24 || event.clientY > rect.bottom - rect.height * 0.24);
    setQuickDrag({
      x: event.clientX,
      y: event.clientY,
      name: drag.name,
      overCanvas: Boolean(componentTarget || canvasTarget),
      dropMode: componentTarget && !edge ? 'merge' : 'insert',
    });
  };

  const finishQuickDrag = (
    event: React.PointerEvent<HTMLButtonElement>,
    cancelled = false,
  ) => {
    const drag = quickDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.active && !cancelled) {
      event.preventDefault();
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      const componentTarget = hit?.closest<HTMLElement>('[data-goduix-component-card]');
      const canvasTarget = hit?.closest('[data-goduix-new-component-drop-target]');
      if (componentTarget) {
        const targetId = componentTarget.dataset.componentId;
        const targetIndex = Number(componentTarget.dataset.componentIndex ?? store.components.length);
        const rect = componentTarget.getBoundingClientRect();
        const nearEdge = event.clientY < rect.top + rect.height * 0.24 || event.clientY > rect.bottom - rect.height * 0.24;
        if (targetId && !nearEdge) {
          store.addComponent(drag.type);
          const sourceId = useBuilderStore.getState().selectedId;
          if (sourceId && sourceId !== targetId) {
            window.dispatchEvent(new CustomEvent('goduix:semantic-merge-drop', { detail: { sourceId, targetId } }));
          }
        } else {
          const targetPosition = event.clientY > rect.top + rect.height / 2 ? targetIndex + 1 : targetIndex;
          store.addComponent(drag.type, targetPosition);
        }
      } else if (canvasTarget) {
        store.addComponent(drag.type, getCanvasInsertionIndex(event.clientY));
      }
      suppressQuickClickUntilRef.current = Date.now() + 700;
    } else if (drag.cancelled || cancelled) {
      // A carousel swipe must not fall through to the card's add-on-click.
      suppressQuickClickUntilRef.current = Date.now() + 500;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    quickDragRef.current = null;
    setQuickDrag(null);
  };

  const getCanvasInsertionIndex = (clientY: number) => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-goduix-component-card]'));
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const index = Number(card.dataset.componentIndex);
      if (clientY < rect.top + rect.height / 2) return Number.isFinite(index) ? index : 0;
    }
    return store.components.length;
  };

  const viewportWidths = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[390px] max-w-full',
  };

  return (
    <div
      onClick={() => store.selectComponent(null)}
      onDragOver={(e) => {
        const types = Array.from(e.dataTransfer.types);
        if (types.includes('application/x-goduix-new-component-type') || types.includes('application/x-goduix-component-id')) e.preventDefault();
      }}
      onDrop={(e) => {
        const type = e.dataTransfer.getData('application/x-goduix-new-component-type');
        const sourceId = e.dataTransfer.getData('application/x-goduix-component-id');
        if (!type && !sourceId) return;
        e.preventDefault();
        e.stopPropagation();
        if (type && GODUI_CATALOG[type as keyof typeof GODUI_CATALOG]) {
          store.addComponent(type as keyof typeof GODUI_CATALOG, getCanvasInsertionIndex(e.clientY));
          return;
        }
        if (sourceId) {
          const sourceIndex = store.components.findIndex(component => component.id === sourceId);
          const desiredIndex = getCanvasInsertionIndex(e.clientY);
          const adjustedIndex = sourceIndex < desiredIndex ? desiredIndex - 1 : desiredIndex;
          if (sourceIndex >= 0 && sourceIndex !== adjustedIndex) store.reorderComponents(sourceIndex, adjustedIndex);
        }
      }}
      className="relative flex-1 h-full overflow-y-auto bg-zinc-950 flex flex-col items-center px-2 sm:px-4 py-4 sm:py-8"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${theme.glow}, transparent 65%)`,
      }}
    >
      {/* Hero: swipeable component queue lives on the Canvas, not in a separate selection page. */}
      <section className="w-full max-w-6xl mb-4 rounded-2xl border border-white/10 bg-zinc-900/55 p-3 sm:p-4" onClick={(e) => e.stopPropagation()} aria-label="Escolha rápida de componentes">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Canvas · biblioteca rápida</div>
            <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">Escolha e posicione componentes</h2>
            <p className="mt-1 text-[11px] text-zinc-400">Toque para adicionar ao final. Arraste para inserir entre componentes ou solte no centro de outro para abrir o Merge semântico.</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-zinc-400">{Object.keys(GODUI_CATALOG).length} componentes</span>
        </div>
        <div data-goduix-quick-library className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 touch-pan-x select-none [scrollbar-width:thin]">
          {Object.values(GODUI_CATALOG).map((item) => (
            <button
              key={item.type}
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/x-goduix-new-component-type', item.type);
                e.dataTransfer.effectAllowed = 'copy';
              }}
              onPointerDown={(e) => handleQuickDragStart(e, item)}
              onPointerMove={handleQuickDragMove}
              onPointerUp={(e) => finishQuickDrag(e)}
              onPointerCancel={(e) => finishQuickDrag(e, true)}
              onClick={(e) => {
                if (Date.now() < suppressQuickClickUntilRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  suppressQuickClickUntilRef.current = 0;
                  return;
                }
                store.addComponent(item.type);
              }}
              title={`Adicionar ${item.name} ao Canvas`}
              className="group flex w-40 shrink-0 snap-start flex-col items-start rounded-xl border border-white/10 bg-black/20 p-3 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] active:scale-[0.98] cursor-grab touch-pan-x"
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300/70">Componente</span>
              <span className="mt-2 line-clamp-1 text-xs font-semibold text-white">{item.name}</span>
              <span className="mt-1 line-clamp-2 min-h-8 text-[10px] leading-relaxed text-zinc-500">{item.description}</span>
            </button>
          ))}
        </div>
      </section>

      {quickDrag && (
        <div
          aria-live="polite"
          className={cn(
            "pointer-events-none fixed z-[100] max-w-[min(75vw,18rem)] -translate-y-1/2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md",
            quickDrag.overCanvas
              ? quickDrag.dropMode === 'merge'
                ? "border-violet-300 bg-violet-400/20 text-violet-100"
                : "border-cyan-300 bg-cyan-400/20 text-cyan-100"
              : "border-white/20 bg-zinc-900/95 text-white"
          )}
          style={{ left: Math.min(quickDrag.x + 14, window.innerWidth - 220), top: quickDrag.y }}
        >
          {quickDrag.overCanvas ? (quickDrag.dropMode === 'merge' ? "Solte para fazer Merge" : "Solte para inserir") : "Arraste para o Canvas"} · {quickDrag.name}
        </div>
      )}

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
        data-goduix-new-component-drop-target
        className={cn(
          "transition-all duration-300 relative",
          quickDrag?.overCanvas && "ring-2 ring-cyan-400/70 ring-offset-2 ring-offset-zinc-950",
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
