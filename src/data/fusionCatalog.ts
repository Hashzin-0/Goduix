import { FusionEffectType, FusionTargetSlot, FusionTriggerType, GodUIComponentType } from '../types/builder';

export interface FusionDonorMeta {
  effectType: FusionEffectType;
  name: string;
  sourceComponentName: string;
  sourceComponentType: GodUIComponentType;
  tagline: string;
  description: string;
  badge: string;
  icon: string;
  color: string;
  availableFeatures: {
    id: string;
    label: string;
    description: string;
  }[];
  compatibleSlots: {
    slot: FusionTargetSlot;
    label: string;
    description: string;
    recommendedFor?: GodUIComponentType[];
  }[];
}

export const FUSION_TRIGGERS: { id: FusionTriggerType; label: string; description: string; icon: string }[] = [
  { id: 'always', label: 'Contínuo / Sempre Ativo', description: 'O efeito permanece visível o tempo todo', icon: 'Flame' },
  { id: 'hover', label: 'Ao Passar o Mouse (Hover)', description: 'Ativa instantaneamente quando o cursor entra na área', icon: 'MousePointer' },
  { id: 'click', label: 'Ao Clicar (Click)', description: 'Dispara um pulso cinético ao pressionar', icon: 'Pointer' },
  { id: 'active', label: 'Quando Ativo / Selecionado', description: 'Aplica-se ao elemento atualmente clicado/selecionado', icon: 'CheckCircle2' },
  { id: 'entrance', label: 'Animação de Entrada', description: 'Surge com transição suave quando o componente aparece', icon: 'LogIn' },
  { id: 'exit', label: 'Animação de Saída', description: 'Desvanece quando o elemento é desativado', icon: 'LogOut' },
  { id: 'open', label: 'Ao Abrir / Expandir', description: 'Dispara quando o menu ou gaveta se abre', icon: 'Maximize2' },
  { id: 'close', label: 'Ao Fechar / Recolher', description: 'Efeito ao recolher o componente', icon: 'Minimize2' },
  { id: 'longpress', label: 'Pressionamento Longo (Hold)', description: 'Ativa ao manter o botão pressionado', icon: 'Timer' },
];

export const FUSION_SLOT_DEFINITIONS: { slot: FusionTargetSlot; label: string; description: string; tag: string }[] = [
  { slot: 'border', label: 'Borda / Stroke Exterior', description: 'Contorno perimetral, borda de vidro chanfrado ou neon pulsante', tag: 'Stroke' },
  { slot: 'background', label: 'Fundo / Container Principal', description: 'Superfície de fundo, backdrop blur ou gradiente', tag: 'Fundo' },
  { slot: 'icon', label: 'Ícone / Glifos', description: 'Símbolos gráficos, glifos vetoriais e indicadores visuais', tag: 'Ícones' },
  { slot: 'active-item', label: 'Item / Card Ativado (Clicado)', description: 'Elemento ativo atual (ex: ferramenta selecionada na Toolbar)', tag: 'Ativo' },
  { slot: 'interactive-items', label: 'Todos os Botões Interativos', description: 'Todos os botões, chips e itens clicáveis do componente', tag: 'Ações' },
  { slot: 'title', label: 'Título Principal', description: 'Tipografia principal e cabeçalho do componente', tag: 'Texto' },
  { slot: 'subtitle', label: 'Subtítulo / Descrição', description: 'Texto secundário, legendas e rótulos informativos', tag: 'Legenda' },
  { slot: 'badge', label: 'Badge / Chip de Status', description: 'Pílula de destaque, tags ou chips de contagem', tag: 'Badge' },
  { slot: 'before-glow', label: 'Camada ::before (Glow Aura)', description: 'Aura atmosférica difusa projetada atrás do elemento', tag: '::before' },
  { slot: 'after-shine', label: 'Camada ::after (Shimmer Beam)', description: 'Feixe de luz especular ou reflexo holográfico perimétrico', tag: '::after' },
  { slot: 'content', label: 'Conteúdo Central', description: 'Área interior e corpo de dados do componente', tag: 'Corpo' },
];

