'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type MegaMenuSection = {
  title: string;
  items: { label: string; description?: string; icon?: React.ReactNode; onClick?: () => void }[];
};

export type MegaMenuProps = {
  sections: MegaMenuSection[];
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
};

export const MegaMenu: React.FC<MegaMenuProps> = ({
  sections,
  theme,
  children,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn('relative', className)} onMouseLeave={() => setOpen(false)}>
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <div className={cn(
          'absolute top-full left-0 mt-2 w-[500px] p-6 rounded-2xl',
          'bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl'
        )}>
          <div className="grid grid-cols-2 gap-6">
            {sections.map((section, i) => (
              <div key={i}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">{section.title}</h4>
                <div className="space-y-1">
                  {section.items.map((item, j) => (
                    <button
                      key={j}
                      onClick={() => { item.onClick?.(); setOpen(false); }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-left transition-colors"
                    >
                      {item.icon && <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">{item.icon}</span>}
                      <div>
                        <div className="text-sm text-zinc-200">{item.label}</div>
                        {item.description && <div className="text-xs text-zinc-500">{item.description}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
