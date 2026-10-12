import React, { useEffect, useRef, useState } from 'react';

type SpriteSheetAnimationStudioProps = {
  accent?: string;
  label?: string;
};

type ImageDimensions = { width: number; height: number };

const control = 'rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300';
const fieldLabel = 'text-[11px] uppercase tracking-[.14em] text-white/55';

export function SpriteSheetAnimationStudio({
  accent = '#67e8f9',
  label = 'Estúdio de animação por spritesheet',
}: SpriteSheetAnimationStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  const [frame, setFrame] = useState(0);
  const [fps, setFps] = useState(8);
  const [zoom, setZoom] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const [message, setMessage] = useState('');

  const safeColumns = dimensions ? Math.max(1, Math.min(columns, dimensions.width)) : 1;
  const safeRows = dimensions ? Math.max(1, Math.min(rows, dimensions.height)) : 1;
  const frameCount = safeColumns * safeRows;
  const frameWidth = dimensions ? Math.floor(dimensions.width / safeColumns) : 0;
  const frameHeight = dimensions ? Math.floor(dimensions.height / safeRows) : 0;
  const currentFrame = Math.min(frame, Math.max(0, frameCount - 1));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const image = imageRef.current;
    if (!canvas || !context || !image || !dimensions || frameWidth < 1 || frameHeight < 1) return;

    const col = currentFrame % safeColumns;
    const row = Math.floor(currentFrame / safeColumns);
    canvas.width = frameWidth;
    canvas.height = frameHeight;
    context.clearRect(0, 0, frameWidth, frameHeight);
    context.imageSmoothingEnabled = smooth;
    context.drawImage(
      image,
      col * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth,
      frameHeight,
    );
  }, [fileName, dimensions, currentFrame, safeColumns, safeRows, frameWidth, frameHeight, smooth]);

  useEffect(() => {
    if (!playing || frameCount < 2) return;
    let animationId = 0;
    let lastTick = 0;
    const interval = 1000 / Math.max(1, Math.min(30, fps));
    const tick = (timestamp: number) => {
      if (timestamp - lastTick >= interval) {
        lastTick = timestamp;
        setFrame((value) => (value + 1) % frameCount);
      }
      animationId = window.requestAnimationFrame(tick);
    };
    animationId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationId);
  }, [playing, fps, frameCount]);

  useEffect(() => {
    if (frame >= frameCount) setFrame(Math.max(0, frameCount - 1));
    if (frameCount < 2) setPlaying(false);
  }, [frame, frameCount]);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  const importSheet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMessage('Escolha um arquivo de imagem compatível.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setMessage('O arquivo excede o limite de 25 MB.');
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    const image = new Image();
    image.onload = () => {
      if (image.naturalWidth > 8192 || image.naturalHeight > 8192) {
        URL.revokeObjectURL(objectUrl);
        objectUrlRef.current = null;
        setMessage('A imagem deve ter no máximo 8192 px por dimensão.');
        return;
      }
      imageRef.current = image;
      setDimensions({ width: image.naturalWidth, height: image.naturalHeight });
      setColumns(1);
      setRows(1);
      setFrame(0);
      setPlaying(false);
      setFileName(file.name);
      setMessage('');
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      objectUrlRef.current = null;
      setMessage('Não foi possível abrir esta imagem.');
    };
    image.src = objectUrl;
  };

  const exportFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions) return;
    canvas.toBlob((blob) => {
      if (!blob) {
        setMessage('Não foi possível exportar o quadro atual.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'goduix-sprite-frame-' + String(currentFrame + 1).padStart(3, '0') + '.png';
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage('Quadro exportado em PNG.');
    }, 'image/png');
  };

  return (
    <section className="relative isolate w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b13] text-white shadow-xl">
      <header className="px-4 pt-4 sm:px-5">
        <p className={fieldLabel}>2D / SPRITESHEET ANIMATION</p>
        <h3 className="mt-1 text-base font-semibold tracking-tight">{label}</h3>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-white/55">
          Importe uma spritesheet real, defina linhas e colunas, ajuste a taxa de quadros e exporte qualquer quadro em PNG. Nenhum sprite de demonstração é incluído.
        </p>
      </header>

      <div className="mx-3 mb-3 mt-3 overflow-hidden rounded-xl border border-white/10">
        <div className="flex min-h-64 items-center justify-center overflow-auto bg-[#0b1220] p-5">
          {dimensions ? (
            <canvas
              ref={canvasRef}
              aria-label={'Prévia do quadro ' + (currentFrame + 1) + ' de ' + frameCount}
              className="max-h-[420px] max-w-full"
              style={{
                width: Math.min(800, Math.max(1, frameWidth * zoom)),
                imageRendering: smooth ? 'auto' : 'pixelated',
                backgroundImage: 'linear-gradient(45deg,#18202e 25%,transparent 25%),linear-gradient(-45deg,#18202e 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#18202e 75%),linear-gradient(-45deg,transparent 75%,#18202e 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
              }}
            />
          ) : (
            <div className="max-w-xs text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl" style={{ color: accent }}>▦</div>
              <p className="text-sm font-medium text-white/75">Importe uma spritesheet</p>
              <p className="mt-1 text-xs leading-relaxed text-white/40">A prévia será criada a partir do seu arquivo, sem conteúdo fictício.</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-black/20 p-3">
          <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={importSheet} aria-label="Importar spritesheet" />
          <button type="button" className={control} onClick={() => inputRef.current?.click()}>Importar spritesheet</button>
          <button type="button" className={control} disabled={!dimensions || frameCount < 2} onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>
            {playing ? 'Pausar' : 'Reproduzir'}
          </button>
          <button type="button" className={control} disabled={!dimensions} onClick={() => setFrame((value) => (value - 1 + frameCount) % frameCount)} aria-label="Quadro anterior">Anterior</button>
          <button type="button" className={control} disabled={!dimensions} onClick={() => setFrame((value) => (value + 1) % frameCount)} aria-label="Próximo quadro">Próximo</button>
          <button type="button" className={control} disabled={!dimensions} onClick={exportFrame}>Exportar quadro PNG</button>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/10 p-3 sm:grid-cols-4">
          <label className={fieldLabel}>
            Colunas
            <input className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-2 py-2 text-sm text-white" type="number" min="1" max="32" value={columns} onChange={(event) => { setColumns(Math.max(1, Math.min(32, Number(event.target.value) || 1))); setFrame(0); }} disabled={!dimensions} />
          </label>
          <label className={fieldLabel}>
            Linhas
            <input className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-2 py-2 text-sm text-white" type="number" min="1" max="32" value={rows} onChange={(event) => { setRows(Math.max(1, Math.min(32, Number(event.target.value) || 1))); setFrame(0); }} disabled={!dimensions} />
          </label>
          <label className={fieldLabel}>
            FPS <span className="text-white">{fps}</span>
            <input className="mt-3 block w-full accent-cyan-300" type="range" min="1" max="30" value={fps} onChange={(event) => setFps(Number(event.target.value))} disabled={!dimensions} />
          </label>
          <label className={fieldLabel}>
            Zoom <span className="text-white">{zoom}×</span>
            <input className="mt-3 block w-full accent-cyan-300" type="range" min="1" max="8" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} disabled={!dimensions} />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-3 py-3">
          <label className="flex items-center gap-2 text-xs text-white/65">
            <input type="checkbox" checked={smooth} onChange={(event) => setSmooth(event.target.checked)} disabled={!dimensions} />
            Suavizar imagem
          </label>
          <span className="text-[10px] text-white/45">{dimensions ? dimensions.width + ' × ' + dimensions.height + ' px · ' + safeColumns + ' × ' + safeRows + ' · quadro ' + (currentFrame + 1) + '/' + frameCount : 'Sem arquivo carregado'}</span>
        </div>
        {fileName && <p className="border-t border-white/10 px-3 py-2 text-[10px] text-white/45">{fileName}</p>}
        {message && <p role="status" className="border-t border-white/10 px-3 py-2 text-xs" style={{ color: accent }}>{message}</p>}
      </div>
    </section>
  );
}
