'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type StoreBadgeProps = {
  platform: 'ios' | 'android';
  theme: ThemeColors;
  onClick?: () => void;
  className?: string;
};

export const StoreBadge: React.FC<StoreBadgeProps> = ({
  platform,
  theme,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-5 py-3 rounded-xl',
        'bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors',
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: theme.primary }}>
        {platform === 'ios' ? 'A' : '▶'}
      </div>
      <div className="text-left">
        <div className="text-[10px] text-zinc-400">Baixar na</div>
        <div className="text-sm font-semibold text-white">
          {platform === 'ios' ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </button>
  );
};
