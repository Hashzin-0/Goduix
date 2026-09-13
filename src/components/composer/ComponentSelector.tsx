import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, Sparkles, Wand2, Layers, Magnet, 
  CreditCard, Box, Sun, Globe, Type, LayoutGrid, 
  Check, Sliders, Palette, Play, Eye, RotateCcw,
  ChevronDown, ChevronRight
} from 'lucide-react';
import { GODUI_COMPONENTS } from '../../data/goduiComponents';
import { THEMES } from '../../data/themes';
import { 
  ComposerConfig, 
  ComponentId, 
  ThemePalette, 
  EntranceAnimation, 
  LoopingAnimation 
} from '../../types';
import { cn } from '../../lib/utils';

interface ComponentSelectorProps {
  config: ComposerConfig;
  onChange: (updater: (prev: ComposerConfig) => ComposerConfig) => void;
  onReset: () => void;
  onApplyPreset: (presetId: string) => void;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  config,
  onChange,
  onReset,
  onApplyPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'components' | 'animations' | 'theme' | 'props'>('components');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const getIconForComponent = (id: ComponentId) => {
    switch (id) {
      case 'floating-island-header': return <Compass className="w-4 h-4" />;
      case 'liquid-glass-button': return <Sparkles className="w-4 h-4" />;
      case 'magic-shimmer-button': return <Wand2 className="w-4 h-4" />;
      case 'gooey-fab': return <Layers className="w-4 h-4" />;
      case 'magnetic-button': return <Magnet className="w-4 h-4" />;
      case 'inset-glass-card': return <CreditCard className="w-4 h-4" />;
      case 'tilt-3d-card': return <Box className="w-4 h-4" />;
      case 'scroll-glow': return <Sun className="w-4 h-4" />;
      case 'interactive-3d-mesh': return <Globe className="w-4 h-4" />;
      case 'aurora-text': return <Type className="w-4 h-4" />;
      case 'bento-grid-section': return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const toggleComponent = (id: ComponentId) => {
    onChange(prev => ({
      ...prev,
      activeComponents: {
        ...prev.activeComponents,
        [id]: !prev.activeComponents[id],
      },
    }));
  };

  const activeCount = Object.values(config.activeComponents).filter(Boolean).length;

  return (
    <aside className="w-full h-full flex flex-col bg-zinc-950/95 border-r border-white/10 text-zinc-100 overflow-hidden select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              GodUI Composer
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono">
              {activeCount}/11 ativos
            </span>
          </div>
          <h2 className="text-sm font-semibold text-zinc-200 mt-0.5">
            Mixer de Componentes
          </h2>
        </div>

        <button
          onClick={onReset}
          title="Restaurar padrão"
          className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Preset Quick Actions */}
      <div className="p-3 border-b border-white/10 bg-zinc-900/30">
        <label className="text-[11px] font-medium text-zinc-400 block mb-2">
          Presets Prontos:
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onApplyPreset('all')}
            className="px-2 py-1.5 text-left text-[11px] font-medium rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors border border-white/5 truncate"
          >
            ✦ Tudo do GodUI
          </button>
          <button
            onClick={() => onApplyPreset('island-glass')}
            className="px-2 py-1.5 text-left text-[11px] font-medium rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors border border-white/5 truncate"
          >
            ✦ Ilha + Vidro Líquido
          </button>
          <button
            onClick={() => onApplyPreset('3d-spatial')}
            className="px-2 py-1.5 text-left text-[11px] font-medium rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors border border-white/5 truncate"
          >
            ✦ 3D WebGL + Tilt
          </button>
          <button
            onClick={() => onApplyPreset('bento-inset')}
            className="px-2 py-1.5 text-left text-[11px] font-medium rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors border border-white/5 truncate"
          >
            ✦ Bento + Inset Depth
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center border-b border-white/10 px-2 pt-1 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('components')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors",
            activeTab === 'components'
              ? "border-cyan-400 text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Peças</span>
        </button>

        <button
          onClick={() => setActiveTab('animations')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors",
            activeTab === 'animations'
              ? "border-cyan-400 text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Motion</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors",
            activeTab === 'theme'
              ? "border-cyan-400 text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Tema</span>
        </button>

        <button
          onClick={() => setActiveTab('props')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors",
            activeTab === 'props'
              ? "border-cyan-400 text-white"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Ajustes</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: COMPONENTS LIST */}
        {activeTab === 'components' && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-400 pb-1">
              Ative ou desative cada componente individualmente. Todos foram desenvolvidos para interoperar sem conflitos de CSS ou transição.
            </p>

            {GODUI_COMPONENTS.map((comp) => {
              const isActive = !!config.activeComponents[comp.id];
              return (
                <div
                  key={comp.id}
                  onClick={() => toggleComponent(comp.id)}
                  className={cn(
                    "p-3 rounded-xl border transition-all cursor-pointer select-none",
                    isActive
                      ? "bg-zinc-900/90 border-cyan-500/40 shadow-sm"
                      : "bg-zinc-950/40 border-white/5 opacity-60 hover:opacity-100 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors",
                          isActive
                            ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                            : "bg-white/5 border-white/10 text-zinc-400"
                        )}
                      >
                        {getIconForComponent(comp.id)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">
                          {comp.name}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {comp.category}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center border transition-colors",
                        isActive
                          ? "bg-cyan-500 border-cyan-400 text-zinc-950"
                          : "border-white/20 bg-white/5"
                      )}
                    >
                      {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: MOTION & ANIMATIONS */}
        {activeTab === 'animations' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Animação de Entrada e Saída
              </label>
              <p className="text-[11px] text-zinc-500 mb-3">
                Curvas de aceleração elástica (spring) com interpolação de opacidade e desfoque gaussiano.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'fade-spring', label: 'Spring Fade' },
                  { id: 'blur-scale-up', label: 'Blur Scale Up' },
                  { id: 'slide-up', label: 'Slide Up' },
                  { id: 'none', label: 'Sem Animação' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChange(prev => ({ ...prev, entranceAnimation: item.id as EntranceAnimation }))}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-medium border text-left transition-colors",
                      config.entranceAnimation === item.id
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
                        : "bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Animação Looping
              </label>
              <p className="text-[11px] text-zinc-500 mb-3">
                Micro-movimento contínuo e orgânico para dar vida aos componentes em repouso.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gentle-float', label: 'Gentle Float' },
                  { id: 'pulse-glow', label: 'Pulse Glow' },
                  { id: 'subtle-orbit', label: 'Subtle Orbit' },
                  { id: 'none', label: 'Desativado' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChange(prev => ({ ...prev, loopingAnimation: item.id as LoopingAnimation }))}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-medium border text-left transition-colors",
                      config.loopingAnimation === item.id
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
                        : "bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THEME PALETTE */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-400">
              Paletas de iluminação cromática que alimentam halos de glow, refração de vidro e feixes 3D:
            </p>
            <div className="space-y-2">
              {Object.values(THEMES).map((themeItem) => {
                const isSelected = config.theme === themeItem.id;
                return (
                  <button
                    key={themeItem.id}
                    onClick={() => onChange(prev => ({ ...prev, theme: themeItem.id }))}
                    className={cn(
                      "w-full p-3 rounded-xl border flex items-center justify-between transition-all",
                      isSelected
                        ? "bg-zinc-900 border-cyan-500/50"
                        : "bg-zinc-950/40 border-white/5 hover:border-white/15"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full shadow-md"
                        style={{
                          backgroundColor: themeItem.primary,
                          boxShadow: `0 0 12px ${themeItem.glow}`,
                        }}
                      />
                      <span className="text-xs font-semibold text-zinc-200">
                        {themeItem.name}
                      </span>
                    </div>

                    <div
                      className="w-16 h-3 rounded-full bg-gradient-to-r opacity-80"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${themeItem.primary}, ${themeItem.accent})`,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: COMPONENT PROPS */}
        {activeTab === 'props' && (
          <div className="space-y-5 text-xs">
            {/* Header Props */}
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> Ilha Flutuante
              </span>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Título da Ilha</label>
                <input
                  type="text"
                  value={config.floatingIsland.title}
                  onChange={(e) => onChange(prev => ({
                    ...prev,
                    floatingIsland: { ...prev.floatingIsland, title: e.target.value }
                  }))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-zinc-100 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Desfoque Glass ({config.floatingIsland.blurAmount}px)</span>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={config.floatingIsland.blurAmount}
                  onChange={(e) => onChange(prev => ({
                    ...prev,
                    floatingIsland: { ...prev.floatingIsland, blurAmount: Number(e.target.value) }
                  }))}
                  className="w-24 accent-cyan-400"
                />
              </div>
            </div>

            {/* Inset Depth Props */}
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> Profundidade Inset
              </span>
              <div className="flex gap-2">
                {(['subtle', 'deep', 'ultra'] as const).map((depth) => (
                  <button
                    key={depth}
                    onClick={() => onChange(prev => ({
                      ...prev,
                      insetCard: { ...prev.insetCard, insetDepth: depth }
                    }))}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg border text-center capitalize text-[11px]",
                      config.insetCard.insetDepth === depth
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
                        : "bg-white/5 border-white/10 text-zinc-400"
                    )}
                  >
                    {depth}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Mesh Options */}
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" /> 3D WebGL Mesh
              </span>
              <div className="flex gap-1.5">
                {(['wireframe-orb', 'mesh-plane', 'particle-field'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => onChange(prev => ({
                      ...prev,
                      threeMesh: { ...prev.threeMesh, mode: m }
                    }))}
                    className={cn(
                      "flex-1 py-1 rounded text-[10px] border truncate",
                      config.threeMesh.mode === m
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
                        : "bg-white/5 border-white/10 text-zinc-400"
                    )}
                  >
                    {m.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll Glow Props */}
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-cyan-400" /> Glow de Rolagem
              </span>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Intensidade</span>
                <input
                  type="range"
                  min="0.2"
                  max="1.5"
                  step="0.1"
                  value={config.scrollGlow.intensity}
                  onChange={(e) => onChange(prev => ({
                    ...prev,
                    scrollGlow: { ...prev.scrollGlow, intensity: Number(e.target.value) }
                  }))}
                  className="w-24 accent-cyan-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
