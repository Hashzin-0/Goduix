'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type OtpInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
  theme: ThemeColors;
  className?: string;
};

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete,
  theme,
  className,
}) => {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(''));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(d => d !== '')) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={cn(
            'w-12 h-14 text-center text-xl font-bold rounded-xl',
            'bg-zinc-900 border border-white/10 text-white',
            'focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20',
            'transition-all duration-200'
          )}
          style={{
            borderColor: digit ? theme.primary : undefined,
            boxShadow: digit ? `0 0 12px ${theme.glow}` : undefined,
          }}
        />
      ))}
    </div>
  );
};
