import React, { useState } from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';

export interface PixelFlowPricingCardsProps {
  title?: string;
  description?: string;
  accent?: string;
  defaultAnnual?: boolean;
}

const PLANS = [
  { name: 'Essential', monthly: 12, annual: 9, summary: 'Para projetos individuais', features: ['3 projetos', 'Componentes essenciais', 'Exportação padrão'], featured: false },
  { name: 'Pro', monthly: 24, annual: 18, summary: 'Para profissionais e equipes pequenas', features: ['Projetos ilimitados', 'Biblioteca completa', 'Exportação avançada', 'Temas personalizados'], featured: true },
  { name: 'Studio', monthly: 49, annual: 37, summary: 'Para times e produtos em escala', features: ['Tudo do Pro', 'Tokens compartilhados', 'Fluxos de equipe', 'Suporte prioritário'], featured: false },
];

export interface PricingPlanSelection {
  name: string;
  interval: 'monthly' | 'annual';
  price: number;
}

export const PixelFlowPricingCards: React.FC<PixelFlowPricingCardsProps> = ({
  title = 'Planos para construir melhor',
  description = 'Escolha a camada de ferramentas adequada ao seu fluxo.',
  accent = '#818cf8',
  defaultAnnual = true,
}) => {
  const [annual, setAnnual] = useState(defaultAnnual);
  const [selected, setSelected] = useState('');
  const interval = annual ? 'annual' : 'monthly';

  return (
    <section className="relative mx-auto my-5 w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#07070b] p-5 text-white sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}1b, transparent 56%), radial-gradient(ellipse at 90% 100%, ${accent}0b, transparent 45%)` }} />
      <div className="relative z-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ borderColor: `${accent}55`, color: accent }}><Sparkles size={12} /> Pricing studio</span>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
          <div className="mt-5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 text-xs transition-colors ${!annual ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'}`}>Mensal</button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 text-xs transition-colors ${annual ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'}`}>Anual <span className="ml-1 opacity-70">−25%</span></button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            const featured = plan.featured;
            return (
              <article key={plan.name} className={`relative flex flex-col rounded-3xl border p-5 transition-transform hover:-translate-y-1 sm:p-6 ${featured ? 'border-white/20 bg-white/[0.07] shadow-2xl' : 'border-white/10 bg-white/[0.025]'}`} style={featured ? { boxShadow: `0 20px 70px ${accent}15` } : undefined}>
                {featured && <span className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider" style={{ backgroundColor: `${accent}25`, color: accent }}>Mais popular</span>}
                <h4 className="text-base font-semibold">{plan.name}</h4>
                <p className="mt-2 min-h-9 text-xs leading-relaxed text-zinc-400">{plan.summary}</p>
                <div className="mt-5 flex items-baseline gap-1"><span className="text-sm text-zinc-400">R$</span><span className="text-4xl font-semibold tracking-tight">{price}</span><span className="text-xs text-zinc-500">/ mês</span></div>
                {annual && <p className="mt-1 text-[10px] text-zinc-500">Cobrança anual ilustrativa</p>}
                <button type="button" onClick={() => setSelected(plan.name)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold transition-colors hover:brightness-110" style={featured ? { backgroundColor: accent, borderColor: accent, color: '#09090b' } : { borderColor: 'rgba(255,255,255,.15)', backgroundColor: 'rgba(255,255,255,.04)' }}>
                  {featured && <Zap size={14} />} {selected === plan.name ? 'Plano selecionado' : `Escolher ${plan.name}`}
                </button>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-xs text-zinc-300"><Check size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />{feature}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
        <p role="status" className="mt-5 text-center text-xs text-zinc-400">{selected ? `${selected} selecionado · intervalo ${interval === 'annual' ? 'anual' : 'mensal'}. Demonstração visual: nenhum pagamento é processado.` : 'Valores demonstrativos e editáveis; nenhum checkout está conectado.'}</p>
        <p className="mt-3 text-center text-[10px] text-zinc-600">Reimplementação React independente baseada nas ideias de pricing-card-section, com atribuição ao PixelFlow.</p>
      </div>
    </section>
  );
};
