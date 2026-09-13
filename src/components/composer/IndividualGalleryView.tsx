import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Box, CreditCard, Magnet, Layers, Sun, Globe, Type, LayoutGrid, ArrowRight, Wand2 } from 'lucide-react';
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
import { ComposerConfig } from '../../types';
import { THEMES } from '../../data/themes';
import { GODUI_COMPONENTS } from '../../data/goduiComponents';
import { cn } from '../../lib/utils';

interface IndividualGalleryViewProps {
  config: ComposerConfig;
  onOpenExportModal: () => void;
}

export const IndividualGalleryView: React.FC<IndividualGalleryViewProps> = ({
  config,
  onOpenExportModal,
}) => {
  const theme = THEMES[config.theme] || THEMES['godly-cyan'];
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Navigation', 'Buttons & Actions', 'Surfaces & Cards', 'Effects & 3D', 'Typography'];

  const filteredComponents = selectedFilter === 'All'
    ? GODUI_COMPONENTS
    : GODUI_COMPONENTS.filter(c => c.category === selectedFilter);

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-zinc-950 text-zinc-100 space-y-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Catálogo Isolado GodUI</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              11 Peças Prontas
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Inspecione o comportamento físico, óptico e 3D de cada componente isolado.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                selectedFilter === cat
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-zinc-400 hover:text-zinc-200 bg-white/[0.02]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Showcase Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Dynamic Island Header */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Navigation</span>
            <span className="text-[11px] text-zinc-500 font-mono">Dynamic Island</span>
          </div>
          <h3 className="text-lg font-bold text-white">Floating Island Header</h3>
          <div className="relative py-8 bg-zinc-950/60 rounded-xl border border-white/5 flex items-center justify-center">
            <FloatingIslandHeader
              title={config.floatingIsland.title}
              showNav={true}
              showBadge={true}
              theme={theme}
              compactOnScroll={false}
              className="sticky top-0"
              onCtaClick={onOpenExportModal}
            />
          </div>
        </div>

        {/* 2. 3D Gyro Tilt Card */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Surfaces & 3D</span>
            <span className="text-[11px] text-zinc-500 font-mono">Perspective 1000px</span>
          </div>
          <h3 className="text-lg font-bold text-white">3D Gyro Tilt Card</h3>
          <div className="p-4 bg-zinc-950/60 rounded-xl border border-white/5 flex items-center justify-center">
            <Tilt3DCard
              theme={theme}
              maxTilt={20}
              category="Interactive Gyro"
              title="Mova o mouse aqui"
            />
          </div>
        </div>

        {/* 3. Liquid Glass Button & Shimmer */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Buttons & Actions</span>
            <span className="text-[11px] text-zinc-500 font-mono">Glass Optics</span>
          </div>
          <h3 className="text-lg font-bold text-white">Liquid Glass & Magic Shimmer</h3>
          <div className="p-8 bg-zinc-950/60 rounded-xl border border-white/5 flex flex-wrap items-center justify-center gap-4">
            <LiquidGlassButton
              label={config.liquidGlass.label}
              theme={theme}
              icon={<Sparkles className="w-4 h-4" />}
            />
            <MagicShimmerButton
              label="Magic Shimmer"
              theme={theme}
              icon={<ArrowRight className="w-4 h-4" />}
            />
            <MagneticButton theme={theme}>
              <span>Magnetic</span>
            </MagneticButton>
          </div>
        </div>

        {/* 4. Inset Glass Card */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Surfaces & Cards</span>
            <span className="text-[11px] text-zinc-500 font-mono">Inset Specular</span>
          </div>
          <h3 className="text-lg font-bold text-white">Inset Glass Surface</h3>
          <div className="p-4 bg-zinc-950/60 rounded-xl border border-white/5">
            <InsetGlassCard
              title="Profundidade Inset Esculpida"
              description="Chanfro interno com sombra negativa que destaca o elemento em fundos escuros de alto contraste."
              badge="GodUI Specular"
              insetDepth="ultra"
              theme={theme}
            />
          </div>
        </div>

        {/* 5. 3D WebGL Mesh & Aurora Typography */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">3D Canvas + Typography</span>
            <span className="text-[11px] text-zinc-500 font-mono">Three.js + Motion</span>
          </div>
          <h3 className="text-lg font-bold text-white">Interactive 3D Mesh com Aurora Text</h3>
          <div className="relative h-64 bg-zinc-950 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center text-center p-6">
            <Interactive3DMesh
              theme={theme}
              mode={config.threeMesh.mode}
              wireframe={config.threeMesh.wireframe}
              speed={config.threeMesh.speed}
              opacity={0.8}
            />
            <div className="relative z-10">
              <AuroraText
                text="Aurora Boreal Shimmer"
                theme={theme}
                size="lg"
              />
              <p className="text-xs text-zinc-400 mt-2">
                Passe o cursor sobre a área para orientar a rotação do giroscópio 3D.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
