import React from 'react';
import {
  Basket, Branches, Cabinet, Dish, Drawer, Elevator, Exploded, Format, Hub,
  Keyboard, Laptop, Lockers, Loupe, Padlock, Patch, Phone, Phosphor, Plot,
  Plug, Query, Rail, Rebuild, Relay, Riffle, Router, Settle, Sieve, Slow,
  Stack, Terminal, Terrain, Turntable, Vault,
} from '@lucasmarkes/hairline/react';

type HairlineTheme = 'auto' | 'light' | 'dark';

const FIGURES = {
  terrain: Terrain,
  riffle: Riffle,
  exploded: Exploded,
  phosphor: Phosphor,
  slow: Slow,
  turntable: Turntable,
  keyboard: Keyboard,
  elevator: Elevator,
  phone: Phone,
  laptop: Laptop,
  terminal: Terminal,
  cabinet: Cabinet,
  branches: Branches,
  vault: Vault,
  lockers: Lockers,
  padlock: Padlock,
  patch: Patch,
  dish: Dish,
  router: Router,
  loupe: Loupe,
  sieve: Sieve,
  rail: Rail,
  plug: Plug,
  query: Query,
  drawer: Drawer,
  basket: Basket,
  plot: Plot,
  hub: Hub,
  relay: Relay,
  settle: Settle,
  format: Format,
  rebuild: Rebuild,
  stack: Stack,
} as const;

export type HairlineFigureType = keyof typeof FIGURES;

export interface HairlineFigureProps {
  figureType?: string;
  intensity?: number;
  figureTheme?: HairlineTheme;
  label?: string;
  play?: boolean;
}

/** Adapter for the official Hairline React package, registered in GodUI's builder. */
export function HairlineFigure({
  figureType = 'terrain',
  intensity = 0.65,
  figureTheme = 'auto',
  label = 'Figura isométrica interativa',
  play = false,
}: HairlineFigureProps) {
  const Figure = FIGURES[figureType as HairlineFigureType] || Terrain;

  return (
    <div className="w-full overflow-hidden rounded-xl" aria-label={label}>
      <Figure
        intensity={Math.max(0, Math.min(1, Number.isFinite(intensity) ? intensity : 0.65))}
        theme={figureTheme}
        label={label}
        play={play}
      />
    </div>
  );
}
