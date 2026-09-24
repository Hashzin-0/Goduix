import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { BuilderComponentInstance, EntranceAnimationType, ExitAnimationType } from '../../types/builder';
import { useBuilderStore } from '../../store/useBuilderStore';
import { THEMES } from '../../data/themes';
import { cn } from '../../lib/utils';
import { AnimatedTestimonials } from '../godui/AnimatedTestimonials';
import { AppShowcase } from '../godui/AppShowcase';

// Animation Variants
const entranceVariants: Record<EntranceAnimationType, any> = {
  'fade-spring': {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  },
  'blur-scale-up': {
    hidden: { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  },
  'slide-down': {
    hidden: { opacity: 0, y: -35 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  },
  'none': {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
};

const exitVariants: Record<ExitAnimationType, any> = {
  'fade-out': {
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  },
  'scale-down': {
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  },
  'slide-up-exit': {
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
  },
  'none': {
    visible: { opacity: 1 },
    exit: { opacity: 1 },
  },
};

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
// Buttons
import { ProgressFoldButton } from '../godui/ProgressFoldButton';
import { SlideConfirmButton } from '../godui/SlideConfirmButton';
// Inputs
import { OtpInput } from '../godui/OtpInput';
// Navigation
import { Breadcrumbs } from '../godui/Breadcrumbs';
import { Combobox } from '../godui/Combobox';
import { ContextMenu } from '../godui/ContextMenu';
import { DropdownMenu } from '../godui/DropdownMenu';
import { FilterBar } from '../godui/FilterBar';
import { MagicTab } from '../godui/MagicTab';
import { MegaMenu } from '../godui/MegaMenu';
import { ResizableHeader } from '../godui/ResizableHeader';
import { SegmentedControl } from '../godui/SegmentedControl';
import { TabBar } from '../godui/TabBar';
// Overlays
import { AnimatedTooltip } from '../godui/AnimatedTooltip';
import { CommandPalette } from '../godui/CommandPalette';
import { Drawer } from '../godui/Drawer';
import { MorphingDialog } from '../godui/MorphingDialog';
import { Toast } from '../godui/Toast';
// Layout
import { Accordion } from '../godui/Accordion';
import { AvatarGroup } from '../godui/AvatarGroup';
import { CardSwap } from '../godui/CardSwap';
import { ContainerScroll } from '../godui/ContainerScroll';
import { CoverFlow } from '../godui/CoverFlow';
import { GooeyStack } from '../godui/GooeyStack';
import { HeroParallax } from '../godui/HeroParallax';
import { ImageAccordion } from '../godui/ImageAccordion';
import { ImageCompare } from '../godui/ImageCompare';
import { InertiaGallery } from '../godui/InertiaGallery';
import { MorphGallery } from '../godui/MorphGallery';
import { OrbitCarousel } from '../godui/OrbitCarousel';
import { ProgressiveCardReveal } from '../godui/ProgressiveCardReveal';
import { ReorderList } from '../godui/ReorderList';
import { ScrollStack } from '../godui/ScrollStack';
import { SpinViewer } from '../godui/SpinViewer';
import { SplitFlapDisplay } from '../godui/SplitFlapDisplay';
import { Stepper } from '../godui/Stepper';
import { StickyScroll } from '../godui/StickyScroll';
import { StackBadge } from '../godui/StackBadge';
import { StoreBadge } from '../godui/StoreBadge';
import { SwipeDeck } from '../godui/SwipeDeck';
import { ThreeDMarquee } from '../godui/ThreeDMarquee';
import { HolographicCard } from '../godui/HolographicCard';
// Text
import { TextAnimate } from '../godui/TextAnimate';
import { TextScramble } from '../godui/TextScramble';
import { Highlighter } from '../godui/Highlighter';
// AI
import { AgentFlow } from '../godui/AgentFlow';
import { AgentTimeline } from '../godui/AgentTimeline';
import { ConversationThread } from '../godui/ConversationThread';
import { PromptComposer } from '../godui/PromptComposer';
import { PromptSuggestions } from '../godui/PromptSuggestions';
import { SourceCitations } from '../godui/SourceCitations';
// Collaboration
import { CommentPin } from '../godui/CommentPin';
import { LiveCursors } from '../godui/LiveCursors';
import { NotificationInbox } from '../godui/NotificationInbox';
import { PresenceFacepile } from '../godui/PresenceFacepile';
// Visualizations
import { AnimatedBeam } from '../godui/AnimatedBeam';
import { Globe } from '../godui/Globe';
import { Gravity } from '../godui/Gravity';
import { OrbitingCircles } from '../godui/OrbitingCircles';
import { ScrollTimeline } from '../godui/ScrollTimeline';
import { WorldMap } from '../godui/WorldMap';
// Effects
import { BeamDraw } from '../godui/BeamDraw';
import { BorderBeam } from '../godui/BorderBeam';
import { Confetti } from '../godui/Confetti';
import { EncryptedCard } from '../godui/EncryptedCard';
import { FluidCursor } from '../godui/FluidCursor';
import { ImageTrail } from '../godui/ImageTrail';
import { LiquidImage } from '../godui/LiquidImage';
import { Marquee } from '../godui/Marquee';
import { ParticleDissolve } from '../godui/ParticleDissolve';
import { ScrollProgress } from '../godui/ScrollProgress';
import { ScrollReveal } from '../godui/ScrollReveal';
import { SpotlightReveal } from '../godui/SpotlightReveal';
import { Terminal } from '../godui/Terminal';
// Backgrounds
import { FlowField } from '../godui/FlowField';
import { LightRays } from '../godui/LightRays';
import { LiquidMetaballs } from '../godui/LiquidMetaballs';
import { PixelGrid } from '../godui/PixelGrid';
import { TopographicDrift } from '../godui/TopographicDrift';
import { WarpStarfield } from '../godui/WarpStarfield';
// Glass
import { LiquidGlassCard } from '../godui/LiquidGlassCard';
import { LiquidGlassLens } from '../godui/LiquidGlassLens';
// Static Effects
import { DecorativeBackground } from '../godui/DecorativeBackground';
import { EffectBackground } from '../godui/EffectBackground';
import { GeometricBackground } from '../godui/GeometricBackground';
import { GradientBackground } from '../godui/GradientBackground';

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
import { InsetGlassCard } from '../godui/InsetGlassCard';
import { ScrollGlowContainer } from '../godui/ScrollGlowContainer';
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
              variant={props.variant || 'primary'}
              size={props.size || 'md'}
              depth={props.depth || 'focus'}
              rainbow={props.rainbow ?? true}
              submitButton={props.submitButton ?? false}
              status={props.status || 'idle'}
              progress={props.progress}
              theme={theme}
            />
          </div>
        );

      case 'elastic-text':
        return (
          <div className="flex justify-center my-4">
            <ElasticText
              text={props.text || 'ELASTIC TYPOGRAPHY'}
              mode={props.mode || 'auto'}
              minWeight={props.minWeight || 300}
              maxWeight={props.maxWeight || 900}
              duration={props.duration || 2}
              loop={props.loop ?? true}
              startOnView={props.startOnView ?? true}
              radius={props.radius || 120}
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

      case 'inset-glass-card':
        return (
          <div className="max-w-xl mx-auto my-6">
            <InsetGlassCard
              title={props.title || 'Ultra-Deep Inset Surface'}
              subtitle={props.subtitle}
              description={props.description}
              badge={props.badge}
              insetDepth={props.insetDepth || 'deep'}
              specularHighlight={props.specularHighlight ?? true}
              borderGlow={props.borderGlow ?? true}
              theme={theme}
            />
          </div>
        );

      case 'scroll-glow-container':
        return (
          <div className="my-4">
            <ScrollGlowContainer
              scrollProgress={props.scrollProgress || 0.5}
              intensity={props.intensity || 0.8}
              syncWithMouse={props.syncWithMouse ?? true}
              theme={theme}
            >
              <div className="p-8 text-center text-zinc-400 text-sm">
                Conteúdo do container com brilho reativo ao scroll
              </div>
            </ScrollGlowContainer>
          </div>
        );

      // Buttons
      case 'progress-fold-button':
        return (
          <div className="flex justify-center my-4">
            <ProgressFoldButton
              label={props.label || 'Fold & Submit'}
              progress={props.progress || 0}
              theme={theme}
              onClick={() => store.triggerInteraction('Progress Fold Button', 'click', props.label)}
            />
          </div>
        );

      case 'slide-confirm-button':
        return (
          <div className="flex justify-center my-4">
            <SlideConfirmButton
              label={props.label || 'Slide to Confirm'}
              confirmLabel={props.confirmLabel || 'Confirmed!'}
              theme={theme}
              onConfirm={() => store.triggerInteraction('Slide Confirm Button', 'confirm', 'Confirmed')}
            />
          </div>
        );

      // Inputs
      case 'otp-input':
        return (
          <div className="flex justify-center my-4">
            <OtpInput
              length={props.length || 6}
              theme={theme}
              onComplete={(otp) => store.triggerInteraction('OTP Input', 'complete', otp)}
            />
          </div>
        );

      // Navigation
      case 'breadcrumbs':
        return (
          <div className="my-4">
            <Breadcrumbs
              items={props.items || [{ label: 'Home' }, { label: 'Page', active: true }]}
              theme={theme}
            />
          </div>
        );

      case 'combobox':
        return (
          <div className="flex justify-center my-4">
            <Combobox
              options={props.options || []}
              value={props.value}
              onChange={(v) => store.triggerInteraction('Combobox', 'select', v)}
              placeholder={props.placeholder || 'Select...'}
              theme={theme}
            />
          </div>
        );

      case 'context-menu':
        return (
          <div className="flex justify-center my-4">
            <ContextMenu
              items={props.items || []}
              theme={theme}
            >
              <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm cursor-pointer">
                Right-click me
              </div>
            </ContextMenu>
          </div>
        );

      case 'dropdown-menu':
        return (
          <div className="flex justify-center my-4">
            <DropdownMenu
              trigger={props.trigger || 'Menu'}
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'filter-bar':
        return (
          <div className="flex justify-center my-4">
            <FilterBar
              options={props.options || []}
              value={props.value}
              onChange={(v) => store.triggerInteraction('Filter Bar', 'filter', v)}
              theme={theme}
            />
          </div>
        );

      case 'magic-tab':
        return (
          <div className="flex justify-center my-4">
            <MagicTab
              items={props.items || []}
              value={props.value}
              onChange={(v) => store.triggerInteraction('Magic Tab', 'select', v)}
              theme={theme}
            />
          </div>
        );

      case 'mega-menu':
        return (
          <div className="flex justify-center my-4">
            <MegaMenu
              sections={props.sections || []}
              theme={theme}
            >
              <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm cursor-pointer">
                Open Menu
              </div>
            </MegaMenu>
          </div>
        );

      case 'resizable-header':
        return (
          <div className="my-4">
            <ResizableHeader
              onResize={(w) => store.triggerInteraction('Resizable Header', 'resize', `${w}px`)}
              minWidth={props.minWidth || 80}
              theme={theme}
            >
              {props.children || 'Header'}
            </ResizableHeader>
          </div>
        );

      case 'segmented-control':
        return (
          <div className="flex justify-center my-4">
            <SegmentedControl
              options={props.options || []}
              value={props.value}
              onChange={(v) => store.triggerInteraction('Segmented Control', 'select', v)}
              theme={theme}
            />
          </div>
        );

      case 'tab-bar':
        return (
          <div className="my-4">
            <TabBar
              items={props.items || []}
              value={props.value}
              onChange={(v) => store.triggerInteraction('Tab Bar', 'select', v)}
              theme={theme}
            />
          </div>
        );

      // Overlays
      case 'animated-tooltip':
        return (
          <div className="flex justify-center my-4">
            <AnimatedTooltip
              content={props.content || 'Tooltip'}
              side={props.side || 'top'}
              theme={theme}
            >
              <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm">
                Hover me
              </div>
            </AnimatedTooltip>
          </div>
        );

      case 'command-palette':
        return (
          <div className="my-4">
            <CommandPalette
              items={props.items || []}
              open={props.open ?? false}
              onClose={() => store.triggerInteraction('Command Palette', 'close', '')}
              theme={theme}
            />
          </div>
        );

      case 'drawer':
        return (
          <div className="my-4">
            <Drawer
              open={props.open ?? false}
              onClose={() => store.triggerInteraction('Drawer', 'close', '')}
              side={props.side || 'right'}
              title={props.title}
              theme={theme}
            >
              <div className="text-zinc-400 text-sm">Drawer content</div>
            </Drawer>
          </div>
        );

      case 'morphing-dialog':
        return (
          <div className="my-4">
            <MorphingDialog
              open={props.open ?? false}
              onClose={() => store.triggerInteraction('Morphing Dialog', 'close', '')}
              title={props.title}
              theme={theme}
            >
              <div className="text-zinc-400 text-sm">Dialog content</div>
            </MorphingDialog>
          </div>
        );

      case 'toast':
        return (
          <div className="my-4">
            <Toast
              message={props.message || 'Notification'}
              type={props.type || 'info'}
              open={props.open ?? false}
              onClose={() => store.triggerInteraction('Toast', 'close', '')}
              theme={theme}
            />
          </div>
        );

      // Text
      case 'text-animate':
        return (
          <div className="flex justify-center my-4">
            <TextAnimate
              text={props.text || 'Animated Text'}
              animation={props.animation || 'fade'}
              delay={props.delay || 0}
              theme={theme}
            />
          </div>
        );

      case 'text-scramble':
        return (
          <div className="flex justify-center my-4">
            <TextScramble
              text={props.text || 'Scramble Text'}
              duration={props.duration || 1000}
              theme={theme}
            />
          </div>
        );

      case 'highlighter':
        return (
          <div className="flex justify-center my-4">
            <Highlighter
              text={props.text || 'Highlighted text'}
              highlight={props.highlight || 'Highlighted'}
              variant={props.variant || 'background'}
              theme={theme}
            />
          </div>
        );

      // AI
      case 'agent-flow':
        return (
          <div className="flex justify-center my-4">
            <AgentFlow
              steps={props.steps || []}
              theme={theme}
            />
          </div>
        );

      case 'agent-timeline':
        return (
          <div className="my-4">
            <AgentTimeline
              events={props.events || []}
              theme={theme}
            />
          </div>
        );

      case 'conversation-thread':
        return (
          <div className="my-4">
            <ConversationThread
              messages={props.messages || []}
              theme={theme}
            />
          </div>
        );

      case 'prompt-composer':
        return (
          <div className="my-4">
            <PromptComposer
              placeholder={props.placeholder}
              onSubmit={(v) => store.triggerInteraction('Prompt Composer', 'submit', v)}
              theme={theme}
            />
          </div>
        );

      case 'prompt-suggestions':
        return (
          <div className="my-4">
            <PromptSuggestions
              suggestions={props.suggestions || []}
              onSelect={(s) => store.triggerInteraction('Prompt Suggestions', 'select', s)}
              theme={theme}
            />
          </div>
        );

      case 'source-citations':
        return (
          <div className="my-4">
            <SourceCitations
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      // Collaboration
      case 'comment-pin':
        return (
          <div className="flex justify-center my-4">
            <CommentPin
              author={props.author || 'User'}
              content={props.content || 'Comment'}
              theme={theme}
            />
          </div>
        );

      case 'live-cursors':
        return (
          <div className="my-4 relative h-32">
            <LiveCursors
              cursors={props.cursors || []}
              theme={theme}
            />
          </div>
        );

      case 'notification-inbox':
        return (
          <div className="my-4">
            <NotificationInbox
              notifications={props.notifications || []}
              onRead={(id) => store.triggerInteraction('Notification Inbox', 'read', id)}
              onDismiss={(id) => store.triggerInteraction('Notification Inbox', 'dismiss', id)}
              theme={theme}
            />
          </div>
        );

      case 'presence-facepile':
        return (
          <div className="flex justify-center my-4">
            <PresenceFacepile
              users={props.users || []}
              max={props.max || 5}
              theme={theme}
            />
          </div>
        );

      // Visualizations
      case 'animated-beam':
        return (
          <div className="my-4">
            <AnimatedBeam
              direction={props.direction || 'horizontal'}
              duration={props.duration || 2}
              theme={theme}
            />
          </div>
        );

      case 'globe':
        return (
          <div className="flex justify-center my-4">
            <Globe
              size={props.size || 200}
              dots={props.dots || 50}
              theme={theme}
            />
          </div>
        );

      case 'gravity':
        return (
          <div className="my-4">
            <Gravity
              count={props.count || 20}
              theme={theme}
            />
          </div>
        );

      case 'orbiting-circles':
        return (
          <div className="flex justify-center my-4">
            <OrbitingCircles
              orbits={props.orbits || 3}
              itemsPerOrbit={props.itemsPerOrbit || 6}
              theme={theme}
            />
          </div>
        );

      case 'scroll-timeline':
        return (
          <div className="my-4">
            <ScrollTimeline
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'world-map':
        return (
          <div className="my-4">
            <WorldMap
              points={props.points || []}
              theme={theme}
            />
          </div>
        );

      // Layout
      case 'accordion':
        return (
          <div className="my-4">
            <Accordion
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'animated-testimonials':
        return (
          <div className="my-4">
            <AnimatedTestimonials
              theme={theme}
            />
          </div>
        );

      case 'app-showcase':
        return (
          <div className="my-4">
            <AppShowcase
              theme={theme}
            />
          </div>
        );

      case 'avatar-group':
        return (
          <div className="flex justify-center my-4">
            <AvatarGroup
              avatars={props.avatars || []}
              max={props.max || 4}
              size={props.size || 'md'}
              theme={theme}
            />
          </div>
        );

      case 'card-swap':
        return (
          <div className="my-4">
            <CardSwap
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'container-scroll':
        return (
          <div className="my-4">
            <ContainerScroll
              theme={theme}
            >
              <div className="p-8 text-center text-zinc-400">Scroll content</div>
            </ContainerScroll>
          </div>
        );

      case 'cover-flow':
        return (
          <div className="my-4">
            <CoverFlow
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'gooey-stack':
        return (
          <div className="flex justify-center my-4">
            <GooeyStack
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'hero-parallax':
        return (
          <div className="my-4">
            <HeroParallax
              title={props.title || 'Hero Title'}
              subtitle={props.subtitle}
              backgroundImage={props.backgroundImage}
              theme={theme}
            />
          </div>
        );

      case 'image-accordion':
        return (
          <div className="my-4">
            <ImageAccordion
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'image-compare':
        return (
          <div className="my-4">
            <ImageCompare
              beforeImage={props.beforeImage || ''}
              afterImage={props.afterImage || ''}
              theme={theme}
            />
          </div>
        );

      case 'inertia-gallery':
        return (
          <div className="my-4">
            <InertiaGallery
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'morph-gallery':
        return (
          <div className="my-4">
            <MorphGallery
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'orbit-carousel':
        return (
          <div className="my-4">
            <OrbitCarousel
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'progressive-card-reveal':
        return (
          <div className="my-4">
            <ProgressiveCardReveal
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'reorder-list':
        return (
          <div className="my-4">
            <ReorderList
              items={props.items || []}
              onReorder={(items) => store.triggerInteraction('Reorder List', 'reorder', `${items.length} items`)}
              theme={theme}
            />
          </div>
        );

      case 'scroll-stack':
        return (
          <div className="my-4">
            <ScrollStack
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'spin-viewer':
        return (
          <div className="my-4">
            <SpinViewer
              images={props.images || []}
              theme={theme}
            />
          </div>
        );

      case 'split-flap-display':
        return (
          <div className="flex justify-center my-4">
            <SplitFlapDisplay
              text={props.text || 'HELLO'}
              theme={theme}
            />
          </div>
        );

      case 'stepper':
        return (
          <div className="flex justify-center my-4">
            <Stepper
              steps={props.steps || []}
              currentStep={props.currentStep || 0}
              theme={theme}
            />
          </div>
        );

      case 'sticky-scroll':
        return (
          <div className="my-4">
            <StickyScroll
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'stack-badge':
        return (
          <div className="flex justify-center my-4">
            <StackBadge
              items={props.items || []}
              theme={theme}
            />
          </div>
        );

      case 'store-badge':
        return (
          <div className="flex justify-center my-4">
            <StoreBadge
              platform={props.platform || 'ios'}
              theme={theme}
              onClick={() => store.triggerInteraction('Store Badge', 'click', props.platform)}
            />
          </div>
        );

      case 'swipe-deck':
        return (
          <div className="my-4">
            <SwipeDeck
              items={props.items || []}
              theme={theme}
              onSwipe={(dir, i) => store.triggerInteraction('Swipe Deck', dir, `Card ${i}`)}
            />
          </div>
        );

      case 'three-d-marquee':
        return (
          <div className="my-4">
            <ThreeDMarquee
              items={props.items || []}
              speed={props.speed || 20}
              theme={theme}
            />
          </div>
        );

      case 'holographic-card':
        return (
          <div className="max-w-md mx-auto my-4">
            <HolographicCard
              title={props.title}
              theme={theme}
            >
              <div className="text-zinc-400 text-sm">Card content</div>
            </HolographicCard>
          </div>
        );

      // Effects
      case 'beam-draw':
        return (
          <div className="my-4">
            <BeamDraw
              duration={props.duration || 2}
              theme={theme}
            />
          </div>
        );

      case 'border-beam':
        return (
          <div className="my-4">
            <BorderBeam
              duration={props.duration || 3}
              theme={theme}
            >
              <div className="p-8 text-center text-zinc-400 text-sm">Content with border beam</div>
            </BorderBeam>
          </div>
        );

      case 'confetti':
        return (
          <div className="my-4">
            <Confetti
              count={props.count || 50}
              active={props.active ?? false}
              theme={theme}
            />
          </div>
        );

      case 'encrypted-card':
        return (
          <div className="max-w-md mx-auto my-4">
            <EncryptedCard
              text={props.text || 'Encrypted Text'}
              theme={theme}
            />
          </div>
        );

      case 'fluid-cursor':
        return (
          <div className="my-4">
            <FluidCursor
              theme={theme}
            />
          </div>
        );

      case 'image-trail':
        return (
          <div className="my-4">
            <ImageTrail
              images={props.images || []}
              theme={theme}
            />
          </div>
        );

      case 'liquid-image':
        return (
          <div className="max-w-md mx-auto my-4">
            <LiquidImage
              src={props.src || ''}
              alt={props.alt || ''}
              theme={theme}
            />
          </div>
        );

      case 'marquee':
        return (
          <div className="my-4">
            <Marquee
              items={props.items || []}
              speed={props.speed || 20}
              reverse={props.reverse ?? false}
              theme={theme}
            />
          </div>
        );

      case 'particle-dissolve':
        return (
          <div className="my-4">
            <ParticleDissolve
              count={props.count || 30}
              theme={theme}
            >
              <div className="p-8 text-center text-zinc-400 text-sm bg-zinc-900 rounded-2xl border border-white/10">
                Click to dissolve
              </div>
            </ParticleDissolve>
          </div>
        );

      case 'scroll-progress':
        return (
          <div className="my-4">
            <ScrollProgress
              theme={theme}
            />
          </div>
        );

      case 'scroll-reveal':
        return (
          <div className="my-4">
            <ScrollReveal
              direction={props.direction || 'up'}
              theme={theme}
            >
              <div className="p-8 text-center text-zinc-400 text-sm">
                Scroll to reveal this content
              </div>
            </ScrollReveal>
          </div>
        );

      case 'spotlight-reveal':
        return (
          <div className="my-4">
            <SpotlightReveal
              theme={theme}
            >
              <div className="p-8 text-center text-zinc-400 text-sm">
                Content with spotlight reveal
              </div>
            </SpotlightReveal>
          </div>
        );

      case 'terminal':
        return (
          <div className="my-4">
            <Terminal
              lines={props.lines || []}
              theme={theme}
            />
          </div>
        );

      // Backgrounds
      case 'flow-field':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <FlowField
              theme={theme}
            />
          </div>
        );

      case 'light-rays':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <LightRays
              count={props.count || 8}
              theme={theme}
            />
          </div>
        );

      case 'liquid-metaballs':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <LiquidMetaballs
              count={props.count || 5}
              theme={theme}
            />
          </div>
        );

      case 'pixel-grid':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <PixelGrid
              pixelSize={props.pixelSize || 4}
              theme={theme}
            />
          </div>
        );

      case 'topographic-drift':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <TopographicDrift
              theme={theme}
            />
          </div>
        );

      case 'warp-starfield':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <WarpStarfield
              count={props.count || 100}
              theme={theme}
            />
          </div>
        );

      // Glass
      case 'liquid-glass-card':
        return (
          <div className="max-w-md mx-auto my-4">
            <LiquidGlassCard
              theme={theme}
            >
              <div className="text-zinc-400 text-sm">Liquid glass content</div>
            </LiquidGlassCard>
          </div>
        );

      case 'liquid-glass-lens':
        return (
          <div className="flex justify-center my-4">
            <LiquidGlassLens
              theme={theme}
            >
              <div className="text-zinc-400 text-sm">Lens content</div>
            </LiquidGlassLens>
          </div>
        );

      // Static Effects
      case 'decorative-background':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <DecorativeBackground
              variant={props.variant || 'dots'}
              theme={theme}
            />
          </div>
        );

      case 'effect-background':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <EffectBackground
              theme={theme}
            >
              <div className="text-zinc-400 text-sm text-center pt-24">Effect Background</div>
            </EffectBackground>
          </div>
        );

      case 'geometric-background':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <GeometricBackground
              theme={theme}
            />
          </div>
        );

      case 'gradient-background':
        return (
          <div className="my-4 h-64 relative rounded-2xl overflow-hidden">
            <GradientBackground
              theme={theme}
            >
              <div className="text-zinc-400 text-sm text-center pt-24">Gradient Background</div>
            </GradientBackground>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isBuilderMode) {
    const entrance = instance.animations?.entrance || 'none';
    const exit = instance.animations?.exit || 'none';
    const hasAnimations = entrance !== 'none' || exit !== 'none';
    const replayKey = store.componentReplayKeys[instance.id] || 0;

    if (hasAnimations) {
      return (
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${instance.id}-${replayKey}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                ...entranceVariants[entrance],
                ...exitVariants[exit],
              }}
            >
              {renderGodUIElement()}
            </motion.div>
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div className="relative w-full">
        {renderGodUIElement()}
      </div>
    );
  }

  // Builder mode with selection border and quick actions
  const entrance = instance.animations?.entrance || 'none';
  const exit = instance.animations?.exit || 'none';
  const hasAnimations = entrance !== 'none' || exit !== 'none';
  const replayKey = store.componentReplayKeys[instance.id] || 0;

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
        {hasAnimations ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${instance.id}-builder-${replayKey}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                ...entranceVariants[entrance],
                ...exitVariants[exit],
              }}
            >
              {renderGodUIElement()}
            </motion.div>
          </AnimatePresence>
        ) : (
          renderGodUIElement()
        )}

        {/* DRAG-AND-DROP FUSION OVERLAY: Active when user drags an effect */}
        {store.draggingItem && (
          <div 
            className="absolute inset-0 z-50 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-[2px] p-2 flex flex-col justify-between pointer-events-auto border-2 border-dashed border-cyan-400/80 animate-pulse"
            data-component-id={instance.id}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
          >
            {/* Upper Slots: ::before Aura & Título */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                data-component-id={instance.id}
                data-fusion-slot="before-glow"
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
                data-component-id={instance.id}
                data-fusion-slot="title"
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
                data-component-id={instance.id}
                data-fusion-slot="border"
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
                data-component-id={instance.id}
                data-fusion-slot="active-item"
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
                data-component-id={instance.id}
                data-fusion-slot="icon"
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
                data-component-id={instance.id}
                data-fusion-slot="background"
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
                data-component-id={instance.id}
                data-fusion-slot="interactive-items"
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
                data-component-id={instance.id}
                data-fusion-slot="after-shine"
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
