import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Droplets, 
  FlaskConical, 
  Magnet, 
  Layers, 
  SunMedium, 
  Flame, 
  Clock, 
  Zap, 
  Check, 
  ArrowRight,
  Info,
  Sliders,
  Palette,
  Wand2,
  Terminal,
  MousePointerClick
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { THEMES } from '../../data/themes';
import { FUSION_DONORS, FUSION_PRESETS, FUSION_TRIGGERS, FUSION_SLOT_DEFINITIONS } from '../../data/fusionCatalog';
import { FusionEffectType, FusionTargetSlot, FusionTriggerType } from '../../types/builder';
import { cn } from '../../lib/utils';

export const FusionModal: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  const targetComponent = store.components.find(c => c.id === store.activeFusionComponentId);

  const [selectedEffect, setSelectedEffect] = useState<FusionEffectType>('liquid-glass');
  const [selectedSlot, setSelectedSlot] = useState<FusionTargetSlot>('active-item');
  const [selectedTrigger, setSelectedTrigger] = useState<FusionTriggerType>('hover');
  const [intensity, setIntensity] = useState<number>(0.9);
  const [withShimmer, setWithShimmer] = useState<boolean>(true);
  const [withGlow, setWithGlow] = useState<boolean>(true);

  if (!store.isFusionModalOpen || !targetComponent) return null;

  const donorMeta = FUSION_DONORS[selectedEffect];
  const compatibleSlots = donorMeta?.compatibleSlots || [];

  // Filter presets compatible with this component
  const componentPresets = FUSION_PRESETS.filter(p => p.targetComponentType === targetComponent.type);

  const handleApply = () => {
    store.addFusion(targetComponent.id, {
      sourceEffect: selectedEffect,
      sourceComponentName: donorMeta.name,
      targetSlot: selectedSlot,
      trigger: selectedTrigger,
      intensity,
      withShimmer,
      withGlow,
      active: true,
    });
  };

  const getEffectIcon = (effect: FusionEffectType) => {
    switch (effect) {
      case 'liquid-glass': return <Droplets className="w-5 h-5 text-sky-400" />;
      case 'gooey-liquid': return <FlaskConical className="w-5 h-5 text-purple-400" />;
      case 'magnetic-pull': return <Magnet className="w-5 h-5 text-emerald-400" />;
      case 'shimmer-beam': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'hologram-3d-tilt': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'spotlight-beam': return <SunMedium className="w-5 h-5 text-pink-400" />;
      case 'aurora-glow': return <Flame className="w-5 h-5 text-violet-400" />;
      case 'hold-confirm-ring': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'jelly-bounce': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'magic-sparkle': return <Wand2 className="w-5 h-5 text-cyan-400" />;
      case 'lamp-beam': return <SunMedium className="w-5 h-5 text-amber-400" />;
      case 'ascii-dither-fx': return <Terminal className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-950 border border-white/15 text-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-950 font-bold shadow-lg"
              style={{ backgroundColor: theme.primary }}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Motor de Fusão & Mescla GodUI
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                  Fusion Engine
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Fundindo efeitos no componente: <strong className="text-zinc-200">{targetComponent.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={store.closeFusionModal}
            className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Presets for this component if any */}
          {componentPresets.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Fusões Recomendadas para {targetComponent.name}:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {componentPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      store.applyFusionPreset(targetComponent.id, preset.id);
                      store.closeFusionModal();
                    }}
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 text-left transition-all group cursor-pointer flex items-center justify-between"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                          {preset.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300">
                          {preset.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {preset.description}
                      </p>
                    </div>
                    <div 
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-zinc-950 font-bold shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Choose Donor Component & Effect */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                1. Selecione o Componente / Efeito Doador
              </label>
              <span className="text-[11px] text-cyan-400 font-mono">
                {Object.keys(FUSION_DONORS).length} efeitos disponíveis
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(FUSION_DONORS) as FusionEffectType[]).map((effectKey) => {
                const donor = FUSION_DONORS[effectKey];
                const isSelected = selectedEffect === effectKey;

                return (
                  <button
                    key={effectKey}
                    onClick={() => setSelectedEffect(effectKey)}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[110px]",
                      isSelected 
                        ? "bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-950/40" 
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/70"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                          {getEffectIcon(effectKey)}
                        </div>
                        {isSelected && (
                          <div 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-950 shadow"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight">{donor.name}</h4>
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-1 line-clamp-1">
                      {donor.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Choose WHERE to apply in target component */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                2. Onde aplicar este efeito no {targetComponent.name}?
              </label>
              <span className="text-[11px] text-zinc-400">
                Slots, Borda, Ícone, ::before, ::after e Tipografia
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {FUSION_SLOT_DEFINITIONS.map((slotItem) => {
                const isSelected = selectedSlot === slotItem.slot;
                const isCompatible = compatibleSlots.some(s => s.slot === slotItem.slot);

                return (
                  <button
                    key={slotItem.slot}
                    onClick={() => setSelectedSlot(slotItem.slot)}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5",
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400 shadow-md ring-1 ring-cyan-400/50"
                        : isCompatible
                        ? "bg-zinc-900/60 border-white/10 hover:border-white/25 hover:bg-zinc-900/80"
                        : "bg-zinc-900/30 border-white/5 opacity-80 hover:opacity-100 hover:border-white/15"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-4 h-4 rounded-md flex items-center justify-center border text-[9px] shrink-0 mt-0.5",
                        isSelected 
                          ? "bg-cyan-400 text-zinc-950 font-bold border-cyan-300" 
                          : "border-white/20 text-transparent"
                      )}
                    >
                      ✓
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white leading-tight">
                          {slotItem.label}
                        </span>
                        {slotItem.tag && (
                          <span className="px-1 py-0.2 rounded text-[8px] font-mono bg-white/10 text-zinc-300">
                            {slotItem.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                        {slotItem.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Choose HOW it is activated (Trigger) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Como o efeito será ativado? (Gatilho de Interação)</span>
              </label>
              <span className="text-[11px] font-mono text-cyan-400">
                {FUSION_TRIGGERS.length} modos de disparo
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {FUSION_TRIGGERS.map((trig) => {
                const isSelected = selectedTrigger === trig.id;
                return (
                  <button
                    key={trig.id}
                    onClick={() => setSelectedTrigger(trig.id)}
                    className={cn(
                      "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400 shadow-md ring-1 ring-cyan-400/50"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/70"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{trig.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 leading-tight">
                      {trig.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Parameters & Fine Tuning */}
          <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/40 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>4. Ajuste de Intensidade e Ótica</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Intensity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Intensidade do Efeito</span>
                  <span className="font-mono text-cyan-400">{Math.round(intensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-zinc-800 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Shimmer Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-white block">Shimmer Iridescente</span>
                  <span className="text-[10px] text-zinc-400 block">Linha de luz cromática</span>
                </div>
                <input
                  type="checkbox"
                  checked={withShimmer}
                  onChange={(e) => setWithShimmer(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                />
              </div>

              {/* Glow Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-white block">Glow Atmosférico</span>
                  <span className="text-[10px] text-zinc-400 block">Halo difuso com cor do tema</span>
                </div>
                <input
                  type="checkbox"
                  checked={withGlow}
                  onChange={(e) => setWithGlow(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 truncate">
            Mesclando: <span className="text-cyan-300 font-bold">{donorMeta?.name}</span> ➔ <span className="text-zinc-200">{selectedSlot}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={store.closeFusionModal}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 hover:brightness-110 transition-all cursor-pointer shadow-lg flex items-center gap-2"
              style={{ backgroundColor: theme.primary }}
            >
              <Zap className="w-4 h-4" />
              <span>Fundir Componentes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
