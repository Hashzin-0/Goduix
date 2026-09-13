'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type TextAnimateProps = {
  text: string;
  animation?: 'fade' | 'slide' | 'scale';
  delay?: number;
  theme: ThemeColors;
  className?: string;
};

export const TextAnimate: React.FC<TextAnimateProps> = ({
  text,
  animation = 'fade',
  delay = 0,
  theme,
  className,
}) => {
  const words = text.split(' ');

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
      className={cn('flex flex-wrap gap-x-2', className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={animations[animation]}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-white"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
