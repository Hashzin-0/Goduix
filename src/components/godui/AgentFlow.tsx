'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type AgentFlowStep = {
  label: string;
  status: 'pending' | 'active' | 'completed';
};

export type AgentFlowProps = {
  steps: AgentFlowStep[];
  theme: ThemeColors;
  className?: string;
};

export const AgentFlow: React.FC<AgentFlowProps> = ({
  steps,
  theme,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <motion.div
            animate={{
              backgroundColor: step.status === 'completed' ? theme.primary
                : step.status === 'active' ? theme.accent
                : 'rgb(39, 39, 42)',
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-white"
          >
            {step.label}
          </motion.div>
          {i < steps.length - 1 && (
            <div className="w-6 h-0.5 bg-zinc-700" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
