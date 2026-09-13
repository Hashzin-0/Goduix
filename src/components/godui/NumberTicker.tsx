import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { RotateCw, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface NumberTickerProps {
  value?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  theme: ThemeColors;
  className?: string;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value = 84920,
  prefix = '$',
  suffix = ' USD',
  label = 'Total Processed Volume',
  theme,
  className,
}) => {
  const springValue = useSpring(0, { stiffness: 60, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  const handleReplay = () => {
    springValue.set(0);
    setTimeout(() => {
      springValue.set(value);
    }, 150);
  };

  return (
    <div className={cn("relative p-6 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl max-w-sm mx-auto shadow-2xl text-center select-none", className)}>
      <div className="flex items-center justify-between mb-3 text-zinc-400 text-xs">
        <div className="flex items-center gap-1.5 font-mono uppercase tracking-wider text-[10px]">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>{label}</span>
        </div>
        <button
          onClick={handleReplay}
          title="Repetir Animação"
          className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div 
        className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums"
        style={{
          color: theme.primary,
          textShadow: `0 0 30px ${theme.glow}`,
        }}
      >
        <span className="text-2xl text-white/60 mr-1">{prefix}</span>
        <span>{displayValue.toLocaleString('en-US')}</span>
        <span className="text-sm font-sans font-bold text-zinc-400 ml-1.5">{suffix}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          +28.4% este mês
        </span>
        <span className="text-[10px] text-zinc-500 font-mono">
          Spring Tabular Physics
        </span>
      </div>
    </div>
  );
};
