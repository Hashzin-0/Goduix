'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type TabBarItem = {
  value: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

export type TabBarProps = {
  items: TabBarItem[];
  value?: string;
  onChange?: (value: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const TabBar: React.FC<TabBarProps> = ({
  items,
  value,
  onChange,
  theme,
  className,
}) => {
  const [active, setActive] = React.useState(value || items[0]?.value);

  return (
    <div className={cn(
      'flex items-center justify-around py-2 px-4',
      'bg-zinc-900/80 border-t border-white/10',
      className
    )}>
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => { setActive(item.value); onChange?.(item.value); }}
          className={cn(
            'relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors',
            active === item.value ? 'text-white' : 'text-zinc-500'
          )}
        >
          {active === item.value && (
            <motion.div
              layoutId="tab-bar"
              className="absolute inset-0 rounded-xl bg-white/10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.icon}</span>
          <span className="relative z-10 text-[10px] font-medium">{item.label}</span>
          {item.badge && item.badge > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
              style={{ backgroundColor: theme.primary }}
            >
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
