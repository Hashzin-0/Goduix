import React, { useMemo, useState } from 'react';
import { Layers, X, Check, ShieldAlert } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { planSupportedSemanticMerge } from '../../engine/supportedSemanticMergePlanner';
import { validateSemanticMerge, getMergeRegionLabel } from '../../engine/semanticMergePlanner';

export const SemanticMergeIsland: React.FC = () => {
  const store = useBuilderStore();
  const [open, setOpen] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const source = store.components.find(c => c.id === sourceId);
  const target = store.components.find(c => c.id === targetId);
  const plan = useMemo(() => source && target ? planSupportedSemanticMerge(source, target) : null, [source, target]);
  const errors = useMemo(() => plan ? validateSemanticMerge(plan, selected) : [], [plan, selected]);
  const apply = () => {
    if (!plan || !target || errors.length) return;
    const chosen = plan.candidates.filter(c => selected.includes(c.id));
    const direct = chosen.filter(c => c.kind === 'copy-prop' && Object.prototype.hasOwnProperty.call(target.props, c.sourceKey));
    if (direct.length) {
      const next = { ...target.props };
      for (const c of direct) next[c.sourceKey] = c.sourceValue;
      store.updateComponentProps(target.id, next);
    }
    setOpen(false);
    setSelected([]);
  };
  return <>
    <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-cyan-300/30 bg-zinc-900 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-xl hover:bg-zinc-800"><Layers size={17}/> Mesclar componentes</button>
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="semantic-merge-title">
      <section className="w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-zinc-950 shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><h2 id="semantic-merge-title" className="font-semibold">Mesclagem semântica</h2><p className="mt-1 text-xs text-zinc-400">Somente propriedades que o destino declara e consegue renderizar são exibidas.</p></div><button onClick={() => setOpen(false)} aria-label="Fechar"><X size={18}/></button></header>
        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
          <label className="text-xs text-zinc-400">Componente doador<select value={sourceId} onChange={e => {setSourceId(e.target.value);setSelected([])}} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 p-2 text-sm text-white"><option value="">Escolher componente…</option>{store.components.map(c => <option key={c.id} value={c.id} disabled={c.id===targetId}>{c.name}</option>)}</select></label>
          <label className="text-xs text-zinc-400">Componente de destino<select value={targetId} onChange={e => {setTargetId(e.target.value);setSelected([])}} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 p-2 text-sm text-white"><option value="">Escolher destino…</option>{store.components.map(c => <option key={c.id} value={c.id} disabled={c.id===sourceId}>{c.name}</option>)}</select></label>
        </div>
        <div className="max-h-[42vh] space-y-2 overflow-y-auto px-5 pb-5">
          {plan?.candidates.map(c => <label key={c.id} className="flex cursor-pointer gap-3 rounded-xl border border-white/10 p-3 hover:border-cyan-400/30"><input type="checkbox" checked={selected.includes(c.id)} onChange={() => setSelected(s => s.includes(c.id) ? s.filter(v => v!==c.id) : [...s,c.id])} className="mt-1 accent-cyan-400"/><span className="flex-1"><span className="block text-sm font-medium">{c.label} <span className="text-xs text-cyan-300">{Math.round(c.confidence*100)}%</span></span><span className="mt-1 block text-xs text-zinc-400">{c.reason}</span></span></label>)}
          {plan?.warnings.map((w,i) => <p key={i} className="flex gap-2 text-xs text-amber-200/80"><ShieldAlert size={14}/>{w}</p>)}
          {errors.map((e,i) => <p key={i} className="text-xs text-red-300">{e}</p>)}
        </div>
        <footer className="flex items-center justify-between border-t border-white/10 px-5 py-4"><span className="text-xs text-zinc-500">{selected.length && plan ? getMergeRegionLabel(plan.candidates.find(c => c.id===selected[0])!.region) : 'Nenhuma propriedade selecionada'}</span><div className="flex gap-2"><button onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-white/5">Cancelar</button><button disabled={!source || !target || !selected.length || errors.length>0} onClick={apply} className="flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-40"><Check size={16}/>Aplicar</button></div></footer>
      </section>
    </div>}
  </>;
};
