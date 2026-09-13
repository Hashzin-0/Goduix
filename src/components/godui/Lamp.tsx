import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface LampProps {
  headline?: string;
  subtitle?: string;
  theme: ThemeColors;
  className?: string;
}

export const Lamp: React.FC<LampProps> = ({
  headline = 'Build With Real GodUI Architecture',
  subtitle = 'Crafted with optical precision, spring physics and reactive glass refractions.',
  theme,
  className,
}) => {
  return (
    <div className={cn("relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden bg-zinc-950 w-full rounded-3xl z-0 py-16 px-4 select-none", className)}>
      {/* Upper Conic Light Cone Array */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left Conic Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "24rem" }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[24rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-zinc-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-zinc-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "24rem" }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[24rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-zinc-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-zinc-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Center Radial Bloom Emitter */}
        <div className="absolute top-1/2 h-44 w-full translate-y-12 scale-x-150 bg-zinc-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-44 w-full bg-transparent opacity-10 backdrop-blur-md" />
        
        <div 
          className="absolute inset-auto z-50 h-36 w-[26rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: theme.primary }}
        />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Horizontal Laser Line Filament */}
        <motion.div
          initial={{ width: "14rem" }}
          whileInView={{ width: "28rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[28rem] -translate-y-[7rem] bg-cyan-300"
          style={{
            boxShadow: `0 0 20px 2px ${theme.glow}`,
          }}
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-zinc-950" />
      </div>

      {/* Illuminated Headline rising into the light */}
      <div className="relative z-50 flex -translate-y-16 flex-col items-center px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent drop-shadow-md max-w-2xl"
        >
          {headline}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
