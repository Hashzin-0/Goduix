import React from 'react';
import { motion } from 'motion/react';
import {
  EffectModule,
  EffectRendererProps,
  EffectCategory,
  MergeStrategy,
} from '../types/composition';
import { cn } from '../lib/utils';

// ============================================================
// EFFECT RENDERERS
// ============================================================

// --- BACKGROUNDS ---

const GlassRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className={cn(
      'relative backdrop-blur-xl border border-white/20',
      config.noise !== false && 'before:absolute before:inset-0 before:rounded-[inherit] before:bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")] before:opacity-[0.03]'
    )}
    style={{
      background: `rgba(255, 255, 255, ${config.opacity ?? 0.08})`,
    }}
  >
    {children}
  </div>
);

const GradientRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const angle = config.angle ?? 135;
  const colors = config.colors ?? ['#667eea', '#764ba2'];
  const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  return (
    <div className="relative" style={{ background: gradient }}>
      {children}
    </div>
  );
};

const MeshRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const colors = config.colors ?? ['#ff006e', '#8338ec', '#3a86ff'];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(at 40% 20%, ${colors[0]}40 0px, transparent 50%),
          radial-gradient(at 80% 0%, ${colors[1]}40 0px, transparent 50%),
          radial-gradient(at 0% 50%, ${colors[2]}40 0px, transparent 50%),
          radial-gradient(at 80% 50%, ${colors[0]}20 0px, transparent 50%),
          radial-gradient(at 0% 100%, ${colors[1]}20 0px, transparent 50%),
          radial-gradient(at 80% 100%, ${colors[2]}20 0px, transparent 50%)
        `,
      }} />
      {children}
    </div>
  );
};

const NoiseRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div className="relative">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: config.opacity ?? 0.05,
        mixBlendMode: config.blendMode ?? 'overlay',
      }}
    />
    {children}
  </div>
);

const GridRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const size = config.size ?? 40;
  const color = config.color ?? 'rgba(255,255,255,0.05)';
  return (
    <div className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
        }}
      />
      {children}
    </div>
  );
};

const AuroraRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const colors = config.colors ?? ['#00f5ff', '#8b5cf6', '#06b6d4'];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute -inset-1/2 opacity-30"
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: config.duration ?? 20, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`,
          filter: `blur(${config.blur ?? 80}px)`,
        }}
      />
      {children}
    </div>
  );
};

const MeshGradientRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const colors = config.colors ?? ['#ff006e', '#3a86ff', '#8338ec', '#fb5607'];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(at 0% 0%, ${colors[0]}60 0, transparent 50%),
          radial-gradient(at 100% 0%, ${colors[1]}60 0, transparent 50%),
          radial-gradient(at 100% 100%, ${colors[2]}60 0, transparent 50%),
          radial-gradient(at 0% 100%, ${colors[3]}60 0, transparent 50%)
        `,
        filter: `blur(${config.blur ?? 40}px)`,
      }} />
      {children}
    </div>
  );
};

const SolidRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div className="relative" style={{ backgroundColor: config.color ?? '#1a1a2e' }}>
    {children}
  </div>
);

const BlurRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div className="relative backdrop-blur-lg bg-white/5">
    {children}
  </div>
);

// --- BORDERS ---

const NeonBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? '#00f5ff';
  const width = config.width ?? 2;
  return (
    <div
      className="relative rounded-[inherit]"
      style={{
        border: `${width}px solid ${color}`,
        boxShadow: `
          0 0 5px ${color}40,
          0 0 10px ${color}30,
          0 0 20px ${color}20,
          inset 0 0 5px ${color}10
        `,
      }}
    >
      {children}
    </div>
  );
};

const GradientBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const angle = config.angle ?? 45;
  const colors = config.colors ?? ['#667eea', '#764ba2'];
  const width = config.width ?? 2;
  return (
    <div
      className="relative p-[--border-w] rounded-[inherit]"
      style={{
        '--border-w': `${width}px`,
        background: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
      } as React.CSSProperties}
    >
      <div className="relative bg-inherit rounded-[inherit]">
        {children}
      </div>
    </div>
  );
};

const AnimatedBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const duration = config.duration ?? 3;
  const color = config.color ?? '#00f5ff';
  return (
    <div className="relative overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from var(--angle, 0deg), ${color}, transparent, ${color})`,
        }}
        animate={{ '--angle': ['0deg', '360deg'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[2px] bg-inherit rounded-[inherit]" />
      {children}
    </div>
  );
};

const BeamBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const duration = config.duration ?? 3;
  const color = config.color ?? '#00f5ff';
  const size = config.size ?? 100;
  return (
    <div className="relative overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(from 0deg, transparent 70%, ${color})`,
          filter: 'blur(1px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[1px] bg-inherit rounded-[inherit]" />
      {children}
    </div>
  );
};

const RainbowBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const duration = config.duration ?? 4;
  return (
    <div
      className="relative rounded-[inherit]"
      style={{
        padding: config.width ?? 2,
        background: 'linear-gradient(var(--rainbow-angle, 0deg), #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)',
        backgroundSize: '300% 300%',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: 'inherit',
          filter: 'blur(8px)',
          opacity: 0.5,
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[2px] bg-inherit rounded-[inherit]" />
      {children}
    </div>
  );
};

const DashedBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative rounded-[inherit]"
    style={{
      border: `${config.width ?? 2}px dashed ${config.color ?? 'rgba(255,255,255,0.2)'}`,
    }}
  >
    {children}
  </div>
);

const GlowBorderRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? '#00f5ff';
  const intensity = config.intensity ?? 1;
  return (
    <div
      className="relative rounded-[inherit]"
      style={{
        boxShadow: `
          0 0 ${10 * intensity}px ${color}60,
          0 0 ${20 * intensity}px ${color}40,
          0 0 ${40 * intensity}px ${color}20
        `,
        border: `1px solid ${color}40`,
      }}
    >
      {children}
    </div>
  );
};

// --- SHADOWS ---

const SoftShadowRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative rounded-[inherit]"
    style={{
      boxShadow: `0 ${config.y ?? 4}px ${config.blur ?? 20}px rgba(0, 0, 0, ${config.opacity ?? 0.15})`,
    }}
  >
    {children}
  </div>
);

const NeonShadowRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? '#00f5ff';
  const intensity = config.intensity ?? 1;
  return (
    <div
      className="relative rounded-[inherit]"
      style={{
        boxShadow: `
          0 0 ${5 * intensity}px ${color}80,
          0 0 ${15 * intensity}px ${color}50,
          0 0 ${30 * intensity}px ${color}30
        `,
      }}
    >
      {children}
    </div>
  );
};

const DeepShadowRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative rounded-[inherit]"
    style={{
      boxShadow: `
        0 ${config.y ?? 10}px ${config.blur ?? 40}px rgba(0, 0, 0, ${config.opacity ?? 0.3}),
        0 ${config.y ?? 10}px ${config.blur ?? 40}px rgba(0, 0, 0, ${config.opacity ?? 0.3})
      `,
    }}
  >
    {children}
  </div>
);

const GlowShadowRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? '#00f5ff';
  const spread = config.spread ?? 20;
  return (
    <div
      className="relative rounded-[inherit]"
      style={{
        boxShadow: `0 0 ${spread}px ${color}50`,
      }}
    >
      {children}
    </div>
  );
};

const InsetShadowRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative rounded-[inherit]"
    style={{
      boxShadow: `inset 0 ${config.y ?? 2}px ${config.blur ?? 10}px rgba(0, 0, 0, ${config.opacity ?? 0.2})`,
    }}
  >
    {children}
  </div>
);

// --- HOVERS ---

const Tilt3DHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const intensity = config.intensity ?? 0.8;
  const glare = config.glare ?? 0.3;
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 20 * intensity}deg) rotateX(${-y * 20 * intensity}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  }, [intensity]);

  const handleMouseLeave = React.useCallback(() => {
    setStyle({ transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)' });
  }, []);

  return (
    <motion.div
      className="relative rounded-[inherit]"
      style={{ ...style, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {children}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${glare}) 0%, transparent 60%)`,
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      />
    </motion.div>
  );
};

const ScaleHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileHover={{ scale: config.scale ?? 1.05 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    {children}
  </motion.div>
);

const GlowHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? '#00f5ff';
  const intensity = config.intensity ?? 1;
  return (
    <motion.div
      className="relative rounded-[inherit]"
      whileHover={{
        boxShadow: `0 0 ${20 * intensity}px ${color}60, 0 0 ${40 * intensity}px ${color}30`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const MagneticHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const intensity = config.intensity ?? 0.3;
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * intensity, y: y * intensity });
  }, [intensity]);

  const handleMouseLeave = React.useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      className="relative rounded-[inherit]"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const LiftHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileHover={{
      y: -(config.lift ?? 8),
      boxShadow: `0 ${config.lift ?? 8}px ${(config.lift ?? 8) * 3}px rgba(0,0,0,0.2)`,
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

const ShineHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? 'rgba(255,255,255,0.3)';
  return (
    <motion.div className="relative overflow-hidden rounded-[inherit]">
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${color} 45%, ${color} 55%, transparent 60%)`,
        }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

const FloatHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileHover={{ y: -4 }}
    animate={{ y: [0, -4, 0] }}
    transition={{
      y: { duration: config.duration ?? 3, repeat: Infinity, ease: 'easeInOut' },
    }}
  >
    {children}
  </motion.div>
);

const RotateHoverRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileHover={{ rotate: config.deg ?? 3, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

// --- CLICKS ---

const RippleClickRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);
  const color = config.color ?? 'rgba(255,255,255,0.4)';

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[inherit]" onClick={handleClick}>
      {children}
      {ripples.map(r => (
        <motion.span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            background: color,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
          animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

const BounceClickRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileTap={{ scale: config.scale ?? 0.92 }}
    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
  >
    {children}
  </motion.div>
);

const PulseClickRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? 'rgba(255,255,255,0.2)';
  return (
    <motion.div
      className="relative rounded-[inherit]"
      whileTap={{
        boxShadow: `0 0 0 4px ${color}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const PressClickRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileTap={{ scale: 0.97, y: 2 }}
    transition={{ type: 'spring', stiffness: 600, damping: 30 }}
  >
    {children}
  </motion.div>
);

const ShakeClickRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    whileTap={{
      x: [0, -5, 5, -5, 5, 0],
    }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

// --- ANIMATIONS ---

const FloatAnimationRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    animate={{
      y: [0, -(config.distance ?? 6), 0],
    }}
    transition={{
      duration: config.duration ?? 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

const PulseAnimationRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    animate={{
      scale: [1, config.scale ?? 1.03, 1],
      opacity: [1, config.opacity ?? 0.9, 1],
    }}
    transition={{
      duration: config.duration ?? 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

const BreatheAnimationRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    animate={{
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 0 0 rgba(0,245,255,0)',
        `0 0 ${config.spread ?? 20}px ${config.intensity ?? 0.3}px ${config.color ?? '#00f5ff'}30`,
        '0 0 0 0 rgba(0,245,255,0)',
      ],
    }}
    transition={{
      duration: config.duration ?? 4,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

const ShimmerAnimationRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div className="relative overflow-hidden rounded-[inherit]">
    {children}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, ${config.color ?? 'rgba(255,255,255,0.1)'}, transparent)`,
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
      transition={{
        duration: config.duration ?? 2,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </motion.div>
);

const SpinAnimationRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    animate={{ rotate: 360 }}
    transition={{
      duration: config.duration ?? 3,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    {children}
  </motion.div>
);

const EntranceAnimationRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    initial={{ opacity: 0, y: config.y ?? 20, scale: config.scale ?? 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: config.duration ?? 0.5,
      ease: config.easing ?? [0.25, 0.1, 0.25, 1],
    }}
  >
    {children}
  </motion.div>
);

// --- TYPOGRAPHY ---

const GradientTextRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const angle = config.angle ?? 90;
  const colors = config.colors ?? ['#00f5ff', '#8b5cf6'];
  return (
    <div
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
        WebkitBackgroundClip: 'text',
      }}
    >
      {children}
    </div>
  );
};

const GlowTextRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const color = config.color ?? '#00f5ff';
  const intensity = config.intensity ?? 1;
  return (
    <div
      style={{
        color,
        textShadow: `0 0 ${10 * intensity}px ${color}80, 0 0 ${20 * intensity}px ${color}40`,
      }}
    >
      {children}
    </div>
  );
};

const TypewriterRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const speed = config.speed ?? 50;
  return (
    <motion.div
      className="overflow-hidden whitespace-nowrap"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: speed * 0.01 * 10, ease: 'linear' }}
    >
      {children}
    </motion.div>
  );
};

const CountUpRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// --- STRUCTURE ---

const CardStructureRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative rounded-2xl overflow-hidden"
    style={{
      padding: config.padding ?? '24px',
    }}
  >
    {children}
  </div>
);

const ButtonStructureRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <button
    className="relative inline-flex items-center justify-center rounded-xl font-medium transition-colors"
    style={{
      padding: `${config.paddingY ?? 12}px ${config.paddingX ?? 24}px`,
    }}
  >
    {children}
  </button>
);

const InputStructureRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative rounded-xl"
    style={{
      padding: `${config.paddingY ?? 12}px ${config.paddingX ?? 16}px`,
    }}
  >
    {children}
  </div>
);

const BadgeStructureRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div
    className="relative inline-flex items-center rounded-full"
    style={{
      padding: `${config.paddingY ?? 4}px ${config.paddingX ?? 12}px`,
      fontSize: config.fontSize ?? 12,
    }}
  >
    {children}
  </div>
);

const ModalStructureRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    <div
      className="relative rounded-2xl z-10"
      style={{
        padding: config.padding ?? 24,
        maxWidth: config.maxWidth ?? 500,
      }}
    >
      {children}
    </div>
  </div>
);

const NavbarStructureRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <nav
    className="relative flex items-center"
    style={{
      height: config.height ?? 64,
      padding: `0 ${config.paddingX ?? 24}px`,
    }}
  >
    {children}
  </nav>
);

// --- LOADING ---

const SkeletonRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div className="relative overflow-hidden rounded-[inherit]">
    <div className="absolute inset-0 bg-white/5" />
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
      transition={{ duration: config.duration ?? 1.5, repeat: Infinity, ease: 'linear' }}
    />
    {children}
  </div>
);

const SpinnerRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <div className="relative">
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }}
      transition={{ duration: config.duration ?? 1, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="rounded-full border-2 border-white/10"
        style={{
          width: config.size ?? 24,
          height: config.size ?? 24,
          borderTopColor: config.color ?? '#00f5ff',
        }}
      />
    </motion.div>
    {children}
  </div>
);

// --- TRANSITION ---

const FadeTransitionRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: config.duration ?? 0.3 }}
  >
    {children}
  </motion.div>
);

const SlideTransitionRenderer: React.FC<EffectRendererProps> = ({ config, children }) => {
  const direction = config.direction ?? 'up';
  const offsets = { up: { y: 20 }, down: { y: -20 }, left: { x: 20 }, right: { x: -20 } };
  return (
    <motion.div
      className="relative rounded-[inherit]"
      initial={{ opacity: 0, ...offsets[direction as keyof typeof offsets] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: config.duration ?? 0.4 }}
    >
      {children}
    </motion.div>
  );
};

