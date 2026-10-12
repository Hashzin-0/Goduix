import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRightLeft, Check, X, Grip, AlertCircle, Plus, Trash2, Eye } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';

type DropDetail = { sourceId: string; targetId: string };
type Mapping = { id: string; sourceKey: string; targetKey: string; enabled: boolean };

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value, null, 2) ?? String(value); } catch { return String(value); }
}

function isolatedPreview(value: unknown, label: string) {
  if (typeof value === 'string' && /^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(value)) {
    return <div className="flex items-center gap-2"><span className="h-7 w-7 rounded-md border border-white/20" style={{ background: value }} /><code>{value}</code></div>;
  }
  if (typeof value === 'boolean') return <span className={`inline-flex rounded-full px-2 py-1 text-xs ${value ? 'bg-emerald-300/15 text-emerald-200' : 'bg-zinc-700 text-zinc-300'}`}>{value ? 'Ativado' : 'Desativado'}</span>;
  if (typeof value === 'number') return <div className="space-y-1"><div className="h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-cyan-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div><span className="text-xs">{value}</span></div>;
  if (typeof value === 'string') return <div className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-sm" style={{ fontFamily: label.toLowerCase().includes('font') ? value : undefined }}>{value || 'Texto vazio'}</div>;
  return <pre className="max-h-24 overflow-auto whitespace-pre-wrap break-words text-[10px] text-zinc-300">{formatValue(value)}</pre>;
}

