'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type TextScrambleProps = {
  text: string;
  duration?: number;
  theme: ThemeColors;
  className?: string;
};

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  duration = 1000,
  theme,
  className,
}) => {
  const [displayText, setDisplayText] = React.useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text
          .split('')
          .map((char, i) => {
            if (i < iterations) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iterations += 1 / 3;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, duration / text.length);
    return () => clearInterval(interval);
  };

  React.useEffect(() => {
    const cleanup = scramble();
    return cleanup;
  }, [text, duration]);

  return (
    <span className={cn('font-mono', className)} style={{ color: theme.primary }}>
      {displayText}
    </span>
  );
};
