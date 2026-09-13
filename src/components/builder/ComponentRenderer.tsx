import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Trash2, 
  BookOpen, 
  EyeOff, 
  GripVertical,
  Layers,
  Sparkles,
  Zap,
  Droplets
} from 'lucide-react';
import { BuilderComponentInstance } from '../../types/builder';
import { useBuilderStore } from '../../store/useBuilderStore';
import { THEMES } from '../../data/themes';
import { cn } from '../../lib/utils';

// GodUI Components
import { FloatingIslandHeader } from '../godui/FloatingIslandHeader';
import { GodUIDock } from '../godui/GodUIDock';
import { FloatingToolbar } from '../godui/FloatingToolbar';
import { LiquidGlassButton } from '../godui/LiquidGlassButton';
import { MagicShimmerButton } from '../godui/MagicShimmerButton';
import { MagneticButton } from '../godui/MagneticButton';
import { HoldConfirmButton } from '../godui/HoldConfirmButton';
import { GooeyFab } from '../godui/GooeyFab';
import { SpotlightCard } from '../godui/SpotlightCard';
import { Tilt3DCard } from '../godui/Tilt3DCard';
import { BentoGridSection } from '../godui/BentoGridSection';
import { AuroraText } from '../godui/AuroraText';
import { VoiceOrb } from '../godui/VoiceOrb';
import { GlassFooter } from '../godui/GlassFooter';
import { BlueprintGrid } from '../godui/BlueprintGrid';
import { Interactive3DMesh } from '../godui/Interactive3DMesh';

// New GodUI Components
import { JellyButton } from '../godui/JellyButton';
import { MagicButton } from '../godui/MagicButton';
import { MaskButton } from '../godui/MaskButton';
import { MultiButton } from '../godui/MultiButton';
import { MagicInput } from '../godui/MagicInput';
import { ElasticText } from '../godui/ElasticText';
import { NumberTicker } from '../godui/NumberTicker';
import { ScrollTextReveal } from '../godui/ScrollTextReveal';
import { Lamp } from '../godui/Lamp';
import { AsciiDither } from '../godui/AsciiDither';
import { FusionTargetSlot } from '../../types/builder';

