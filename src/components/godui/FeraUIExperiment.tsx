import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight,
  CirclePlay, Copy, Moon, Music2, RotateCcw, Star, Sun, Trash2, Trophy,
} from 'lucide-react';

export type FeraUIExperimentType =
  | 'feraui-pull-cord' | 'feraui-claw-captcha' | 'feraui-gradient-builder'
  | 'feraui-screenery' | 'feraui-deskfolio' | 'feraui-blob'
  | 'feraui-animaps' | 'feraui-fur' | 'feraui-vacuum'
  | 'feraui-crumple' | 'feraui-hologram' | 'feraui-matchday';

interface Props {
  experiment: FeraUIExperimentType | string;
  title?: string;
  accent?: string;
}

const panel = 'w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100';
const button = 'inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10';
const primary = 'inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200';

function PullCord() {
  const [on, setOn] = useState(false);
  const [pull, setPull] = useState(false);
  return <section className={panel + ' p-5'} aria-label="Interruptor de cordão">
    <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">PullCord</p><h3 className="mt-1 text-lg font-semibold">Puxe para alternar a luz</h3><p className="mt-1 text-sm text-zinc-500">Uma interação tátil para mudar o estado da cena.</p></div><span className={'rounded-full px-3 py-1 text-xs font-medium ' + (on ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600')}>{on ? 'Luz acesa' : 'Luz apagada'}</span></div>
    <button type="button" aria-label={on ? 'Apagar luz puxando o cordão' : 'Acender luz puxando o cordão'} onPointerDown={() => setPull(true)} onPointerUp={() => { if (pull) setOn(v => !v); setPull(false); }} onPointerLeave={() => setPull(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOn(v => !v); } }} className={'mt-4 flex h-48 w-full flex-col items-center justify-start rounded-xl border transition-colors ' + (on ? 'border-amber-200 bg-amber-50' : 'border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900')}>
      <div className={'h-8 w-10 rounded-b-full transition-colors ' + (on ? 'bg-amber-300' : 'bg-zinc-400')} />
      <svg viewBox="0 0 120 115" className="h-28 w-28 overflow-visible" aria-hidden="true"><path d={pull ? 'M60 0 Q58 34 73 58 T60 91' : 'M60 0 Q65 32 60 61 T60 83'} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><rect x="49" y={pull ? 86 : 78} width="22" height="28" rx="8" fill={on ? '#d97706' : '#71717a'} /></svg>
      <span className="sr-only">Puxe ou pressione Enter para alternar a luz</span>
    </button>
  </section>;
}

function ClawCaptcha() {
  const [target, setTarget] = useState(2);
  const [claw, setClaw] = useState(1);
  const [won, setWon] = useState(false);
  const toys = ['🐸', '🐙', '🦊', '🐻', '🐼'];
  return <section className={panel + ' p-5'}>
    <div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">ClawCaptcha</p><h3 className="mt-1 text-lg font-semibold">Máquina de brinquedos</h3><p className="mt-1 text-sm text-zinc-500">Mini jogo demonstrativo, não é um mecanismo de segurança.</p></div><Trophy className="h-5 w-5 text-amber-500" /></div>
    <div className="relative mt-4 overflow-hidden rounded-xl border border-sky-100 bg-gradient-to-b from-sky-50 to-indigo-100 p-3 dark:border-white/10 dark:from-slate-900 dark:to-indigo-950">
      <div className="absolute left-1/2 top-2 h-5 w-1 -translate-x-1/2 bg-zinc-400" style={{ transform: 'translateX(' + ((claw - 2) * 48) + 'px)' }} />
      <div className="grid h-28 grid-cols-5 items-end gap-1 border-b-4 border-zinc-300 pb-2">{toys.map((toy, i) => <button type="button" key={toy} aria-label={'Selecionar brinquedo ' + toy} onClick={() => { setClaw(i); setWon(false); }} className={'rounded-lg p-1 text-2xl transition ' + (claw === i ? 'bg-white shadow ring-2 ring-sky-400' : 'hover:bg-white/60')}>{toy}</button>)}</div>
      <div className="mt-3 flex justify-center gap-2"><button type="button" className={button} onClick={() => setClaw(v => Math.max(0, v - 1))} aria-label="Mover garra para a esquerda"><ChevronLeft size={16}/></button><button type="button" className={primary} onClick={() => { setWon(claw === target); if (claw === target) setTarget((target + 2) % toys.length); }}><Trophy size={15}/> Baixar a garra</button><button type="button" className={button} onClick={() => setClaw(v => Math.min(toys.length - 1, v + 1))} aria-label="Mover garra para a direita"><ChevronRight size={16}/></button></div>
    </div>
    <p role="status" className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{won ? 'Você pegou o brinquedo. Desafio concluído!' : 'Encontre o brinquedo-alvo: ' + toys[target] + ' e mova a garra até ele.'}</p>
  </section>;
}

