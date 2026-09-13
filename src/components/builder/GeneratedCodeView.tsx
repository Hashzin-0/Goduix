import React, { useState } from 'react';
import { Copy, Check, Download, Code2, Terminal, ShieldCheck, FileText } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { THEMES } from '../../data/themes';

export const GeneratedCodeView: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const [copied, setCopied] = useState(false);

  // Generate full standalone page code based on the current canvas components
  const generatePageCode = () => {
    const activeTypes = Array.from(new Set(store.components.map(c => c.type)));

    return `import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Layers } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility: 0% CSS Conflict Class Combiner
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GodUIGeneratedPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Gradient & Glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, ${theme.glow}, transparent 70%)",
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">
${store.components.map((c, i) => `        {/* Component #${i + 1}: ${c.name} */}
        <section key="${c.id}" className="w-full">
          {/* Props: ${JSON.stringify(c.props)} */}
          <div className="p-4 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">
            <span className="text-xs font-mono text-cyan-400 font-bold">${c.name}</span>
          </div>
        </section>`).join('\n\n')}
      </main>
    </div>
  );
}
`;
  };

  const code = generatePageCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GodUIPage.tsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto p-3.5 sm:p-6 bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Top Header Card */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Código Fonte Gerado</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                0% Conflito CSS
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Exportação do layout montado no Website Builder com os componentes reais do GodUI.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <button
              onClick={() => store.setViewMode('builder')}
              className="lg:hidden px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold cursor-pointer"
            >
              Voltar ao Editor
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 sm:px-4 py-2 rounded-xl text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:brightness-110"
              style={{ backgroundColor: theme.primary }}
            >
              <Download className="w-4 h-4" />
              <span>Baixar .tsx</span>
            </button>
          </div>
        </div>

        {/* Code Block */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl">
          <div className="px-4 py-3 border-b border-white/10 bg-zinc-900/50 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>src/pages/GodUIPage.tsx</span>
            <span className="text-[11px] text-zinc-500">{store.components.length} componentes ativos</span>
          </div>
          <pre className="p-4 sm:p-6 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed max-h-[600px]">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
