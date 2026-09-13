import React from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Zap, Activity, Cpu, Sparkles, Compass } from 'lucide-react';
import { InsetGlassCard } from './InsetGlassCard';
import { Tilt3DCard } from './Tilt3DCard';
import { LiquidGlassButton } from './LiquidGlassButton';
import { ThemeColors } from '../../types';
import { cn } from '../../lib/utils';

interface BentoGridSectionProps {
  theme: ThemeColors;
  columns?: 2 | 3;
  showStats?: boolean;
  className?: string;
}

export const BentoGridSection: React.FC<BentoGridSectionProps> = ({
  theme,
  columns = 3,
  showStats = true,
  className,
}) => {
  return (
    <div className={cn("w-full max-w-6xl mx-auto space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Feature Bento Card (Spans 2 columns) */}
        <div className="md:col-span-2">
          <InsetGlassCard
            title="Sintaxe Fluida & Zero Conflito CSS"
            subtitle="Arquitetura de Isolamento GodUI"
            description="Todos os componentes utilizam classes utilitárias isoladas com Tailwind v4, cálculo vetorial de radianos para o giroscópio 3D e renderização de camadas de profundidade ótica que garantem 60 FPS consistentes."
            badge="Motor Sem Conflito"
            insetDepth="ultra"
            theme={theme}
            className="h-full flex flex-col justify-between"
          >
            {showStats && (
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 mt-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl font-bold text-white tracking-tight">0%</div>
                  <div className="text-[11px] text-zinc-400">Conflito CSS</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl font-bold text-white tracking-tight">120 FPS</div>
                  <div className="text-[11px] text-zinc-400">Spring Physics</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl font-bold text-white tracking-tight">WebGL</div>
                  <div className="text-[11px] text-zinc-400">Three.js + 2D</div>
                </div>
              </div>
            )}
          </InsetGlassCard>
        </div>

        {/* 3D Tilt Card (Spans 1 column) */}
        <div className="md:col-span-1">
          <Tilt3DCard
            title="3D Tilt Giroscópio"
            category="GodUI Spatial"
            theme={theme}
            maxTilt={20}
          />
        </div>
      </div>

      {/* Secondary Row Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento item 1 */}
        <InsetGlassCard
          title="Vidro Especular"
          subtitle="Refração Ótica"
          description="Efeito de refração dinâmica que reage instantaneamente ao cursor do mouse."
          badge="Ótica"
          insetDepth="deep"
          theme={theme}
        >
          <div className="flex items-center gap-2 pt-2">
            <Zap className="w-4 h-4" style={{ color: theme.primary }} />
            <span className="text-xs text-zinc-300">Reflexos em tempo real</span>
          </div>
        </InsetGlassCard>

        {/* Bento item 2 */}
        <InsetGlassCard
          title="Glow de Rolagem"
          subtitle="Sincronização"
          description="Raios de luz sincronizados com a porcentagem exata de scroll do viewport."
          badge="Scroll Sync"
          insetDepth="deep"
          theme={theme}
        >
          <div className="flex items-center gap-2 pt-2">
            <Activity className="w-4 h-4" style={{ color: theme.primary }} />
            <span className="text-xs text-zinc-300">Sensibilidade dinâmica</span>
          </div>
        </InsetGlassCard>

        {/* Bento item 3 */}
        <InsetGlassCard
          title="Exportação Pronta"
          subtitle="Código Limpo"
          description="Gere arquivos .tsx modulares com TypeScript e Tailwind v4 prontos para colar."
          badge="Exportador"
          insetDepth="deep"
          theme={theme}
        >
          <div className="flex items-center gap-2 pt-2">
            <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
            <span className="text-xs text-zinc-300">Compatível com React 18 & 19</span>
          </div>
        </InsetGlassCard>
      </div>
    </div>
  );
};
