import React, { useState } from 'react';
import { MorphIcon } from 'morphicons/react';
import { Menu, X, Search, Mic, Volume2, Check, ArrowRight, Sparkles } from 'lucide';

const ICON_STATES = [
  { name: 'Menu ↔ Fechar', from: Menu, to: X },
  { name: 'Pesquisar ↔ Voz', from: Search, to: Mic },
  { name: 'Áudio ↔ Concluído', from: Volume2, to: Check },
  { name: 'Avançar ↔ Brilho', from: ArrowRight, to: Sparkles },
] as const;

export interface MorphiconsShowcaseProps {
  size?: number;
  color?: string;
  spring?: 'snappy' | 'gentle' | 'bouncy' | 'stiff';
  label?: string;
}

export const MorphiconsShowcase: React.FC<MorphiconsShowcaseProps> = ({
  size = 44,
  color = '#67e8f9',
  spring = 'snappy',
  label = 'Ícones com morphing',
}) => {
  const [states, setStates] = useState<boolean[]>([false, false, false, false]);

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950/70 p-5 text-white shadow-2xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="mt-1 text-xs text-zinc-400">Transições vetoriais com física de mola</p>
        </div>
        <Sparkles size={16} color={color} aria-hidden="true" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ICON_STATES.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={item.name}
            aria-pressed={states[index]}
            onClick={() => setStates((current) => current.map((value, i) => i === index ? !value : value))}
            className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <MorphIcon
              icon={states[index] ? item.to : item.from}
              size={size}
              color={color}
              spring={spring}
              reducedMotion="user"
            />
            <span className="text-center text-[10px] leading-tight text-zinc-300">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
