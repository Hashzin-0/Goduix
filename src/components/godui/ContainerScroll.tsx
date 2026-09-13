'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type ContainerScrollProps = {
  children: React.ReactNode;
  theme: ThemeColors;
  className?: string;
};

export const ContainerScroll: React.FC<ContainerScrollProps> = ({
  children,
  theme,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div ref={ref} className={cn('relative min-h-[200vh]', className)}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, opacity }} className="w-full max-w-4xl mx-auto px-4">
          {children}
        </motion.div>
      </div>
    </div>
  );
};
