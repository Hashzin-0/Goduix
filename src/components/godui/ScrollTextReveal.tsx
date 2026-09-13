import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface ScrollTextRevealProps {
  text?: string;
  theme: ThemeColors;
  className?: string;
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  text = 'Next generation interface design powered by mathematical spring physics, specular refraction, and kinetic interaction models.',
  theme,
  className,
}) => {
  const [revealProgress, setRevealProgress] = useState(0.65);
  const words = text.split(' ');

  return (
    <div className={cn("max-w-2xl mx-auto p-6 rounded-3xl bg-zinc-950/60 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-5", className)}>
      <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Scroll Text Reveal</span>
        </div>
        
        {/* Interactive Scrub Slider to test reveal progress */}
        <div className="flex items-center gap-2">
          <Sliders className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] text-zinc-500">Progresso:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={revealProgress}
            onChange={(e) => setRevealProgress(parseFloat(e.target.value))}
            className="w-24 accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] font-mono text-cyan-400 w-8 text-right">
            {Math.round(revealProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Word-by-word reveal */}
      <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed tracking-tight select-none">
        {words.map((word, index) => {
          const wordProgress = index / (words.length - 1);
          const isRevealed = wordProgress <= revealProgress;
          const isCurrent = Math.abs(wordProgress - revealProgress) < 0.08;

          return (
            <motion.span
              key={index}
              animate={{
                opacity: isRevealed ? 1 : 0.2,
                y: isRevealed ? 0 : 3,
                filter: isRevealed ? 'blur(0px)' : 'blur(2px)',
              }}
              transition={{ duration: 0.2 }}
              className="inline-block mr-2 transition-colors"
              style={{
                color: isCurrent ? theme.primary : isRevealed ? '#ffffff' : '#52525b',
                textShadow: isCurrent ? `0 0 20px ${theme.glow}` : undefined,
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </p>

      <div className="text-[11px] text-zinc-500 font-mono text-center pt-2">
        Arraste a barra ou role a página para ativar o desfoque cinético
      </div>
    </div>
  );
};
