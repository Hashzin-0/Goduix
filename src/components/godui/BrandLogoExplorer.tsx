import React, { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, Image as ImageIcon, LoaderCircle, Search } from 'lucide-react';

type JsonRecord = Record<string, unknown>;
type LogoItem = {
  key: string;
  title: string;
  source: 'SVGL' | 'theSVG';
  category: string;
  imageUrl: string;
  brandUrl?: string;
  license?: string;
};

export interface BrandLogoExplorerProps {
  title?: string;
  initialQuery?: string;
  includeTheSvg?: boolean;
}

const isRecord = (value: unknown): value is JsonRecord => typeof value === 'object' && value !== null && !Array.isArray(value);
const safeHttpsUrl = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
};

function normalizeSvgl(value: unknown): LogoItem | null {
  if (!isRecord(value) || typeof value.title !== 'string') return null;
  const route = value.route;
  const routeUrl = typeof route === 'string' ? route : isRecord(route) ? route.dark ?? route.light : undefined;
  const imageUrl = safeHttpsUrl(routeUrl);
  if (!imageUrl) return null;
  return {
    key: `svgl-${String(value.id ?? value.title)}`,
    title: value.title,
    source: 'SVGL',
    category: Array.isArray(value.category) ? value.category.join(', ') : String(value.category ?? 'Brand'),
    imageUrl,
    brandUrl: safeHttpsUrl(value.url),
  };
}

function normalizeTheSvg(value: unknown): LogoItem | null {
  if (!isRecord(value) || typeof value.title !== 'string' || typeof value.slug !== 'string') return null;
  const slug = value.slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!slug) return null;
  const variantMap = isRecord(value.variants) ? value.variants : {};
  const variant = typeof variantMap.dark === 'string' ? 'dark' : 'default';
  return {
    key: `thesvg-${slug}`,
    title: value.title,
    source: 'theSVG',
    category: Array.isArray(value.categories) ? value.categories.join(', ') : String(value.categories ?? 'Brand'),
    imageUrl: `https://thesvg.org/icons/${slug}/${variant}.svg`,
    brandUrl: safeHttpsUrl(value.url),
    license: typeof value.license === 'string' ? value.license : undefined,
  };
}

export const BrandLogoExplorer: React.FC<BrandLogoExplorerProps> = ({
  title = 'Brand Logo Explorer',
  initialQuery = 'openai',
  includeTheSvg = true,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [items, setItems] = useState<LogoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState('');
  const [extended, setExtended] = useState(includeTheSvg);

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) {
      setItems([]);
      setError('');
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const svglRequest = fetch(`https://api.svgl.app?search=${encodeURIComponent(normalized)}`, { signal: controller.signal })
          .then(async (response) => {
            if (!response.ok) throw new Error('SVGL API indisponível');
            const data: unknown = await response.json();
            return Array.isArray(data) ? data.map(normalizeSvgl).filter((item): item is LogoItem => item !== null) : [];
          });
        const theSvgRequest = extended
          ? fetch('https://cdn.jsdelivr.net/gh/glincker/thesvg@main/src/data/icons.json', { signal: controller.signal })
              .then(async (response) => {
                if (!response.ok) throw new Error('theSVG manifest indisponível');
                const data: unknown = await response.json();
                const rows = Array.isArray(data) ? data : isRecord(data) && Array.isArray(data.icons) ? data.icons : [];
                const needle = normalized.toLowerCase();
                return rows
                  .filter((row) => {
                    if (!isRecord(row)) return false;
                    const haystack = [row.title, row.slug, ...(Array.isArray(row.aliases) ? row.aliases : [])].filter((part) => typeof part === 'string').join(' ').toLowerCase();
                    return haystack.includes(needle);
                  })
                  .slice(0, 24)
                  .map(normalizeTheSvg)
                  .filter((item): item is LogoItem => item !== null);
              })
          : Promise.resolve([]);
        const [svglItems, theSvgItems] = await Promise.all([svglRequest, theSvgRequest]);
        const unique = new Map<string, LogoItem>();
        [...svglItems, ...theSvgItems].forEach((item) => unique.set(item.key, item));
        setItems([...unique.values()].slice(0, 36));
        if (unique.size === 0) setError('Nenhum logotipo encontrado. Tente outro termo.');
      } catch (caught) {
        if (!controller.signal.aborted) {
          setItems([]);
          setError(caught instanceof Error ? caught.message : 'Não foi possível consultar as bibliotecas de SVG.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query, extended]);

  const copyUrl = async (item: LogoItem) => {
    try {
      await navigator.clipboard.writeText(item.imageUrl);
      setCopiedKey(item.key);
    } catch {
      setError('O navegador bloqueou a cópia. Abra o SVG e copie a URL manualmente.');
    }
  };

  return (
    <section className="mx-auto my-5 w-full max-w-4xl rounded-3xl border border-white/10 bg-zinc-950 p-5 text-white sm:p-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">Busca unificada nas APIs públicas SVGL e theSVG. Logotipos mantêm os direitos de suas respectivas marcas.</p>
        </div>
        <ImageIcon className="shrink-0 text-cyan-300" size={20} />
      </header>
      <form className="mt-5 flex gap-2" onSubmit={(event) => event.preventDefault()}>
        <label className="relative min-w-0 flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar marca, serviço ou biblioteca..." className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-9 pr-3 text-sm outline-none focus:border-cyan-300/50" />
        </label>
        <button type="button" onClick={() => setExtended((value) => !value)} aria-pressed={extended} className={`rounded-xl border px-3 text-xs transition-colors ${extended ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-zinc-400'}`}>theSVG {extended ? 'on' : 'off'}</button>
      </form>
      <div className="mt-5">
        {loading && <div className="flex items-center justify-center gap-2 py-8 text-xs text-zinc-400"><LoaderCircle size={16} className="animate-spin" /> Consultando bibliotecas…</div>}
        {!loading && error && <p role="status" className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-200">{error}</p>}
        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <article key={item.key} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex h-20 items-center justify-center rounded-xl bg-white/[0.04] p-3">
                  <img src={item.imageUrl} alt={item.title} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-1">
                  <div className="min-w-0"><p className="truncate text-xs font-semibold">{item.title}</p><p className="mt-1 text-[10px] text-zinc-500">{item.source} · {item.category}</p></div>
                  {item.brandUrl && <a href={item.brandUrl} target="_blank" rel="noreferrer" aria-label={`Abrir site de ${item.title}`} className="text-zinc-500 hover:text-white"><ExternalLink size={13} /></a>}
                </div>
                <button type="button" onClick={() => void copyUrl(item)} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-2 py-2 text-[10px] text-zinc-300 hover:bg-white/5">{copiedKey === item.key ? <Check size={12} /> : <Copy size={12} />}{copiedKey === item.key ? 'URL copiada' : 'Copiar URL SVG'}</button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
