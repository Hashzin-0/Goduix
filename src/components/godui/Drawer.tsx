'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
};

export const Drawer: React.FC<DrawerProps> = ({
  open = false,
  onClose,
  side = 'right',
  title,
  theme,
  children,
  className,
}) => {
  const positionClasses = {
    left: 'inset-y-0 left-0 w-80',
    right: 'inset-y-0 right-0 w-80',
    top: 'inset-x-0 top-0 h-80',
    bottom: 'inset-x-0 bottom-0 h-80',
  };

  const slideFrom = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' },
  };

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
            initial={slideFrom[side]}
            animate={{ x: 0, y: 0 }}
            exit={slideFrom[side]}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed z-50 bg-zinc-900/95 backdrop-blur-xl border-white/10 shadow-2xl',
              side === 'left' || side === 'right' ? 'border-l border-r' : 'border-t border-b',
              positionClasses[side],
              className
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-52px)]">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