export const FUSION_DONORS: Record<FusionEffectType, FusionDonorMeta> = {
  'liquid-glass': {
    effectType: 'liquid-glass',
    name: 'Liquid Glass (Vidro Líquido)',
    sourceComponentName: 'Liquid Glass Button',
    sourceComponentType: 'liquid-glass-button',
    tagline: 'Refração vítrea com reflexo especular dinâmico',
    description: 'Aplica a ótica premium do Liquid Glass: desfoque de fundo profundo, reflexo que segue o cursor, borda chanfrada cristalina e brilho especular.',
    badge: 'Mais Popular',
    icon: 'Droplets',
    color: '#38bdf8',
    availableFeatures: [
      { id: 'specular-gradient', label: 'Reflexo Especular Dinâmico', description: 'Círculo de brilho líquido que segue as coordenadas do ponteiro' },
      { id: 'crystal-border', label: 'Borda de Vidro 3D', description: 'Chanfro vítreo com iluminação interna e highlight superior' },
      { id: 'backdrop-refract', label: 'Desfoque Profundo (Backdrop Blur)', description: 'Refração e saturação dos elementos sob a superfície' },
      { id: 'rainbow-shimmer', label: 'Shimmer Iridescente', description: 'Linha de luz reflexiva em movimento suave' },
    ],
    compatibleSlots: [
      { 
        slot: 'active-item', 
        label: 'Item / Card Ativado (Clicado)', 
        description: 'Aplica o efeito Liquid Glass no item/botão que estiver ativo/selecionado (ex: botão clicado da Toolbar ou Dock)',
        recommendedFor: ['floating-toolbar', 'godui-dock', 'dynamic-island', 'bento-grid']
      },
      { 
        slot: 'main-container', 
        label: 'Container / Fundo Principal', 
        description: 'Transforma o corpo/container inteiro do componente em vidro líquido translúcido',
        recommendedFor: ['floating-toolbar', 'godui-dock', 'dynamic-island', 'spotlight-card', 'tilt-3d-card', 'glass-footer']
      },
      { 
        slot: 'interactive-items', 
        label: 'Todos os Itens Interativos', 
        description: 'Aplica o acabamento vítreo em todos os botões ou ícones do componente'
      },
      { 
        slot: 'badge', 
        label: 'Badge / Tag de Status', 
        description: 'Transforma a etiqueta do componente em uma cápsula de vidro líquido'
      },
      { 
        slot: 'hover-state', 
        label: 'Ao Passar o Mouse (Hover)', 
        description: 'O efeito de vidro líquido e reflexo se acentua ao passar o cursor'
      },
    ],
  },

  'gooey-liquid': {
    effectType: 'gooey-liquid',
    name: 'Gooey Liquid (Filtro Metaball SVG)',
    sourceComponentName: 'Gooey Liquid FAB',
    sourceComponentType: 'gooey-fab',
    tagline: 'Fusão orgânica viscosa de elementos em transição',
    description: 'Utiliza filtros SVG feColorMatrix e feGaussianBlur para criar conexões elásticas viscosas como gotas de líquido conectando elementos que se movem.',
    badge: 'Efeito Viral',
    icon: 'FlaskConical',
    color: '#a855f7',
    availableFeatures: [
      { id: 'svg-metaball', label: 'Fusão Líquida SVG (Metaballs)', description: 'Conecta elementos adjacentes com tensão superficial líquida' },
      { id: 'bouncy-drop', label: 'Gotas Bouncy na Troca', description: 'Desprendimento e absorção de gotas elásticas ao mudar de aba/item' },
    ],
    compatibleSlots: [
      { 
        slot: 'active-item', 
        label: 'Item / Indicador Ativado', 
        description: 'O indicador ativo estica e conecta liquidamente ao deslizar de uma ferramenta para outra',
        recommendedFor: ['floating-toolbar', 'godui-dock', 'dynamic-island']
      },
      { 
        slot: 'interactive-items', 
        label: 'Botões ao Clicar / Pressionar', 
        description: 'Gera ondulação gelatinosa e expansão fluida nos cliques'
      },
      { 
        slot: 'main-container', 
        label: 'Bordas do Container', 
        description: 'Aplica tensão orgânica líquida ao redor do componente'
      },
    ],
  },

  'magnetic-pull': {
    effectType: 'magnetic-pull',
    name: 'Magnetic Pull (Atração Magnética)',
    sourceComponentName: 'Magnetic Button',
    sourceComponentType: 'magnetic-button',
    tagline: 'Física elástica de atração gravitacional ao cursor',
    description: 'Calcula o vetor de distância entre o ponteiro e o elemento, puxando-o suavemente com física de mola proporcional à proximidade.',
    badge: 'Micro-interação',
    icon: 'Magnet',
    color: '#10b981',
    availableFeatures: [
      { id: 'spring-pull', label: 'Atração Elástica de Cursor', description: 'Elemento é puxado magneticamente na direção do mouse' },
      { id: 'magnetic-release', label: 'Retorno com Mola Bouncy', description: 'Retorno amortecido de alta fidelidade ao soltar o foco' },
    ],
    compatibleSlots: [
      { 
        slot: 'interactive-items', 
        label: 'Botões e Ícones de Ferramentas', 
        description: 'Cada botão ou ferramenta é atraído magneticamente ao aproximar o cursor',
        recommendedFor: ['floating-toolbar', 'godui-dock', 'dynamic-island']
      },
      { 
        slot: 'active-item', 
        label: 'Item Ativo Clicado', 
        description: 'O item selecionado mantém atração dinâmica de cursor'
      },
      { 
        slot: 'main-container', 
        label: 'Container Inteiro', 
        description: 'O componente inteiro flutua suavemente em direção ao mouse'
      },
    ],
  },

  'shimmer-beam': {
    effectType: 'shimmer-beam',
    name: 'Magic Shimmer (Feixe Cônico Laser)',
    sourceComponentName: 'Magic Shimmer Button',
    sourceComponentType: 'shimmer-button',
    tagline: 'Feixe de luz rotativo cônico contínuo',
    description: 'Projeta um feixe de luz cônico a laser que percorre o contorno do elemento em 360°, criando sensação de energia contínua.',
    badge: 'Destaque Visual',
    icon: 'Sparkles',
    color: '#f59e0b',
    availableFeatures: [
      { id: 'conic-rotation', label: 'Rotação Cônica Infinita', description: 'Gradiente cônico girando a 360 graus na borda' },
      { id: 'laser-glow', label: 'Halo de Reflexo Laser', description: 'Glow difuso projetado para fora da borda' },
    ],
    compatibleSlots: [
      { 
        slot: 'active-item', 
        label: 'Item / Card Ativado (Clicado)', 
        description: 'O card ou botão ativado ganha a borda a laser giratória',
        recommendedFor: ['floating-toolbar', 'dynamic-island', 'bento-grid']
      },
      { 
        slot: 'main-container', 
        label: 'Contorno do Container', 
        description: 'A borda inteira da barra/card é circulada pelo feixe cônico'
      },
      { 
        slot: 'badge', 
        label: 'Badge de Status', 
        description: 'A tag ganha rotação luminosa de destaque'
      },
    ],
  },

  'hologram-3d-tilt': {
    effectType: 'hologram-3d-tilt',
    name: '3D Holographic Tilt (Giro Holográfico)',
    sourceComponentName: 'Tilt 3D Card',
    sourceComponentType: 'tilt-3d-card',
    tagline: 'Inclinação 3D com brilho especular e glare',
    description: 'Transforma superfícies em placas com profundidade 3D (perspective, rotateX, rotateY) acompanhadas de reflexo holográfico furta-cor.',
    badge: 'Profundidade 3D',
    icon: 'Layers',
    color: '#06b6d4',
    availableFeatures: [
      { id: '3d-rotation', label: 'Física de Inclinação Angular', description: 'Calcula pitch e yaw baseados no mouse com amortecimento' },
      { id: 'hologram-glare', label: 'Glare Furta-cor Holográfico', description: 'Camada de reflexo iridescente que varia com o ângulo' },
    ],
    compatibleSlots: [
      { 
        slot: 'main-container', 
        label: 'Container Principal', 
        description: 'A barra ou card inclina no espaço 3D ao passar o cursor',
        recommendedFor: ['spotlight-card', 'bento-grid', 'floating-toolbar', 'dynamic-island']
      },
      { 
        slot: 'active-item', 
        label: 'Item / Card Ativado', 
        description: 'O card ativado ganha profundidade elevada e inclinação dinâmica'
      },
      { 
        slot: 'hover-state', 
        label: 'Cards ao passar o mouse', 
        description: 'Cada elemento inclina individualmente ao receber foco'
      },
    ],
  },

  'spotlight-beam': {
    effectType: 'spotlight-beam',
    name: 'Spotlight Beam (Holofote Radial)',
    sourceComponentName: 'Spotlight Card',
    sourceComponentType: 'spotlight-card',
    tagline: 'Iluminação radial que segue a posição do ponteiro',
    description: 'Gera uma lanterna de luz pontual que revela microdetalhes de textura e ilumina bordas metálicas apenas na área sob o ponteiro.',
    badge: 'Interativo',
    icon: 'SunMedium',
    color: '#ec4899',
    availableFeatures: [
      { id: 'radial-flashlight', label: 'Lanterna Radial com Fade Suave', description: 'Gradiente radial dinâmico nas coordenadas x/y relativas' },
      { id: 'border-revelation', label: 'Revelação Seletiva de Bordas', description: 'A borda acende apenas no ângulo onde o mouse se encontra' },
    ],
    compatibleSlots: [
      { 
        slot: 'main-container', 
        label: 'Container / Fundo do Componente', 
        description: 'O fundo do componente é iluminado pelo holofote que segue o mouse',
        recommendedFor: ['floating-toolbar', 'godui-dock', 'bento-grid', 'glass-footer']
      },
      { 
        slot: 'active-item', 
        label: 'No Item Ativado', 
        description: 'O item selecionado irradia um foco luminoso contínuo'
      },
    ],
  },

  'aurora-glow': {
    effectType: 'aurora-glow',
    name: 'Aurora Ambient Glow (Névoa Cromática)',
    sourceComponentName: 'Aurora Text Headline',
    sourceComponentType: 'aurora-text',
    tagline: 'Ondas cromáticas radiantes animadas',
    description: 'Projeta uma névoa fluida de cores complementares em movimento contínuo por trás dos elementos, emanando luz ambiente.',
    badge: 'Ambiente',
    icon: 'Flame',
    color: '#8b5cf6',
    availableFeatures: [
      { id: 'fluid-mesh', label: 'Mesh Multicolor em Rotação', description: 'Ciclo contínuo entre ciano, roxo e esmeralda' },
      { id: 'ambient-bloom', label: 'Bloom Difuso Saturado', description: 'Glow atmosférico que se funde com o fundo escuro' },
    ],
    compatibleSlots: [
      { 
        slot: 'active-item', 
        label: 'Item / Botão Ativado', 
        description: 'O item ativo emana um halo de aurora boreal dinâmico',
        recommendedFor: ['floating-toolbar', 'godui-dock', 'dynamic-island']
      },
      { 
        slot: 'main-container', 
        label: 'Atrás do Container', 
        description: 'Gera uma aura atmosférica suave ao redor de todo o componente'
      },
      { 
        slot: 'badge', 
        label: 'Badge / Tag', 
        description: 'O chip brilha com gradiente fluido em looping'
      },
    ],
  },

  'hold-confirm-ring': {
    effectType: 'hold-confirm-ring',
    name: 'Hold-to-Confirm (Pressão Tátil)',
    sourceComponentName: 'Hold Confirm Button',
    sourceComponentType: 'hold-confirm-button',
    tagline: 'Medidor de pressão e confirmação por tempo',
    description: 'Transforma cliques simples em ações seguras com anel de preenchimento radial SVG e feedback tátil ao segurar.',
    badge: 'Segurança Tátil',
    icon: 'Clock',
    color: '#eab308',
    availableFeatures: [
      { id: 'radial-progress', label: 'Anel Radial de Progresso SVG', description: 'Preenchimento circular de 0 a 100% durante o clique sustentado' },
      { id: 'pulse-complete', label: 'Feedback de Conclusão', description: 'Pulso de onda expansiva ao atingir a confirmação' },
    ],
    compatibleSlots: [
      { 
        slot: 'active-item', 
        label: 'Item / Ação Ativa', 
        description: 'Exige segurar o clique para alternar ou confirmar a ação selecionada'
      },
      { 
        slot: 'interactive-items', 
        label: 'Todos os Botões de Ação', 
        description: 'Adiciona confirmação por sustentação aos botões do componente'
      },
    ],
  },

  'jelly-bounce': {
    effectType: 'jelly-bounce',
    name: 'Jelly Wobble (Física Squishy Spring)',
    sourceComponentName: 'Jelly Button',
    sourceComponentType: 'jelly-button',
    tagline: 'Deformação elástica orgânica e amortecimento de gelatina',
    description: 'Aplica física squishy de amortecimento spring nos elementos, deformando escala x/y no clique e hover.',
    badge: 'Tátil Físico',
    icon: 'Sparkles',
    color: '#ec4899',
    availableFeatures: [
      { id: 'squish-spring', label: 'Deformação Squishy Tap', description: 'Amassa no clique e expande elasticamente na liberação' },
      { id: 'jelly-highlight', label: 'Reflexo Especular Gelatinoso', description: 'Curva de luz de gelatina no topo do elemento' },
    ],
    compatibleSlots: [
      { slot: 'interactive-items', label: 'Todos os Botões / Itens', description: 'Torna todos os botões e itens squishy' },
      { slot: 'active-item', label: 'Item / Card Selecionado', description: 'Wobble ao selecionar o item' },
      { slot: 'icon', label: 'Ícones', description: 'Ícones deformam e saltam ao passar o mouse' },
      { slot: 'badge', label: 'Badge / Tag', description: 'Badge pula como gota de gelatina' },
    ],
  },

  'magic-sparkle': {
    effectType: 'magic-sparkle',
    name: 'Magic Rainbow Edge & 3D Sink',
    sourceComponentName: 'Magic Button',
    sourceComponentType: 'magic-button',
    tagline: 'Borda com rotação contínua arco-íris e afundamento 3D',
    description: 'Adiciona contorno dinâmico com gradiente cônico em rotação contínua e afundamento com profundidade tátil no clique.',
    badge: '3D Dinâmico',
    icon: 'Wand2',
    color: '#06b6d4',
    availableFeatures: [
      { id: 'rainbow-perimeter', label: 'Borda Conic Arco-Íris', description: 'Halo rotativo iluminado ao redor do contorno' },
      { id: 'depth-sink', label: 'Afundamento 3D de 4px', description: 'Deslocamento no eixo Z ao clicar' },
    ],
    compatibleSlots: [
      { slot: 'border', label: 'Borda / Stroke Exterior', description: 'Contorno iluminado arco-íris ou halo dinâmico' },
      { slot: 'active-item', label: 'Item Ativo (Clicado)', description: 'Item selecionado ganha o contorno mágico' },
      { slot: 'background', label: 'Fundo do Container', description: 'Fundo com aura mágica' },
    ],
  },

  'lamp-beam': {
    effectType: 'lamp-beam',
    name: 'Lamp Conic Spotlight (Feixe Atmosférico)',
    sourceComponentName: 'Lamp',
    sourceComponentType: 'lamp',
    tagline: 'Feixe de luz cônico espelhado e filamento laser',
    description: 'Projeta um feixe de iluminação cônico descendente com difusão radial e filamento laser.',
    badge: 'Atmosférico',
    icon: 'SunMedium',
    color: '#f59e0b',
    availableFeatures: [
      { id: 'conic-beam', label: 'Feixe Duplo Cônico', description: 'Luz difusa projetada sobre os elementos' },
      { id: 'laser-filament', label: 'Filamento Laser Neon', description: 'Linha incandescente horizontal de alta energia' },
    ],
    compatibleSlots: [
      { slot: 'before-glow', label: 'Camada ::before (Glow Aura)', description: 'Feixe de luz emitido do topo' },
      { slot: 'title', label: 'Título / Tipografia', description: 'Ilumina o texto principal com gradiente cônico' },
      { slot: 'background', label: 'Container de Fundo', description: 'Aura ambiente no fundo do componente' },
    ],
  },

  'ascii-dither-fx': {
    effectType: 'ascii-dither-fx',
    name: 'ASCII Matrix & Halftone Shader',
    sourceComponentName: 'ASCII Dither Shader',
    sourceComponentType: 'ascii-dither',
    tagline: 'Textura de glifos ASCII e retícula halftone interativa',
    description: 'Injeta textura de caracteres monocromáticos ou retícula pontilhada que reage cineticamente ao cursor.',
    badge: 'Retrô Shader',
    icon: 'Terminal',
    color: '#10b981',
    availableFeatures: [
      { id: 'ascii-texture', label: 'Glifos Matriciais', description: 'Caracteres com densidade mapeada' },
      { id: 'scanlines', label: 'Linhas CRT Retrô', description: 'Scanlines de monitor analógico sutil' },
    ],
    compatibleSlots: [
      { slot: 'background', label: 'Fundo / Container', description: 'Superfície com textura ASCII' },
      { slot: 'border', label: 'Borda / Stroke', description: 'Contorno dither pontilhado' },
      { slot: 'after-shine', label: 'Camada ::after', description: 'Camada de glitch analógico' },
    ],
  },

  'dock-magnification': {
    effectType: 'dock-magnification',
    name: 'macOS Dock Magnification & Reflection',
    sourceComponentName: 'macOS Dock',
    sourceComponentType: 'godui-dock',
    tagline: 'Física elástica de ampliação sinusoidal e reflexo de espelho',
    description: 'Aplica a ampliação fluida de ícones baseada em curva gaussiana conforme o cursor se aproxima, com reflexo de espelho no piso.',
    badge: 'macOS Ótica',
    icon: 'Maximize2',
    color: '#3b82f6',
    availableFeatures: [
      { id: 'spring-magnification', label: 'Ampliação Elástica Gaussiana', description: 'Ícones e botões expandem ao passar o mouse' },
      { id: 'dock-reflection', label: 'Reflexo Espelhado Inferior', description: 'Gradiente de reflexo no chão com desfoque e fade' },
    ],
    compatibleSlots: [
      { slot: 'icon', label: 'Ícones / Glifos', description: 'Aplica ampliação com curva gaussiana nos ícones' },
      { slot: 'interactive-items', label: 'Todos os Botões Interativos', description: 'Botões ampliam elasticamente na aproximação' },
      { slot: 'active-item', label: 'Item Ativo (Clicado)', description: 'Item selecionado mantém elevação e destaque' },
      { slot: 'after-shine', label: 'Camada ::after (Reflexo)', description: 'Adiciona projeção reflexiva inferior' },
    ],
  },

  'island-morph': {
    effectType: 'island-morph',
    name: 'Dynamic Island Keyframe Morph',
    sourceComponentName: 'Dynamic Island Header',
    sourceComponentType: 'dynamic-island',
    tagline: 'Morfismo de cápsula e anel ambiente adaptativo',
    description: 'Transformação elástica contínua de pílula compacta para expandida com física de alta fidelidade e anel ambiente.',
    badge: 'Morfismo',
    icon: 'Radio',
    color: '#8b5cf6',
    availableFeatures: [
      { id: 'pill-morph', label: 'Morfismo de Pílula Fluido', description: 'Redimensionamento com transição spring sem quebra de layout' },
      { id: 'ambient-halo', label: 'Aura Ambiente Reativa', description: 'Glow perimetral suave de presença' },
    ],
    compatibleSlots: [
      { slot: 'main-container', label: 'Container Principal', description: 'Transforma o container em cápsula com morfismo de borda' },
      { slot: 'badge', label: 'Badge / Tag de Status', description: 'Pílula ganha expansão fluida' },
      { slot: 'before-glow', label: 'Camada ::before', description: 'Aura difusa ao redor do componente' },
    ],
  },

  'toolbar-pill-morph': {
    effectType: 'toolbar-pill-morph',
    name: 'Floating Toolbar Pill & Backdrop',
    sourceComponentName: 'Floating Toolbar',
    sourceComponentType: 'floating-toolbar',
    tagline: 'Indicador deslizante fluido com layoutId e vidro acetinado',
    description: 'Indicador deslizante com física de mola que viaja suavemente entre ferramentas selecionadas sobre superfície acetinada.',
    badge: 'Navegação Tátil',
    icon: 'Move',
    color: '#0ea5e9',
    availableFeatures: [
      { id: 'sliding-pill', label: 'Pílula Deslizante LayoutId', description: 'Indicador viaja suavemente entre itens' },
      { id: 'frosted-surface', label: 'Superfície Acetinada 85%', description: 'Backdrop blur com alta densidade vítrea' },
    ],
    compatibleSlots: [
      { slot: 'active-item', label: 'Item / Indicador Ativo', description: 'Ganha o indicador deslizante acetinado' },
      { slot: 'interactive-items', label: 'Botões Interativos', description: 'Sensação tátil e micro-elevações' },
      { slot: 'background', label: 'Container de Fundo', description: 'Fundo flutuante acetinado' },
    ],
  },

  'voice-pulse': {
    effectType: 'voice-pulse',
    name: 'Voice Orb Audio Nebula Pulse',
    sourceComponentName: 'Voice Orb AI',
    sourceComponentType: 'voice-orb',
    tagline: 'Pulsação reativa a áudio e partículas de nebulosa estelar',
    description: 'Pulso oscilante inspirado em assistentes de voz com anéis concêntricos de energia e partículas estelares em órbita.',
    badge: 'Áudio & AI',
    icon: 'Radio',
    color: '#6366f1',
    availableFeatures: [
      { id: 'waveform-rings', label: 'Anéis Ondulatórios Concêntricos', description: 'Ondas circulares em expansão contínua' },
      { id: 'nebula-core', label: 'Núcleo de Alta Densidade', description: 'Glow central de plasma com respiração cromática' },
    ],
    compatibleSlots: [
      { slot: 'before-glow', label: 'Camada ::before (Glow Aura)', description: 'Aura pulsante ao redor do componente' },
      { slot: 'icon', label: 'Ícones / Glifos', description: 'Ícones pulsam com ondas de áudio estelares' },
      { slot: 'badge', label: 'Badge / Status Tag', description: 'Badge com halo de respiração sonora' },
      { slot: 'active-item', label: 'Item Ativo', description: 'Elemento ativo pulsa ritmicamente' },
    ],
  },

  'radial-satellite': {
    effectType: 'radial-satellite',
    name: 'Multi-Button Radial Satellite Expansion',
    sourceComponentName: 'Multi Button',
    sourceComponentType: 'multi-button',
    tagline: 'Sub-ações orbitais radiais e trilho de seleção deslizante',
    description: 'Expansão de ações em leque orbital e indicador sobre trilho táctil de alta precisão.',
    badge: 'Interação Orbital',
    icon: 'Share2',
    color: '#f43f5e',
    availableFeatures: [
      { id: 'orbital-fan', label: 'Ações Radiais em Leque', description: 'Botões satélite expandem ao redor do centro' },
      { id: 'rail-slider', label: 'Trilho de Seleção', description: 'Cursor deslizante entre opções' },
    ],
    compatibleSlots: [
      { slot: 'interactive-items', label: 'Botões / Ações', description: 'Botões abrem sub-ações em leque tátil' },
      { slot: 'active-item', label: 'Item Selecionado', description: 'Ação com realce orbital' },
      { slot: 'border', label: 'Borda Perimetral', description: 'Linha guia perimétrica sutil' },
    ],
  },

  'mask-wipe': {
    effectType: 'mask-wipe',
    name: 'Mask Reveal (Mascara Radial Interativa)',
    sourceComponentName: 'Mask Button',
    sourceComponentType: 'mask-button',
    tagline: 'Revelação por máscara circular seguindo o cursor do mouse',
    description: 'Cria uma camada oculta premium revelada através de um círculo de recorte dinâmico baseado na posição x/y do cursor.',
    badge: 'Mascara Clip-Path',
    icon: 'Eye',
    color: '#14b8a6',
    availableFeatures: [
      { id: 'clip-reveal', label: 'Círculo de Máscara SVG/CSS', description: 'Revela texto/ícone oculto na proximidade do cursor' },
      { id: 'dual-layer-text', label: 'Tipografia Dupla Revelável', description: 'Texto alternativo iluminado dentro do foco' },
    ],
    compatibleSlots: [
      { slot: 'title', label: 'Título / Tipografia', description: 'Revela mensagem secreta ao passar o mouse' },
      { slot: 'interactive-items', label: 'Botões Interativos', description: 'Botão revela novo estado na máscara do mouse' },
      { slot: 'background', label: 'Superfície de Fundo', description: 'Revela textura sob o cursor' },
    ],
  },

  'bento-gradient-border': {
    effectType: 'bento-gradient-border',
    name: 'Bento Grid Kinetic Border Gradient',
    sourceComponentName: 'Bento Grid',
    sourceComponentType: 'bento-grid',
    tagline: 'Gradiente perimétrico cinético e composição assimétrica',
    description: 'Bordas finas de 1px com gradiente angular em rotação lenta e destaque de células conectadas.',
    badge: 'Grid Futurista',
    icon: 'LayoutGrid',
    color: '#a855f7',
    availableFeatures: [
      { id: 'kinetic-border-flow', label: 'Fluxo Gradiente nas Bordas', description: 'Gradiente suave contornando os limites do elemento' },
      { id: 'cell-elevation', label: 'Elevação Z de Célula', description: 'Destaca relevo tridimensional no hover' },
    ],
    compatibleSlots: [
      { slot: 'border', label: 'Borda / Stroke', description: 'Contorno com gradiente angular animado' },
      { slot: 'main-container', label: 'Container', description: 'Bordas de precisão CAD' },
      { slot: 'active-item', label: 'Item Selecionado', description: 'Célula ativa com destaque perimetral' },
    ],
  },

  'blueprint-laser': {
    effectType: 'blueprint-laser',
    name: 'Blueprint CAD Isometric Laser Grid',
    sourceComponentName: 'Blueprint Grid',
    sourceComponentType: 'blueprint-grid',
    tagline: 'Malha isométrica técnica com cruz de mira laser e régua',
    description: 'Linhas milimetradas de precisão vetorial com feixe laser que varre o espaço e coordenadas de mira.',
    badge: 'Engenharia CAD',
    icon: 'Grid',
    color: '#0284c7',
    availableFeatures: [
      { id: 'laser-crosshair', label: 'Mira Laser Ativa', description: 'Cruz de mira laser vermelha ou ciano sobre o cursor' },
      { id: 'cad-subdivisions', label: 'Malha Isométrica Milimetrada', description: 'Padrão sutil de blueprint de engenharia' },
    ],
    compatibleSlots: [
      { slot: 'background', label: 'Fundo / Container', description: 'Injeta a malha técnica isométrica' },
      { slot: 'border', label: 'Borda Técnica', description: 'Bordas com marcadores de medição e cantos em cruz' },
      { slot: 'after-shine', label: 'Camada ::after', description: 'Feixe laser de varredura diagonal' },
    ],
  },

  'mesh-3d-wire': {
    effectType: 'mesh-3d-wire',
    name: 'Interactive 3D Mesh Wireframe Kinetics',
    sourceComponentName: 'Interactive 3D Mesh',
    sourceComponentType: 'interactive-3d-mesh',
    tagline: 'Vértices e arestas vetoriais 3D em rotação giroscópica contínua',
    description: 'Malha tridimensional dinâmica com nós brilhantes que rotacionam no espaço tridimensional com física inercial.',
    badge: 'Cinemática 3D',
    icon: 'Box',
    color: '#d946ef',
    availableFeatures: [
      { id: 'gyro-inertial-rotation', label: 'Rotação Inercial 3D', description: 'Malha gira respondendo à velocidade do mouse/touch' },
      { id: 'neon-vertices', label: 'Nós e Vértices Neon', description: 'Pontos de conexão reluzentes com halo' },
    ],
    compatibleSlots: [
      { slot: 'background', label: 'Fundo / Container', description: 'Malha 3D girando suavemente no fundo' },
      { slot: 'icon', label: 'Ícones / Símbolos', description: 'Ícone orbita em perspectiva 3D' },
      { slot: 'before-glow', label: 'Camada ::before', description: 'Projeção holográfica de nós orbitais' },
    ],
  },

  'elastic-stretch': {
    effectType: 'elastic-stretch',
    name: 'Elastic Typography Kinetic Stretch',
    sourceComponentName: 'Elastic Text',
    sourceComponentType: 'elastic-text',
    tagline: 'Deformação elástica letra por letra com física spring',
    description: 'Cada caractere individual estica e deforma no eixo Y conforme o ponteiro desliza sobre a tipografia.',
    badge: 'Tipografia Cinética',
    icon: 'Type',
    color: '#f97316',
    availableFeatures: [
      { id: 'per-char-spring', label: 'Molas Independentes por Glifo', description: 'Ondulação sequencial ao passar o mouse' },
      { id: 'weight-warp', label: 'Variação de Peso e Escala', description: 'Font-weight e altura adaptam dinamicamente' },
    ],
    compatibleSlots: [
      { slot: 'title', label: 'Título Principal', description: 'O título deforma elasticamente letra por letra' },
      { slot: 'subtitle', label: 'Subtítulo', description: 'Subtítulo ganha ondulação de mola' },
      { slot: 'badge', label: 'Texto da Badge', description: 'Letras da tag saltam ao passar o mouse' },
    ],
  },

  'number-odometer': {
    effectType: 'number-odometer',
    name: 'Number Ticker Spring Odometer',
    sourceComponentName: 'Number Ticker',
    sourceComponentType: 'number-ticker',
    tagline: 'Rolagem odômetro de dígitos com física de amortecimento',
    description: 'Animação fluida de transição numérica estilo odômetro mecânico de alta precisão com easing cúbico.',
    badge: 'Métricas Vivas',
    icon: 'Hash',
    color: '#22c55e',
    availableFeatures: [
      { id: 'digit-reel', label: 'Carretel de Dígitos 0-9', description: 'Transição individual por casa decimal' },
      { id: 'glow-pulse-change', label: 'Pulso de Mudança de Valor', description: 'Brilho quando o número atinge o total' },
    ],
    compatibleSlots: [
      { slot: 'title', label: 'Título / Valores Numéricos', description: 'Números rolam estilo odômetro contínuo' },
      { slot: 'badge', label: 'Badge / Contador', description: 'Contador numérico animado dentro da tag' },
      { slot: 'content', label: 'Área de Dados / Métricas', description: 'Transforma estatísticas em odômetros ao vivo' },
    ],
  },

  'scroll-reveal': {
    effectType: 'scroll-reveal',
    name: 'Scroll Reveal Word Progression',
    sourceComponentName: 'Scroll Text Reveal',
    sourceComponentType: 'scroll-text-reveal',
    tagline: 'Revelação progressiva de palavras por rolagem e foco',
    description: 'Transição calculada de opacidade e desfoque gaussiano conforme o deslocamento de scroll da página ocorre.',
    badge: 'Scroll Cinético',
    icon: 'ChevronsDown',
    color: '#eab308',
    availableFeatures: [
      { id: 'word-by-word-fade', label: 'Fade Palavra por Palavra', description: 'Avança com suavidade de 10% a 100% de luz' },
      { id: 'gaussian-deblur', label: 'Desfocagem Reversa', description: 'Texto surge de blur(8px) para nitidez cristalina' },
    ],
    compatibleSlots: [
      { slot: 'title', label: 'Título Principal', description: 'Título surge com desfoque reverso na rolagem' },
      { slot: 'subtitle', label: 'Subtítulo / Descrição', description: 'Parágrafo ganha revelação progressiva por palavra' },
      { slot: 'content', label: 'Conteúdo Central', description: 'Conteúdo do card revela progressivamente' },
    ],
  },

  'magic-rainbow-stroke': {
    effectType: 'magic-rainbow-stroke',
    name: 'Magic Rainbow Input Stroke & Lift',
    sourceComponentName: 'Magic Input',
    sourceComponentType: 'magic-input',
    tagline: 'Borda com rotação cônica neon e elevação 3D de foco',
    description: 'Contorno de precisão com gradiente cônico arco-íris ativado no foco ou hover com elevação dimensional.',
    badge: 'Foco Neon',
    icon: 'Sparkle',
    color: '#06b6d4',
    availableFeatures: [
      { id: 'conic-focus-edge', label: 'Borda Conic Ciano-Magenta', description: 'Anel de luz girando ao redor da borda' },
      { id: 'elevation-rise', label: 'Elevação Z de 3px', description: 'Levanta suavemente do plano de fundo' },
    ],
    compatibleSlots: [
      { slot: 'border', label: 'Borda / Stroke Exterior', description: 'Borda com anel de luz neon cônico' },
      { slot: 'active-item', label: 'Item Selecionado / Focado', description: 'Item ativo ganha o contorno cônico luminoso' },
      { slot: 'interactive-items', label: 'Todos os Botões', description: 'Botões contornados por anel neon' },
    ],
  },

  'glass-refraction': {
    effectType: 'glass-refraction',
    name: 'Glass Refraction Deep Horizon',
    sourceComponentName: 'Glass Footer',
    sourceComponentType: 'glass-footer',
    tagline: 'Refração vítrea profunda de horizonte e desfoque estendido',
    description: 'Backdrop blur ultra-profundo com gradiente linear de horizonte e dispersão atmosférica.',
    badge: 'Horizonte Vítreo',
    icon: 'Layers',
    color: '#64748b',
    availableFeatures: [
      { id: 'deep-horizon-blur', label: 'Desfoque Progressivo de Horizonte', description: 'Gradiente de desfoque de 24px a 40px' },
      { id: 'top-specular-rim', label: 'Filete Especular Superior de 1px', description: 'Linha iluminada no topo da superfície' },
    ],
    compatibleSlots: [
      { slot: 'background', label: 'Fundo / Container Principal', description: 'Fundo vítreo profundo de horizonte' },
      { slot: 'after-shine', label: 'Camada ::after (Filete Superior)', description: 'Linha especular de horizonte' },
      { slot: 'before-glow', label: 'Camada ::before', description: 'Glow atmosférico no topo' },
    ],
  },
};

