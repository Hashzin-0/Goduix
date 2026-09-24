// Attack/release envelope over level getter, optional MediaStream RMS, idle sine.
// Audio path is optional and fail-safe: missing AudioContext never throws.
import { useEffect, useRef, useState } from 'react';
import { clamp01, saturateVoice } from './voiceStyles';

export type VoiceLevelInput = number | (() => number);

export interface UseVoiceLevelOptions {
  /** Manual 0–1 drive — plain value or per-frame getter (sampled without forcing re-reads of props). */
  level?: VoiceLevelInput;
  /** Optional mic/remote audio; wins over `level` when present and active. */
  stream?: MediaStream | null;
  /** Resting presence 0–1 while silent (sine breathing unless reduced-motion). @default 0.23 */
  idle?: number;
  /** Input gain on analysed audio. @default 3.1 */
  sensitivity?: number;
  /** Seconds to rise toward a louder target. @default 0.325 */
  attack?: number;
  /** Seconds to settle after the target drops. @default 0.86 */
  release?: number;
  /** Noise gate 0–1 — below this counts as silence for the drive path. @default 0.015 */
  threshold?: number;
  /** When false, holds at 0 and tears down audio. @default true */
  active?: boolean;
  /** Disables idle sine (static floor) and freezes decorative motion. */
  reducedMotion?: boolean;
}

interface AudioGraph {
  ctx: AudioContext;
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  data: Uint8Array;
}

function readRms(graph: AudioGraph): number {
  const { analyser, data } = graph;
  analyser.getByteTimeDomainData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    const v = (data[i] - 128) / 128;
    sum += v * v;
  }
  return Math.sqrt(sum / data.length);
}

/**
 * Smoothed 0–1 voice level with attack/release envelope.
 * - No `stream`: follows `level` (number or getter sampled each frame).
 * - With `stream`: AnalyserNode RMS × sensitivity, gated and softly saturated.
 * - Silent: folds in `idle` breathing (sine) unless `reducedMotion`.
 * Cleans up rAF + audio nodes on unmount / dependency change.
 */
export function useVoiceLevel(options: UseVoiceLevelOptions = {}): number {
  const {
    level,
    stream = null,
    idle = 0.23,
    sensitivity = 3.1,
    attack = 0.325,
    release = 0.86,
    threshold = 0.015,
    active = true,
    reducedMotion = false,
  } = options;

  const [smoothed, setSmoothed] = useState(0);

  // Latest inputs for the rAF closure without restarting the loop every render.
  const levelRef = useRef<VoiceLevelInput | undefined>(level);
  const idleRef = useRef(idle);
  const sensitivityRef = useRef(sensitivity);
  const attackRef = useRef(attack);
  const releaseRef = useRef(release);
  const thresholdRef = useRef(threshold);
  const activeRef = useRef(active);
  const reducedRef = useRef(reducedMotion);
  levelRef.current = level;
  idleRef.current = idle;
  sensitivityRef.current = sensitivity;
  attackRef.current = attack;
  releaseRef.current = release;
  thresholdRef.current = threshold;
  activeRef.current = active;
  reducedRef.current = reducedMotion;

  const audioRef = useRef<AudioGraph | null>(null);
  const smoothedRef = useRef(0);
  const rafRef = useRef(0);

  // Optional Web Audio path — try/catch; never crash if AudioContext is missing.
  useEffect(() => {
    audioRef.current = null;
    if (!stream || !active) return;

    let ctx: AudioContext | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let analyser: AnalyserNode | null = null;

    try {
      const Ctor: typeof AudioContext | undefined =
        typeof window !== 'undefined'
          ? window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext
          : undefined;
      if (!Ctor) return;

      ctx = new Ctor();
      source = ctx.createMediaStreamSource(stream);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.7;
      source.connect(analyser);
      audioRef.current = {
        ctx,
        source,
        analyser,
        data: new Uint8Array(analyser.fftSize),
      };
    } catch {
      // Best-effort teardown of a partial graph, then fall back to level/idle.
      try {
        source?.disconnect();
      } catch {
        /* noop */
      }
      try {
        analyser?.disconnect();
      } catch {
        /* noop */
      }
      try {
        void ctx?.close();
      } catch {
        /* noop */
      }
      audioRef.current = null;
    }

    return () => {
      const graph = audioRef.current;
      audioRef.current = null;
      if (!graph) return;
      try {
        graph.source.disconnect();
      } catch {
        /* noop */
      }
      try {
        graph.analyser.disconnect();
      } catch {
        /* noop */
      }
      try {
        void graph.ctx.close();
      } catch {
        /* noop */
      }
    };
  }, [stream, active]);

  useEffect(() => {
    const prefersReduce =
      typeof matchMedia !== 'undefined'
        ? matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (prefersReduce) reducedRef.current = true;

    let last = performance.now();
    let phase = 0; // breathing clock (seconds)
    let running = true;

    const sampleDrive = (): number => {
      if (!activeRef.current) return 0;

      const graph = audioRef.current;
      if (graph) {
        try {
          const rms = readRms(graph);
          const gated = rms * sensitivityRef.current;
          if (gated < thresholdRef.current) return 0;
          return saturateVoice(gated);
        } catch {
          // Fall through to manual/idle drive if the analyser hiccups.
        }
      }

      const input = levelRef.current;
      if (typeof input === 'function') {
        try {
          return clamp01(input());
        } catch {
          return 0;
        }
      }
      if (typeof input === 'number') return clamp01(input);
      return 0;
    };

    const idleFloor = (): number => {
      const rest = clamp01(idleRef.current);
      if (rest <= 0) return 0;
      if (reducedRef.current) return rest * 0.75;
      // ~5.2s breathing period (vendor default), soft sine around rest
      return rest * (0.55 + 0.45 * Math.sin(phase * ((Math.PI * 2) / 5.2)));
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      phase += dt;

      const drive = sampleDrive();
      const target = clamp01(Math.max(drive, drive < 0.02 ? idleFloor() : idleFloor() * 0.15));

      // Attack/release one-pole envelope
      const tau = target > smoothedRef.current ? Math.max(0.01, attackRef.current) : Math.max(0.01, releaseRef.current);
      const k = 1 - Math.exp(-dt / tau);
      smoothedRef.current += (target - smoothedRef.current) * k;
      if (smoothedRef.current < 0.0005 && target === 0) smoothedRef.current = 0;

      setSmoothed(smoothedRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    // Reduced motion with no audio: hold a static floor — no rAF.
    if (reducedRef.current && !audioRef.current && typeof levelRef.current !== 'function') {
      const drive = sampleDrive();
      const next = clamp01(Math.max(drive, idleFloor()));
      smoothedRef.current = next;
      setSmoothed(next);
      return () => {
        running = false;
      };
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [stream, active, reducedMotion]);

  return smoothed;
}
