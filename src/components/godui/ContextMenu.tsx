'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ContextMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  theme,
  children,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };
  
  React.useEffect(() => {
    if (open) {
      const close = () => setOpen(false);
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [open]);
  
  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>{children}</div>
      {open && (
        <div
          className={cn(
            'fixed z-50 min-w-[180px] py-1.5 rounded-xl',
            'bg-zinc-900 border border-white/10 shadow-2xl'
          )}
          style={{ left: pos.x, top: pos.y }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => { item.onClick?.(); setOpen(false); }}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                'hover:bg-white/5 transition-colors',
                item.destructive ? 'text-red-400 hover:text-red-300' : 'text-zinc-300'
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
