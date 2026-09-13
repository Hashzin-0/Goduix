import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, CheckCircle2, Shield, Eye, Download, Code2, Layers } from 'lucide-react';
import { FloatingIslandHeader } from '../godui/FloatingIslandHeader';
import { LiquidGlassButton } from '../godui/LiquidGlassButton';
import { MagicShimmerButton } from '../godui/MagicShimmerButton';
import { MagneticButton } from '../godui/MagneticButton';
import { GooeyFab } from '../godui/GooeyFab';
import { InsetGlassCard } from '../godui/InsetGlassCard';
import { Tilt3DCard } from '../godui/Tilt3DCard';
import { ScrollGlowContainer } from '../godui/ScrollGlowContainer';
import { Interactive3DMesh } from '../godui/Interactive3DMesh';
import { AuroraText } from '../godui/AuroraText';
import { BentoGridSection } from '../godui/BentoGridSection';
import { ComposerConfig, ThemeColors } from '../../types';
import { THEMES } from '../../data/themes';
import { cn } from '../../lib/utils';

interface UnifiedCompositeViewProps {
  config: ComposerConfig;
  onOpenExportModal: () => void;
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
}

export const UnifiedCompositeView: React.FC<UnifiedCompositeViewProps> = ({
  config,
  onOpenExportModal,
  viewportMode = 'desktop',
}) => {
  const theme = THEMES[config.theme] || THEMES['godly-cyan'];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position inside interactive scroll container
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const progress = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
    setScrollProgress(progress);
  };

  // Entrance animation variants based on user selection
  const getEntranceVariants = () => {
    switch (config.entranceAnimation) {
      case 'blur-scale-up':
        return {
          hidden: { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
          visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          exit: { opacity: 0, scale: 0.96, filter: 'blur(8px)', transition: { duration: 0.3 } },
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 35 },
          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
          exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
        };
      case 'fade-spring':
        return {
          hidden: { opacity: 0, y: 15, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
        };
      case 'none':
      default:
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
          exit: { opacity: 1 },
        };
    }
  };

  // Looping animation presets
  const getLoopingMotion = () => {
    switch (config.loopingAnimation) {
      case 'gentle-float':
        return {
          animate: { y: [-4, 4, -4] },
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        };
      case 'pulse-glow':
        return {
          animate: { filter: ['drop-shadow(0 0 10px rgba(255,255,255,0.1))', 'drop-shadow(0 0 25px rgba(255,255,255,0.25))', 'drop-shadow(0 0 10px rgba(255,255,255,0.1))'] },
          transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        };
      case 'subtle-orbit':
        return {
          animate: { rotate: [0, 1, 0, -1, 0] },
          transition: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        };
      case 'none':
      default:
        return {};
    }
  };

  const entranceVariants = getEntranceVariants();
  const loopingMotion = getLoopingMotion();

  // Viewport width styling
  const viewportStyles = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] mx-auto border-x border-white/10 shadow-2xl',
    mobile: 'max-w-[390px] mx-auto border-x border-white/10 shadow-2xl rounded-2xl overflow-hidden',
  }[viewportMode];

  return (
    <div className="relative w-full h-full flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Interactive Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={cn(
          "relative flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300",
          viewportStyles
        )}
      >
        {/* Scroll Glow Container wrapper - synchronizes ambient lighting with scrolling */}
        <ScrollGlowContainer
          scrollProgress={scrollProgress}
          theme={theme}
          intensity={config.scrollGlow.intensity}
          syncWithMouse={config.scrollGlow.syncWithMouse}
        >
          {/* Layer 0: 3D Interactive WebGL Mesh (Three.js) positioned behind all 2D UI */}
          {config.activeComponents['interactive-3d-mesh'] && (
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
              <Interactive3DMesh
                theme={theme}
                mode={config.threeMesh.mode}
                wireframe={config.threeMesh.wireframe}
                speed={config.threeMesh.speed}
                opacity={config.threeMesh.opacity}
              />
            </div>
          )}

          {/* Layer 1: Floating Island Dynamic Header */}
          {config.activeComponents['floating-island-header'] && (
            <FloatingIslandHeader
              title={config.floatingIsland.title}
              showNav={config.floatingIsland.showNav}
              showBadge={config.floatingIsland.showBadge}
              compactOnScroll={config.floatingIsland.compactOnScroll}
              blurAmount={config.floatingIsland.blurAmount}
              theme={theme}
              scrollProgress={scrollProgress}
              onCtaClick={onOpenExportModal}
            />
          )}

          {/* Hero Section */}
          <div className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-16 pb-12 max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Animated Badge */}
            <motion.div
              variants={entranceVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-zinc-300 mb-6 shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>GodUI Unified Composition Architecture</span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
            </motion.div>

            {/* Aurora Text / Headline */}
            <motion.div
              variants={entranceVariants}
              initial="hidden"
              animate="visible"
              {...loopingMotion}
              className="mb-6"
            >
              {config.activeComponents['aurora-text'] ? (
                <AuroraText
                  text="Componentes Fluidos Sem Conflito"
                  theme={theme}
                  size="xl"
                />
              ) : (
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                  Componentes Fluidos Sem Conflito
                </h1>
              )}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={entranceVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8"
            >
              Junte ilha flutuante, botões com refração de vidro líquido, profundidade inset negativa,
              feixe 3D giroscópico e iluminação sincronizada com o scroll em um único componente React exportável.
            </motion.p>

            {/* Buttons Group: Liquid Glass, Magic Shimmer, Magnetic */}
            <motion.div
              variants={entranceVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
            >
              {config.activeComponents['liquid-glass-button'] && (
                <LiquidGlassButton
                  label={config.liquidGlass.label}
                  theme={theme}
                  glowIntensity={config.liquidGlass.glowIntensity}
                  withShimmer={config.liquidGlass.withShimmer}
                  icon={<Sparkles className="w-4 h-4" />}
                  onClick={onOpenExportModal}
                />
              )}

              {config.activeComponents['magic-shimmer-button'] && (
                <MagicShimmerButton
                  label="Magic Shimmer"
                  theme={theme}
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={onOpenExportModal}
                />
              )}

              {config.activeComponents['magnetic-button'] && (
                <MagneticButton
                  theme={theme}
                  strength={0.4}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Magnetic Snapping</span>
                </MagneticButton>
              )}
            </motion.div>
          </div>

          {/* Interactive Bento Grid & Inset Surfaces Section */}
          <div className="relative z-10 px-4 sm:px-6 pb-24 max-w-5xl mx-auto space-y-8">
            {config.activeComponents['bento-grid-section'] && (
              <BentoGridSection
                theme={theme}
                columns={config.bentoGrid.columns}
                showStats={config.bentoGrid.showStats}
              />
            )}

            {/* Standalone Inset Glass Card if Bento is turned off */}
            {!config.activeComponents['bento-grid-section'] && config.activeComponents['inset-glass-card'] && (
              <div className="max-w-2xl mx-auto">
                <InsetGlassCard
                  title={config.insetCard.title}
                  description={config.insetCard.description}
                  specularHighlight={config.insetCard.specularHighlight}
                  insetDepth={config.insetCard.insetDepth}
                  borderGlow={config.insetCard.borderGlow}
                  theme={theme}
                />
              </div>
            )}

            {/* Standalone Tilt 3D Card if Bento is turned off */}
            {!config.activeComponents['bento-grid-section'] && config.activeComponents['tilt-3d-card'] && (
              <div className="max-w-md mx-auto">
                <Tilt3DCard
                  maxTilt={config.tiltCard.maxTilt}
                  perspective={config.tiltCard.perspective}
                  glareOpacity={config.tiltCard.glareOpacity}
                  theme={theme}
                />
              </div>
            )}

            {/* Scroll Indicator Prompt */}
            <div className="pt-12 pb-6 text-center text-xs text-zinc-500 font-mono flex flex-col items-center gap-2">
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <span>Role para observar a transição da ilha e do halo de luz</span>
              <span className="text-[11px] text-zinc-400">Progresso do Scroll: {Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </ScrollGlowContainer>
      </div>

      {/* Floating Gooey FAB in the corner */}
      {config.activeComponents['gooey-fab'] && (
        <div className="fixed bottom-6 right-6 z-40">
          <GooeyFab
            theme={theme}
            onActionClick={(action) => {
              if (action === 'code') {
                onOpenExportModal();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