export const SemanticMergeIsland: React.FC = () => {
  const store = useBuilderStore();
  const [open, setOpen] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleDrop = (event: Event) => {
      const detail = (event as CustomEvent<DropDetail>).detail;
      if (!detail?.sourceId || !detail?.targetId || detail.sourceId === detail.targetId) return;
      const state = useBuilderStore.getState();
      if (!state.components.some(c => c.id === detail.sourceId) || !state.components.some(c => c.id === detail.targetId)) return;
      setSourceId(detail.sourceId);
      setTargetId(detail.targetId);
      setMappings([{ id: `${Date.now()}-0`, sourceKey: '', targetKey: '', enabled: true }]);
      setError('');
      setOpen(true);
    };
    window.addEventListener('goduix:semantic-merge-drop', handleDrop);
    return () => window.removeEventListener('goduix:semantic-merge-drop', handleDrop);
  }, []);

  const source = store.components.find(c => c.id === sourceId);
  const target = store.components.find(c => c.id === targetId);
  const sourceMeta = source ? GODUI_CATALOG[source.type] : undefined;
  const targetMeta = target ? GODUI_CATALOG[target.type] : undefined;
  const sourceFields = useMemo(() => {
    if (!source || !sourceMeta) return [];
    const catalogued = sourceMeta.propFields.filter(field => Object.prototype.hasOwnProperty.call(source.props ?? {}, field.key) && source.props[field.key] !== undefined && typeof source.props[field.key] !== 'function');
    const extras = Object.keys(source.props ?? {}).filter(key => !key.startsWith('__') && !catalogued.some(field => field.key === key) && typeof source.props[key] !== 'function').map(key => ({ key, label: key, type: 'text' as const, defaultValue: source.props[key] }));
    return [...catalogued, ...extras];
  }, [source, sourceMeta]);
  const targetFields = useMemo(() => {
    if (!target || !targetMeta) return [];
    const catalogued = targetMeta.propFields.filter(field => field.key in (target.props ?? {}));
    const extras = Object.keys(target.props ?? {}).filter(key => !key.startsWith('__') && !catalogued.some(field => field.key === key) && typeof target.props[key] !== 'function').map(key => ({ key, label: key, type: 'text' as const, defaultValue: target.props[key] }));
    return [...catalogued, ...extras];
  }, [target, targetMeta]);

  const updateMapping = (id: string, patch: Partial<Mapping>) => setMappings(items => items.map(item => item.id === id ? { ...item, ...patch } : item));
  const addMapping = () => setMappings(items => [...items, { id: `${Date.now()}-${items.length}`, sourceKey: '', targetKey: '', enabled: true }]);
  const close = () => { setOpen(false); setError(''); };
  const apply = () => {
    if (!source || !target) return;
    const active = mappings.filter(m => m.enabled && m.sourceKey && m.targetKey);
    if (!active.length) { setError('Selecione pelo menos uma transferência de propriedade.'); return; }
    const duplicateTargets = active.map(m => m.targetKey).filter((key, index, all) => all.indexOf(key) !== index);
    if (duplicateTargets.length) { setError(`Cada propriedade de destino pode aparecer uma vez: ${[...new Set(duplicateTargets)].join(', ')}.`); return; }
    const next: Record<string, unknown> = { ...target.props };
    for (const mapping of active) {
      const value = source.props[mapping.sourceKey];
      if (value === undefined || typeof value === 'function') { setError(`A propriedade ${mapping.sourceKey} não pode ser transferida.`); return; }
      next[mapping.targetKey] = value;
    }
    store.updateComponentProps(target.id, next);
    store.selectComponent(target.id);
    close();
  };

  if (!open) return null;
  return (
    <aside className="fixed bottom-3 right-3 z-[100] flex max-h-[88dvh] w-[min(760px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-cyan-300/25 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl" role="region" aria-labelledby="semantic-merge-title">
      <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-start gap-3"><span className="mt-0.5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200"><ArrowRightLeft size={18}/></span><div><h2 id="semantic-merge-title" className="font-semibold text-white">Merge semântico</h2><p className="mt-1 text-xs text-zinc-400">Selecione quantas propriedades quiser. A janela de prévia isola o valor selecionado.</p></div></div>
        <button type="button" onClick={close} aria-label="Fechar Merge" className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"><X size={18}/></button>
      </header>
      <div className="grid grid-cols-2 gap-2 border-b border-white/10 px-4 py-3"><div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-2"><div className="text-[10px] uppercase tracking-wider text-cyan-300">Origem</div><div className="truncate text-sm font-medium text-white">{source?.name ?? 'Componente ausente'}</div></div><div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-2"><div className="text-[10px] uppercase tracking-wider text-violet-300">Destino</div><div className="truncate text-sm font-medium text-white">{target?.name ?? 'Componente ausente'}</div></div></div>
      {(!source || !target || !sourceMeta || !targetMeta) ? <div className="p-4 text-sm text-amber-200"><AlertCircle size={16} className="mr-2 inline"/>Não foi possível carregar as propriedades dos componentes.</div> : <div className="min-h-0 space-y-3 overflow-y-auto p-3">
        {mappings.map((mapping, index) => {
          const sourceField = sourceFields.find(field => field.key === mapping.sourceKey);
          const sourceValue = mapping.sourceKey ? source.props[mapping.sourceKey] : undefined;
          return <section key={mapping.id} className={`rounded-xl border p-3 ${mapping.enabled ? 'border-white/10 bg-white/[0.025]' : 'border-white/5 bg-black/10 opacity-60'}`}>
            <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Transferência {index + 1}</span><div className="flex items-center gap-2"><label className="flex items-center gap-1 text-[10px] text-zinc-400"><input type="checkbox" checked={mapping.enabled} onChange={e => updateMapping(mapping.id, { enabled: e.target.checked })}/> Aplicar</label><button type="button" onClick={() => setMappings(items => items.filter(item => item.id !== mapping.id))} aria-label="Remover transferência" className="rounded p-1 text-zinc-500 hover:bg-rose-400/10 hover:text-rose-300"><Trash2 size={13}/></button></div></div>
            <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-start">
              <label className="block text-xs text-zinc-300">Propriedade de origem<select value={mapping.sourceKey} onChange={e => updateMapping(mapping.id, { sourceKey: e.target.value })} className="mt-1.5 w-full rounded-lg border border-white/10 bg-zinc-900 p-2 text-xs text-white"><option value="">Escolher propriedade…</option>{sourceFields.map(field => <option key={field.key} value={field.key}>{field.label} · {field.key}</option>)}</select><div className="mt-2 rounded-lg border border-cyan-300/15 bg-black/25 p-2"><div className="mb-1 flex items-center gap-1 text-[9px] uppercase text-cyan-200"><Eye size={11}/> Prévia isolada · {sourceField?.label ?? 'selecione uma prop'}</div>{mapping.sourceKey ? isolatedPreview(sourceValue, sourceField?.label ?? '') : <span className="text-[10px] text-zinc-600">Apenas esta propriedade aparecerá aqui.</span>}</div></label>
              <div className="flex justify-center pt-8 text-cyan-300"><Grip size={17}/></div>
              <label className="block text-xs text-zinc-300">Propriedade de destino<select value={mapping.targetKey} onChange={e => updateMapping(mapping.id, { targetKey: e.target.value })} className="mt-1.5 w-full rounded-lg border border-white/10 bg-zinc-900 p-2 text-xs text-white"><option value="">Escolher propriedade…</option>{targetFields.map(field => <option key={field.key} value={field.key}>{field.label} · {field.key}</option>)}</select><div className="mt-2 rounded-lg border border-violet-300/15 bg-black/25 p-2"><div className="mb-1 text-[9px] uppercase text-violet-200">Resultado no alvo</div>{mapping.targetKey ? isolatedPreview(mapping.sourceKey ? sourceValue : target.props[mapping.targetKey], mapping.targetKey) : <span className="text-[10px] text-zinc-600">Selecione a propriedade que receberá o valor.</span>}</div></label>
            </div>
          </section>;
        })}
        <button type="button" onClick={addMapping} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-300/25 py-2.5 text-xs font-medium text-cyan-200 hover:bg-cyan-300/5"><Plus size={14}/>Adicionar outra propriedade</button>
        {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
      </div>}
      <footer className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-3"><span className="text-[10px] text-zinc-500">{mappings.filter(m => m.enabled && m.sourceKey && m.targetKey).length} propriedade(s) selecionada(s)</span><div className="flex gap-2"><button type="button" onClick={close} className="rounded-xl px-3 py-2 text-xs text-zinc-300 hover:bg-white/5">Cancelar</button><button type="button" disabled={!source || !target} onClick={apply} className="flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-xs font-semibold text-zinc-950 disabled:opacity-40"><Check size={15}/>Aplicar Merge</button></div></footer>
    </aside>
  );
};
