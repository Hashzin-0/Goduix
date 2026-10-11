import React, { useEffect, useRef, useState } from 'react';

export interface VgpuBlackHoleProps {
  title?: string;
  description?: string;
  intensity?: number;
}

const BLACK_HOLE_SHADER = /* wgsl */ `
struct Frame {
  resolution: vec2f,
  time: f32,
  intensity: f32,
}
@group(0) @binding(0) var<uniform> frame: Frame;

struct VertexOutput {
  @builtin(position) position: vec4f,
}

@vertex
fn vertexMain(@builtin(vertex_index) index: u32) -> VertexOutput {
  var points = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f(3.0, -1.0),
    vec2f(-1.0, 3.0)
  );
  var output: VertexOutput;
  output.position = vec4f(points[index], 0.0, 1.0);
  return output;
}

fn hash21(p: vec2f) -> f32 {
  let h = dot(p, vec2f(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.position.xy / frame.resolution;
  var p = (uv - vec2f(0.5, 0.5)) * 2.0;
  p.x *= frame.resolution.x / max(frame.resolution.y, 1.0);
  let t = frame.time * 0.16;
  let radius = length(p);
  let angle = atan2(p.y, p.x);
  let warpedAngle = angle + 0.22 / max(radius, 0.12) + t;
  let diskRadius = radius + sin(warpedAngle * 4.0 - t * 3.0) * 0.025;
  let disk = 1.0 - smoothstep(0.64, 0.78, abs(diskRadius - 0.48));
  let outerGlow = exp(-abs(radius - 0.56) * 12.0) * 0.32;
  let innerRing = exp(-abs(radius - 0.34) * 28.0) * 0.7;
  let horizon = 1.0 - smoothstep(0.25, 0.29, radius);
  let turbulence = 0.5 + 0.5 * sin(warpedAngle * 7.0 + radius * 28.0 - t * 4.0);
  let violet = vec3f(0.36, 0.16, 0.95);
  let blue = vec3f(0.08, 0.52, 1.0);
  let cyan = vec3f(0.15, 0.88, 1.0);
  let hot = mix(violet, blue, smoothstep(0.0, 0.9, turbulence));
  let ringColor = mix(hot, cyan, smoothstep(0.55, 1.0, turbulence));
  let cell = floor((p + vec2f(2.0, 2.0)) * 44.0);
  let star = step(0.997, hash21(cell)) * (1.0 - smoothstep(1.0, 1.9, radius));
  let stars = vec3f(star * 0.55);
  var color = stars;
  color += ringColor * (disk * (0.45 + turbulence * 0.7) + outerGlow + innerRing) * frame.intensity;
  color *= 1.0 - horizon;
  color += ringColor * exp(-abs(radius - 0.29) * 55.0) * 0.16;
  let vignette = 1.0 - smoothstep(0.72, 1.65, radius);
  color *= vignette;
  color = color / (color + vec3f(1.0));
  return vec4f(color, 1.0);
}
`;

type WebGPUDeviceLike = {
  createShaderModule: (descriptor: Record<string, unknown>) => any;
  createRenderPipeline: (descriptor: Record<string, unknown>) => any;
  createBuffer: (descriptor: Record<string, unknown>) => any;
  createBindGroup: (descriptor: Record<string, unknown>) => any;
  createCommandEncoder: () => any;
  queue: { writeBuffer: (buffer: any, offset: number, data: Float32Array) => void; submit: (commands: any[]) => void };
  destroy: () => void;
};