const ScaleTransitionRenderer: React.FC<EffectRendererProps> = ({ config, children }) => (
  <motion.div
    className="relative rounded-[inherit]"
    initial={{ opacity: 0, scale: config.from ?? 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: config.duration ?? 0.3, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

// ============================================================
// EFFECT REGISTRY
// ============================================================

export const EFFECT_REGISTRY: Record<string, EffectModule> = {
  // === BACKGROUNDS ===
  'bg-glass': {
    id: 'bg-glass',
    category: 'background',
    name: 'Glass',
    namePt: 'Vidro',
    description: 'Frosted glass background with blur and subtle transparency',
    descriptionPt: 'Fundo de vidro fosco com desfoque e transparência sutil',
    icon: 'Sparkles',
    color: '#60a5fa',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: ['border-neon', 'shadow-glow'],
    configSchema: [
      { key: 'opacity', label: 'Opacity', type: 'slider', default: 0.08, min: 0, max: 0.5, step: 0.01, description: 'Glass transparency level' },
      { key: 'noise', label: 'Noise Texture', type: 'boolean', default: true, description: 'Add subtle noise grain' },
    ],
    defaultConfig: { opacity: 0.08, noise: true },
    renderer: GlassRenderer,
  },
  'bg-gradient': {
    id: 'bg-gradient',
    category: 'background',
    name: 'Gradient',
    namePt: 'Gradiente',
    description: 'Linear gradient background with customizable colors and angle',
    descriptionPt: 'Fundo de gradiente linear com cores e ângulo personalizáveis',
    icon: 'Palette',
    color: '#8b5cf6',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'angle', label: 'Angle', type: 'number', default: 135, min: 0, max: 360, unit: 'deg' },
      { key: 'colors', label: 'Colors', type: 'text', default: ['#667eea', '#764ba2'] },
    ],
    defaultConfig: { angle: 135, colors: ['#667eea', '#764ba2'] },
    renderer: GradientRenderer,
  },
  'bg-mesh': {
    id: 'bg-mesh',
    category: 'background',
    name: 'Mesh',
    namePt: 'Malha',
    description: 'Multi-color mesh background with radial gradients',
    descriptionPt: 'Fundo de malha multicolorida com gradientes radiais',
    icon: 'CircleDot',
    color: '#f43f5e',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'colors', label: 'Colors', type: 'text', default: ['#ff006e', '#8338ec', '#3a86ff'] },
    ],
    defaultConfig: { colors: ['#ff006e', '#8338ec', '#3a86ff'] },
    renderer: MeshRenderer,
  },
  'bg-noise': {
    id: 'bg-noise',
    category: 'background',
    name: 'Noise',
    namePt: 'Ruído',
    description: 'SVG noise texture overlay',
    descriptionPt: 'Textura de ruído SVG sobreposta',
    icon: 'Layers',
    color: '#64748b',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: ['bg-glass', 'bg-gradient'],
    configSchema: [
      { key: 'opacity', label: 'Opacity', type: 'slider', default: 0.05, min: 0, max: 0.3, step: 0.01 },
      { key: 'blendMode', label: 'Blend Mode', type: 'select', default: 'overlay', options: [
        { label: 'Overlay', value: 'overlay' },
        { label: 'Multiply', value: 'multiply' },
        { label: 'Screen', value: 'screen' },
        { label: 'Soft Light', value: 'soft-light' },
      ]},
    ],
    defaultConfig: { opacity: 0.05, blendMode: 'overlay' },
    renderer: NoiseRenderer,
  },
  'bg-grid': {
    id: 'bg-grid',
    category: 'background',
    name: 'Grid',
    namePt: 'Grade',
    description: 'Subtle CSS grid pattern background',
    descriptionPt: 'Padrão de grade CSS sutil no fundo',
    icon: 'Grid3x3',
    color: '#94a3b8',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'size', label: 'Grid Size', type: 'number', default: 40, min: 10, max: 100, unit: 'px' },
      { key: 'color', label: 'Grid Color', type: 'color', default: 'rgba(255,255,255,0.05)' },
    ],
    defaultConfig: { size: 40, color: 'rgba(255,255,255,0.05)' },
    renderer: GridRenderer,
  },
  'bg-aurora': {
    id: 'bg-aurora',
    category: 'background',
    name: 'Aurora',
    namePt: 'Aurora',
    description: 'Rotating aurora conic gradient with blur',
    descriptionPt: 'Gradiente cônico de aurora rotativo com desfoque',
    icon: 'Sun',
    color: '#06b6d4',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'colors', label: 'Colors', type: 'text', default: ['#00f5ff', '#8b5cf6', '#06b6d4'] },
      { key: 'duration', label: 'Rotation Duration', type: 'number', default: 20, min: 5, max: 60, unit: 's' },
      { key: 'blur', label: 'Blur', type: 'number', default: 80, min: 20, max: 200, unit: 'px' },
    ],
    defaultConfig: { colors: ['#00f5ff', '#8b5cf6', '#06b6d4'], duration: 20, blur: 80 },
    renderer: AuroraRenderer,
  },
  'bg-mesh-gradient': {
    id: 'bg-mesh-gradient',
    category: 'background',
    name: 'Mesh Gradient',
    namePt: 'Gradiente de Malha',
    description: 'Complex mesh gradient with multiple color stops',
    descriptionPt: 'Gradiente de malha complexo com múltiplos pontos de cor',
    icon: 'Blend',
    color: '#ec4899',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'colors', label: 'Colors', type: 'text', default: ['#ff006e', '#3a86ff', '#8338ec', '#fb5607'] },
      { key: 'blur', label: 'Blur', type: 'number', default: 40, min: 10, max: 120, unit: 'px' },
    ],
    defaultConfig: { colors: ['#ff006e', '#3a86ff', '#8338ec', '#fb5607'], blur: 40 },
    renderer: MeshGradientRenderer,
  },
  'bg-solid': {
    id: 'bg-solid',
    category: 'background',
    name: 'Solid Color',
    namePt: 'Cor Sólida',
    description: 'Solid background color',
    descriptionPt: 'Cor de fundo sólida',
    icon: 'Square',
    color: '#1e293b',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#1a1a2e' },
    ],
    defaultConfig: { color: '#1a1a2e' },
    renderer: SolidRenderer,
  },
  'bg-blur': {
    id: 'bg-blur',
    category: 'background',
    name: 'Blur',
    namePt: 'Desfoque',
    description: 'Background blur effect',
    descriptionPt: 'Efeito de desfoque no fundo',
    icon: 'Droplets',
    color: '#818cf8',
    compatibleWith: [],
    acceptedByLayers: ['background', 'main-container'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: ['bg-glass'],
    configSchema: [],
    defaultConfig: {},
    renderer: BlurRenderer,
  },

  // === BORDERS ===
  'border-neon': {
    id: 'border-neon',
    category: 'border',
    name: 'Neon',
    namePt: 'Neon',
    description: 'Glowing neon border with multi-layer box-shadow',
    descriptionPt: 'Borda neon brilhante com box-shadow multicamada',
    icon: 'Zap',
    color: '#00f5ff',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: ['shadow-glow', 'bg-glass'],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'width', label: 'Width', type: 'number', default: 2, min: 1, max: 6, unit: 'px' },
    ],
    defaultConfig: { color: '#00f5ff', width: 2 },
    renderer: NeonBorderRenderer,
  },
  'border-gradient': {
    id: 'border-gradient',
    category: 'border',
    name: 'Gradient',
    namePt: 'Gradiente',
    description: 'Gradient border using background-clip technique',
    descriptionPt: 'Borda gradiente usando técnica de background-clip',
    icon: 'Paintbrush',
    color: '#a78bfa',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'angle', label: 'Angle', type: 'number', default: 45, min: 0, max: 360, unit: 'deg' },
      { key: 'colors', label: 'Colors', type: 'text', default: ['#667eea', '#764ba2'] },
      { key: 'width', label: 'Width', type: 'number', default: 2, min: 1, max: 6, unit: 'px' },
    ],
    defaultConfig: { angle: 45, colors: ['#667eea', '#764ba2'], width: 2 },
    renderer: GradientBorderRenderer,
  },
  'border-animated': {
    id: 'border-animated',
    category: 'border',
    name: 'Animated',
    namePt: 'Animada',
    description: 'Continuously rotating conic gradient border',
    descriptionPt: 'Borda de gradiente cônico rotativo contínuo',
    icon: 'RefreshCw',
    color: '#f59e0b',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 3, min: 1, max: 10, unit: 's' },
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
    ],
    defaultConfig: { duration: 3, color: '#00f5ff' },
    renderer: AnimatedBorderRenderer,
  },
  'border-beam': {
    id: 'border-beam',
    category: 'border',
    name: 'Beam',
    namePt: 'Feixe',
    description: 'Rotating beam of light along the border',
    descriptionPt: 'Feixe de luz rotativo ao longo da borda',
    icon: 'Flashlight',
    color: '#22d3ee',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 3, min: 1, max: 10, unit: 's' },
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'size', label: 'Size', type: 'number', default: 100, min: 50, max: 300, unit: 'px' },
    ],
    defaultConfig: { duration: 3, color: '#00f5ff', size: 100 },
    renderer: BeamBorderRenderer,
  },
  'border-rainbow': {
    id: 'border-rainbow',
    category: 'border',
    name: 'Rainbow',
    namePt: 'Arco-íris',
    description: 'Animated rainbow gradient border',
    descriptionPt: 'Borda de gradiente arco-íris animada',
    icon: 'Rainbow',
    color: '#f43f5e',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 4, min: 1, max: 10, unit: 's' },
      { key: 'width', label: 'Width', type: 'number', default: 2, min: 1, max: 6, unit: 'px' },
    ],
    defaultConfig: { duration: 4, width: 2 },
    renderer: RainbowBorderRenderer,
  },
  'border-dashed': {
    id: 'border-dashed',
    category: 'border',
    name: 'Dashed',
    namePt: 'Tracejada',
    description: 'Simple dashed border',
    descriptionPt: 'Borda tracejada simples',
    icon: 'Minus',
    color: '#64748b',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'width', label: 'Width', type: 'number', default: 2, min: 1, max: 6, unit: 'px' },
      { key: 'color', label: 'Color', type: 'color', default: 'rgba(255,255,255,0.2)' },
    ],
    defaultConfig: { width: 2, color: 'rgba(255,255,255,0.2)' },
    renderer: DashedBorderRenderer,
  },
  'border-glow': {
    id: 'border-glow',
    category: 'border',
    name: 'Glow',
    namePt: 'Brilho',
    description: 'Soft glowing border effect',
    descriptionPt: 'Efeito de borda brilhante suave',
    icon: 'Sun',
    color: '#fbbf24',
    compatibleWith: [],
    acceptedByLayers: ['border'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: ['shadow-glow'],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 1, min: 0.1, max: 3, step: 0.1 },
    ],
    defaultConfig: { color: '#00f5ff', intensity: 1 },
    renderer: GlowBorderRenderer,
  },

  // === SHADOWS ===
  'shadow-soft': {
    id: 'shadow-soft',
    category: 'shadow',
    name: 'Soft',
    namePt: 'Suave',
    description: 'Subtle soft shadow',
    descriptionPt: 'Sombra suave sutil',
    icon: 'Cloud',
    color: '#94a3b8',
    compatibleWith: [],
    acceptedByLayers: ['shadow'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'y', label: 'Y Offset', type: 'number', default: 4, min: 0, max: 30, unit: 'px' },
      { key: 'blur', label: 'Blur', type: 'number', default: 20, min: 5, max: 60, unit: 'px' },
      { key: 'opacity', label: 'Opacity', type: 'slider', default: 0.15, min: 0, max: 0.5, step: 0.01 },
    ],
    defaultConfig: { y: 4, blur: 20, opacity: 0.15 },
    renderer: SoftShadowRenderer,
  },
  'shadow-neon': {
    id: 'shadow-neon',
    category: 'shadow',
    name: 'Neon',
    namePt: 'Neon',
    description: 'Colored neon glow shadow',
    descriptionPt: 'Sombra de brilho neon colorida',
    icon: 'Zap',
    color: '#00f5ff',
    compatibleWith: [],
    acceptedByLayers: ['shadow'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: ['border-neon'],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 1, min: 0.1, max: 3, step: 0.1 },
    ],
    defaultConfig: { color: '#00f5ff', intensity: 1 },
    renderer: NeonShadowRenderer,
  },
  'shadow-deep': {
    id: 'shadow-deep',
    category: 'shadow',
    name: 'Deep',
    namePt: 'Profunda',
    description: 'Multi-layered deep shadow for depth',
    descriptionPt: 'Sombra profunda multicamada para profundidade',
    icon: 'Layers',
    color: '#475569',
    compatibleWith: [],
    acceptedByLayers: ['shadow'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'y', label: 'Y Offset', type: 'number', default: 10, min: 2, max: 40, unit: 'px' },
      { key: 'blur', label: 'Blur', type: 'number', default: 40, min: 10, max: 80, unit: 'px' },
      { key: 'opacity', label: 'Opacity', type: 'slider', default: 0.3, min: 0, max: 0.6, step: 0.01 },
    ],
    defaultConfig: { y: 10, blur: 40, opacity: 0.3 },
    renderer: DeepShadowRenderer,
  },
  'shadow-glow': {
    id: 'shadow-glow',
    category: 'shadow',
    name: 'Glow',
    namePt: 'Brilho',
    description: 'Ambient glow shadow effect',
    descriptionPt: 'Efeito de sombra brilhante ambiente',
    icon: 'Sun',
    color: '#fbbf24',
    compatibleWith: [],
    acceptedByLayers: ['shadow'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: ['border-glow'],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'spread', label: 'Spread', type: 'number', default: 20, min: 5, max: 60, unit: 'px' },
    ],
    defaultConfig: { color: '#00f5ff', spread: 20 },
    renderer: GlowShadowRenderer,
  },
  'shadow-inset': {
    id: 'shadow-inset',
    category: 'shadow',
    name: 'Inset',
    namePt: 'Interna',
    description: 'Inner shadow for depth effect',
    descriptionPt: 'Sombra interna para efeito de profundidade',
    icon: 'BoxSelect',
    color: '#64748b',
    compatibleWith: [],
    acceptedByLayers: ['shadow'],
    conflictsWith: [],
    mergeStrategy: 'stack',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'y', label: 'Y Offset', type: 'number', default: 2, min: 0, max: 10, unit: 'px' },
      { key: 'blur', label: 'Blur', type: 'number', default: 10, min: 2, max: 30, unit: 'px' },
      { key: 'opacity', label: 'Opacity', type: 'slider', default: 0.2, min: 0, max: 0.5, step: 0.01 },
    ],
    defaultConfig: { y: 2, blur: 10, opacity: 0.2 },
    renderer: InsetShadowRenderer,
  },

  // === HOVERS ===
  'hover-tilt-3d': {
    id: 'hover-tilt-3d',
    category: 'hover',
    name: '3D Tilt',
    namePt: 'Inclinação 3D',
    description: 'Perspective tilt following cursor position',
    descriptionPt: 'Inclinação em perspectiva seguindo a posição do cursor',
    icon: 'Box',
    color: '#8b5cf6',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: ['hover-magnetic'],
    mergeStrategy: 'compose',
    requires: [],
    enhances: ['bg-glass', 'border-neon'],
    configSchema: [
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 0.8, min: 0.1, max: 2, step: 0.1 },
      { key: 'glare', label: 'Glare', type: 'slider', default: 0.3, min: 0, max: 1, step: 0.05 },
    ],
    defaultConfig: { intensity: 0.8, glare: 0.3 },
    renderer: Tilt3DHoverRenderer,
  },
  'hover-scale': {
    id: 'hover-scale',
    category: 'hover',
    name: 'Scale',
    namePt: 'Escala',
    description: 'Scale up on hover with spring physics',
    descriptionPt: 'Aumentar escala no hover com física de mola',
    icon: 'Maximize2',
    color: '#06b6d4',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'scale', label: 'Scale', type: 'slider', default: 1.05, min: 1, max: 1.3, step: 0.01 },
    ],
    defaultConfig: { scale: 1.05 },
    renderer: ScaleHoverRenderer,
  },
  'hover-glow': {
    id: 'hover-glow',
    category: 'hover',
    name: 'Glow',
    namePt: 'Brilho',
    description: 'Neon glow effect on hover',
    descriptionPt: 'Efeito de brilho neon no hover',
    icon: 'Sun',
    color: '#fbbf24',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: ['border-neon', 'shadow-glow'],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 1, min: 0.1, max: 3, step: 0.1 },
    ],
    defaultConfig: { color: '#00f5ff', intensity: 1 },
    renderer: GlowHoverRenderer,
  },
  'hover-magnetic': {
    id: 'hover-magnetic',
    category: 'hover',
    name: 'Magnetic',
    namePt: 'Magnético',
    description: 'Element follows cursor with magnetic pull',
    descriptionPt: 'Elemento segue o cursor com atração magnética',
    icon: 'Magnet',
    color: '#ef4444',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: ['hover-tilt-3d'],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 0.3, min: 0.05, max: 0.8, step: 0.05 },
    ],
    defaultConfig: { intensity: 0.3 },
    renderer: MagneticHoverRenderer,
  },
  'hover-lift': {
    id: 'hover-lift',
    category: 'hover',
    name: 'Lift',
    namePt: 'Elevação',
    description: 'Lift up with shadow increase on hover',
    descriptionPt: 'Elevar com aumento de sombra no hover',
    icon: 'ArrowUp',
    color: '#10b981',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: ['shadow-soft', 'shadow-deep'],
    configSchema: [
      { key: 'lift', label: 'Lift Amount', type: 'number', default: 8, min: 2, max: 20, unit: 'px' },
    ],
    defaultConfig: { lift: 8 },
    renderer: LiftHoverRenderer,
  },
  'hover-shine': {
    id: 'hover-shine',
    category: 'hover',
    name: 'Shine',
    namePt: 'Brilho',
    description: 'Light sweep across the element on hover',
    descriptionPt: 'Varredura de luz sobre o elemento no hover',
    icon: 'Sparkles',
    color: '#f59e0b',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: 'rgba(255,255,255,0.3)' },
    ],
    defaultConfig: { color: 'rgba(255,255,255,0.3)' },
    renderer: ShineHoverRenderer,
  },
  'hover-float': {
    id: 'hover-float',
    category: 'hover',
    name: 'Float',
    namePt: 'Flutuação',
    description: 'Gentle floating animation on hover',
    descriptionPt: 'Animação de flutuação suave no hover',
    icon: 'Cloud',
    color: '#818cf8',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 3, min: 1, max: 8, unit: 's' },
    ],
    defaultConfig: { duration: 3 },
    renderer: FloatHoverRenderer,
  },
  'hover-rotate': {
    id: 'hover-rotate',
    category: 'hover',
    name: 'Rotate',
    namePt: 'Rotação',
    description: 'Slight rotation on hover',
    descriptionPt: 'Rotação leve no hover',
    icon: 'RotateCw',
    color: '#f97316',
    compatibleWith: [],
    acceptedByLayers: ['hover'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'deg', label: 'Degrees', type: 'number', default: 3, min: -15, max: 15, unit: 'deg' },
    ],
    defaultConfig: { deg: 3 },
    renderer: RotateHoverRenderer,
  },

  // === CLICKS ===
  'click-ripple': {
    id: 'click-ripple',
    category: 'click',
    name: 'Ripple',
    namePt: 'Onda',
    description: 'Material-style ripple effect on click',
    descriptionPt: 'Efeito de onda estilo Material no clique',
    icon: 'Droplets',
    color: '#3b82f6',
    compatibleWith: [],
    acceptedByLayers: ['click'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: 'rgba(255,255,255,0.4)' },
    ],
    defaultConfig: { color: 'rgba(255,255,255,0.4)' },
    renderer: RippleClickRenderer,
  },
  'click-bounce': {
    id: 'click-bounce',
    category: 'click',
    name: 'Bounce',
    namePt: 'Quique',
    description: 'Bouncy scale-down effect on click',
    descriptionPt: 'Efeito de escala com quique no clique',
    icon: 'ArrowDownUp',
    color: '#10b981',
    compatibleWith: [],
    acceptedByLayers: ['click'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'scale', label: 'Scale', type: 'slider', default: 0.92, min: 0.8, max: 1, step: 0.01 },
    ],
    defaultConfig: { scale: 0.92 },
    renderer: BounceClickRenderer,
  },
  'click-pulse': {
    id: 'click-pulse',
    category: 'click',
    name: 'Pulse',
    namePt: 'Pulso',
    description: 'Expanding ring pulse on click',
    descriptionPt: 'Anel de pulso expansivo no clique',
    icon: 'Radio',
    color: '#8b5cf6',
    compatibleWith: [],
    acceptedByLayers: ['click'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: 'rgba(255,255,255,0.2)' },
    ],
    defaultConfig: { color: 'rgba(255,255,255,0.2)' },
    renderer: PulseClickRenderer,
  },
  'click-press': {
    id: 'click-press',
    category: 'click',
    name: 'Press',
    namePt: 'Pressionar',
    description: 'Physical press-down effect',
    descriptionPt: 'Efeito de pressionamento físico',
    icon: 'MousePointerClick',
    color: '#64748b',
    compatibleWith: [],
    acceptedByLayers: ['click'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [],
    defaultConfig: {},
    renderer: PressClickRenderer,
  },
  'click-shake': {
    id: 'click-shake',
    category: 'click',
    name: 'Shake',
    namePt: 'Agitar',
    description: 'Horizontal shake on click',
    descriptionPt: 'Agitação horizontal no clique',
    icon: 'Vibrate',
    color: '#ef4444',
    compatibleWith: [],
    acceptedByLayers: ['click'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [],
    defaultConfig: {},
    renderer: ShakeClickRenderer,
  },

  // === ANIMATIONS ===
  'anim-float': {
    id: 'anim-float',
    category: 'animation',
    name: 'Float',
    namePt: 'Flutuação',
    description: 'Continuous floating animation',
    descriptionPt: 'Animação de flutuação contínua',
    icon: 'Cloud',
    color: '#818cf8',
    compatibleWith: [],
    acceptedByLayers: ['animation'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'distance', label: 'Distance', type: 'number', default: 6, min: 1, max: 20, unit: 'px' },
      { key: 'duration', label: 'Duration', type: 'number', default: 3, min: 1, max: 8, unit: 's' },
    ],
    defaultConfig: { distance: 6, duration: 3 },
    renderer: FloatAnimationRenderer,
  },
  'anim-pulse': {
    id: 'anim-pulse',
    category: 'animation',
    name: 'Pulse',
    namePt: 'Pulso',
    description: 'Continuous pulsing scale animation',
    descriptionPt: 'Animação de pulso de escala contínuo',
    icon: 'Heart',
    color: '#f43f5e',
    compatibleWith: [],
    acceptedByLayers: ['animation'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'scale', label: 'Scale', type: 'slider', default: 1.03, min: 1, max: 1.15, step: 0.01 },
      { key: 'duration', label: 'Duration', type: 'number', default: 2, min: 0.5, max: 6, unit: 's' },
    ],
    defaultConfig: { scale: 1.03, duration: 2 },
    renderer: PulseAnimationRenderer,
  },
  'anim-breathe': {
    id: 'anim-breathe',
    category: 'animation',
    name: 'Breathe',
    namePt: 'Respirar',
    description: 'Gentle breathing glow animation',
    descriptionPt: 'Animação de brilho respiratório suave',
    icon: 'Wind',
    color: '#06b6d4',
    compatibleWith: [],
    acceptedByLayers: ['animation'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: ['shadow-glow', 'border-glow'],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 4, min: 1, max: 10, unit: 's' },
      { key: 'spread', label: 'Spread', type: 'number', default: 20, min: 5, max: 60, unit: 'px' },
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 0.3, min: 0.1, max: 1, step: 0.05 },
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
    ],
    defaultConfig: { duration: 4, spread: 20, intensity: 0.3, color: '#00f5ff' },
    renderer: BreatheAnimationRenderer,
  },
  'anim-shimmer': {
    id: 'anim-shimmer',
    category: 'animation',
    name: 'Shimmer',
    namePt: 'Cintilação',
    description: 'Continuous shimmer sweep across the element',
    descriptionPt: 'Cintilação contínua sobre o elemento',
    icon: 'Sparkles',
    color: '#fbbf24',
    compatibleWith: [],
    acceptedByLayers: ['animation'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 2, min: 0.5, max: 6, unit: 's' },
      { key: 'color', label: 'Color', type: 'color', default: 'rgba(255,255,255,0.1)' },
    ],
    defaultConfig: { duration: 2, color: 'rgba(255,255,255,0.1)' },
    renderer: ShimmerAnimationRenderer,
  },
  'anim-spin': {
    id: 'anim-spin',
    category: 'animation',
    name: 'Spin',
    namePt: 'Rotação',
    description: 'Continuous rotation animation',
    descriptionPt: 'Animação de rotação contínua',
    icon: 'Loader',
    color: '#a78bfa',
    compatibleWith: [],
    acceptedByLayers: ['animation'],
    conflictsWith: [],
    mergeStrategy: 'compose',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 3, min: 0.5, max: 20, unit: 's' },
    ],
    defaultConfig: { duration: 3 },
    renderer: SpinAnimationRenderer,
  },
  'anim-entrance': {
    id: 'anim-entrance',
    category: 'animation',
    name: 'Entrance',
    namePt: 'Entrada',
    description: 'Entrance animation when component mounts',
    descriptionPt: 'Animação de entrada quando o componente é montado',
    icon: 'ArrowDown',
    color: '#10b981',
    compatibleWith: [],
    acceptedByLayers: ['animation'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'y', label: 'Y Offset', type: 'number', default: 20, min: 0, max: 60, unit: 'px' },
      { key: 'scale', label: 'Scale', type: 'slider', default: 0.95, min: 0.8, max: 1, step: 0.01 },
      { key: 'duration', label: 'Duration', type: 'number', default: 0.5, min: 0.1, max: 2, step: 0.1, unit: 's' },
    ],
    defaultConfig: { y: 20, scale: 0.95, duration: 0.5 },
    renderer: EntranceAnimationRenderer,
  },

  // === TYPOGRAPHY ===
  'typo-gradient-text': {
    id: 'typo-gradient-text',
    category: 'typography',
    name: 'Gradient Text',
    namePt: 'Texto Gradiente',
    description: 'Gradient-colored text',
    descriptionPt: 'Texto com cor em gradiente',
    icon: 'Type',
    color: '#8b5cf6',
    compatibleWith: [],
    acceptedByLayers: ['typography', 'title', 'subtitle'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'angle', label: 'Angle', type: 'number', default: 90, min: 0, max: 360, unit: 'deg' },
      { key: 'colors', label: 'Colors', type: 'text', default: ['#00f5ff', '#8b5cf6'] },
    ],
    defaultConfig: { angle: 90, colors: ['#00f5ff', '#8b5cf6'] },
    renderer: GradientTextRenderer,
  },
  'typo-glow-text': {
    id: 'typo-glow-text',
    category: 'typography',
    name: 'Glow Text',
    namePt: 'Texto Brilhante',
    description: 'Neon glowing text effect',
    descriptionPt: 'Efeito de texto neon brilhante',
    icon: 'Sparkles',
    color: '#00f5ff',
    compatibleWith: [],
    acceptedByLayers: ['typography', 'title', 'subtitle'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'intensity', label: 'Intensity', type: 'slider', default: 1, min: 0.1, max: 3, step: 0.1 },
    ],
    defaultConfig: { color: '#00f5ff', intensity: 1 },
    renderer: GlowTextRenderer,
  },
  'typo-typewriter': {
    id: 'typo-typewriter',
    category: 'typography',
    name: 'Typewriter',
    namePt: 'Máquina de Escrever',
    description: 'Typewriter reveal animation for text',
    descriptionPt: 'Animação de revelação tipo máquina de escrever',
    icon: 'Terminal',
    color: '#10b981',
    compatibleWith: [],
    acceptedByLayers: ['typography', 'title', 'content'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'speed', label: 'Speed', type: 'number', default: 50, min: 10, max: 200, unit: 'ms' },
    ],
    defaultConfig: { speed: 50 },
    renderer: TypewriterRenderer,
  },
  'typo-count-up': {
    id: 'typo-count-up',
    category: 'typography',
    name: 'Count Up',
    namePt: 'Contagem',
    description: 'Animated number count-up effect',
    descriptionPt: 'Efeito de contagem animada de números',
    icon: 'Hash',
    color: '#f59e0b',
    compatibleWith: [],
    acceptedByLayers: ['typography', 'content'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [],
    defaultConfig: {},
    renderer: CountUpRenderer,
  },

  // === STRUCTURE ===
  'struct-card': {
    id: 'struct-card',
    category: 'structure',
    name: 'Card',
    namePt: 'Cartão',
    description: 'Card container structure with padding and rounded corners',
    descriptionPt: 'Estrutura de contêiner de cartão com preenchimento e cantos arredondados',
    icon: 'Square',
    color: '#334155',
    compatibleWith: [],
    acceptedByLayers: ['structure'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'padding', label: 'Padding', type: 'number', default: 24, min: 0, max: 64, unit: 'px' },
    ],
    defaultConfig: { padding: 24 },
    renderer: CardStructureRenderer,
  },
  'struct-button': {
    id: 'struct-button',
    category: 'structure',
    name: 'Button',
    namePt: 'Botão',
    description: 'Button structure with flex alignment',
    descriptionPt: 'Estrutura de botão com alinhamento flex',
    icon: 'MousePointerClick',
    color: '#3b82f6',
    compatibleWith: [],
    acceptedByLayers: ['structure'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'paddingY', label: 'Padding Y', type: 'number', default: 12, min: 4, max: 32, unit: 'px' },
      { key: 'paddingX', label: 'Padding X', type: 'number', default: 24, min: 8, max: 48, unit: 'px' },
    ],
    defaultConfig: { paddingY: 12, paddingX: 24 },
    renderer: ButtonStructureRenderer,
  },
  'struct-input': {
    id: 'struct-input',
    category: 'structure',
    name: 'Input',
    namePt: 'Entrada',
    description: 'Input field structure',
    descriptionPt: 'Estrutura de campo de entrada',
    icon: 'TextCursorInput',
    color: '#6366f1',
    compatibleWith: [],
    acceptedByLayers: ['structure'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'paddingY', label: 'Padding Y', type: 'number', default: 12, min: 4, max: 32, unit: 'px' },
      { key: 'paddingX', label: 'Padding X', type: 'number', default: 16, min: 8, max: 48, unit: 'px' },
    ],
    defaultConfig: { paddingY: 12, paddingX: 16 },
    renderer: InputStructureRenderer,
  },
  'struct-badge': {
    id: 'struct-badge',
    category: 'structure',
    name: 'Badge',
    namePt: 'Emblema',
    description: 'Badge/chip structure',
    descriptionPt: 'Estrutura de emblema/tag',
    icon: 'Tag',
    color: '#8b5cf6',
    compatibleWith: [],
    acceptedByLayers: ['structure'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'paddingY', label: 'Padding Y', type: 'number', default: 4, min: 2, max: 12, unit: 'px' },
      { key: 'paddingX', label: 'Padding X', type: 'number', default: 12, min: 4, max: 24, unit: 'px' },
      { key: 'fontSize', label: 'Font Size', type: 'number', default: 12, min: 8, max: 20, unit: 'px' },
    ],
    defaultConfig: { paddingY: 4, paddingX: 12, fontSize: 12 },
    renderer: BadgeStructureRenderer,
  },
  'struct-modal': {
    id: 'struct-modal',
    category: 'structure',
    name: 'Modal',
    namePt: 'Modal',
    description: 'Modal overlay structure',
    descriptionPt: 'Estrutura de sobreposição modal',
    icon: 'PanelTop',
    color: '#0ea5e9',
    compatibleWith: [],
    acceptedByLayers: ['structure'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'padding', label: 'Padding', type: 'number', default: 24, min: 8, max: 64, unit: 'px' },
      { key: 'maxWidth', label: 'Max Width', type: 'number', default: 500, min: 280, max: 1200, unit: 'px' },
    ],
    defaultConfig: { padding: 24, maxWidth: 500 },
    renderer: ModalStructureRenderer,
  },
  'struct-navbar': {
    id: 'struct-navbar',
    category: 'structure',
    name: 'Navbar',
    namePt: 'Barra de Navegação',
    description: 'Navigation bar structure',
    descriptionPt: 'Estrutura de barra de navegação',
    icon: 'AlignJustify',
    color: '#0891b2',
    compatibleWith: [],
    acceptedByLayers: ['structure'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'height', label: 'Height', type: 'number', default: 64, min: 40, max: 120, unit: 'px' },
      { key: 'paddingX', label: 'Padding X', type: 'number', default: 24, min: 8, max: 64, unit: 'px' },
    ],
    defaultConfig: { height: 64, paddingX: 24 },
    renderer: NavbarStructureRenderer,
  },

  // === LOADING ===
  'loading-skeleton': {
    id: 'loading-skeleton',
    category: 'loading',
    name: 'Skeleton',
    namePt: 'Esqueleto',
    description: 'Loading skeleton shimmer effect',
    descriptionPt: 'Efeito de esqueleto de carregamento com cintilação',
    icon: 'Loader',
    color: '#64748b',
    compatibleWith: [],
    acceptedByLayers: ['loading', 'background'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 1.5, min: 0.5, max: 4, step: 0.1, unit: 's' },
    ],
    defaultConfig: { duration: 1.5 },
    renderer: SkeletonRenderer,
  },
  'loading-spinner': {
    id: 'loading-spinner',
    category: 'loading',
    name: 'Spinner',
    namePt: 'Carregador',
    description: 'Circular spinner loading indicator',
    descriptionPt: 'Indicador de carregamento circular',
    icon: 'Loader',
    color: '#00f5ff',
    compatibleWith: [],
    acceptedByLayers: ['loading'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'size', label: 'Size', type: 'number', default: 24, min: 12, max: 64, unit: 'px' },
      { key: 'color', label: 'Color', type: 'color', default: '#00f5ff' },
      { key: 'duration', label: 'Duration', type: 'number', default: 1, min: 0.3, max: 4, step: 0.1, unit: 's' },
    ],
    defaultConfig: { size: 24, color: '#00f5ff', duration: 1 },
    renderer: SpinnerRenderer,
  },

  // === TRANSITIONS ===
  'transition-fade': {
    id: 'transition-fade',
    category: 'transition',
    name: 'Fade',
    namePt: 'Fade',
    description: 'Fade in/out transition',
    descriptionPt: 'Transição de fade in/out',
    icon: 'Eye',
    color: '#94a3b8',
    compatibleWith: [],
    acceptedByLayers: ['transition'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'duration', label: 'Duration', type: 'number', default: 0.3, min: 0.1, max: 2, step: 0.1, unit: 's' },
    ],
    defaultConfig: { duration: 0.3 },
    renderer: FadeTransitionRenderer,
  },
  'transition-slide': {
    id: 'transition-slide',
    category: 'transition',
    name: 'Slide',
    namePt: 'Deslizar',
    description: 'Slide in transition from a direction',
    descriptionPt: 'Transição de deslizamento de uma direção',
    icon: 'ArrowRight',
    color: '#3b82f6',
    compatibleWith: [],
    acceptedByLayers: ['transition'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'direction', label: 'Direction', type: 'select', default: 'up', options: [
        { label: 'Up', value: 'up' },
        { label: 'Down', value: 'down' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ]},
      { key: 'duration', label: 'Duration', type: 'number', default: 0.4, min: 0.1, max: 2, step: 0.1, unit: 's' },
    ],
    defaultConfig: { direction: 'up', duration: 0.4 },
    renderer: SlideTransitionRenderer,
  },
  'transition-scale': {
    id: 'transition-scale',
    category: 'transition',
    name: 'Scale',
    namePt: 'Escala',
    description: 'Scale in/out transition',
    descriptionPt: 'Transição de escala in/out',
    icon: 'Maximize',
    color: '#8b5cf6',
    compatibleWith: [],
    acceptedByLayers: ['transition'],
    conflictsWith: [],
    mergeStrategy: 'replace',
    requires: [],
    enhances: [],
    configSchema: [
      { key: 'from', label: 'From Scale', type: 'slider', default: 0.9, min: 0.5, max: 1, step: 0.01 },
      { key: 'duration', label: 'Duration', type: 'number', default: 0.3, min: 0.1, max: 2, step: 0.1, unit: 's' },
    ],
    defaultConfig: { from: 0.9, duration: 0.3 },
    renderer: ScaleTransitionRenderer,
  },
};

