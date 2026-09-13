'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type TerminalLine = {
  command?: string;
  output?: string;
};

export type TerminalProps = {
  lines: TerminalLine[];
  theme: ThemeColors;
  className?: string;
};

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  theme,
  className,
}) => {
  const [currentLine, setCurrentLine] = React.useState(0);

  React.useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => setCurrentLine(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines.length]);

  return (
    <div className={cn(
      'rounded-2xl overflow-hidden font-mono text-sm',
      'bg-zinc-950 border border-white/10',
      className
    )}>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-xs text-zinc-500">Terminal</span>
      </div>
      <div className="p-4 space-y-1">
        {lines.slice(0, currentLine).map((line, i) => (
          <div key={i}>
            {line.command && (
              <div className="flex items-center gap-2">
                <span style={{ color: theme.primary }}>$</span>
                <span className="text-white">{line.command}</span>
              </div>
            )}
            {line.output && (
              <div className="text-zinc-400 ml-4">{line.output}</div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span style={{ color: theme.primary }}>$</span>
          <span className="w-2 h-4 bg-white/80 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
