'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastProps = {
  message: string;
  type?: ToastType;
  open?: boolean;
  onClose?: () => void;
  theme: ThemeColors;
  className?: string;
};

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  error: <XCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-400" />,
  info: <Info className="w-5 h-5 text-cyan-400" />,
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  open = false,
  onClose,
  theme,
  className,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl',
            'bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl',
            className
          )}
        >
          {icons[type]}
          <span className="text-sm text-white">{message}</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
