import type { BuilderComponentInstance, GodUIComponentType, PropFieldSchema } from '../types/builder';
import { GODUI_CATALOG } from '../data/goduiCatalog';

export type MergeRegion =
  | 'interactive-items' | 'item-surface' | 'item-content' | 'icons'
  | 'background' | 'border' | 'top-edge' | 'bottom-edge'
  | 'before-glow' | 'after-shine' | 'typography' | 'whole-component';

export type MergeOperationKind = 'copy-prop' | 'visual-effect';
export interface MergeCandidate {
  id: string;
  label: string;
  sourceKey: string;
  sourceValue: unknown;
  region: MergeRegion;
  kind: MergeOperationKind;
  confidence: number;
  reason: string;
  destructive: boolean;
}
export interface MergePlan {
  sourceId: string;
  targetId: string;
  candidates: MergeCandidate[];
  warnings: string[];
}
const LABELS: Record<MergeRegion, string> = {
  'interactive-items': 'Todos os itens interativos',
  'item-surface': 'Superfície dos itens / teclas',
  'item-content': 'Conteúdo dos itens',
  icons: 'Ícones e glifos',
  background: 'Fundo do componente',
  border: 'Borda externa',
  'top-edge': 'Borda superior',
  'bottom-edge': 'Borda inferior',
  'before-glow': 'Aura luminosa atrás do elemento',
  'after-shine': 'Shimmer / feixe de luz',
  typography: 'Tipografia',
  'whole-component': 'Componente inteiro',
};
const VISUAL_KEYS = /color|colour|background|gradient|shimmer|glow|shadow|border|radius|blur|opacity|intensity|variant|size|font|stroke|shine/i;
const BEHAVIOR_KEYS = /on[A-Z]|action|href|url|click|submit|value|items|options|data|children|label|text|title/i;
const KEYBOARD_TYPES = new Set<string>(['hairline-keyboard']);
const BUTTON_TYPES = new Set<string>(['shimmer-button', 'magic-button', 'jelly-button', 'liquid-glass-button', 'magnetic-button', 'hold-confirm-button', 'progress-fold-button', 'slide-confirm-button']);
const hasField = (type: GodUIComponentType, key: string): boolean =>
  (GODUI_CATALOG[type]?.propFields ?? []).some((field: PropFieldSchema) => field.key === key);

function regionsFor(source: BuilderComponentInstance, target: BuilderComponentInstance, key: string): Array<{region: MergeRegion; confidence: number; reason: string}> {
  const isButton = BUTTON_TYPES.has(source.type);
  const isKeyboard = KEYBOARD_TYPES.has(target.type);
  if (isKeyboard && isButton) {
    if (/shimmer|shine/i.test(key)) return [
      { region: 'item-surface', confidence: 0.98, reason: 'O teclado contém teclas repetidas; aplicar o efeito às superfícies preserva a estrutura do teclado.' },
      { region: 'icons', confidence: 0.84, reason: 'Alternativa: estilizar somente os glifos das teclas, se o adaptador do componente suportar esse alvo.' },
      { region: 'after-shine', confidence: 0.76, reason: 'Alternativa: feixe luminoso na camada externa, sem substituir as teclas.' },
      { region: 'top-edge', confidence: 0.65, reason: 'Alternativa localizada na borda superior.' },
      { region: 'bottom-edge', confidence: 0.65, reason: 'Alternativa localizada na borda inferior.' },
    ];
    return [
      { region: 'interactive-items', confidence: 0.96, reason: 'Um botão doador pode sugerir o estilo de cada tecla, sem substituir a geometria do teclado.' },
      { region: 'item-surface', confidence: 0.91, reason: 'Aplicar apenas o acabamento visual às superfícies das teclas.' },
      { region: 'before-glow', confidence: 0.72, reason: 'Aplicar apenas a aura atrás do teclado.' },
    ];
  }
  if (/icon/i.test(key)) return [{ region: 'icons', confidence: 0.85, reason: 'A propriedade aparenta ser relacionada a ícones.' }];
  if (/shimmer|shine/i.test(key)) return [
    { region: 'after-shine', confidence: 0.9, reason: 'A propriedade corresponde a brilho ou shimmer.' },
    { region: 'interactive-items', confidence: 0.75, reason: 'Aplicar o efeito em todos os itens interativos, se suportado.' },
  ];
  if (/glow/i.test(key)) return [{ region: 'before-glow', confidence: 0.9, reason: 'A propriedade corresponde a uma aura luminosa.' }];
  if (/border|stroke/i.test(key)) return [{ region: 'border', confidence: 0.85, reason: 'A propriedade corresponde a contorno.' }];
  if (/background|gradient/i.test(key)) return [{ region: 'background', confidence: 0.86, reason: 'A propriedade corresponde à superfície de fundo.' }];
  if (/font|text|title|label/i.test(key)) return [{ region: 'typography', confidence: 0.68, reason: 'A propriedade pode afetar a tipografia; requer confirmação.' }];
  return [{ region: 'whole-component', confidence: 0.4, reason: 'Não há mapeamento semântico específico; revisar antes de aplicar.' }];
}

