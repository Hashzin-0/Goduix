import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

interface AsciiDitherProps {
  mode?: 'ascii' | 'halftone';
  interactive?: boolean;
  theme: ThemeColors;
  className?: string;
}

export const AsciiDither: React.FC<AsciiDitherProps> = ({
  mode = 'ascii',
  interactive = true,
  theme,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 150, y: 100 });
  const [activeMode, setActiveMode] = useState<'ascii' | 'halftone'>(mode);
  const [frame, setFrame] = useState(0);

  const CHARS = ' .:-=+*#%@';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      const cols = 42;
      const rows = 20;
      const cellW = width / cols;
      const cellH = height / rows;

      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;

          // Wave equation + mouse proximity disturbance
          const distToMouse = Math.hypot(x - mousePos.x, y - mousePos.y);
          const mouseFactor = Math.max(0, 1 - distToMouse / 120);

          const wave = Math.sin(c * 0.25 + time) * Math.cos(r * 0.35 + time * 0.8);
          const intensity = Math.min(1, Math.max(0, (wave + 1) * 0.35 + mouseFactor * 0.7));

          if (activeMode === 'ascii') {
            const charIdx = Math.floor(intensity * (CHARS.length - 1));
            const char = CHARS[charIdx] || ' ';

            if (intensity > 0.6) {
              ctx.fillStyle = theme.primary;
            } else if (intensity > 0.3) {
              ctx.fillStyle = '#a1a1aa';
            } else {
              ctx.fillStyle = '#27272a';
            }

            ctx.fillText(char, x, y);
          } else {
            // Halftone dither dots
            const radius = intensity * (cellW * 0.42);
            ctx.fillStyle = intensity > 0.6 ? theme.primary : '#71717a';
            ctx.beginPath();
            ctx.arc(x, y, Math.max(1, radius), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [mousePos, activeMode, theme.primary]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 420 / rect.width;
    const scaleY = 220 / rect.height;
    setMousePos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };

  return (
    <div className={cn("max-w-lg mx-auto p-4 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl space-y-3 select-none", className)}>
      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>ASCII Dither Matrix Shader</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveMode(activeMode === 'ascii' ? 'halftone' : 'ascii')}
            className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
          >
            Modo: {activeMode === 'ascii' ? 'ASCII' : 'Halftone'}
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={420}
          height={220}
          onMouseMove={handleMouseMove}
          className="w-full h-auto cursor-crosshair"
        />

        {/* Ambient CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
        <span>Luminance-mapped ASCII Glyphs</span>
        <span className="text-cyan-400">Passe o mouse no canvas</span>
      </div>
    </div>
  );
};
