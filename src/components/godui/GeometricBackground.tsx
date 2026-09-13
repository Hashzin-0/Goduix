'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type GeometricBackgroundProps = {
  theme: ThemeColors;
  className?: string;
};

export const GeometricBackground: React.FC<GeometricBackgroundProps> = ({
  theme,
  className,
}) => {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(30deg, ${theme.primary} 12%, transparent 12.5%, transparent 87%, ${theme.primary} 87.5%, ${theme.primary}),
            linear-gradient(150deg, ${theme.primary} 12%, transparent 12.5%, transparent 87%, ${theme.primary} 87.5%, ${theme.primary}),
            linear-gradient(30deg, ${theme.primary} 12%, transparent 12.5%, transparent 87%, ${theme.primary} 87.5%, ${theme.primary}),
            linear-gradient(150deg, ${theme.primary} 12%, transparent 12.5%, transparent 87%, ${theme.primary} 87.5%, ${theme.primary})
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
        }}
      />
    </div>
  );
};
