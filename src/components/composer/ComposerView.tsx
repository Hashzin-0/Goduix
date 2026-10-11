import React, { useMemo, useState } from 'react';
import { Layers, Plus, Download, RotateCcw, Search, Sparkles } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { COMPONENT_REGISTRY } from '../../data/componentRegistry';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { GodUIComponentType } from '../../types/builder';
import { EffectPalette } from './EffectPalette';
import { ComposeCanvas } from './ComposeCanvas';
import { MergeStack } from './MergeStack';
import { CompositionExporter } from './CompositionExporter';

const COMPONENT_TYPES = Object.keys(COMPONENT_REGISTRY) as GodUIComponentType[];

export function ComposerView() {
  const store = useBuilderStore();
  const [search, setSearch] = useState('');
  const [showExporter, setShowExporter] = useState(false);
  const matches = useMemo(() => COMPONENT_TYPES.filter((type) => {
    const meta = GODUI_CATALOG[type];
    return meta && (meta.name.toLowerCase().includes(search.toLowerCase()) || meta.description.toLowerCase().includes(search.toLowerCase()));
  }), [search]);

  if (!store.currentComposition) {
    return (
      <section className="flex-1 min-h-0 overflow-y-auto bg-zinc-950 p-5 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Composer</h1>
              <p className="text-sm text-zinc-400 mt-1">Escolha uma base. Efeitos e camadas só entram quando você os configurar.</p>
            </div>
          </div>
          <label className="relative block max-w-lg mt-6 mb-5">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar componente base…" className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-400/60" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {matches.slice(0, 60).map((type) => {
              const meta = GODUI_CATALOG[type];
              return (
                <button key={type} onClick={() => store.createComposition(type)} className="group text-left rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.05] hover:border-violet-400/40 p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center"><Sparkles className="w-4 h-4 text-violet-300" /></div>
                    <Plus className="w-4 h-4 text-zinc-500 group-hover:text-violet-300" />
                  </div>
                  <h2 className="text-sm font-semibold text-white mt-3">{meta.name}</h2>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">{meta.description}</p>
                  <span className="inline-block text-[10px] text-zinc-500 mt-3">{meta.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 min-h-0 flex flex-col bg-zinc-950 overflow-hidden">
      <div className="h-12 shrink-0 px-4 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Layers className="w-4 h-4 text-violet-300 shrink-0" />
          <span className="text-sm font-semibold text-white truncate">{store.currentComposition.name}</span>
          <span className="hidden sm:inline text-[10px] text-zinc-500 border border-white/10 rounded-md px-1.5 py-0.5">Configuração manual</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => store.clearComposition()} className="px-2.5 py-1.5 rounded-lg border border-white/10 text-zinc-300 hover:bg-white/5 text-xs flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Nova base
          </button>
          <button onClick={() => setShowExporter(true)} className="px-3 py-1.5 rounded-lg bg-violet-400 text-zinc-950 font-semibold text-xs flex items-center gap-1.5 hover:bg-violet-300">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col xl:flex-row overflow-y-auto xl:overflow-hidden">
        <aside className="w-full xl:w-72 shrink-0 xl:h-full overflow-y-auto border-b xl:border-b-0 xl:border-r border-white/10">
          <EffectPalette />
        </aside>
        <main className="flex-1 min-h-[430px] xl:min-h-0 overflow-hidden">
          <ComposeCanvas />
        </main>
        <aside className="w-full xl:w-80 shrink-0 xl:h-full overflow-y-auto border-t xl:border-t-0 xl:border-l border-white/10">
          <MergeStack />
        </aside>
      </div>
      {showExporter && <CompositionExporter onClose={() => setShowExporter(false)} />}
    </section>
  );
}
