import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRightLeft, Check, X, AlertCircle, RefreshCw, Layers, Type, Box, ChevronDown } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { classifyProperty, humanizeLayer, isSemanticallyCompatible, parseColorValue, readSemanticTargets, SemanticPropertyKind } from './semanticLayerAdapter';

type DropDetail = { sourceId: string; targetId: string };
type Layer = { path: string; tag: string; label: string; text: string; depth: number; kind: string; leaf: boolean };
type LayerChoice = { layerPath: string; propertyKey: string; label: string; kind: SemanticPropertyKind; value: string; cssProperty: string };
type StyleOverrides = Record<string, Record<string, string | undefined>>;
type PropertyGroup = { key: string; label: string; kinds: SemanticPropertyKind[] };
const PROPERTY_GROUPS: PropertyGroup[] = [
  { key: 'border', label: 'Borda e contorno', kinds: ['border','outline','stroke'] },
  { key: 'animation', label: 'Animação e movimento', kinds: ['animation','transform'] },
  { key: 'color', label: 'Cores e preenchimento', kinds: ['color','background','fill'] },
  { key: 'shadow', label: 'Sombra e brilho', kinds: ['shadow'] },
  { key: 'typography', label: 'Texto e tipografia', kinds: ['text','typography'] },
  { key: 'layout', label: 'Dimensões e espaçamento', kinds: ['spacing','size','opacity'] },
  { key: 'other', label: 'Outras propriedades', kinds: ['media','other'] },
];
function hasAuthoredValue(choice: LayerChoice): boolean {
  const v = choice.value.trim().toLowerCase();
  if (!v || v === 'none' || v === 'normal' || v === 'auto' || v === 'initial' || v === 'unset' || v === 'inherit') return false;
  if (choice.kind === 'animation' && (v === 'none' || v.startsWith('none '))) return false;
  if (['border','outline'].includes(choice.kind) && (/^(0(px|rem|em)?)$/.test(v) || v === 'none' || v === '0px none rgb(0, 0, 0)')) return false;
  if (choice.kind === 'shadow' && v === 'rgba(0, 0, 0, 0)') return false;
  return true;
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value, null, 2) ?? String(value); } catch { return String(value); }
}
function humanColor(value: string): string | null {
  return parseColorValue(value) ?? null;
}
function findRoot(id: string): HTMLElement | null {
  const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id.replace(/[^a-zA-Z0-9_-]/g, '');
  const selectors = [
    `[data-goduix-component-id="${escaped}"] [data-goduix-layer-root]`,
    `[data-component-id="${escaped}"] [data-goduix-layer-root]`,
    `[data-goduix-layer-root][data-component-id="${escaped}"]`,
    `[data-component-id="${escaped}"]`
  ];
  for (const selector of selectors) {
    const root = document.querySelector<HTMLElement>(selector);
    if (root) return root;
  }
  return null;
}
function scan(root: HTMLElement): Layer[] {
  const out: Layer[] = [];
  const ignored = 'script,style,svg defs,defs,title,desc,[data-goduix-editor-chrome]';
  const walk = (el: HTMLElement, path: string, depth: number, parentTag?: string) => {
    if (el.matches(ignored)) return;
    const tag = el.tagName.toLowerCase();
    const children = Array.from(el.children).filter(c => !c.matches('svg,path,defs,linearGradient,stop,title,desc,[data-goduix-editor-chrome]'));
    const text = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent?.trim() || '').filter(Boolean).join(' ');
    const hint = text || el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('alt') || el.getAttribute('placeholder') || '';
    out.push({ path, tag, label: humanizeLayer(tag, hint, depth, parentTag), text, depth, kind: ['button','input','textarea','select','a'].includes(tag) ? 'controle' : ['img','video','canvas'].includes(tag) ? 'mídia' : tag === 'svg' ? 'ícone' : text && !children.length ? 'texto' : 'contêiner', leaf: children.length === 0 });
    children.forEach((child, i) => walk(child as HTMLElement, path ? path + '.' + i : String(i), depth + 1, tag));
  };
  walk(root, '', 0);
  return out.slice(0, 240);
}
function atPath(root: HTMLElement, path: string): HTMLElement | null {
  if (!path) return root;
  let node: Element = root;
  for (const part of path.split('.')) {
    const children = Array.from(node.children).filter(c => !c.matches('svg,path,defs,linearGradient,stop,title,desc,[data-goduix-editor-chrome]'));
    const next = children[Number(part)];
    if (!next) return null;
    node = next;
  }
  return node as HTMLElement;
}
function choicesFor(root: HTMLElement | null, layers: Layer[]): LayerChoice[] {
  if (!root) return [];
  const result: LayerChoice[] = [];
  for (const layer of layers) {
    const el = atPath(root, layer.path);
    if (!el) continue;
    for (const target of readSemanticTargets(el)) {
      result.push({ layerPath: layer.path, propertyKey: target.key, label: target.label, kind: target.kind, value: target.value, cssProperty: target.cssProperty });
    }
  }
  return result;
}
function preview(value: unknown, label: string) {
  const color = typeof value === 'string' ? humanColor(value) : null;
  if (color) return <div className="flex items-center gap-2"><span className="h-6 w-6 rounded-md border border-white/20" style={{ background: color }}/><code className="text-[10px]">{color}</code></div>;
  if (typeof value === 'boolean') return <span className="text-xs">{value ? 'Ativado' : 'Desativado'}</span>;
  return <div className="truncate rounded-md bg-black/20 px-2 py-1 text-[10px] text-zinc-300">{value === '' || value == null ? 'Não definido (pode ser criado)' : formatValue(value)}</div>;
}

