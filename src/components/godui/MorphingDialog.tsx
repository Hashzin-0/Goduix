'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type MorphingDialogProps = {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
};

export const MorphingDialog: React.FC<MorphingDialogProps> = ({
  open = false,
  onClose,
  title,
  theme,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
              'w-full max-w-md p-6 rounded-2xl',
              'bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl',
              className
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