function GradientBuilder() {
  const [colors, setColors] = useState(['#f7b267', '#f79d65', '#5b8e7d']);
  const [kind, setKind] = useState('radial');
  const css = kind === 'linear' ? 'linear-gradient(125deg, ' + colors.join(', ') + ')' : 'radial-gradient(ellipse at 25% 20%, ' + colors[0] + ' 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, ' + colors[1] + ' 0%, transparent 50%), ' + colors[2];
  const copy = async () => { try { await navigator.clipboard.writeText('background: ' + css + ';'); } catch { /* Clipboard permissions vary by browser. */ } };
  return <section className={panel + ' p-5'}>
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Gradient Builder</p><h3 className="mt-1 text-lg font-semibold">Estúdio de gradientes</h3>
    <div className="mt-4 h-40 rounded-xl border border-black/5" style={{ background: css }} role="img" aria-label="Prévia do gradiente personalizado"/>
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">{colors.map((color, i) => <label key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">Cor {i + 1}<input aria-label={'Cor ' + (i + 1)} type="color" value={color} onChange={e => setColors(prev => prev.map((c, n) => n === i ? e.target.value : c))} className="h-9 w-full cursor-pointer rounded-lg border border-zinc-200 bg-transparent p-1"/></label>)}</div>
    <div className="mt-3 flex flex-wrap items-center gap-2"><select aria-label="Tipo de gradiente" value={kind} onChange={e => setKind(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"><option value="radial">Radial em camadas</option><option value="linear">Linear</option></select><button type="button" className={primary} onClick={copy}><Copy size={15}/> Copiar CSS</button></div>
    <p className="mt-2 break-all font-mono text-xs text-zinc-500">{css}</p>
  </section>;
}

function Screenery() {
  const [screen, setScreen] = useState(0);
  const screens = [{ title: 'Bem-vindo de volta', subtitle: 'Seu espaço, do seu jeito.', cta: 'Continuar', bg: 'from-sky-100 to-indigo-100' }, { title: 'Tudo em um só lugar', subtitle: 'Organize ideias e projetos.', cta: 'Explorar projetos', bg: 'from-amber-100 to-rose-100' }, { title: 'Pronto para começar?', subtitle: 'Um pequeno passo de cada vez.', cta: 'Criar projeto', bg: 'from-emerald-100 to-teal-100' }];
  const s = screens[screen];
  return <section className={panel + ' p-5'}><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Screenery</p><h3 className="mt-1 text-lg font-semibold">Galeria de telas animadas</h3></div><span className="text-xs text-zinc-500">{screen + 1} / {screens.length}</span></div>
    <AnimatePresence mode="wait"><motion.div key={screen} initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }} className={'mt-4 flex min-h-56 flex-col justify-between rounded-xl bg-gradient-to-br p-6 text-zinc-900 ' + s.bg}><div><span className="text-xs font-semibold uppercase tracking-widest">Seu próximo capítulo</span><h4 className="mt-8 max-w-xs text-2xl font-bold">{s.title}</h4><p className="mt-2 text-sm">{s.subtitle}</p></div><button type="button" className="mt-6 w-fit rounded-full bg-zinc-900 px-4 py-2 text-sm text-white">{s.cta} <ArrowRight size={14} className="ml-1 inline"/></button></motion.div></AnimatePresence>
    <div className="mt-3 flex justify-between"><button type="button" className={button} onClick={() => setScreen(v => (v + screens.length - 1) % screens.length)}><ChevronLeft size={15}/> Anterior</button><button type="button" className={button} onClick={() => setScreen(v => (v + 1) % screens.length)}>Próxima <ChevronRight size={15}/></button></div>
  </section>;
}

