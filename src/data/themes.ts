import { ThemeColors, ThemePalette } from '../types';

export const THEMES: Record<ThemePalette, ThemeColors> = {
  'godly-cyan': {
    name: 'Godly Cyan',
    id: 'godly-cyan',
    primary: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    accent: '#38bdf8',
    ring: 'border-cyan-500/40',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
  },
  'neon-emerald': {
    name: 'Cyber Emerald',
    id: 'neon-emerald',
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    accent: '#34d399',
    ring: 'border-emerald-500/40',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
  },
  'hyper-violet': {
    name: 'Hyper Violet',
    id: 'hyper-violet',
    primary: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    accent: '#c084fc',
    ring: 'border-purple-500/40',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
  },
  'liquid-amber': {
    name: 'Liquid Amber',
    id: 'liquid-amber',
    primary: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    accent: '#fbbf24',
    ring: 'border-amber-500/40',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
  },
  'clean-monochrome': {
    name: 'Obsidian Silver',
    id: 'clean-monochrome',
    primary: '#f4f4f5',
    glow: 'rgba(255, 255, 255, 0.3)',
    accent: '#e4e4e7',
    ring: 'border-zinc-400/30',
    gradient: 'from-zinc-100 via-zinc-400 to-zinc-600',
  },
};
