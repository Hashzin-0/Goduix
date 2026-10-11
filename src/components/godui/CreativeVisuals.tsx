import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type BaseProps = { accent?: string; label?: string };
const frame = 'relative isolate w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b13] text-white shadow-xl';
const control = 'rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300';
const fieldLabel = 'text-[11px] uppercase tracking-[.16em] text-white/50';

function VisualHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="relative z-10 px-4 pt-4 sm:px-5"><p className={fieldLabel}>{eyebrow}</p><h3 className="mt-1 text-base font-semibold tracking-tight">{title}</h3><p className="mt-1 max-w-xl text-xs leading-relaxed text-white/55">{description}</p></div>;
}

export function Mascot2D({ accent = '#67e8f9', label = 'Mascote vetorial interativo' }: BaseProps) {
  const [mood, setMood] = useState<'curioso' | 'feliz' | 'surpreso'>('curioso');
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  return <section className={frame}>
    <VisualHeader eyebrow="2D / VECTOR CHARACTER" title={label} description="Personagem SVG vetorial com olhar reativo e estados expressivos acionados pelo usuário." />
    <div className="relative mx-3 mb-3 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(ellipse_at_50%_20%,rgba(103,232,249,.16),transparent_65%),linear-gradient(145deg,#111a2b,#090c14)]">
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.25) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <svg viewBox="0 0 320 210" className="relative mx-auto block w-full max-w-md" role="img" aria-label={label} onPointerMove={event => { const rect = event.currentTarget.getBoundingClientRect(); setGaze({ x: ((event.clientX - rect.left) / rect.width - .5) * 8, y: ((event.clientY - rect.top) / rect.height - .5) * 6 }); }} onPointerLeave={() => setGaze({ x: 0, y: 0 })}>
        <defs><linearGradient id="mascotBody" x1="0" y1="0" x2="1" y2="1"><stop stopColor={accent}/><stop offset="1" stopColor="#6366f1"/></linearGradient><filter id="mascotShadow"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <ellipse cx="160" cy="181" rx="72" ry="9" fill="#000" opacity=".42" filter="url(#mascotShadow)"/>
        <motion.path d="M99 101 Q75 117 89 142 Q96 151 111 139 M221 101 Q245 117 231 142 Q224 151 209 139" fill="none" stroke={accent} strokeWidth="12" strokeLinecap="round" animate={reducedMotion ? {} : { rotate: [0, -5, 4, 0] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ transformOrigin: '160px 120px' }}/>
        <motion.path d="M110 52 Q160 28 210 52 Q232 77 223 128 Q213 167 160 170 Q107 167 97 128 Q88 77 110 52Z" fill="url(#mascotBody)" stroke="#d9fbff" strokeOpacity=".65" strokeWidth="2" animate={reducedMotion ? {} : { y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}/>
        <path d="M116 60 Q160 42 204 60" fill="none" stroke="#fff" strokeOpacity=".38" strokeWidth="4" strokeLinecap="round"/>
        <g transform={`translate(${gaze.x} ${gaze.y})`}><ellipse cx="139" cy="96" rx="12" ry={mood === 'surpreso' ? 16 : 14} fill="#07101d"/><ellipse cx="181" cy="96" rx="12" ry={mood === 'surpreso' ? 16 : 14} fill="#07101d"/><circle cx="143" cy="92" r="4" fill="white"/><circle cx="185" cy="92" r="4" fill="white"/></g>
        {mood === 'feliz' ? <path d="M139 119 Q160 139 181 119" fill="none" stroke="#07101d" strokeWidth="5" strokeLinecap="round"/> : mood === 'surpreso' ? <ellipse cx="160" cy="123" rx="7" ry="10" fill="#07101d"/> : <path d="M145 124 Q160 132 175 124" fill="none" stroke="#07101d" strokeWidth="4" strokeLinecap="round"/>}
        <circle cx="119" cy="115" r="7" fill="#fb7185" opacity=".7"/><circle cx="201" cy="115" r="7" fill="#fb7185" opacity=".7"/>
      </svg>
      <div className="relative flex flex-wrap justify-center gap-2 px-3 pb-3">
        {(['curioso', 'feliz', 'surpreso'] as const).map(value => <button key={value} type="button" aria-pressed={mood === value} onClick={() => setMood(value)} className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${mood === value ? 'border-cyan-200/60 bg-cyan-300/15 text-cyan-100' : 'border-white/10 text-white/55 hover:text-white'}`}>{value}</button>)}
      </div>
    </div>
  </section>;
}

type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
export function ParticleField2D({ accent = '#67e8f9', label = 'Campo de partículas', count = 56, speed = 1 }: BaseProps & { count?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000 });
  useEffect(() => {
    const canvas = canvasRef.current; const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let width = 0, height = 0, raf = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles: Particle[] = [];
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const target = Math.max(12, Math.min(120, Math.round(count)));
      while (particles.length < target) particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6, radius: 1 + Math.random() * 1.8 });
      particles.length = target;
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]; const dx = p.x - pointer.current.x, dy = p.y - pointer.current.y, distance = Math.hypot(dx, dy);
        if (distance < 90 && distance > 0) { p.vx += dx / distance * .025; p.vy += dy / distance * .025; }
        p.vx += (Math.random() - .5) * .004; p.vy += (Math.random() - .5) * .004;
        const velocity = Math.max(.15, Math.min(1.5, speed)); p.x += p.vx * velocity; p.y += p.vy * velocity;
        p.vx *= .995; p.vy *= .995;
        if (p.x < -5) p.x = width + 5; if (p.x > width + 5) p.x = -5; if (p.y < -5) p.y = height + 5; if (p.y > height + 5) p.y = -5;
        context.beginPath(); context.arc(p.x, p.y, p.radius, 0, Math.PI * 2); context.fillStyle = accent; context.globalAlpha = .55 + .35 * Math.sin(p.x * .025 + p.y * .02); context.fill();
        for (let j = i + 1; j < particles.length; j++) { const q = particles[j]; const d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 86) { context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y); context.strokeStyle = accent; context.globalAlpha = (1 - d / 86) * .22; context.lineWidth = .7; context.stroke(); } }
      }
      context.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
    const leave = () => { pointer.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); };
  }, [accent, count, speed]);
  return <section className={frame}><VisualHeader eyebrow="2D / CANVAS FIELD" title={label} description="Campo de partículas renderizado em canvas, com conexões espaciais e repulsão pelo ponteiro."/><canvas ref={canvasRef} className="mt-3 block h-64 w-full touch-pan-y" aria-label={label}/></section>;
}

export function LiquidBlob2D({ accent = '#a78bfa', label = 'Formas líquidas orgânicas', intensity = .8 }: BaseProps & { intensity?: number }) {
  const reducedMotion = useReducedMotion();
  const amount = Math.max(.2, Math.min(1.5, intensity));
  return <section className={frame}><VisualHeader eyebrow="2D / ORGANIC MOTION" title={label} description="Composição vetorial de formas orgânicas animadas; a intensidade altera a escala e o contraste do movimento."/>
    <div className="relative mx-3 mb-3 mt-3 flex h-64 items-center justify-center overflow-hidden rounded-xl bg-[#10172a]">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)', backgroundSize: '24px 24px' }}/>
      <motion.div className="absolute h-44 w-44 rounded-[38%_62%_64%_36%/41%_43%_57%_59%] blur-[1px]" style={{ background: `radial-gradient(circle at 30% 25%,#fff8,${accent} 24%,#6366f1 75%)`, filter: 'drop-shadow(0 0 35px ' + accent + '66)' }} animate={reducedMotion ? { scale: amount } : { borderRadius: ['38% 62% 64% 36% / 41% 43% 57% 59%', '61% 39% 42% 58% / 56% 61% 39% 44%', '45% 55% 61% 39% / 35% 49% 51% 65%'], rotate: [0, 90, 180], scale: [amount, amount * 1.12, amount] }} transition={{ duration: 9, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}/>
      <motion.div className="absolute h-24 w-24 rounded-[60%_40%_35%_65%]" style={{ background: 'linear-gradient(135deg,#f0abfc,#818cf8)', mixBlendMode: 'screen' }} animate={reducedMotion ? { x: 0, y: 0 } : { x: [-65, 65, -65], y: [32, -35, 32], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}/>
      <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">SVG + spring motion</div>
    </div>
  </section>;
}

export function LayeredIllustration2D({ accent = '#4ade80', label = 'Ilustração vetorial em camadas' }: BaseProps) {
  const [visible, setVisible] = useState([true, true, true]);
  const names = ['Cobertura', 'Solo', 'Raízes'];
  return <section className={frame}><VisualHeader eyebrow="2D / LAYERED SVG" title={label} description="Ilustração de corte com camadas selecionáveis, apropriada para explicar estruturas e processos."/>
    <div className="mx-3 mb-3 mt-3 overflow-hidden rounded-xl bg-gradient-to-b from-sky-950 to-[#111827]">
      <svg viewBox="0 0 360 220" className="block w-full" role="img" aria-label={label}>
        <defs><linearGradient id="cutawaySoil" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a16207"/><stop offset="1" stopColor="#422006"/></linearGradient></defs>
        <circle cx="286" cy="36" r="20" fill="#fde68a" opacity=".9"/><path d="M0 130 Q65 118 110 132 T220 127 T360 125 V220 H0Z" fill="#713f12"/>
        {visible[1] && <path d="M0 146 Q65 133 110 147 T220 142 T360 140 V220 H0Z" fill="url(#cutawaySoil)"/>}
        {visible[2] && <g stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"><path d="M180 124 Q177 158 160 180 T148 213 M180 145 Q200 165 203 193 M173 164 L132 178 M193 175 L230 187 M161 184 L173 205 M203 193 L193 214"/></g>}
        {visible[0] && <g><path d="M180 128 C168 99 146 92 128 79 C155 77 173 91 182 110 C190 82 215 66 240 69 C225 94 202 110 182 132Z" fill={accent}/><path d="M180 127 Q179 87 184 52" stroke="#86efac" strokeWidth="6" strokeLinecap="round"/><path d="M184 83 Q207 46 228 52 Q220 75 184 91" fill="#22c55e"/><path d="M180 96 Q151 60 133 64 Q143 89 180 105" fill="#4ade80"/></g>}
        <path d="M0 130 Q65 118 110 132 T220 127 T360 125" fill="none" stroke="#d9f99d" strokeWidth="2"/>
      </svg>
      <div className="flex flex-wrap gap-2 p-3">{names.map((name, i) => <button key={name} type="button" aria-pressed={visible[i]} onClick={() => setVisible(prev => prev.map((v, n) => n === i ? !v : v))} className={`rounded-full border px-3 py-1.5 text-xs transition ${visible[i] ? 'border-emerald-300/50 bg-emerald-300/10 text-emerald-100' : 'border-white/10 text-white/40'}`}>{visible[i] ? '✓ ' : ''}{name}</button>)}</div>
    </div>
  </section>;
}

type IsoKind = 'city' | 'farm' | 'interior' | 'factory';
function IsometricScene({ kind, accent = '#67e8f9', label }: { kind: IsoKind; accent?: string; label: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const palette = kind === 'farm' ? ['#365314','#4d7c0f','#a16207','#ca8a04'] : kind === 'factory' ? ['#334155','#64748b','#0f766e','#eab308'] : kind === 'interior' ? ['#334155','#475569','#c084fc','#f0abfc'] : ['#1d4ed8','#0f766e','#475569','#f59e0b'];
  const cube = (x: number, y: number, w: number, h: number, depth: number, color: string, key: string) => <g key={key} onClick={() => setSelected(key)} className="cursor-pointer" role="button" tabIndex={0} aria-label={key} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(key); }}>
    <polygon points={`${x},${y} ${x+w},${y-depth} ${x+w*2},${y} ${x+w},${y+depth}`} fill={color} stroke={selected === key ? '#fff' : '#ffffff22'} strokeWidth={selected === key ? 2 : 1}/>
    <polygon points={`${x},${y} ${x+w},${y+depth} ${x+w},${y+depth+h} ${x},${y+h}`} fill={color} opacity=".78" stroke="#ffffff18"/>
    <polygon points={`${x+w},${y+depth} ${x+w*2},${y} ${x+w*2},${y+h} ${x+w},${y+depth+h}`} fill="#020617" opacity=".32" stroke="#ffffff18"/>
    {selected === key && <ellipse cx={x+w} cy={y+depth+h+5} rx={w*.9} ry="5" fill={accent} opacity=".5"/>}
  </g>;
  return <section className={frame}><VisualHeader eyebrow={`ISOMETRIC / ${kind.toUpperCase()}`} title={label} description="Cena isométrica vetorial com objetos selecionáveis, grade opcional e composição responsiva."/>
    <div className="mx-3 mb-3 mt-3 overflow-hidden rounded-xl bg-[#0d1422]">
      <svg viewBox="0 0 360 235" className="block w-full" role="img" aria-label={label}>
        {showGrid && <g stroke="#94a3b8" strokeOpacity=".13" strokeWidth=".7">{Array.from({length:12},(_,i)=><g key={i}><path d={`M${-30+i*35} 105 L180 ${225-i*10}`}/><path d={`M${390-i*35} 105 L180 ${225-i*10}`}/></g>)}</g>}
        <polygon points="180,35 330,115 180,200 30,115" fill="#1e293b" stroke="#94a3b8" strokeOpacity=".25"/>
        {kind === 'city' && <>{cube(66,112,25,42,18,palette[0],'Edifício A')}{cube(130,130,23,65,16,palette[1],'Edifício B')}{cube(203,107,28,49,20,palette[2],'Edifício C')}{cube(247,140,20,31,14,palette[3],'Quiosque')}{[0,1,2,3].map(i=><g key={i} transform={`translate(${92+i*48} ${150+i%2*9})`}><path d="M0 0 V-14" stroke="#854d0e" strokeWidth="3"/><circle cy="-19" r="10" fill="#22c55e"/><circle cx="-5" cy="-23" r="6" fill="#4ade80"/></g>)}</>}
        {kind === 'farm' && <>{cube(60,114,28,12,16,'#a3e635','Talhão 1')}{cube(116,139,28,12,16,'#84cc16','Talhão 2')}{cube(178,111,27,12,16,'#65a30d','Talhão 3')}{cube(230,135,25,12,15,'#4d7c0f','Talhão 4')}{cube(127,103,22,32,15,palette[2],'Galpão')}{cube(202,151,12,22,9,'#0e7490','Silo')}{[0,1,2,3,4].map(i=><path key={i} d={`M${64+i*5} 103 l20 -11 M${64+i*5} 108 l20 -11`} stroke="#bef264" strokeWidth="2" opacity=".7"/>)}</>}
        {kind === 'interior' && <>{cube(65,130,42,16,30,'#64748b','Piso')}{cube(103,106,22,30,16,palette[2],'Armário')}{cube(163,131,42,12,25,'#7c3aed','Mesa')}{cube(210,107,20,23,15,'#c084fc','Monitor')}{cube(230,147,17,20,12,'#be185d','Poltrona')}{cube(83,92,10,18,8,'#f0abfc','Luminária')}</>}
        {kind === 'factory' && <>{cube(61,129,44,48,28,'#475569','Máquina A')}{cube(129,113,40,56,26,'#334155','Máquina B')}{cube(196,134,43,35,28,'#64748b','Máquina C')}{cube(244,108,18,56,13,'#0f766e','Chaminé')}{cube(91,163,62,7,15,'#eab308','Esteira')}{cube(162,160,55,7,15,'#eab308','Esteira 2')}</>}
        <text x="18" y="220" fill="#94a3b8" fontSize="9" letterSpacing="1.4">{selected ? `SELECIONADO: ${selected.toUpperCase()}` : 'SELECIONE UM OBJETO'}</text>
      </svg>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-2"><span className="text-[10px] text-white/45">{selected || 'Nenhum objeto selecionado'}</span><button type="button" onClick={() => setShowGrid(v => !v)} aria-pressed={showGrid} className={control}>{showGrid ? 'Ocultar grade' : 'Mostrar grade'}</button></div>
    </div>
  </section>;
}
export function IsometricCity({ accent = '#67e8f9', label = 'Cidade isométrica' }: BaseProps) { return <IsometricScene kind="city" accent={accent} label={label}/>; }
export function IsometricFarm({ accent = '#4ade80', label = 'Fazenda isométrica' }: BaseProps) { return <IsometricScene kind="farm" accent={accent} label={label}/>; }
export function IsometricInterior({ accent = '#c084fc', label = 'Interior isométrico' }: BaseProps) { return <IsometricScene kind="interior" accent={accent} label={label}/>; }
export function IsometricFactory({ accent = '#fbbf24', label = 'Fábrica isométrica' }: BaseProps) { return <IsometricScene kind="factory" accent={accent} label={label}/>; }

type ShaderKind = 'liquid' | 'glitch' | 'aurora';
function ShaderCanvas({ kind, accent = '#67e8f9', label, speed = 1, intensity = .8 }: { kind: ShaderKind; accent?: string; label: string; speed?: number; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!canvas || !gl) return;
    const vertexSource = 'attribute vec2 a_position; varying vec2 v_uv; void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}';
    const fragmentSource = `precision mediump float; varying vec2 v_uv; uniform vec2 u_resolution; uniform float u_time; uniform float u_intensity; uniform vec3 u_accent; uniform int u_kind;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      void main(){vec2 uv=v_uv; vec2 p=(uv-.5)*vec2(u_resolution.x/u_resolution.y,1.); float t=u_time;
      if(u_kind==0){float wave=sin(p.x*5.0+t)*cos(p.y*4.0-t*.8); float r=length(p+vec2(sin(t*.35),cos(t*.28))*.12); float rim=smoothstep(.52,.48,abs(r-.28-wave*.035)); float glow=exp(-abs(r-.31-wave*.035)*24.0); vec3 base=mix(vec3(.025,.04,.09),u_accent,.24+glow*.65); base+=vec3(.32,.38,.55)*rim*.35; base+=vec3(.1,.18,.28)*exp(-r*3.); gl_FragColor=vec4(base, .98);}
      else if(u_kind==1){float band=step(.78,hash(vec2(floor(uv.y*34.0),floor(t*5.0)))); float shift=sin(uv.y*80.0+t*3.0)*.006*u_intensity*band; float scan=.88+.12*sin(uv.y*u_resolution.y*1.4); vec3 col=vec3(uv.x+shift,uv.y, .35+hash(floor(uv*vec2(25.,12.)))*.4); col=mix(col,u_accent, .25+band*.65); col*=scan; gl_FragColor=vec4(col, .92);}
      else {float a=sin(p.x*3.5+t*.45)+cos(p.x*2.2-t*.3); float curtain=exp(-pow(p.y-(.06+a*.13),2.)*18.); float curtain2=exp(-pow(p.y-(-.12+sin(p.x*2.8-t*.25)*.12),2.)*25.); vec3 col=vec3(.015,.025,.08)+u_accent*(curtain*.65+curtain2*.4)*u_intensity; col+=vec3(.2,.15,.7)*curtain2*.35; gl_FragColor=vec4(col,1.);}
      }`;
    const compile = (type: number, source: string) => { const shader = gl.createShader(type); if (!shader) return null; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; } return shader; };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource), fragment = compile(gl.FRAGMENT_SHADER, fragmentSource); if (!vertex || !fragment) return;
    const program = gl.createProgram(); if (!program) return; gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return; gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const timeLoc = gl.getUniformLocation(program, 'u_time'), resolutionLoc = gl.getUniformLocation(program, 'u_resolution'), intensityLoc = gl.getUniformLocation(program, 'u_intensity'), accentLoc = gl.getUniformLocation(program, 'u_accent'), kindLoc = gl.getUniformLocation(program, 'u_kind');
    const raw = accent.replace('#', ''); const expanded = raw.length === 3 ? raw.split('').map((part) => part + part).join('') : raw; const parsed = Number.parseInt(expanded, 16); const safe = Number.isFinite(parsed) ? parsed : 0x67e8f9; gl.uniform3f(accentLoc, ((safe >> 16) & 255) / 255, ((safe >> 8) & 255) / 255, (safe & 255) / 255); gl.uniform1i(kindLoc, kind === 'liquid' ? 0 : kind === 'glitch' ? 1 : 2); gl.uniform1f(intensityLoc, Math.max(.1, Math.min(1.5, intensity)));
    let raf = 0, start = performance.now();
    const resize = () => { const rect = canvas.getBoundingClientRect(), ratio = Math.min(window.devicePixelRatio || 1, 1.5); canvas.width = Math.max(1, Math.round(rect.width * ratio)); canvas.height = Math.max(1, Math.round(rect.height * ratio)); gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(resolutionLoc,canvas.width,canvas.height); };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (now: number) => { gl.uniform1f(timeLoc, reduced ? 0 : (now-start)/1000*speed); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); if (!reduced) raf=requestAnimationFrame(draw); };
    draw(start);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); };
  }, [kind, accent, speed, intensity]);
  return <section className={frame}><VisualHeader eyebrow="REALTIME / WEBGL SHADER" title={label} description="Fragment shader executado em WebGL com controles de intensidade e movimento; não é uma imagem pré-renderizada."/><canvas ref={canvasRef} className="mt-3 block h-64 w-full" role="img" aria-label={label}/></section>;
}
export function LiquidGlassShader({ accent = '#67e8f9', label = 'Refração líquida WebGL', intensity = .8, speed = 1 }: BaseProps & { intensity?: number; speed?: number }) { return <ShaderCanvas kind="liquid" accent={accent} label={label} intensity={intensity} speed={speed}/>; }
export function GlitchShader({ accent = '#f472b6', label = 'Distorção digital glitch', intensity = .8, speed = 1 }: BaseProps & { intensity?: number; speed?: number }) { return <ShaderCanvas kind="glitch" accent={accent} label={label} intensity={intensity} speed={speed}/>; }
export function AuroraShader({ accent = '#34d399', label = 'Aurora procedural', intensity = .8, speed = 1 }: BaseProps & { intensity?: number; speed?: number }) { return <ShaderCanvas kind="aurora" accent={accent} label={label} intensity={intensity} speed={speed}/>; }

