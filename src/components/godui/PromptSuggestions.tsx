'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type PromptSuggestionsProps = {
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  suggestions,
  onSelect,
  theme,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {suggestions.map((suggestion, i) => (
        <button
          key={i}
          onClick={() => onSelect?.(suggestion)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium',
            'bg-white/5 border border-white/10 text-zinc-300',
            'hover:bg-white/10 hover:text-white transition-colors'
          )}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};
