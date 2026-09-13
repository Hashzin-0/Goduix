'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type HighlighterProps = {
  text: string;
  highlight?: string;
  variant?: 'underline' | 'background' | 'glow';
  theme: ThemeColors;
  className?: string;
};

export const Highlighter: React.FC<HighlighterProps> = ({
  text,
  highlight,
  variant = 'background',
  theme,
  className,
}) => {
  const parts = highlight
    ? text.split(new RegExp(`(${highlight})`, 'gi'))
    : [text];

  return (
    <span className={cn('text-white', className)}>
      {parts.map((part, i) => {
        const isHighlighted = highlight && part.toLowerCase() === highlight.toLowerCase();

        return (
          <span key={i} className="relative">
            {isHighlighted && variant === 'underline' && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: theme.primary, transformOrigin: 'left' }}
              />
            )}
            {isHighlighted && variant === 'background' && (
              <span
                className="px-1 rounded"
                style={{ backgroundColor: `${theme.primary}30`, color: theme.primary }}
              >
                {part}
              </span>
            )}
            {isHighlighted && variant === 'glow' && (
              <span
                className="relative"
                style={{ textShadow: `0 0 20px ${theme.glow}` }}
              >
                {part}
              </span>
            )}
            {!isHighlighted && part}
          </span>
        );
      })}
    </span>
  );
};
