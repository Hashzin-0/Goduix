import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Box, Layers, Cpu, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface Tilt3DCardProps {
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
  theme: ThemeColors;
  className?: string;
  title?: string;
  category?: string;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  maxTilt = 18,
  perspective = 1000,
  glareOpacity = 0.25,
  theme,
  className,
  title = "3D Gyro Perspective Card",
  category = "Spatial Dimension",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (clientY - rect.top - height / 2) / (height / 2);

    const rotX = -mouseY * maxTilt;
    const rotY = mouseX * maxTilt;

    setRotation({ x: rotX, y: rotY });

    const glareX = ((clientX - rect.left) / width) * 100;
    const glareY = ((clientY - rect.top) / height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: glareOpacity });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handlePointerLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={cn("w-full h-full select-none touch-none", className)}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handlePointerLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handlePointerLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn(
          "relative w-full rounded-2xl p-7 overflow-hidden",
          "bg-gradient-to-br from-zinc-900/90 via-zinc-950/90 to-black/95",
          "border border-white/15 backdrop-blur-2xl shadow-2xl",
          "transition-shadow duration-300"
        )}
      >
        {/* Dynamic Specular Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(350px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4), transparent 70%)`,
          }}
        />

        {/* Ambient Corner Light */}
        <div
          className="absolute -top-12 -left-12 w-36 h-36 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Floating 3D Badge Layer (TranslateZ 30px) */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="relative z-10 flex items-center justify-between mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-zinc-100 shadow-sm">
            <Box className="w-3.5 h-3.5 text-zinc-300" />
            {category}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Z-INDEX: 3D
          </span>
        </div>

        {/* Floating 3D Center Graphic (TranslateZ 45px) */}
        <div
          style={{ transform: 'translateZ(45px)' }}
          className="relative z-10 py-6 flex flex-col items-center justify-center text-center"
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-white/20 bg-white/5 backdrop-blur-md shadow-inner"
            style={{
              boxShadow: `0 0 25px -5px ${theme.glow}`,
            }}
          >
            <Cpu className="w-8 h-8 text-zinc-100" />
          </div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            Responde ao giroscópio do cursor com física amortecida e reflexo dinâmico.
          </p>
        </div>

        {/* Floating 3D Footer Controls (TranslateZ 25px) */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="relative z-10 pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
            <span>Interactive 3D Layer</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500">
            {Math.round(rotation.x)}° X / {Math.round(rotation.y)}° Y
          </span>
        </div>
      </motion.div>
    </div>
  );
};
