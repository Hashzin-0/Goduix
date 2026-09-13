'use client';

import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SourceCitationItem = {
  title: string;
  url?: string;
  snippet?: string;
};

export type SourceCitationsProps = {
  items: SourceCitationItem[];
  theme: ThemeColors;
  className?: string;
};

export const SourceCitations: React.FC<SourceCitationsProps> = ({
  items,
  theme,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/50 border border-white/5"
        >
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white truncate">{item.title}</span>
              {item.url && <ExternalLink className="w-3 h-3 text-zinc-500 flex-shrink-0" />}
            </div>
            {item.snippet && <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{item.snippet}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
