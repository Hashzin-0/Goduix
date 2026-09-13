'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type HeroParallaxProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  theme: ThemeColors;
  className?: string;
};

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  title,
  subtitle,
  backgroundImage,
  theme,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  return (
    <div ref={ref} className={cn('relative h-[80vh] overflow-hidden', className)}>
      {backgroundImage && (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0"
        >
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-zinc-300 max-w-2xl">{subtitle}</p>}
      </motion.div>
    </div>
  );
};