/**
 * Returns the primary signature effect for ANY component on the site!
 */
export function getComponentSignatureEffect(type: GodUIComponentType): FusionEffectType {
  const map: Record<GodUIComponentType, FusionEffectType> = {
    'dynamic-island': 'island-morph',
    'godui-dock': 'dock-magnification',
    'floating-toolbar': 'toolbar-pill-morph',
    'liquid-glass-button': 'liquid-glass',
    'shimmer-button': 'shimmer-beam',
    'magnetic-button': 'magnetic-pull',
    'hold-confirm-button': 'hold-confirm-ring',
    'gooey-fab': 'gooey-liquid',
    'spotlight-card': 'spotlight-beam',
    'tilt-3d-card': 'hologram-3d-tilt',
    'bento-grid': 'bento-gradient-border',
    'aurora-text': 'aurora-glow',
    'voice-orb': 'voice-pulse',
    'glass-footer': 'glass-refraction',
    'blueprint-grid': 'blueprint-laser',
    'interactive-3d-mesh': 'mesh-3d-wire',
    'jelly-button': 'jelly-bounce',
    'magic-button': 'magic-sparkle',
    'mask-button': 'mask-wipe',
    'multi-button': 'radial-satellite',
    'magic-input': 'magic-rainbow-stroke',
    'elastic-text': 'elastic-stretch',
    'number-ticker': 'number-odometer',
    'scroll-text-reveal': 'scroll-reveal',
    'lamp': 'lamp-beam',
    'ascii-dither': 'ascii-dither-fx',
  };

  return map[type] || 'liquid-glass';
}

