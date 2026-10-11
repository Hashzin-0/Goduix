import type { BuilderComponentInstance, PropFieldSchema } from '../types/builder';
import { GODUI_CATALOG } from '../data/goduiCatalog';
import type { MergeCandidate, MergePlan, MergeRegion } from './semanticMergePlanner';

const LABELS: Record<MergeRegion, string> = {
  'interactive-items': 'Itens interativos', 'item-surface': 'Superfície dos itens', 'item-content': 'Conteúdo dos itens',
  icons: 'Ícones', background: 'Fundo', border: 'Borda', 'top-edge': 'Borda superior', 'bottom-edge': 'Borda inferior',
  'before-glow': 'Aura atrás do elemento', 'after-shine': 'Shimmer', typography: 'Tipografia', 'whole-component': 'Componente inteiro'
};
const VISUAL = /color|colour|background|gradient|shimmer|glow|shadow|border|radius|blur|opacity|intensity|variant|size|font|stroke|shine/i;
const REGION_KEY = (key: string): MergeRegion | null => {
  if (/shimmer|shine/i.test(key)) return 'after-shine';
  if (/glow/i.test(key)) return 'before-glow';
  if (/border|stroke/i.test(key)) return 'border';
  if (/background|gradient/i.test(key)) return 'background';
  if (/font/i.test(key)) return 'typography';
  return null;
};
export function planSupportedSemanticMerge(source: BuilderComponentInstance, target: BuilderComponentInstance): MergePlan {
  const sourceMeta = GODUI_CATALOG[source.type];
  const targetMeta = GODUI_CATALOG[target.type];
  const warnings: string[] = [];
  const candidates: MergeCandidate[] = [];
  if (!sourceMeta || !targetMeta) return { sourceId: source.id, targetId: target.id, candidates, warnings: ['Componente sem metadados; nenhuma opção de mesclagem será exibida.'] };
  const targetFields = new Map(targetMeta.propFields.map((field: PropFieldSchema) => [field.key, field]));
  for (const [key, value] of Object.entries(source.props ?? {})) {
    if (value == null || typeof value === 'function' || !VISUAL.test(key)) continue;
    const field = sourceMeta.propFields.find((item: PropFieldSchema) => item.key === key);
    const targetField = targetFields.get(key);
    // Only expose a choice if the destination has a real, catalogued prop to render it.
    if (!field || !targetField || typeof value === 'object') continue;
    const region = REGION_KEY(key);
    // A catalogued prop alone is not enough: omit it unless it maps to a supported visual region.
    if (!region) continue;
    candidates.push({
      id: key + ':' + region, label: field.label + ' → ' + (targetField.label || LABELS[region]),
      sourceKey: key, sourceValue: value, region, kind: 'copy-prop',
      confidence: 0.99, reason: 'A propriedade existe no catálogo do componente de destino e pode ser aplicada sem modificar a sua estrutura.',
      destructive: false
    });
  }
  if (!candidates.length) warnings.push('Nenhuma propriedade compatível e renderizável foi encontrada. Opções sem adaptador real foram omitidas.');
  return { sourceId: source.id, targetId: target.id, candidates, warnings };
}
