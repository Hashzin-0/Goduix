'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type Testimonial = {
  name: string;
  role?: string;
  content: string;
  avatar?: string;
};

export type AnimatedTestimonialsProps = {
  testimonials?: Testimonial[];
  theme: ThemeColors;
  className?: string;
};

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials = [],
  theme,
  className,
}) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    testimonials = [
      { name: 'User', content: 'Amazing product!' },
      { name: 'Customer', content: 'Love it!' },
    ];
  }

  return (
    <div className={cn('relative h-48', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-0"
        >
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10">
            <p className="text-sm text-zinc-300 italic">"{testimonials[current].content}"</p>
            <div className="flex items-center gap-3 mt-4">
              {testimonials[current].avatar ? (
                <img src={testimonials[current].avatar} alt="" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: theme.primary }}>
                  {testimonials[current].name[0]}
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-white">{testimonials[current].name}</div>
                {testimonials[current].role && <div className="text-xs text-zinc-500">{testimonials[current].role}</div>}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