// ============================================================
// EFFECT REGISTRY UTILITIES
// ============================================================

export function getEffectsByCategory(category: EffectCategory): EffectModule[] {
  return Object.values(EFFECT_REGISTRY).filter(e => e.category === category);
}

export function getEffectById(id: string): EffectModule | undefined {
  return EFFECT_REGISTRY[id];
}

export function getCompatibleEffects(layerId: string, componentType: string): EffectModule[] {
  return Object.values(EFFECT_REGISTRY).filter(
    e => e.acceptedByLayers.includes(layerId) &&
         (e.compatibleWith.length === 0 || e.compatibleWith.includes(componentType))
  );
}

export function getEffectCategories(): { id: EffectCategory; label: string; labelPt: string; icon: string; color: string }[] {
  const categories = new Map<EffectCategory, { label: string; labelPt: string; icon: string; color: string }>();
  for (const effect of Object.values(EFFECT_REGISTRY)) {
    if (!categories.has(effect.category)) {
      categories.set(effect.category, {
        label: effect.category.charAt(0).toUpperCase() + effect.category.slice(1),
        labelPt: getEffectCategoryLabelPt(effect.category),
        icon: effect.icon,
        color: effect.color,
      });
    }
  }
  return Array.from(categories.entries()).map(([id, meta]) => ({ id, ...meta }));
}

function getEffectCategoryLabelPt(category: EffectCategory): string {
  const labels: Record<EffectCategory, string> = {
    background: 'Fundo',
    border: 'Borda',
    shadow: 'Sombra',
    hover: 'Hover',
    click: 'Clique',
    animation: 'Animação',
    typography: 'Tipografia',
    structure: 'Estrutura',
    layout: 'Layout',
    loading: 'Carregamento',
    transition: 'Transição',
  };
  return labels[category] || category;
}
