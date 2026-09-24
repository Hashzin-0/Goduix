'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type AppShowcaseProps = {
  title?: string;
  description?: string;
  image?: string;
  theme: ThemeColors;
  className?: string;
};

export const AppShowcase: React.FC<AppShowcaseProps> = ({
  title = 'App Showcase',
  description = 'Showcase your app',
  image,
  theme,
  className,
}) => {
  return (
    <div className={cn('p-8 rounded-2xl bg-zinc-900/80 border border-white/10', className)}>
      {image && (
        <div className="mb-6 rounded-xl overflow-hidden">
          <img src={image} alt="" className="w-full h-48 object-cover" />
        </div>
      )}
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-zinc-400 mt-2">{description}</p>
    </div>
  );
};
