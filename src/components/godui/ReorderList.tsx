'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ReorderListItem = {
  id: string;
  label: string;
};

export type ReorderListProps = {
  items: ReorderListItem[];
  onReorder?: (items: ReorderListItem[]) => void;
  theme: ThemeColors;
  className?: string;
};

export const ReorderList: React.FC<ReorderListProps> = ({
  items: initialItems,
  onReorder,
  theme,
  className,
}) => {
  const [items, setItems] = React.useState(initialItems);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  
  const handleDragStart = (index: number) => setDraggedIndex(index);
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    setDraggedIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
    onReorder?.(items);
  };
  
  return (
    <div className={cn('space-y-1', className)}>
      {items.map((item, i) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDragEnd={handleDragEnd}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl',
            'bg-zinc-900 border border-white/10 cursor-grab active:cursor-grabbing',
            draggedIndex === i && 'opacity-50'
          )}
        >
          <GripVertical className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-white">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
