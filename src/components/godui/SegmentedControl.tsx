'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SegmentedControlOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(value || options[0]?.value);

  return (
    <div className={cn('inline-flex p-1 rounded-xl bg-zinc-900/80 border border-white/10', className)}>
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => { setActive(option.value); onChange?.(option.value); }}
          className={cn(
            'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            active === option.value ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          {active === option.value && (
            <motion.div
              layoutId="segmented"
              className="absolute inset-0 rounded-lg bg-white/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {option.icon}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};
