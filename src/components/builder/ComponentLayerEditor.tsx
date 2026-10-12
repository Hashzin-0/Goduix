import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layers, Type, Box, RotateCcw, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { BuilderComponentInstance } from '../../types/builder';
import { useBuilderStore } from '../../store/useBuilderStore';
import { cn } from '../../lib/utils';
import { classifyLayerElement, classifyProperty, humanizeLayer, isSemanticallyCompatible, parseColorValue, readSemanticTargets } from './semanticLayerAdapter';

type LayerNode = { path: string; tag: string; label: string; kind: 'text' | 'icon' | 'image' | 'container' | 'control'; depth: number; text: string; leaf: boolean; parentTag?: string; archetype?: string; effectLayer?: boolean; effectName?: string };
type LayerStyle = Record<string, string | undefined>;
const styleFields = [
  { key: 'backgroundColor', label: 'Fundo', type: 'color' }, { key: 'color', label: 'Cor do texto', type: 'color' },
  { key: 'borderColor', label: 'Cor da borda', type: 'color' }, { key: 'borderWidth', label: 'Espessura da borda' },
  { key: 'borderStyle', label: 'Estilo da borda' }, { key: 'borderRadius', label: 'Arredondamento' },
  { key: 'outline', label: 'Contorno externo' }, { key: 'boxShadow', label: 'Sombra / brilho' },
  { key: 'textShadow', label: 'Sombra do texto' }, { key: 'stroke', label: 'Traço / contorno do texto', type: 'color' },
  { key: 'strokeWidth', label: 'Espessura do contorno' }, { key: 'padding', label: 'Espaçamento interno' },
  { key: 'fontSize', label: 'Tamanho da fonte' }, { key: 'fontWeight', label: 'Peso da fonte' },
  { key: 'letterSpacing', label: 'Espaçamento das letras' }, { key: 'opacity', label: 'Opacidade' },
  { key: 'transform', label: 'Transformação' }, { key: 'animation', label: 'Animação CSS' },
  { key: 'width', label: 'Largura' }, { key: 'height', label: 'Altura' },
] as const;