export const SemanticMergeIsland: React.FC = () => {
  const store = useBuilderStore();
  const [open, setOpen] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [error, setError] = useState('');
  const [sourceLayers, setSourceLayers] = useState<Layer[]>([]);
  const [targetLayers, setTargetLayers] = useState<Layer[]>([]);
  const [sourcePath, setSourcePath] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [sourceProperty, setSourceProperty] = useState('');
  const [targetProperty, setTargetProperty] = useState('');
  const [mergeCategory, setMergeCategory] = useState<SemanticPropertyKind>('border');
  const [selectedSourceProperties, setSelectedSourceProperties] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['border','animation','color']);
  const [scanVersion, setScanVersion] = useState(0);

  const refreshLayers = useCallback(() => {
    const sRoot = sourceId ? findRoot(sourceId) : null;
    const tRoot = targetId ? findRoot(targetId) : null;
    setSourceLayers(sRoot ? scan(sRoot) : []);
    setTargetLayers(tRoot ? scan(tRoot) : []);
    setScanVersion(v => v + 1);
  }, [sourceId, targetId]);

  useEffect(() => {
    const handleDrop = (event: Event) => {
      const detail = (event as CustomEvent<DropDetail>).detail;
      if (!detail?.sourceId || !detail?.targetId || detail.sourceId === detail.targetId) return;
      const state = useBuilderStore.getState();
      if (!state.components.some(c => c.id === detail.sourceId) || !state.components.some(c => c.id === detail.targetId)) return;
      setSourceId(detail.sourceId); setTargetId(detail.targetId);
      setSourcePath(''); setTargetPath(''); setSourceProperty(''); setTargetProperty(''); setSelectedSourceProperties([]);
      setError(''); setOpen(true);
    };
    window.addEventListener('goduix:semantic-merge-drop', handleDrop);
    return () => window.removeEventListener('goduix:semantic-merge-drop', handleDrop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(refreshLayers);
    const observer = new MutationObserver(() => refreshLayers());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, [open, refreshLayers]);

  const source = store.components.find(c => c.id === sourceId);
  const target = store.components.find(c => c.id === targetId);
  const sourceMeta = source ? GODUI_CATALOG[source.type] : undefined;
  const targetMeta = target ? GODUI_CATALOG[target.type] : undefined;
  const sourceRoot = source ? findRoot(source.id) : null;
  const targetRoot = target ? findRoot(target.id) : null;
  const sourceChoices = useMemo(() => choicesFor(sourceRoot, sourceLayers), [sourceRoot, sourceLayers, scanVersion]);
  const targetChoices = useMemo(() => choicesFor(targetRoot, targetLayers), [targetRoot, targetLayers, scanVersion]);
  const chosenSource = sourceChoices.find(c => c.layerPath === sourcePath && c.propertyKey === sourceProperty);
  const availableSourceChoices = sourceChoices.filter(c => c.layerPath === sourcePath && hasAuthoredValue(c));
  const selectedChoices = availableSourceChoices.filter(c => selectedSourceProperties.includes(c.propertyKey));
  const sourceKind = chosenSource?.kind ?? mergeCategory;
  const compatibleDestinations = targetChoices.filter(choice => isSemanticallyCompatible(sourceKind, choice.kind));
  const selectedSourceLayer = sourceLayers.find(l => l.path === sourcePath);
  const selectedTargetLayer = targetLayers.find(l => l.path === targetPath);
  const previewStyle = useMemo<React.CSSProperties>(() => {
    if (!chosenSource) return {};
    const value = chosenSource.value.trim();
    const css: React.CSSProperties = {};
    if (chosenSource.kind === 'border' || chosenSource.kind === 'outline') {
      css.borderColor = value || '#00d4ff';
      css.borderStyle = 'solid';
      css.borderWidth = '2px';
    } else if (chosenSource.kind === 'background' || chosenSource.kind === 'fill') {
      css.backgroundColor = value || '#164e63';
    } else if (chosenSource.kind === 'color') {
      css.color = value || '#67e8f9';
    } else if (chosenSource.kind === 'shadow') {
      css.boxShadow = value || '0 0 18px rgba(34,211,238,.55)';
    } else if (chosenSource.kind === 'stroke') {
      css.WebkitTextStroke = value ? `1px ${value}` : '1px #67e8f9';
    } else if (chosenSource.kind === 'typography') {
      if (chosenSource.cssProperty === 'fontSize' && value) css.fontSize = value;
      if (chosenSource.cssProperty === 'fontWeight' && value) css.fontWeight = value as React.CSSProperties['fontWeight'];
      if (chosenSource.cssProperty === 'letterSpacing' && value) css.letterSpacing = value;
    } else if (chosenSource.kind === 'spacing' && chosenSource.cssProperty === 'padding' && value) {
      css.padding = value;
    } else if (chosenSource.kind === 'size') {
      if (chosenSource.cssProperty === 'width' && value) css.width = value;
      if (chosenSource.cssProperty === 'height' && value) css.height = value;
    } else if (chosenSource.kind === 'opacity' && value) {
      css.opacity = Number(value);
    } else if (chosenSource.kind === 'transform' && value && value !== 'none') {
      css.transform = value;
    }
    return css;
  }, [chosenSource]);
  const previewLabel = selectedTargetLayer?.text || selectedTargetLayer?.label || 'Elemento de destino';

  const close = () => { setOpen(false); setError(''); };
  const applyLayerMerge = () => {
    if (!source || !target || !sourceRoot || !targetRoot || !selectedSourceLayer || !selectedTargetLayer || !chosenSource || !targetProperty) {
      setError('Selecione uma camada de origem, uma propriedade e uma camada de destino compatível.'); return;
    }
    const dest = atPath(targetRoot, selectedTargetLayer.path);
    if (!dest) { setError('A camada de destino não está mais disponível. Atualize a árvore e tente novamente.'); return; }
    const styleMap: Record<string, string> = {
      border: 'border', borderColor: 'borderColor', borderWidth: 'borderWidth', borderStyle: 'borderStyle', borderRadius: 'borderRadius',
      outline: 'outline', backgroundColor: 'backgroundColor', color: 'color', boxShadow: 'boxShadow', textShadow: 'textShadow',
      fontSize: 'fontSize', fontWeight: 'fontWeight', letterSpacing: 'letterSpacing', padding: 'padding', width: 'width', height: 'height',
      opacity: 'opacity', transform: 'transform', fill: 'fill', stroke: 'stroke', strokeWidth: 'strokeWidth', animation: 'animation'
    };
    const sourceValue = chosenSource.value;
    const sourceEl = atPath(sourceRoot, selectedSourceLayer.path);
    const computed = sourceEl ? getComputedStyle(sourceEl) : null;
    const styles = (target.props.__layerStyles ?? {}) as StyleOverrides;
    const nextStyles: StyleOverrides = { ...styles };
    const layerStyle = { ...(styles[selectedTargetLayer.path] ?? {}) };
    const cssKey = styleMap[targetProperty] ?? targetProperty;
    let value = sourceValue;
    if (!value && computed) value = (computed as any)[chosenSource.cssProperty] || '';
    if (mergeCategory === 'border' || chosenSource.kind === 'border' || chosenSource.kind === 'outline') {
      if (targetProperty === 'borderColor' || targetProperty === 'border') layerStyle.borderColor = sourceValue || computed?.borderTopColor || '#00d4ff';
      layerStyle.borderStyle = layerStyle.borderStyle || (computed && computed.borderTopStyle !== 'none' ? computed.borderTopStyle : 'solid');
      layerStyle.borderWidth = layerStyle.borderWidth || (computed && computed.borderTopWidth !== '0px' ? computed.borderTopWidth : '2px');
      if (chosenSource.kind === 'animation') layerStyle.animation = sourceValue;
    } else if (chosenSource.kind === 'stroke' && !['svg','path','line'].includes(selectedTargetLayer.tag)) {
      const color = parseColorValue(sourceValue) || parseColorValue(computed?.color) || '#00d4ff';
      layerStyle.WebkitTextStroke = `${sourceValue || '1px'} ${color}`;
      layerStyle.stroke = color;
      layerStyle.strokeWidth = '1px';
    } else if (chosenSource.kind === 'background' || chosenSource.kind === 'fill') {
      layerStyle.backgroundColor = sourceValue || value || computed?.backgroundColor || '';
    } else if (chosenSource.kind === 'color') {
      layerStyle.color = sourceValue || value || computed?.color || '';
    } else if (chosenSource.kind === 'shadow') {
      layerStyle.boxShadow = sourceValue || computed?.boxShadow || '';
    } else {
      layerStyle[cssKey] = sourceValue || value || '';
    }
    nextStyles[selectedTargetLayer.path] = layerStyle;
    store.updateComponentProps(target.id, { __layerStyles: nextStyles });
    store.selectComponent(target.id);
    close();
  };


  if (!open) return null;
  return <aside className="fixed bottom-3 right-3 z-[100] flex max-h-[88dvh] w-[min(760px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-cyan-300/25 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl" role="region" aria-labelledby="semantic-merge-title">
    <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
      <div className="flex items-start gap-3"><span className="mt-0.5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200"><ArrowRightLeft size={18}/></span><div><h2 id="semantic-merge-title" className="font-semibold text-white">Merge semântico</h2><p className="mt-1 text-xs text-zinc-400">Escolha uma camada real e veja todos os destinos compatíveis, inclusive propriedades ainda não aplicadas.</p></div></div>
      <div className="flex gap-1"><button type="button" onClick={refreshLayers} title="Atualizar camadas" className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10"><RefreshCw size={16}/></button><button type="button" onClick={close} aria-label="Fechar Merge" className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"><X size={18}/></button></div>
    </header>
    <div className="grid grid-cols-2 gap-2 border-b border-white/10 px-4 py-3"><div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-2"><div className="text-[10px] uppercase tracking-wider text-cyan-300">Origem</div><div className="truncate text-sm font-medium text-white">{source?.name ?? 'Componente ausente'}</div><div className="mt-1 text-[10px] text-zinc-500">{sourceLayers.length} camadas detectadas</div></div><div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-2"><div className="text-[10px] uppercase tracking-wider text-violet-300">Destino</div><div className="truncate text-sm font-medium text-white">{target?.name ?? 'Componente ausente'}</div><div className="mt-1 text-[10px] text-zinc-500">{targetLayers.length} camadas detectadas</div></div></div>
    {(!source || !target || !sourceMeta || !targetMeta) ? <div className="p-4 text-sm text-amber-200"><AlertCircle size={16} className="mr-2 inline"/>Não foi possível carregar os componentes.</div> : <div className="min-h-0 space-y-3 overflow-y-auto p-3">
      <section className="space-y-2"><div className="flex items-center gap-2 text-xs font-semibold text-cyan-200"><Layers size={14}/> Camadas reais da origem</div><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {sourceLayers.map(layer => {
          const el = sourceRoot ? atPath(sourceRoot, layer.path) : null;
          const properties = el ? readSemanticTargets(el) : [];
          return <button type="button" key={layer.path || 'root'} onClick={() => { setSourcePath(layer.path); setSourceProperty(''); setTargetPath(''); setTargetProperty(''); }} className={`rounded-xl border p-3 text-left ${sourcePath === layer.path ? 'border-cyan-300/50 bg-cyan-300/10' : 'border-white/10 bg-white/[0.02]'}`}>
            <div className="flex items-center gap-2 text-xs font-semibold text-white">{layer.kind === 'texto' ? <Type size={13}/> : <Box size={13}/>}<span className="truncate">{layer.label}</span></div>
            <div className="mt-1 text-[9px] text-zinc-500">{layer.tag} · {properties.length} propriedades aplicáveis</div>
            {layer.text && <div className="mt-2 truncate text-[10px] text-zinc-400">{layer.text}</div>}
          </button>;
        })}
      </div>{!sourceLayers.length && <p className="rounded-lg border border-amber-300/20 p-3 text-xs text-amber-200">Não foi possível encontrar a árvore DOM renderizada da origem. Mantenha os dois componentes visíveis no Canvas e atualize as camadas.</p>}</section>

      {sourcePath !== '' || sourceLayers.some(l => l.path === '') ? <section className="space-y-2 rounded-xl border border-white/10 p-3"><div className="flex items-center justify-between"><div className="text-xs font-semibold text-white">Propriedades existentes na origem</div><span className="text-[10px] text-zinc-500">{selectedSourceProperties.length} selecionadas</span></div><p className="text-[10px] text-zinc-400">Só aparecem valores realmente presentes nesta camada. Expanda uma categoria para selecionar propriedades individuais ou marque a categoria inteira.</p>{PROPERTY_GROUPS.map(group => { const choices = availableSourceChoices.filter(choice => group.kinds.includes(choice.kind)); if (!choices.length) return null; const expanded = expandedGroups.includes(group.key); const allSelected = choices.every(choice => selectedSourceProperties.includes(choice.propertyKey)); return <div key={group.key} className="overflow-hidden rounded-lg border border-white/10"><div className="flex items-center gap-2 bg-white/[0.03] p-2"><button type="button" aria-expanded={expanded} onClick={() => setExpandedGroups(groups => expanded ? groups.filter(k => k !== group.key) : [...groups, group.key])} className="flex min-w-0 flex-1 items-center gap-2 text-left text-xs font-semibold text-white"><ChevronDown size={14} className={expanded ? '' : '-rotate-90'}/><span>{group.label}</span><span className="text-[10px] font-normal text-zinc-500">{choices.length}</span></button><button type="button" onClick={() => { const keys = choices.map(choice => choice.propertyKey); setSelectedSourceProperties(current => allSelected ? current.filter(key => !keys.includes(key)) : [...new Set([...current, ...keys])]); const first = allSelected ? undefined : choices[0]; if (first) { setSourceProperty(first.propertyKey); setMergeCategory(first.kind); } }} className="rounded-md border border-cyan-300/20 px-2 py-1 text-[10px] text-cyan-200">{allSelected ? 'Desmarcar' : 'Selecionar tudo'}</button></div>{expanded && <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2">{choices.map(choice => <button type="button" key={choice.propertyKey} aria-pressed={selectedSourceProperties.includes(choice.propertyKey)} onClick={() => { setSelectedSourceProperties(current => current.includes(choice.propertyKey) ? current.filter(key => key !== choice.propertyKey) : [...current, choice.propertyKey]); setSourceProperty(choice.propertyKey); setMergeCategory(choice.kind); setTargetPath(''); setTargetProperty(''); }} className={`rounded-lg border p-2 text-left ${selectedSourceProperties.includes(choice.propertyKey) ? 'border-cyan-300/50 bg-cyan-300/10' : 'border-white/10 bg-black/20'}`}><div className="flex items-center justify-between gap-2"><div className="text-xs font-medium text-white">{choice.label}</div><span className={`h-4 w-4 rounded border ${selectedSourceProperties.includes(choice.propertyKey) ? 'border-cyan-300 bg-cyan-300 text-zinc-950' : 'border-zinc-600'}`}>{selectedSourceProperties.includes(choice.propertyKey) ? '✓' : ''}</span></div><div className="mt-1">{preview(choice.value, choice.label)}</div></button>)}</div>}</div>;})}</section> : null}

      {chosenSource && <section className="space-y-2 rounded-xl border border-violet-300/20 bg-violet-300/[0.03] p-3"><div className="text-xs font-semibold text-violet-200">Destinos compatíveis · {chosenSource.label}</div><p className="text-[10px] text-zinc-400">Cada card é uma camada real do destino. A lista inclui propriedades CSS válidas mesmo quando ainda não existem estilos aplicados.</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{targetLayers.map(layer => {
        const options = compatibleDestinations.filter(c => c.layerPath === layer.path);
        const el = targetRoot ? atPath(targetRoot, layer.path) : null;
        const canCreate = chosenSource.kind === 'border' || chosenSource.kind === 'stroke' || chosenSource.kind === 'animation' || chosenSource.kind === 'background' || chosenSource.kind === 'color' || chosenSource.kind === 'shadow';
        const createKey = chosenSource.kind === 'border' ? 'borderColor' : chosenSource.kind === 'stroke' ? 'stroke' : chosenSource.kind === 'background' ? 'backgroundColor' : chosenSource.kind === 'color' ? 'color' : chosenSource.kind === 'shadow' ? 'boxShadow' : chosenSource.kind === 'animation' ? 'animation' : '';
        const createLabel = chosenSource.kind === 'border' ? 'Borda do elemento (criar)' : chosenSource.kind === 'stroke' ? 'Contorno do texto (criar)' : chosenSource.kind === 'background' ? 'Fundo do elemento (criar)' : chosenSource.kind === 'color' ? 'Cor do elemento (criar)' : chosenSource.kind === 'shadow' ? 'Sombra / brilho (criar)' : 'Animação (criar)';
        return <div key={layer.path || 'root'} className="rounded-xl border border-white/10 bg-black/20 p-3"><button type="button" onClick={() => setTargetPath(layer.path)} className="flex w-full items-center gap-2 text-left text-xs font-semibold text-white"><Box size={13}/><span className="truncate">{layer.label}</span><span className="ml-auto text-[9px] text-zinc-500">{layer.tag}</span></button><div className="mt-2 flex flex-wrap gap-1.5">{options.map(option => <button type="button" key={option.propertyKey} onClick={() => {setTargetPath(layer.path);setTargetProperty(option.propertyKey);}} className={`rounded-md border px-2 py-1 text-[10px] ${targetPath === layer.path && targetProperty === option.propertyKey ? 'border-violet-300/60 bg-violet-300/15 text-violet-100' : 'border-white/10 text-zinc-300'}`}>{option.label}{option.value ? ' · existente' : ' · criar'}</button>)}{canCreate && createKey && !options.some(o => o.propertyKey === createKey) && <button type="button" onClick={() => {setTargetPath(layer.path);setTargetProperty(createKey);}} className={`rounded-md border border-dashed px-2 py-1 text-[10px] ${targetPath === layer.path && targetProperty === createKey ? 'border-violet-300/60 text-violet-100' : 'border-violet-300/25 text-violet-200'}`}>{createLabel}</button>}{!options.length && !canCreate && <span className="text-[10px] text-zinc-600">Nenhuma propriedade compatível</span>}</div></div>;
      })}</div></section>}
      {chosenSource && selectedTargetLayer && targetProperty && <section aria-live="polite" className="space-y-2 rounded-xl border border-emerald-300/25 bg-emerald-300/[0.04] p-3">
        <div className="flex items-center justify-between gap-2"><div className="text-xs font-semibold text-emerald-200">Prévia antes do Merge</div><span className="text-[10px] text-zinc-500">Não altera o componente ainda</span></div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-2"><div className="mb-1 text-[9px] uppercase tracking-wide text-cyan-200">Origem · {chosenSource.label}</div><div className="truncate text-[10px] text-zinc-300">{formatValue(chosenSource.value || 'Valor calculado no elemento')}</div></div>
          <ArrowRightLeft size={16} className="text-emerald-300"/>
          <div className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-2"><div className="mb-1 text-[9px] uppercase tracking-wide text-violet-200">Destino · {selectedTargetLayer.tag}</div><div className="flex min-h-12 items-center justify-center rounded-lg bg-zinc-900/80 p-2 text-center text-xs text-zinc-100 transition-all" style={previewStyle}>{previewLabel}</div><div className="mt-1 truncate text-[9px] text-zinc-500">{selectedTargetLayer.label} · {targetProperty}</div></div>
        </div>
      </section>}
      {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
    </div>}
    <footer className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-3"><span className="text-[10px] text-zinc-500">{chosenSource && targetProperty ? '1 destino selecionado' : 'Selecione uma propriedade e destino'}</span><div className="flex gap-2"><button type="button" onClick={close} className="rounded-xl px-3 py-2 text-xs text-zinc-300 hover:bg-white/5">Cancelar</button><button type="button" disabled={!chosenSource || !selectedTargetLayer || !targetProperty} onClick={applyLayerMerge} className="flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-xs font-semibold text-zinc-950 disabled:opacity-40"><Check size={15}/>Aplicar Merge</button></div></footer>
  </aside>;
};
