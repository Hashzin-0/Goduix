'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

export type FilterBarProps = {
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  value,
  onChange,
  theme,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange?.(option.value)}
          className={cn(
            'relative px-4 py-2 rounded-full text-sm font-medium transition-colors',
            value === option.value ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          {value === option.value && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: theme.primary }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">
            {option.label}
            {option.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-60">({option.count})</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};
