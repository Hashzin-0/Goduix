import React, { useId, useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export interface LiquidGooeyCursorProps {
  title?: string;
  description?: string;
  accent?: string;
  intensity?: number;
}

export const LiquidGooeyCursor: React.FC<LiquidGooeyCursorProps> = ({
  title = 'Liquid Gooey Cursor',
  description = 'Mova o ponteiro sobre a área para conectar as partículas líquidas.',
  accent = '#67e8f9',
  intensity = 0.7,
}) => {
  const rawId = useId();
  const filterId = `godui-goo-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [pointer, setPointer] = useState({ x: 50, y: 50, active: false });
  const strength = Math.max(0.1, Math.min(1, intensity));

  return (
    <section
      className="relative mx-auto my-5 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100, active: true });
      }}
      onPointerLeave={() => setPointer((current) => ({ ...current, active: false }))}
    >
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={8 * strength} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300" style={{ opacity: pointer.active ? 0.95 : 0.55, background: `radial-gradient(240px circle at ${pointer.x}% ${pointer.y}%, ${accent}2b, transparent 75%)` }} />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5" style={{ color: accent }}><Sparkles size={18} /></div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{description}</p>
        </div>
        <ArrowUpRight size={18} className="shrink-0 text-zinc-500" />
      </div>
      <div className="relative mt-7 h-24" style={{ filter: `url(#${filterId})` }}>
        <div className="absolute left-[8%] top-6 h-12 w-12 rounded-full transition-transform duration-300" style={{ backgroundColor: accent, transform: `translate(${pointer.active ? (pointer.x - 50) * 0.12 : 0}px, ${pointer.active ? (pointer.y - 50) * 0.08 : 0}px)` }} />
        <div className="absolute left-[20%] top-8 h-8 w-8 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
        <div className="absolute left-[34%] top-4 h-14 w-14 rounded-full transition-transform duration-500" style={{ backgroundColor: accent, transform: `translateY(${pointer.active ? -4 : 4}px)` }} />
        <div className="absolute left-[51%] top-8 h-9 w-9 rounded-full" style={{ backgroundColor: accent, opacity: 0.75 }} />
        <div className="absolute left-[66%] top-5 h-12 w-12 rounded-full transition-transform duration-300" style={{ backgroundColor: accent, transform: `translate(${pointer.active ? (50 - pointer.x) * 0.1 : 0}px, ${pointer.active ? (50 - pointer.y) * 0.08 : 0}px)` }} />
        <div className="absolute left-[81%] top-8 h-8 w-8 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500"><span>SVG metaball filter</span><span>Intensidade {Math.round(strength * 100)}%</span></div>
    </section>
  );
};
