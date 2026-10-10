import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, X } from 'lucide-react';

const BOOKS = [
  { title: 'Codex', subtitle: 'Pensar com sistemas', color: '#d9e6f2', ink: '#20364d', label: '01' },
  { title: 'Claude Code', subtitle: 'Construir com contexto', color: '#f0d8bd', ink: '#5e3427', label: '02' },
  { title: 'Cursor', subtitle: 'Editar em movimento', color: '#c9dfd1', ink: '#214d3a', label: '03' },
  { title: 'Antigravity', subtitle: 'Projetar além do plano', color: '#d7d0ef', ink: '#43376d', label: '04' },
  { title: 'Figma', subtitle: 'Dar forma às ideias', color: '#efc7c9', ink: '#713b45', label: '05' },
  { title: 'Framer', subtitle: 'Movimento na web', color: '#c7d8f6', ink: '#264b82', label: '06' },
  { title: 'Xcode', subtitle: 'Criar para plataformas', color: '#e8dfc4', ink: '#5b4c25', label: '07' },
];

export interface CompleteShelfProps {
  title?: string;
  showDescriptions?: boolean;
  accent?: string;
}

export const CompleteShelf: React.FC<CompleteShelfProps> = ({
  title = 'The Complete Shelf',
  showDescriptions = true,
  accent = '#67e8f9',
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? null : BOOKS[selected];

  const move = (direction: number) => {
    setSelected((current) => current === null ? (direction > 0 ? 0 : BOOKS.length - 1) : (current + direction + BOOKS.length) % BOOKS.length);
  };

  return (
    <section className="mx-auto my-5 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 text-white sm:p-7">
      <header className="mb-8 flex items-center justify-between gap-3">
        <div><p className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>Coleção interativa</p><h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3></div>
        <BookOpen size={19} className="text-zinc-500" />
      </header>
      <div className="relative min-h-64">
        <div className="absolute bottom-9 left-0 right-0 h-3 rounded-full bg-zinc-700 shadow-[0_12px_22px_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-700 to-zinc-900" />
        <div className="relative z-10 flex min-h-64 items-end justify-center gap-1.5 overflow-x-auto px-1 pb-10 [perspective:900px] sm:gap-2">
          {BOOKS.map((book, index) => (
            <motion.button
              key={book.title}
              type="button"
              aria-label={`Abrir livro ${book.title}`}
              aria-pressed={selected === index}
              onClick={() => setSelected((current) => current === index ? null : index)}
              animate={{ y: selected === index ? -20 : 0, rotateY: selected === index ? -8 : (index - 3) * 2, scale: selected === index ? 1.08 : 1 }}
              whileHover={{ y: -12, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative flex h-44 w-[4.1rem] shrink-0 flex-col items-center justify-between overflow-hidden rounded-r-md border-l-4 border-black/10 px-1.5 py-3 text-center shadow-[8px_5px_12px_rgba(0,0,0,0.35)] sm:h-52 sm:w-[5.5rem] sm:px-2"
              style={{ backgroundColor: book.color, color: book.ink, transformStyle: 'preserve-3d' }}
            >
              <span className="text-[9px] font-mono tracking-widest">{book.label}</span>
              <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-semibold tracking-wide sm:text-sm">{book.title}</span>
              <span className="h-px w-7 bg-current opacity-40" />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {active && (
          <motion.div key={active.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div><p className="text-sm font-semibold">{active.title}</p>{showDescriptions && <p className="mt-1 text-xs text-zinc-400">{active.subtitle}</p>}</div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(-1)} aria-label="Livro anterior" className="rounded-xl border border-white/10 p-2 hover:bg-white/10"><ArrowLeft size={15} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Próximo livro" className="rounded-xl border border-white/10 p-2 hover:bg-white/10"><ArrowRight size={15} /></button>
              <button type="button" onClick={() => setSelected(null)} aria-label="Fechar detalhe" className="rounded-xl border border-white/10 p-2 hover:bg-white/10"><X size={15} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="mt-4 text-[10px] leading-relaxed text-zinc-500">Implementação independente inspirada no conceito de estante interativa; não incorpora o código ou os ativos do repositório Complete Shelf.</p>
    </section>
  );
};
