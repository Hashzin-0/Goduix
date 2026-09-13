import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Download, Code2, Terminal, Layers, ShieldCheck, FileText } from 'lucide-react';
import { ComposerConfig } from '../../types';
import { THEMES } from '../../data/themes';
import { cn } from '../../lib/utils';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ComposerConfig;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [activeTab, setActiveTab] = useState<'composite' | 'individual' | 'install' | 'architecture'>('composite');
  const [selectedIndividual, setSelectedIndividual] = useState<'header' | 'button' | 'inset' | 'tilt' | 'glow' | 'mesh'>('header');
  const [copied, setCopied] = useState(false);

  const theme = THEMES[config.theme] || THEMES['godly-cyan'];

  if (!isOpen) return null;

  // Generate dynamic self-contained React + Tailwind code based on active components
  const generateCompositeCode = () => {
    return `// =========================================================================
// GodUI Composite Component - React + Tailwind CSS v4 + Motion
// Gerado pelo GodUI Component Composer (Zero CSS Conflict)
// =========================================================================

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowUpRight, Box, Cpu, Zap, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GodUIComposite() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronização matemática do Glow com a rolagem do usuário
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    setScrollProgress(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
  };

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30 font-sans">
      
      {/* Scroll-Reactive Glow Beam */}
      <div className="fixed top-0 inset-x-0 h-[2px] bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: \`\${Math.max(5, scrollProgress * 100)}%\`,
            backgroundColor: '${theme.primary}',
            boxShadow: '0 0 16px 2px ${theme.primary}',
          }}
        />
      </div>

      {/* Interactive Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative w-full h-screen overflow-y-auto overflow-x-hidden"
      >
        {/* Dynamic Island Floating Header */}
        <header className="sticky top-4 z-40 flex justify-center w-full px-4 pointer-events-none">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{ backdropFilter: 'blur(${config.floatingIsland.blurAmount}px)' }}
            className="pointer-events-auto relative flex items-center justify-between px-6 py-2.5 rounded-full border border-white/10 bg-zinc-950/80 shadow-2xl max-w-3xl w-full"
          >
            {/* Specular Highlight */}
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-white/15">
                <Sparkles className="w-4 h-4 text-zinc-200" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-white">
                ${config.floatingIsland.title}
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-400">
              <span className="text-white hover:text-white px-3 py-1 rounded-full bg-white/10">Overview</span>
              <span className="hover:text-white px-3 py-1 transition-colors cursor-pointer">Components</span>
              <span className="hover:text-white px-3 py-1 transition-colors cursor-pointer">Playground</span>
            </nav>

            <button
              className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full border border-white/20 bg-white/10 text-white shadow-md hover:scale-105 transition-transform"
              style={{ boxShadow: '0 0 15px -3px ${theme.glow}' }}
            >
              Explorar <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </motion.div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 px-6 pt-16 pb-12 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Aurora Text Effect */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient} animate-pulse">
              Componentes Fluidos Sem Conflito
            </span>
          </h1>

          <p className="text-zinc-400 max-w-xl text-base mb-8">
            Combinando ilha dinâmica, botões de vidro líquido com refração interna e superfícies inset profundas.
          </p>

          {/* Liquid Glass Button */}
          <button
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-zinc-900/50 backdrop-blur-md text-sm font-semibold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            style={{
              boxShadow: '0 8px 24px -6px ${theme.glow}, inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
            }}
          >
            <Sparkles className="w-4 h-4 text-zinc-200" />
            <span>${config.liquidGlass.label}</span>
          </button>
        </section>

        {/* Inset Bento Surface */}
        <section className="relative z-10 px-6 pb-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl p-7 bg-zinc-950/80 border border-white/10 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.18),inset_0_-2px_4px_0_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-2">Superfície Inset GodUI</h3>
            <p className="text-sm text-zinc-400">
              Profundidade física com chanfro negativo e ausência total de colisão de seletores CSS.
            </p>
          </div>

          <div className="md:col-span-1 rounded-2xl p-7 bg-zinc-950/80 border border-white/10 shadow-xl backdrop-blur-xl">
            <h4 className="text-lg font-bold text-white mb-2">3D Perspective</h4>
            <p className="text-xs text-zinc-400">Giroscópio suave com aceleração spring.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCompositeCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const code = generateCompositeCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GodUIComposite.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">
                Exportar Código React & Tailwind
              </h3>
              <p className="text-[11px] text-zinc-400">
                Código limpo, auto-contido e com garantia de zero conflito CSS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-zinc-200 border border-white/10 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              onClick={downloadFile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-semibold text-zinc-950 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar .tsx</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center px-6 border-b border-white/10 gap-2 text-xs font-medium bg-zinc-900/30">
          <button
            onClick={() => setActiveTab('composite')}
            className={cn(
              "px-3 py-2.5 border-b-2 transition-colors flex items-center gap-1.5",
              activeTab === 'composite'
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Componente Composto (.tsx)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={cn(
              "px-3 py-2.5 border-b-2 transition-colors flex items-center gap-1.5",
              activeTab === 'architecture'
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            )}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Conflito CSS</span>
          </button>

          <button
            onClick={() => setActiveTab('install')}
            className={cn(
              "px-3 py-2.5 border-b-2 transition-colors flex items-center gap-1.5",
              activeTab === 'install'
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Dependências</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-xs text-zinc-300 bg-zinc-950/70">
          {activeTab === 'composite' && (
            <pre className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 overflow-x-auto whitespace-pre leading-relaxed text-zinc-200 selection:bg-cyan-500/40">
              <code>{generateCompositeCode()}</code>
            </pre>
          )}

          {activeTab === 'architecture' && (
            <div className="font-sans space-y-4 text-zinc-300 text-xs leading-relaxed max-w-2xl">
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> Como o código garante zero conflito:
                </h4>
                <p className="text-xs opacity-90">
                  Os componentes foram modelados seguindo o padrão de isolamento atômico do GodUI e shadcn registry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 space-y-1.5">
                  <h5 className="font-semibold text-white">1. Classes Scoped via Tailwind</h5>
                  <p className="text-[11px] text-zinc-400">
                    Nenhum seletor CSS global (como `header`, `button` ou classes genéricas) é injetado. Toda a estilização reside em classes utilitárias explícitas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 space-y-1.5">
                  <h5 className="font-semibold text-white">2. Mesclagem Segura com `cn()`</h5>
                  <p className="text-[11px] text-zinc-400">
                    Utilização de `clsx` e `tailwind-merge` que previne duplicidades ou colisões de valores como `px-4` vs `px-6`.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 space-y-1.5">
                  <h5 className="font-semibold text-white">3. Camadas Z-Index & 3D</h5>
                  <p className="text-[11px] text-zinc-400">
                    O WebGL 3D do Three.js roda em canvas transparente com `pointer-events-none` ao fundo, permitindo que a camada 2D do Motion responda a cliques e hovers perfeitamente.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 space-y-1.5">
                  <h5 className="font-semibold text-white">4. Sombras Inset Isoladas</h5>
                  <p className="text-[11px] text-zinc-400">
                    A profundidade inset utiliza sombras direcionadas internamente sem expandir a caixa dimensional ou causar reflows no layout.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'install' && (
            <div className="font-sans space-y-4 text-xs">
              <div>
                <span className="font-semibold text-zinc-200 block mb-1">
                  1. Pacotes NPM necessários:
                </span>
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 font-mono text-cyan-300 flex items-center justify-between">
                  <span>npm install motion lucide-react three clsx tailwind-merge</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("npm install motion lucide-react three clsx tailwind-merge");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="font-semibold text-zinc-200 block mb-1">
                  2. Tipos TypeScript (devDependencies):
                </span>
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 font-mono text-zinc-300 flex items-center justify-between">
                  <span>npm install -D @types/three</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-zinc-200 block mb-1">
                  3. Tailwind CSS v4:
                </span>
                <p className="text-zinc-400 text-[11px] mb-2">
                  No seu arquivo CSS principal (ex: `index.css`), certifique-se de ter apenas:
                </p>
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 font-mono text-emerald-400">
                  @import "tailwindcss";
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
