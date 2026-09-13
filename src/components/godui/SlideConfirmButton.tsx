'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SlideConfirmButtonProps = {
  label?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  theme: ThemeColors;
  className?: string;
};

export const SlideConfirmButton: React.FC<SlideConfirmButtonProps> = ({
  label = 'Slide to Confirm',
  confirmLabel = 'Confirmed!',
  onConfirm,
  theme,
  className,
}) => {
  const [confirmed, setConfirmed] = React.useState(false);
  const x = useMotionValue(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const background = useTransform(
    x,
    [0, 150],
    [`rgba(255,255,255,0.05)`, theme.primary]
  );

  const handleDragEnd = () => {
    if (x.get() > 140) {
      setConfirmed(true);
      onConfirm?.();
    }
  };

  return (
    <div
      ref={trackRef}
      className={cn(
        'relative h-12 rounded-full overflow-hidden',
        'bg-zinc-900 border border-white/10',
        className
      )}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background }}
      />
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 150 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={cn(
          'absolute top-1 left-1 h-10 w-10 rounded-full cursor-grab active:cursor-grabbing',
          'bg-white flex items-center justify-center text-zinc-900 font-bold text-sm shadow-lg'
        )}
      >
        →
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400 pointer-events-none">
        {confirmed ? confirmLabel : label}
      </div>
    </div>
  );
};
