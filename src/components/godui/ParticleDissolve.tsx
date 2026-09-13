'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ParticleDissolveProps = {
  count?: number;
  theme: ThemeColors;
  children: React.ReactNode;
  className?: string;
};

export const ParticleDissolve: React.FC<ParticleDissolveProps> = ({
  count = 30,
  theme,
  children,
  className,
}) => {
  const [dissolved, setDissolved] = React.useState(false);

  return (
    <div className={cn('relative', className)}>
      {children}
      <div onClick={() => setDissolved(!dissolved)} className="absolute inset-0 cursor-pointer" />
      {dissolved && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: '50%', y: '50%' }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1, delay: Math.random() * 0.5 }}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