function DeskFolio() {
  const [page, setPage] = useState(0);
  const pages = [{ heading: 'Olá, eu sou Alex.', body: 'Designer e desenvolvedor de experiências digitais.', mark: 'AF' }, { heading: 'O que faço', body: 'Interfaces, protótipos e sistemas de design com foco no uso real.', mark: '01' }, { heading: 'Projetos', body: 'Produtos digitais que equilibram clareza, personalidade e desempenho.', mark: '02' }, { heading: 'Vamos conversar', body: 'Transforme uma ideia em uma experiência útil.', mark: '✳' }];
  const p = pages[page];
  return <section className={panel + ' p-5'}><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">DeskFolio</p><h3 className="mt-1 text-lg font-semibold">Portfólio em formato de livro</h3>
    <div className="mt-4 flex min-h-56 items-stretch justify-center perspective-[900px]"><motion.div key={page} initial={{ rotateY: -22, opacity: .5, x: 16 }} animate={{ rotateY: 0, opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} className="flex w-full max-w-sm flex-col justify-between rounded-r-2xl border-y border-r border-amber-900/20 bg-[#f5eddf] p-6 text-zinc-800 shadow-[inset_8px_0_12px_-12px_#000]"><div className="flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500"><span>Alex Ferreira</span><span>{p.mark}</span></div><div><h4 className="text-2xl font-semibold">{p.heading}</h4><p className="mt-3 text-sm leading-relaxed text-zinc-600">{p.body}</p></div><div className="text-xs text-zinc-400">PÁGINA {page + 1}</div></motion.div></div>
    <div className="mt-3 flex justify-between"><button className={button} type="button" onClick={() => setPage(v => Math.max(0, v - 1))} disabled={page === 0}><ArrowLeft size={15}/> Voltar</button><button className={button} type="button" onClick={() => setPage(v => Math.min(pages.length - 1, v + 1))} disabled={page === pages.length - 1}>Virar página <ArrowRight size={15}/></button></div>
  </section>;
}

function Blob() {
  const [mood, setMood] = useState<'curious' | 'happy' | 'sleepy'>('curious');
  return <section className={panel + ' p-5'}><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Blob</p><h3 className="mt-1 text-lg font-semibold">Mascote elástico</h3><p className="mt-1 text-sm text-zinc-500">Clique no personagem para mudar seu humor.</p>
    <button type="button" onClick={() => setMood(v => v === 'curious' ? 'happy' : v === 'happy' ? 'sleepy' : 'curious')} aria-label="Mudar expressão do mascote" className="mt-4 flex h-48 w-full items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/40"><motion.div animate={{ scaleX: mood === 'happy' ? 1.16 : mood === 'sleepy' ? .92 : 1, scaleY: mood === 'happy' ? .88 : mood === 'sleepy' ? 1.12 : 1, rotate: mood === 'happy' ? -7 : mood === 'sleepy' ? 6 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 12 }} className="relative flex h-28 w-36 items-center justify-center rounded-[48%_52%_44%_56%/56%_45%_55%_44%] bg-gradient-to-br from-cyan-300 to-blue-500 shadow-[inset_-10px_-12px_20px_#1d4ed866,0_16px_28px_#0284c733]"><span className="absolute left-10 top-10 h-3 w-2 rounded-full bg-zinc-900"/><span className="absolute right-10 top-10 h-3 w-2 rounded-full bg-zinc-900"/><span className="absolute top-[4.3rem] text-sm font-bold text-zinc-900">{mood === 'happy' ? '⌣' : mood === 'sleepy' ? '﹏' : 'ᴗ'}</span></motion.div></button>
    <p role="status" className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-300">{mood === 'happy' ? 'O mascote está feliz.' : mood === 'sleepy' ? 'O mascote está com sono.' : 'O mascote está curioso.'}</p>
  </section>;
}

function AniMaps() {
  const [playing, setPlaying] = useState(true);
  return <section className={panel + ' p-5'}><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">AniMaps</p><h3 className="mt-1 text-lg font-semibold">Rota animada</h3></div><button type="button" aria-pressed={playing} className={button} onClick={() => setPlaying(v => !v)}>{playing ? 'Pausar' : 'Reproduzir'} <CirclePlay size={15}/></button></div>
    <svg viewBox="0 0 340 190" className="mt-4 w-full rounded-xl bg-[#e8efe5] dark:bg-emerald-950" role="img" aria-label="Mapa ilustrativo com uma rota entre três pontos"><path d="M0 40 Q80 10 140 60 T340 20 M0 140 Q90 110 160 150 T340 110 M55 0 Q80 80 45 190 M220 0 Q180 90 260 190" fill="none" stroke="#c4d3bd" strokeWidth="13"/><path d="M25 150 C60 120 85 135 120 90 S200 105 220 60 S290 60 315 28" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round"/><path d="M25 150 C60 120 85 135 120 90 S200 105 220 60 S290 60 315 28" fill="none" stroke="#0f766e" strokeWidth="3" strokeDasharray="5 7" strokeLinecap="round"/>{[[25,150],[120,90],[220,60],[315,28]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="7" fill="#0f766e" stroke="white" strokeWidth="3"/></g>)}<motion.g animate={playing ? { offsetDistance: ['0%', '100%'] } : {}} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: "path('M25 150 C60 120 85 135 120 90 S200 105 220 60 S290 60 315 28')" } as React.CSSProperties}><circle r="7" fill="#f97316" stroke="white" strokeWidth="3"/></motion.g></svg>
    <div className="mt-3 flex items-center justify-between text-sm"><span className="text-zinc-500">Ponto A · Centro · Ponto B</span><span className="font-medium">Rota demonstrativa</span></div>
  </section>;
}

function Fur() {
  const [point, setPoint] = useState({ x: 50, y: 50 });
  return <section className={panel + ' p-5'}><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Fur</p><h3 className="mt-1 text-lg font-semibold">Textura sensível ao toque</h3><p className="mt-1 text-sm text-zinc-500">Mova o ponteiro ou toque na área para orientar os fios.</p>
    <div onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); setPoint({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }} onTouchMove={e => { const r = e.currentTarget.getBoundingClientRect(); const t = e.touches[0]; setPoint({ x: ((t.clientX-r.left)/r.width)*100, y: ((t.clientY-r.top)/r.height)*100 }); }} className="relative mt-4 h-48 touch-pan-y overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-900" aria-label="Área interativa de textura"><svg viewBox="0 0 320 180" preserveAspectRatio="none" className="h-full w-full">{Array.from({length: 240}, (_,i) => { const x=(i%24)*14+4; const y=Math.floor(i/24)*18+8; const dx=x-point.x*3.2; const dy=y-point.y*1.8; const a=Math.atan2(dy,dx); const near=Math.max(0,1-Math.sqrt(dx*dx+dy*dy)/75); return <path key={i} d={'M'+x+' '+y+' q'+(Math.cos(a)*5+near*10)+' '+(Math.sin(a)*5)+' '+(Math.cos(a)*9+near*15)+' '+(Math.sin(a)*10)} stroke={i%3===0?'#92400e':i%3===1?'#b45309':'#d97706'} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".8"/>; })}</svg></div>
  </section>;
}

