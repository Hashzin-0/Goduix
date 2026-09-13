'use client';

import * as React from 'react';
import { Send } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type PromptComposerProps = {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const PromptComposer: React.FC<PromptComposerProps> = ({
  placeholder = 'Type your prompt...',
  onSubmit,
  theme,
  className,
}) => {
  const [value, setValue] = React.useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value);
      setValue('');
    }
  };

  return (
    <div className={cn(
      'flex items-center gap-2 p-2 rounded-2xl',
      'bg-zinc-900 border border-white/10',
      className
    )}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        className={cn(
          'p-2 rounded-xl transition-colors',
          value.trim()
            ? 'text-white hover:brightness-110'
            : 'text-zinc-600 cursor-not-allowed'
        )}
        style={value.trim() ? { backgroundColor: theme.primary } : undefined}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};
