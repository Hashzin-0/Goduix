'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type AgentTimelineEvent = {
  time: string;
  label: string;
  description?: string;
  status?: 'success' | 'error' | 'info';
};

export type AgentTimelineProps = {
  events: AgentTimelineEvent[];
  theme: ThemeColors;
  className?: string;
};

export const AgentTimeline: React.FC<AgentTimelineProps> = ({
  events,
  theme,
  className,
}) => {
  const statusColors = {
    success: 'bg-emerald-400',
    error: 'bg-red-400',
    info: 'bg-zinc-400',
  };

  return (
    <div className={cn('space-y-4', className)}>
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-3"
        >
          <div className="flex flex-col items-center">
            <div className={cn('w-2.5 h-2.5 rounded-full', statusColors[event.status || 'info'])} />
            {i < events.length - 1 && <div className="w-0.5 flex-1 bg-zinc-800 mt-1" />}
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-mono">{event.time}</span>
              <span className="text-sm font-medium text-white">{event.label}</span>
            </div>
            {event.description && (
              <p className="text-xs text-zinc-400 mt-0.5">{event.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
