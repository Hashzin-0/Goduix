'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type DropdownMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export type DropdownMenuProps = {
  trigger?: string;
  items: DropdownMenuItem[];
  theme: ThemeColors;
  className?: string;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger = 'Menu',
  items,
  theme,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl',
          'bg-zinc-900 border border-white/10 text-white text-sm',
          'hover:border-white/20 transition-colors'
        )}
      >
        {trigger}
        <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className={cn(
          'absolute z-50 w-full mt-1 rounded-xl overflow-hidden',
          'bg-zinc-900 border border-white/10 shadow-xl'
        )}>
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => { item.onClick?.(); setOpen(false); }}
              className={cn(
                'w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left',
                'hover:bg-white/5 text-zinc-300 transition-colors'
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