export function planSemanticMerge(source: BuilderComponentInstance, target: BuilderComponentInstance): MergePlan {
  const warnings: string[] = [];
  const candidates: MergeCandidate[] = [];
  const sourceMeta = GODUI_CATALOG[source.type];
  const targetMeta = GODUI_CATALOG[target.type];
  if (!sourceMeta || !targetMeta) return { sourceId: source.id, targetId: target.id, candidates: [], warnings: ['Componente sem metadados de catálogo: mesclagem bloqueada.'] };

  for (const [key, value] of Object.entries(source.props ?? {})) {
    if (value === undefined || value === null || typeof value === 'function') continue;
    const sourceField = sourceMeta.propFields.find((field: PropFieldSchema) => field.key === key);
    if (!sourceField) continue;
    const visual = VISUAL_KEYS.test(key);
    const behavior = BEHAVIOR_KEYS.test(key) && !visual;
    if (behavior) {
      warnings.push(`“${sourceField.label}” parece conteúdo ou comportamento; não será copiado automaticamente.`);
      continue;
    }
    if (!visual) continue;
    const matching = hasField(target.type, key);
    const mapped = regionsFor(source, target, key);
    for (const destination of mapped) {
      candidates.push({
        id: `${key}:${destination.region}`,
        label: `${sourceField.label} → ${LABELS[destination.region]}`,
        sourceKey: key,
        sourceValue: value,
        region: destination.region,
        kind: /shimmer|shine|glow/i.test(key) ? 'visual-effect' : 'copy-prop',
        confidence: Math.min(0.99, destination.confidence + (matching ? 0.03 : 0)),
        reason: destination.reason + (matching ? ' A propriedade também existe no catálogo do destino.' : ' A propriedade não existe diretamente no catálogo do destino; só pode ser aplicada por adaptador de região compatível.'),
        destructive: destination.region === 'whole-component',
      });
    }
  }
  if (!candidates.length) warnings.push('Nenhuma propriedade visual segura foi identificada. O componente original será mantido intacto.');
  return { sourceId: source.id, targetId: target.id, candidates: candidates.sort((a,b) => b.confidence-a.confidence), warnings: [...new Set(warnings)] };
}

export function validateSemanticMerge(plan: MergePlan, selectedIds: string[]): string[] {
  const errors: string[] = [];
  const selected = plan.candidates.filter(candidate => selectedIds.includes(candidate.id));
  const writes = new Set<string>();
  for (const candidate of selected) {
    const key = `${candidate.region}:${candidate.sourceKey}`;
    if (writes.has(key)) errors.push(`Conflito: a propriedade ${candidate.sourceKey} foi selecionada mais de uma vez para ${candidate.region}.`);
    writes.add(key);
    if (candidate.destructive) errors.push('Aplicação ao componente inteiro exige uma ação explícita de substituição; operação bloqueada por segurança.');
  }
  if (selected.some(candidate => candidate.kind === 'copy-prop' && typeof candidate.sourceValue === 'object')) errors.push('Objetos complexos não são copiados sem um adaptador específico.');
  return errors;
}

export function getMergeRegionLabel(region: MergeRegion): string { return LABELS[region]; }
