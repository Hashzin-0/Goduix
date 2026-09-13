'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type StepperStep = {
  title: string;
  description?: string;
};

export type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
  theme: ThemeColors;
  className?: string;
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  theme,
  className,
}) => {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: i <= currentStep ? theme.primary : 'rgb(39, 39, 42)',
                scale: i === currentStep ? 1.1 : 1,
              }}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                i <= currentStep ? 'text-white' : 'text-zinc-500 border border-white/10'
              )}
            >
              {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
            </motion.div>
            <div className="mt-2 text-center">
              <div className={cn('text-xs font-medium', i <= currentStep ? 'text-white' : 'text-zinc-500')}>{step.title}</div>
              {step.description && <div className="text-[10px] text-zinc-500">{step.description}</div>}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                animate={{ width: i < currentStep ? '100%' : '0%' }}
                className="h-full"
                style={{ backgroundColor: theme.primary }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
