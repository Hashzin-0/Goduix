'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
};

export type CommandPaletteProps = {
  items: CommandItem[];
  open?: boolean;
  onClose?: () => void;
  onSearch?: (query: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  open = false,
  onClose,
  onSearch,
  theme,
  className,
}) => {
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(0);

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    setSelected(0);
  }, [query]);

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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={cn(
              'fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50',
              'bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden',
              className
            )}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => { item.onSelect?.(); onClose?.(); }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                    i === selected ? 'bg-white/10' : 'hover:bg-white/5'
                  )}
                >
                  {item.icon && <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">{item.icon}</span>}
                  <div className="flex-1">
                    <div className="text-sm text-white">{item.label}</div>
                    {item.description && <div className="text-xs text-zinc-500">{item.description}</div>}
                  </div>
                  {item.shortcut && (
                    <span className="text-xs text-zinc-500 font-mono">{item.shortcut}</span>
                  )}
                  <ArrowRight className="w-4 h-4 text-zinc-500" />
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-8 text-zinc-500 text-sm">No results found</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
