import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRightLeft, Check, X, Grip, AlertCircle } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';

type DropDetail = { sourceId: string; targetId: string };

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value, null, 2) ?? String(value); } catch { return String(value); }
}

export const SemanticMergeIsland: React.FC = () => {
  const store = useBuilderStore();
  const [open, setOpen] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [sourceKey, setSourceKey] = useState('');
  const [targetKey, setTargetKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleDrop = (event: Event) => {
      const detail = (event as CustomEvent<DropDetail>).detail;
      if (!detail?.sourceId || !detail?.targetId || detail.sourceId === detail.targetId) return;
      const state = useBuilderStore.getState();
      if (!state.components.some(c => c.id === detail.sourceId) || !state.components.some(c => c.id === detail.targetId)) return;
      setSourceId(detail.sourceId);
      setTargetId(detail.targetId);
      setSourceKey('');
      setTargetKey('');
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
    return sourceMeta.propFields.filter(field =>
      Object.prototype.hasOwnProperty.call(source.props ?? {}, field.key) &&
      source.props[field.key] !== undefined &&
      typeof source.props[field.key] !== 'function'
    );
  }, [source, sourceMeta]);

  const targetFields = useMemo(() => {
    if (!target || !targetMeta) return [];
    return targetMeta.propFields.filter(field => field.key in (target.props ?? {}));
  }, [target, targetMeta]);

  const selectedSourceField = sourceFields.find(field => field.key === sourceKey);
  const selectedTargetField = targetFields.find(field => field.key === targetKey);
  const sourceValue = source && sourceKey ? source.props[sourceKey] : undefined;

  const apply = () => {
    if (!source || !target || !sourceKey || !targetKey || !selectedSourceField || !selectedTargetField) return;
    if (sourceValue === undefined || typeof sourceValue === 'function') {
      setError('A propriedade de origem não possui um valor transferível.');
      return;
    }
    const next = { ...target.props, [targetKey]: sourceValue };
    store.updateComponentProps(target.id, next);
    store.selectComponent(target.id);
    setOpen(false);
  };

  const close = () => { setOpen(false); setError(''); };

  return <>
    {open && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="semantic-merge-title">
        <section className="w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-300/25 bg-zinc-950 shadow-2xl shadow-black/50">
          <header className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200"><ArrowRightLeft size={18}/></span>
              <div>
                <h2 id="semantic-merge-title" className="font-semibold text-white">Merge semântico</h2>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">Escolha uma propriedade do componente arrastado e indique qual propriedade do alvo ela deve alterar. O componente alvo permanece no Canvas.</p>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Fechar ilha de mesclagem" className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"><X size={18}/></button>
          </header>

          <div className="grid gap-3 p-5 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Doador · origem</div>
              <div className="text-sm font-medium text-white">{source?.name ?? 'Componente não encontrado'}</div>
              <div className="mt-1 text-xs text-zinc-500">{sourceMeta?.name ?? source?.type}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">Alvo · recebe a alteração</div>
              <div className="text-sm font-medium text-white">{target?.name ?? 'Componente não encontrado'}</div>
              <div className="mt-1 text-xs text-zinc-500">{targetMeta?.name ?? target?.type}</div>
            </div>
          </div>

          {(!source || !target || !sourceMeta || !targetMeta) ? (
            <div className="mx-5 mb-5 flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-sm text-amber-100"><AlertCircle size={16}/> Não foi possível ler os metadados dos componentes. Feche e tente arrastar novamente.</div>
          ) : (
            <div className="space-y-4 px-5 pb-5">
              <label className="block text-xs font-medium text-zinc-300">
                1. Propriedade que será copiada do doador
                <select value={sourceKey} onChange={e => { setSourceKey(e.target.value); setError(''); }} className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-900 p-3 text-sm text-white focus:border-cyan-300/50 focus:outline-none">
                  <option value="">Escolher propriedade de origem…</option>
                  {sourceFields.map(field => <option key={field.key} value={field.key}>{field.label} · {field.key}</option>)}
                </select>
              </label>

              <div className="flex justify-center text-cyan-300"><Grip size={18}/></div>

              <label className="block text-xs font-medium text-zinc-300">
                2. Propriedade do alvo que será alterada
                <select value={targetKey} onChange={e => { setTargetKey(e.target.value); setError(''); }} className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-900 p-3 text-sm text-white focus:border-violet-300/50 focus:outline-none">
                  <option value="">Escolher propriedade do alvo…</option>
                  {targetFields.map(field => <option key={field.key} value={field.key}>{field.label} · {field.key}</option>)}
                </select>
              </label>

              {sourceKey && targetKey && (
                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05] p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-cyan-100"><ArrowRightLeft size={14}/> Prévia da alteração</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="min-w-0"><div className="mb-1 text-[10px] text-zinc-500">Origem · {sourceKey}</div><pre className="max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/30 p-2 text-xs text-zinc-200">{formatValue(sourceValue)}</pre></div>
                    <div className="min-w-0"><div className="mb-1 text-[10px] text-zinc-500">Destino · {targetKey}</div><pre className="max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/30 p-2 text-xs text-zinc-200">{formatValue(target?.props[targetKey])} <span className="text-cyan-300">→ {formatValue(sourceValue)}</span></pre></div>
                  </div>
                  {typeof sourceValue === 'object' && sourceValue !== null && <p className="mt-2 text-[10px] text-amber-200">Valor estruturado: será transferido como um valor inteiro, sem mesclagem profunda de objetos.</p>}
                </div>
              )}
              {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
              {sourceFields.length === 0 && <p className="text-xs text-amber-200">O doador não expõe propriedades editáveis presentes em seu estado atual.</p>}
              {targetFields.length === 0 && <p className="text-xs text-amber-200">O alvo não possui propriedades catalogadas presentes em seu estado atual.</p>}
            </div>
          )}

          <footer className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
            <span className="text-[10px] text-zinc-500">A mesclagem só ocorre após confirmar.</span>
            <div className="flex gap-2">
              <button type="button" onClick={close} className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5">Cancelar</button>
              <button type="button" disabled={!source || !target || !sourceKey || !targetKey} onClick={apply} className="flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40"><Check size={16}/>Aplicar ao alvo</button>
            </div>
          </footer>
        </section>
      </div>
    )}
  </>;
};