export function NetworkVisualization({ accent = '#67e8f9', label = 'Rede interativa de nós', count = 42 }: BaseProps & { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas?.getContext('2d'); if (!canvas || !ctx) return;
    let width=1,height=1,raf=0; const points: {x:number;y:number;vx:number;vy:number}[]=[];
    const resize=()=>{const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(width*ratio));canvas.height=Math.max(1,Math.round(height*ratio));ctx.setTransform(ratio,0,0,ratio,0,0);const target=Math.max(10,Math.min(90,Math.round(count)));while(points.length<target)points.push({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});points.length=target;};
    const observer=new ResizeObserver(resize);observer.observe(canvas);resize();const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw=()=>{ctx.clearRect(0,0,width,height);points.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>width)p.vx*=-1;if(p.y<0||p.y>height)p.vy*=-1;for(let j=i+1;j<points.length;j++){const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<105){ctx.strokeStyle=accent;ctx.globalAlpha=(1-d/105)*.45;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}ctx.globalAlpha=1;ctx.fillStyle=accent;ctx.beginPath();ctx.arc(p.x,p.y,2.3,0,Math.PI*2);ctx.fill();});if(!reduced)raf=requestAnimationFrame(draw);};draw();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();};
  },[accent,count]);
  return <section className={frame}><VisualHeader eyebrow="NETWORK / CANVAS" title={label} description="Grafo visual procedural com nós e arestas calculados em tempo real; mova o ponteiro sobre a área para explorar a rede."/><canvas ref={canvasRef} className="mt-3 block h-64 w-full" aria-label={label}/></section>;
}


