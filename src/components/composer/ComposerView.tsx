import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Download,
  Upload,
  ChevronDown,
  Layout,
  Eye,
  Code2,
  Palette,
  Plus,
  Undo2,
  Redo2,
  Settings,
  X,
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { COMPONENT_REGISTRY } from '../../data/componentRegistry';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { cn } from '../../lib/utils';
import { GodUIComponentType } from '../../types/builder';
import { EffectPalette } from './EffectPalette';
import { ComposeCanvas } from './ComposeCanvas';
import { MergeStack } from './MergeStack';
import { CompositionExporter } from './CompositionExporter';

const COMPONENT_TYPES = Object.keys(COMPONENT_REGISTRY) as GodUIComponentType[];

type ComposerViewMode = 'builder' | 'composer' | 'preview' | 'code';

export function ComposerView() {
  const {
    currentComposition,
    createComposition,
    clearComposition,
    viewMode,
    setViewMode,
    savedCompositionPresets,
  } = useBuilderStore();

  const [composerViewMode, setComposerViewMode] = useState<ComposerViewMode>('composer');
  const [showComponentSelector, setShowComponentSelector] = useState(false);
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState('');

  const handleCreateComposition = useCallback(
    (type: GodUIComponentType) => {
      createComposition(type);
      setShowComponentSelector(false);
    },
    [createComposition]
  );

  const handleLoadPreset = useCallback(
    (presetId: string) => {
      useBuilderStore.getState().loadPreset(presetId);
      setShowPresetDropdown(false);
    },
    []
  );

  const handleViewModeChange = useCallback(
    (mode: ComposerViewMode) => {
      setComposerViewMode(mode);
      if (mode !== 'composer') {
        setViewMode(mode as any);
      }
    },
    [setViewMode]
  );

  const handleNameSubmit = useCallback(() => {
    if (currentComposition && nameValue.trim()) {
      const updated = { ...currentComposition, name: nameValue.trim(), updatedAt: Date.now() };
      useBuilderStore.setState({ currentComposition: updated });
    }
    setIsEditingName(false);
  }, [currentComposition, nameValue]);

  const handleExport = useCallback(() => {
    setShowExportModal(true);
  }, []);

  if (!currentComposition) {
    return (
      <div className="flex flex-col h-full bg-zinc-950">
        <ComposerNavbar
          viewMode={composerViewMode}
          onViewModeChange={handleViewModeChange}
          compositionName={null}
          onNameEdit={() => {}}
          isEditingName={false}
          onNameSubmit={() => {}}
          onNameChange={() => {}}
          onComponentSelectorToggle={() => {}}
          onPresetToggle={() => {}}
          onExport={() => {}}
          showComponentSelector={false}
          showPresetDropdown={false}
          componentTypes={COMPONENT_TYPES}
          presets={savedCompositionPresets}
          onCreateComposition={handleCreateComposition}
          onLoadPreset={handleLoadPreset}
          onComponentSelectorClose={() => setShowComponentSelector(false)}
          onPresetClose={() => setShowPresetDropdown(false)}
        />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-md"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <Layers className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Composer</h2>
              <p className="text-zinc-400 text-sm">
                Selecione um componente base para iniciar uma nova composição, ou carregue um preset existente.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowComponentSelector(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nova Composição
              </button>
              <button
                onClick={() => setShowPresetDropdown(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-colors"
              >
                <Upload className="w-4 h-4" />
                Carregar Preset
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      <ComposerNavbar
        viewMode={composerViewMode}
        onViewModeChange={handleViewModeChange}
        compositionName={currentComposition.name}
        onNameEdit={() => {
          setNameValue(currentComposition.name);
          setIsEditingName(true);
        }}
        isEditingName={isEditingName}
        onNameSubmit={handleNameSubmit}
        onNameChange={setNameValue}
        onComponentSelectorToggle={() => setShowComponentSelector(!showComponentSelector)}
        onPresetToggle={() => setShowPresetDropdown(!showPresetDropdown)}
        onExport={handleExport}
        showComponentSelector={showComponentSelector}
        showPresetDropdown={showPresetDropdown}
        componentTypes={COMPONENT_TYPES}
        presets={savedCompositionPresets}
        onCreateComposition={handleCreateComposition}
        onLoadPreset={handleLoadPreset}
        onComponentSelectorClose={() => setShowComponentSelector(false)}
        onPresetClose={() => setShowPresetDropdown(false)}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-72 min-w-[288px] border-r border-white/5 overflow-hidden">
          <EffectPalette />
        </div>

        <div className="flex-1 overflow-hidden">
          <ComposeCanvas />
        </div>

        <div className="w-80 min-w-[320px] border-l border-white/5 overflow-hidden">
          <MergeStack />
        </div>
      </div>

      <AnimatePresence>
        {showExportModal && (
          <CompositionExporter onClose={() => setShowExportModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ComposerNavbar({
  viewMode,
  onViewModeChange,
  compositionName,
  onNameEdit,
  isEditingName,
  onNameSubmit,
  onNameChange,
  onComponentSelectorToggle,
  onPresetToggle,
  onExport,
  showComponentSelector,
  showPresetDropdown,
  componentTypes,
  presets,
  onCreateComposition,
  onLoadPreset,
  onComponentSelectorClose,
  onPresetClose,
}: {
  viewMode: ComposerViewMode;
  onViewModeChange: (mode: ComposerViewMode) => void;
  compositionName: string | null;
  onNameEdit: () => void;
  isEditingName: boolean;
  onNameSubmit: () => void;
  onNameChange: (v: string) => void;
  onComponentSelectorToggle: () => void;
  onPresetToggle: () => void;
  onExport: () => void;
  showComponentSelector: boolean;
  showPresetDropdown: boolean;
  componentTypes: GodUIComponentType[];
  presets: any[];
  onCreateComposition: (type: GodUIComponentType) => void;
  onLoadPreset: (id: string) => void;
  onComponentSelectorClose: () => void;
  onPresetClose: () => void;
}) {
  return (
    <div className="h-12 border-b border-white/5 flex items-center px-3 gap-2 bg-zinc-900/50 shrink-0">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Composer</span>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1" />

      {isEditingName ? (
        <input
          autoFocus
          value={compositionName || ''}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={onNameSubmit}
          onKeyDown={(e) => e.key === 'Enter' && onNameSubmit()}
          className="bg-zinc-800 border border-cyan-500/50 rounded-md px-2 py-0.5 text-sm text-white outline-none w-48"
        />
      ) : (
        <button
          onClick={onNameEdit}
          className="text-sm text-white font-medium hover:text-cyan-400 transition-colors truncate max-w-[200px]"
        >
          {compositionName || 'Sem nome'}
        </button>
      )}

      <div className="w-px h-5 bg-white/10 mx-1" />

      <div className="relative">
        <button
          onClick={onComponentSelectorToggle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          Componente
          <ChevronDown className="w-3 h-3" />
        </button>
        <AnimatePresence>
          {showComponentSelector && (
            <ComponentDropdown
              types={componentTypes}
              onSelect={onCreateComposition}
              onClose={onComponentSelectorClose}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <button
          onClick={onPresetToggle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          Preset
          <ChevronDown className="w-3 h-3" />
        </button>
        <AnimatePresence>
          {showPresetDropdown && (
            <PresetDropdown
              presets={presets}
              onSelect={onLoadPreset}
              onClose={onPresetClose}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1" />

      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-semibold transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        Exportar
      </button>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <div className="flex items-center bg-zinc-800 rounded-lg p-0.5">
        {([
          { mode: 'builder' as const, icon: Layout, label: 'Builder' },
          { mode: 'composer' as const, icon: Palette, label: 'Composer' },
          { mode: 'preview' as const, icon: Eye, label: 'Preview' },
          { mode: 'code' as const, icon: Code2, label: 'Code' },
        ]).map(({ mode, icon: Icon, label }) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all',
              viewMode === mode
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
            title={label}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ComponentDropdown({
  types,
  onSelect,
  onClose,
}: {
  types: GodUIComponentType[];
  onSelect: (type: GodUIComponentType) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');

  const filtered = types.filter((t) => {
    const meta = GODUI_CATALOG[t];
    return (
      meta.name.toLowerCase().includes(search.toLowerCase()) ||
      meta.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="absolute top-full left-0 mt-1 w-72 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      <div className="p-2 border-b border-white/5">
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar componente..."
          className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
        />
      </div>
      <div className="max-h-64 overflow-y-auto p-1">
        {filtered.map((type) => {
          const meta = GODUI_CATALOG[type];
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-left transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${meta.category === 'Buttons & Actions' ? '#10b981' : meta.category === 'Cards & Layout' ? '#8b5cf6' : '#3b82f6'}20` }}
              >
                <Layers className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-white font-medium truncate">{meta.name}</div>
                <div className="text-xs text-zinc-500 truncate">{meta.category}</div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function PresetDropdown({
  presets,
  onSelect,
  onClose,
}: {
  presets: any[];
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');

  const filtered = presets.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t: string) => t.includes(search.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="absolute top-full left-0 mt-1 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      <div className="p-2 border-b border-white/5">
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar preset..."
          className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
        />
      </div>
      <div className="max-h-64 overflow-y-auto p-1">
        {filtered.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
              <Upload className="w-4 h-4 text-purple-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-white font-medium truncate">{preset.namePt || preset.name}</div>
              <div className="text-xs text-zinc-500 truncate">
                {preset.category} &middot; {preset.baseComponent}
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}


