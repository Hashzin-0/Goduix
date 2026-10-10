import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

type FigureKind = 'terrain' | 'stack' | 'terminal';
type FigureTheme = 'auto' | 'light' | 'dark';

interface IsometricFigureProps {
  figureType?: FigureKind;
  intensity?: number;
  figureTheme?: FigureTheme;
  label?: string;
  play?: boolean;
}

const palettes = {
  light: { front: '#e5e7eb', side: '#cbd5e1', top: '#f8fafc', line: '#64748b', accent: '#0f766e', muted: '#94a3b8' },
  dark: { front: '#27272a', side: '#18181b', top: '#3f3f46', line: '#a1a1aa', accent: '#5eead4', muted: '#52525b' },
};

export const IsometricFigure: React.FC<IsometricFigureProps> = ({
  figureType = 'terrain',
  intensity = 0.65,
  figureTheme = 'auto',
  label,
  play = true,
}) => {
  const reduceMotion = useReducedMotion();
  const dark = figureTheme === 'dark' || (figureTheme === 'auto' && typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  const p = palettes[dark ? 'dark' : 'light'];
  const opacity = Math.max(0, Math.min(1, intensity));
  const accessibleLabel = label || ({ terrain: 'Figura vetorial isométrica de terreno', stack: 'Figura vetorial isométrica de camadas', terminal: 'Figura vetorial isométrica de terminal' } as const)[figureType];

  return (
    <figure className="mx-auto flex w-full flex-col items-center gap-3 py-3" aria-label={accessibleLabel}>
      <motion.svg
        viewBox="0 0 240 190"
        role="img"
        aria-label={accessibleLabel}
        className="h-auto w-full max-w-[260px] overflow-visible"
        initial={false}
        animate={play && !reduceMotion ? { y: [0, -3, 0] } : { y: 0 }}
        transition={{ duration: 4.5, repeat: play && !reduceMotion ? Infinity : 0, ease: 'easeInOut' }}
        style={{ opacity }}
      >
        <defs>
          <linearGradient id="iso-shadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.muted} stopOpacity=".18" />
            <stop offset="100%" stopColor={p.muted} stopOpacity=".02" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="157" rx="78" ry="17" fill="url(#iso-shadow)" />
        {figureType === 'terrain' && <>
          <path d="M45 103 120 61 195 103 120 146Z" fill={p.top} stroke={p.line} strokeWidth="1.4" />
          <path d="M45 103 120 146 120 161 45 118Z" fill={p.front} stroke={p.line} strokeWidth="1.4" />
          <path d="M120 146 195 103 195 118 120 161Z" fill={p.side} stroke={p.line} strokeWidth="1.4" />
          <path d="M70 102 120 74 170 102 120 130Z" fill="none" stroke={p.accent} strokeWidth="1.6" strokeOpacity=".9" />
          <path d="M85 102 120 82 155 102 120 122Z" fill="none" stroke={p.accent} strokeWidth="1.2" strokeOpacity=".55" />
          <path d="M104 101 120 92 136 101 120 110Z" fill={p.accent} fillOpacity=".18" stroke={p.accent} strokeWidth="1.2" />
        </>}
        {figureType === 'stack' && <>
          <path d="M54 119 120 82 186 119 120 156Z" fill={p.front} stroke={p.line} strokeWidth="1.4" />
          <path d="M54 119 120 156 120 169 54 132Z" fill={p.side} stroke={p.line} strokeWidth="1.4" />
          <path d="M120 156 186 119 186 132 120 169Z" fill={p.front} stroke={p.line} strokeWidth="1.4" />
          <path d="M54 96 120 59 186 96 120 133Z" fill={p.top} stroke={p.line} strokeWidth="1.4" />
          <path d="M54 96 120 133 120 146 54 109Z" fill={p.front} stroke={p.line} strokeWidth="1.4" />
          <path d="M120 133 186 96 186 109 120 146Z" fill={p.side} stroke={p.line} strokeWidth="1.4" />
          <path d="M54 73 120 36 186 73 120 110Z" fill={p.top} stroke={p.line} strokeWidth="1.4" />
          <path d="M54 73 120 110 120 123 54 86Z" fill={p.front} stroke={p.line} strokeWidth="1.4" />
          <path d="M120 110 186 73 186 86 120 123Z" fill={p.side} stroke={p.line} strokeWidth="1.4" />
          <path d="M83 73 120 52 157 73 120 94Z" fill={p.accent} fillOpacity=".18" stroke={p.accent} strokeWidth="1.2" />
        </>}
        {figureType === 'terminal' && <>
          <path d="M54 82 120 45 188 83 122 121Z" fill={p.top} stroke={p.line} strokeWidth="1.4" />
          <path d="M54 82 122 121 122 155 54 116Z" fill={p.front} stroke={p.line} strokeWidth="1.4" />
          <path d="M122 121 188 83 188 117 122 155Z" fill={p.side} stroke={p.line} strokeWidth="1.4" />
          <path d="M67 84 120 54 174 84 121 114Z" fill={p.side} stroke={p.line} strokeWidth="1.2" />
          <path d="M77 85 120 61 163 85 120 109Z" fill={p.front} stroke={p.line} strokeWidth="1" />
          <path d="m91 85 8 -5 8 4 -8 5Z" fill={p.accent} />
          <path d="m110 91 28 -16" stroke={p.accent} strokeWidth="2" strokeLinecap="round" />
          <path d="m110 97 18 -10" stroke={p.line} strokeWidth="1.5" strokeLinecap="round" />
          <path d="m71 103 43 25" stroke={p.line} strokeOpacity=".55" strokeWidth="1" />
        </>}
      </motion.svg>
      {label && <figcaption className="text-center text-xs tracking-wide text-zinc-500">{label}</figcaption>}
    </figure>
  );
};

export default IsometricFigure;
