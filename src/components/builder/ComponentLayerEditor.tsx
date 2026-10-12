import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Layers, Type, Box, RotateCcw, RefreshCw } from 'lucide-react';
import { BuilderComponentInstance } from '../../types/builder';
import { useBuilderStore } from '../../store/useBuilderStore';
import { cn } from '../../lib/utils';

type LayerNode = { path: string; tag: string; label: string; kind: 'text' | 'icon' | 'image' | 'container' | 'control'; depth: number; text: string; leaf: boolean };
const editableIcons = ['Trash2', 'Search', 'Settings', 'Plus', 'Heart', 'Star', 'Menu', 'Check', 'X', 'ArrowRight', 'Home', 'User', 'Bell', 'Calendar', 'Mail', 'Download', 'Upload', 'Pencil', 'Copy', 'Info', 'AlertCircle', 'Sparkles'];
type LayerStyle = { backgroundColor?: string; color?: string; borderColor?: string; borderWidth?: string; borderRadius?: string; borderStyle?: string; padding?: string; fontSize?: string; fontWeight?: string; letterSpacing?: string; opacity?: string; transform?: string; boxShadow?: string; textShadow?: string; outline?: string; stroke?: string; strokeWidth?: string; animation?: string };

const styleFields: { key: keyof LayerStyle; label: string; type: 'color' | 'text'; placeholder?: string }[] = [
  { key: 'backgroundColor', label: 'Fundo', type: 'color' },
  { key: 'color', label: 'Cor / contorno', type: 'color' },
  { key: 'borderColor', label: 'Cor da borda', type: 'color' },
  { key: 'borderWidth', label: 'Espessura da borda', type: 'text', placeholder: '1px' },
  { key: 'borderStyle', label: 'Estilo da borda', type: 'text', placeholder: 'solid / dashed' },
  { key: 'borderRadius', label: 'Raio / formato', type: 'text', placeholder: '12px' },
  { key: 'padding', label: 'Espaçamento interno', type: 'text', placeholder: '8px 12px' },
  { key: 'fontSize', label: 'Tamanho da fonte', type: 'text', placeholder: '16px' },
  { key: 'fontWeight', label: 'Peso da fonte', type: 'text', placeholder: '600' },
  { key: 'letterSpacing', label: 'Espaçamento de letras', type: 'text', placeholder: '0.02em' },
  { key: 'opacity', label: 'Opacidade (0–1)', type: 'text', placeholder: '1' },
  { key: 'transform', label: 'Transformação', type: 'text', placeholder: 'rotate(0deg) scale(1)' },
  { key: 'boxShadow', label: 'Sombra', type: 'text', placeholder: '0 4px 18px #0004' },
  { key: 'textShadow', label: 'Sombra do texto', type: 'text', placeholder: '0 1px 3px #0008' },
  { key: 'outline', label: 'Contorno', type: 'text', placeholder: '1px solid #fff' },
  { key: 'stroke', label: 'Traço SVG', type: 'color' },
  { key: 'strokeWidth', label: 'Espessura do traço', type: 'text', placeholder: '2' },
  { key: 'animation', label: 'Animação CSS', type: 'text', placeholder: 'goduix-layer-float 3s ease-in-out infinite' },
];

