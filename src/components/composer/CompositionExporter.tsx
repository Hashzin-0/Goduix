import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Download, Copy, Check, FileCode, FileText, Code2, Layers } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ExportFormat } from '../../types/composition';
import { cn } from '../../lib/utils';

const FORMAT_OPTIONS: { id: ExportFormat; label: string; description: string; icon: React.FC<any> }[] = [
  { id: 'react-tsx', label: 'React TSX', description: 'Componente React com efeitos HOC', icon: FileCode },
  { id: 'react-css', label: 'React CSS', description: 'React com classes CSS separadas', icon: FileText },
  { id: 'html-css', label: 'HTML CSS', description: 'HTML + CSS puro, sem dependências', icon: Code2 },
  { id: 'tailwind', label: 'Tailwind', description: 'Classes Tailwind CSS utility-first', icon: Layers },
];

interface CompositionExporterProps {
  onClose: () => void;
}

export function CompositionExporter({ onClose }: CompositionExporterProps) {
  const {
    currentComposition,
    composerPreviewFormat,
    setComposerPreviewFormat,
    generateCompositionCode,
  } = useBuilderStore();

  const [copied, setCopied] = useState(false);

  if (!currentComposition) return null;

  const code = generateCompositionCode(composerPreviewFormat);
  const currentFormat = FORMAT_OPTIONS.find((f) => f.id === composerPreviewFormat) || FORMAT_OPTIONS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const ext = composerPreviewFormat === 'html-css' ? 'html' : 'tsx';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentComposition.name.replace(/\s+/g, '-').toLowerCase()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-[840px] max-h-[85vh] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
          <div>
            <h3 className="text-white font-semibold text-sm">Exportar Composição</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              {currentComposition.name} &middot; {lineCount} linhas &middot; {charCount.toLocaleString()} caracteres
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <div className="flex items-center gap-1 px-5 pt-3 pb-1">
          {FORMAT_OPTIONS.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.id}
                onClick={() => setComposerPreviewFormat(format.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  composerPreviewFormat === format.id
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                )}
                title={format.description}
              >
                <Icon className="w-3.5 h-3.5" />
                {format.label}
              </button>
            );
          })}

          <div className="flex-1" />

          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
              copied
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
            )}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          <div className="relative">
            <pre className="bg-zinc-950 border border-white/5 rounded-xl p-4 overflow-x-auto min-h-[300px]">
              <code className="text-xs text-zinc-300 font-mono whitespace-pre leading-relaxed">
                {code || '// Nenhum código gerado. Adicione efeitos à composição.'}
              </code>
            </pre>
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-600 bg-zinc-900/80 px-1.5 py-0.5 rounded">
                {currentFormat.label}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