interface ComponentRendererProps {
  instance: BuilderComponentInstance;
  index: number;
  total: number;
  isInteractiveOnly?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  instance,
  index,
  total,
  isInteractiveOnly = false,
}) => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const isSelected = store.selectedId === instance.id;
  const isBuilderMode = store.viewMode === 'builder' && !isInteractiveOnly;

  if (!instance.isVisible) {
    if (!isBuilderMode) return null;
    return (
      <div 
        onClick={() => store.selectComponent(instance.id)}
        className="p-4 my-2 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 text-zinc-500 text-xs flex items-center justify-between cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <EyeOff className="w-3.5 h-3.5" />
          {instance.name} (Oculto)
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.toggleVisibility(instance.id);
          }}
          className="hover:text-white underline"
        >
          Mostrar
        </button>
      </div>
    );
  }

  // Render the specific GodUI component
  const renderGodUIElement = () => {
    const props = instance.props;

    switch (instance.type) {
      case 'dynamic-island':
        return (
          <FloatingIslandHeader
            title={props.title}
            showNav={props.showNavLinks}
            showBadge={true}
            compactOnScroll={false}
            blurAmount={props.blurStrength || 16}
            theme={theme}
            fusions={instance.fusions}
            onCtaClick={() => store.triggerInteraction('Dynamic Island', 'Botão CTA Clicado', props.ctaText || 'Deploy')}
          />
        );

      case 'godui-dock':
        return (
          <GodUIDock
            magnification={props.magnification || 64}
            distance={props.distance || 140}
            showLabels={props.showLabels}
            position={props.position || 'bottom'}
            theme={theme}
            fusions={instance.fusions}
            onItemClick={(id, label) => store.triggerInteraction('macOS Dock', `Item Aberto: ${label}`, `Ação do aplicativo ${id}`)}
          />
        );

      case 'floating-toolbar':
        return (
          <FloatingToolbar
            badgeText={props.badgeText}
            theme={theme}
            fusions={instance.fusions}
            onToolSelect={(toolId) => store.triggerInteraction('Floating Toolbar', `Ferramenta Ativada: ${toolId}`, 'Alternância tátil de ferramenta')}
          />
        );

      case 'liquid-glass-button':
        return (
          <div className="flex justify-center my-4">
            <LiquidGlassButton
              label={props.label || 'Get Started'}
              variant={props.variant || 'liquid'}
              glowIntensity={props.glowIntensity || 0.6}
              withShimmer={props.withShimmer ?? true}
              theme={theme}
              onClick={() => store.triggerInteraction('Liquid Glass Button', 'Clique de Ação', props.label)}
            />
          </div>
        );

      case 'shimmer-button':
        return (
          <div className="flex justify-center my-4">
            <MagicShimmerButton
              label={props.label || 'Explorar Documentação'}
              theme={theme}
              onClick={() => store.triggerInteraction('Shimmer Button', 'Clique com Feixe Cônico', props.label)}
            />
          </div>
        );

      case 'magnetic-button':
        return (
          <div className="flex justify-center my-4">
            <MagneticButton
              label={props.label || 'Magnetic Feel'}
              strength={props.strength || 0.35}
              theme={theme}
              onClick={() => store.triggerInteraction('Magnetic Button', 'Clique Magnético', props.label)}
            />
          </div>
        );

      case 'hold-confirm-button':
        return (
          <div className="flex justify-center my-4">
            <HoldConfirmButton
              label={props.label}
              successText={props.successText}
              durationMs={props.durationMs || 1500}
              theme={theme}
              onConfirm={() => store.triggerInteraction('Hold Confirm Button', 'Confirmação Segura Acionada', props.successText || 'Ação Concluída')}
            />
          </div>
        );

      case 'gooey-fab':
        return (
          <div className="flex justify-center my-8">
            <GooeyFab
              theme={theme}
              onActionSelect={(action) => store.triggerInteraction('Gooey FAB', `Sub-ação Líquida: ${action}`, 'Animação com filtro SVG metaball')}
            />
          </div>
        );

      case 'spotlight-card':
        return (
          <div className="max-w-xl mx-auto my-6">
            <SpotlightCard
              title={props.title}
              description={props.description}
              enableBorderBeam={props.enableBorderBeam ?? true}
              spotlightColor={props.spotlightColor}
              tagText={props.tagText}
              theme={theme}
              onClick={() => store.triggerInteraction('Spotlight Card', 'Card Inspecionado', props.title)}
            />
          </div>
        );

      case 'tilt-3d-card':
        return (
          <div className="max-w-md mx-auto my-6">
            <Tilt3DCard
              title={props.title || 'Spatial Gyro Substrate'}
              category={props.badge || 'Z-Space 3D'}
              theme={theme}
              maxTilt={props.maxTilt || 18}
              glareOpacity={props.glareOpacity || 0.35}
              onCardClick={() => store.triggerInteraction('3D Tilt Card', 'Giroscópio 3D Tocado', props.title)}
            />
          </div>
        );

      case 'bento-grid':
        return (
          <div className="my-8">
            {props.headline && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{props.headline}</h2>
                <p className="text-xs text-zinc-400 mt-1">Grid assimétrico de componentes GodUI com isolamento atômico</p>
              </div>
            )}
            <BentoGridSection
              theme={theme}
              columns={props.columns || 3}
              showStats={props.showLiveStats ?? true}
            />
          </div>
        );

      case 'aurora-text':
        return (
          <div className="text-center my-10 px-4 max-w-3xl mx-auto space-y-4">
            <AuroraText
              text={props.text || 'Motion Craft & Fluid Glass'}
              theme={theme}
              size="lg"
            />
            {props.subtitle && (
              <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
                {props.subtitle}
              </p>
            )}
          </div>
        );

      case 'voice-orb':
        return (
          <div className="my-8">
            <VoiceOrb
              statusLabel={props.statusLabel}
              interactiveVoice={props.interactiveVoice ?? true}
              theme={theme}
              onCommandSend={(cmd) => store.triggerInteraction('AI Voice Orb', 'Comando de Voz Recebido', cmd)}
            />
          </div>
        );

      case 'glass-footer':
        return (
          <GlassFooter
            companyName={props.companyName}
            statusBadge={props.statusBadge}
            showSocials={props.showSocials}
            newsletterLabel={props.newsletterLabel}
            theme={theme}
            onNewsletterSubmit={(email) => store.triggerInteraction('Glass Footer', 'Inscrição Newsletter', email)}
          />
        );

      case 'blueprint-grid':
        return (
          <BlueprintGrid
            gridSize={props.gridSize || 32}
            glowIntensity={props.glowIntensity || 0.6}
            showCoordinates={props.showCoordinates ?? true}
            theme={theme}
          />
        );

      case 'interactive-3d-mesh':
        return (
          <div className="my-4 relative">
            <div className="w-full h-72 flex items-center justify-center">
              <Interactive3DMesh
                theme={theme}
                mode="wireframe-orb"
                wireframe={props.wireframe ?? true}
                speed={props.speed || 1.0}
                opacity={props.opacity || 0.75}
              />
            </div>
            <div className="text-center -mt-6">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                WebGL Three.js • Pressione & Arraste
              </span>
            </div>
          </div>
        );

      case 'jelly-button':
        return (
          <div className="flex justify-center my-4">
            <JellyButton
              label={props.label || 'Squishy Jelly'}
              squishIntensity={props.squishIntensity ?? 0.8}
              theme={theme}
              onClick={() => store.triggerInteraction('Jelly Button', 'click', 'Squish wobble elástico acionado')}
            />
          </div>
        );

      case 'magic-button':
        return (
          <div className="flex justify-center my-4">
            <MagicButton
              label={props.label || 'Magic Button'}
              enableRainbowEdge={props.enableRainbowEdge ?? true}
              depth={props.depth ?? 4}
              theme={theme}
              onClick={() => store.triggerInteraction('Magic Button', 'click', '3D sink com borda animada acionado')}
            />
          </div>
        );

      case 'mask-button':
        return (
          <div className="flex justify-center my-4">
            <MaskButton
              defaultLabel={props.defaultLabel || 'Hover to Unlock'}
              revealedLabel={props.revealedLabel || 'Access Granted ✦'}
              theme={theme}
              onClick={() => store.triggerInteraction('Mask Button', 'click', 'Ação revelada confirmada')}
            />
          </div>
        );

      case 'multi-button':
        return (
          <div className="flex justify-center my-4">
            <MultiButton
              theme={theme}
              onActionClick={(id) => store.triggerInteraction('Multi Button', 'action', `Ação selecionada: ${id}`)}
            />
          </div>
        );

      case 'magic-input':
        return (
          <div className="my-4">
            <MagicInput
              label={props.label || 'AI Query or Command'}
              placeholder={props.placeholder || 'Type prompt or search...'}
              enableRainbowEdge={props.enableRainbowEdge ?? true}
              theme={theme}
            />
          </div>
        );

      case 'elastic-text':
        return (
          <div className="flex justify-center my-4">
            <ElasticText
              text={props.text || 'ELASTIC TYPOGRAPHY'}
              fontSize={props.fontSize || 'xl'}
              theme={theme}
            />
          </div>
        );

      case 'number-ticker':
        return (
          <div className="my-4">
            <NumberTicker
              value={props.value || 94820}
              prefix={props.prefix || '$'}
              suffix={props.suffix || ' USD'}
              label={props.label || 'Volume Transacionado'}
              theme={theme}
            />
          </div>
        );

      case 'scroll-text-reveal':
        return (
          <div className="my-4">
            <ScrollTextReveal
              text={props.text || 'Next generation interface design powered by mathematical spring physics, specular refraction, and kinetic interaction models.'}
              theme={theme}
            />
          </div>
        );

      case 'lamp':
        return (
          <div className="my-4">
            <Lamp
              headline={props.headline || 'Construa com a Real Arquitetura GodUI'}
              subtitle={props.subtitle || 'Precisão matemática, física de molas e fusão de efeitos em tempo real.'}
              theme={theme}
            />
          </div>
        );

      case 'ascii-dither':
        return (
          <div className="my-4">
            <AsciiDither
              mode={props.mode || 'ascii'}
              interactive={props.interactive ?? true}
              theme={theme}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!isBuilderMode) {
    return (
      <div className="relative w-full">
        {renderGodUIElement()}
      </div>
    );
  }

  // Builder mode with selection border and quick actions
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        store.selectComponent(instance.id);
      }}
      className={cn(
        "relative group/item rounded-2xl transition-all duration-200 my-3 p-1.5",
        isSelected
          ? "ring-2 ring-cyan-400 bg-cyan-500/[0.03] shadow-lg shadow-cyan-500/10"
          : "hover:ring-1 hover:ring-white/30"
      )}
    >
      {/* Floating quick action toolbar on top right */}
      <div
        className={cn(
          "absolute -top-3.5 right-4 z-40 flex items-center gap-1 px-2 py-1 rounded-full",
          "bg-zinc-900 border border-white/20 text-zinc-300 text-xs shadow-2xl backdrop-blur-md",
          "transition-opacity duration-150",
          isSelected ? "opacity-100 scale-100" : "opacity-0 group-hover/item:opacity-100 scale-95"
        )}
      >
        <span className="text-[10px] font-medium text-cyan-400 mr-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {instance.name}
        </span>

        {/* Fusion Engine Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.openFusionModal(instance.id);
          }}
          title="Mesclar Efeito (Fusion Engine)"
          className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-all",
            instance.fusions && instance.fusions.filter(f => f.active).length > 0
              ? "bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/40 shadow-sm"
              : "hover:text-cyan-300 hover:bg-white/10 text-zinc-400"
          )}
        >
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>
            {instance.fusions && instance.fusions.filter(f => f.active).length > 0
              ? `${instance.fusions.filter(f => f.active).length} Mesclado`
              : 'Mesclar'}
          </span>
        </button>

        {/* Move up */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.moveComponent(instance.id, 'up');
          }}
          disabled={index === 0}
          title="Mover para cima"
          className="p-1 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 cursor-pointer"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Move down */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.moveComponent(instance.id, 'down');
          }}
          disabled={index === total - 1}
          title="Mover para baixo"
          className="p-1 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 cursor-pointer"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Duplicate */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.duplicateComponent(instance.id);
          }}
          title="Duplicar componente"
          className="p-1 hover:text-white hover:bg-white/10 rounded cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* View Component Docs & Code */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.setInspectingDocType(instance.type);
          }}
          title="Ver Documentação & Código"
          className="p-1 hover:text-cyan-400 hover:bg-white/10 rounded cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            store.removeComponent(instance.id);
          }}
          title="Remover componente"
          className="p-1 hover:text-rose-400 hover:bg-rose-500/10 rounded cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Render component */}
      <div className="relative">
        {renderGodUIElement()}

        {/* DRAG-AND-DROP FUSION OVERLAY: Active when user drags an effect */}
        {store.draggingItem && (
          <div 
            className="absolute inset-0 z-50 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-[2px] p-2 flex flex-col justify-between pointer-events-auto border-2 border-dashed border-cyan-400/80 animate-pulse"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
          >
            {/* Upper Slots: ::before Aura & Título */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'before-glow')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'before-glow' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'before-glow');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'before-glow'
                    ? "bg-amber-500 text-black font-bold ring-2 ring-amber-300 scale-105"
                    : "bg-zinc-900/90 text-amber-300 border border-amber-500/40 hover:bg-amber-500/20"
                )}
              >
                <span>✦ ::before (Glow Aura)</span>
              </button>

              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'title')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'title' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'title');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'title'
                    ? "bg-purple-500 text-white font-bold ring-2 ring-purple-300 scale-105"
                    : "bg-zinc-900/90 text-purple-300 border border-purple-500/40 hover:bg-purple-500/20"
                )}
              >
                <span>Aa Título & Texto</span>
              </button>
            </div>

            {/* Middle Slots: Borda (Stroke), Item Ativo, Fundo, Ícone */}
            <div className="flex flex-wrap items-center justify-center gap-2 my-2">
              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'border')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'border' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'border');
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'border'
                    ? "bg-cyan-400 text-black ring-4 ring-cyan-300/60 scale-110"
                    : "bg-zinc-900/95 text-cyan-300 border-2 border-cyan-400/80 hover:bg-cyan-500/30"
                )}
              >
                <span>⚡ Borda (Stroke)</span>
              </button>

              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'active-item')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'active-item' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'active-item');
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'active-item'
                    ? "bg-emerald-400 text-black ring-4 ring-emerald-300/60 scale-110"
                    : "bg-zinc-900/95 text-emerald-300 border-2 border-emerald-400/80 hover:bg-emerald-500/30"
                )}
              >
                <span>🎯 Item Ativo (Clicado)</span>
              </button>

              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'icon')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'icon' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'icon');
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'icon'
                    ? "bg-pink-400 text-black ring-4 ring-pink-300/60 scale-110"
                    : "bg-zinc-900/95 text-pink-300 border-2 border-pink-400/80 hover:bg-pink-500/30"
                )}
              >
                <span>✦ Ícone / Glifos</span>
              </button>

              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'background')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'background' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'background');
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'background'
                    ? "bg-sky-400 text-black ring-4 ring-sky-300/60 scale-110"
                    : "bg-zinc-900/95 text-sky-300 border-2 border-sky-400/80 hover:bg-sky-500/30"
                )}
              >
                <span>◈ Fundo / Container</span>
              </button>
            </div>

            {/* Lower Slots: ::after Shimmer & Interativos */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'interactive-items')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'interactive-items' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'interactive-items');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'interactive-items'
                    ? "bg-indigo-500 text-white font-bold ring-2 ring-indigo-300 scale-105"
                    : "bg-zinc-900/90 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/20"
                )}
              >
                <span>⚡ Todos os Botões</span>
              </button>

              <button
                type="button"
                onClick={() => store.dropEffectOnSlot(instance.id, 'after-shine')}
                onDragOver={(e) => {
                  e.preventDefault();
                  store.setActiveHoverDropZone({ componentId: instance.id, slot: 'after-shine' });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  store.dropEffectOnSlot(instance.id, 'after-shine');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5",
                  store.activeHoverDropZone?.componentId === instance.id && store.activeHoverDropZone?.slot === 'after-shine'
                    ? "bg-teal-400 text-black font-bold ring-2 ring-teal-300 scale-105"
                    : "bg-zinc-900/90 text-teal-300 border border-teal-500/40 hover:bg-teal-500/20"
                )}
              >
                <span>✧ ::after (Shimmer Beam)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global SVG Gooey Filter definition with preserved high-contrast blending */}
      <svg className="hidden" style={{ display: 'none' }} aria-hidden="true">
        <defs>
          <filter id="godui-gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
