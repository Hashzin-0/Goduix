import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Palette } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { DEFAULT_TOKENS } from '../../engine/tokens';
import { TokenCategory, DesignToken } from '../../types/composition';
import { cn } from '../../lib/utils';

const TOKEN_CATEGORIES: { id: TokenCategory; label: string; labelPt: string }[] = [
  { id: 'spacing', label: 'Spacing', labelPt: 'Espaçamento' },
  { id: 'radius', label: 'Radius', labelPt: 'Raio' },
  { id: 'duration', label: 'Duration', labelPt: 'Duração' },
  { id: 'easing', label: 'Easing', labelPt: 'Curva' },
  { id: 'color', label: 'Color', labelPt: 'Cor' },
  { id: 'shadow', label: 'Shadow', labelPt: 'Sombra' },
  { id: 'border', label: 'Border', labelPt: 'Borda' },
  { id: 'typography', label: 'Typography', labelPt: 'Tipografia' },
];

const QUICK_PRESETS: Record<string, Partial<DesignToken>[]> = {
  spacing: [
    { key: 'gap-sm', value: 4, unit: 'px', labelPt: 'Gap Pequeno' },
    { key: 'gap-md', value: 8, unit: 'px', labelPt: 'Gap Médio' },
    { key: 'gap-lg', value: 16, unit: 'px', labelPt: 'Gap Grande' },
  ],
  radius: [
    { key: 'radius-sm', value: 4, unit: 'px', labelPt: 'Raio Pequeno' },
    { key: 'radius-md', value: 8, unit: 'px', labelPt: 'Raio Médio' },
    { key: 'radius-lg', value: 16, unit: 'px', labelPt: 'Raio Grande' },
    { key: 'radius-full', value: 9999, unit: 'px', labelPt: 'Raio Total' },
  ],
  duration: [
    { key: 'duration-fast', value: 150, unit: 'ms', labelPt: 'Rápido' },
    { key: 'duration-normal', value: 300, unit: 'ms', labelPt: 'Normal' },
    { key: 'duration-slow', value: 500, unit: 'ms', labelPt: 'Lento' },
  ],
  color: [
    { key: 'primary-color', value: '#3b82f6', labelPt: 'Cor Primária' },
    { key: 'accent-color', value: '#8b5cf6', labelPt: 'Cor de Destaque' },
    { key: 'bg-color', value: '#0a0a0f', labelPt: 'Cor de Fundo' },
  ],
};

export function TokenEditor() {
  const { currentComposition, setToken, removeToken } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState<TokenCategory | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTokenKey, setNewTokenKey] = useState('');
  const [newTokenValue, setNewTokenValue] = useState('');
  const [newTokenCategory, setNewTokenCategory] = useState<TokenCategory>('spacing');

  if (!currentComposition) {
    return (
      <div className="p-4 text-center text-xs text-zinc-500">
        Nenhuma composição ativa
      </div>
    );
  }

  const tokens = currentComposition.tokens;

  const groupedTokens: Record<string, DesignToken[]> = {};
  for (const token of tokens) {
    if (!groupedTokens[token.category]) groupedTokens[token.category] = [];
    groupedTokens[token.category].push(token);
  }

  const handleAddToken = () => {
    if (!newTokenKey.trim()) return;
    const existing = DEFAULT_TOKENS.find((t) => t.key === newTokenKey);
    setToken(newTokenKey, newTokenValue || existing?.value || '');
    setNewTokenKey('');
    setNewTokenValue('');
    setShowAddForm(false);
  };

  const handleAddPresetToken = (preset: Partial<DesignToken>) => {
    if (!preset.key) return;
    setToken(preset.key, preset.value ?? '');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Design Tokens
          </span>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors',
            !selectedCategory
              ? 'bg-white/10 text-white'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
          )}
        >
          Todos
        </button>
        {TOKEN_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={cn(
              'px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors',
              selectedCategory === cat.id
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            )}
          >
            {cat.labelPt}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-zinc-800/50 border border-white/5 rounded-lg p-2.5 space-y-2">
              <div className="flex gap-2">
                <input
                  value={newTokenKey}
                  onChange={(e) => setNewTokenKey(e.target.value)}
                  placeholder="Chave (ex: radius)"
                  className="flex-1 bg-zinc-900 border border-white/10 rounded px-2 py-1 text-[10px] text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                />
                <input
                  value={newTokenValue}
                  onChange={(e) => setNewTokenValue(e.target.value)}
                  placeholder="Valor"
                  className="flex-1 bg-zinc-900 border border-white/10 rounded px-2 py-1 text-[10px] text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={newTokenCategory}
                  onChange={(e) => setNewTokenCategory(e.target.value as TokenCategory)}
                  className="flex-1 bg-zinc-900 border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none"
                >
                  {TOKEN_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.labelPt}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddToken}
                  disabled={!newTokenKey.trim()}
                  className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-zinc-950 text-[10px] font-semibold transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {TOKEN_CATEGORIES.filter(
          (cat) => !selectedCategory || cat.id === selectedCategory
        ).map((cat) => {
          const catTokens = groupedTokens[cat.id] || [];
          const presets = QUICK_PRESETS[cat.id] || [];
          const unappliedPresets = presets.filter(
            (p) => !catTokens.some((t) => t.key === p.key)
          );

          return (
            <div key={cat.id}>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider px-1 mb-1">
                {cat.labelPt}
              </div>
              <div className="space-y-0.5">
                {catTokens.map((token) => (
                  <div
                    key={token.key}
                    className="flex items-center gap-2 px-2 py-1.5 rounded bg-zinc-800/30 border border-white/5 group"
                  >
                    <span className="text-[10px] text-zinc-400 font-mono flex-1 truncate">
                      {token.key}
                    </span>
                    <input
                      value={token.value}
                      onChange={(e) => setToken(token.key, e.target.value)}
                      className="w-20 bg-zinc-900 border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-white text-right outline-none focus:border-cyan-500/50 font-mono"
                    />
                    <span className="text-[10px] text-zinc-600 w-6">{token.unit || ''}</span>
                    <button
                      onClick={() => removeToken(token.key)}
                      className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-2.5 h-2.5 text-zinc-500 hover:text-red-400" />
                    </button>
                  </div>
                ))}

                {unappliedPresets.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {unappliedPresets.map((preset) => (
                      <button
                        key={preset.key}
                        onClick={() => handleAddPresetToken(preset)}
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-dashed border-white/10 hover:border-cyan-500/30 text-[9px] text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <Plus className="w-2 h-2" />
                        {preset.labelPt || preset.key}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {tokens.length === 0 && (
        <div className="text-center py-4 text-[10px] text-zinc-600">
          Nenhum token definido. Adicione tokens para customizar a composição.
        </div>
      )}
    </div>
  );
}
