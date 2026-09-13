'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type PresenceUser = {
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
};

export type PresenceFacepileProps = {
  users: PresenceUser[];
  max?: number;
  theme: ThemeColors;
  className?: string;
};

export const PresenceFacepile: React.FC<PresenceFacepileProps> = ({
  users,
  max = 5,
  theme,
  className,
}) => {
  const visible = users.slice(0, max);
  const remaining = users.length - max;
  
  const statusColors = {
    online: 'bg-emerald-400',
    away: 'bg-amber-400',
    offline: 'bg-zinc-500',
  };
  
  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex -space-x-2">
        {visible.map((user, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative"
            style={{ zIndex: visible.length - i }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-zinc-900" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-zinc-900 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: theme.primary }}>
                {user.name[0]}
              </div>
            )}
            <div className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900', statusColors[user.status])} />
          </motion.div>
        ))}
      </div>
      {remaining > 0 && (
        <div className="ml-2 text-xs text-zinc-400">+{remaining} more</div>
      )}
    </div>
  );
};
