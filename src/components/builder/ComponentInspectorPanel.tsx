import React from 'react';
import { 
  Sliders, 
  Settings2, 
  X, 
  Trash2, 
  Copy, 
  BookOpen, 
  Sparkles, 
  Palette, 
  Info,
  Code2,
  Zap,
  Droplets,
  Plus,
  Power
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { THEMES } from '../../data/themes';
import { FUSION_DONORS, FUSION_PRESETS } from '../../data/fusionCatalog';
import { ThemePalette } from '../../types';
import { cn } from '../../lib/utils';

export const ComponentInspectorPanel: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  const selectedComponent = store.components.find(c => c.id === store.selectedId);
  const meta = selectedComponent ? GODUI_CATALOG[selectedComponent.type] : null;

  if (!selectedComponent || !meta) {
    return (
      <aside className="w-full h-full lg:w-72 xl:w-80 bg-zinc-950/95 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col p-4 select-none overflow-y-auto shrink-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Configurações Globais</span>
          </div>
          {/* Mobile quick switch back to canvas */}
          <button
            onClick={() => store.setMobileTab('canvas')}
            className="lg:hidden p-1.5 rounded-xl bg-white/10 text-zinc-300 text-xs font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Canvas</span>
          </button>
        </div>

        {/* Global Theme Picker */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-2 font-medium">
              Paleta Temática do GodUI
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(THEMES) as ThemePalette[]).map((paletteId) => {
                const p = THEMES[paletteId];
                const isCurrent = store.theme === paletteId;
                return (
                  <button
                    key={paletteId}
                    onClick={() => store.setTheme(paletteId)}
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer",
                      isCurrent
                        ? "bg-white/10 border-white/30 text-white font-medium shadow-sm"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                        style={{ backgroundColor: p.primary }}
                      />
                      <span>{p.name}</span>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-cyan-400">Ativo</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-zinc-400 space-y-2 mt-6">
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspector em Tempo Real</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Clique em qualquer componente no Canvas central para editar propriedades dinâmicas como textos, desfoques de vidro, sombras e rotações.
            </p>
          </div>

          {/* Interaction Event History */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Log de Eventos Interativos ({store.interactionEvents.length})
            </div>
            {store.interactionEvents.length === 0 ? (
              <p className="text-[11px] text-zinc-600 italic">
                Clique nos botões ou no Dock para gerar interações táteis.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {store.interactionEvents.map((evt) => (
                  <div key={evt.id} className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[10px]">
                    <div className="flex items-center justify-between text-zinc-400 font-mono">
                      <span>{evt.sourceComponent}</span>
                      <span className="text-cyan-400">{evt.action}</span>
                    </div>
                    {evt.details && <div className="text-zinc-500 mt-0.5 truncate">{evt.details}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    store.updateComponentProps(selectedComponent.id, { [key]: value });
  };

  return (
    <aside className="w-full h-full lg:w-72 xl:w-80 bg-zinc-950/95 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col select-none overflow-hidden shrink-0 z-20">
      {/* Inspector Top Bar */}
      <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-zinc-900/40">
        <div className="flex items-center gap-2 truncate">
          <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">{selectedComponent.name}</div>
            <div className="text-[10px] text-zinc-400 font-mono">{meta.registryName}</div>
          </div>
        </div>

        <button
          onClick={() => {
            store.selectComponent(null);
            store.setMobileTab('canvas');
          }}
          className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white cursor-pointer flex items-center gap-1"
          title="Fechar e voltar ao canvas"
        >
          <span className="text-[10px] lg:hidden">Canvas</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic Props Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          Propriedades Customizáveis
        </div>

        {meta.propFields.map((field) => {
          const currentValue = selectedComponent.props[field.key] ?? field.defaultValue;

          return (
            <div key={field.key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  {field.label}
                </label>
                {field.type === 'number' && (
                  <span className="text-[11px] font-mono text-cyan-400">
                    {currentValue}
                  </span>
                )}
              </div>

              {/* TEXT FIELD */}
              {field.type === 'text' && (
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => handlePropChange(field.key, e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                />
              )}

              {/* NUMBER SLIDER */}
              {field.type === 'number' && (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={field.min ?? 0}
                    max={field.max ?? 100}
                    step={field.step ?? 1}
                    value={currentValue}
                    onChange={(e) => handlePropChange(field.key, Number(e.target.value))}
                    className="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                  />
                </div>
              )}

              {/* BOOLEAN TOGGLE */}
              {field.type === 'boolean' && (
                <button
                  type="button"
                  onClick={() => handlePropChange(field.key, !currentValue)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-xl border text-xs transition-colors cursor-pointer",
                    currentValue
                      ? "bg-cyan-500/10 border-cyan-500/30 text-white font-medium"
                      : "bg-white/[0.02] border-white/5 text-zinc-400"
                  )}
                >
                  <span>{currentValue ? 'Ativado' : 'Desativado'}</span>
                  <div
                    className={cn(
                      "w-8 h-4 rounded-full transition-colors relative",
                      currentValue ? "bg-cyan-500" : "bg-zinc-700"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform",
                        currentValue ? "right-0.5" : "left-0.5"
                      )}
                    />
                  </div>
                </button>
              )}

              {/* SELECT DROPDOWN */}
              {field.type === 'select' && (
                <select
                  value={currentValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parsed = !isNaN(Number(val)) && field.options?.some(o => typeof o.value === 'number')
                      ? Number(val)
                      : val;
                    handlePropChange(field.key, parsed);
                  }}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}

        {/* FUSION ENGINE SECTION */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Fusão & Mescla de Efeitos</span>
            </div>
            {selectedComponent.fusions && selectedComponent.fusions.length > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300">
                {selectedComponent.fusions.filter(f => f.active).length} ativo(s)
              </span>
            )}
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Mescle comportamentos de outros componentes (ex: Liquid Glass no card ativado, Gooey no menu, etc.).
          </p>

          {/* List of active fusions on this component */}
          {selectedComponent.fusions && selectedComponent.fusions.length > 0 ? (
            <div className="space-y-2">
              {selectedComponent.fusions.map((fusion) => {
                return (
                  <div
                    key={fusion.id}
                    className={cn(
                      "p-2.5 rounded-xl border transition-all text-xs space-y-2",
                      fusion.active 
                        ? "bg-cyan-500/10 border-cyan-500/30 text-white" 
                        : "bg-white/[0.02] border-white/5 text-zinc-500 opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <div className="truncate">
                          <div className="font-bold truncate text-white">{fusion.sourceComponentName}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">
                            ➔ {fusion.targetSlot === 'active-item' ? 'Item Ativado (Clicado)' : fusion.targetSlot}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* Toggle active */}
                        <button
                          onClick={() => store.toggleFusion(selectedComponent.id, fusion.id)}
                          title={fusion.active ? "Desativar efeito" : "Ativar efeito"}
                          className={cn(
                            "p-1 rounded-lg cursor-pointer transition-colors",
                            fusion.active ? "text-cyan-400 hover:bg-cyan-500/20" : "text-zinc-500 hover:bg-white/10"
                          )}
                        >
                          <Power className="w-3 h-3" />
                        </button>
                        {/* Remove */}
                        <button
                          onClick={() => store.removeFusion(selectedComponent.id, fusion.id)}
                          title="Remover fusão"
                          className="p-1 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Intensity control */}
                    {fusion.active && (
                      <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                        <span className="text-[10px] text-zinc-400">Força:</span>
                        <input
                          type="range"
                          min="0.2"
                          max="1.0"
                          step="0.05"
                          value={fusion.intensity ?? 0.8}
                          onChange={(e) => store.updateFusion(selectedComponent.id, fusion.id, { intensity: parseFloat(e.target.value) })}
                          className="flex-1 accent-cyan-400 cursor-pointer h-1 bg-zinc-800 rounded-lg"
                        />
                        <span className="text-[10px] font-mono text-cyan-400">
                          {Math.round((fusion.intensity ?? 0.8) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-zinc-500">
              Nenhum efeito mesclado ainda
            </div>
          )}

          {/* Add Fusion Button */}
          <button
            onClick={() => store.openFusionModal(selectedComponent.id)}
            className="w-full py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mesclar Efeito de Outro Componente</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => store.setInspectingDocType(selectedComponent.type)}
            className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Documentação & CLI</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => store.duplicateComponent(selectedComponent.id)}
              className="py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-zinc-300 text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>Duplicar</span>
            </button>
            <button
              onClick={() => store.removeComponent(selectedComponent.id)}
              className="py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remover</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
