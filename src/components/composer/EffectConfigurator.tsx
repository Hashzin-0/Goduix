import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { X, Settings } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { getEffectById } from '../../data/effectRegistry';
import { EffectConfigField } from '../../types/composition';
import { cn } from '../../lib/utils';

interface EffectConfiguratorProps {
  layerId: string;
  effectId: string;
}

export function EffectConfigurator({ layerId, effectId }: EffectConfiguratorProps) {
  const { currentComposition, configureEffect, setComposerConfiguringEffect } = useBuilderStore();
  const [localConfig, setLocalConfig] = useState<Record<string, any>>({});

  const effectModule = getEffectById(effectId);
  const layer = currentComposition?.layers.find((l) => l.layerId === layerId);
  const appliedEffect = layer?.effects.find((e) => e.effectId === effectId);

  if (!effectModule || !appliedEffect) return null;

  const config = { ...effectModule.defaultConfig, ...appliedEffect.config, ...localConfig };

  const handleChange = useCallback(
    (key: string, value: any) => {
      setLocalConfig((prev) => {
        const updated = { ...prev, [key]: value };
        configureEffect(layerId, effectId, updated);
        return updated;
      });
    },
    [layerId, effectId, configureEffect]
  );

  const renderField = (field: EffectConfigField) => {
    const currentValue = config[field.key] ?? field.default;

    switch (field.type) {
      case 'color':
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-medium">{field.label}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={typeof currentValue === 'string' ? currentValue : '#ffffff'}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-7 h-7 rounded border border-white/10 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={currentValue}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="flex-1 bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-cyan-500/50 font-mono"
              />
            </div>
          </div>
        );

      case 'number':
        return (
          <div key={field.key} className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-zinc-400 font-medium">{field.label}</label>
              <span className="text-[10px] text-zinc-600">
                {currentValue}
                {field.unit || ''}
              </span>
            </div>
            <input
              type="number"
              value={currentValue}
              min={field.min}
              max={field.max}
              step={field.step}
              onChange={(e) => handleChange(field.key, parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>
        );

      case 'slider':
        return (
          <div key={field.key} className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-zinc-400 font-medium">{field.label}</label>
              <span className="text-[10px] text-zinc-600">{currentValue}</span>
            </div>
            <input
              type="range"
              value={currentValue}
              min={field.min ?? 0}
              max={field.max ?? 1}
              step={field.step ?? 0.01}
              onChange={(e) => handleChange(field.key, parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-medium">{field.label}</label>
            <select
              value={currentValue}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-cyan-500/50"
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'boolean':
        return (
          <div key={field.key} className="flex items-center justify-between">
            <label className="text-[10px] text-zinc-400 font-medium">{field.label}</label>
            <button
              onClick={() => handleChange(field.key, !currentValue)}
              className={cn(
                'w-8 h-4.5 rounded-full transition-colors relative',
                currentValue ? 'bg-cyan-500' : 'bg-zinc-700'
              )}
            >
              <motion.div
                animate={{ x: currentValue ? 16 : 2 }}
                className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm"
              />
            </button>
          </div>
        );

      case 'text':
        return (
          <div key={field.key} className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-medium">{field.label}</label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-cyan-500/50"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="border-t border-white/5 bg-zinc-900/80 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Settings className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold text-white">
            {effectModule.namePt || effectModule.name}
          </span>
        </div>
        <button
          onClick={() => setComposerConfiguringEffect(null)}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>

      <div className="px-4 py-3 space-y-3 max-h-48 overflow-y-auto">
        {effectModule.descriptionPt && (
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            {effectModule.descriptionPt}
          </p>
        )}
        {effectModule.configSchema.map(renderField)}
      </div>
    </motion.div>
  );
}
