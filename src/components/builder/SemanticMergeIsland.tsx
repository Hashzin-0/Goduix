import React, { useEffect, useMemo, useState } from 'react';
import { Check, Layers, ShieldAlert, Sparkles, X } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { planSemanticMerge, validateSemanticMerge, getMergeRegionLabel, type MergePlan } from '../../engine/semanticMergePlanner';

interface MergeRequest { sourceId: string; targetId: string }
export const SemanticMergeIsland: React.FC = () => {
  const store = useBuilderStore();
  const [request, setRequest] = useState<MergeRequest | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<MergeRequest>).detail;
      if (!detail?.sourceId || !detail?.targetId || detail.sourceId === detail.targetId) return;
      setRequest(detail);
      setSelected([]);
    };
    window.addEventListener('goduix:semantic-merge', onRequest);
    return () => window.removeEventListener('goduix:semantic-merge', onRequest);
  }, []);
  const source = store.components.find(c => c.id === request?.sourceId);
  const target = store.components.find(c => c.id === request?.targetId);
  const plan: MergePlan | null = useMemo(() => source && target ? planSemanticMerge(source, target) : null, [source, target]);
  const errors = useMemo(() => plan ? validateSemanticMerge(plan, selected) : [], [plan, selected]);
  if (!request || !source || !target || !plan) return null;

  const apply = () => {
    if (errors.length) return;
    const safeCandidates = plan.candidates.filter(candidate => selected.includes(candidate.id));
    const direct = safeCandidates.filter(candidate => candidate.kind === 'copy-prop' && target.props[candidate.sourceKey] !== undefined);
    if (!direct.length) {
      store.setDraggingItem(null);
      store.setActiveToast({ message: 'Seleção reconhecida. Este destino ainda precisa de um adaptador visual para aplicar essas regiões; nenhuma alteração foi feita.', type: 'warning' });
      setRequest(null);
      return;
    }
    const nextProps = { ...target.props };
    for (const candidate of direct) nextProps[candidate.sourceKey] = candidate.sourceValue;
    store.updateComponentProps(target.id, nextProps);
    store.setActiveToast({ message: `Mesclagem aplicada a ${direct.length} propriedade(s) compatível(is). Estrutura e comportamento preservados.`, type: 'success' });
    setRequest(null);
  };
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);

  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="semantic-merge-title">
    <section className="w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-zinc-950 shadow-2xl shadow-cyan-950/30">
      <header className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex gap-3"><div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><Layers size={20}/></div><div><h2 id="semantic-merge-title" className="font-semibold text-white">Mesclagem semântica</h2><p className="mt-1 text-xs text-zinc-400">Escolha quais propriedades do componente doador serão aplicadas ao destino.</p></div></div>
        <button onClick={() => setRequest(null)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/10" aria-label="Fechar"><X size={18}/></button>
      </header>
      <div className="grid grid-cols-2 gap-3 px-5 py-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><p className="text-[10px] uppercase tracking-widest text-zinc-500">Doador</p><p className="mt-1 text-sm font-medium">{source.name}</p><p className="text-xs text-zinc-500">{source.type}</p></div>
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-3"><p className="text-[10px] uppercase tracking-widest text-cyan-300/70">Destino preservado</p><p className="mt-1 text-sm font-medium">{target.name}</p><p className="text-xs text-zinc-500">{target.type}</p></div>
      </div>
      <div className="max-h-[48vh] space-y-2 overflow-y-auto px-5 pb-4">
        {plan.candidates.map(candidate => <label key={candidate.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-3 hover:border-cyan-400/30">
          <input type="checkbox" checked={selected.includes(candidate.id)} onChange={() => toggle(candidate.id)} className="mt-1 accent-cyan-400"/>
          <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-100">{candidate.label}<span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400">{Math.round(candidate.confidence * 100)}% confiança</span></span><span className="mt-1 block text-xs leading-relaxed text-zinc-400">{candidate.reason}</span></span>
        </label>)}
        {!plan.candidates.length && <div className="rounded-xl border border-dashed border-white/10 p-5 text-sm text-zinc-400">Não foram encontradas propriedades visuais seguras para mesclar.</div>}
        {plan.warnings.map((warning, i) => <p key={i} className="flex gap-2 text-xs leading-relaxed text-amber-200/80"><ShieldAlert size={15} className="shrink-0"/>{warning}</p>)}
        {errors.map((error, i) => <p key={i} className="text-xs text-red-300">{error}</p>)}
      </div>
      <footer className="flex items-center justify-between border-t border-white/10 px-5 py-4"><p className="text-xs text-zinc-500">Região: {selected.length ? getMergeRegionLabel(plan.candidates.find(c => c.id === selected[0])!.region) : 'nenhuma selecionada'}</p><div className="flex gap-2"><button onClick={() => setRequest(null)} className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5">Cancelar</button><button onClick={apply} disabled={!selected.length || errors.length > 0} className="flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40"><Check size={16}/>Aplicar seleção</button></div></footer>
    </section>
  </div>;
};
