'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ThemeColors } from '../../types';

export type MagicInputVariant = 'primary' | 'secondary';
export type MagicInputSize = 'sm' | 'md' | 'lg';
export type MagicInputDepth = 'focus' | 'always';
export type MagicInputStatus = 'idle' | 'loading' | 'success' | 'error';

export type MagicInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onSubmit'
> & {
  variant?: MagicInputVariant;
  size?: MagicInputSize;
  depth?: MagicInputDepth;
  rainbow?: boolean;
  submitButton?: boolean;
  onSubmit?: (value: string) => void;
  submitLabel?: string;
  status?: MagicInputStatus;
  progress?: number;
  theme: ThemeColors;
  label?: string;
};

const frontSize: Record<MagicInputSize, string> = {
  sm: 'py-2 pl-3 pr-3 text-sm',
  md: 'py-3 pl-4 pr-4 text-base',
  lg: 'py-4 pl-5 pr-5 text-lg',
};

const frontSizeWithButton: Record<MagicInputSize, string> = {
  sm: 'py-2 pl-3 pr-10 text-sm',
  md: 'py-3 pl-4 pr-12 text-base',
  lg: 'py-4 pl-5 pr-14 text-lg',
};

const RING_R = 9;
const RING_C = 2 * Math.PI * RING_R;

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const RingProgress = ({ value }: { value: number }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <circle cx="12" cy="12" r={RING_R} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={2.5} />
    <circle cx="12" cy="12" r={RING_R} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeDasharray={RING_C} strokeDashoffset={RING_C * (1 - clampPercent(value) / 100)} transform="rotate(-90 12 12)" style={{ transition: 'stroke-dashoffset 250ms ease' }} />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin [transform-origin:center]" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <circle cx="12" cy="12" r={RING_R} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={2.5} />
    <circle cx="12" cy="12" r={RING_R} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeDasharray={`${RING_C * 0.28} ${RING_C}`} />
  </svg>
);

