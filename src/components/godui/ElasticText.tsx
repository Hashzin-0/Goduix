import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface ElasticTextProps {
  text?: string;
  theme: ThemeColors;
  fontSize?: 'md' | 'lg' | 'xl';
  className?: string;
}

export const ElasticText: React.FC<ElasticTextProps> = ({
  text = 'ELASTIC TYPOGRAPHY',
  theme,
  fontSize = 'xl',
  className,
}) => {
  const letters = text.split('');

  const sizeClasses = {
    md: 'text-2xl sm:text-3xl font-extrabold',
    lg: 'text-3xl sm:text-5xl font-black',
    xl: 'text-4xl sm:text-6xl font-black',
  };

  return (
    <div className={cn("inline-flex flex-wrap justify-center select-none py-4 px-2", className)}>
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="inline-block w-3" />;
        }

        return (
          <motion.span
            key={index}
            whileHover={{
              scale: 1.4,
              y: -12,
              color: theme.primary,
              transition: { type: 'spring', stiffness: 500, damping: 10 },
            }}
            whileTap={{
              scale: 0.85,
              y: 6,
              transition: { type: 'spring', stiffness: 600, damping: 14 },
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className={cn(
              "inline-block cursor-pointer transition-colors text-white tracking-wider",
              sizeClasses[fontSize]
            )}
            style={{
              textShadow: `0 0 20px rgba(0,0,0,0.8)`,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};
