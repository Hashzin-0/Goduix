import React, { useState } from 'react';
import { PullCord as PullCordOriginal } from 'pullcord';
import 'pullcord/pullcord.css';
import { ClawCaptcha as ClawCaptchaOriginal } from 'playcaptcha';
import 'playcaptcha/clawcaptcha.css';
import { DeskFolio as DeskFolioOriginal } from 'deskfolio';
import 'deskfolio/styles.css';
import { JellyBlobMascot, BlobSpeech, type JellyBlobMood } from 'feral-blob';
import 'feral-blob/blob.css';
import { AniMaps as AniMapsOriginal } from 'animaps-react';
import 'animaps-react/style.css';
import { Fur as FurOriginal } from 'feral-fur';
import 'feral-fur/fur.css';

import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight,
  CirclePlay, Copy, Music2, RotateCcw, Star, Trash2, Trophy,
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
  const [pulled, setPulled] = useState(false);
  return <section className={panel + ' p-5'}>
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Pull Cord · original</p>
    <h3 className="mt-1 text-lg font-semibold">Corda física interativa</h3>
    <p className="mt-1 text-sm text-zinc-500">Puxe a corda ou use o teclado para alternar o estado.</p>
    <div className="relative mt-4 min-h-72 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-white/10">
      <PullCordOriginal pulled={pulled} onPull={() => setPulled(v => !v)} ariaLabel="Alternar estado da corda" />
      <span className="absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-1 text-xs text-white" role="status">{pulled ? 'Ativado' : 'Desativado'}</span>
    </div>
  </section>;
}function ClawCaptcha() {
  const [verified, setVerified] = useState(false);
  return <section className={panel + ' p-5'}>
    <div className="mb-4"><p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">PlayCaptcha · original</p><h3 className="mt-1 text-lg font-semibold">Máquina de garra</h3><p className="mt-1 text-sm text-zinc-500">Demonstração interativa. Não substitui verificações de segurança no servidor.</p></div>
    <ClawCaptchaOriginal title="Pegue o brinquedo solicitado" onVerify={() => setVerified(true)} />
    {verified && <p className="mt-3 text-sm font-medium text-emerald-600" role="status">Desafio concluído nesta pré-visualização.</p>}
  </section>;
}function GradientBuilder() {
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
    <AnimatePresence mode="wait"><motion.div key={screen} initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }} className={'mt-4 flex min-h-56 flex-col justify-between rounded-xl bg-gradient-to-br p-6 text-zinc-900 ' + s.bg}><div><span className="text-xs font-semibold uppercase tracking-widest">Seu próximo capítulo</span><h4 className="mt-8 max-w-xs text-2xl font-bold">{s.title}</h4><p className="mt-2 text-sm">{s.subtitle}</p></div><button type="button" onClick={() => setScreen(v => (v + 1) % screens.length)} className="mt-6 w-fit rounded-full bg-zinc-900 px-4 py-2 text-sm text-white">{s.cta} <ArrowRight size={14} className="ml-1 inline"/></button></motion.div></AnimatePresence>
    <div className="mt-3 flex justify-between"><button type="button" className={button} onClick={() => setScreen(v => (v + screens.length - 1) % screens.length)}><ChevronLeft size={15}/> Anterior</button><button type="button" className={button} onClick={() => setScreen(v => (v + 1) % screens.length)}>Próxima <ChevronRight size={15}/></button></div>
  </section>;
}

function DeskFolio() {
  return <section className={panel + ' p-3 sm:p-5'}>
    <p className="px-2 pt-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">DeskFolio · original</p>
    <h3 className="px-2 pt-1 text-lg font-semibold">Portfólio de mesa</h3>
    <div className="mt-3 min-h-[480px] overflow-visible rounded-xl"><DeskFolioOriginal /></div>
  </section>;
}function Blob() {
  const [mood, setMood] = useState<JellyBlobMood>('curious');
  const moods: JellyBlobMood[] = ['neutral', 'happy', 'sad', 'angry', 'hmm', 'sideEye', 'password', 'curious', 'surprised', 'sleepy', 'shy', 'love', 'wave'];
  return <section className={panel + ' p-5'}>
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Feral Blob · original</p>
    <h3 className="mt-1 text-lg font-semibold">Mascote com expressões reais</h3>
    <div className="mt-4 flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl bg-sky-50 p-4 dark:bg-sky-950/40">
      <JellyBlobMascot mood={mood} eyeStyle="v2" />
      <BlobSpeech mood={mood} messages={{ happy: 'Que bom ver você!', sleepy: 'Só mais cinco minutinhos…', angry: 'Ei! Com cuidado!', curious: 'Experimente mudar minha expressão.' }} />
    </div>
    <label className="mt-4 block text-sm font-medium" htmlFor="feraui-blob-mood">Expressão</label>
    <select id="feraui-blob-mood" value={mood} onChange={e => setMood(e.target.value as JellyBlobMood)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-white p-2 text-sm dark:border-white/10 dark:bg-zinc-900">
      {moods.map(value => <option key={value} value={value}>{value}</option>)}
    </select>
  </section>;
}function AniMaps() {
  return <section className={panel + ' p-3 sm:p-5'}>
    <p className="px-2 pt-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">AniMaps · original</p>
    <h3 className="px-2 pt-1 text-lg font-semibold">Editor de rotas animadas</h3>
    <div className="mt-3 min-h-[520px] overflow-hidden rounded-xl"><AniMapsOriginal /></div>
  </section>;
}function Fur() {
  const [color, setColor] = useState('#f5a8c9');
  const [shape, setShape] = useState<'folder' | 'card' | 'heart'>('folder');
  const [density, setDensity] = useState(1);
  return <section className={panel + ' p-5'}>
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Feral Fur · original</p>
    <h3 className="mt-1 text-lg font-semibold">Textura de pelos interativa</h3>
    <p className="mt-1 text-sm text-zinc-500">Arraste sobre a superfície para acariciar os fios.</p>
    <div className="mt-4 flex min-h-56 items-center justify-center overflow-visible rounded-xl bg-amber-50 p-6 dark:bg-amber-950/30">
      <FurOriginal shape={shape} color={color} density={density} style={{ width: 'min(100%, 320px)', aspectRatio: '29 / 24' }} />
    </div>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <label className="text-sm">Formato<select value={shape} onChange={e => setShape(e.target.value as typeof shape)} className="mt-1 w-full rounded-lg border border-zinc-200 bg-white p-2 dark:border-white/10 dark:bg-zinc-900"><option value="folder">Pasta</option><option value="card">Cartão</option><option value="heart">Coração</option></select></label>
      <label className="text-sm">Cor<input type="color" value={color} onChange={e => setColor(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white p-1 dark:border-white/10 dark:bg-zinc-900" /></label>
      <label className="text-sm">Densidade<input type="range" min="0.4" max="2" step="0.2" value={density} onChange={e => setDensity(Number(e.target.value))} className="mt-3 w-full" /></label>
    </div>
  </section>;
}function Vacuum() {
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