export const VgpuBlackHole: React.FC<VgpuBlackHoleProps> = ({
  title = 'Event Horizon',
  description = 'Um campo gravitacional luminoso renderizado em tempo real com WebGPU.',
  intensity = 0.85,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gpuStatus, setGpuStatus] = useState<'loading' | 'active' | 'fallback'>('loading');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let frameId = 0;
    let device: WebGPUDeviceLike | null = null;
    let uniformBuffer: any = null;
    let observer: ResizeObserver | null = null;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const gpu = (navigator as Navigator & { gpu?: any }).gpu;

    const render = (pipeline: any, bindGroup: any, context: any, time: number) => {
      if (disposed || !device || !uniformBuffer) return;
      const width = Math.max(1, canvas.width);
      const height = Math.max(1, canvas.height);
      device.queue.writeBuffer(
        uniformBuffer,
        0,
        new Float32Array([width, height, time, Math.min(1.5, Math.max(0, intensity))])
      );
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [{
          view: context.getCurrentTexture().createView(),
          clearValue: { r: 0.015, g: 0.008, b: 0.04, a: 1 },
          loadOp: 'clear',
          storeOp: 'store',
        }],
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);
    };

    const start = async () => {
      if (!gpu || typeof gpu.requestAdapter !== 'function') {
        setGpuStatus('fallback');
        return;
      }

      try {
        const adapter = await gpu.requestAdapter();
        if (!adapter || disposed) {
          setGpuStatus('fallback');
          return;
        }
        device = await adapter.requestDevice();
        if (disposed || !device) {
          device?.destroy();
          return;
        }

        const context = (canvas as any).getContext('webgpu') as any;
        if (!context) {
          device.destroy();
          device = null;
          setGpuStatus('fallback');
          return;
        }

        const format = gpu.getPreferredCanvasFormat();
        const shader = device.createShaderModule({ label: 'GodUI black-hole shader', code: BLACK_HOLE_SHADER });
        const compilation = await shader.getCompilationInfo();
        const shaderErrors = compilation.messages.filter((message: { type: string }) => message.type === 'error');
        if (shaderErrors.length > 0) {
          throw new Error('The WebGPU shader could not be compiled.');
        }
        const pipeline = device.createRenderPipeline({
          label: 'GodUI black-hole pipeline',
          layout: 'auto',
          vertex: { module: shader, entryPoint: 'vertexMain' },
          fragment: { module: shader, entryPoint: 'fragmentMain', targets: [{ format }] },
          primitive: { topology: 'triangle-list' },
        });
        uniformBuffer = device.createBuffer({
          label: 'GodUI black-hole frame uniforms',
          size: 16,
          usage: 0x40 | 0x08,
        });
        const bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const resize = () => {
          if (disposed) return;
          const rect = canvas.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
          canvas.width = Math.max(1, Math.round(rect.width * ratio));
          canvas.height = Math.max(1, Math.round(rect.height * ratio));
          context.configure({ device, format, alphaMode: 'opaque' });
          render(pipeline, bindGroup, context, 0);
        };

        observer = new ResizeObserver(resize);
        observer.observe(canvas);
        resize();
        setGpuStatus('active');

        if (!motionQuery.matches) {
          const startedAt = performance.now();
          const tick = (now: number) => {
            if (disposed) return;
            render(pipeline, bindGroup, context, (now - startedAt) / 1000);
            frameId = requestAnimationFrame(tick);
          };
          frameId = requestAnimationFrame(tick);
        }
      } catch {
        if (!disposed) setGpuStatus('fallback');
        device?.destroy();
        device = null;
      }
    };

    void start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      uniformBuffer?.destroy?.();
      device?.destroy();
    };
  }, [intensity]);

  return (
    <section className="mx-auto my-5 w-full max-w-3xl overflow-hidden rounded-[28px] border border-violet-300/20 bg-[#080612] text-white shadow-2xl shadow-violet-950/30">
      <div className="relative isolate min-h-[280px] overflow-hidden sm:min-h-[340px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 54%, rgba(95,44,220,.5), transparent 32%), radial-gradient(ellipse at 50% 54%, rgba(18,151,255,.18), transparent 55%), #080612',
          }}
        />
        <canvas
          ref={canvasRef}
          aria-label="Visualização procedural de um buraco negro com disco de acreção luminoso"
          role="img"
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080612] via-transparent to-[#080612]/40" />
        <div className="relative z-10 flex min-h-[280px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-black/30 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-violet-100/80">
              <span className={`h-1.5 w-1.5 rounded-full ${gpuStatus === 'active' ? 'bg-cyan-300' : 'bg-violet-300'}`} />
              {gpuStatus === 'active' ? 'WebGPU · Renderização ativa' : gpuStatus === 'loading' ? 'Inicializando GPU' : 'Fallback compatível'}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/45">VGPU / REALTIME</span>
          </div>
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
            {gpuStatus === 'fallback' && (
              <p className="mt-3 text-xs text-white/45">
                WebGPU não pôde ser inicializado neste navegador ou dispositivo. A visualização usa um fundo CSS leve.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
