import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  BookOpen, 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { THEMES } from '../../data/themes';

export const ComponentDocsModal: React.FC = () => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const inspectingType = store.inspectingDocType;
  if (!inspectingType) return null;

  const meta = GODUI_CATALOG[inspectingType];
  if (!meta) return null;

  const cliCommand = `npx godui add ${meta.registryName}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(meta.sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/15 text-white shadow-2xl overflow-hidden mx-2 sm:mx-0"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2.5 sm:gap-3 truncate">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-zinc-950 font-bold shadow-md shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">{meta.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 shrink-0">
                  {meta.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 truncate">{meta.description}</p>
            </div>
          </div>

          <button
            onClick={() => store.setInspectingDocType(null)}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* CLI Installation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Instalação via GodUI CLI / Registry
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/10 font-mono text-xs text-zinc-200">
              <span className="truncate">{cliCommand}</span>
              <button
                onClick={handleCopyCli}
                className="ml-3 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Dependencies */}
          <div className="space-y-2">
            <span className="text-xs text-zinc-400 font-medium block">
              Dependências Necessárias
            </span>
            <div className="flex flex-wrap gap-1.5">
              {meta.dependencies.map((dep) => (
                <span
                  key={dep}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {dep}
                </span>
              ))}
            </div>
          </div>

          {/* Props Schema Table */}
          <div className="space-y-2">
            <span className="text-xs text-zinc-400 font-medium block">
              Propriedades & Tipagem (Props Schema)
            </span>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/50">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono">
                    <th className="p-3">Prop</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Padrão</th>
                    <th className="p-3">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
                  {meta.propFields.map((f) => (
                    <tr key={f.key} className="hover:bg-white/[0.02]">
                      <td className="p-3 text-cyan-400 font-bold">{f.key}</td>
                      <td className="p-3 text-zinc-400">{f.type}</td>
                      <td className="p-3 text-zinc-400">{String(f.defaultValue)}</td>
                      <td className="p-3 font-sans text-zinc-400">{f.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Raw Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 text-zinc-300">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Código Fonte do Componente (React + Tailwind)
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copiado para o Clipboard!' : 'Copiar Código'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-300 overflow-x-auto max-h-72">
              <code>{meta.sampleCode}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-zinc-900/50 flex items-center justify-between gap-2">
          <span className="text-[11px] sm:text-xs text-zinc-400 truncate">
            React 19, Motion v12 e Tailwind v4.
          </span>
          <button
            onClick={() => {
              store.addComponent(inspectingType);
              store.setInspectingDocType(null);
              store.setMobileTab('canvas');
            }}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 hover:brightness-110 transition-all cursor-pointer shrink-0 shadow-lg"
            style={{ backgroundColor: theme.primary }}
          >
            Adicionar ao Canvas
          </button>
        </div>
      </motion.div>
    </div>
  );
};
