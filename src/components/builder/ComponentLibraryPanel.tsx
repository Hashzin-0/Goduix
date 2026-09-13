import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Layers, 
  Sparkles, 
  Compass, 
  CreditCard, 
  Type, 
  PanelBottom, 
  BookOpen, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  ArrowUpDown,
  FileCode2,
  Play
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { PAGE_TEMPLATES } from '../../data/templates';
import { ComponentCategory, GodUIComponentType } from '../../types/builder';
import { THEMES } from '../../data/themes';
import { FUSION_DONORS } from '../../data/fusionCatalog';
import { ComponentHoverPopover } from './ComponentHoverPopover';
import { cn } from '../../lib/utils';

export const ComponentLibraryPanel: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  const [activeTab, setActiveTab] = useState<'library' | 'canvas-tree' | 'templates'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'All'>('All');

  // Hover-preview states for desktop popover & mobile preview
  const [hoveredType, setHoveredType] = useState<GodUIComponentType | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [mobilePreviewType, setMobilePreviewType] = useState<GodUIComponentType | null>(null);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleCardMouseEnter = (type: GodUIComponentType, e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger floating hover on desktop screens
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = setTimeout(() => {
      setHoveredType(type);
      setAnchorRect(rect);
    }, 120);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    leaveTimerRef.current = setTimeout(() => {
      setHoveredType(null);
      setAnchorRect(null);
    }, 180);
  };

  const categories: (ComponentCategory | 'All')[] = [
    'All',
    'Navigation & Overlays',
    'Buttons & Actions',
    'Cards & Layout',
    'Typography & AI',
    'Inputs & Forms',
    'Creative & Shaders',
    'Footers & Backgrounds',
  ];

  const catalogList = Object.values(GODUI_CATALOG);
  const donorList = Object.values(FUSION_DONORS);

  const filteredCatalog = catalogList.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.registryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="w-full h-full lg:w-80 xl:w-88 bg-zinc-950/95 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col select-none overflow-hidden shrink-0 z-20 relative">
      {/* Panel Top Navigation Tabs */}
      <div className="p-3 border-b border-white/10 flex items-center gap-1.5 bg-zinc-900/40">
        <button
          onClick={() => setActiveTab('library')}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            activeTab === 'library'
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-zinc-400 hover:text-white"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Biblioteca</span>
        </button>

        <button
          onClick={() => setActiveTab('canvas-tree')}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer relative",
            activeTab === 'canvas-tree'
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-zinc-400 hover:text-white"
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Estrutura</span>
          <span 
            className="px-1.5 py-0.2 rounded-full text-[10px] font-mono text-zinc-950 font-bold"
            style={{ backgroundColor: theme.primary }}
          >
            {store.components.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            activeTab === 'templates'
              ? "bg-white/10 text-white shadow-sm border border-white/10"
              : "text-zinc-400 hover:text-white"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>
      </div>

      {/* TAB 1: COMPONENT LIBRARY */}
      {activeTab === 'library' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="p-3 border-b border-white/5 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar componente GodUI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer",
                    selectedCategory === cat
                      ? "bg-white/15 text-white font-medium border border-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {cat === 'All' ? 'Todos' : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Drag and Drop Effects Fusion Tray */}
          <div className="p-3 bg-zinc-900/60 border-b border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-semibold text-white">Arrastar & Fundir Efeitos</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-400">Solte no Canvas</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {donorList.map((donor) => {
                const isCurrentDrag = store.draggingItem?.effectType === donor.effectType;
                return (
                  <div
                    key={donor.effectType}
                    draggable
                    onDragStart={(e) => {
                      store.setDraggingItem({
                        type: 'effect',
                        effectType: donor.effectType,
                        effectName: donor.name,
                        sourceComponentName: donor.sourceComponentName,
                      });
                      e.dataTransfer.setData('text/plain', donor.effectType);
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                    onDragEnd={() => {
                      store.setDraggingItem(null);
                      store.setActiveHoverDropZone(null);
                    }}
                    onClick={() => {
                      if (store.selectedId) {
                        store.dropEffectOnSlot(store.selectedId, 'active-item', donor.effectType);
                      } else if (store.components.length > 0) {
                        store.dropEffectOnSlot(store.components[0].id, 'active-item', donor.effectType);
                      } else {
                        store.setDraggingItem(
                          isCurrentDrag
                            ? null
                            : {
                                type: 'effect',
                                effectType: donor.effectType,
                                effectName: donor.name,
                                sourceComponentName: donor.sourceComponentName,
                              }
                        );
                      }
                    }}
                    title={`Arrastar ${donor.name} para qualquer componente no Canvas`}
                    className={cn(
                      "px-2.5 py-1.5 rounded-xl text-[10px] font-medium whitespace-nowrap cursor-grab active:cursor-grabbing transition-all flex items-center gap-1.5 shrink-0 border",
                      isCurrentDrag
                        ? "ring-2 ring-cyan-400 scale-105 bg-cyan-500/20 border-cyan-400"
                        : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-white/20 text-zinc-200"
                    )}
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: donor.color }} 
                    />
                    <span>{donor.name.split('(')[0].trim()}</span>
                    <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-white/10 text-zinc-300">
                      Arrastar
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Components list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-1">
              Componentes Reais de godui.design ({filteredCatalog.length})
            </div>

            {filteredCatalog.map((item) => (
              <div
                key={item.type}
                onMouseEnter={(e) => handleCardMouseEnter(item.type, e)}
                onMouseLeave={handleCardMouseLeave}
                className="group relative p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] text-zinc-400">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Quick actions: Preview, Add to Canvas & View Docs */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-xs gap-1.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMobilePreviewType(item.type)}
                      className="text-[11px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors py-1 px-1.5 rounded-lg hover:bg-white/5"
                      title="Visualizar Componente em Ação"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => store.setInspectingDocType(item.type)}
                      className="text-[11px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors py-1 px-1.5 rounded-lg hover:bg-white/5"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span className="hidden sm:inline">Docs</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Draggable Fusion trigger */}
                    <div
                      draggable
                      onDragStart={(e) => {
                        store.setDraggingItem({
                          type: 'component',
                          effectType: 'liquid-glass',
                          effectName: item.name,
                          sourceComponentName: item.name,
                          sourceComponentType: item.type,
                        });
                        e.dataTransfer.setData('text/plain', item.name);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      onDragEnd={() => {
                        store.setDraggingItem(null);
                        store.setActiveHoverDropZone(null);
                      }}
                      title="Arraste para mesclar no Canvas"
                      className="px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-medium text-[10px] flex items-center gap-1 cursor-grab active:cursor-grabbing border border-cyan-500/30 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Fundir</span>
                    </div>

                    <button
                      onClick={() => store.addComponent(item.type)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-3 h-3 text-cyan-400" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CANVAS STRUCTURE TREE */}
      {activeTab === 'canvas-tree' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/5 flex items-center justify-between text-xs">
            <span className="font-medium text-white">Hierarquia da Página</span>
            <button
              onClick={() => store.clearCanvas()}
              className="text-rose-400 hover:text-rose-300 text-[11px] cursor-pointer"
            >
              Limpar Tudo
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {store.components.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                Nenhum componente adicionado à página.
              </div>
            ) : (
              store.components.map((c, i) => {
                const isSelected = store.selectedId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => store.selectComponent(c.id)}
                    className={cn(
                      "p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all cursor-pointer",
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm"
                        : "bg-white/[0.02] border-white/5 text-zinc-300 hover:bg-white/[0.05]"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono text-zinc-500 w-4">
                        {i + 1}
                      </span>
                      <span className="font-medium truncate">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Toggle visibility */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          store.toggleVisibility(c.id);
                        }}
                        className="p-1 hover:text-white text-zinc-400 rounded"
                        title={c.isVisible ? 'Ocultar' : 'Mostrar'}
                      >
                        {c.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          store.duplicateComponent(c.id);
                        }}
                        className="p-1 hover:text-white text-zinc-400 rounded"
                        title="Duplicar"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          store.removeComponent(c.id);
                        }}
                        className="p-1 hover:text-rose-400 text-zinc-400 rounded"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: READY TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-1">
            Templates Pré-Configurados
          </div>

          {PAGE_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 space-y-2.5 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-tight">{tmpl.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                  {tmpl.badge}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {tmpl.description}
              </p>
              <div className="text-[10px] font-mono text-zinc-500">
                {tmpl.components.length} componentes GodUI incluídos
              </div>
              <button
                onClick={() => store.loadTemplate(tmpl.id)}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Carregar no Canvas</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Desktop Floating Hover-Preview Popover */}
      <AnimatePresence>
        {hoveredType && !mobilePreviewType && (
          <div
            onMouseEnter={() => {
              if (leaveTimerRef.current) {
                clearTimeout(leaveTimerRef.current);
                leaveTimerRef.current = null;
              }
            }}
            onMouseLeave={handleCardMouseLeave}
          >
            <ComponentHoverPopover
              componentType={hoveredType}
              anchorRect={anchorRect}
              onClose={() => setHoveredType(null)}
              onAdd={(type) => store.addComponent(type)}
              onViewDocs={(type) => store.setInspectingDocType(type)}
              isMobileModal={false}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Interactive Preview Sheet / Modal */}
      <AnimatePresence>
        {mobilePreviewType && (
          <ComponentHoverPopover
            componentType={mobilePreviewType}
            anchorRect={null}
            onClose={() => setMobilePreviewType(null)}
            onAdd={(type) => store.addComponent(type)}
            onViewDocs={(type) => store.setInspectingDocType(type)}
            isMobileModal={true}
          />
        )}
      </AnimatePresence>
    </aside>
  );
};
