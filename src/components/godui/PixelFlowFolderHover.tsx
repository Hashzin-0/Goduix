import React, { useState } from 'react';
import { ChevronDown, FileCode2, FileImage, FileText, Folder, FolderOpen } from 'lucide-react';

export interface PixelFlowFolderHoverProps {
  title?: string;
  subtitle?: string;
  accent?: string;
  duration?: number;
}

const FILES = [
  { name: 'App.tsx', detail: 'React component', Icon: FileCode2 },
  { name: 'styles.css', detail: 'Stylesheet', Icon: FileText },
  { name: 'preview.png', detail: 'Image asset', Icon: FileImage },
];

export const PixelFlowFolderHover: React.FC<PixelFlowFolderHoverProps> = ({
  title = 'Project files',
  subtitle = 'Hover or focus to explore',
  accent = '#60a5fa',
  duration = 380,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const speed = Math.max(120, Math.min(900, duration));

  return (
    <section className="mx-auto my-5 w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950 p-5 text-white">
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) setOpen(false);
          }}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          style={{ ['--tw-ring-color' as string]: accent, transitionDuration: `${speed}ms` }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ color: accent, backgroundColor: `${accent}18` }}>
            {open ? <FolderOpen size={24} /> : <Folder size={24} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{title}</span>
            <span className="mt-1 block text-xs text-zinc-400">{subtitle}</span>
          </span>
          <ChevronDown size={16} className={`shrink-0 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} style={{ transitionDuration: `${speed}ms` }} />
        </button>

        <div
          aria-hidden={!open}
          className="absolute left-3 right-3 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-xl transition-all"
          style={{ opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-8px)', visibility: open ? 'visible' : 'hidden', transitionDuration: `${speed}ms` }}
        >
          {FILES.map(({ name, detail, Icon }, index) => (
            <button
              key={name}
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => { setSelected(name); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${selected === name ? 'bg-white/10' : 'hover:bg-white/[0.06]'}`}
              style={{ transitionDelay: open ? `${index * 25}ms` : '0ms' }}
            >
              <Icon size={16} style={{ color: accent }} />
              <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium">{name}</span><span className="mt-0.5 block text-[10px] text-zinc-500">{detail}</span></span>
              {selected === name && <span className="text-[10px]" style={{ color: accent }}>Selecionado</span>}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-zinc-500">Interação de pasta CSS/React inspirada em wearepixelflow/folder-hover-animation. Nenhum arquivo do projeto de origem é incorporado.</p>
    </section>
  );
};
