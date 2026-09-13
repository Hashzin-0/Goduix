import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  FileText,
  Sparkles
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { THEMES } from '../../data/themes';
import { GodUIComponentType } from '../../types/builder';
import { cn } from '../../lib/utils';

interface ExportPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportPageModal: React.FC<ExportPageModalProps> = ({ isOpen, onClose }) => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];

  const [activeTab, setActiveTab] = useState<'full-page' | 'individual' | 'cli' | 'architecture'>('full-page');
  const [selectedComponentType, setSelectedComponentType] = useState<GodUIComponentType>('dynamic-island');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const catalogItem = GODUI_CATALOG[selectedComponentType];

  const generateFullPageCode = () => {
    return `// =========================================================================
// GodUI Full Page - React 19 + Tailwind CSS v4 + Motion
// Gerado pelo GodUI Website Builder (godui.design)
// Garantia de 0% de Conflito de CSS com Classes Atômicas e utilitário cn()
// =========================================================================

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ArrowUpRight, ShieldCheck, Layers, Terminal, Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GodUIPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, ${theme.glow}, transparent 65%)",
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-12">
${store.components.map((comp, idx) => `        {/* ${idx + 1}. ${comp.name} */}
        <section key="${comp.id}" className="w-full">
          {/* Componente: ${comp.name} | Registro: ${comp.type} */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
            <div className="text-xs font-mono text-cyan-400 font-bold mb-2">${comp.name}</div>
            <p className="text-xs text-zinc-400">Props configuradas: ${JSON.stringify(comp.props)}</p>
          </div>
        </section>`).join('\n\n')}
      </main>
    </div>
  );
}
`;
  };

  const currentCode = activeTab === 'full-page'
    ? generateFullPageCode()
    : activeTab === 'individual'
    ? (catalogItem?.sampleCode || '')
    : activeTab === 'cli'
    ? `npm i motion lucide-react clsx tailwind-merge\n\n# Adicionar componentes reais via CLI GodUI:\n${store.components.map(c => `npx godui add ${GODUI_CATALOG[c.type]?.registryName || c.type}`).join('\n')}`
    : `# Arquitetura GodUI: 0% Conflito de CSS
- Tailwind CSS v4 com compilação atômica
- Sem variáveis globais poluentes
- Utilitário cn() com clsx + tailwind-merge para deduplicação instantânea
- Física spring isolada no Motion sem interferência em layouts pais`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'full-page' ? 'GodUIPage.tsx' : `${selectedComponentType}.tsx`;
    const blob = new Blob([currentCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/15 text-white shadow-2xl overflow-hidden mx-2 sm:mx-0"
      >
        {/* Top Header */}
        <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2.5 sm:gap-3 truncate">
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-zinc-950 shadow-md shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">Exportador de Código GodUI</h3>
                <span className="hidden xs:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">
                  0% CSS Conflict
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 truncate">
                Código pronto para produção com React 19, Tailwind v4 e Motion v12.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-3 sm:px-5 pt-2 sm:pt-3 border-b border-white/10 flex items-center gap-1 sm:gap-2 bg-zinc-900/30 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('full-page')}
            className={cn(
              "px-3 sm:px-3.5 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'full-page'
                ? "bg-zinc-950 text-white border-t border-x border-white/10"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Página Completa ({store.components.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('individual')}
            className={cn(
              "px-3 sm:px-3.5 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'individual'
                ? "bg-zinc-950 text-white border-t border-x border-white/10"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Componente Individual</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={cn(
              "px-3 sm:px-3.5 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'cli'
                ? "bg-zinc-950 text-white border-t border-x border-white/10"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI GodUI</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={cn(
              "px-3 sm:px-3.5 py-2 rounded-t-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'architecture'
                ? "bg-zinc-950 text-white border-t border-x border-white/10"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Guia Anti-Conflito</span>
          </button>
        </div>

        {/* Sub-selector for individual component */}
        {activeTab === 'individual' && (
          <div className="px-5 py-2.5 border-b border-white/5 bg-zinc-900/20 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-zinc-400 font-mono shrink-0">Selecionar:</span>
            {Object.values(GODUI_CATALOG).map((item) => (
              <button
                key={item.type}
                onClick={() => setSelectedComponentType(item.type)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer",
                  selectedComponentType === item.type
                    ? "bg-white/15 text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {/* Code Viewer */}
        <div className="flex-1 overflow-hidden p-5 flex flex-col">
          <div className="flex-1 overflow-auto rounded-2xl bg-zinc-900/60 border border-white/10 p-4 font-mono text-xs text-zinc-300 leading-relaxed">
            <pre>
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-zinc-900/50 flex items-center justify-between gap-2">
          <div className="text-[11px] sm:text-xs text-zinc-400 font-mono truncate">
            {activeTab === 'full-page' ? 'GodUIPage.tsx' : `${selectedComponentType}.tsx`}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-2.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden xs:inline">{copied ? 'Copiado!' : 'Copiar Código'}</span>
              <span className="xs:hidden">{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-2.5 sm:px-4 py-2 rounded-xl text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:brightness-110"
              style={{ backgroundColor: theme.primary }}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Baixar Arquivo</span>
              <span className="xs:hidden">Baixar</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
