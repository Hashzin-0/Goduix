'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type SpotlightRevealProps = {
  children: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
  children,
  theme,
  className,
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)`,
          opacity: 0.5,
        }}
      />
    </div>
  );
};
