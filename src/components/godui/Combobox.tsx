'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ComboboxOption = {
  value: string;
  label: string;
};

export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  theme: ThemeColors;
  className?: string;
};

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  theme,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-2.5 rounded-xl',
          'bg-zinc-900 border border-white/10 text-white text-sm',
          'hover:border-white/20 transition-colors'
        )}
      >
        <span className={selected ? 'text-white' : 'text-zinc-400'}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-zinc-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className={cn(
          'absolute z-50 w-full mt-1 rounded-xl overflow-hidden',
          'bg-zinc-900 border border-white/10 shadow-xl'
        )}>
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => { onChange?.(option.value); setOpen(false); }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5 text-sm text-left',
                'hover:bg-white/5 transition-colors',
                value === option.value && 'bg-white/10'
              )}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="w-4 h-4" style={{ color: theme.primary }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
