import { GodUIMeta, GodUIComponentType } from '../types/builder';

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
};
