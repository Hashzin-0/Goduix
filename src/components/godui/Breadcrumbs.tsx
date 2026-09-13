'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  theme: ThemeColors;
  className?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  theme,
  className,
}) => {
  return (
    <nav className={cn('flex items-center gap-1 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
          <span
            className={cn(
              'transition-colors',
              item.active ? 'text-white font-medium' : 'text-zinc-400 hover:text-zinc-200 cursor-pointer'
            )}
            style={item.active ? { color: theme.primary } : undefined}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};
