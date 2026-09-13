'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type LiveCursorData = {
  id: string;
  name: string;
  x: number;
  y: number;
  color?: string;
};

export type LiveCursorsProps = {
  cursors: LiveCursorData[];
  theme: ThemeColors;
  className?: string;
};

export const LiveCursors: React.FC<LiveCursorsProps> = ({
  cursors,
  theme,
  className,
}) => {
  return (
    <div className={cn('pointer-events-none absolute inset-0 z-50', className)}>
      {cursors.map((cursor) => (
        <motion.div
          key={cursor.id}
          animate={{ x: cursor.x, y: cursor.y }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={cursor.color || theme.primary}
              stroke={cursor.color || theme.primary}
              strokeWidth="1"
            />
          </svg>
          <span
            className="absolute top-5 left-3 px-2 py-0.5 rounded-full text-[10px] font-medium text-white whitespace-nowrap"
            style={{ backgroundColor: cursor.color || theme.primary }}
          >
            {cursor.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