/**
 * Returns all available effects that a given component can donate
 */
export function getComponentAvailableEffects(type: GodUIComponentType): FusionEffectType[] {
  const sig = getComponentSignatureEffect(type);
  const common = ['liquid-glass', 'shimmer-beam', 'aurora-glow', 'jelly-bounce'] as FusionEffectType[];
  return Array.from(new Set([sig, ...common]));
}

export interface FusionPreset {
  id: string;
  name: string;
  targetComponentType: GodUIComponentType;
  donorEffect: FusionEffectType;
  targetSlot: FusionTargetSlot;
  description: string;
  intensity: number;
  badge: string;
  withShimmer?: boolean;
}

export const FUSION_PRESETS: FusionPreset[] = [
  {
    id: 'preset-toolbar-liquid-active',
    name: 'Toolbar com Vidro Líquido no Item Ativo',
    targetComponentType: 'floating-toolbar',
    donorEffect: 'liquid-glass',
    targetSlot: 'active-item',
    description: 'Aplica o reflexo de vidro líquido, gloss especular e borda chanfrada exatamente no card/ferramenta que estiver ativado (clicado)!',
    intensity: 0.9,
    badge: 'Recomendado',
    withShimmer: true,
  },
  {
    id: 'preset-toolbar-gooey',
    name: 'Toolbar com Transição Gooey Líquida',
    targetComponentType: 'floating-toolbar',
    donorEffect: 'gooey-liquid',
    targetSlot: 'active-item',
    description: 'O indicador ativo estica e conecta como uma gota viscosa ao alternar entre ferramentas.',
    intensity: 0.85,
    badge: 'Fluido',
  },
  {
    id: 'preset-dock-liquid-glass',
    name: 'macOS Dock com Ícones em Vidro Líquido',
    targetComponentType: 'godui-dock',
    donorEffect: 'liquid-glass',
    targetSlot: 'active-item',
    description: 'Ícone selecionado no Dock ganha refração vítrea e brilho cristalino 3D.',
    intensity: 0.9,
    badge: 'Premium',
  },
  {
    id: 'preset-dock-magnetic',
    name: 'macOS Dock com Atração Magnética',
    targetComponentType: 'godui-dock',
    donorEffect: 'magnetic-pull',
    targetSlot: 'interactive-items',
    description: 'Os ícones do Dock são atraídos magneticamente ao aproximar o cursor do mouse.',
    intensity: 0.75,
    badge: 'Tátil',
  },
  {
    id: 'preset-island-aurora',
    name: 'Dynamic Island com Aurora e Vidro',
    targetComponentType: 'dynamic-island',
    donorEffect: 'aurora-glow',
    targetSlot: 'active-item',
    description: 'O botão CTA da ilha e seu corpo emitem névoa cromática animada.',
    intensity: 0.8,
    badge: 'Impacto',
  },
  {
    id: 'preset-bento-holo-tilt',
    name: 'Bento Grid com Inclinação 3D e Spotlight',
    targetComponentType: 'bento-grid',
    donorEffect: 'hologram-3d-tilt',
    targetSlot: 'main-container',
    description: 'Os cards da bento grid inclinam suavemente no espaço 3D ao passar o mouse.',
    intensity: 0.7,
    badge: '3D Real',
  },
];
