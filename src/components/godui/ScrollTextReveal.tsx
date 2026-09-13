import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={cn("max-w-2xl mx-auto p-6 rounded-3xl bg-zinc-950/60 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-5", className)}>
      <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Scroll Text Reveal</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 font-mono">
            {isInView ? '🟢 Em vista' : '⚫ Fora de vista'}
          </span>
        </div>
      </div>

      {/* Word-by-word reveal using whileInView */}
      <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed tracking-tight select-none">
        {words.map((word, index) => {
          const delay = index * 0.03;

          return (
            <motion.span
              key={index}
              initial={{ opacity: 0.15, y: 6, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ amount: 0.3, once: false }}
              transition={{ duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mr-2"
              style={{
                color: isInView ? '#ffffff' : '#52525b',
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </p>

      <div className="text-[11px] text-zinc-500 font-mono text-center pt-2">
        Role a página para ativar o desfoque cinético palavra por palavra
      </div>
    </div>
  );
};
