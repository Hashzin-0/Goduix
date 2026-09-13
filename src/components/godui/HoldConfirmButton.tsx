import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldAlert, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface HoldConfirmButtonProps {
  label?: string;
  successText?: string;
  durationMs?: number;
  theme: ThemeColors;
  onConfirm?: () => void;
  className?: string;
}

export const HoldConfirmButton: React.FC<HoldConfirmButtonProps> = ({
  label = 'Segure para Confirmar',
  successText = 'Ação Confirmada!',
  durationMs = 1500,
  theme,
  onConfirm,
  className,
}) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const intervalRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = () => {
    if (isConfirmed) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(intervalRef.current);
        setIsHolding(false);
        setIsConfirmed(true);
        onConfirm?.();
        // Reset after 3 seconds
        setTimeout(() => {
          setIsConfirmed(false);
          setProgress(0);
        }, 3000);
      }
    }, 16);
  };

  const endHold = () => {
    if (isConfirmed) return;
    setIsHolding(false);
    clearInterval(intervalRef.current);
    setProgress(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={cn("inline-flex items-center justify-center p-2", className)}>
      <motion.button
        type="button"
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative overflow-hidden px-7 py-3.5 rounded-full font-medium text-sm select-none transition-all duration-300",
          "bg-zinc-900/90 text-white border border-white/15 shadow-xl cursor-pointer",
          isHolding && "scale-[1.02] border-cyan-500/50"
        )}
        style={{
          boxShadow: isHolding ? `0 0 25px ${theme.glow}` : undefined,
        }}
      >
        {/* Progress fill bar */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-75 pointer-events-none opacity-40"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${theme.primary}80, ${theme.accent})`,
          }}
        />

        {/* Top edge glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2.5">
          {isConfirmed ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-emerald-400 font-semibold"
            >
              <Check className="w-4 h-4" />
              {successText}
            </motion.span>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4 text-zinc-400 group-hover:text-white" />
              <span>{isHolding ? `Segurando... ${Math.round(progress)}%` : label}</span>
              {isHolding && (
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              )}
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
};
