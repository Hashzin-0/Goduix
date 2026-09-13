'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ConversationMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ConversationThreadProps = {
  messages: ConversationMessage[];
  theme: ThemeColors;
  className?: string;
};

export const ConversationThread: React.FC<ConversationThreadProps> = ({
  messages,
  theme,
  className,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'flex',
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm',
              msg.role === 'user'
                ? 'bg-white/10 text-white rounded-br-md'
                : 'bg-zinc-800 text-zinc-200 rounded-bl-md'
            )}
            style={msg.role === 'assistant' ? { borderLeft: `2px solid ${theme.primary}` } : undefined}
          >
            {msg.content}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
