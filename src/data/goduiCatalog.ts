import { GodUIMeta, GodUIComponentType } from '../types/builder';


const CREATIVE_COMPONENTS: GodUIMeta[] = [
  {
    "type": "creative-2d-mascot",
    "name": "Mascote Vetorial 2D",
    "category": "Creative & Shaders",
    "description": "Personagem vetorial interativo com olhar reativo e expressões selecionáveis.",
    "iconName": "Bot",
    "badge": "2D / SVG",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#67e8f9"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Mascote vetorial interativo"
      }
    ],
    "defaultProps": {
      "accent": "#67e8f9",
      "label": "Mascote vetorial interativo"
    },
    "sampleCode": "import { Mascot2D } from \"@/components/godui/CreativeVisuals\";\n\nexport function Mascot2DExample() {\n  return <Mascot2D accent={\"#67e8f9\"} label={\"Mascote vetorial interativo\"} />;\n}"
  },
  {
    "type": "creative-2d-particles",
    "name": "Campo de Partículas 2D",
    "category": "Creative & Shaders",
    "description": "Campo de partículas em canvas com conexões e repulsão pelo ponteiro.",
    "iconName": "Sparkles",
    "badge": "Canvas / 2D",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#67e8f9"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Campo de partículas"
      },
      {
        "key": "count",
        "label": "Quantidade de partículas/nós",
        "type": "number",
        "defaultValue": 56,
        "min": 10,
        "max": 120,
        "step": 1
      },
      {
        "key": "speed",
        "label": "Velocidade",
        "type": "number",
        "defaultValue": 1,
        "min": 0.1,
        "max": 2,
        "step": 0.1
      }
    ],
    "defaultProps": {
      "accent": "#67e8f9",
      "label": "Campo de partículas",
      "count": 56,
      "speed": 1
    },
    "sampleCode": "import { ParticleField2D } from \"@/components/godui/CreativeVisuals\";\n\nexport function ParticleField2DExample() {\n  return <ParticleField2D accent={\"#67e8f9\"} label={\"Campo de partículas\"} count={56} speed={1} />;\n}"
  },
  {
    "type": "creative-2d-liquid",
    "name": "Formas Orgânicas 2D",
    "category": "Creative & Shaders",
    "description": "Formas orgânicas com deformação e movimento vetorial contínuo.",
    "iconName": "Droplets",
    "badge": "2D / Motion",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#a78bfa"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Formas líquidas orgânicas"
      },
      {
        "key": "intensity",
        "label": "Intensidade",
        "type": "number",
        "defaultValue": 0.8,
        "min": 0.1,
        "max": 1.5,
        "step": 0.1
      }
    ],
    "defaultProps": {
      "accent": "#a78bfa",
      "label": "Formas líquidas orgânicas",
      "intensity": 0.8
    },
    "sampleCode": "import { LiquidBlob2D } from \"@/components/godui/CreativeVisuals\";\n\nexport function LiquidBlob2DExample() {\n  return <LiquidBlob2D accent={\"#a78bfa\"} label={\"Formas líquidas orgânicas\"} intensity={0.8} />;\n}"
  },
  {
    "type": "creative-2d-cutaway",
    "name": "Ilustração em Camadas",
    "category": "Visualizations",
    "description": "Ilustração de corte vetorial com camadas que podem ser isoladas individualmente.",
    "iconName": "Layers",
    "badge": "SVG / Layers",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#4ade80"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Ilustração vetorial em camadas"
      }
    ],
    "defaultProps": {
      "accent": "#4ade80",
      "label": "Ilustração vetorial em camadas"
    },
    "sampleCode": "import { LayeredIllustration2D } from \"@/components/godui/CreativeVisuals\";\n\nexport function LayeredIllustration2DExample() {\n  return <LayeredIllustration2D accent={\"#4ade80\"} label={\"Ilustração vetorial em camadas\"} />;\n}"
  },
  {
    "type": "creative-3d-product",
    "name": "Objeto de Produto 3D",
    "category": "Creative & Shaders",
    "description": "Vitrine 3D com geometria, materiais PBR, iluminação e controle de órbita.",
    "iconName": "Box",
    "badge": "Three.js / 3D",
    "registryName": "godui/Creative3DVisuals",
    "dependencies": [
      "react",
      "three",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#67e8f9"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Vitrine de objeto 3D"
      }
    ],
    "defaultProps": {
      "accent": "#67e8f9",
      "label": "Vitrine de objeto 3D"
    },
    "sampleCode": "import { ProductObject3D } from \"@/components/godui/Creative3DVisuals\";\n\nexport function ProductObject3DExample() {\n  return <ProductObject3D accent={\"#67e8f9\"} label={\"Vitrine de objeto 3D\"} />;\n}"
  },
  {
    "type": "creative-3d-diorama",
    "name": "Diorama 3D",
    "category": "Visualizations",
    "description": "Cena 3D em miniatura composta por malhas reais, materiais e luzes.",
    "iconName": "Box",
    "badge": "Three.js / 3D",
    "registryName": "godui/Creative3DVisuals",
    "dependencies": [
      "react",
      "three",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#4ade80"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Diorama 3D"
      }
    ],
    "defaultProps": {
      "accent": "#4ade80",
      "label": "Diorama 3D"
    },
    "sampleCode": "import { Diorama3D } from \"@/components/godui/Creative3DVisuals\";\n\nexport function Diorama3DExample() {\n  return <Diorama3D accent={\"#4ade80\"} label={\"Diorama 3D\"} />;\n}"
  },
  {
    "type": "creative-3d-hologram",
    "name": "Holograma Geométrico 3D",
    "category": "Creative & Shaders",
    "description": "Malha icosaédrica, pontos e órbitas luminosas renderizados em WebGL.",
    "iconName": "Orbit",
    "badge": "Three.js / 3D",
    "registryName": "godui/Creative3DVisuals",
    "dependencies": [
      "react",
      "three",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#a78bfa"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Holograma geométrico 3D"
      }
    ],
    "defaultProps": {
      "accent": "#a78bfa",
      "label": "Holograma geométrico 3D"
    },
    "sampleCode": "import { Holographic3D } from \"@/components/godui/Creative3DVisuals\";\n\nexport function Holographic3DExample() {\n  return <Holographic3D accent={\"#a78bfa\"} label={\"Holograma geométrico 3D\"} />;\n}"
  },
  {
    "type": "creative-isometric-city",
    "name": "Cidade Isométrica",
    "category": "Visualizations",
    "description": "Cenário isométrico vetorial de cidade com prédios e objetos selecionáveis.",
    "iconName": "Building2",
    "badge": "SVG / Isometric",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#67e8f9"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Cidade isométrica"
      }
    ],
    "defaultProps": {
      "accent": "#67e8f9",
      "label": "Cidade isométrica"
    },
    "sampleCode": "import { IsometricCity } from \"@/components/godui/CreativeVisuals\";\n\nexport function IsometricCityExample() {\n  return <IsometricCity accent={\"#67e8f9\"} label={\"Cidade isométrica\"} />;\n}"
  },
  {
    "type": "creative-isometric-farm",
    "name": "Fazenda Isométrica",
    "category": "Visualizations",
    "description": "Cena isométrica de fazenda com talhões, galpão e silos selecionáveis.",
    "iconName": "Sprout",
    "badge": "SVG / Isometric",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#4ade80"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Fazenda isométrica"
      }
    ],
    "defaultProps": {
      "accent": "#4ade80",
      "label": "Fazenda isométrica"
    },
    "sampleCode": "import { IsometricFarm } from \"@/components/godui/CreativeVisuals\";\n\nexport function IsometricFarmExample() {\n  return <IsometricFarm accent={\"#4ade80\"} label={\"Fazenda isométrica\"} />;\n}"
  },
  {
    "type": "creative-isometric-interior",
    "name": "Interior Isométrico",
    "category": "Visualizations",
    "description": "Composição isométrica de interior com mobiliário vetorial selecionável.",
    "iconName": "Armchair",
    "badge": "SVG / Isometric",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#c084fc"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Interior isométrico"
      }
    ],
    "defaultProps": {
      "accent": "#c084fc",
      "label": "Interior isométrico"
    },
    "sampleCode": "import { IsometricInterior } from \"@/components/godui/CreativeVisuals\";\n\nexport function IsometricInteriorExample() {\n  return <IsometricInterior accent={\"#c084fc\"} label={\"Interior isométrico\"} />;\n}"
  },
  {
    "type": "creative-isometric-factory",
    "name": "Fábrica Isométrica",
    "category": "Visualizations",
    "description": "Cena industrial isométrica com máquinas, esteiras e equipamentos vetoriais.",
    "iconName": "Factory",
    "badge": "SVG / Isometric",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#fbbf24"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Fábrica isométrica"
      }
    ],
    "defaultProps": {
      "accent": "#fbbf24",
      "label": "Fábrica isométrica"
    },
    "sampleCode": "import { IsometricFactory } from \"@/components/godui/CreativeVisuals\";\n\nexport function IsometricFactoryExample() {\n  return <IsometricFactory accent={\"#fbbf24\"} label={\"Fábrica isométrica\"} />;\n}"
  },
  {
    "type": "creative-shader-liquid-glass",
    "name": "Shader de Refração Líquida",
    "category": "Creative & Shaders",
    "description": "Fragment shader WebGL com refração visual, ondas e realce de superfície.",
    "iconName": "Waves",
    "badge": "WebGL Shader",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#67e8f9"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Refração líquida WebGL"
      },
      {
        "key": "intensity",
        "label": "Intensidade",
        "type": "number",
        "defaultValue": 0.8,
        "min": 0.1,
        "max": 1.5,
        "step": 0.1
      },
      {
        "key": "speed",
        "label": "Velocidade",
        "type": "number",
        "defaultValue": 1,
        "min": 0.1,
        "max": 2,
        "step": 0.1
      }
    ],
    "defaultProps": {
      "accent": "#67e8f9",
      "label": "Refração líquida WebGL",
      "intensity": 0.8,
      "speed": 1
    },
    "sampleCode": "import { LiquidGlassShader } from \"@/components/godui/CreativeVisuals\";\n\nexport function LiquidGlassShaderExample() {\n  return <LiquidGlassShader accent={\"#67e8f9\"} label={\"Refração líquida WebGL\"} intensity={0.8} speed={1} />;\n}"
  },
  {
    "type": "creative-shader-glitch",
    "name": "Shader Glitch",
    "category": "Creative & Shaders",
    "description": "Shader WebGL com scanlines, bandas de ruído e deslocamento cromático.",
    "iconName": "Monitor",
    "badge": "WebGL Shader",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#f472b6"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Distorção digital glitch"
      },
      {
        "key": "intensity",
        "label": "Intensidade",
        "type": "number",
        "defaultValue": 0.8,
        "min": 0.1,
        "max": 1.5,
        "step": 0.1
      },
      {
        "key": "speed",
        "label": "Velocidade",
        "type": "number",
        "defaultValue": 1,
        "min": 0.1,
        "max": 2,
        "step": 0.1
      }
    ],
    "defaultProps": {
      "accent": "#f472b6",
      "label": "Distorção digital glitch",
      "intensity": 0.8,
      "speed": 1
    },
    "sampleCode": "import { GlitchShader } from \"@/components/godui/CreativeVisuals\";\n\nexport function GlitchShaderExample() {\n  return <GlitchShader accent={\"#f472b6\"} label={\"Distorção digital glitch\"} intensity={0.8} speed={1} />;\n}"
  },
  {
    "type": "creative-shader-aurora",
    "name": "Aurora Procedural",
    "category": "Creative & Shaders",
    "description": "Aurora gerada em tempo real por fragment shader WebGL.",
    "iconName": "Sparkles",
    "badge": "WebGL Shader",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#34d399"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Aurora procedural"
      },
      {
        "key": "intensity",
        "label": "Intensidade",
        "type": "number",
        "defaultValue": 0.8,
        "min": 0.1,
        "max": 1.5,
        "step": 0.1
      },
      {
        "key": "speed",
        "label": "Velocidade",
        "type": "number",
        "defaultValue": 1,
        "min": 0.1,
        "max": 2,
        "step": 0.1
      }
    ],
    "defaultProps": {
      "accent": "#34d399",
      "label": "Aurora procedural",
      "intensity": 0.8,
      "speed": 1
    },
    "sampleCode": "import { AuroraShader } from \"@/components/godui/CreativeVisuals\";\n\nexport function AuroraShaderExample() {\n  return <AuroraShader accent={\"#34d399\"} label={\"Aurora procedural\"} intensity={0.8} speed={1} />;\n}"
  },
  {
    "type": "creative-data-network",
    "name": "Rede de Nós Interativa",
    "category": "Visualizations",
    "description": "Visualização procedural de nós e arestas em canvas, com conexões calculadas em tempo real.",
    "iconName": "Network",
    "badge": "Canvas / Graph",
    "registryName": "godui/CreativeVisuals",
    "dependencies": [
      "react",
      "motion/react"
    ],
    "propFields": [
      {
        "key": "accent",
        "label": "Cor de destaque",
        "type": "color",
        "defaultValue": "#67e8f9"
      },
      {
        "key": "label",
        "label": "Legenda acessível",
        "type": "text",
        "defaultValue": "Rede interativa de nós"
      },
      {
        "key": "count",
        "label": "Quantidade de partículas/nós",
        "type": "number",
        "defaultValue": 42,
        "min": 10,
        "max": 120,
        "step": 1
      }
    ],
    "defaultProps": {
      "accent": "#67e8f9",
      "label": "Rede interativa de nós",
      "count": 42
    },
    "sampleCode": "import { NetworkVisualization } from \"@/components/godui/CreativeVisuals\";\n\nexport function NetworkVisualizationExample() {\n  return <NetworkVisualization accent={\"#67e8f9\"} label={\"Rede interativa de nós\"} count={42} />;\n}"
  }
];

