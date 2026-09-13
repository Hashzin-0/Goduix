'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type CommentPinProps = {
  author: string;
  content: string;
  avatar?: string;
  theme: ThemeColors;
  className?: string;
};

export const CommentPin: React.FC<CommentPinProps> = ({
  author,
  content,
  avatar,
  theme,
  className,
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'w-64 p-3 rounded-xl',
        'bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {avatar ? (
          <img src={avatar} alt="" className="w-6 h-6 rounded-full" />
        ) : (
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: theme.primary }}>
            {author[0]}
          </div>
        )}
        <span className="text-xs font-medium text-white">{author}</span>
      </div>
      <p className="text-xs text-zinc-300">{content}</p>
    </motion.div>
  );
};
