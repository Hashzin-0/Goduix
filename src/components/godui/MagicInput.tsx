import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Search, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface MagicInputProps {
  label?: string;
  placeholder?: string;
  enableRainbowEdge?: boolean;
  theme: ThemeColors;
  className?: string;
}

export const MagicInput: React.FC<MagicInputProps> = ({
  label = 'AI Query or Command',
  placeholder = 'Type prompt or search...',
  enableRainbowEdge = true,
  theme,
  className,
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("relative max-w-md w-full mx-auto p-3", className)}>
      <div className="relative group">
        {/* Animated Rainbow Edge on Focus */}
        {enableRainbowEdge && isFocused && (
          <div className="absolute -inset-[2px] rounded-2xl overflow-hidden pointer-events-none opacity-90">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
              style={{
                background: 'conic-gradient(from 0deg, #ff007f, #00f0ff, #7928ca, #ff007f)',
              }}
            />
          </div>
        )}

        {/* 3D Depth Shadow under input */}
        <div 
          className="absolute inset-0 rounded-2xl bg-zinc-950 border border-white/5 transition-transform"
          style={{ transform: isFocused ? 'translateY(6px)' : 'translateY(3px)' }}
        />

        {/* Main 3D Lifted Input Body */}
        <motion.div
          animate={{
            y: isFocused ? -3 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={cn(
            "relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-900 border transition-colors shadow-xl backdrop-blur-xl",
            isFocused ? "border-white/40" : "border-white/10 group-hover:border-white/20"
          )}
          style={{
            boxShadow: isFocused ? `0 10px 30px -5px ${theme.glow}` : undefined,
          }}
        >
          <Search className={cn("w-4 h-4 transition-colors", isFocused ? "text-cyan-400" : "text-zinc-500")} />

          <div className="flex-1 relative">
            {label && (
              <label 
                className={cn(
                  "block text-[10px] font-mono uppercase tracking-wider transition-colors",
                  isFocused ? "text-cyan-400" : "text-zinc-500"
                )}
              >
                {label}
              </label>
            )}
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-medium mt-0.5"
            />
          </div>

          {value && (
            <button
              onClick={() => setValue('')}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white flex items-center justify-center text-[10px] cursor-pointer"
            >
              ✕
            </button>
          )}

          <div className="w-6 h-6 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
