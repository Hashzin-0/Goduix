'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type MagicTabItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export type MagicTabProps = {
  items: MagicTabItem[];
  value?: string;
  onChange?: (value: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const MagicTab: React.FC<MagicTabProps> = ({
  items,
  value,
  onChange,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(value || items[0]?.value);

  return (
    <div className={cn('flex gap-1 p-1 rounded-xl bg-zinc-900/80 border border-white/10', className)}>
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => { setActive(item.value); onChange?.(item.value); }}
          className={cn(
            'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            active === item.value ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          {active === item.value && (
            <motion.div
              layoutId="magic-tab"
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: `${theme.primary}20`, border: `1px solid ${theme.primary}40` }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};