export function IsometricSceneComposer({ accent = '#67e8f9', label = 'Compositor isométrico' }: BaseProps) {
  type SceneObject = { id: number; kind: 'building' | 'tree' | 'road' | 'house'; x: number; y: number };
  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [tool, setTool] = useState<SceneObject['kind']>('building');
  const [selected, setSelected] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);
  const [grid, setGrid] = useState(true);
  const place = (event: React.PointerEvent<SVGSVGElement>) => {
    if ((event.target as Element).closest('[data-scene-object]')) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(28, Math.min(332, (event.clientX - rect.left) / rect.width * 360));
    const y = Math.max(48, Math.min(190, (event.clientY - rect.top) / rect.height * 235));
    setObjects(current => [...current, { id: nextId, kind: tool, x, y }]);
    setSelected(nextId);
    setNextId(value => value + 1);
  };
  const dragStart = (event: React.PointerEvent<SVGGElement>, id: number) => {
    event.stopPropagation();
    setSelected(id);
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const move = (moveEvent: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = Math.max(24, Math.min(336, (moveEvent.clientX - rect.left) / rect.width * 360));
      const y = Math.max(42, Math.min(196, (moveEvent.clientY - rect.top) / rect.height * 235));
      setObjects(current => current.map(item => item.id === id ? { ...item, x, y } : item));
    };
    const finish = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', finish); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish, { once: true });
  };
  const removeSelected = () => { setObjects(current => current.filter(item => item.id !== selected)); setSelected(null); };
  return <section className={frame}>
    <VisualHeader eyebrow="ISOMETRIC / SCENE EDITOR" title={label} description="Monte sua própria cena: selecione uma peça, clique no terreno para inserir e arraste objetos para reposicioná-los."/>
    <div className="mx-3 mb-3 mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#0b1220]">
      <svg viewBox="0 0 360 235" className="block w-full touch-none" role="application" aria-label={label} onPointerDown={place}>
        {grid && <g stroke="#94a3b8" strokeOpacity=".17" strokeWidth=".65">{Array.from({length:14},(_,i)=><g key={i}><path d={`M${-35+i*33} 35 L180 220`}/><path d={`M${395-i*33} 35 L180 220`}/></g>)}</g>}
        <polygon points="180,28 340,113 180,205 20,113" fill="#1e293b" stroke="#94a3b8" strokeOpacity=".35"/>
        <polygon points="180,46 311,114 180,187 49,114" fill="#0f766e" opacity=".14"/>
        {objects.map(item => <g key={item.id} data-scene-object="true" onPointerDown={event => dragStart(event,item.id)} className="cursor-grab active:cursor-grabbing" role="button" tabIndex={0} aria-label={`${item.kind} ${item.id}`} onKeyDown={event=>{if(event.key==='Delete'||event.key==='Backspace'){setObjects(current=>current.filter(o=>o.id!==item.id));setSelected(null);}}}>
          <ellipse cx={item.x} cy={item.y+17} rx={item.kind==='road'?22:14} ry="6" fill={accent} opacity={selected === item.id ? 0.35 : 0.12}/>
          {item.kind==='tree' ? <><path d={`M${item.x} ${item.y+5} V${item.y+22}`} stroke="#a16207" strokeWidth="5"/><path d={`M${item.x-14} ${item.y+4} L${item.x} ${item.y-25} L${item.x+14} ${item.y+4}Z`} fill="#22c55e" stroke={selected===item.id?'#fff':'#86efac'} strokeWidth={selected===item.id?2:1}/></> : item.kind==='road' ? <polygon points={`${item.x-25},${item.y} ${item.x},${item.y-13} ${item.x+25},${item.y} ${item.x},${item.y+13}`} fill="#475569" stroke={selected===item.id?'#fff':'#94a3b8'} strokeWidth={selected===item.id?2:1}/> : <><polygon points={`${item.x-16},${item.y-10} ${item.x},${item.y-20} ${item.x+16},${item.y-10} ${item.x},${item.y}`} fill={item.kind==='house'?'#f59e0b':accent} stroke={selected===item.id?'#fff':'#ffffff44'} strokeWidth={selected===item.id?2:1}/><polygon points={`${item.x-16},${item.y-10} ${item.x},${item.y} ${item.x},${item.y+18} ${item.x-16},${item.y+8}`} fill="#334155" stroke="#ffffff25"/><polygon points={`${item.x},${item.y} ${item.x+16},${item.y-10} ${item.x+16},${item.y+8} ${item.x},${item.y+18}`} fill="#64748b" stroke="#ffffff25"/>{item.kind==='house'&&<path d={`M${item.x-3} ${item.y+12} V${item.y+3} H${item.x+4} V${item.y+14}`} fill="#111827"/>}</>}
        </g>)}
        {objects.length===0 && <text x="180" y="118" fill="#94a3b8" fontSize="10" textAnchor="middle">Clique no terreno para adicionar a primeira peça</text>}
      </svg>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 p-3">
        {([{id:'building',label:'Edifício'},{id:'house',label:'Casa'},{id:'tree',label:'Árvore'},{id:'road',label:'Piso'}] as const).map(item=><button key={item.id} type="button" aria-pressed={tool===item.id} onClick={()=>setTool(item.id)} className={`rounded-full border px-3 py-1.5 text-xs ${tool===item.id?'border-cyan-200/60 bg-cyan-300/15 text-cyan-100':'border-white/10 text-white/60'}`}>{item.label}</button>)}
        <button type="button" onClick={()=>setGrid(v=>!v)} className={control}>{grid?'Ocultar grade':'Mostrar grade'}</button>
        <button type="button" disabled={selected===null} onClick={removeSelected} className={control+' disabled:opacity-30'}>Excluir selecionado</button>
        <button type="button" onClick={()=>{setObjects([]);setSelected(null);}} disabled={objects.length===0} className={control+' disabled:opacity-30'}>Limpar cena</button>
      </div>
      <p className="px-3 pb-3 text-[10px] text-white/40">{objects.length} objeto(s) na cena · {selected===null?'nenhum selecionado':`objeto #${selected} selecionado`}</p>
    </div>
  </section>;
}


