'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type TopographicDriftProps = {
  theme: ThemeColors;
  className?: string;
};

export const TopographicDrift: React.FC<TopographicDriftProps> = ({
  theme,
  className,
}) => {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[20, 35, 50, 65, 80].map((cy, i) => (
          <ellipse
            key={i}
            cx="50"
            cy={cy}
            rx={40 + i * 5}
            ry={8 + i * 2}
            fill="none"
            stroke={theme.primary}
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
};
