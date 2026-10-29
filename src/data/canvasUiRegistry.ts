/**
 * Índice da registry oficial Canvas UI.
 * Os componentes são instalados diretamente da registry do autor; o Goduix não
 * redistribui nem porta o código-fonte, respeitando a licença MIT + Commons Clause.
 */
export interface CanvasUIRegistryItem {
  slug: string;
  name: string;
  description: string;
}

export const CANVAS_UI_REGISTRY: CanvasUIRegistryItem[] = [
  { slug: "ascii-object", name: "ASCII Object", description: "Exibe modelos 3D, SVG ou imagens como arte ASCII." },
  { slug: "ascii-sweep", name: "ASCII Sweep", description: "Revela conteúdo com uma varredura de caracteres ASCII." },
  { slug: "asciify", name: "Asciify", description: "Aplica um efeito ASCII que acompanha o cursor." },
  { slug: "bend", name: "Bend", description: "Dobra o conteúdo como uma superfície em 3D." },
  { slug: "grid", name: "Grid", description: "Malha de blocos 3D reativa ao cursor." },
  { slug: "blaze", name: "Blaze", description: "Fogo, partículas e distorção térmica." },
  { slug: "bubble", name: "Bubble", description: "Bolha refrativa que acompanha o ponteiro." },
  { slug: "canvas", name: "Canvas", description: "Textura de tela artística sobre o conteúdo." },
  { slug: "cloth", name: "Cloth", description: "Simula tecido aplicado à interface." },
  { slug: "clouds", name: "Clouds", description: "Nuvens volumétricas e movimento atmosférico." },
  { slug: "decrypt-reveal", name: "Decrypt Reveal", description: "Revela texto com animação de descriptografia." },
  { slug: "liquid", name: "Liquid", description: "Simulação fluida interativa." },
  { slug: "magnify", name: "Magnify", description: "Lente de scanner que amplia o conteúdo." },
  { slug: "dithered-object", name: "Dithered Object", description: "Renderiza objetos com dithering." },
  { slug: "displacement", name: "Displacement", description: "Distorção em grade reativa ao cursor." },
  { slug: "droplets", name: "Droplets", description: "Gotas refrativas sobre a interface." },
  { slug: "flame-wrap", name: "Flame Wrap", description: "Envolve elementos com chamas animadas." },
  { slug: "force-field", name: "Force Field", description: "Campo de força visual interativo." },
  { slug: "particle-object", name: "Particle Object", description: "Representa objetos com partículas." },
  { slug: "particle-reveal", name: "Particle Reveal", description: "Revela conteúdo por partículas." },
  { slug: "particle-scroll", name: "Particle Scroll", description: "Anima partículas conforme a rolagem." },
  { slug: "peel", name: "Peel", description: "Transição de dobra e descascamento." },
  { slug: "glitch", name: "Glitch", description: "Distorção digital e aberração cromática." },
  { slug: "glyph-rain", name: "Glyph Rain", description: "Chuva animada de glifos." },
  { slug: "frost", name: "Frost", description: "Efeito de vidro fosco e refração." },
  { slug: "hex-float", name: "Hex Float", description: "Elementos hexagonais flutuantes." },
  { slug: "ink-object", name: "Ink Object", description: "Renderização visual com aparência de tinta." },
  { slug: "retro-dither", name: "Retro Dither", description: "Efeito visual retro com dithering." },
  { slug: "ripple", name: "Ripple", description: "Ondas de refração acionadas por interação." },
  { slug: "shatter", name: "Shatter", description: "Fragmenta a interface em estilhaços." },
  { slug: "vhs", name: "VHS", description: "Textura e distorção de vídeo analógico." },
  { slug: "laser", name: "Laser", description: "Feixes de luz animados." },
  { slug: "glass", name: "Glass", description: "Lente de vidro com refração interativa." },
  { slug: "glass-object", name: "Glass Object", description: "Objeto 3D com aparência de vidro." },
  { slug: "liquid-object", name: "Liquid Object", description: "Objeto 3D com material líquido." },
];

export const getCanvasUIInstallCommand = (slug: string) =>
  `npx shadcn@latest add @canvas-ui/${slug}-react`;

export const getCanvasUIDocsUrl = (slug: string) =>
  `https://canvasui.dev/components/${slug}`;
