'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type FlowFieldProps = {
  theme: ThemeColors;
  className?: string;
};

export const FlowField: React.FC<FlowFieldProps> = ({
  theme,
  className,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = 20;
    const rows = 20;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.strokeStyle = `${theme.primary}30`;
    ctx.lineWidth = 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * cellW;
        const y = j * cellH;
        const angle = Math.sin(i * 0.3) * Math.cos(j * 0.3) * Math.PI;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * cellW * 0.8, y + Math.sin(angle) * cellH * 0.8);
        ctx.stroke();
      }
    }
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-full', className)}
    />
  );
};