function Vacuum() {
  const [tiles, setTiles] = useState(['Rascunho', 'Imagem', 'Anotação', 'Link', 'Bloco', 'Nota']);
  const [sucking, setSucking] = useState(false);
  const clear = () => { setSucking(true); window.setTimeout(() => { setTiles([]); setSucking(false); }, 450); };
  return <section className={panel + ' p-5'}><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Vacuum</p><h3 className="mt-1 text-lg font-semibold">Limpeza em lote</h3><p className="mt-1 text-sm text-zinc-500">Selecione itens e remova-os com uma transição.</p></div><Trash2 size={19} className="text-zinc-500"/></div>
    <div className="mt-4 grid min-h-28 grid-cols-2 gap-2 sm:grid-cols-3">{tiles.map((t,i)=><motion.button layout key={t} type="button" onClick={() => setTiles(prev => prev.filter(v => v !== t))} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-left text-sm dark:border-white/10 dark:bg-white/5" animate={sucking ? { x: 60, y: 35, scale: 0, opacity: 0 } : { x: 0, y: 0, scale: 1, opacity: 1 }} transition={{ duration: .3, delay: i*.025 }}>{t}<span className="mt-3 block text-xs text-zinc-400">Toque para remover</span></motion.button>)}</div>
    <div className="mt-3 flex items-center justify-between"><span className="text-xs text-zinc-500">{tiles.length} itens restantes</span><button type="button" className={button} disabled={!tiles.length} onClick={clear}>Aspirar tudo <Trash2 size={14}/></button><button type="button" className={button} onClick={() => setTiles(['Rascunho','Imagem','Anotação','Link','Bloco','Nota'])}><RotateCcw size={14}/> Restaurar</button></div>
  </section>;
}

function Crumple() {
  const [notes, setNotes] = useState(['Revisar o protótipo', 'Enviar a proposta', 'Organizar referências']);
  const [crumpling, setCrumpling] = useState<string | null>(null);
  const remove = (note: string) => { setCrumpling(note); window.setTimeout(() => { setNotes(prev => prev.filter(n => n !== note)); setCrumpling(null); }, 420); };
  return <section className={panel + ' p-5'}><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Crumple</p><h3 className="mt-1 text-lg font-semibold">Notas de papel</h3><p className="mt-1 text-sm text-zinc-500">Conclua uma nota e veja-a ser amassada.</p>
    <div className="mt-4 space-y-2">{notes.map(note=><motion.div key={note} layout initial={{opacity:0}} animate={crumpling===note?{scale:.15,rotate:180,y:80,opacity:0}: {scale:1,rotate:0,y:0,opacity:1}} transition={{duration:.38}} className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-zinc-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-50"><span>{note}</span><button type="button" aria-label={'Amassar nota: '+note} className={button} onClick={()=>remove(note)}><Check size={15}/> Concluir</button></motion.div>)}</div>
    {notes.length===0 && <p role="status" className="mt-4 text-sm text-zinc-500">Todas as notas foram concluídas.</p>}
    <button type="button" className={button+' mt-3'} onClick={()=>setNotes(['Revisar o protótipo','Enviar a proposta','Organizar referências'])}><RotateCcw size={14}/> Restaurar notas</button>
  </section>;
}

function Hologram() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return <section className={panel + ' p-5'}><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Hologram</p><h3 className="mt-1 text-lg font-semibold">Cartão holográfico</h3><p className="mt-1 text-sm text-zinc-500">Incline o ponteiro para deslocar o brilho.</p>
    <div className="mt-4 flex min-h-64 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 p-5" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();setTilt({x:(e.clientX-r.left)/r.width*2-1,y:(e.clientY-r.top)/r.height*2-1})}} onPointerLeave={()=>setTilt({x:0,y:0})}><motion.div animate={{rotateY:tilt.x*16,rotateX:-tilt.y*16}} transition={{type:'spring',stiffness:180,damping:18}} style={{background:'linear-gradient(135deg,#ec4899,#8b5cf6 28%,#06b6d4 52%,#facc15 76%,#f472b6)',transformStyle:'preserve-3d'}} className="relative flex h-48 w-36 flex-col justify-between overflow-hidden rounded-2xl border border-white/60 p-3 text-white shadow-2xl"><div className="absolute inset-0 opacity-60" style={{background:'linear-gradient('+ (120+tilt.x*70)+'deg, transparent 20%, rgba(255,255,255,.9) 45%, transparent 65%)'}}/><div className="relative flex items-center justify-between text-[10px] font-bold uppercase"><span>GodUI</span><Star size={13}/></div><div className="relative text-center text-5xl">✦</div><div className="relative text-center text-xs font-semibold tracking-widest">PRISMATIC</div></motion.div></div>
  </section>;
}

function Matchday() {
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);
  return <section className={panel + ' p-5'}><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Matchday</p><h3 className="mt-1 text-lg font-semibold">Diário de futebol</h3><div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-white/10"><div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-950">⚽</div><div className="min-w-0 flex-1"><p className="font-semibold">Clássico de domingo</p><p className="text-xs text-zinc-500">Partida demonstrativa · Hoje</p></div><Music2 className="h-5 w-5 text-zinc-400"/></div>
    <p className="mt-4 text-sm font-medium">Como foi a partida?</p><div className="mt-2 flex gap-1" role="radiogroup" aria-label="Avaliação da partida">{[1,2,3,4,5].map(n=><button type="button" key={n} role="radio" aria-checked={rating===n} aria-label={n+' de 5 estrelas'} onClick={()=>{setRating(n);setSaved(false)}} className="rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"><Star size={23} className={n<=rating?'fill-amber-400 text-amber-500':'text-zinc-300 dark:text-zinc-700'}/></button>)}</div>
    <div className="mt-3 flex items-center justify-between"><span role="status" className="text-sm text-zinc-500">{saved?'Avaliação registrada nesta sessão.':rating?rating+' de 5 estrelas':'Escolha uma nota'}</span><button type="button" className={primary} disabled={!rating} onClick={()=>setSaved(true)}><Check size={15}/> Registrar nota</button></div>
  </section>;
}

export function FeraUIExperiment({ experiment, title, accent = '#0f766e' }: Props) {
  const demos: Record<string, React.ReactNode> = {
    'feraui-pull-cord': <PullCord/>,
    'feraui-claw-captcha': <ClawCaptcha/>,
    'feraui-gradient-builder': <GradientBuilder/>,
    'feraui-screenery': <Screenery/>,
    'feraui-deskfolio': <DeskFolio/>,
    'feraui-blob': <Blob/>,
    'feraui-animaps': <AniMaps/>,
    'feraui-fur': <Fur/>,
    'feraui-vacuum': <Vacuum/>,
    'feraui-crumple': <Crumple/>,
    'feraui-hologram': <Hologram/>,
    'feraui-matchday': <Matchday/>,
  };
  return <div data-feraui-experiment={experiment} style={{ '--feraui-accent': accent } as React.CSSProperties} className="w-full">{demos[experiment] || <div className={panel+' p-5'}><h3 className="font-semibold">{title || 'Experimento FeraUI'}</h3><p className="mt-2 text-sm text-zinc-500">Experimento não encontrado.</p></div>}</div>;
}
