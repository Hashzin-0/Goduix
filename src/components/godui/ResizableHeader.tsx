'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ResizableHeaderProps = {
  children: React.ReactNode;
  onResize?: (width: number) => void;
  minWidth?: number;
  theme: ThemeColors;
  className?: string;
};

export const ResizableHeader: React.FC<ResizableHeaderProps> = ({
  children,
  onResize,
  minWidth = 80,
  theme,
  className,
}) => {
  const [width, setWidth] = React.useState(150);
  const [isResizing, setIsResizing] = React.useState(false);
  const startX = React.useRef(0);
  const startWidth = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = width;
    e.preventDefault();
  };

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(minWidth, startWidth.current + (e.clientX - startX.current));
      setWidth(newWidth);
      onResize?.(newWidth);
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, onResize]);

  return (
    <th
      className={cn('relative select-none', className)}
      style={{ width, minWidth }}
    >
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {children}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className={cn(
          'absolute top-0 right-0 w-1 h-full cursor-col-resize',
          'hover:bg-cyan-400 transition-colors',
          isResizing && 'bg-cyan-400'
        )}
      />
    </th>
  );
};
