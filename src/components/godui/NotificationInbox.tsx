'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  read?: boolean;
  timestamp?: string;
};

export type NotificationInboxProps = {
  notifications: NotificationItem[];
  onRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const NotificationInbox: React.FC<NotificationInboxProps> = ({
  notifications,
  onRead,
  onDismiss,
  theme,
  className,
}) => {
  const unread = notifications.filter(n => !n.read).length;
  
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-white">Notifications</span>
          {unread > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: theme.primary }}>
              {unread}
            </span>
          )}
        </div>
      </div>
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={cn(
              'flex items-start gap-3 p-3 rounded-xl',
              notif.read ? 'bg-zinc-900/30' : 'bg-zinc-900 border border-white/5'
            )}
          >
            <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', notif.read ? 'bg-zinc-700' : '')} style={!notif.read ? { backgroundColor: theme.primary } : undefined} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{notif.title}</div>
              {notif.description && <div className="text-xs text-zinc-400 mt-0.5">{notif.description}</div>}
              {notif.timestamp && <div className="text-[10px] text-zinc-500 mt-1">{notif.timestamp}</div>}
            </div>
            <div className="flex items-center gap-1">
              {!notif.read && (
                <button onClick={() => onRead?.(notif.id)} className="p-1 rounded hover:bg-white/10 text-zinc-400">
                  <Check className="w-3 h-3" />
                </button>
              )}
              <button onClick={() => onDismiss?.(notif.id)} className="p-1 rounded hover:bg-white/10 text-zinc-400">
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
