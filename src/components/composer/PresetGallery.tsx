import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { COMPOSITION_PRESETS } from '../../data/compositionPresets';
import { cn } from '../../lib/utils';

export function PresetGallery() {
  const { loadPreset } = useBuilderStore();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return [...new Set(COMPOSITION_PRESETS.map((p) => p.category))];
  }, []);

  const filteredPresets = useMemo(() => {
    let filtered = COMPOSITION_PRESETS;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.namePt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    return filtered;
  }, [search, selectedCategory]);

  return (
    <div className="border-t border-white/5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Upload className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-semibold text-zinc-400">Presets</span>
          <span className="text-[10px] text-zinc-600">{COMPOSITION_PRESETS.length}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar presets..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg pl-7 pr-2 py-1.5 text-[10px] text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'px-1.5 py-0.5 rounded text-[9px] font-medium whitespace-nowrap transition-colors',
                    !selectedCategory
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={cn(
                      'px-1.5 py-0.5 rounded text-[9px] font-medium whitespace-nowrap transition-colors',
                      selectedCategory === cat
                        ? 'bg-white/10 text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => loadPreset(preset.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-left transition-colors group"
                  >
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                      <Upload className="w-3 h-3 text-zinc-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-white font-medium truncate">
                        {preset.namePt || preset.name}
                      </div>
                      <div className="text-[9px] text-zinc-600 truncate">
                        {preset.category} &middot; {preset.baseComponent}
                      </div>
                    </div>
                    <div className="text-[9px] text-zinc-600 shrink-0">
                      {preset.layers.reduce((acc, l) => acc + l.effects.length, 0)} efeitos
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