export const GODUI_CATALOG: Record<GodUIComponentType, GodUIMeta> = {
  'dynamic-island': {
    type: 'dynamic-island',
    name: 'Dynamic Island',
    category: 'Navigation & Overlays',
    description: 'Ilha flutuante dinâmica de alta fidelidade com física de expansão orgânica, status em tempo real, badges e ações táteis.',
    iconName: 'Compass',
    badge: 'Core Overlay',
    registryName: 'dynamic-island',
    dependencies: ['motion/react', 'lucide-react', 'clsx', 'tailwind-merge'],
    propFields: [
      { key: 'title', label: 'Título do App', type: 'text', defaultValue: 'GodUI OS' },
      { key: 'statusText', label: 'Status / Notificação', type: 'text', defaultValue: 'v2.4 Online • All Systems Normal' },
      { key: 'showNavLinks', label: 'Exibir Links de Navegação', type: 'boolean', defaultValue: true },
      { key: 'ctaText', label: 'Texto do Botão de Ação', type: 'text', defaultValue: 'Deploy Project' },
      { key: 'blurStrength', label: 'Desfoque de Vidro (px)', type: 'number', defaultValue: 16, min: 4, max: 32, step: 2 },
      { key: 'isSticky', label: 'Fixado no Topo da Página', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      title: 'GodUI OS',
      statusText: 'v2.4 Online • All Systems Normal',
      showNavLinks: true,
      ctaText: 'Deploy Project',
      blurStrength: 16,
      isSticky: true,
    },
    sampleCode: `import { motion } from "motion/react";
import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function DynamicIsland({ title = "GodUI OS", status = "Active", ctaText = "Deploy" }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={() => setExpanded(!expanded)}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl cursor-pointer"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-sm font-medium">{title}</span>
      {expanded && <span className="text-xs text-zinc-400">{status}</span>}
      <button className="px-2.5 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20">
        {ctaText}
      </button>
    </motion.div>
  );
}`,
  },

  'godui-dock': {
    type: 'godui-dock',
    name: 'Dock',
    category: 'Navigation & Overlays',
    description: 'Barra dock estilo macOS com ampliação de ícones fluida através de física spring, tooltips dinâmicos e indicadores de estado.',
    iconName: 'LayoutGrid',
    badge: 'Navigation',
    registryName: 'dock',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'magnification', label: 'Nível de Magnificação', type: 'number', defaultValue: 64, min: 48, max: 80, step: 4 },
      { key: 'distance', label: 'Distância de Ativação (px)', type: 'number', defaultValue: 140, min: 80, max: 200, step: 10 },
      { key: 'showLabels', label: 'Exibir Tooltips', type: 'boolean', defaultValue: true },
      { key: 'position', label: 'Posição no Canvas', type: 'select', defaultValue: 'bottom', options: [{ label: 'Inferior Flutuante', value: 'bottom' }, { label: 'Embutido no Fluxo', value: 'inline' }] },
    ],
    defaultProps: {
      magnification: 64,
      distance: 140,
      showLabels: true,
      position: 'bottom',
    },
    sampleCode: `import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Home, Compass, Layers, Terminal, Settings } from "lucide-react";

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-zinc-900/70 backdrop-blur-2xl border border-white/10"
    >
      {[Home, Compass, Layers, Terminal, Settings].map((Icon, i) => (
        <DockItem key={i} mouseX={mouseX} Icon={Icon} />
      ))}
    </motion.div>
  );
}`,
  },

  'floating-toolbar': {
    type: 'floating-toolbar',
    name: 'Floating Toolbar',
    category: 'Navigation & Overlays',
    description: 'Barra de ferramentas flutuante translúcida com troca de ferramentas ativas, atalhos rápidos e animação de pílula seletora deslizante.',
    iconName: 'Sliders',
    badge: 'Overlay',
    registryName: 'floating-toolbar',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'badgeText', label: 'Etiqueta Lateral', type: 'text', defaultValue: 'Studio Mode' },
      { key: 'allowMultiSelect', label: 'Permitir Múltiplas Seleções', type: 'boolean', defaultValue: false },
    ],
    defaultProps: {
      badgeText: 'Studio Mode',
      allowMultiSelect: false,
    },
    sampleCode: `import { motion } from "motion/react";
import { useState } from "react";
import { MousePointer2, Move, Type, Square, MessageSquare, ZoomIn } from "lucide-react";

export function FloatingToolbar() {
  const [active, setActive] = useState("select");
  const tools = [
    { id: "select", icon: MousePointer2, label: "Select" },
    { id: "hand", icon: Move, label: "Hand" },
    { id: "frame", icon: Square, label: "Frame" },
    { id: "text", icon: Type, label: "Text" },
    { id: "comment", icon: MessageSquare, label: "Comment" },
  ];
  return (
    <div className="inline-flex items-center p-1.5 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className="relative p-2 text-zinc-400 hover:text-white transition-colors"
        >
          {active === t.id && (
            <motion.div layoutId="toolbar-active" className="absolute inset-0 bg-white/10 rounded-lg" />
          )}
          <t.icon className="w-4 h-4 relative z-10" />
        </button>
      ))}
    </div>
  );
}`,
  },

  'liquid-glass-button': {
    type: 'liquid-glass-button',
    name: 'Liquid Glass Button',
    category: 'Buttons & Actions',
    description: 'Botão assinatura do GodUI com refração especular radial que persegue o cursor, bordas chanfradas e física de amortecimento elástico.',
    iconName: 'Sparkles',
    badge: 'GodUI Button',
    registryName: 'liquid-glass-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Texto do Botão', type: 'text', defaultValue: 'Get Started with GodUI' },
      { key: 'variant', label: 'Estilo de Vidro', type: 'select', defaultValue: 'liquid', options: [{ label: 'Liquid Glow', value: 'liquid' }, { label: 'Frosted White', value: 'frost' }, { label: 'Crystal Deep', value: 'crystal' }] },
      { key: 'size', label: 'Tamanho', type: 'select', defaultValue: 'md', options: [{ label: 'Normal (md)', value: 'md' }, { label: 'Grande (lg)', value: 'lg' }, { label: 'Compacto (sm)', value: 'sm' }] },
      { key: 'showArrow', label: 'Exibir Seta de Ação', type: 'boolean', defaultValue: true },
      { key: 'glowIntensity', label: 'Intensidade do Brilho (0-1)', type: 'number', defaultValue: 0.6, min: 0.1, max: 1.0, step: 0.1 },
    ],
    defaultProps: {
      label: 'Get Started with GodUI',
      variant: 'liquid',
      size: 'md',
      showArrow: true,
      glowIntensity: 0.6,
    },
    sampleCode: `import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export function LiquidGlassButton({ label = "Get Started" }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative group px-6 py-3 rounded-full overflow-hidden bg-white/[0.06] backdrop-blur-xl border border-white/20 text-white font-medium shadow-lg"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: \`radial-gradient(120px circle at \${pos.x}px \${pos.y}px, rgba(255,255,255,0.25), transparent 80%)\`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        {label}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </motion.button>
  );
}`,
  },

  'shimmer-button': {
    type: 'shimmer-button',
    name: 'Shimmer Button',
    category: 'Buttons & Actions',
    description: 'Botão de alta conversão com feixe cônico giratório contínuo na borda, núcleo escuro reflexivo e sombra luminosa.',
    iconName: 'Wand2',
    badge: 'GodUI Button',
    registryName: 'shimmer-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Texto do Botão', type: 'text', defaultValue: 'Explorar Documentação' },
      { key: 'shimmerColor', label: 'Cor do Shimmer', type: 'select', defaultValue: 'cyan', options: [{ label: 'Cyan Luminescence', value: 'cyan' }, { label: 'Purple Neon', value: 'purple' }, { label: 'Amber Gold', value: 'amber' }, { label: 'Pure White', value: 'white' }] },
      { key: 'speed', label: 'Velocidade da Rotação (s)', type: 'number', defaultValue: 3, min: 1, max: 8, step: 0.5 },
    ],
    defaultProps: {
      label: 'Explorar Documentação',
      shimmerColor: 'cyan',
      speed: 3,
    },
    sampleCode: `import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function ShimmerButton({ label = "Shimmer Button" }) {
  return (
    <button className="relative p-px overflow-hidden rounded-full font-medium group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 animate-[spin_3s_linear_infinite]" />
      <div className="relative px-6 py-2.5 rounded-full bg-zinc-950 text-white text-sm flex items-center gap-2 group-hover:bg-zinc-900 transition-colors">
        <span>{label}</span>
        <ArrowUpRight className="w-4 h-4 text-cyan-400" />
      </div>
    </button>
  );
}`,
  },

  'magnetic-button': {
    type: 'magnetic-button',
    name: 'Magnetic Button',
    category: 'Buttons & Actions',
    description: 'Botão com atração magnética calculada por física de molas que atrai o botão e o texto suavemente na direção do cursor do usuário.',
    iconName: 'Magnet',
    badge: 'Physics Action',
    registryName: 'magnetic-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Texto do Botão', type: 'text', defaultValue: 'Magnetic Feel' },
      { key: 'strength', label: 'Força Magnética', type: 'number', defaultValue: 0.35, min: 0.1, max: 0.8, step: 0.05 },
    ],
    defaultProps: {
      label: 'Magnetic Feel',
      strength: 0.35,
    },
    sampleCode: `import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export function MagneticButton({ label = "Magnetic" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.35);
    y.set((clientY - (top + height / 2)) * 0.35);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="px-6 py-3 rounded-full bg-zinc-900 border border-white/20 text-white"
    >
      {label}
    </motion.button>
  );
}`,
  },

  'hold-confirm-button': {
    type: 'hold-confirm-button',
    name: 'Hold Confirm Button',
    category: 'Buttons & Actions',
    description: 'Botão de confirmação de segurança com anel de preenchimento contínuo enquanto pressionado, feedback tátil e gatilho de sucesso.',
    iconName: 'CheckCircle2',
    badge: 'Interactive Action',
    registryName: 'hold-confirm-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Texto em Espera', type: 'text', defaultValue: 'Segure para Confirmar' },
      { key: 'successText', label: 'Texto ao Concluir', type: 'text', defaultValue: 'Ação Confirmada!' },
      { key: 'durationMs', label: 'Tempo de Pressionamento (ms)', type: 'number', defaultValue: 1500, min: 800, max: 3000, step: 200 },
    ],
    defaultProps: {
      label: 'Segure para Confirmar',
      successText: 'Ação Confirmada!',
      durationMs: 1500,
    },
    sampleCode: `import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export function HoldConfirmButton({ label = "Hold to Confirm", duration = 1500, onConfirm }) {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const timerRef = useRef<any>(null);

  const startHold = () => {
    const start = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timerRef.current);
        setConfirmed(true);
        onConfirm?.();
      }
    }, 16);
  };

  const cancelHold = () => {
    clearInterval(timerRef.current);
    if (!confirmed) setProgress(0);
  };

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      className="relative px-6 py-3 rounded-full bg-zinc-900 border border-white/10 overflow-hidden text-white font-medium"
    >
      <div
        className="absolute inset-0 bg-cyan-500/30 transition-all"
        style={{ width: \`\${progress}%\` }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {confirmed ? <Check className="w-4 h-4 text-cyan-400" /> : null}
        {confirmed ? "Confirmado!" : label}
      </span>
    </button>
  );
}`,
  },

  'gooey-fab': {
    type: 'gooey-fab',
    name: 'Gooey FAB',
    category: 'Buttons & Actions',
    description: 'Botão de ação flutuante (FAB) que utiliza filtros SVG gooey reais para gerar separação e fusão orgânica de sub-ações líquidas.',
    iconName: 'Layers',
    badge: 'Physics Filter',
    registryName: 'gooey-fab',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'mainIcon', label: 'Ação Primária', type: 'text', defaultValue: 'Plus' },
      { key: 'actionCount', label: 'Quantidade de Ações', type: 'number', defaultValue: 3, min: 2, max: 4, step: 1 },
      { key: 'color', label: 'Cor de Destaque', type: 'select', defaultValue: 'cyan', options: [{ label: 'Cyan Luminescence', value: 'cyan' }, { label: 'Emerald Glow', value: 'emerald' }, { label: 'Violet Flare', value: 'violet' }] },
    ],
    defaultProps: {
      mainIcon: 'Plus',
      actionCount: 3,
      color: 'cyan',
    },
    sampleCode: `import { motion } from "motion/react";
import { useState } from "react";
import { Plus, Sparkles, Share2, Download } from "lucide-react";

export function GooeyFab() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: "url(#goo)" }} className="relative flex flex-col items-center">
        {open && [Share2, Download, Sparkles].map((Icon, i) => (
          <motion.button
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -(i + 1) * 52, opacity: 1 }}
            className="absolute w-12 h-12 rounded-full bg-cyan-500 text-zinc-950 flex items-center justify-center shadow-lg"
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        ))}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-cyan-400 text-zinc-950 flex items-center justify-center font-bold shadow-xl"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}`,
  },

  'spotlight-card': {
    type: 'spotlight-card',
    name: 'Spotlight Card & Border Beam',
    category: 'Cards & Layout',
    description: 'Cartão sofisticado com spotlight radial dinâmico que rastreia as coordenadas do mouse e feixe de borda iluminado (Border Beam).',
    iconName: 'CreditCard',
    badge: 'GodUI Surface',
    registryName: 'spotlight-card',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'title', label: 'Título do Cartão', type: 'text', defaultValue: 'Optical Substrate' },
      { key: 'description', label: 'Descrição', type: 'text', defaultValue: 'Superfície com refração interna, malha escura de precisão e reflexo especular dinâmico.' },
      { key: 'enableBorderBeam', label: 'Ativar Feixe de Borda (Border Beam)', type: 'boolean', defaultValue: true },
      { key: 'spotlightColor', label: 'Cor do Spotlight', type: 'select', defaultValue: 'rgba(6, 182, 212, 0.15)', options: [{ label: 'Cyan Soft', value: 'rgba(6, 182, 212, 0.15)' }, { label: 'Violet Soft', value: 'rgba(168, 85, 247, 0.15)' }, { label: 'White Specular', value: 'rgba(255, 255, 255, 0.12)' }] },
      { key: 'tagText', label: 'Etiqueta / Badge', type: 'text', defaultValue: '0% CSS Conflict' },
    ],
    defaultProps: {
      title: 'Optical Substrate',
      description: 'Superfície com refração interna, malha escura de precisão e reflexo especular dinâmico.',
      enableBorderBeam: true,
      spotlightColor: 'rgba(6, 182, 212, 0.15)',
      tagText: '0% CSS Conflict',
    },
    sampleCode: `import { useRef, useState } from "react";
import { motion } from "motion/react";

export function SpotlightCard({ title, description }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (rect) setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: \`radial-gradient(400px circle at \${pos.x}px \${pos.y}px, rgba(6,182,212,0.15), transparent 80%)\`,
        }}
      />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-zinc-400">{description}</p>
    </div>
  );
}`,
  },

  'tilt-3d-card': {
    type: 'tilt-3d-card',
    name: '3D Gyro Tilt Card',
    category: 'Cards & Layout',
    description: 'Cartão 3D imersivo com inclinação baseada na rotação do mouse (`perspective: 1000px`), camadas Z elevadas e brilho especular.',
    iconName: 'Box',
    badge: '3D Spatial',
    registryName: 'tilt-card',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'title', label: 'Título do Cartão', type: 'text', defaultValue: 'Spatial Gyro Substrate' },
      { key: 'badge', label: 'Badge Superior', type: 'text', defaultValue: 'Z-Space 3D' },
      { key: 'maxTilt', label: 'Ângulo Máximo de Inclinação (°)', type: 'number', defaultValue: 18, min: 8, max: 30, step: 2 },
      { key: 'glareOpacity', label: 'Opacidade do Brilho Especular', type: 'number', defaultValue: 0.35, min: 0.1, max: 0.8, step: 0.05 },
    ],
    defaultProps: {
      title: 'Spatial Gyro Substrate',
      badge: 'Z-Space 3D',
      maxTilt: 18,
      glareOpacity: 0.35,
    },
    sampleCode: `import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function Tilt3DCard({ title = "3D Card" }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative rounded-2xl bg-zinc-900/80 border border-white/10 p-8 perspective-1000 shadow-2xl"
    >
      <div style={{ transform: "translateZ(40px)" }}>
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>
    </motion.div>
  );
}`,
  },

  'bento-grid': {
    type: 'bento-grid',
    name: 'Bento Grid',
    category: 'Cards & Layout',
    description: 'Grid assimétrico moderno para apresentação de arquitetura, métricas, atalhos de comando e micro-superfícies interativas.',
    iconName: 'LayoutGrid',
    badge: 'GodUI Layout',
    registryName: 'bento-grid',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'headline', label: 'Cabeçalho da Seção', type: 'text', defaultValue: 'Arquitetura GodUI' },
      { key: 'columns', label: 'Número de Colunas (Desktop)', type: 'select', defaultValue: 3, options: [{ label: '3 Colunas Balanceadas', value: 3 }, { label: '2 Colunas Largas', value: 2 }] },
      { key: 'showLiveStats', label: 'Exibir Métricas em Tempo Real', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      headline: 'Arquitetura GodUI',
      columns: 3,
      showLiveStats: true,
    },
    sampleCode: `export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto p-4">
      {children}
    </div>
  );
}`,
  },

  'aurora-text': {
    type: 'aurora-text',
    name: 'Aurora Text',
    category: 'Typography & AI',
    description: 'Tipografia com gradiente multicamadas animado em fluxo contínuo, simulando a refração de luz da aurora boreal.',
    iconName: 'Type',
    badge: 'Typography',
    registryName: 'aurora-text',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'text', label: 'Texto do Título', type: 'text', defaultValue: 'Motion Craft & Fluid Glass' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text', defaultValue: 'Componentes reativos reais projetados para interfaces de próxima geração.' },
      { key: 'asHeading', label: 'Tag HTML (H1 / H2)', type: 'select', defaultValue: 'h1', options: [{ label: 'H1 Display', value: 'h1' }, { label: 'H2 Section', value: 'h2' }] },
      { key: 'speed', label: 'Velocidade do Gradiente (s)', type: 'number', defaultValue: 6, min: 2, max: 12, step: 1 },
    ],
    defaultProps: {
      text: 'Motion Craft & Fluid Glass',
      subtitle: 'Componentes reativos reais projetados para interfaces de próxima geração.',
      asHeading: 'h1',
      speed: 6,
    },
    sampleCode: `import { motion } from "motion/react";

export function AuroraText({ text = "Aurora Text" }) {
  return (
    <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold tracking-tight">
      {text}
    </span>
  );
}`,
  },

  'voice-orb': {
    type: 'voice-orb',
    name: 'AI Voice Orb & Composer',
    category: 'Typography & AI',
    description: 'Orbe de inteligência artificial interativo que responde à voz e toques com ondas de frequência e caixa de comandos moderna.',
    iconName: 'Mic',
    badge: 'AI Interface',
    registryName: 'voice-orb',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'statusLabel', label: 'Estado do Orbe', type: 'text', defaultValue: 'Listening to commands...' },
      { key: 'orbColor', label: 'Esquema de Cores', type: 'select', defaultValue: 'cyan-violet', options: [{ label: 'Cyan to Violet', value: 'cyan-violet' }, { label: 'Emerald to Cyan', value: 'emerald-cyan' }, { label: 'Amber Solar', value: 'amber-solar' }] },
      { key: 'interactiveVoice', label: 'Simular Ondas de Áudio', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      statusLabel: 'Listening to commands...',
      orbColor: 'cyan-violet',
      interactiveVoice: true,
    },
    sampleCode: `import { motion } from "motion/react";

export function VoiceOrb() {
  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-emerald-400 shadow-2xl"
      />
    </div>
  );
}`,
  },

  'glass-footer': {
    type: 'glass-footer',
    name: 'Minimal Glass Footer',
    category: 'Footers & Backgrounds',
    description: 'Rodapé de vidro translúcido com indicador de status ao vivo de microsserviços, links rápidos e atalhos de comando.',
    iconName: 'PanelBottom',
    badge: 'Footer',
    registryName: 'glass-footer',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'companyName', label: 'Nome da Empresa / Projeto', type: 'text', defaultValue: 'GodUI Technologies' },
      { key: 'statusBadge', label: 'Texto de Status', type: 'text', defaultValue: 'All systems 100% operational' },
      { key: 'showSocials', label: 'Exibir Redes Sociais', type: 'boolean', defaultValue: true },
      { key: 'newsletterLabel', label: 'Placeholder da Newsletter', type: 'text', defaultValue: 'Enter your email for updates...' },
    ],
    defaultProps: {
      companyName: 'GodUI Technologies',
      statusBadge: 'All systems 100% operational',
      showSocials: true,
      newsletterLabel: 'Enter your email for updates...',
    },
    sampleCode: `import { ShieldCheck, Github, Twitter } from "lucide-react";

export function GlassFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl px-8 py-8 text-zinc-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-300">All systems 100% operational</span>
        </div>
        <p className="text-xs">© 2026 GodUI. Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  );
}`,
  },

  'blueprint-grid': {
    type: 'blueprint-grid',
    name: 'Blueprint Grid Background',
    category: 'Footers & Backgrounds',
    description: 'Grade milimétrica técnica com coordenadas de alta tecnologia, halos luminosos e linhas de régua dinâmicas.',
    iconName: 'Grid',
    badge: 'GodUI Background',
    registryName: 'blueprint-grid',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'gridSize', label: 'Tamanho da Grade (px)', type: 'number', defaultValue: 32, min: 16, max: 64, step: 8 },
      { key: 'glowIntensity', label: 'Brilho Central', type: 'number', defaultValue: 0.6, min: 0.1, max: 1.0, step: 0.1 },
      { key: 'showCoordinates', label: 'Exibir Marcadores de Coordenadas', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      gridSize: 32,
      glowIntensity: 0.6,
      showCoordinates: true,
    },
    sampleCode: `export function BlueprintGrid({ gridSize = 32 }: { gridSize?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: \`linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)\`,
        backgroundSize: \`\${gridSize}px \${gridSize}px\`,
      }}
    />
  );
}`,
  },

  'interactive-3d-mesh': {
    type: 'interactive-3d-mesh',
    name: 'Interactive 3D WebGL Mesh',
    category: 'Footers & Backgrounds',
    description: 'Esfera geodésica Three.js WebGL com rotação inercial e resposta tátil à posição do cursor, renderizada sem conflito de CSS.',
    iconName: 'Globe',
    badge: 'Three.js 3D',
    registryName: 'interactive-3d-mesh',
    dependencies: ['three', '@types/three'],
    propFields: [
      { key: 'wireframe', label: 'Modo Wireframe', type: 'boolean', defaultValue: true },
      { key: 'speed', label: 'Velocidade de Rotação', type: 'number', defaultValue: 1.0, min: 0.2, max: 3.0, step: 0.2 },
      { key: 'opacity', label: 'Opacidade do Canvas', type: 'number', defaultValue: 0.75, min: 0.2, max: 1.0, step: 0.05 },
    ],
    defaultProps: {
      wireframe: true,
      speed: 1.0,
      opacity: 0.75,
    },
    sampleCode: `import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeMesh({ speed = 1.0, wireframe = true }) {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    return () => renderer.dispose();
  }, [speed, wireframe]);
  return <div ref={mountRef} className="w-full h-64" />;
}`,
  },

  'jelly-button': {
    type: 'jelly-button',
    name: 'Jelly Button',
    category: 'Buttons & Actions',
    description: 'Botão squishy que deforma ao pressionar e salta de volta com wobble gelatinoso e física spring de mola orgânica.',
    iconName: 'Sparkles',
    badge: 'Tactile Spring',
    registryName: 'jelly-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Texto do Botão', type: 'text', defaultValue: 'Squishy Jelly' },
      { key: 'squishIntensity', label: 'Intensidade de Deformação', type: 'number', defaultValue: 0.8, min: 0.2, max: 1.0, step: 0.1 },
    ],
    defaultProps: {
      label: 'Squishy Jelly',
      squishIntensity: 0.8,
    },
    sampleCode: `import { motion } from "motion/react";

export function JellyButton({ label = "Squishy Jelly" }) {
  return (
    <motion.button
      whileHover={{ scaleX: 1.06, scaleY: 0.94 }}
      whileTap={{ scaleX: 1.25, scaleY: 0.75 }}
      transition={{ type: "spring", stiffness: 450, damping: 14 }}
      className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold"
    >
      {label}
    </motion.button>
  );
}`,
  },

  'magic-button': {
    type: 'magic-button',
    name: 'Magic Button',
    category: 'Buttons & Actions',
    description: 'Botão 3D pushable com contorno dinâmico arco-íris giratório e face sólida tátil que afunda ao clicar.',
    iconName: 'Wand2',
    badge: '3D Kinetic',
    registryName: 'magic-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Texto do Botão', type: 'text', defaultValue: 'Deploy Project' },
      { key: 'enableRainbowEdge', label: 'Borda Dinâmica Arco-Íris', type: 'boolean', defaultValue: true },
      { key: 'depth', label: 'Profundidade 3D (px)', type: 'number', defaultValue: 4, min: 2, max: 8, step: 1 },
    ],
    defaultProps: {
      label: 'Deploy Project',
      enableRainbowEdge: true,
      depth: 4,
    },
    sampleCode: `import { motion } from "motion/react";

export function MagicButton({ label = "Deploy" }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 animate-spin" />
      <motion.button
        whileTap={{ y: 4 }}
        className="relative px-6 py-3 rounded-2xl bg-zinc-900 text-white font-bold"
      >
        {label}
      </motion.button>
    </div>
  );
}`,
  },

  'mask-button': {
    type: 'mask-button',
    name: 'Mask Reveal Button',
    category: 'Buttons & Actions',
    description: 'Botão que limpa a face exterior ao passar o mouse usando clip-path de máscara animada, revelando a ação interna.',
    iconName: 'Eye',
    badge: 'Clip Mask',
    registryName: 'mask-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'defaultLabel', label: 'Texto Padrão', type: 'text', defaultValue: 'Hover to Unlock' },
      { key: 'revealedLabel', label: 'Texto Revelado', type: 'text', defaultValue: 'Access Granted ✦' },
    ],
    defaultProps: {
      defaultLabel: 'Hover to Unlock',
      revealedLabel: 'Access Granted ✦',
    },
    sampleCode: `import { motion } from "motion/react";
import { useState } from "react";

export function MaskButton({ defaultLabel = "Hover", revealedLabel = "Unlocked" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden px-7 py-3 rounded-2xl font-bold bg-zinc-900 border border-white/20"
    >
      <span>{defaultLabel}</span>
      <motion.div
        animate={{ clipPath: hovered ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        className="absolute inset-0 bg-cyan-400 text-black flex items-center justify-center font-bold"
      >
        {revealedLabel}
      </motion.div>
    </button>
  );
}`,
  },

  'multi-button': {
    type: 'multi-button',
    name: 'Multi Button Action Rail',
    category: 'Buttons & Actions',
    description: 'Trilho de ações compacto em formato de pílula que expande rótulos sob foco/hover e desliza indicador spring.',
    iconName: 'Share2',
    badge: 'Action Rail',
    registryName: 'multi-button',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";

export function MultiButton() {
  const [active, setActive] = useState("like");
  return (
    <div className="inline-flex p-1.5 rounded-full bg-zinc-900/90 border border-white/10">
      {[Heart, Bookmark, Share2].map((Icon, i) => (
        <button key={i} className="px-3 py-1.5 rounded-full text-white">
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}`,
  },

  'magic-input': {
    type: 'magic-input',
    name: 'Magic 3D Input',
    category: 'Inputs & Forms',
    description: 'Campo de texto em camadas 3D que levita no foco, com contorno iluminado, rótulo flutuante e feedback tátil.',
    iconName: 'Search',
    badge: '3D Focus',
    registryName: 'magic-input',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'label', label: 'Rótulo / Descrição', type: 'text', defaultValue: 'AI Query or Command' },
      { key: 'placeholder', label: 'Texto de Exemplo', type: 'text', defaultValue: 'Type prompt or search...' },
      { key: 'enableRainbowEdge', label: 'Borda com Halo Luminoso', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      label: 'AI Query or Command',
      placeholder: 'Type prompt or search...',
      enableRainbowEdge: true,
    },
    sampleCode: `import { motion } from "motion/react";
import { useState } from "react";

export function MagicInput({ placeholder = "Search..." }) {
  const [focus, setFocus] = useState(false);
  return (
    <motion.div animate={{ y: focus ? -3 : 0 }} className="px-4 py-3 rounded-2xl bg-zinc-900 border border-white/20">
      <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={placeholder} className="bg-transparent text-white focus:outline-none" />
    </motion.div>
  );
}`,
  },

  'elastic-text': {
    type: 'elastic-text',
    name: 'Elastic Text',
    category: 'Typography & AI',
    description: 'Tipografia responsiva cujas letras esticam dinamicamente em peso, escala e altura sob aproximação do cursor.',
    iconName: 'Type',
    badge: 'Variable Font',
    registryName: 'elastic-text',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'text', label: 'Texto Exibido', type: 'text', defaultValue: 'ELASTIC MOTION' },
      { key: 'fontSize', label: 'Tamanho da Fonte', type: 'select', defaultValue: 'xl', options: [{ label: 'Médio', value: 'md' }, { label: 'Grande', value: 'lg' }, { label: 'Extra Grande', value: 'xl' }] },
    ],
    defaultProps: {
      text: 'ELASTIC MOTION',
      fontSize: 'xl',
    },
    sampleCode: `import { motion } from "motion/react";

export function ElasticText({ text = "ELASTIC" }) {
  return (
    <div className="flex gap-1 text-5xl font-black">
      {text.split("").map((c, i) => (
        <motion.span key={i} whileHover={{ scale: 1.4, y: -10 }} transition={{ type: "spring", stiffness: 500 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}`,
  },

  'number-ticker': {
    type: 'number-ticker',
    name: 'Number Ticker',
    category: 'Typography & AI',
    description: 'Contador animado em física spring que rola números tabulares com precisão e fluidez matemática ao carregar.',
    iconName: 'Activity',
    badge: 'Spring Counter',
    registryName: 'number-ticker',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'value', label: 'Valor Final', type: 'number', defaultValue: 94820 },
      { key: 'prefix', label: 'Prefixo', type: 'text', defaultValue: '$' },
      { key: 'suffix', label: 'Sufixo', type: 'text', defaultValue: ' USD' },
      { key: 'label', label: 'Legenda do Indicador', type: 'text', defaultValue: 'Volume Transacionado' },
    ],
    defaultProps: {
      value: 94820,
      prefix: '$',
      suffix: ' USD',
      label: 'Volume Transacionado',
    },
    sampleCode: `import { useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function NumberTicker({ value = 50000 }) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const [num, setNum] = useState(0);
  useEffect(() => { spring.set(value); }, [value]);
  useEffect(() => spring.on("change", (v) => setNum(Math.round(v))), [spring]);
  return <span className="font-mono text-4xl font-bold">{num.toLocaleString()}</span>;
}`,
  },

  'scroll-text-reveal': {
    type: 'scroll-text-reveal',
    name: 'Scroll Text Reveal',
    category: 'Typography & AI',
    description: 'Texto cinético que revela palavras progressivamente com luminosidade e desfoque óptico proporcional ao progresso.',
    iconName: 'Sparkles',
    badge: 'Kinetic Reveal',
    registryName: 'scroll-text-reveal',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'text', label: 'Texto do Parágrafo', type: 'text', defaultValue: 'Interfaces táteis de alta fidelidade esculpidas com física elástica e refração vítrea.' },
    ],
    defaultProps: {
      text: 'Interfaces táteis de alta fidelidade esculpidas com física elástica e refração vítrea.',
    },
    sampleCode: `export function ScrollReveal({ text }) {
  const words = text.split(" ");
  return (
    <p className="text-2xl font-bold">
      {words.map((w, i) => (
        <span key={i} className="mr-2 text-white/40 hover:text-white transition-colors">{w}</span>
      ))}
    </p>
  );
}`,
  },

  'lamp': {
    type: 'lamp',
    name: 'Lamp Conic Spotlight',
    category: 'Creative & Shaders',
    description: 'Lâmpada de gradiente cônico duplo espelhado que ilumina títulos com feixe de luz superior, filamento laser e bloom difuso.',
    iconName: 'SunMedium',
    badge: 'Atmospheric Conic',
    registryName: 'lamp',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'headline', label: 'Título Principal', type: 'text', defaultValue: 'Construa com a Real Arquitetura GodUI' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text', defaultValue: 'Precisão matemática, física de molas e fusão de efeitos em tempo real.' },
    ],
    defaultProps: {
      headline: 'Construa com a Real Arquitetura GodUI',
      subtitle: 'Precisão matemática, física de molas e fusão de efeitos em tempo real.',
    },
    sampleCode: `import { motion } from "motion/react";

export function Lamp({ headline = "GodUI Lamp" }) {
  return (
    <div className="relative min-h-[400px] flex items-center justify-center bg-zinc-950">
      <div className="absolute top-12 w-64 h-32 bg-cyan-500 blur-3xl opacity-50 rounded-full" />
      <h2 className="relative z-10 text-4xl font-extrabold text-white">{headline}</h2>
    </div>
  );
}`,
  },

  'ascii-dither': {
    type: 'ascii-dither',
    name: 'ASCII Dither Matrix Shader',
    category: 'Creative & Shaders',
    description: 'Renderizador de matriz ASCII e pontilhismo halftone em canvas HTML5 com distúrbio inercial de cursor e scanlines retrô.',
    iconName: 'Terminal',
    badge: 'Canvas Shader',
    registryName: 'ascii-dither',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'mode', label: 'Modo de Renderização', type: 'select', defaultValue: 'ascii', options: [{ label: 'Caracteres ASCII', value: 'ascii' }, { label: 'Pontos Halftone', value: 'halftone' }] },
      { key: 'interactive', label: 'Interativo com Mouse', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      mode: 'ascii',
      interactive: true,
    },
    sampleCode: `import { useEffect, useRef } from "react";

export function AsciiDither() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 300, 150);
  }, []);
  return <canvas ref={canvasRef} width={300} height={150} />;
}`,
  },

  'inset-glass-card': {
    type: 'inset-glass-card',
    name: 'Inset Glass Card',
    category: 'Cards & Layout',
    description: 'Cartão de vidro com reentrância profunda, reflexo especular dinâmico que segue o cursor e brilho de borda sutil.',
    iconName: 'CreditCard',
    badge: 'Inset Depth',
    registryName: 'inset-glass-card',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'title', label: 'Título do Cartão', type: 'text', defaultValue: 'Ultra-Deep Inset Surface' },
      { key: 'subtitle', label: 'Subtítulo', type: 'text', defaultValue: 'GodUI Glass & Depth Architecture' },
      { key: 'description', label: 'Descrição', type: 'text', defaultValue: 'Combina camadas ópticas de reflexão especular com chanfro interno negativo.' },
      { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Inset Specular' },
      { key: 'insetDepth', label: 'Profundidade do Reentrância', type: 'select', defaultValue: 'deep', options: [{ label: 'Sutil', value: 'subtle' }, { label: 'Profunda', value: 'deep' }, { label: 'Ultra', value: 'ultra' }] },
      { key: 'specularHighlight', label: 'Destaque Especular', type: 'boolean', defaultValue: true },
      { key: 'borderGlow', label: 'Brilho de Borda', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      title: 'Ultra-Deep Inset Surface',
      subtitle: 'GodUI Glass & Depth Architecture',
      description: 'Combina camadas ópticas de reflexão especular com chanfro interno negativo.',
      badge: 'Inset Specular',
      insetDepth: 'deep',
      specularHighlight: true,
      borderGlow: true,
    },
    sampleCode: `import { motion } from "motion/react";

export function InsetGlassCard({ title = "Inset Card" }) {
  return (
    <div className="rounded-2xl bg-zinc-950/80 border border-white/10 p-6 backdrop-blur-xl shadow-[inset_0_2px_3px_0_rgba(255,255,255,0.25),inset_0_-3px_8px_0_rgba(0,0,0,0.85)]">
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
  );
}`,
  },

  'scroll-glow-container': {
    type: 'scroll-glow-container',
    name: 'Scroll Glow Container',
    category: 'Cards & Layout',
    description: 'Container com brilho reativo ao scroll, barra de progresso luminosa e spotlight aurora dinâmico.',
    iconName: 'Scroll',
    badge: 'Scroll Reactive',
    registryName: 'scroll-glow-container',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'intensity', label: 'Intensidade do Brilho', type: 'number', defaultValue: 0.8, min: 0.1, max: 1.0, step: 0.1 },
      { key: 'syncWithMouse', label: 'Sincronizar com Mouse', type: 'boolean', defaultValue: true },
    ],
    defaultProps: {
      intensity: 0.8,
      syncWithMouse: true,
    },
    sampleCode: `import { motion } from "motion/react";

export function ScrollGlowContainer({ children }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-white/10">
        <div className="h-full w-1/3 bg-cyan-500 shadow-[0_0_16px_2px_rgba(6,182,212,0.4)]" />
      </div>
      <div className="relative z-20">{children}</div>
    </div>
  );
}`,
  },

  // Buttons
  'progress-fold-button': {
    type: 'progress-fold-button',
    name: 'Progress Fold Button',
    category: 'Buttons & Actions',
    description: 'Botão com animação de dobra e barra de progresso.',
    iconName: 'FoldVertical',
    badge: 'Fold Effect',
    registryName: 'progress-fold-button',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'label', label: 'Texto do Botão', type: 'text', defaultValue: 'Fold & Submit' },
      { key: 'progress', label: 'Progresso (0-100)', type: 'number', defaultValue: 0, min: 0, max: 100, step: 1 },
    ],
    defaultProps: { label: 'Fold & Submit', progress: 0 },
    sampleCode: `import { motion } from "motion/react";\nexport function ProgressFoldButton() {\n  return <button className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white">Fold</button>;\n}`,
  },
  'slide-confirm-button': {
    type: 'slide-confirm-button',
    name: 'Slide Confirm Button',
    category: 'Buttons & Actions',
    description: 'Botão de confirmação por deslize.',
    iconName: 'SlidersHorizontal',
    badge: 'Slide Confirm',
    registryName: 'slide-confirm-button',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'label', label: 'Texto', type: 'text', defaultValue: 'Slide to Confirm' },
      { key: 'confirmLabel', label: 'Texto de Confirmação', type: 'text', defaultValue: 'Confirmed!' },
    ],
    defaultProps: { label: 'Slide to Confirm', confirmLabel: 'Confirmed!' },
    sampleCode: `import { motion } from "motion/react";\nexport function SlideConfirmButton() {\n  return <div className="h-12 rounded-full bg-zinc-900">Slide</div>;\n}`,
  },
  // Inputs
  'otp-input': {
    type: 'otp-input',
    name: 'OTP Input',
    category: 'Inputs & Forms',
    description: 'Campo de entrada OTP de 6 dígitos.',
    iconName: 'Hash',
    badge: 'OTP',
    registryName: 'otp-input',
    dependencies: [],
    propFields: [
      { key: 'length', label: 'Comprimento', type: 'number', defaultValue: 6, min: 4, max: 8, step: 1 },
    ],
    defaultProps: { length: 6 },
    sampleCode: `export function OtpInput() {\n  return <div className="flex gap-2">OTP</div>;\n}`,
  },
  // Navigation
  'breadcrumbs': {
    type: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Navigation & Overlays',
    description: 'Navegação breadcrumb.',
    iconName: 'ChevronRight',
    badge: 'Navigation',
    registryName: 'breadcrumbs',
    dependencies: ['lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function Breadcrumbs() {\n  return <nav>Home / Page</nav>;\n}`,
  },
  'combobox': {
    type: 'combobox',
    name: 'Combobox',
    category: 'Navigation & Overlays',
    description: 'Caixa de combinação dropdown.',
    iconName: 'ChevronDown',
    badge: 'Dropdown',
    registryName: 'combobox',
    dependencies: ['lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function Combobox() {\n  return <div>Select...</div>;\n}`,
  },
  'context-menu': {
    type: 'context-menu',
    name: 'Context Menu',
    category: 'Navigation & Overlays',
    description: 'Menu de contexto.',
    iconName: 'Menu',
    badge: 'Context',
    registryName: 'context-menu',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ContextMenu() {\n  return <div>Context Menu</div>;\n}`,
  },
  'dropdown-menu': {
    type: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Navigation & Overlays',
    description: 'Menu dropdown.',
    iconName: 'ChevronDown',
    badge: 'Dropdown',
    registryName: 'dropdown-menu',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'trigger', label: 'Texto do Gatilho', type: 'text', defaultValue: 'Menu' },
    ],
    defaultProps: { trigger: 'Menu' },
    sampleCode: `export function DropdownMenu() {\n  return <button>Menu</button>;\n}`,
  },
  'filter-bar': {
    type: 'filter-bar',
    name: 'Filter Bar',
    category: 'Navigation & Overlays',
    description: 'Barra de filtros com pills.',
    iconName: 'Filter',
    badge: 'Filter',
    registryName: 'filter-bar',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function FilterBar() {\n  return <div>Filters</div>;\n}`,
  },
  'magic-tab': {
    type: 'magic-tab',
    name: 'Magic Tab',
    category: 'Navigation & Overlays',
    description: 'Abas com animação mágica.',
    iconName: 'Tabs',
    badge: 'Tab',
    registryName: 'magic-tab',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function MagicTab() {\n  return <div>Tabs</div>;\n}`,
  },
  'mega-menu': {
    type: 'mega-menu',
    name: 'Mega Menu',
    category: 'Navigation & Overlays',
    description: 'Menu mega dropdown.',
    iconName: 'LayoutGrid',
    badge: 'Mega',
    registryName: 'mega-menu',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function MegaMenu() {\n  return <div>Mega Menu</div>;\n}`,
  },
  'resizable-header': {
    type: 'resizable-header',
    name: 'Resizable Header',
    category: 'Navigation & Overlays',
    description: 'Cabeçalho redimensionável.',
    iconName: 'GripVertical',
    badge: 'Resizable',
    registryName: 'resizable-header',
    dependencies: [],
    propFields: [
      { key: 'minWidth', label: 'Largura Mínima', type: 'number', defaultValue: 80, min: 40, max: 200, step: 10 },
    ],
    defaultProps: { minWidth: 80 },
    sampleCode: `export function ResizableHeader() {\n  return <th>Header</th>;\n}`,
  },
  'segmented-control': {
    type: 'segmented-control',
    name: 'Segmented Control',
    category: 'Navigation & Overlays',
    description: 'Controle segmentado.',
    iconName: 'LayoutList',
    badge: 'Segment',
    registryName: 'segmented-control',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function SegmentedControl() {\n  return <div>Control</div>;\n}`,
  },
  'tab-bar': {
    type: 'tab-bar',
    name: 'Tab Bar',
    category: 'Navigation & Overlays',
    description: 'Barra de abas.',
    iconName: 'LayoutList',
    badge: 'TabBar',
    registryName: 'tab-bar',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function TabBar() {\n  return <div>Tabs</div>;\n}`,
  },
  // Overlays
  'animated-tooltip': {
    type: 'animated-tooltip',
    name: 'Animated Tooltip',
    category: 'Navigation & Overlays',
    description: 'Tooltip animado.',
    iconName: 'Info',
    badge: 'Tooltip',
    registryName: 'animated-tooltip',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'content', label: 'Conteúdo', type: 'text', defaultValue: 'Tooltip' },
    ],
    defaultProps: { content: 'Tooltip' },
    sampleCode: `export function AnimatedTooltip() {\n  return <div>Tooltip</div>;\n}`,
  },
  'command-palette': {
    type: 'command-palette',
    name: 'Command Palette',
    category: 'Navigation & Overlays',
    description: 'Paleta de comandos (Cmd+K).',
    iconName: 'Command',
    badge: 'CmdK',
    registryName: 'command-palette',
    dependencies: ['lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function CommandPalette() {\n  return <div>Command Palette</div>;\n}`,
  },
  'drawer': {
    type: 'drawer',
    name: 'Drawer',
    category: 'Navigation & Overlays',
    description: 'Gaveta lateral.',
    iconName: 'PanelRight',
    badge: 'Drawer',
    registryName: 'drawer',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'side', label: 'Lado', type: 'select', defaultValue: 'right', options: [{ label: 'Direita', value: 'right' }, { label: 'Esquerda', value: 'left' }] },
    ],
    defaultProps: { side: 'right' },
    sampleCode: `export function Drawer() {\n  return <div>Drawer</div>;\n}`,
  },
  'morphing-dialog': {
    type: 'morphing-dialog',
    name: 'Morphing Dialog',
    category: 'Navigation & Overlays',
    description: 'Diálogo com morphing.',
    iconName: 'Maximize2',
    badge: 'Dialog',
    registryName: 'morphing-dialog',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function MorphingDialog() {\n  return <div>Dialog</div>;\n}`,
  },
  'toast': {
    type: 'toast',
    name: 'Toast',
    category: 'Navigation & Overlays',
    description: 'Notificação toast.',
    iconName: 'Bell',
    badge: 'Toast',
    registryName: 'toast',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'message', label: 'Mensagem', type: 'text', defaultValue: 'Notification' },
    ],
    defaultProps: { message: 'Notification' },
    sampleCode: `export function Toast() {\n  return <div>Toast</div>;\n}`,
  },

  // Layout
  'accordion': {
    type: 'accordion',
    name: 'Accordion',
    category: 'Cards & Layout',
    description: 'Acordeão recolhível.',
    iconName: 'ChevronDown',
    badge: 'Accordion',
    registryName: 'accordion',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function Accordion() {\n  return <div>Accordion</div>;\n}`,
  },
  'animated-testimonials': {
    type: 'animated-testimonials',
    name: 'Animated Testimonials',
    category: 'Cards & Layout',
    description: 'Depoimentos animados.',
    iconName: 'Quote',
    badge: 'Testimonials',
    registryName: 'animated-testimonials',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function AnimatedTestimonials() {\n  return <div>Testimonials</div>;\n}`,
  },
  'app-showcase': {
    type: 'app-showcase',
    name: 'App Showcase',
    category: 'Cards & Layout',
    description: 'Vitrine de aplicativo.',
    iconName: 'Smartphone',
    badge: 'Showcase',
    registryName: 'app-showcase',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function AppShowcase() {\n  return <div>Showcase</div>;\n}`,
  },
  'avatar-group': {
    type: 'avatar-group',
    name: 'Avatar Group',
    category: 'Cards & Layout',
    description: 'Grupo de avatares.',
    iconName: 'Users',
    badge: 'Avatars',
    registryName: 'avatar-group',
    dependencies: [],
    propFields: [
      { key: 'max', label: 'Máximo Visível', type: 'number', defaultValue: 4, min: 2, max: 10, step: 1 },
    ],
    defaultProps: { max: 4 },
    sampleCode: `export function AvatarGroup() {\n  return <div>Avatars</div>;\n}`,
  },
  'card-swap': {
    type: 'card-swap',
    name: 'Card Swap',
    category: 'Cards & Layout',
    description: 'Cartões que trocam posições.',
    iconName: 'RefreshCw',
    badge: 'Card Swap',
    registryName: 'card-swap',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function CardSwap() {\n  return <div>Card Swap</div>;\n}`,
  },
  'container-scroll': {
    type: 'container-scroll',
    name: 'Container Scroll',
    category: 'Cards & Layout',
    description: 'Container com scroll ativado.',
    iconName: 'Scroll',
    badge: 'Scroll',
    registryName: 'container-scroll',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ContainerScroll() {\n  return <div>Scroll</div>;\n}`,
  },
  'cover-flow': {
    type: 'cover-flow',
    name: 'Cover Flow',
    category: 'Cards & Layout',
    description: 'Carrossel cover flow.',
    iconName: 'Layers',
    badge: 'Cover Flow',
    registryName: 'cover-flow',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function CoverFlow() {\n  return <div>Cover Flow</div>;\n}`,
  },
  'gooey-stack': {
    type: 'gooey-stack',
    name: 'Gooey Stack',
    category: 'Cards & Layout',
    description: 'Pilha com efeito gooey.',
    iconName: 'Layers',
    badge: 'Gooey',
    registryName: 'gooey-stack',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function GooeyStack() {\n  return <div>Gooey Stack</div>;\n}`,
  },
  'hero-parallax': {
    type: 'hero-parallax',
    name: 'Hero Parallax',
    category: 'Cards & Layout',
    description: 'Seção hero com parallax.',
    iconName: 'ArrowUp',
    badge: 'Parallax',
    registryName: 'hero-parallax',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Hero Title' },
    ],
    defaultProps: { title: 'Hero Title' },
    sampleCode: `export function HeroParallax() {\n  return <div>Hero</div>;\n}`,
  },
  'image-accordion': {
    type: 'image-accordion',
    name: 'Image Accordion',
    category: 'Cards & Layout',
    description: 'Acordeão de imagens.',
    iconName: 'Image',
    badge: 'Accordion',
    registryName: 'image-accordion',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ImageAccordion() {\n  return <div>Image Accordion</div>;\n}`,
  },
  'image-compare': {
    type: 'image-compare',
    name: 'Image Compare',
    category: 'Cards & Layout',
    description: 'Comparação de imagens.',
    iconName: 'ArrowLeftRight',
    badge: 'Compare',
    registryName: 'image-compare',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ImageCompare() {\n  return <div>Compare</div>;\n}`,
  },
  'inertia-gallery': {
    type: 'inertia-gallery',
    name: 'Inertia Gallery',
    category: 'Cards & Layout',
    description: 'Galeria com inércia.',
    iconName: 'Grip',
    badge: 'Gallery',
    registryName: 'inertia-gallery',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function InertiaGallery() {\n  return <div>Gallery</div>;\n}`,
  },
  'morph-gallery': {
    type: 'morph-gallery',
    name: 'Morph Gallery',
    category: 'Cards & Layout',
    description: 'Galeria com morphing.',
    iconName: 'Image',
    badge: 'Gallery',
    registryName: 'morph-gallery',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function MorphGallery() {\n  return <div>Morph Gallery</div>;\n}`,
  },
  'orbit-carousel': {
    type: 'orbit-carousel',
    name: 'Orbit Carousel',
    category: 'Cards & Layout',
    description: 'Carrossel orbital.',
    iconName: 'Circle',
    badge: 'Orbit',
    registryName: 'orbit-carousel',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function OrbitCarousel() {\n  return <div>Orbit</div>;\n}`,
  },
  'progressive-card-reveal': {
    type: 'progressive-card-reveal',
    name: 'Progressive Card Reveal',
    category: 'Cards & Layout',
    description: 'Revelação progressiva de cartões.',
    iconName: 'Layers',
    badge: 'Reveal',
    registryName: 'progressive-card-reveal',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ProgressiveCardReveal() {\n  return <div>Reveal</div>;\n}`,
  },
  'reorder-list': {
    type: 'reorder-list',
    name: 'Reorder List',
    category: 'Cards & Layout',
    description: 'Lista reordenável.',
    iconName: 'GripVertical',
    badge: 'Reorder',
    registryName: 'reorder-list',
    dependencies: ['lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ReorderList() {\n  return <div>Reorder</div>;\n}`,
  },
  'scroll-stack': {
    type: 'scroll-stack',
    name: 'Scroll Stack',
    category: 'Cards & Layout',
    description: 'Pilha com scroll.',
    iconName: 'Layers',
    badge: 'Stack',
    registryName: 'scroll-stack',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ScrollStack() {\n  return <div>Stack</div>;\n}`,
  },
  'spin-viewer': {
    type: 'spin-viewer',
    name: 'Spin Viewer',
    category: 'Cards & Layout',
    description: 'Visualizador 360°.',
    iconName: 'RotateCw',
    badge: '360°',
    registryName: 'spin-viewer',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function SpinViewer() {\n  return <div>Spin</div>;\n}`,
  },
  'split-flap-display': {
    type: 'split-flap-display',
    name: 'Split Flap Display',
    category: 'Cards & Layout',
    description: 'Display split-flap.',
    iconName: 'FlipVertical',
    badge: 'Split Flap',
    registryName: 'split-flap-display',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function SplitFlapDisplay() {\n  return <div>Split Flap</div>;\n}`,
  },
  'stepper': {
    type: 'stepper',
    name: 'Stepper',
    category: 'Cards & Layout',
    description: 'Indicador de passos.',
    iconName: 'Check',
    badge: 'Stepper',
    registryName: 'stepper',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function Stepper() {\n  return <div>Stepper</div>;\n}`,
  },
  'sticky-scroll': {
    type: 'sticky-scroll',
    name: 'Sticky Scroll',
    category: 'Cards & Layout',
    description: 'Scroll sticky.',
    iconName: 'Pin',
    badge: 'Sticky',
    registryName: 'sticky-scroll',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function StickyScroll() {\n  return <div>Sticky</div>;\n}`,
  },
  'stack-badge': {
    type: 'stack-badge',
    name: 'Stack Badge',
    category: 'Cards & Layout',
    description: 'Badges empilhados.',
    iconName: 'Layers',
    badge: 'Stack',
    registryName: 'stack-badge',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function StackBadge() {\n  return <div>Badges</div>;\n}`,
  },
  'store-badge': {
    type: 'store-badge',
    name: 'Store Badge',
    category: 'Cards & Layout',
    description: 'Badge de loja de aplicativos.',
    iconName: 'Download',
    badge: 'Store',
    registryName: 'store-badge',
    dependencies: [],
    propFields: [
      { key: 'platform', label: 'Plataforma', type: 'select', defaultValue: 'ios', options: [{ label: 'iOS', value: 'ios' }, { label: 'Android', value: 'android' }] },
    ],
    defaultProps: { platform: 'ios' },
    sampleCode: `export function StoreBadge() {\n  return <div>Store</div>;\n}`,
  },
  'swipe-deck': {
    type: 'swipe-deck',
    name: 'Swipe Deck',
    category: 'Cards & Layout',
    description: 'Deck de cartões para deslizar.',
    iconName: 'ArrowLeftRight',
    badge: 'Swipe',
    registryName: 'swipe-deck',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function SwipeDeck() {\n  return <div>Swipe</div>;\n}`,
  },
  'three-d-marquee': {
    type: 'three-d-marquee',
    name: '3D Marquee',
    category: 'Cards & Layout',
    description: 'Marquee 3D.',
    iconName: 'Layers',
    badge: '3D',
    registryName: 'three-d-marquee',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'speed', label: 'Velocidade', type: 'number', defaultValue: 20, min: 5, max: 50, step: 5 },
    ],
    defaultProps: { speed: 20 },
    sampleCode: `export function ThreeDMarquee() {\n  return <div>Marquee</div>;\n}`,
  },
  'holographic-card': {
    type: 'holographic-card',
    name: 'Holographic Card',
    category: 'Cards & Layout',
    description: 'Cartão holográfico.',
    iconName: 'Sparkles',
    badge: 'Holographic',
    registryName: 'holographic-card',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function HolographicCard() {\n  return <div>Holographic</div>;\n}`,
  },

  // Effects
  'beam-draw': {
    type: 'beam-draw',
    name: 'Beam Draw',
    category: 'Effects & Backgrounds',
    description: 'Efeito de desenho de feixe.',
    iconName: 'PenTool',
    badge: 'Beam',
    registryName: 'beam-draw',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'duration', label: 'Duração (s)', type: 'number', defaultValue: 2, min: 0.5, max: 5, step: 0.5 },
    ],
    defaultProps: { duration: 2 },
    sampleCode: `export function BeamDraw() {\n  return <div>Beam</div>;\n}`,
  },
  'border-beam': {
    type: 'border-beam',
    name: 'Border Beam',
    category: 'Effects & Backgrounds',
    description: 'Feixe de luz que viaja ou respira na borda de qualquer elemento — extraído do Libraries.dev border-beam com famílias rotate e pulse, palettes colorful/mono/ocean/sunset e strength 0–1.',
    iconName: 'Square',
    badge: 'Libraries.dev',
    registryName: 'border-beam',
    dependencies: ['clsx', 'tailwind-merge'],
    propFields: [
      {
        key: 'size',
        label: 'Variante',
        type: 'select',
        defaultValue: 'md',
        options: [
          { label: 'md — borda completa', value: 'md' },
          { label: 'sm — compacto', value: 'sm' },
          { label: 'line — aresta inferior', value: 'line' },
          { label: 'pulse-inner — respiração interna', value: 'pulse-inner' },
          { label: 'pulse-outside — halo externo', value: 'pulse-outside' },
        ],
      },
      {
        key: 'colorVariant',
        label: 'Paleta',
        type: 'select',
        defaultValue: 'colorful',
        options: [
          { label: 'Colorful (tema)', value: 'colorful' },
          { label: 'Mono', value: 'mono' },
          { label: 'Ocean', value: 'ocean' },
          { label: 'Sunset', value: 'sunset' },
        ],
      },
      { key: 'duration', label: 'Duração do ciclo (s)', type: 'number', defaultValue: 1.96, min: 0.5, max: 8, step: 0.14 },
      { key: 'strength', label: 'Intensidade (0-1)', type: 'number', defaultValue: 1, min: 0.1, max: 1, step: 0.1 },
      { key: 'active', label: 'Animação ativa', type: 'boolean', defaultValue: true },
    ],
    defaultProps: { size: 'md', colorVariant: 'colorful', duration: 1.96, strength: 1, active: true },
    sampleCode: `import { BorderBeam } from "@/src/components/godui/BorderBeam";

export function Card() {
  return (
    <BorderBeam size="md" colorVariant="colorful" strength={1}>
      <div className="rounded-2xl bg-zinc-950 p-8 border border-white/10">
        Content with border beam
      </div>
    </BorderBeam>
  );
}`,
  },
  'confetti': {
    type: 'confetti',
    name: 'Confetti',
    category: 'Effects & Backgrounds',
    description: 'Animação de confete.',
    iconName: 'PartyPopper',
    badge: 'Confetti',
    registryName: 'confetti',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'count', label: 'Quantidade', type: 'number', defaultValue: 50, min: 10, max: 100, step: 10 },
    ],
    defaultProps: { count: 50 },
    sampleCode: `export function Confetti() {\n  return <div>Confetti</div>;\n}`,
  },
  'encrypted-card': {
    type: 'encrypted-card',
    name: 'Encrypted Card',
    category: 'Effects & Backgrounds',
    description: 'Cartão com texto criptografado.',
    iconName: 'Lock',
    badge: 'Encrypted',
    registryName: 'encrypted-card',
    dependencies: [],
    propFields: [
      { key: 'text', label: 'Texto', type: 'text', defaultValue: 'Encrypted Text' },
    ],
    defaultProps: { text: 'Encrypted Text' },
    sampleCode: `export function EncryptedCard() {\n  return <div>Encrypted</div>;\n}`,
  },
  'fluid-cursor': {
    type: 'fluid-cursor',
    name: 'Fluid Cursor',
    category: 'Effects & Backgrounds',
    description: 'Cursor fluido.',
    iconName: 'MousePointer',
    badge: 'Cursor',
    registryName: 'fluid-cursor',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function FluidCursor() {\n  return <div>Cursor</div>;\n}`,
  },
  'image-trail': {
    type: 'image-trail',
    name: 'Image Trail',
    category: 'Effects & Backgrounds',
    description: 'Rastro de imagem.',
    iconName: 'Image',
    badge: 'Trail',
    registryName: 'image-trail',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ImageTrail() {\n  return <div>Trail</div>;\n}`,
  },
  'liquid-image': {
    type: 'liquid-image',
    name: 'Liquid Image',
    category: 'Effects & Backgrounds',
    description: 'Imagem líquida.',
    iconName: 'Droplets',
    badge: 'Liquid',
    registryName: 'liquid-image',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function LiquidImage() {\n  return <div>Liquid</div>;\n}`,
  },
  'marquee': {
    type: 'marquee',
    name: 'Marquee',
    category: 'Effects & Backgrounds',
    description: 'Marquee infinito.',
    iconName: 'ArrowRight',
    badge: 'Marquee',
    registryName: 'marquee',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'speed', label: 'Velocidade', type: 'number', defaultValue: 20, min: 5, max: 50, step: 5 },
    ],
    defaultProps: { speed: 20 },
    sampleCode: `export function Marquee() {\n  return <div>Marquee</div>;\n}`,
  },
  'particle-dissolve': {
    type: 'particle-dissolve',
    name: 'Particle Dissolve',
    category: 'Effects & Backgrounds',
    description: 'Dissolução de partículas.',
    iconName: 'Sparkles',
    badge: 'Particles',
    registryName: 'particle-dissolve',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'count', label: 'Quantidade', type: 'number', defaultValue: 30, min: 10, max: 100, step: 10 },
    ],
    defaultProps: { count: 30 },
    sampleCode: `export function ParticleDissolve() {\n  return <div>Particles</div>;\n}`,
  },
  'scroll-progress': {
    type: 'scroll-progress',
    name: 'Scroll Progress',
    category: 'Effects & Backgrounds',
    description: 'Barra de progresso de scroll.',
    iconName: 'Loader',
    badge: 'Progress',
    registryName: 'scroll-progress',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ScrollProgress() {\n  return <div>Progress</div>;\n}`,
  },
  'scroll-reveal': {
    type: 'scroll-reveal',
    name: 'Scroll Reveal',
    category: 'Effects & Backgrounds',
    description: 'Revelação por scroll.',
    iconName: 'Eye',
    badge: 'Reveal',
    registryName: 'scroll-reveal',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ScrollReveal() {\n  return <div>Reveal</div>;\n}`,
  },
  'spotlight-reveal': {
    type: 'spotlight-reveal',
    name: 'Spotlight Reveal',
    category: 'Effects & Backgrounds',
    description: 'Revelação por spotlight.',
    iconName: 'Search',
    badge: 'Spotlight',
    registryName: 'spotlight-reveal',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function SpotlightReveal() {\n  return <div>Spotlight</div>;\n}`,
  },
  'terminal': {
    type: 'terminal',
    name: 'Terminal',
    category: 'Effects & Backgrounds',
    description: 'Emulador de terminal.',
    iconName: 'Terminal',
    badge: 'Terminal',
    registryName: 'terminal',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function Terminal() {\n  return <div>Terminal</div>;\n}`,
  },
  // Backgrounds
  'flow-field': {
    type: 'flow-field',
    name: 'Flow Field',
    category: 'Effects & Backgrounds',
    description: 'Campo de fluxo.',
    iconName: 'Wind',
    badge: 'Flow',
    registryName: 'flow-field',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function FlowField() {\n  return <div>Flow</div>;\n}`,
  },
  'light-rays': {
    type: 'light-rays',
    name: 'Light Rays',
    category: 'Effects & Backgrounds',
    description: 'Raios de luz.',
    iconName: 'Sun',
    badge: 'Rays',
    registryName: 'light-rays',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'count', label: 'Quantidade', type: 'number', defaultValue: 8, min: 3, max: 16, step: 1 },
    ],
    defaultProps: { count: 8 },
    sampleCode: `export function LightRays() {\n  return <div>Rays</div>;\n}`,
  },
  'liquid-metaballs': {
    type: 'liquid-metaballs',
    name: 'Liquid Metaballs',
    category: 'Effects & Backgrounds',
    description: 'Metaballs líquidos.',
    iconName: 'Droplets',
    badge: 'Metaballs',
    registryName: 'liquid-metaballs',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'count', label: 'Quantidade', type: 'number', defaultValue: 5, min: 2, max: 10, step: 1 },
    ],
    defaultProps: { count: 5 },
    sampleCode: `export function LiquidMetaballs() {\n  return <div>Metaballs</div>;\n}`,
  },
  'pixel-grid': {
    type: 'pixel-grid',
    name: 'Pixel Grid',
    category: 'Effects & Backgrounds',
    description: 'Grade de pixels.',
    iconName: 'Grid',
    badge: 'Grid',
    registryName: 'pixel-grid',
    dependencies: [],
    propFields: [
      { key: 'pixelSize', label: 'Tamanho do Pixel', type: 'number', defaultValue: 4, min: 2, max: 8, step: 1 },
    ],
    defaultProps: { pixelSize: 4 },
    sampleCode: `export function PixelGrid() {\n  return <div>Grid</div>;\n}`,
  },
  'topographic-drift': {
    type: 'topographic-drift',
    name: 'Topographic Drift',
    category: 'Effects & Backgrounds',
    description: 'Deriva topográfica.',
    iconName: 'Map',
    badge: 'Topo',
    registryName: 'topographic-drift',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function TopographicDrift() {\n  return <div>Topo</div>;\n}`,
  },
  'warp-starfield': {
    type: 'warp-starfield',
    name: 'Warp Starfield',
    category: 'Effects & Backgrounds',
    description: 'Campo estelar warp.',
    iconName: 'Star',
    badge: 'Warp',
    registryName: 'warp-starfield',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'count', label: 'Quantidade', type: 'number', defaultValue: 100, min: 20, max: 200, step: 20 },
    ],
    defaultProps: { count: 100 },
    sampleCode: `export function WarpStarfield() {\n  return <div>Warp</div>;\n}`,
  },
  // Glass
  'liquid-glass-card': {
    type: 'liquid-glass-card',
    name: 'Liquid Glass Card',
    category: 'Glass & Static',
    description: 'Cartão de vidro líquido.',
    iconName: 'CreditCard',
    badge: 'Glass',
    registryName: 'liquid-glass-card',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function LiquidGlassCard() {\n  return <div>Glass</div>;\n}`,
  },
  'liquid-glass-lens': {
    type: 'liquid-glass-lens',
    name: 'Liquid Glass Lens',
    category: 'Glass & Static',
    description: 'Lente de vidro líquido.',
    iconName: 'Eye',
    badge: 'Lens',
    registryName: 'liquid-glass-lens',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function LiquidGlassLens() {\n  return <div>Lens</div>;\n}`,
  },
  // Static Effects
  'decorative-background': {
    type: 'decorative-background',
    name: 'Decorative Background',
    category: 'Glass & Static',
    description: 'Fundo decorativo.',
    iconName: 'Paintbrush',
    badge: 'Decorative',
    registryName: 'decorative-background',
    dependencies: [],
    propFields: [
      { key: 'variant', label: 'Variante', type: 'select', defaultValue: 'dots', options: [{ label: 'Pontos', value: 'dots' }, { label: 'Grade', value: 'grid' }, { label: 'Ondas', value: 'waves' }] },
    ],
    defaultProps: { variant: 'dots' },
    sampleCode: `export function DecorativeBackground() {\n  return <div>Background</div>;\n}`,
  },
  'effect-background': {
    type: 'effect-background',
    name: 'Effect Background',
    category: 'Glass & Static',
    description: 'Fundo com efeito.',
    iconName: 'Wand2',
    badge: 'Effect',
    registryName: 'effect-background',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function EffectBackground() {\n  return <div>Effect</div>;\n}`,
  },
  'geometric-background': {
    type: 'geometric-background',
    name: 'Geometric Background',
    category: 'Glass & Static',
    description: 'Fundo geométrico.',
    iconName: 'Hexagon',
    badge: 'Geometric',
    registryName: 'geometric-background',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function GeometricBackground() {\n  return <div>Geometric</div>;\n}`,
  },
  'gradient-background': {
    type: 'gradient-background',
    name: 'Gradient Background',
    category: 'Glass & Static',
    description: 'Fundo gradiente.',
    iconName: 'Palette',
    badge: 'Gradient',
    registryName: 'gradient-background',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function GradientBackground() {\n  return <div>Gradient</div>;\n}`,
  },

  // Text
  'text-animate': {
    type: 'text-animate',
    name: 'Text Animate',
    category: 'Typography & AI',
    description: 'Animação de texto com stagger.',
    iconName: 'Type',
    badge: 'Animation',
    registryName: 'text-animate',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'text', label: 'Texto', type: 'text', defaultValue: 'Animated Text' },
    ],
    defaultProps: { text: 'Animated Text' },
    sampleCode: `export function TextAnimate() {\n  return <div>Text</div>;\n}`,
  },
  'text-scramble': {
    type: 'text-scramble',
    name: 'Text Scramble',
    category: 'Typography & AI',
    description: 'Efeito de embaralhamento de texto.',
    iconName: 'Shuffle',
    badge: 'Scramble',
    registryName: 'text-scramble',
    dependencies: [],
    propFields: [
      { key: 'text', label: 'Texto', type: 'text', defaultValue: 'Scramble Text' },
    ],
    defaultProps: { text: 'Scramble Text' },
    sampleCode: `export function TextScramble() {\n  return <div>Scramble</div>;\n}`,
  },
  'highlighter': {
    type: 'highlighter',
    name: 'Highlighter',
    category: 'Typography & AI',
    description: 'Destaque de texto.',
    iconName: 'Highlighter',
    badge: 'Highlight',
    registryName: 'highlighter',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'text', label: 'Texto', type: 'text', defaultValue: 'Highlighted text' },
      { key: 'highlight', label: 'Destacar', type: 'text', defaultValue: 'Highlighted' },
    ],
    defaultProps: { text: 'Highlighted text', highlight: 'Highlighted' },
    sampleCode: `export function Highlighter() {\n  return <div>Highlight</div>;\n}`,
  },
  // AI
  'agent-flow': {
    type: 'agent-flow',
    name: 'Agent Flow',
    category: 'AI & Collaboration',
    description: 'Visualização de fluxo de agente.',
    iconName: 'GitBranch',
    badge: 'Agent',
    registryName: 'agent-flow',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function AgentFlow() {\n  return <div>Flow</div>;\n}`,
  },
  'agent-timeline': {
    type: 'agent-timeline',
    name: 'Agent Timeline',
    category: 'AI & Collaboration',
    description: 'Linha do tempo do agente.',
    iconName: 'Clock',
    badge: 'Timeline',
    registryName: 'agent-timeline',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function AgentTimeline() {\n  return <div>Timeline</div>;\n}`,
  },
  'conversation-thread': {
    type: 'conversation-thread',
    name: 'Conversation Thread',
    category: 'AI & Collaboration',
    description: 'Thread de conversa.',
    iconName: 'MessageSquare',
    badge: 'Chat',
    registryName: 'conversation-thread',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ConversationThread() {\n  return <div>Thread</div>;\n}`,
  },
  'prompt-composer': {
    type: 'prompt-composer',
    name: 'Prompt Composer',
    category: 'AI & Collaboration',
    description: 'Área de entrada de prompt.',
    iconName: 'PenTool',
    badge: 'Prompt',
    registryName: 'prompt-composer',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Type your prompt...' },
    ],
    defaultProps: { placeholder: 'Type your prompt...' },
    sampleCode: `export function PromptComposer() {\n  return <div>Prompt</div>;\n}`,
  },
  'prompt-suggestions': {
    type: 'prompt-suggestions',
    name: 'Prompt Suggestions',
    category: 'AI & Collaboration',
    description: 'Sugestões de prompt.',
    iconName: 'Lightbulb',
    badge: 'Suggestions',
    registryName: 'prompt-suggestions',
    dependencies: [],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function PromptSuggestions() {\n  return <div>Suggestions</div>;\n}`,
  },
  'source-citations': {
    type: 'source-citations',
    name: 'Source Citations',
    category: 'AI & Collaboration',
    description: 'Citações de fontes.',
    iconName: 'ExternalLink',
    badge: 'Citations',
    registryName: 'source-citations',
    dependencies: ['lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function SourceCitations() {\n  return <div>Citations</div>;\n}`,
  },
  // Collaboration
  'comment-pin': {
    type: 'comment-pin',
    name: 'Comment Pin',
    category: 'AI & Collaboration',
    description: 'Pin de comentário.',
    iconName: 'MessageCircle',
    badge: 'Comment',
    registryName: 'comment-pin',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'author', label: 'Autor', type: 'text', defaultValue: 'User' },
      { key: 'content', label: 'Conteúdo', type: 'text', defaultValue: 'Comment' },
    ],
    defaultProps: { author: 'User', content: 'Comment' },
    sampleCode: `export function CommentPin() {\n  return <div>Comment</div>;\n}`,
  },
  'live-cursors': {
    type: 'live-cursors',
    name: 'Live Cursors',
    category: 'AI & Collaboration',
    description: 'Cursores ao vivo.',
    iconName: 'MousePointer',
    badge: 'Cursors',
    registryName: 'live-cursors',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function LiveCursors() {\n  return <div>Cursors</div>;\n}`,
  },
  'notification-inbox': {
    type: 'notification-inbox',
    name: 'Notification Inbox',
    category: 'AI & Collaboration',
    description: 'Caixa de entrada de notificações.',
    iconName: 'Bell',
    badge: 'Notifications',
    registryName: 'notification-inbox',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function NotificationInbox() {\n  return <div>Notifications</div>;\n}`,
  },
  'presence-facepile': {
    type: 'presence-facepile',
    name: 'Presence Facepile',
    category: 'AI & Collaboration',
    description: 'Facepile de presença.',
    iconName: 'Users',
    badge: 'Presence',
    registryName: 'presence-facepile',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function PresenceFacepile() {\n  return <div>Presence</div>;\n}`,
  },
  // Visualizations
  'animated-beam': {
    type: 'animated-beam',
    name: 'Animated Beam',
    category: 'Visualizations',
    description: 'Feixe animado.',
    iconName: 'Zap',
    badge: 'Beam',
    registryName: 'animated-beam',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'duration', label: 'Duração (s)', type: 'number', defaultValue: 2, min: 0.5, max: 5, step: 0.5 },
    ],
    defaultProps: { duration: 2 },
    sampleCode: `export function AnimatedBeam() {\n  return <div>Beam</div>;\n}`,
  },
  'globe': {
    type: 'globe',
    name: 'Globe',
    category: 'Visualizations',
    description: 'Globo 3D.',
    iconName: 'Globe',
    badge: 'Globe',
    registryName: 'globe',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'size', label: 'Tamanho', type: 'number', defaultValue: 200, min: 100, max: 400, step: 50 },
    ],
    defaultProps: { size: 200 },
    sampleCode: `export function Globe() {\n  return <div>Globe</div>;\n}`,
  },
  'gravity': {
    type: 'gravity',
    name: 'Gravity',
    category: 'Visualizations',
    description: 'Visualização de gravidade.',
    iconName: 'Orbit',
    badge: 'Physics',
    registryName: 'gravity',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'count', label: 'Quantidade', type: 'number', defaultValue: 20, min: 5, max: 50, step: 5 },
    ],
    defaultProps: { count: 20 },
    sampleCode: `export function Gravity() {\n  return <div>Gravity</div>;\n}`,
  },
  'orbiting-circles': {
    type: 'orbiting-circles',
    name: 'Orbiting Circles',
    category: 'Visualizations',
    description: 'Círculos orbitais.',
    iconName: 'Circle',
    badge: 'Orbit',
    registryName: 'orbiting-circles',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'orbits', label: 'Órbitas', type: 'number', defaultValue: 3, min: 1, max: 5, step: 1 },
    ],
    defaultProps: { orbits: 3 },
    sampleCode: `export function OrbitingCircles() {\n  return <div>Orbit</div>;\n}`,
  },
  'scroll-timeline': {
    type: 'scroll-timeline',
    name: 'Scroll Timeline',
    category: 'Visualizations',
    description: 'Linha do tempo com scroll.',
    iconName: 'Clock',
    badge: 'Timeline',
    registryName: 'scroll-timeline',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function ScrollTimeline() {\n  return <div>Timeline</div>;\n}`,
  },
  'world-map': {
    type: 'world-map',
    name: 'World Map',
    category: 'Visualizations',
    description: 'Mapa mundial.',
    iconName: 'Map',
    badge: 'Map',
    registryName: 'world-map',
    dependencies: ['motion/react'],
    propFields: [],
    defaultProps: {},
    sampleCode: `export function WorldMap() {\n  return <div>Map</div>;\n}`,
  },

  'thinking-orb': {
    type: 'thinking-orb',
    name: 'Thinking Orb',
    category: 'AI & Collaboration',
    description: 'Orbe de pensamento pontilhado em canvas 2D com nove estados animados (working, searching, solving…) — indicadores de carregamento para interfaces de IA.',
    iconName: 'Brain',
    badge: 'Libraries.dev',
    registryName: 'thinking-orb',
    dependencies: ['clsx', 'tailwind-merge'],
    propFields: [
      {
        key: 'state',
        label: 'Estado do Agente',
        type: 'select',
        defaultValue: 'working',
        options: [
          { label: 'Working (partículas)', value: 'working' },
          { label: 'Searching (meridiano)', value: 'searching' },
          { label: 'Solving (bandas)', value: 'solving' },
          { label: 'Listening (waveform)', value: 'listening' },
          { label: 'Connecting (constelação)', value: 'connecting' },
          { label: 'Weaving (tramas)', value: 'weaving' },
          { label: 'Composing (sash)', value: 'composing' },
          { label: 'Breathing (anel)', value: 'breathing' },
          { label: 'Shaping (formas)', value: 'shaping' },
        ],
      },
      { key: 'size', label: 'Tamanho (px)', type: 'number', defaultValue: 64, min: 20, max: 128, step: 4 },
      { key: 'speed', label: 'Velocidade (x)', type: 'number', defaultValue: 1, min: 0.25, max: 3, step: 0.25 },
      { key: 'paused', label: 'Pausar', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { state: 'working', size: 64, speed: 1, paused: false },
    sampleCode: `import { ThinkingOrb } from "@/src/components/godui/ThinkingOrb";

export function Status() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/80 p-4">
      <ThinkingOrb state="searching" size={64} />
      <span className="text-sm text-zinc-300">Analisando repositório…</span>
    </div>
  );
}`,
  },

  'bot-avatar': {
    type: 'bot-avatar',
    name: 'Bot Avatar',
    category: 'AI & Collaboration',
    description: 'Avatares de bot animados em canvas 2D com rosto vivo (olhos, piscar, boca), 18 formas, 3 estados (idle/working/sleeping) e shading plástico.',
    iconName: 'Bot',
    badge: 'Libraries.dev',
    registryName: 'bot-avatar',
    dependencies: ['clsx', 'tailwind-merge'],
    propFields: [
      {
        key: 'type',
        label: 'Corpo',
        type: 'select',
        defaultValue: 'clover',
        options: [
          { label: 'Clover', value: 'clover' },
          { label: 'Flower', value: 'flower' },
          { label: 'Triangle', value: 'triangle' },
          { label: 'Square', value: 'square' },
          { label: 'Blob', value: 'blob' },
          { label: 'Ghost', value: 'ghost' },
          { label: 'Circle', value: 'circle' },
          { label: 'Drop', value: 'drop' },
          { label: 'Star', value: 'star' },
          { label: 'Droid', value: 'droid' },
          { label: 'Mech', value: 'mech' },
          { label: 'Alien', value: 'alien' },
          { label: 'Hexagon', value: 'hexagon' },
          { label: 'Cat', value: 'cat' },
          { label: 'Cloud', value: 'cloud' },
          { label: 'Pill', value: 'pill' },
          { label: 'Pebble', value: 'pebble' },
          { label: 'Puddle', value: 'puddle' },
        ],
      },
      {
        key: 'state',
        label: 'Estado',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Idle', value: 'default' },
          { label: 'Working', value: 'working' },
          { label: 'Sleeping', value: 'sleeping' },
        ],
      },
      {
        key: 'face',
        label: 'Rosto',
        type: 'select',
        defaultValue: 'eyes',
        options: [
          { label: 'Apenas olhos', value: 'eyes' },
          { label: 'Olhos + boca', value: 'mouth' },
        ],
      },
      { key: 'size', label: 'Tamanho (px)', type: 'number', defaultValue: 64, min: 24, max: 160, step: 4 },
      { key: 'interactive', label: 'Segue o ponteiro', type: 'boolean', defaultValue: true },
      { key: 'paused', label: 'Pausar', type: 'boolean', defaultValue: false },
    ],
    defaultProps: {
      type: 'clover',
      state: 'default',
      face: 'eyes',
      size: 64,
      interactive: true,
      paused: false,
    },
    sampleCode: `import { BotAvatar } from "@/src/components/godui/BotAvatar";

export function Agent({ busy }: { busy: boolean }) {
  return (
    <BotAvatar
      type="clover"
      state={busy ? "working" : "default"}
      face="mouth"
      size={64}
    />
  );
}`,
  },

  'voice-beam': {
    type: 'voice-beam',
    name: 'Voice Beam',
    category: 'Effects & Backgrounds',
    description: 'Brilho reativo à voz na borda inferior de qualquer elemento — stroke, glow interno e bloom que sobem com o nível de áudio (Web Audio opcional).',
    iconName: 'AudioLines',
    badge: 'Libraries.dev',
    registryName: 'voice-beam',
    dependencies: ['clsx', 'tailwind-merge'],
    propFields: [
      { key: 'strength', label: 'Intensidade (0-1)', type: 'number', defaultValue: 1, min: 0.1, max: 1, step: 0.1 },
      { key: 'idle', label: 'Respiro em repouso (0-1)', type: 'number', defaultValue: 0.23, min: 0, max: 1, step: 0.01 },
      { key: 'bend', label: 'Altura do arco (px)', type: 'number', defaultValue: 60, min: 0, max: 140, step: 5 },
      { key: 'sensitivity', label: 'Sensibilidade do mic', type: 'number', defaultValue: 3.1, min: 0.5, max: 8, step: 0.1 },
      { key: 'active', label: 'Efeito ativo', type: 'boolean', defaultValue: true },
      { key: 'processing', label: 'Modo processando', type: 'boolean', defaultValue: false },
      {
        key: 'colorVariant',
        label: 'Paleta',
        type: 'select',
        defaultValue: 'auto',
        options: [
          { label: 'Do tema (auto)', value: 'auto' },
          { label: 'Monocromático', value: 'mono' },
        ],
      },
    ],
    defaultProps: {
      strength: 1,
      idle: 0.23,
      bend: 60,
      sensitivity: 3.1,
      active: true,
      processing: false,
      colorVariant: 'auto',
    },
    sampleCode: `import { VoiceBeam } from "@/src/components/godui/VoiceBeam";

export function Composer() {
  return (
    <VoiceBeam level={0.6} bend={60} strength={1}>
      <div className="rounded-2xl bg-zinc-900 p-6 text-zinc-300">
        Listening…
      </div>
    </VoiceBeam>
  );
}`,
  },

  'metal-fx': {
    type: 'metal-fx',
    name: 'Metal FX',
    category: 'Buttons & Actions',
    description: 'Metal líquido animado para botões, ícones, texto e badges — anel conico com especular em órbita, luz de cursor e presets chromatic/silver/gold.',
    iconName: 'Sparkles',
    badge: 'Libraries.dev',
    registryName: 'metal-fx',
    dependencies: ['motion/react', 'clsx', 'tailwind-merge'],
    propFields: [
      {
        key: 'variant',
        label: 'Variante',
        type: 'select',
        defaultValue: 'button',
        options: [
          { label: 'Botão (pill)', value: 'button' },
          { label: 'Círculo', value: 'circle' },
          { label: 'Texto metálico', value: 'text' },
          { label: 'Badge', value: 'badge' },
        ],
      },
      {
        key: 'preset',
        label: 'Paleta',
        type: 'select',
        defaultValue: 'chromatic',
        options: [
          { label: 'Chromatic (iridescente)', value: 'chromatic' },
          { label: 'Silver (aço)', value: 'silver' },
          { label: 'Gold (ouro)', value: 'gold' },
          { label: 'Do tema GodUI', value: 'theme' },
        ],
      },
      { key: 'strength', label: 'Intensidade (0-1)', type: 'number', defaultValue: 1, min: 0.1, max: 1, step: 0.1 },
      { key: 'paused', label: 'Pausar órbita', type: 'boolean', defaultValue: false },
      { key: 'label', label: 'Texto (text/badge)', type: 'text', defaultValue: 'Upgrade to Pro' },
    ],
    defaultProps: {
      variant: 'button',
      preset: 'chromatic',
      strength: 1,
      paused: false,
      label: 'Upgrade to Pro',
    },
    sampleCode: `import { MetalFx } from "@/src/components/godui/MetalFx";

export function UpgradeButton() {
  return (
    <MetalFx variant="button" preset="chromatic" strength={1}>
      <button className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm text-white border border-white/10">
        Upgrade to Pro
      </button>
    </MetalFx>
  );
}`,
  },

  'image-generation': {
    type: 'image-generation',
    name: 'Image Generation',
    category: 'Effects & Backgrounds',
    description: 'Loader WebGL-style em canvas 2D: mosaico de pixels que se dissolve revelando uma imagem do pool — presets pixels-organic, pixels-mechanic e sweep-gradient.',
    iconName: 'Image',
    badge: 'Libraries.dev',
    registryName: 'image-generation',
    dependencies: ['clsx', 'tailwind-merge'],
    propFields: [
      {
        key: 'preset',
        label: 'Preset do loader',
        type: 'select',
        defaultValue: 'pixels-organic',
        options: [
          { label: 'Pixels Organic (Chromium Flow)', value: 'pixels-organic' },
          { label: 'Pixels Mechanic (Nebula)', value: 'pixels-mechanic' },
          { label: 'Sweep Gradient', value: 'sweep-gradient' },
        ],
      },
      {
        key: 'images',
        label: 'URLs das imagens (vírgula)',
        type: 'text',
        defaultValue:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640,https://images.unsplash.com/photo-1634017839464-5c339bbe3c4b?w=640',
      },
      { key: 'autoReveal', label: 'Revelação automática', type: 'boolean', defaultValue: true },
      { key: 'pixelScale', label: 'Escala do pixel (0.5-3)', type: 'number', defaultValue: 1, min: 0.5, max: 3, step: 0.25 },
      { key: 'strength', label: 'Intensidade (0-1)', type: 'number', defaultValue: 1, min: 0.1, max: 1, step: 0.1 },
      { key: 'paused', label: 'Pausar', type: 'boolean', defaultValue: false },
    ],
    defaultProps: {
      preset: 'pixels-organic',
      images:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640,https://images.unsplash.com/photo-1634017839464-5c339bbe3c4b?w=640',
      autoReveal: true,
      pixelScale: 1,
      strength: 1,
      paused: false,
    },
    sampleCode: `import { ImageGeneration } from "@/src/components/godui/ImageGeneration";

export function RevealCard() {
  return (
    <ImageGeneration
      preset="pixels-organic"
      images={["/img/a.jpg", "/img/b.jpg"]}
      autoReveal
    >
      <div
        className="h-72 w-72 rounded-3xl bg-zinc-900 border border-white/10"
        style={{ width: 288, height: 288 }}
      />
    </ImageGeneration>
  );
}`,
  },
  'feraui-pull-cord': {
    type: 'feraui-pull-cord',
    name: 'PullCord',
    category: 'FeraUI Experiments',
    description: 'Cordão de luz interativo. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-pull-cord',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function PullCordExample() {
  return <FeraUIExperiment experiment="feraui-pull-cord" />;
}`,
  },
  'feraui-claw-captcha': {
    type: 'feraui-claw-captcha',
    name: 'ClawCaptcha',
    category: 'FeraUI Experiments',
    description: 'Mini jogo de garra, demonstrativo e sem função anti-bot. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-claw-captcha',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function ClawCaptchaExample() {
  return <FeraUIExperiment experiment="feraui-claw-captcha" />;
}`,
  },
  'feraui-gradient-builder': {
    type: 'feraui-gradient-builder',
    name: 'Gradient Builder',
    category: 'FeraUI Experiments',
    description: 'Editor interativo de gradientes com prévia e cópia de CSS. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-gradient-builder',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function GradientBuilderExample() {
  return <FeraUIExperiment experiment="feraui-gradient-builder" />;
}`,
  },
  'feraui-screenery': {
    type: 'feraui-screenery',
    name: 'Screenery',
    category: 'FeraUI Experiments',
    description: 'Galeria de telas com transições animadas. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-screenery',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function ScreeneryExample() {
  return <FeraUIExperiment experiment="feraui-screenery" />;
}`,
  },
  'feraui-deskfolio': {
    type: 'feraui-deskfolio',
    name: 'DeskFolio',
    category: 'FeraUI Experiments',
    description: 'Portfólio interativo em formato de livro. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-deskfolio',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function DeskFolioExample() {
  return <FeraUIExperiment experiment="feraui-deskfolio" />;
}`,
  },
  'feraui-blob': {
    type: 'feraui-blob',
    name: 'Blob',
    category: 'FeraUI Experiments',
    description: 'Mascote elástico com expressões reativas. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-blob',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function BlobExample() {
  return <FeraUIExperiment experiment="feraui-blob" />;
}`,
  },
  'feraui-animaps': {
    type: 'feraui-animaps',
    name: 'AniMaps',
    category: 'FeraUI Experiments',
    description: 'Rota ilustrativa com marcador animado. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-animaps',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function AniMapsExample() {
  return <FeraUIExperiment experiment="feraui-animaps" />;
}`,
  },
  'feraui-fur': {
    type: 'feraui-fur',
    name: 'Fur',
    category: 'FeraUI Experiments',
    description: 'Textura de fios reativa ao ponteiro e toque. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-fur',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function FurExample() {
  return <FeraUIExperiment experiment="feraui-fur" />;
}`,
  },
  'feraui-vacuum': {
    type: 'feraui-vacuum',
    name: 'Vacuum',
    category: 'FeraUI Experiments',
    description: 'Remoção em lote com transição animada. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-vacuum',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function VacuumExample() {
  return <FeraUIExperiment experiment="feraui-vacuum" />;
}`,
  },
  'feraui-crumple': {
    type: 'feraui-crumple',
    name: 'Crumple',
    category: 'FeraUI Experiments',
    description: 'Notas descartadas com animação de papel. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-crumple',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function CrumpleExample() {
  return <FeraUIExperiment experiment="feraui-crumple" />;
}`,
  },
  'feraui-hologram': {
    type: 'feraui-hologram',
    name: 'Hologram',
    category: 'FeraUI Experiments',
    description: 'Cartão com brilho holográfico reativo à inclinação. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-hologram',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function HologramExample() {
  return <FeraUIExperiment experiment="feraui-hologram" />;
}`,
  },
  'feraui-matchday': {
    type: 'feraui-matchday',
    name: 'Matchday',
    category: 'FeraUI Experiments',
    description: 'Diário de partidas com avaliação por estrelas. Implementação independente para Goduix com controles interativos e responsivos.',
    iconName: 'Sparkles',
    badge: 'FeraUI-inspired',
    registryName: 'feraui-matchday',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [],
    defaultProps: { accent: '#0f766e' },
    sampleCode: `import { FeraUIExperiment } from "@/src/components/godui/FeraUIExperiment";

export function MatchdayExample() {
  return <FeraUIExperiment experiment="feraui-matchday" />;
}`,
  },
  'hairline-figure': {
    type: 'hairline-figure',
    name: 'Hairline Figure',
    category: 'Visualizations',
    description: '33 figuras isométricas interativas da biblioteca Hairline. As linhas respondem ao ponteiro e permitem ajustar intensidade, tema e reprodução.',
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-figure',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'figureType', label: 'Figura', type: 'select', defaultValue: 'terrain', options: [
        { label: 'Terrain — topografia', value: 'terrain' },
        { label: 'Riffle — cartões interativos', value: 'riffle' },
        { label: 'Exploded — camadas de interface', value: 'exploded' },
        { label: 'Phosphor — matriz luminosa', value: 'phosphor' },
        { label: 'Slow — esteira mecânica', value: 'slow' },
        { label: 'Turntable — plataforma giratória', value: 'turntable' },
        { label: 'Keyboard — teclado', value: 'keyboard' },
        { label: 'Elevator — elevador', value: 'elevator' },
        { label: 'Phone — telefone em camadas', value: 'phone' },
        { label: 'Laptop — notebook', value: 'laptop' },
        { label: 'Terminal — terminal de código', value: 'terminal' },
        { label: 'Cabinet — rack de servidores', value: 'cabinet' },
        { label: 'Branches — grafo de commits', value: 'branches' },
        { label: 'Vault — cofre', value: 'vault' },
        { label: 'Lockers — armários', value: 'lockers' },
        { label: 'Padlock — cadeado', value: 'padlock' },
        { label: 'Patch — painel de conexões', value: 'patch' },
        { label: 'Dish — antena parabólica', value: 'dish' },
        { label: 'Router — roteador', value: 'router' },
        { label: 'Loupe — lupa', value: 'loupe' },
        { label: 'Sieve — peneiras', value: 'sieve' },
        { label: 'Rail — cabides', value: 'rail' },
        { label: 'Plug — tomada e plugue', value: 'plug' },
        { label: 'Query — interrogação', value: 'query' },
        { label: 'Drawer — gavetas', value: 'drawer' },
        { label: 'Basket — cesta', value: 'basket' },
        { label: 'Plot — gráfico', value: 'plot' },
        { label: 'Hub — hub de conexões', value: 'hub' },
        { label: 'Relay — rede em ramificações', value: 'relay' },
        { label: 'Settle — grafo organizado', value: 'settle' },
        { label: 'Format — formatação de código', value: 'format' },
        { label: 'Rebuild — dependências', value: 'rebuild' },
        { label: 'Stack — pilha de chamadas', value: 'stack' },
      ] },
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [
        { label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' },
      ] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: 'Figura isométrica interativa' },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { figureType: 'terrain', intensity: 0.65, figureTheme: 'auto', label: 'Figura isométrica interativa', play: false },
    sampleCode: `import { Terrain } from "@lucasmarkes/hairline/react";

export function IsometricHero() {
  return <Terrain intensity={0.65} theme="auto" label="Topografia interativa" />;
}`,
  },
  'isometric-figure': {
    type: 'isometric-figure',
    name: 'Isometric Figure',
    category: 'Visualizations',
    description: 'Ilustração vetorial SVG em perspectiva isométrica, com modelos de terreno, camadas e terminal. Ajuste tema, intensidade e movimento.',
    iconName: 'Layers',
    badge: 'SVG Vector',
    registryName: 'isometric-figure',
    dependencies: ['motion/react'],
    propFields: [
      { key: 'figureType', label: 'Modelo da figura', type: 'select', defaultValue: 'terrain', options: [{ label: 'Terreno / Topografia', value: 'terrain' }, { label: 'Pilha / Camadas', value: 'stack' }, { label: 'Terminal / Interface', value: 'terminal' }] },
      { key: 'intensity', label: 'Intensidade visual', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema da figura', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Legenda acessível', type: 'text', defaultValue: 'Figura isométrica' },
      { key: 'play', label: 'Movimento flutuante', type: 'boolean', defaultValue: true },
    ],
    defaultProps: { figureType: 'terrain', intensity: 0.65, figureTheme: 'auto', label: 'Figura isométrica', play: true },
    sampleCode: `import { IsometricFigure } from "@/src/components/godui/IsometricFigure";

export function IsometricFigureExample() {
  return <IsometricFigure figureType="terrain" intensity={0.65} figureTheme="auto" play />;
}`,
  },
  'robot-heads': {
    type: 'robot-heads',
    name: 'Robot Heads',
    category: 'Visualizations',
    description: 'Mascote robótico animado em canvas 2D com expressões de agente, quatro formatos de cabeça, antena e estados de atividade.',
    iconName: 'Bot',
    badge: 'Robot Heads · MIT',
    registryName: 'robot-heads',
    dependencies: ['robot-heads'],
    propFields: [
      { key: 'shape', label: 'Formato', type: 'select', defaultValue: 'rectangle', options: [{ label: 'TV retangular', value: 'rectangle' }, { label: 'Quadrado', value: 'square' }, { label: 'Circular', value: 'circle' }, { label: 'Hexagonal', value: 'hexagon' }] },
      { key: 'state', label: 'Estado do agente', type: 'select', defaultValue: 'thinking', options: [{ label: 'Ocioso', value: 'idle' }, { label: 'Pensando', value: 'thinking' }, { label: 'Pesquisando', value: 'searching' }, { label: 'Ouvindo', value: 'listening' }, { label: 'Falando', value: 'speaking' }, { label: 'Trabalhando', value: 'working' }, { label: 'Feliz', value: 'happy' }, { label: 'Erro', value: 'error' }, { label: 'Dormindo', value: 'sleeping' }] },
      { key: 'size', label: 'Tamanho (px)', type: 'number', defaultValue: 180, min: 80, max: 320, step: 10 },
      { key: 'color', label: 'Cor do corpo', type: 'color', defaultValue: '#263b62' },
      { key: 'trimColor', label: 'Cor dos detalhes', type: 'color', defaultValue: '#a8c2e8' },
      { key: 'screenColor', label: 'Cor da tela LED', type: 'color', defaultValue: '#d8f7ff' },
      { key: 'speed', label: 'Velocidade', type: 'number', defaultValue: 1, min: 0.2, max: 2, step: 0.1 },
      { key: 'paused', label: 'Pausar animação', type: 'boolean', defaultValue: false },
      { key: 'interactive', label: 'Interação com ponteiro', type: 'boolean', defaultValue: true },
      { key: 'antenna', label: 'Exibir antena', type: 'boolean', defaultValue: true },
    ],
    defaultProps: { shape: 'rectangle', state: 'thinking', size: 180, color: '#263b62', trimColor: '#a8c2e8', screenColor: '#d8f7ff', speed: 1, paused: false, interactive: true, antenna: true, label: 'Mascote robótico do GodUI' },
    sampleCode: `import { RobotHead } from "robot-heads";

export function AgentMascot() {
  return <RobotHead shape="rectangle" state="thinking" size={180} />;
}`,
  },
  'morphicons-showcase': {
    type: 'morphicons-showcase',
    name: 'Morphicons',
    category: 'Typography & AI',
    description: 'Ícones vetoriais que se transformam uns nos outros com interpolação geométrica e física de mola, usando os dados de ícones Lucide.',
    iconName: 'Waypoints',
    badge: 'Morphicons · MIT',
    registryName: 'morphicons-showcase',
    dependencies: ['morphicons', 'lucide'],
    propFields: [
      { key: 'size', label: 'Tamanho dos ícones', type: 'number', defaultValue: 44, min: 20, max: 72, step: 4 },
      { key: 'color', label: 'Cor', type: 'color', defaultValue: '#67e8f9' },
      { key: 'spring', label: 'Física da transição', type: 'select', defaultValue: 'snappy', options: [{ label: 'Rápida', value: 'snappy' }, { label: 'Suave', value: 'gentle' }, { label: 'Elástica', value: 'bouncy' }, { label: 'Rígida', value: 'stiff' }] },
      { key: 'label', label: 'Título', type: 'text', defaultValue: 'Ícones com morphing' },
    ],
    defaultProps: { size: 44, color: '#67e8f9', spring: 'snappy', label: 'Ícones com morphing' },
    sampleCode: `import { MorphIcon } from "morphicons/react";
import { Menu, X } from "lucide";

export function MorphingMenu({ open }) {
  return <MorphIcon icon={open ? X : Menu} spring="snappy" size={44} />;
}`,
  },
  'voice-studio-extension': {
    type: 'voice-studio-extension',
    name: 'Voice Studio Extension',
    category: 'AI & Collaboration',
    description: 'Console de voz com síntese e ditado via APIs do navegador, controles de ritmo/tom e atalho para uma instância separada do VoiceStudio local.',
    iconName: 'AudioLines',
    badge: 'Voice Extension',
    registryName: 'voice-studio-extension',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Voice Studio' },
      { key: 'defaultText', label: 'Texto inicial', type: 'text', defaultValue: 'Olá! Este é o módulo de voz do GodUI.' },
      { key: 'language', label: 'Idioma BCP-47', type: 'text', defaultValue: 'pt-BR' },
      { key: 'voiceStudioUrl', label: 'URL do VoiceStudio', type: 'text', defaultValue: 'http://localhost:3900' },
      { key: 'accentColor', label: 'Cor de destaque', type: 'color', defaultValue: '#67e8f9' },
    ],
    defaultProps: { title: 'Voice Studio', defaultText: 'Olá! Este é o módulo de voz do GodUI.', language: 'pt-BR', voiceStudioUrl: 'http://localhost:3900', accentColor: '#67e8f9' },
    sampleCode: `import { VoiceStudioExtension } from "@/src/components/godui/VoiceStudioExtension";

export function VoicePanel() {
  return <VoiceStudioExtension language="pt-BR" voiceStudioUrl="http://localhost:3900" />;
}`,
  },


  'plasma-surface': {
    type: 'plasma-surface',
    name: 'Plasma Surface',
    category: 'Glass & Static',
    description: 'Superfície de vidro líquido renderizada em WebGL com refração, tensão superficial e material cromático; usa fallback leve em telas pequenas ou com movimento reduzido.',
    iconName: 'Waves',
    badge: 'Plasma UI · MIT',
    registryName: 'plasma-surface',
    dependencies: ['@cruxgarden/plasma-ui'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Plasma Surface' },
      { key: 'description', label: 'Descrição', type: 'text', defaultValue: 'Superfície líquida com refração, tensão superficial e reflexos cromáticos.' },
      { key: 'mood', label: 'Paleta', type: 'select', defaultValue: 'tidal', options: [{ label: 'Tidal', value: 'tidal' }, { label: 'Aurora', value: 'aurora' }, { label: 'Ember', value: 'ember' }] },
      { key: 'tint', label: 'Cor', type: 'color', defaultValue: '#67e8f9' },
      { key: 'opacity', label: 'Opacidade', type: 'number', defaultValue: 0.12, min: 0, max: 1, step: 0.05 },
      { key: 'frost', label: 'Fosco', type: 'number', defaultValue: 0.2, min: 0, max: 1, step: 0.05 },
      { key: 'viscosity', label: 'Viscosidade', type: 'number', defaultValue: 0.5, min: 0, max: 1, step: 0.1 },
      { key: 'flow', label: 'Fluxo', type: 'number', defaultValue: 0.25, min: 0, max: 1, step: 0.05 },
      { key: 'interactive', label: 'Interação e arraste', type: 'boolean', defaultValue: true },
    ],
    defaultProps: { title: 'Plasma Surface', description: 'Superfície líquida com refração, tensão superficial e reflexos cromáticos.', mood: 'tidal', tint: '#67e8f9', opacity: 0.12, frost: 0.2, viscosity: 0.5, flow: 0.25, interactive: true },
    sampleCode: `import { PlasmaProvider, Plasma } from "@cruxgarden/plasma-ui";

export function LiquidPanel() {
  return <PlasmaProvider mood="tidal"><Plasma draggable>Conteúdo</Plasma></PlasmaProvider>;
}`,
  },
  'liquid-gooey-cursor': {
    type: 'liquid-gooey-cursor',
    name: 'Liquid Gooey Cursor',
    category: 'Effects & Backgrounds',
    description: 'Interação local com partículas metaball, filtro SVG gooey e halo que acompanha o ponteiro, baseada no conceito do WeArePixelFlow.',
    iconName: 'MousePointer2',
    badge: 'WeArePixelFlow · MIT',
    registryName: 'liquid-gooey-cursor',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Liquid Gooey Cursor' },
      { key: 'description', label: 'Descrição', type: 'text', defaultValue: 'Mova o ponteiro sobre a área para conectar as partículas líquidas.' },
      { key: 'accent', label: 'Cor', type: 'color', defaultValue: '#67e8f9' },
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.7, min: 0.1, max: 1, step: 0.1 },
    ],
    defaultProps: { title: 'Liquid Gooey Cursor', description: 'Mova o ponteiro sobre a área para conectar as partículas líquidas.', accent: '#67e8f9', intensity: 0.7 },
    sampleCode: `import { LiquidGooeyCursor } from "@/src/components/godui/LiquidGooeyCursor";

export function GooeyDemo() {
  return <LiquidGooeyCursor intensity={0.7} />;
}`,
  },
  'complete-shelf': {
    type: 'complete-shelf',
    name: 'Complete Shelf',
    category: 'Cards & Layout',
    description: 'Estante interativa de livros com perspectiva 3D, seleção de volumes, detalhes e navegação por coleção; reimplementação independente.',
    iconName: 'BookOpen',
    badge: 'Independent recreation',
    registryName: 'complete-shelf',
    dependencies: ['motion/react', 'lucide-react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'The Complete Shelf' },
      { key: 'showDescriptions', label: 'Exibir descrições', type: 'boolean', defaultValue: true },
      { key: 'accent', label: 'Cor de destaque', type: 'color', defaultValue: '#67e8f9' },
    ],
    defaultProps: { title: 'The Complete Shelf', showDescriptions: true, accent: '#67e8f9' },
    sampleCode: `import { CompleteShelf } from "@/src/components/godui/CompleteShelf";

export function ShelfDemo() {
  return <CompleteShelf title="The Complete Shelf" />;
}`,
  },

  'brand-logo-explorer': {
    type: 'brand-logo-explorer',
    name: 'Brand Logo Explorer',
    category: 'Visualizations',
    description: 'Busca unificada de logotipos SVG nas APIs públicas SVGL e theSVG, com filtro por nome, origem, visualização e cópia da URL do ativo.',
    iconName: 'Images',
    badge: 'SVGL + theSVG',
    registryName: 'brand-logo-explorer',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Brand Logo Explorer' },
      { key: 'initialQuery', label: 'Busca inicial', type: 'text', defaultValue: 'openai' },
      { key: 'includeTheSvg', label: 'Incluir biblioteca theSVG', type: 'boolean', defaultValue: true },
    ],
    defaultProps: { title: 'Brand Logo Explorer', initialQuery: 'openai', includeTheSvg: true },
    sampleCode: `import { BrandLogoExplorer } from "@/src/components/godui/BrandLogoExplorer";

export function LogoPicker() {
  return <BrandLogoExplorer initialQuery="openai" includeTheSvg />;
}`,
  },
  'hairline-riffle': {
    type: 'hairline-riffle',
    name: 'Hairline Riffle',
    category: 'Visualizations',
    description: "Cartões interativos que se elevam em sequência ao passar o ponteiro.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-riffle',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Riffle — Cartões interativos que se elevam em sequência ao passar o ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Riffle — Cartões interativos que se elevam em sequência ao passar o ponteiro.", play: false },
    sampleCode: `import { Riffle } from "@lucasmarkes/hairline/react";

export function RiffleFigure() {
  return <Riffle intensity={0.65} theme="auto" label="Riffle — Cartões interativos que se elevam em sequência ao passar o ponteiro." />;
}`,
  },
  'hairline-terrain': {
    type: 'hairline-terrain',
    name: 'Hairline Terrain',
    category: 'Visualizations',
    description: "Campo topográfico de pilares que forma ondas ao redor do ponteiro.",
    iconName: 'ChartNoAxesCombined',
    badge: 'Hairline · MIT',
    registryName: 'hairline-terrain',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Terrain — Campo topográfico de pilares que forma ondas ao redor do ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Terrain — Campo topográfico de pilares que forma ondas ao redor do ponteiro.", play: false },
    sampleCode: `import { Terrain } from "@lucasmarkes/hairline/react";

export function TerrainFigure() {
  return <Terrain intensity={0.65} theme="auto" label="Terrain — Campo topográfico de pilares que forma ondas ao redor do ponteiro." />;
}`,
  },
  'hairline-exploded': {
    type: 'hairline-exploded',
    name: 'Hairline Exploded',
    category: 'Visualizations',
    description: "Camadas de interface que se separam espacialmente sob interação.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-exploded',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Exploded — Camadas de interface que se separam espacialmente sob interação." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Exploded — Camadas de interface que se separam espacialmente sob interação.", play: false },
    sampleCode: `import { Exploded } from "@lucasmarkes/hairline/react";

export function ExplodedFigure() {
  return <Exploded intensity={0.65} theme="auto" label="Exploded — Camadas de interface que se separam espacialmente sob interação." />;
}`,
  },
  'hairline-phosphor': {
    type: 'hairline-phosphor',
    name: 'Hairline Phosphor',
    category: 'Visualizations',
    description: "Matriz luminosa de pontos com persistência e resposta ao ponteiro.",
    iconName: 'ChartNoAxesCombined',
    badge: 'Hairline · MIT',
    registryName: 'hairline-phosphor',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Phosphor — Matriz luminosa de pontos com persistência e resposta ao ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Phosphor — Matriz luminosa de pontos com persistência e resposta ao ponteiro.", play: false },
    sampleCode: `import { Phosphor } from "@lucasmarkes/hairline/react";

export function PhosphorFigure() {
  return <Phosphor intensity={0.65} theme="auto" label="Phosphor — Matriz luminosa de pontos com persistência e resposta ao ponteiro." />;
}`,
  },
  'hairline-slow': {
    type: 'hairline-slow',
    name: 'Hairline Slow',
    category: 'Visualizations',
    description: "Esteira mecânica com movimento desacelerado e resposta de intensidade.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-slow',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Slow — Esteira mecânica com movimento desacelerado e resposta de intensidade." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Slow — Esteira mecânica com movimento desacelerado e resposta de intensidade.", play: false },
    sampleCode: `import { Slow } from "@lucasmarkes/hairline/react";

export function SlowFigure() {
  return <Slow intensity={0.65} theme="auto" label="Slow — Esteira mecânica com movimento desacelerado e resposta de intensidade." />;
}`,
  },
  'hairline-turntable': {
    type: 'hairline-turntable',
    name: 'Hairline Turntable',
    category: 'Visualizations',
    description: "Plataforma giratória isométrica com inércia e rotação.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-turntable',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Turntable — Plataforma giratória isométrica com inércia e rotação." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Turntable — Plataforma giratória isométrica com inércia e rotação.", play: false },
    sampleCode: `import { Turntable } from "@lucasmarkes/hairline/react";

export function TurntableFigure() {
  return <Turntable intensity={0.65} theme="auto" label="Turntable — Plataforma giratória isométrica com inércia e rotação." />;
}`,
  },
  'hairline-keyboard': {
    type: 'hairline-keyboard',
    name: 'Hairline Keyboard',
    category: 'Visualizations',
    description: "Teclas em perspectiva que afundam ao redor do ponteiro.",
    iconName: 'Laptop',
    badge: 'Hairline · MIT',
    registryName: 'hairline-keyboard',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Keyboard — Teclas em perspectiva que afundam ao redor do ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Keyboard — Teclas em perspectiva que afundam ao redor do ponteiro.", play: false },
    sampleCode: `import { Keyboard } from "@lucasmarkes/hairline/react";

export function KeyboardFigure() {
  return <Keyboard intensity={0.65} theme="auto" label="Keyboard — Teclas em perspectiva que afundam ao redor do ponteiro." />;
}`,
  },
  'hairline-elevator': {
    type: 'hairline-elevator',
    name: 'Hairline Elevator',
    category: 'Visualizations',
    description: "Mecanismo de elevador com resposta elástica.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-elevator',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Elevator — Mecanismo de elevador com resposta elástica." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Elevator — Mecanismo de elevador com resposta elástica.", play: false },
    sampleCode: `import { Elevator } from "@lucasmarkes/hairline/react";

export function ElevatorFigure() {
  return <Elevator intensity={0.65} theme="auto" label="Elevator — Mecanismo de elevador com resposta elástica." />;
}`,
  },
  'hairline-phone': {
    type: 'hairline-phone',
    name: 'Hairline Phone',
    category: 'Visualizations',
    description: "Telefone em camadas com espaçamento ajustável.",
    iconName: 'Laptop',
    badge: 'Hairline · MIT',
    registryName: 'hairline-phone',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Phone — Telefone em camadas com espaçamento ajustável." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Phone — Telefone em camadas com espaçamento ajustável.", play: false },
    sampleCode: `import { Phone } from "@lucasmarkes/hairline/react";

export function PhoneFigure() {
  return <Phone intensity={0.65} theme="auto" label="Phone — Telefone em camadas com espaçamento ajustável." />;
}`,
  },
  'hairline-laptop': {
    type: 'hairline-laptop',
    name: 'Hairline Laptop',
    category: 'Visualizations',
    description: "Notebook vetorial com abertura de tampa controlada pela interação.",
    iconName: 'Laptop',
    badge: 'Hairline · MIT',
    registryName: 'hairline-laptop',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Laptop — Notebook vetorial com abertura de tampa controlada pela interação." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Laptop — Notebook vetorial com abertura de tampa controlada pela interação.", play: false },
    sampleCode: `import { Laptop } from "@lucasmarkes/hairline/react";

export function LaptopFigure() {
  return <Laptop intensity={0.65} theme="auto" label="Laptop — Notebook vetorial com abertura de tampa controlada pela interação." />;
}`,
  },
  'hairline-terminal': {
    type: 'hairline-terminal',
    name: 'Hairline Terminal',
    category: 'Visualizations',
    description: "Terminal de código com linhas que se afastam sob o ponteiro.",
    iconName: 'GitBranch',
    badge: 'Hairline · MIT',
    registryName: 'hairline-terminal',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Terminal — Terminal de código com linhas que se afastam sob o ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Terminal — Terminal de código com linhas que se afastam sob o ponteiro.", play: false },
    sampleCode: `import { Terminal } from "@lucasmarkes/hairline/react";

export function TerminalFigure() {
  return <Terminal intensity={0.65} theme="auto" label="Terminal — Terminal de código com linhas que se afastam sob o ponteiro." />;
}`,
  },
  'hairline-cabinet': {
    type: 'hairline-cabinet',
    name: 'Hairline Cabinet',
    category: 'Visualizations',
    description: "Rack de servidores com gavetas que deslizam individualmente.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-cabinet',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Cabinet — Rack de servidores com gavetas que deslizam individualmente." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Cabinet — Rack de servidores com gavetas que deslizam individualmente.", play: false },
    sampleCode: `import { Cabinet } from "@lucasmarkes/hairline/react";

export function CabinetFigure() {
  return <Cabinet intensity={0.65} theme="auto" label="Cabinet — Rack de servidores com gavetas que deslizam individualmente." />;
}`,
  },
  'hairline-branches': {
    type: 'hairline-branches',
    name: 'Hairline Branches',
    category: 'Visualizations',
    description: "Grafo de commits em que ancestrais se elevam em sequência.",
    iconName: 'GitBranch',
    badge: 'Hairline · MIT',
    registryName: 'hairline-branches',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Branches — Grafo de commits em que ancestrais se elevam em sequência." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Branches — Grafo de commits em que ancestrais se elevam em sequência.", play: false },
    sampleCode: `import { Branches } from "@lucasmarkes/hairline/react";

export function BranchesFigure() {
  return <Branches intensity={0.65} theme="auto" label="Branches — Grafo de commits em que ancestrais se elevam em sequência." />;
}`,
  },
  'hairline-vault': {
    type: 'hairline-vault',
    name: 'Hairline Vault',
    category: 'Visualizations',
    description: "Cofre isométrico com movimento inercial.",
    iconName: 'ShieldCheck',
    badge: 'Hairline · MIT',
    registryName: 'hairline-vault',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Vault — Cofre isométrico com movimento inercial." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Vault — Cofre isométrico com movimento inercial.", play: false },
    sampleCode: `import { Vault } from "@lucasmarkes/hairline/react";

export function VaultFigure() {
  return <Vault intensity={0.65} theme="auto" label="Vault — Cofre isométrico com movimento inercial." />;
}`,
  },
  'hairline-lockers': {
    type: 'hairline-lockers',
    name: 'Hairline Lockers',
    category: 'Visualizations',
    description: "Armários com portas articuladas e abertura progressiva.",
    iconName: 'ShieldCheck',
    badge: 'Hairline · MIT',
    registryName: 'hairline-lockers',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Lockers — Armários com portas articuladas e abertura progressiva." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Lockers — Armários com portas articuladas e abertura progressiva.", play: false },
    sampleCode: `import { Lockers } from "@lucasmarkes/hairline/react";

export function LockersFigure() {
  return <Lockers intensity={0.65} theme="auto" label="Lockers — Armários com portas articuladas e abertura progressiva." />;
}`,
  },
  'hairline-padlock': {
    type: 'hairline-padlock',
    name: 'Hairline Padlock',
    category: 'Visualizations',
    description: "Cadeado vetorial interativo.",
    iconName: 'ShieldCheck',
    badge: 'Hairline · MIT',
    registryName: 'hairline-padlock',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Padlock — Cadeado vetorial interativo." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Padlock — Cadeado vetorial interativo.", play: false },
    sampleCode: `import { Padlock } from "@lucasmarkes/hairline/react";

export function PadlockFigure() {
  return <Padlock intensity={0.65} theme="auto" label="Padlock — Cadeado vetorial interativo." />;
}`,
  },
  'hairline-patch': {
    type: 'hairline-patch',
    name: 'Hairline Patch',
    category: 'Visualizations',
    description: "Painel de conexões com portas e linhas de patch.",
    iconName: 'Network',
    badge: 'Hairline · MIT',
    registryName: 'hairline-patch',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Patch — Painel de conexões com portas e linhas de patch." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Patch — Painel de conexões com portas e linhas de patch.", play: false },
    sampleCode: `import { Patch } from "@lucasmarkes/hairline/react";

export function PatchFigure() {
  return <Patch intensity={0.65} theme="auto" label="Patch — Painel de conexões com portas e linhas de patch." />;
}`,
  },
  'hairline-dish': {
    type: 'hairline-dish',
    name: 'Hairline Dish',
    category: 'Visualizations',
    description: "Antena parabólica isométrica com orientação interativa.",
    iconName: 'Network',
    badge: 'Hairline · MIT',
    registryName: 'hairline-dish',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Dish — Antena parabólica isométrica com orientação interativa." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Dish — Antena parabólica isométrica com orientação interativa.", play: false },
    sampleCode: `import { Dish } from "@lucasmarkes/hairline/react";

export function DishFigure() {
  return <Dish intensity={0.65} theme="auto" label="Dish — Antena parabólica isométrica com orientação interativa." />;
}`,
  },
  'hairline-router': {
    type: 'hairline-router',
    name: 'Hairline Router',
    category: 'Visualizations',
    description: "Roteador com portas e sinais de conectividade.",
    iconName: 'Network',
    badge: 'Hairline · MIT',
    registryName: 'hairline-router',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Router — Roteador com portas e sinais de conectividade." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Router — Roteador com portas e sinais de conectividade.", play: false },
    sampleCode: `import { Router } from "@lucasmarkes/hairline/react";

export function RouterFigure() {
  return <Router intensity={0.65} theme="auto" label="Router — Roteador com portas e sinais de conectividade." />;
}`,
  },
  'hairline-loupe': {
    type: 'hairline-loupe',
    name: 'Hairline Loupe',
    category: 'Visualizations',
    description: "Lupa vetorial para estado vazio e busca.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-loupe',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Loupe — Lupa vetorial para estado vazio e busca." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Loupe — Lupa vetorial para estado vazio e busca.", play: false },
    sampleCode: `import { Loupe } from "@lucasmarkes/hairline/react";

export function LoupeFigure() {
  return <Loupe intensity={0.65} theme="auto" label="Loupe — Lupa vetorial para estado vazio e busca." />;
}`,
  },
  'hairline-sieve': {
    type: 'hairline-sieve',
    name: 'Hairline Sieve',
    category: 'Visualizations',
    description: "Peneira para ilustrar filtros sem resultados.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-sieve',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Sieve — Peneira para ilustrar filtros sem resultados." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Sieve — Peneira para ilustrar filtros sem resultados.", play: false },
    sampleCode: `import { Sieve } from "@lucasmarkes/hairline/react";

export function SieveFigure() {
  return <Sieve intensity={0.65} theme="auto" label="Sieve — Peneira para ilustrar filtros sem resultados." />;
}`,
  },
  'hairline-rail': {
    type: 'hairline-rail',
    name: 'Hairline Rail',
    category: 'Visualizations',
    description: "Trilho com elementos pendurados e seleção por proximidade.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-rail',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Rail — Trilho com elementos pendurados e seleção por proximidade." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Rail — Trilho com elementos pendurados e seleção por proximidade.", play: false },
    sampleCode: `import { Rail } from "@lucasmarkes/hairline/react";

export function RailFigure() {
  return <Rail intensity={0.65} theme="auto" label="Rail — Trilho com elementos pendurados e seleção por proximidade." />;
}`,
  },
  'hairline-plug': {
    type: 'hairline-plug',
    name: 'Hairline Plug',
    category: 'Visualizations',
    description: "Tomada e plugue para estados de conexão vazios.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-plug',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Plug — Tomada e plugue para estados de conexão vazios." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Plug — Tomada e plugue para estados de conexão vazios.", play: false },
    sampleCode: `import { Plug } from "@lucasmarkes/hairline/react";

export function PlugFigure() {
  return <Plug intensity={0.65} theme="auto" label="Plug — Tomada e plugue para estados de conexão vazios." />;
}`,
  },
  'hairline-query': {
    type: 'hairline-query',
    name: 'Hairline Query',
    category: 'Visualizations',
    description: "Ponto de interrogação com movimento de mola.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-query',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Query — Ponto de interrogação com movimento de mola." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Query — Ponto de interrogação com movimento de mola.", play: false },
    sampleCode: `import { Query } from "@lucasmarkes/hairline/react";

export function QueryFigure() {
  return <Query intensity={0.65} theme="auto" label="Query — Ponto de interrogação com movimento de mola." />;
}`,
  },
  'hairline-drawer': {
    type: 'hairline-drawer',
    name: 'Hairline Drawer',
    category: 'Visualizations',
    description: "Gavetas que abrem em resposta à posição do ponteiro.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-drawer',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Drawer — Gavetas que abrem em resposta à posição do ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Drawer — Gavetas que abrem em resposta à posição do ponteiro.", play: false },
    sampleCode: `import { Drawer } from "@lucasmarkes/hairline/react";

export function DrawerFigure() {
  return <Drawer intensity={0.65} theme="auto" label="Drawer — Gavetas que abrem em resposta à posição do ponteiro." />;
}`,
  },
  'hairline-basket': {
    type: 'hairline-basket',
    name: 'Hairline Basket',
    category: 'Visualizations',
    description: "Cesta vetorial para estados vazios de conteúdo.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-basket',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Basket — Cesta vetorial para estados vazios de conteúdo." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Basket — Cesta vetorial para estados vazios de conteúdo.", play: false },
    sampleCode: `import { Basket } from "@lucasmarkes/hairline/react";

export function BasketFigure() {
  return <Basket intensity={0.65} theme="auto" label="Basket — Cesta vetorial para estados vazios de conteúdo." />;
}`,
  },
  'hairline-plot': {
    type: 'hairline-plot',
    name: 'Hairline Plot',
    category: 'Visualizations',
    description: "Gráfico isométrico interativo.",
    iconName: 'ChartNoAxesCombined',
    badge: 'Hairline · MIT',
    registryName: 'hairline-plot',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Plot — Gráfico isométrico interativo." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Plot — Gráfico isométrico interativo.", play: false },
    sampleCode: `import { Plot } from "@lucasmarkes/hairline/react";

export function PlotFigure() {
  return <Plot intensity={0.65} theme="auto" label="Plot — Gráfico isométrico interativo." />;
}`,
  },
  'hairline-hub': {
    type: 'hairline-hub',
    name: 'Hairline Hub',
    category: 'Visualizations',
    description: "Hub central com oito nós e conexões que acendem ao foco.",
    iconName: 'Network',
    badge: 'Hairline · MIT',
    registryName: 'hairline-hub',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Hub — Hub central com oito nós e conexões que acendem ao foco." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Hub — Hub central com oito nós e conexões que acendem ao foco.", play: false },
    sampleCode: `import { Hub } from "@lucasmarkes/hairline/react";

export function HubFigure() {
  return <Hub intensity={0.65} theme="auto" label="Hub — Hub central com oito nós e conexões que acendem ao foco." />;
}`,
  },
  'hairline-relay': {
    type: 'hairline-relay',
    name: 'Hairline Relay',
    category: 'Visualizations',
    description: "Rede ramificada com realce sequencial de saltos.",
    iconName: 'Network',
    badge: 'Hairline · MIT',
    registryName: 'hairline-relay',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Relay — Rede ramificada com realce sequencial de saltos." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Relay — Rede ramificada com realce sequencial de saltos.", play: false },
    sampleCode: `import { Relay } from "@lucasmarkes/hairline/react";

export function RelayFigure() {
  return <Relay intensity={0.65} theme="auto" label="Relay — Rede ramificada com realce sequencial de saltos." />;
}`,
  },
  'hairline-settle': {
    type: 'hairline-settle',
    name: 'Hairline Settle',
    category: 'Visualizations',
    description: "Nós desalinhados que se organizam em uma árvore conectada.",
    iconName: 'Layers',
    badge: 'Hairline · MIT',
    registryName: 'hairline-settle',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Settle — Nós desalinhados que se organizam em uma árvore conectada." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Settle — Nós desalinhados que se organizam em uma árvore conectada.", play: false },
    sampleCode: `import { Settle } from "@lucasmarkes/hairline/react";

export function SettleFigure() {
  return <Settle intensity={0.65} theme="auto" label="Settle — Nós desalinhados que se organizam em uma árvore conectada." />;
}`,
  },
  'hairline-format': {
    type: 'hairline-format',
    name: 'Hairline Format',
    category: 'Visualizations',
    description: "Linhas desalinhadas que se alinham como um formatador de código.",
    iconName: 'GitBranch',
    badge: 'Hairline · MIT',
    registryName: 'hairline-format',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Format — Linhas desalinhadas que se alinham como um formatador de código." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Format — Linhas desalinhadas que se alinham como um formatador de código.", play: false },
    sampleCode: `import { Format } from "@lucasmarkes/hairline/react";

export function FormatFigure() {
  return <Format intensity={0.65} theme="auto" label="Format — Linhas desalinhadas que se alinham como um formatador de código." />;
}`,
  },
  'hairline-rebuild': {
    type: 'hairline-rebuild',
    name: 'Hairline Rebuild',
    category: 'Visualizations',
    description: "Árvore de dependências cujos pacotes sobem em cadeia.",
    iconName: 'GitBranch',
    badge: 'Hairline · MIT',
    registryName: 'hairline-rebuild',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Rebuild — Árvore de dependências cujos pacotes sobem em cadeia." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Rebuild — Árvore de dependências cujos pacotes sobem em cadeia.", play: false },
    sampleCode: `import { Rebuild } from "@lucasmarkes/hairline/react";

export function RebuildFigure() {
  return <Rebuild intensity={0.65} theme="auto" label="Rebuild — Árvore de dependências cujos pacotes sobem em cadeia." />;
}`,
  },
  'hairline-stack': {
    type: 'hairline-stack',
    name: 'Hairline Stack',
    category: 'Visualizations',
    description: "Pilha de chamadas com quadros que se separam pela posição do ponteiro.",
    iconName: 'GitBranch',
    badge: 'Hairline · MIT',
    registryName: 'hairline-stack',
    dependencies: ['@lucasmarkes/hairline'],
    propFields: [
      { key: 'intensity', label: 'Intensidade', type: 'number', defaultValue: 0.65, min: 0, max: 1, step: 0.05 },
      { key: 'figureTheme', label: 'Tema', type: 'select', defaultValue: 'auto', options: [{ label: 'Automático', value: 'auto' }, { label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }] },
      { key: 'label', label: 'Descrição acessível', type: 'text', defaultValue: "Stack — Pilha de chamadas com quadros que se separam pela posição do ponteiro." },
      { key: 'play', label: 'Reprodução automática', type: 'boolean', defaultValue: false },
    ],
    defaultProps: { intensity: 0.65, figureTheme: 'auto', label: "Stack — Pilha de chamadas com quadros que se separam pela posição do ponteiro.", play: false },
    sampleCode: `import { Stack } from "@lucasmarkes/hairline/react";

export function StackFigure() {
  return <Stack intensity={0.65} theme="auto" label="Stack — Pilha de chamadas com quadros que se separam pela posição do ponteiro." />;
}`,
  },

  'pixelflow-folder-hover': {
    type: 'pixelflow-folder-hover',
    name: 'PixelFlow Folder Hover',
    category: 'Cards & Layout',
    description: 'Cartão de pasta com painel de arquivos, animação de abertura, foco por teclado e duração ajustável, adaptado do projeto MIT do PixelFlow.',
    iconName: 'FolderOpen',
    badge: 'PixelFlow · MIT',
    registryName: 'pixelflow-folder-hover',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Project files' },
      { key: 'subtitle', label: 'Descrição', type: 'text', defaultValue: 'Hover or focus to explore' },
      { key: 'accent', label: 'Cor de destaque', type: 'color', defaultValue: '#60a5fa' },
      { key: 'duration', label: 'Duração da animação (ms)', type: 'number', defaultValue: 380, min: 120, max: 900, step: 40 },
    ],
    defaultProps: { title: 'Project files', subtitle: 'Hover or focus to explore', accent: '#60a5fa', duration: 380 },
    sampleCode: `import { PixelFlowFolderHover } from "@/src/components/godui/PixelFlowFolderHover";

export function FolderDemo() {
  return <PixelFlowFolderHover title="Project files" accent="#60a5fa" />;
}`,
  },
  'pixelflow-pricing-cards': {
    type: 'pixelflow-pricing-cards',
    name: 'PixelFlow Pricing Cards',
    category: 'Cards & Layout',
    description: 'Seção responsiva de três planos com alternância mensal/anual, destaque do plano recomendado, cartões com brilho e seleção local de plano. Preços são ilustrativos.',
    iconName: 'CreditCard',
    badge: 'PixelFlow · MIT inspiration',
    registryName: 'pixelflow-pricing-cards',
    dependencies: ['lucide-react'],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Planos para construir melhor' },
      { key: 'description', label: 'Descrição', type: 'text', defaultValue: 'Escolha a camada de ferramentas adequada ao seu fluxo.' },
      { key: 'accent', label: 'Cor de destaque', type: 'color', defaultValue: '#818cf8' },
      { key: 'defaultAnnual', label: 'Selecionar anual por padrão', type: 'boolean', defaultValue: true },
    ],
    defaultProps: { title: 'Planos para construir melhor', description: 'Escolha a camada de ferramentas adequada ao seu fluxo.', accent: '#818cf8', defaultAnnual: true },
    sampleCode: `import { PixelFlowPricingCards } from "@/src/components/godui/PixelFlowPricingCards";

export function PricingDemo() {
  return <PixelFlowPricingCards accent="#818cf8" defaultAnnual />;
}`,
  },
  'vgpu-black-hole': {
    type: 'vgpu-black-hole',
    name: 'VGPU Black Hole',
    category: 'Creative & Shaders',
    description: 'Buraco negro procedural com disco de acreção em WGSL/WebGPU, renderização em tempo real e fallback CSS para navegadores sem suporte.',
    iconName: 'Orbit',
    badge: 'WebGPU · VGPU reference',
    registryName: 'vgpu-black-hole',
    dependencies: [],
    propFields: [
      { key: 'title', label: 'Título', type: 'text', defaultValue: 'Event Horizon' },
      { key: 'description', label: 'Descrição', type: 'text', defaultValue: 'Um campo gravitacional luminoso renderizado em tempo real com WebGPU.' },
      { key: 'intensity', label: 'Intensidade luminosa', type: 'number', defaultValue: 0.85, min: 0, max: 1.5, step: 0.05 },
    ],
    defaultProps: { title: 'Event Horizon', description: 'Um campo gravitacional luminoso renderizado em tempo real com WebGPU.', intensity: 0.85 },
    sampleCode: `import { VgpuBlackHole } from "@/src/components/godui/VgpuBlackHole";

export function BlackHoleDemo() {
  return <VgpuBlackHole title="Event Horizon" intensity={0.85} />;
}`,
  },
  ...Object.fromEntries(CREATIVE_COMPONENTS.map((item) => [item.type, item])),

};
