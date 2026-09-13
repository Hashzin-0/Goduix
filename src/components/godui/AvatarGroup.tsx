'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type AvatarGroupProps = {
  avatars: string[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  theme: ThemeColors;
  className?: string;
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  theme,
  className,
}) => {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visible.map((src, i) => (
        <div
          key={i}
          className={cn(
            'rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden',
            sizeClasses[size]
          )}
          style={{ zIndex: max - i }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full border-2 border-zinc-900 flex items-center justify-center font-medium',
            sizeClasses[size]
          )}
          style={{ backgroundColor: theme.primary, color: 'white', zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