function getLayerRoot(componentId: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-goduix-component-card][data-component-id="${CSS.escape(componentId)}"] [data-goduix-layer-root]`);
}
function scanLayers(root: HTMLElement): LayerNode[] {
  const output: LayerNode[] = [];
  const walk = (node: HTMLElement, path: string, depth: number, parentTag?: string) => {
    if (node.matches('[data-goduix-editor-chrome], script, style, svg defs, title')) return;
    const tag = node.tagName.toLowerCase();
    const text = Array.from(node.childNodes).filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent?.trim() ?? '').filter(Boolean).join(' ');
    const children = Array.from(node.children).filter(child => !child.matches('svg, path, defs, linearGradient, stop, title, desc'));
    const leaf = children.length === 0;
    const isIcon = tag === 'svg' || node.getAttribute('role') === 'img' || node.classList.contains('lucide');
    const isImage = ['img','canvas','video'].includes(tag);
    const isControl = ['button','input','textarea','select','a'].includes(tag);
    const kind: LayerNode['kind'] = isIcon ? 'icon' : isImage ? 'image' : isControl ? 'control' : text && leaf ? 'text' : 'container';
    const hint = text || node.getAttribute('aria-label') || node.getAttribute('title') || node.getAttribute('alt') || node.getAttribute('placeholder') || '';
    const semantic = classifyLayerElement(node, tag, hint, depth, parentTag);\n    output.push({ path, tag, label: semantic.label || humanizeLayer(tag, hint, depth, parentTag), kind, depth, text, leaf, parentTag, archetype: semantic.archetype, effectLayer: semantic.effectLayer, effectName: semantic.effectName });
    children.forEach((child,index) => walk(child as HTMLElement, path ? `${path}.${index}` : String(index), depth+1, tag));
  };
  walk(root, '', 0);
  return output.slice(0,240);
}
function elementAtPath(root: HTMLElement, path: string): HTMLElement | null {
  if (!path) return root;
  let node: Element = root;
  for (const part of path.split('.')) {
    const children = Array.from(node.children).filter(child => !child.matches('svg, path, defs, linearGradient, stop, title, desc'));
    const next = children[Number(part)];
    if (!next) return null;
    node = next;
  }
  return node as HTMLElement;
}
const kindIcon = (kind: LayerNode['kind']) => kind === 'text' ? <Type size={13}/> : kind === 'icon' ? <span className="text-[10px]">◇</span> : <Box size={13}/>;

export const ComponentLayerEditor: React.FC<{ component: BuilderComponentInstance }> = ({ component }) => {
  const store = useBuilderStore();
  const [layers, setLayers] = useState<LayerNode[]>([]);\n  const previewHostRef = useRef<HTMLDivElement>(null);
  const [selectedPath, setSelectedPath] = useState('');
  const [textValue, setTextValue] = useState('');
  const [scanVersion, setScanVersion] = useState(0);
  const [mergeTargetId, setMergeTargetId] = useState('');
  const [mergeTargetPath, setMergeTargetPath] = useState('');
  const [mergeKind, setMergeKind] = useState('border');
  const styles = (component.props.__layerStyles ?? {}) as Record<string, LayerStyle>;
  const texts = (component.props.__layerTexts ?? {}) as Record<string,string>;
  const selected = layers.find(layer => layer.path === selectedPath) ?? layers[0];
  const selectedStyle = selected ? styles[selected.path] ?? {} : {};
  const scan = useCallback(() => {
    const root = getLayerRoot(component.id);
    if (!root) { setLayers([]); return; }
    const next = scanLayers(root);
    setLayers(next);
    setSelectedPath(current => next.some(layer => layer.path === current) ? current : next[0]?.path ?? '');
    setScanVersion(v => v+1);
  }, [component.id]);
  useEffect(() => {
    const frame = window.requestAnimationFrame(scan);
    const root = getLayerRoot(component.id);
    if (!root) return () => window.cancelAnimationFrame(frame);
    const observer = new MutationObserver(() => scan());
    observer.observe(root,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','style']});
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  },[component.id,scan]);
  useEffect(() => { if (selected) setTextValue(texts[selected.path] ?? selected.text); },[selectedPath,scanVersion,component.id]);
  useEffect(() => {
    const host = previewHostRef.current;
    const root = getLayerRoot(component.id);
    const source = root && selected ? elementAtPath(root, selected.path) : null;
    if (!host) return;
    host.replaceChildren();
    if (!source) return;
    const clone = source.cloneNode(true) as HTMLElement;
    const originals = [source, ...Array.from(source.querySelectorAll<HTMLElement>('*'))];
    const copies = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>('*'))];
    copies.forEach((copy, index) => {
      const original = originals[index];
      if (!original) return;
      const computed = getComputedStyle(original);
      for (let i = 0; i < computed.length; i++) {
        const property = computed.item(i);
        if (property && !property.startsWith('--')) copy.style.setProperty(property, computed.getPropertyValue(property));
      }
      copy.removeAttribute('id');
      copy.style.animationPlayState = 'paused';
      copy.style.maxWidth = '100%';
      copy.style.boxSizing = 'border-box';
    });
    clone.style.pointerEvents = 'none';
    host.appendChild(clone);
    return () => { host.replaceChildren(); };
  }, [component.id, selectedPath, scanVersion]);
  const updateStyle = (key: string,value: string) => {
    if (!selected) return;
    store.updateComponentProps(component.id,{__layerStyles:{...styles,[selected.path]:{...(styles[selected.path] ?? {}),[key]:value || undefined}}});
  };
  const resetLayer = () => {
    if (!selected) return;
    const nextStyles = {...styles}; delete nextStyles[selected.path];
    const nextTexts = {...texts}; delete nextTexts[selected.path];
    store.updateComponentProps(component.id,{__layerStyles:nextStyles,__layerTexts:nextTexts});
    window.requestAnimationFrame(scan);
  };
  const otherComponents = store.components.filter(c => c.id !== component.id);
  const mergeTarget = otherComponents.find(c => c.id === mergeTargetId);
  const targetRoot = mergeTarget ? getLayerRoot(mergeTarget.id) : null;
  const targetLayers = useMemo(() => targetRoot ? scanLayers(targetRoot) : [],[targetRoot,mergeTargetId,scanVersion]);
  const sourceElement = selected ? getLayerRoot(component.id) && elementAtPath(getLayerRoot(component.id)!,selected.path) : null;
  const selectedSourceKind = classifyProperty(mergeKind);
  const compatibleTargets = targetLayers.filter(layer => {
    const root = targetRoot;
    const element = root && elementAtPath(root,layer.path);
    if (!element) return false;
    return readSemanticTargets(element).some(target => isSemanticallyCompatible(selectedSourceKind,target.kind));
  });
  const applyLayerMerge = () => {
    if (!selected || !mergeTarget || !targetRoot || !mergeTargetPath) return;
    const destination = elementAtPath(targetRoot,mergeTargetPath);
    if (!destination) return;
    const computed = sourceElement ? getComputedStyle(sourceElement) : null;
    const current = (mergeTarget.props.__layerStyles ?? {}) as Record<string,LayerStyle>;
    const next = {...current};
    const destStyle = {...(current[mergeTargetPath] ?? {})};
    if (computed) {
      const sourceNode = sourceElement;
      const effectTokens = sourceNode ? [sourceNode.className, sourceNode.id, sourceNode.getAttribute('data-testid')].filter(Boolean).join(' ').toLowerCase() : '';
      const isDedicatedEffect = Boolean(selected.effectLayer) || /beam|bevel|shimmer|neon|mirror|spotlight|hologram|glow|border.?flow/.test(effectTokens);
      if (isDedicatedEffect) {
        const before = sourceNode ? getComputedStyle(sourceNode, '::before') : null;
        const after = sourceNode ? getComputedStyle(sourceNode, '::after') : null;
        const pseudo = [before, after].find(style => style && style.content !== 'none' && style.content !== 'normal' && (style.backgroundImage !== 'none' || style.animationName !== 'none'));
        const gradient = pseudo?.backgroundImage && pseudo.backgroundImage !== 'none' ? pseudo.backgroundImage : computed.backgroundImage;
        const animation = pseudo?.animationName && pseudo.animationName !== 'none'
          ? `${pseudo.animationName} ${pseudo.animationDuration} ${pseudo.animationTimingFunction} ${pseudo.animationIterationCount}`
          : computed.animationName !== 'none' ? computed.animation : '';
        destStyle.position = destStyle.position || (getComputedStyle(destination).position === 'static' ? 'relative' : getComputedStyle(destination).position);
        if (gradient && gradient !== 'none') destStyle.backgroundImage = gradient;
        if (animation) destStyle.animation = animation;
        if (computed.boxShadow !== 'none') destStyle.boxShadow = computed.boxShadow;
        if (computed.filter !== 'none') destStyle.filter = computed.filter;
        if (computed.borderTopStyle !== 'none' && computed.borderTopWidth !== '0px') {
          destStyle.borderStyle = computed.borderTopStyle;
          destStyle.borderWidth = computed.borderTopWidth;
          destStyle.borderColor = computed.borderTopColor;
        }
        destStyle['--goduix-merged-effect'] = selected.effectName || 'visual-effect';
      } else if (mergeKind === 'border') {
        const color = computed.borderTopColor || '#00d4ff';
        destStyle.borderStyle = computed.borderTopStyle !== 'none' ? computed.borderTopStyle : 'solid';
        destStyle.borderWidth = computed.borderTopWidth !== '0px' ? computed.borderTopWidth : '2px';
        destStyle.borderColor = color;
        if (selectedStyle.animation) destStyle.animation = selectedStyle.animation;
        if (selectedStyle.boxShadow) destStyle.boxShadow = selectedStyle.boxShadow;
      } else if (mergeKind === 'stroke') {
        const color = parseColorValue(selectedStyle.stroke ?? computed.color) ?? '#00d4ff';
        destStyle.stroke = color;
        destStyle.strokeWidth = selectedStyle.strokeWidth ?? '1px';
        destStyle['WebkitTextStroke'] = `${destStyle.strokeWidth} ${color}`;
        if (selectedStyle.animation) destStyle.animation = selectedStyle.animation;
      } else if (mergeKind === 'background') {
        destStyle.backgroundColor = selectedStyle.backgroundColor || computed.backgroundColor;
      } else if (mergeKind === 'color') {
        destStyle.color = selectedStyle.color || computed.color;
      } else if (mergeKind === 'shadow') {
        destStyle.boxShadow = selectedStyle.boxShadow || computed.boxShadow;
      } else if (mergeKind === 'animation') {
        destStyle.animation = selectedStyle.animation || computed.animation;
      }
    }
    next[mergeTargetPath] = destStyle;
    store.updateComponentProps(mergeTarget.id,{__layerStyles:next});
  };

  return <section className="space-y-3 border-t border-white/10 pt-4">
    <div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-300"><Layers size={14}/> Camadas do componente</div><button type="button" onClick={scan} title="Rastrear novamente" className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"><RefreshCw size={13}/></button></div>
    <p className="text-[10px] leading-relaxed text-zinc-500">Elementos reais detectados no componente. Os nomes são traduzidos por função e os valores iniciais vêm dos estilos calculados pelo navegador.</p>
    <div className="max-h-52 space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-1.5">
      {layers.map(layer => <button type="button" key={layer.path || 'root'} onClick={() => setSelectedPath(layer.path)} className={cn('flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[10px]',selected?.path===layer.path?'bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-300/25':'text-zinc-400 hover:bg-white/5 hover:text-white')} style={{paddingLeft:`${8+layer.depth*9}px`}}><span className="shrink-0">{kindIcon(layer.kind)}</span><span className="truncate">{layer.label}</span><span className="ml-auto shrink-0 text-[9px] text-zinc-600">{layer.path || 'raiz'}</span></button>)}
      {!layers.length && <p className="p-2 text-[10px] text-zinc-500">Nenhuma camada detectada. Use “Rastrear novamente”.</p>}
    </div>
    {selected && <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center justify-between"><div className="min-w-0"><div className="text-xs font-semibold text-white">{selected.label}</div><div className="mt-0.5 text-[9px] uppercase tracking-wider text-zinc-500">{selected.kind} · camada isolada</div></div><button type="button" onClick={resetLayer} className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] text-zinc-400 hover:bg-white/10 hover:text-white"><RotateCcw size={11}/> Resetar</button></div>
      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="mb-2 flex items-center justify-between text-[10px] text-zinc-300"><span>Prévia da camada selecionada</span>{selected.effectLayer && <span className="text-fuchsia-200">{selected.effectName}</span>}</div><div className="flex min-h-16 items-center justify-center overflow-hidden rounded bg-zinc-950 p-3"><div ref={previewHostRef} className="max-w-full overflow-hidden" /></div><div className="mt-1 text-[9px] text-zinc-500">{selected.effectLayer ? 'Efeito visual independente' : 'Elemento real isolado'} · {selected.archetype || selected.tag}</div></div>
      {selected.kind === 'text' && selected.leaf && <label className="block text-[10px] text-zinc-400">Texto<div className="mt-1 flex gap-1"><input value={textValue} onChange={e=>setTextValue(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-white"/><button type="button" onClick={()=>store.updateComponentProps(component.id,{__layerTexts:{...texts,[selected.path]:textValue}})} className="rounded-lg bg-cyan-300 px-2 text-[10px] font-semibold text-zinc-950">Aplicar</button></div></label>}
      <div className="grid grid-cols-2 gap-2">{styleFields.map(field => {
        const root = getLayerRoot(component.id); const el = root && elementAtPath(root,selected.path);
        const computed = el ? getComputedStyle(el) : null;
        const computedValue = computed ? ((computed as any)[field.key] || '') : '';
        const initial = String(selectedStyle[field.key] ?? computedValue);
        const isColor = 'type' in field && field.type === 'color';
        const colorValue = parseColorValue(initial) ?? (field.key === 'backgroundColor' ? '#000000' : '#ffffff');
        return <label key={field.key} className="block text-[10px] text-zinc-400">{field.label}{isColor ? <input type="color" value={colorValue} onChange={e=>updateStyle(field.key,e.target.value)} className="mt-1 h-8 w-full cursor-pointer rounded-lg border border-white/10 bg-zinc-900 p-1"/> : <input value={initial} onChange={e=>updateStyle(field.key,e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-[10px] text-white"/>}</label>;
      })}</div>
    </div>}
    {selected && otherComponents.length > 0 && <div className="space-y-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.03] p-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200"><ArrowRightLeft size={14}/> Merge semântico entre camadas</div>
      <p className="text-[10px] leading-relaxed text-zinc-400">Escolha o destino e a categoria do efeito. O sistema filtra camadas compatíveis; propriedades ausentes, como bordas ou contornos, podem ser criadas no destino.</p>
      <label className="block text-[10px] text-zinc-400">Componente de destino<select value={mergeTargetId} onChange={e=>{setMergeTargetId(e.target.value);setMergeTargetPath('');}} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-xs text-white"><option value="">Selecionar componente</option>{otherComponents.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      <label className="block text-[10px] text-zinc-400">Propriedade / efeito de origem<select value={mergeKind} onChange={e=>setMergeKind(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-xs text-white"><option value="border">Borda / rastro neon</option><option value="stroke">Contorno do texto / traço SVG</option><option value="background">Fundo / preenchimento</option><option value="color">Cor do texto</option><option value="shadow">Sombra / brilho</option><option value="animation">Animação</option></select></label>
      <label className="block text-[10px] text-zinc-400">Camada compatível<select value={mergeTargetPath} onChange={e=>setMergeTargetPath(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-xs text-white"><option value="">Selecionar camada</option>{compatibleTargets.map(layer=><option key={layer.path} value={layer.path}>{layer.label}</option>)}</select></label>
      <button type="button" disabled={!mergeTargetPath || !mergeTargetId} onClick={applyLayerMerge} className="w-full rounded-lg bg-cyan-300 px-3 py-2 text-xs font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40">Aplicar Merge à camada</button>
      <p className="text-[9px] text-zinc-500">Categorias incompatíveis não são oferecidas. Cores são gravadas como valores CSS, nunca como texto do conteúdo.</p>
    </div>}
  </section>;
};
