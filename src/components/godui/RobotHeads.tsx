import React from 'react';
import { RobotHead, robotHeadShapes, robotHeadStates } from 'robot-heads';

type RobotShape = (typeof robotHeadShapes)[number];
type RobotState = (typeof robotHeadStates)[number];

export interface RobotHeadsProps {
  shape?: RobotShape;
  state?: RobotState;
  size?: number;
  color?: string;
  trimColor?: string;
  screenColor?: string;
  speed?: number;
  paused?: boolean;
  interactive?: boolean;
  antenna?: boolean;
  label?: string;
}

export const RobotHeads: React.FC<RobotHeadsProps> = ({
  shape = 'rectangle',
  state = 'thinking',
  size = 180,
  color = '#263b62',
  trimColor = '#a8c2e8',
  screenColor = '#d8f7ff',
  speed = 1,
  paused = false,
  interactive = true,
  antenna = true,
  label = 'Mascote robótico do GodUI',
}) => (
  <div className="flex flex-col items-center justify-center gap-3 py-3">
    <RobotHead
      shape={shape}
      state={state}
      size={size}
      color={color}
      trimColor={trimColor}
      screenColor={screenColor}
      speed={speed}
      paused={paused}
      interactive={interactive}
      antenna={antenna}
      aria-label={label}
    />
    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
      {state} · {shape}
    </span>
  </div>
);
