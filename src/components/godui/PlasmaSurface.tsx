import React, { useEffect, useState } from 'react';
import { Plasma, PlasmaProvider } from '@cruxgarden/plasma-ui';

export interface PlasmaSurfaceProps {
  title?: string;
  description?: string;
  mood?: 'tidal' | 'aurora' | 'ember';
  tint?: string;
  opacity?: number;
  frost?: number;
  viscosity?: number;
  flow?: number;
  interactive?: boolean;
}

export const PlasmaSurface: React.FC<PlasmaSurfaceProps> = ({
  title = 'Plasma Surface',
  description = 'Superfície líquida com refração, tensão superficial e reflexos cromáticos.',
  mood = 'tidal',
  tint = '#67e8f9',
  opacity = 0.12,
  frost = 0.2,
  viscosity = 0.5,
  flow = 0.25,
  interactive = true,
}) => {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');
    const update = () => setUseFallback(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  const content = (
    <>
      <span className="mb-3 inline-flex rounded-full border border-white/15 bg-black/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/70">PLASMA MATERIAL</span>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider text-white/50">
        <span className="rounded-lg border border-white/10 px-2 py-1">Mood: {mood}</span>
        <span className="rounded-lg border border-white/10 px-2 py-1">Frost: {frost.toFixed(2)}</span>
        <span className="rounded-lg border border-white/10 px-2 py-1">Flow: {flow.toFixed(2)}</span>
      </div>
    </>
  );

  if (useFallback) {
    return (
      <section className="relative mx-auto my-5 w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/15 bg-zinc-950/80 p-6 shadow-xl">
        <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 15% 10%, ${tint}33, transparent 42%), radial-gradient(circle at 85% 90%, ${tint}22, transparent 40%)` }} />
        <div className="relative">{content}<p className="mt-4 text-[10px] text-zinc-500">Modo leve ativado para tela pequena ou movimento reduzido.</p></div>
      </section>
    );
  }

  return (
    <div className="mx-auto my-5 w-full max-w-2xl">
      <PlasmaProvider mood={mood as 'tidal' | 'aurora' | 'ember'} theme="dark" tint={tint} opacity={opacity} frost={frost} viscosity={viscosity} flow={flow} stretch={interactive ? 1 : 0} rim={1} shimmer={interactive ? 1 : 0}>
        <Plasma draggable={interactive ? 1 : false} lean={interactive ? 1 : false} className="min-h-56 p-6 text-white">
          {content}
        </Plasma>
      </PlasmaProvider>
    </div>
  );
};
