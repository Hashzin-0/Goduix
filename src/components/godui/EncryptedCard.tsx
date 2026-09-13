'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type EncryptedCardProps = {
  text: string;
  theme: ThemeColors;
  className?: string;
};

export const EncryptedCard: React.FC<EncryptedCardProps> = ({
  text,
  theme,
  className,
}) => {
  const [decrypted, setDecrypted] = React.useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  const [displayText, setDisplayText] = React.useState(
    text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
  );

  React.useEffect(() => {
    if (decrypted) {
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, i) => {
            if (i < iterations) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        iterations += 1 / 2;
        if (iterations >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [decrypted, text]);

  return (
    <div
      onClick={() => setDecrypted(!decrypted)}
      className={cn(
        'p-4 rounded-xl cursor-pointer font-mono text-sm',
        'bg-zinc-900 border border-white/10',
        'hover:border-white/20 transition-colors',
        className
      )}
    >
      <span style={{ color: theme.primary }}>{displayText}</span>
    </div>
  );
};