function getLayerRoot(componentId: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-goduix-component-card][data-component-id="${CSS.escape(componentId)}"] [data-goduix-layer-root]`);
}
function scanLayers(root: HTMLElement): LayerNode[] {
  const output: LayerNode[] = [];
  const walk = (node: HTMLElement, path: string, depth: number) => {
    if (node.matches('[data-goduix-editor-chrome], script, style, svg defs, title')) return;
    const tag = node.tagName.toLowerCase();
    const text = Array.from(node.childNodes).filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent?.trim() ?? '').filter(Boolean).join(' ');
    const leaf = !Array.from(node.children).some(child => !child.matches('svg, path, defs, linearGradient, stop, title, desc'));
    const isIcon = tag === 'svg' || node.getAttribute('role') === 'img' || node.classList.contains('lucide');
    const isImage = tag === 'img' || tag === 'canvas' || tag === 'video';
    const isControl = ['button', 'input', 'textarea', 'select', 'a'].includes(tag);
    const kind: LayerNode['kind'] = isIcon ? 'icon' : isImage ? 'image' : isControl ? 'control' : text && leaf ? 'text' : 'container';
    const hint = text || node.getAttribute('aria-label') || node.getAttribute('title') || node.getAttribute('alt') || node.getAttribute('placeholder') || '';
    output.push({ path, tag, label: `${tag}${hint ? ` · ${hint.slice(0, 42)}` : ''}`, kind, depth, text, leaf });
    Array.from(node.children).forEach((child, index) => walk(child as HTMLElement, path ? `${path}.${index}` : String(index), depth + 1));
  };
  walk(root, '', 0);
  return output.slice(0, 240);
}

export const ComponentLayerEditor: React.FC<{ component: BuilderComponentInstance }> = ({ component }) => {
  const store = useBuilderStore();
  const [layers, setLayers] = useState<LayerNode[]>([]);
  const [selectedPath, setSelectedPath] = useState('');
  const [textValue, setTextValue] = useState('');
  const [scanVersion, setScanVersion] = useState(0);
  const styles = (component.props.__layerStyles ?? {}) as Record<string, LayerStyle>;
  const texts = (component.props.__layerTexts ?? {}) as Record<string, string>;
  const icons = (component.props.__layerIcons ?? {}) as Record<string, string>;
  const selected = layers.find(layer => layer.path === selectedPath) ?? layers[0];
  const selectedStyle = selected ? styles[selected.path] ?? {} : {};

  const scan = useCallback(() => {
    const root = getLayerRoot(component.id);
    if (!root) return;
    const next = scanLayers(root);
    setLayers(next);
    setSelectedPath(current => next.some(layer => layer.path === current) ? current : next[0]?.path ?? '');
    setScanVersion(value => value + 1);
  }, [component.id]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(scan);
    const root = getLayerRoot(component.id);
    if (!root) return () => window.cancelAnimationFrame(frame);
    const observer = new MutationObserver(() => scan());
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, [component.id, scan]);

  useEffect(() => { if (selected) setTextValue(texts[selected.path] ?? selected.text); }, [selectedPath, scanVersion, component.id]);

  const updateStyle = (key: keyof LayerStyle, value: string) => {
    if (!selected) return;
    const nextStyles = { ...styles, [selected.path]: { ...(styles[selected.path] ?? {}), [key]: value || undefined } };
    store.updateComponentProps(component.id, { __layerStyles: nextStyles });
  };
  const saveText = () => {
    if (!selected || !selected.leaf || selected.kind !== 'text') return;
    store.updateComponentProps(component.id, { __layerTexts: { ...texts, [selected.path]: textValue } });
  };
  const resetLayer = () => {
    if (!selected) return;
    const nextStyles = { ...styles }; delete nextStyles[selected.path];
    const nextTexts = { ...texts }; delete nextTexts[selected.path];
    const nextIcons = { ...icons }; delete nextIcons[selected.path];
    store.updateComponentProps(component.id, { __layerStyles: nextStyles, __layerTexts: nextTexts, __layerIcons: nextIcons });
    window.requestAnimationFrame(scan);
  };
  const kindIcon = (kind: LayerNode['kind']) => kind === 'text' ? <Type size={13}/> : kind === 'icon' ? <span className="text-[10px]">◇</span> : <Box size={13}/>;

  return <section className="space-y-3 border-t border-white/10 pt-4">
    <div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-300"><Layers size={14}/> Camadas reais do componente</div><button type="button" onClick={scan} title="Rastrear novamente" className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"><RefreshCw size={13}/></button></div>
    <p className="text-[10px] leading-relaxed text-zinc-500">Varredura da árvore renderizada, não uma lista fixa do criador. Selecione uma camada para editar estilos independentes.</p>
    <div className="max-h-52 space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-1.5">
      {layers.map(layer => <button type="button" key={layer.path || 'root'} onClick={() => setSelectedPath(layer.path)} className={cn('flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[10px]', selected?.path === layer.path ? 'bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-300/25' : 'text-zinc-400 hover:bg-white/5 hover:text-white')} style={{ paddingLeft: `${8 + layer.depth * 9}px` }}><span className="shrink-0">{kindIcon(layer.kind)}</span><span className="truncate">{layer.label}</span><span className="ml-auto shrink-0 text-[9px] text-zinc-600">{layer.path || 'raiz'}</span></button>)}
      {!layers.length && <p className="p-2 text-[10px] text-zinc-500">Nenhuma camada detectada. Use “Rastrear novamente”.</p>}
    </div>
    {selected && <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center justify-between"><div className="min-w-0"><div className="text-xs font-semibold text-white">{selected.label}</div><div className="mt-0.5 text-[9px] uppercase tracking-wider text-zinc-500">{selected.kind} · camada isolada</div></div><button type="button" onClick={resetLayer} className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] text-zinc-400 hover:bg-white/10 hover:text-white"><RotateCcw size={11}/> Resetar</button></div>
      {selected.kind === 'icon' && <label className="block text-[10px] text-zinc-400">Ícone · biblioteca Lucide do projeto<select value={icons[selected.path] ?? ''} onChange={event => store.updateComponentProps(component.id, { __layerIcons: { ...icons, [selected.path]: event.target.value || undefined } })} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-xs text-white"><option value="">Manter ícone original</option>{editableIcons.map(name => <option key={name} value={name}>{name}</option>)}</select></label>}
      {selected.kind === 'text' && selected.leaf && <label className="block text-[10px] text-zinc-400">Texto<div className="mt-1 flex gap-1"><input value={textValue} onChange={event => setTextValue(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-white"/><button type="button" onClick={saveText} className="rounded-lg bg-cyan-300 px-2 text-[10px] font-semibold text-zinc-950">Aplicar</button></div></label>}
      <div className="grid grid-cols-2 gap-2">{styleFields.map(field => <label key={field.key} className="block text-[10px] text-zinc-400">{field.label}{field.type === 'color' ? <input type="color" value={String(selectedStyle[field.key] ?? (field.key === 'backgroundColor' ? '#000000' : '#ffffff'))} onChange={event => updateStyle(field.key, event.target.value)} className="mt-1 h-8 w-full cursor-pointer rounded-lg border border-white/10 bg-zinc-900 p-1"/> : <input value={String(selectedStyle[field.key] ?? '')} placeholder={field.placeholder} onChange={event => updateStyle(field.key, event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-[10px] text-white"/>}</label>)}</div>
      <div className="rounded-lg bg-black/20 p-2 text-[9px] leading-relaxed text-zinc-500">Ícones SVG podem ser trocados pela biblioteca Lucide. Mídia e malhas 3D são identificadas como camadas, mas seus parâmetros internos exigem controles específicos do respectivo renderer.</div>
    </div>}
  </section>;
};
