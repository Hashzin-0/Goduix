export type SemanticPropertyKind = 'text' | 'color' | 'background' | 'border' | 'outline' | 'shadow' | 'typography' | 'spacing' | 'size' | 'transform' | 'opacity' | 'animation' | 'fill' | 'stroke' | 'media' | 'other';

export type SemanticTarget = {
  key: string;
  label: string;
  kind: SemanticPropertyKind;
  value: string;
  cssProperty: string;
  applicable: boolean;
};

const labels: Record<string, string> = {
  button: 'Botão', a: 'Link', input: 'Campo de entrada', textarea: 'Área de texto',
  select: 'Seletor', img: 'Imagem', video: 'Vídeo', canvas: 'Canvas', svg: 'Ícone SVG',
  h1: 'Título principal', h2: 'Título', h3: 'Subtítulo', p: 'Texto', label: 'Rótulo',
  span: 'Texto auxiliar', strong: 'Texto em destaque', em: 'Texto enfatizado',
  article: 'Card', section: 'Seção', main: 'Conteúdo principal', header: 'Cabeçalho',
  footer: 'Rodapé', nav: 'Navegação', ul: 'Lista', li: 'Item da lista', form: 'Formulário',
  div: 'Contêiner', figure: 'Figura', blockquote: 'Citação'
};

export function humanizeLayer(tag: string, text: string, depth: number, parentTag?: string): string {
  const clean = text.trim().replace(/\\s+/g, ' ').slice(0, 34);
  if (tag === 'div' && depth === 0) return 'Contêiner principal';
  if (tag === 'div' && parentTag === 'button') return 'Estrutura do botão';
  if ((tag === 'span' || tag === 'p') && parentTag === 'button') return 'Texto do botão';
  if ((tag === 'span' || tag === 'p') && parentTag === 'a') return 'Texto do link';
  if (tag === 'span' && clean) return `Texto: ${clean}`;
  if (tag === 'div' && clean) return `Contêiner: ${clean}`;
  const base = labels[tag] ?? 'Elemento';
  return clean && ['p', 'h1', 'h2', 'h3', 'label', 'button', 'a'].includes(tag) ? `${base}: ${clean}` : base;
}

const cssMap: Array<[string, string, SemanticPropertyKind, string]> = [
  ['backgroundColor', 'Cor de fundo', 'background', 'backgroundColor'],
  ['color', 'Cor do texto', 'color', 'color'],
  ['borderColor', 'Cor da borda', 'border', 'borderColor'],
  ['borderWidth', 'Espessura da borda', 'border', 'borderWidth'],
  ['borderStyle', 'Estilo da borda', 'border', 'borderStyle'],
  ['borderRadius', 'Arredondamento', 'border', 'borderRadius'],
  ['outline', 'Contorno externo', 'outline', 'outline'],
  ['boxShadow', 'Sombra', 'shadow', 'boxShadow'],
  ['textShadow', 'Sombra do texto', 'shadow', 'textShadow'],
  ['fontSize', 'Tamanho da fonte', 'typography', 'fontSize'],
  ['fontWeight', 'Peso da fonte', 'typography', 'fontWeight'],
  ['letterSpacing', 'Espaçamento das letras', 'typography', 'letterSpacing'],
  ['padding', 'Espaçamento interno', 'spacing', 'padding'],
  ['width', 'Largura', 'size', 'width'],
  ['height', 'Altura', 'size', 'height'],
  ['opacity', 'Opacidade', 'opacity', 'opacity'],
  ['transform', 'Transformação', 'transform', 'transform'],
  ['fill', 'Preenchimento SVG', 'fill', 'fill'],
  ['stroke', 'Traço / contorno SVG', 'stroke', 'stroke'],
  ['strokeWidth', 'Espessura do traço SVG', 'stroke', 'strokeWidth'],
  ['animation', 'Animação', 'animation', 'animation'],
];

export function readSemanticTargets(element: HTMLElement): SemanticTarget[] {
  const style = getComputedStyle(element);
  const tag = element.tagName.toLowerCase();
  const textLike = ['span','p','label','button','a','h1','h2','h3','strong','em','input','textarea'].includes(tag);
  const svgLike = tag === 'svg' || element instanceof SVGElement;
  const targets: SemanticTarget[] = cssMap.map(([key,label,kind,cssProperty]) => {
    let value = '';
    if (key === 'stroke' || key === 'strokeWidth' || key === 'fill') {
      if (svgLike) value = key === 'stroke' ? (element as SVGElement).getAttribute('stroke') || '' : key === 'strokeWidth' ? (element as SVGElement).getAttribute('stroke-width') || '' : (element as SVGElement).getAttribute('fill') || '';
      else if (key === 'stroke') value = (style as any).webkitTextStrokeColor !== 'rgba(0, 0, 0, 0)' ? (style as any).webkitTextStrokeColor : '';
      else if (key === 'strokeWidth') value = (style as any).webkitTextStrokeWidth || '';
    } else value = (style as any)[cssProperty] || '';
    const applicable = kind === 'background' ? !['svg','path','line','polyline'].includes(tag)
      : kind === 'color' ? textLike
      : kind === 'border' ? !['svg','path','line','polyline','stop'].includes(tag)
      : kind === 'outline' ? !['svg','path','line','polyline','stop'].includes(tag)
      : kind === 'typography' ? textLike
      : kind === 'fill' || kind === 'stroke' ? svgLike || textLike
      : kind === 'animation' ? true
      : kind === 'shadow' ? !['svg','path','line','polyline','stop'].includes(tag)
      : true;
    return { key, label, kind, value, cssProperty, applicable };
  });
  return targets.filter(target => target.applicable);
}

export function classifyProperty(key: string, label = ''): SemanticPropertyKind {
  const token = `${key} ${label}`.toLowerCase();
  if (/text|label|content|string/.test(token)) return 'text';
  if (/background|bgcolor|fundo/.test(token)) return 'background';
  if (/border|borda/.test(token)) return 'border';
  if (/stroke|contorno/.test(token)) return 'stroke';
  if (/fill|preenchimento/.test(token)) return 'fill';
  if (/color|cor/.test(token)) return 'color';
  if (/shadow|sombra|glow|neon/.test(token)) return 'shadow';
  if (/font|typography|letra/.test(token)) return 'typography';
  if (/padding|margin|spacing|espaçamento/.test(token)) return 'spacing';
  if (/width|height|size|largura|altura/.test(token)) return 'size';
  if (/animation|anim|motion|rastro/.test(token)) return 'animation';
  if (/opacity|opacidade/.test(token)) return 'opacity';
  if (/transform|rotation|scale/.test(token)) return 'transform';
  return 'other';
}

export function isSemanticallyCompatible(source: SemanticPropertyKind, target: SemanticPropertyKind): boolean {
  if (source === target) return true;
  if (source === 'border') return target === 'stroke' || target === 'outline';
  if (source === 'stroke') return target === 'border' || target === 'outline';
  if (source === 'background') return target === 'fill';
  if (source === 'fill') return target === 'background';
  if (source === 'animation') return ['border','stroke','outline','shadow','color','background','fill'].includes(target);
  if (source === 'shadow') return target === 'border' || target === 'stroke';
  return false;
}

export function parseColorValue(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  if (/^#(?:[\\da-f]{3}|[\\da-f]{4}|[\\da-f]{6}|[\\da-f]{8})$/i.test(v)) return v;
  const rgb = v.match(/^rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/i);
  if (rgb) return '#' + rgb.slice(1,4).map(n => Number(n).toString(16).padStart(2,'0')).join('');
  return null;
}
