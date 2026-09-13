import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  BookOpen, 
  Sparkles, 
  Terminal, 
  Check, 
  Copy, 
  ExternalLink, 
  X, 
  Info,
  Maximize2,
  Sliders
} from 'lucide-react';
import { GodUIComponentType, BuilderComponentInstance } from '../../types/builder';
import { GODUI_CATALOG } from '../../data/goduiCatalog';
import { THEMES } from '../../data/themes';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ComponentRenderer } from './ComponentRenderer';
import { cn } from '../../lib/utils';

interface ComponentHoverPopoverProps {
  componentType: GodUIComponentType | null;
  anchorRect: DOMRect | null;
  onClose: () => void;
  onAdd: (type: GodUIComponentType) => void;
  onViewDocs: (type: GodUIComponentType) => void;
  isMobileModal?: boolean;
}

export const ComponentHoverPopover: React.FC<ComponentHoverPopoverProps> = ({
  componentType,
  anchorRect,
  onClose,
  onAdd,
  onViewDocs,
  isMobileModal = false,
}) => {
  const store = useBuilderStore();
  const theme = THEMES[store.theme] || THEMES['godly-cyan'];
  const popoverRef = useRef<HTMLDivElement>(null);
  const [copiedCli, setCopiedCli] = useState(false);

  if (!componentType) return null;
  const meta = GODUI_CATALOG[componentType];
  if (!meta) return null;

  // Create an isolated sample instance for live preview rendering
  const sampleInstance: BuilderComponentInstance = {
    id: `preview-sample-${componentType}`,
    type: componentType,
    name: meta.name,
    props: { ...meta.defaultProps },
    isVisible: true,
  };

  const cliCommand = `npx godui add ${meta.registryName}`;

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  // Calculate coordinates for desktop popover to stay within viewport bounds
  let topPosition = 80;
  let leftPosition = 330;

  if (anchorRect && typeof window !== 'undefined') {
    const popoverHeight = 440;
    const windowHeight = window.innerHeight;
    const centerTargetY = anchorRect.top + anchorRect.height / 2;

    // Ideal vertical center aligned with the hovered item
    let calculatedTop = centerTargetY - popoverHeight / 2;

    // Constrain within screen margins
    if (calculatedTop < 70) calculatedTop = 70;
    if (calculatedTop + popoverHeight > windowHeight - 20) {
      calculatedTop = windowHeight - popoverHeight - 20;
    }

    topPosition = calculatedTop;
    leftPosition = Math.min(anchorRect.right + 14, window.innerWidth - 440);
  }

  // Mobile Bottom Sheet / Modal View
  if (isMobileModal) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-lg max-h-[85vh] bg-zinc-950/95 border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Mobile Sheet Drag Indicator */}
            <div className="sm:hidden w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5" />

            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-2.5 truncate">
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse"
                  style={{ backgroundColor: theme.primary }}
                />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">{meta.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                      {meta.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">godui.design/{meta.registryName}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Render Stage */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="relative rounded-2xl border border-white/10 bg-zinc-950 p-4 min-h-[190px] flex items-center justify-center overflow-hidden">
                {/* Stage Ambient Glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 w-full overflow-hidden flex items-center justify-center">
                  <ComponentRenderer
                    instance={sampleInstance}
                    index={0}
                    total={1}
                    isInteractiveOnly={true}
                  />
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {meta.description}
              </p>

              {/* CLI Command */}
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-300">
                <span className="truncate">{cliCommand}</span>
                <button
                  onClick={handleCopyCli}
                  className="ml-2 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCli ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-3.5 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onClose();
                  onViewDocs(componentType);
                }}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ver Docs</span>
              </button>

              <button
                onClick={() => {
                  onAdd(componentType);
                  onClose();
                }}
                className="flex-1 py-2 px-4 rounded-xl text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar ao Canvas</span>
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // Desktop Floating Popover
  return (
    <motion.div
      ref={popoverRef}
      initial={{ opacity: 0, scale: 0.94, x: -8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.94, x: -8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{
        top: `${topPosition}px`,
        left: `${leftPosition}px`,
      }}
      className="fixed z-50 w-96 rounded-3xl bg-zinc-950/95 border border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col pointer-events-auto"
      onMouseEnter={(e) => e.stopPropagation()}
    >
      {/* Popover Header */}
      <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-2.5 truncate">
          <div
            className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse shrink-0"
            style={{ backgroundColor: theme.primary }}
          />
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight truncate">
                {meta.name}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-zinc-300 shrink-0">
                {meta.badge}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              Live Preview
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
          godui.design
        </span>
      </div>

      {/* Interactive Render Stage */}
      <div className="p-3">
        <div className="relative rounded-2xl border border-white/10 bg-zinc-900/60 p-3 min-h-[170px] max-h-[220px] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Background Ambient Radial */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 70%)`,
            }}
          />

          {/* Blueprint subtle grid overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Actual Interactive Live Component Instance */}
          <div className="relative z-10 w-full overflow-hidden flex items-center justify-center py-2">
            <ComponentRenderer
              instance={sampleInstance}
              index={0}
              total={1}
              isInteractiveOnly={true}
            />
          </div>
        </div>
      </div>

      {/* Component Meta & Info */}
      <div className="px-3.5 pb-3 space-y-2">
        <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
          {meta.description}
        </p>

        {/* CLI Snippet */}
        <div className="p-2 rounded-xl bg-zinc-900/90 border border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-300">
          <div className="flex items-center gap-1.5 truncate">
            <Terminal className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{cliCommand}</span>
          </div>
          <button
            onClick={handleCopyCli}
            className="ml-2 px-1.5 py-0.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
            title="Copiar comando CLI"
          >
            {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Props badges preview */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
          <span className="text-[9px] font-mono text-zinc-500 uppercase shrink-0">Props:</span>
          {meta.propFields.slice(0, 3).map((f) => (
            <span
              key={f.key}
              className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[9px] font-mono text-zinc-400 whitespace-nowrap"
            >
              {f.key}
            </span>
          ))}
          {meta.propFields.length > 3 && (
            <span className="text-[9px] font-mono text-zinc-500">
              +{meta.propFields.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDocs(componentType)}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Docs</span>
        </button>

        <button
          onClick={() => onAdd(componentType)}
          className="flex-1 py-1.5 px-3 rounded-xl text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all cursor-pointer"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Adicionar ao Canvas</span>
        </button>
      </div>
    </motion.div>
  );
};