const MagicInput = React.forwardRef<HTMLInputElement, MagicInputProps>(
  (
    {
      className,
      style,
      variant = 'primary',
      size = 'md',
      depth = 'focus',
      rainbow = true,
      submitButton = false,
      onSubmit,
      submitLabel = 'Submit',
      status = 'idle',
      progress,
      onKeyDown,
      disabled,
      readOnly,
      label,
      placeholder,
      theme,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const showButton = submitButton || onSubmit != null;
    const isIdle = status === 'idle';
    const isLoading = status === 'loading';
    const isDeterminate = isLoading && progress != null;
    const clamped = progress != null ? clampPercent(progress) : undefined;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (isIdle && onSubmit && event.key === 'Enter' && !event.defaultPrevented) {
        onSubmit(event.currentTarget.value);
      }
    };

    const handleSubmitClick = () => {
      if (!isIdle) return;
      onSubmit?.(innerRef.current?.value ?? '');
    };

    const [armed, setArmed] = React.useState(false);
    React.useEffect(() => {
      if (!isLoading) {
        setArmed(false);
        return;
      }
      setArmed(false);
      const id = requestAnimationFrame(() => setArmed(true));
      return () => cancelAnimationFrame(id);
    }, [isLoading]);

    const lock = readOnly || isLoading || status === 'success';
    const hasStatus = !isIdle;
    const isSuccess = status === 'success';

    const magicFill = isSuccess
      ? 'oklch(0.65 0.17 150)'
      : status === 'error'
        ? theme.primary
        : theme.primary;

    const statusFill =
      isLoading && isDeterminate
        ? '[background-position:right_center] [background-size:var(--magic-progress,0%)_100%]'
        : isLoading
          ? '[background-image:linear-gradient(90deg,transparent,var(--magic-fill),transparent)] [background-position:right_center] [background-size:45%_100%] animate-[magic-input-indeterminate_1.2s_ease-in-out_infinite_alternate]'
          : '[background-color:var(--primary)] [background-position:left_center] [background-size:100%_100%] animate-[magic-input-sweep_220ms_ease-out]';

    const edgeVariantClass = variant === 'primary'
      ? 'bg-gradient-to-l from-black/50 via-white/10 to-black/50'
      : 'bg-gradient-to-l from-black/50 via-white/5 to-black/50';

    let shadowClass: string;
    let edgeClass: string;
    if (disabled) {
      shadowClass = 'hidden';
      edgeClass = 'hidden';
    } else if (hasStatus) {
      const fillTransition = armed
        ? '[transition:background-size_250ms_ease]'
        : '[transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),opacity_250ms_ease]';
      shadowClass = `absolute inset-0 rounded-xl translate-y-[6px] opacity-75 blur-[12px] bg-no-repeat [will-change:translate] ${fillTransition} ${statusFill}`;
      const edgeTransition = armed
        ? '[transition:background-size_250ms_ease]'
        : '[transition:opacity_250ms_ease]';
      edgeClass = `absolute inset-0 rounded-xl opacity-100 bg-no-repeat ${edgeTransition} ${statusFill}`;
    } else {
      const shadowDepth =
        depth === 'always'
          ? 'opacity-100 translate-y-1 group-focus-within:translate-y-1.5'
          : 'opacity-0 translate-y-0 group-focus-within:translate-y-1';
      const shadowFocusOpacity = rainbow || depth === 'always' ? '' : 'group-focus-within:opacity-100';
      const shadowRainbow = rainbow
        ? 'group-focus-within:bg-gradient-to-r group-focus-within:from-pink-500 group-focus-within:via-cyan-400 group-focus-within:to-purple-500 group-focus-within:bg-[length:200%_100%] group-focus-within:animate-[magic-rainbow_2s_linear_infinite] group-focus-within:blur-[12px] group-focus-within:opacity-70'
        : '';
      shadowClass = `absolute inset-0 rounded-xl bg-black/25 blur-[4px] [will-change:translate] [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),opacity_250ms_ease] ${shadowDepth} ${shadowFocusOpacity} ${shadowRainbow}`;

      const edgeOpacity =
        depth === 'always'
          ? 'opacity-100'
          : 'opacity-0 group-focus-within:opacity-100';
      const edgeRainbow = rainbow
        ? 'group-focus-within:bg-gradient-to-r group-focus-within:from-pink-500 group-focus-within:via-cyan-400 group-focus-within:to-purple-500 group-focus-within:bg-[length:200%_100%] group-focus-within:animate-[magic-rainbow_2s_linear_infinite]'
        : '';
      edgeClass = `absolute inset-0 rounded-xl [transition:opacity_250ms_ease] ${edgeOpacity} ${edgeVariantClass} ${edgeRainbow}`;
    }

    const frontTransform = disabled
      ? 'translate-y-0'
      : hasStatus
        ? '-translate-y-1'
        : depth === 'always'
          ? '-translate-y-1 group-focus-within:-translate-y-1.5 group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]'
          : 'translate-y-0 group-focus-within:-translate-y-1 group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]';
    const frontText =
      isLoading || isSuccess
        ? 'text-zinc-400 placeholder:text-zinc-500'
        : 'text-white placeholder:text-zinc-500';
    const frontClass = `relative block w-full box-border rounded-xl border border-white/10 bg-zinc-900 outline-none [will-change:translate] [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1)] group-focus-within:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${frontText} ${frontTransform} ${(showButton ? frontSizeWithButton : frontSize)[size]}`;

    const submitColor = isSuccess
      ? 'bg-emerald-500 text-white'
      : status === 'error'
        ? 'bg-red-500 text-white'
        : 'bg-white/10 text-white';
    const submitTransform = hasStatus
      ? '-translate-y-1'
      : depth === 'always'
        ? '-translate-y-1 group-focus-within:-translate-y-1.5 group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]'
        : 'translate-y-0 group-focus-within:-translate-y-1 group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]';
    const submitClass = `absolute top-1.5 right-1.5 bottom-1.5 z-[1] inline-flex aspect-square cursor-pointer items-center justify-center rounded-[10px] border-none p-0 text-[1.125rem] leading-none [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),filter_200ms_ease] [-webkit-tap-highlight-color:transparent] hover:brightness-110 active:brightness-95 focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${submitColor} ${submitTransform}`;

    const ICON_BASE =
      'absolute inset-0 grid place-items-center [transition:opacity_220ms_ease,transform_220ms_cubic-bezier(0.3,0.7,0.4,1.5)]';
    const iconClass = (active: boolean) =>
      active
        ? `${ICON_BASE} opacity-100 [transform:scale(1)_rotate(0deg)]`
        : `${ICON_BASE} opacity-0 [transform:scale(0.4)_rotate(-35deg)]`;

    return (
      <div
        data-slot="magic-input"
        data-variant={variant}
        data-depth={depth}
        data-rainbow={rainbow ? 'true' : undefined}
        data-submit={showButton ? 'true' : undefined}
        data-status={isIdle ? undefined : status}
        data-determinate={isDeterminate ? 'true' : undefined}
        data-armed={armed ? 'true' : undefined}
        className={cn(
          'group relative inline-block rounded-xl [-webkit-tap-highlight-color:transparent]',
          disabled ? 'cursor-not-allowed' : '',
          className,
        )}
        style={
          {
            ...style,
            ...(clamped != null ? { '--magic-progress': `${clamped}%` } : {}),
            ...(hasStatus ? { '--magic-fill': magicFill } : {}),
          } as React.CSSProperties
        }
      >
        <span className={shadowClass} aria-hidden="true" />
        <span className={edgeClass} aria-hidden="true" />
        {label && (
          <label className={cn(
            'absolute left-4 top-1 text-[10px] font-mono uppercase tracking-wider transition-colors z-10',
            isIdle ? 'text-zinc-500 group-focus-within:text-cyan-400' : 'text-zinc-400'
          )}>
            {label}
          </label>
        )}
        <input
          ref={innerRef}
          data-size={size}
          className={frontClass}
          disabled={disabled}
          readOnly={lock}
          placeholder={placeholder}
          aria-busy={isLoading || undefined}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {!isIdle ? (
          <span
            className="sr-only"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={isDeterminate ? clamped : undefined}
            aria-valuetext={
              status === 'success'
                ? 'Success'
                : status === 'error'
                  ? 'Error'
                  : isDeterminate
                    ? `${clamped}%`
                    : 'Loading'
            }
          />
        ) : null}
        {showButton ? (
          <button
            type={onSubmit ? 'button' : 'submit'}
            className={submitClass}
            aria-label={submitLabel}
            disabled={disabled}
            onClick={onSubmit ? handleSubmitClick : undefined}
          >
            <span className={iconClass(isIdle)} data-icon="arrow" aria-hidden>
              <ArrowIcon />
            </span>
            <span className={iconClass(isLoading)} data-icon="ring" aria-hidden>
              {isLoading && !isDeterminate ? (
                <Spinner />
              ) : (
                <RingProgress value={isLoading ? (clamped as number) : 0} />
              )}
            </span>
            <span className={iconClass(isSuccess)} data-icon="check" aria-hidden>
              <CheckIcon />
            </span>
            <span className={iconClass(status === 'error')} data-icon="x" aria-hidden>
              <XIcon />
            </span>
          </button>
        ) : null}
      </div>
    );
  },
);
MagicInput.displayName = 'MagicInput';

export { MagicInput };
