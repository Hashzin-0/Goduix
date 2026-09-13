import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff, Sparkles, Send, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface VoiceOrbProps {
  statusLabel?: string;
  orbColor?: 'cyan-violet' | 'emerald-cyan' | 'amber-solar';
  interactiveVoice?: boolean;
  theme: ThemeColors;
  onCommandSend?: (text: string) => void;
  className?: string;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  statusLabel = 'Listening to commands...',
  interactiveVoice = true,
  theme,
  onCommandSend,
  className,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onCommandSend?.(inputText);
    setInputText('');
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-6 space-y-6 max-w-xl mx-auto", className)}>
      {/* Orb container */}
      <div className="relative flex items-center justify-center w-36 h-36">
        {/* Outer ambient blur */}
        <motion.div
          animate={{
            scale: isListening ? [1, 1.4, 1.1] : [1, 1.2, 1],
            opacity: isListening ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
          style={{ backgroundColor: theme.glow }}
        />

        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-dashed border-white/20 pointer-events-none"
        />

        {/* Audio frequency wave bars when listening */}
        {interactiveVoice && isListening && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
            {[40, 70, 100, 60, 90, 50, 80].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [0.3, 1.2, 0.4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                className="w-1 rounded-full bg-white/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}

        {/* Core Sphere */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsListening(!isListening)}
          className={cn(
            "relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300",
            "border border-white/30 backdrop-blur-xl",
            isListening ? "ring-4 ring-cyan-400/40" : ""
          )}
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), ${theme.primary} 45%, #09090b 90%)`,
            boxShadow: `0 0 35px ${theme.glow}, inset 0 2px 4px rgba(255,255,255,0.8)`,
          }}
        >
          {isListening ? (
            <Mic className="w-8 h-8 text-white drop-shadow-md animate-pulse" />
          ) : (
            <Bot className="w-8 h-8 text-white drop-shadow-md" />
          )}
        </motion.button>
      </div>

      {/* Status label */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
        <span
          className={cn("w-2 h-2 rounded-full", isListening ? "bg-cyan-400 animate-ping" : "bg-zinc-500")}
          style={{ backgroundColor: isListening ? theme.primary : undefined }}
        />
        <span>{isListening ? 'Ouvindo microfone... Fale um comando' : statusLabel}</span>
      </div>

      {/* Prompt composer input */}
      <form
        onSubmit={handleSubmit}
        className="w-full relative flex items-center rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl p-1.5 shadow-2xl focus-within:border-cyan-500/50 transition-colors"
      >
        <Sparkles className="w-4 h-4 ml-3 text-cyan-400 shrink-0" />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Peça para a IA do GodUI compor ou ajustar o layout..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