type SpriteAsset = { id: number; src: string; name: string; x: number; y: number; scale: number; rotation: number; width: number; height: number };
export function SpriteStage2D({ accent = '#67e8f9', label = 'Compositor de sprites 2D' }: BaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<Set<string>>(new Set());
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const dragRef = useRef<{ id: number; dx: number; dy: number } | null>(null);
  const [sprites, setSprites] = useState<SpriteAsset[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);
  const [revision, setRevision] = useState(0);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const canvas = canvasRef.current; const ctx = canvas?.getContext('2d'); if (!canvas || !ctx) return;
    const draw = () => {
      const rect = canvas.getBoundingClientRect(); const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio)); canvas.height = Math.max(1, Math.round(rect.width * 9 / 16 * ratio));
      ctx.setTransform(canvas.width / 640, 0, 0, canvas.height / 360, 0, 0);
      ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,640,360);
      ctx.strokeStyle = 'rgba(148,163,184,.1)'; ctx.lineWidth = .7;
      for(let x=0;x<=640;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,360);ctx.stroke();}
      for(let y=0;y<=360;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(640,y);ctx.stroke();}
      sprites.forEach(sprite => {
        let img = imagesRef.current.get(sprite.src);
        if(!img){img=new Image();imagesRef.current.set(sprite.src,img);img.onload=()=>{setSprites(current=>current.map(item=>item.src===sprite.src?{...item,width:img!.naturalWidth,height:img!.naturalHeight}:item));setRevision(v=>v+1);};img.onerror=()=>setMessage(`Não foi possível ler ${sprite.name}`);img.src=sprite.src;}
        if(!img.complete || !img.naturalWidth) return;
        const fit = Math.min(150 / Math.max(img.naturalWidth,img.naturalHeight),1);
        const w=img.naturalWidth*fit*sprite.scale,h=img.naturalHeight*fit*sprite.scale;
        ctx.save();ctx.translate(sprite.x,sprite.y);ctx.rotate(sprite.rotation*Math.PI/180);
        if(selected===sprite.id){ctx.strokeStyle=accent;ctx.lineWidth=1.5;ctx.setLineDash([5,4]);ctx.strokeRect(-w/2-6,-h/2-6,w+12,h+12);ctx.setLineDash([]);}
        ctx.shadowColor=selected===sprite.id?accent:'transparent';ctx.shadowBlur=selected===sprite.id?14:0;
        ctx.drawImage(img,-w/2,-h/2,w,h);ctx.restore();
      });
      if(sprites.length===0){ctx.fillStyle='rgba(226,232,240,.7)';ctx.font='500 14px system-ui';ctx.textAlign='center';ctx.fillText('Adicione seus próprios arquivos de imagem para começar',320,174);ctx.fillStyle='rgba(148,163,184,.55)';ctx.font='11px system-ui';ctx.fillText('PNG · JPG · WEBP · SVG',320,196);}
    };
    draw();
    const observer = new ResizeObserver(draw); observer.observe(canvas);
    return () => observer.disconnect();
  }, [sprites, selected, accent, revision]);
  useEffect(() => () => { urlsRef.current.forEach(url=>URL.revokeObjectURL(url)); }, []);
  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from<File>(event.currentTarget.files ?? []).filter(file=>file.type.startsWith('image/'));
    if(files.length===0){setMessage('Selecione arquivos de imagem compatíveis.');return;}
    const additions=files.map((file,index)=>{const src=URL.createObjectURL(file);urlsRef.current.add(src);return {id:nextId+index,src,name:file.name,x:320+(index%3-1)*72,y:180+Math.floor(index/3)*52,scale:1,rotation:0,width:100,height:100} as SpriteAsset;});
    setSprites(current=>[...current,...additions]);setNextId(value=>value+additions.length);setSelected(additions[0]?.id??null);setMessage('');
    event.target.value='';
  };
  const pointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect=event.currentTarget.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width*640,y=(event.clientY-rect.top)/rect.height*360;
    const hit=[...sprites].reverse().find(sprite=>{const img=imagesRef.current.get(sprite.src);const w=(img?.naturalWidth||sprite.width)*Math.min(150/Math.max(img?.naturalWidth||sprite.width,img?.naturalHeight||sprite.height),1)*sprite.scale;const h=(img?.naturalHeight||sprite.height)*Math.min(150/Math.max(img?.naturalWidth||sprite.width,img?.naturalHeight||sprite.height),1)*sprite.scale;return x>=sprite.x-w/2-8&&x<=sprite.x+w/2+8&&y>=sprite.y-h/2-8&&y<=sprite.y+h/2+8;});
    if(!hit){setSelected(null);dragRef.current=null;return;}
    setSelected(hit.id);dragRef.current={id:hit.id,dx:x-hit.x,dy:y-hit.y};event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {if(!dragRef.current)return;const rect=event.currentTarget.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width*640,y=(event.clientY-rect.top)/rect.height*360;const drag=dragRef.current;setSprites(current=>current.map(sprite=>sprite.id===drag.id?{...sprite,x:Math.max(0,Math.min(640,x-drag.dx)),y:Math.max(0,Math.min(360,y-drag.dy))}:sprite));};
  const selectedSprite=sprites.find(sprite=>sprite.id===selected);
  const updateSelected=(patch:Partial<Pick<SpriteAsset,'scale'|'rotation'>>) => setSprites(current=>current.map(sprite=>sprite.id===selected?{...sprite,...patch}:sprite));
  const removeSelected=()=>{const item=sprites.find(sprite=>sprite.id===selected);if(item){URL.revokeObjectURL(item.src);urlsRef.current.delete(item.src);imagesRef.current.delete(item.src);}setSprites(current=>current.filter(sprite=>sprite.id!==selected));setSelected(null);};
  const exportPng=()=>{const canvas=canvasRef.current;if(!canvas)return;canvas.toBlob(blob=>{if(!blob){setMessage('Não foi possível exportar a composição.');return;}const url=URL.createObjectURL(blob),anchor=document.createElement('a');anchor.href=url;anchor.download='goduix-sprite-stage.png';anchor.click();URL.revokeObjectURL(url);},'image/png');};
  return <section className={frame}><VisualHeader eyebrow="2D / LOCAL ASSET STAGE" title={label} description="Importe arquivos de imagem reais, arraste-os, ajuste escala e rotação e exporte a composição como PNG. A cena começa vazia."/>
    <div className="mx-3 mb-3 mt-3 overflow-hidden rounded-xl border border-white/10">
      <canvas ref={canvasRef} className="block aspect-video w-full touch-none cursor-crosshair" aria-label={label} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>{dragRef.current=null;}} onPointerCancel={()=>{dragRef.current=null;}}/>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-black/15 p-3">
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={upload} aria-label="Adicionar arquivos de imagem"/>
        <button type="button" onClick={()=>inputRef.current?.click()} className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium hover:bg-white/15">Adicionar imagens</button>
        <button type="button" onClick={exportPng} disabled={sprites.length===0} className="rounded-xl border border-white/15 px-3 py-2 text-xs disabled:opacity-30">Exportar PNG</button>
        <button type="button" onClick={removeSelected} disabled={selected===null} className="rounded-xl border border-white/15 px-3 py-2 text-xs disabled:opacity-30">Remover selecionado</button>
        <span className="ml-auto text-[10px] text-white/45">{sprites.length} imagem(ns)</span>
      </div>
      {selectedSprite && <div className="grid grid-cols-1 gap-3 border-t border-white/10 p-3 sm:grid-cols-2">
        <label className="text-xs text-white/60">Escala <span className="text-white">{selectedSprite.scale.toFixed(2)}×</span><input aria-label="Escala da imagem selecionada" type="range" min=".25" max="2.5" step=".05" value={selectedSprite.scale} onChange={event=>updateSelected({scale:Number(event.target.value)})} className="mt-2 block w-full accent-cyan-300"/></label>
        <label className="text-xs text-white/60">Rotação <span className="text-white">{selectedSprite.rotation}°</span><input aria-label="Rotação da imagem selecionada" type="range" min="-180" max="180" step="5" value={selectedSprite.rotation} onChange={event=>updateSelected({rotation:Number(event.target.value)})} className="mt-2 block w-full accent-cyan-300"/></label>
      </div>}
      {message && <p className="px-3 pb-3 text-xs text-amber-200" role="status">{message}</p>}
    </div>
  </section>;
}
