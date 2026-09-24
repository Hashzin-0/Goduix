import {
  ComposedComponent,
  ComposedLayer,
  ExportResult,
  ExportFormat,
  DesignToken,
  ResolvedLayer,
  ResolvedEffect,
  EffectModule,
} from '../types/composition';

export type { ExportFormat };
import { mergeEngine } from './mergeEngine';
import { COMPONENT_REGISTRY } from '../data/componentRegistry';
import { getEffectById, EFFECT_REGISTRY } from '../data/effectRegistry';
import { getTokenWithUnit, DEFAULT_TOKENS } from './tokens';
import { cn } from '../lib/utils';

// ============================================================
// EFFECT IMPORT MAP
// Maps effect IDs to their relative import paths within the engine
// ============================================================

const EFFECT_IMPORT_PATHS: Record<string, string> = {
  'bg-glass': 'effects/backgrounds/GlassEffect',
  'bg-gradient': 'effects/backgrounds/GradientEffect',
  'bg-mesh': 'effects/backgrounds/MeshEffect',
  'bg-noise': 'effects/backgrounds/NoiseEffect',
  'bg-grid': 'effects/backgrounds/GridEffect',
  'bg-aurora': 'effects/backgrounds/AuroraEffect',
  'bg-mesh-gradient': 'effects/backgrounds/MeshGradientEffect',
  'bg-solid': 'effects/backgrounds/SolidEffect',
  'bg-blur': 'effects/backgrounds/BlurEffect',
  'border-neon': 'effects/borders/NeonBorderEffect',
  'border-gradient': 'effects/borders/GradientBorderEffect',
  'border-animated': 'effects/borders/AnimatedBorderEffect',
  'border-beam': 'effects/borders/BeamBorderEffect',
  'border-rainbow': 'effects/borders/RainbowBorderEffect',
  'border-dashed': 'effects/borders/DashedBorderEffect',
  'border-glow': 'effects/borders/GlowBorderEffect',
  'shadow-soft': 'effects/shadows/SoftShadowEffect',
  'shadow-neon': 'effects/shadows/NeonShadowEffect',
  'shadow-deep': 'effects/shadows/DeepShadowEffect',
  'shadow-glow': 'effects/shadows/GlowShadowEffect',
  'shadow-inset': 'effects/shadows/InsetShadowEffect',
  'hover-tilt-3d': 'effects/hovers/Tilt3DEffect',
  'hover-scale': 'effects/hovers/ScaleEffect',
  'hover-glow': 'effects/hovers/GlowEffect',
  'hover-magnetic': 'effects/hovers/MagneticEffect',
  'hover-lift': 'effects/hovers/LiftEffect',
  'hover-shine': 'effects/hovers/ShineEffect',
  'hover-float': 'effects/hovers/FloatEffect',
  'hover-rotate': 'effects/hovers/RotateEffect',
  'click-ripple': 'effects/clicks/RippleEffect',
  'click-bounce': 'effects/clicks/BounceEffect',
  'click-pulse': 'effects/clicks/PulseEffect',
  'click-press': 'effects/clicks/PressEffect',
  'click-shake': 'effects/clicks/ShakeEffect',
  'anim-float': 'effects/animations/FloatAnimationEffect',
  'anim-pulse': 'effects/animations/PulseAnimationEffect',
  'anim-breathe': 'effects/animations/BreatheAnimationEffect',
  'anim-shimmer': 'effects/animations/ShimmerAnimationEffect',
  'anim-spin': 'effects/animations/SpinAnimationEffect',
  'anim-entrance': 'effects/animations/EntranceAnimationEffect',
  'typo-gradient-text': 'effects/typography/GradientTextEffect',
  'typo-glow-text': 'effects/typography/GlowTextEffect',
  'typo-typewriter': 'effects/typography/TypewriterEffect',
  'typo-count-up': 'effects/typography/CountUpEffect',
  'struct-card': 'effects/structure/CardEffect',
  'struct-button': 'effects/structure/ButtonEffect',
  'struct-input': 'effects/structure/InputEffect',
  'struct-badge': 'effects/structure/BadgeEffect',
  'struct-modal': 'effects/structure/ModalEffect',
  'struct-navbar': 'effects/structure/NavbarEffect',
  'loading-skeleton': 'effects/loading/SkeletonEffect',
  'loading-spinner': 'effects/loading/SpinnerEffect',
  'transition-fade': 'effects/transitions/FadeEffect',
  'transition-slide': 'effects/transitions/SlideEffect',
  'transition-scale': 'effects/transitions/ScaleEffect',
};

// ============================================================
// UTILITY: Sanitize a name for use as a component identifier
// ============================================================

function toComponentName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toKebabCase(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .join('-')
    .toLowerCase();
}

function toCamelCase(name: string): string {
  const component = toComponentName(name);
  return component.charAt(0).toLowerCase() + component.slice(1);
}

// ============================================================
// MAIN ENTRY POINT
// ============================================================

export function generateCode(
  composition: ComposedComponent,
  format: ExportFormat = 'react-tsx'
): ExportResult {
  switch (format) {
    case 'react-tsx':
      return generateReactTSX(composition);
    case 'react-css':
      return generateReactCSS(composition);
    case 'html-css':
      return generateHTMLCSS(composition);
    case 'tailwind':
      return generateTailwind(composition);
    default:
      return generateReactTSX(composition);
  }
}

// ============================================================
// REACT-TSX GENERATION
// ============================================================

function generateReactTSX(composition: ComposedComponent): ExportResult {
  const component = COMPONENT_REGISTRY[composition.baseComponent];
  const layerDefinitions = component?.layers || [];
  const resolvedLayers = mergeEngine.resolve(composition, layerDefinitions);
  const componentName = toComponentName(composition.name);
  const kebabName = toKebabCase(composition.name);

  // Collect unique effect imports
  const effectImports = new Map<string, { name: string; path: string; effectId: string }>();
  for (const layer of resolvedLayers) {
    for (const effect of layer.effects) {
      const effectModule = getEffectById(effect.effectId);
      if (effectModule && !effectImports.has(effect.effectId)) {
        const importPath =
          EFFECT_IMPORT_PATHS[effect.effectId] ||
          `effects/${effect.category}/${effectModule.name.replace(/\s+/g, '')}`;
        effectImports.set(effect.effectId, {
          name: `${toComponentName(effectModule.name)}Effect`,
          path: importPath,
          effectId: effect.effectId,
        });
      }
    }
  }

  // Build import statements
  const importStatements: string[] = [];

  // React import
  importStatements.push(`import React from "react";`);

  // Component primitive import
  if (component) {
    const registryPath = component.registryName;
    importStatements.push(
      `import { ${component.name} } from "@/components/${registryPath}";`
    );
  }

  // Effect renderer imports
  for (const [, imp] of effectImports) {
    importStatements.push(
      `import { ${imp.name} } from "${imp.path}";`
    );
  }

  // Check if we need motion import (any effect uses motion/react)
  const usesMotion = resolvedLayers.some(layer =>
    layer.effects.some(effect => {
      const mod = getEffectById(effect.effectId);
      return mod?.category === 'hover' || mod?.category === 'click' || mod?.category === 'animation' || mod?.category === 'transition';
    })
  );
  if (usesMotion) {
    importStatements.push(`import { motion } from "motion/react";`);
  }

  // Props interface
  const propsInterface = generatePropsInterface(composition, componentName);

  // Design tokens as CSS variables
  const tokenStyles = generateTokenStyles(composition);

  // Generate component body
  const componentBody = generateComponentBody(
    resolvedLayers,
    composition,
    component
  );

  // Build the full component code
  const componentDescription = component?.description || `${composition.baseComponent} with ${resolvedLayers.filter(l => l.effects.length > 0).length} effect layer(s)`;
  const componentCode = `/**
 * ${componentName} - Generated by GodUI Composer
 *
 * ${componentDescription}
 *
 * @example
 * <${componentName}>Hello World</${componentName}>
 */
export function ${componentName}({ children, className, ...props }: ${componentName}Props) {
  return (
    ${indentCode(componentBody, 4)}
  );
}`;

  const code = [
    ...importStatements,
    '',
    propsInterface,
    '',
    componentCode,
    '',
  ].join('\n');

  // Collect dependencies
  const dependencies: string[] = [];
  if (usesMotion) dependencies.push('motion/react');
  if (component?.dependencies) dependencies.push(...component.dependencies);
  for (const [, imp] of effectImports) {
    dependencies.push(imp.path);
  }

  return {
    format: 'react-tsx',
    code,
    filename: `${kebabName}.tsx`,
    dependencies: [...new Set(dependencies)],
  };
}

// ============================================================
// PROPS INTERFACE GENERATION
// ============================================================

function generatePropsInterface(
  composition: ComposedComponent,
  componentName: string
): string {
  const lines: string[] = [];

  lines.push(`interface ${componentName}Props {`);
  lines.push(`  /** Child elements to render inside the component */`);
  lines.push(`  children?: React.ReactNode;`);
  lines.push(`  /** Additional CSS class names */`);
  lines.push(`  className?: string;`);

  // Add design token props
  const tokenProps = composition.tokens.filter(
    t => t.key.includes('color') || t.key.includes('radius') || t.key.includes('size')
  );
  for (const token of tokenProps) {
    const propType = typeof token.value === 'number' ? 'number' : 'string';
    lines.push(`  /** ${token.label} (${token.labelPt}) */`);
    lines.push(`  ${toCamelCase(token.key)}?: ${propType};`);
  }

  lines.push(`}`);
  return lines.join('\n');
}

// ============================================================
// TOKEN STYLES GENERATION
// ============================================================

function generateTokenStyles(composition: ComposedComponent): string {
  if (composition.tokens.length === 0) return '';

  const tokenEntries = composition.tokens
    .map(t => `    "--${t.key}": ${JSON.stringify(getTokenWithUnit(composition.tokens, t.key))}`)
    .join(',\n');

  return `style={{
${tokenEntries}
  }}`;
}

// ============================================================
// COMPONENT BODY GENERATION (HOC NESTING)
// ============================================================

function generateComponentBody(
  resolvedLayers: ResolvedLayer[],
  composition: ComposedComponent,
  component?: any
): string {
  const effectLayers = resolvedLayers.filter(l => l.effects.length > 0);

  // Build the innermost content (base component or children)
  const tokenStyle = composition.tokens.length > 0
    ? `\n      style={${generateStyleObject(composition.tokens)}}`
    : '';
  const classProp = composition.tokens.length > 0
    ? `\n      className={cn("${toKebabCase(composition.name)}", className)}`
    : '';

  let innerContent: string;
  if (component) {
    innerContent = `<${component.name}${classProp}${tokenStyle}>\n        {children}\n      </${component.name}>`;
  } else {
    innerContent = `<div className="${toKebabCase(composition.name)}"${tokenStyle}>\n        {children}\n      </div>`;
  }

  // Wrap with effect HOCs from inside out
  let body = innerContent;
  for (const layer of [...effectLayers].reverse()) {
    for (const effect of [...layer.effects].reverse()) {
      const effectModule = getEffectById(effect.effectId);
      const effectName = effectModule
        ? `${toComponentName(effectModule.name)}Effect`
        : `${effect.effectId}Effect`;
      const configStr = formatConfig(effect.config);

      body = `<${effectName} config={${configStr}}>\n        ${body}\n      </${effectName}>`;
    }
  }

  return body;
}

// ============================================================
// CONFIG FORMATTING
// ============================================================

function formatConfig(config: Record<string, any>): string {
  const entries = Object.entries(config);
  if (entries.length === 0) return '{}';

  const formatted = entries
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(', ');

  if (formatted.length < 60) {
    return `{ ${formatted} }`;
  }

  const lines = entries.map(
    ([key, value]) => `    ${key}: ${JSON.stringify(value)}`
  );
  return `{\n${lines.join(',\n')}\n  }`;
}

// ============================================================
// STYLE OBJECT GENERATION
// ============================================================

function generateStyleObject(tokens: DesignToken[]): string {
  if (tokens.length === 0) return '{}';

  const entries = tokens.map(
    t => `      "--${t.key}": ${JSON.stringify(getTokenWithUnit(tokens, t.key))}`
  );
  return `{\n${entries.join(',\n')}\n    }`;
}

// ============================================================
// INDENTATION HELPER
// ============================================================

function indentCode(code: string, spaces: number): string {
  const indent = ' '.repeat(spaces);
  return code
    .split('\n')
    .map(line => (line.trim() ? indent + line : line))
    .join('\n');
}

// ============================================================
// CSS CLASS GENERATION (shared by react-css, html-css, tailwind)
// ============================================================

function generateCSSClasses(composition: ComposedComponent): string {
  const kebabName = toKebabCase(composition.name);
  const component = COMPONENT_REGISTRY[composition.baseComponent];
  const layerDefinitions = component?.layers || [];
  const resolvedLayers = mergeEngine.resolve(composition, layerDefinitions);

  // Token CSS custom properties
  const tokenVars = composition.tokens
    .map(t => `  --${t.key}: ${getTokenWithUnit(composition.tokens, t.key)};`)
    .join('\n');

  // Extract CSS properties from resolved effects
  const effectProperties = extractEffectCSS(resolvedLayers);

  // Base styles from component defaults
  const baseStyles = generateBaseStyles(composition, component);

  const lines: string[] = [];

  if (tokenVars) {
    lines.push(`.${kebabName} {`);
    lines.push(tokenVars);
    lines.push('');
  }

  lines.push(`.${kebabName} {`);
  if (tokenVars) {
    lines.push(`  /* Design tokens */`);
    lines.push(`  /* Apply via CSS custom properties */`);
  }
  if (baseStyles) {
    lines.push(baseStyles);
  }
  if (effectProperties) {
    lines.push('');
    lines.push(`  /* Effect styles */`);
    lines.push(effectProperties);
  }
  lines.push(`}`);

  return lines.join('\n');
}

function extractEffectCSS(resolvedLayers: ResolvedLayer[]): string {
  const cssLines: string[] = [];

  for (const layer of resolvedLayers) {
    for (const effect of layer.effects) {
      const effectModule = getEffectById(effect.effectId);
      if (!effectModule) continue;

      const props = effect.config;
      switch (effectModule.category) {
        case 'background':
          cssLines.push(...extractBackgroundCSS(effect, props));
          break;
        case 'border':
          cssLines.push(...extractBorderCSS(effect, props));
          break;
        case 'shadow':
          cssLines.push(...extractShadowCSS(effect, props));
          break;
        case 'hover':
          cssLines.push(...extractHoverCSS(effect, props));
          break;
        case 'click':
          cssLines.push(...extractClickCSS(effect, props));
          break;
        case 'animation':
          cssLines.push(...extractAnimationCSS(effect, props));
          break;
        case 'typography':
          cssLines.push(...extractTypographyCSS(effect, props));
          break;
        case 'structure':
          cssLines.push(...extractStructureCSS(effect, props));
          break;
        case 'transition':
          cssLines.push(...extractTransitionCSS(effect, props));
          break;
        default:
          break;
      }
    }
  }

  return cssLines.join('\n');
}

function extractBackgroundCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'bg-glass':
      lines.push(`  background: rgba(255, 255, 255, ${props.opacity ?? 0.08});`);
      lines.push(`  backdrop-filter: blur(24px);`);
      lines.push(`  -webkit-backdrop-filter: blur(24px);`);
      lines.push(`  border: 1px solid rgba(255, 255, 255, 0.2);`);
      break;
    case 'bg-gradient': {
      const angle = props.angle ?? 135;
      const colors = props.colors ?? ['#667eea', '#764ba2'];
      lines.push(`  background: linear-gradient(${angle}deg, ${colors.join(', ')});`);
      break;
    }
    case 'bg-mesh': {
      const colors = props.colors ?? ['#ff006e', '#8338ec', '#3a86ff'];
      lines.push(`  background:
    radial-gradient(at 40% 20%, ${colors[0]}40 0px, transparent 50%),
    radial-gradient(at 80% 0%, ${colors[1]}40 0px, transparent 50%),
    radial-gradient(at 0% 50%, ${colors[2]}40 0px, transparent 50%);`);
      break;
    }
    case 'bg-solid':
      lines.push(`  background-color: ${props.color ?? '#1a1a2e'};`);
      break;
    case 'bg-blur':
      lines.push(`  backdrop-filter: blur(16px);`);
      lines.push(`  -webkit-backdrop-filter: blur(16px);`);
      lines.push(`  background: rgba(255, 255, 255, 0.05);`);
      break;
    case 'bg-noise':
      lines.push(`  /* Noise texture requires SVG background - use React renderer */`);
      break;
    case 'bg-grid': {
      const size = props.size ?? 40;
      const color = props.color ?? 'rgba(255,255,255,0.05)';
      lines.push(`  background-image:
    linear-gradient(${color} 1px, transparent 1px),
    linear-gradient(90deg, ${color} 1px, transparent 1px);`);
      lines.push(`  background-size: ${size}px ${size}px;`);
      break;
    }
    default:
      break;
  }
  return lines;
}

function extractBorderCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'border-neon': {
      const color = props.color ?? '#00f5ff';
      const width = props.width ?? 2;
      lines.push(`  border: ${width}px solid ${color};`);
      lines.push(`  box-shadow: 0 0 5px ${color}40, 0 0 10px ${color}30, 0 0 20px ${color}20, inset 0 0 5px ${color}10;`);
      break;
    }
    case 'border-gradient': {
      const angle = props.angle ?? 45;
      const colors = props.colors ?? ['#667eea', '#764ba2'];
      const width = props.width ?? 2;
      lines.push(`  border: ${width}px solid transparent;`);
      lines.push(`  background-image: linear-gradient(var(--bg, #fff), var(--bg, #fff)), linear-gradient(${angle}deg, ${colors.join(', ')});`);
      lines.push(`  background-origin: border-box;`);
      lines.push(`  background-clip: padding-box, border-box;`);
      break;
    }
    case 'border-dashed': {
      const width = props.width ?? 2;
      const color = props.color ?? 'rgba(255,255,255,0.2)';
      lines.push(`  border: ${width}px dashed ${color};`);
      break;
    }
    case 'border-glow': {
      const color = props.color ?? '#00f5ff';
      const intensity = props.intensity ?? 1;
      lines.push(`  border: 1px solid ${color}40;`);
      lines.push(`  box-shadow: 0 0 ${10 * intensity}px ${color}60, 0 0 ${20 * intensity}px ${color}40, 0 0 ${40 * intensity}px ${color}20;`);
      break;
    }
    default:
      lines.push(`  /* ${effect.effectId}: requires React renderer for animations */`);
      break;
  }
  return lines;
}

function extractShadowCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'shadow-soft': {
      const y = props.y ?? 4;
      const blur = props.blur ?? 20;
      const opacity = props.opacity ?? 0.15;
      lines.push(`  box-shadow: 0 ${y}px ${blur}px rgba(0, 0, 0, ${opacity});`);
      break;
    }
    case 'shadow-neon': {
      const color = props.color ?? '#00f5ff';
      const intensity = props.intensity ?? 1;
      lines.push(`  box-shadow: 0 0 ${5 * intensity}px ${color}80, 0 0 ${15 * intensity}px ${color}50, 0 0 ${30 * intensity}px ${color}30;`);
      break;
    }
    case 'shadow-deep': {
      const y = props.y ?? 10;
      const blur = props.blur ?? 40;
      const opacity = props.opacity ?? 0.3;
      lines.push(`  box-shadow: 0 ${y}px ${blur}px rgba(0, 0, 0, ${opacity}), 0 ${y}px ${blur}px rgba(0, 0, 0, ${opacity});`);
      break;
    }
    case 'shadow-glow': {
      const color = props.color ?? '#00f5ff';
      const spread = props.spread ?? 20;
      lines.push(`  box-shadow: 0 0 ${spread}px ${color}50;`);
      break;
    }
    case 'shadow-inset': {
      const y = props.y ?? 2;
      const blur = props.blur ?? 10;
      const opacity = props.opacity ?? 0.2;
      lines.push(`  box-shadow: inset 0 ${y}px ${blur}px rgba(0, 0, 0, ${opacity});`);
      break;
    }
    default:
      break;
  }
  return lines;
}

function extractHoverCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'hover-scale': {
      const scale = props.scale ?? 1.05;
      lines.push(`  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);`);
      lines.push(`  cursor: pointer;`);
      lines.push(`  /* hover */ transform: scale(${scale});`);
      break;
    }
    case 'hover-lift': {
      const lift = props.lift ?? 8;
      lines.push(`  transition: transform 0.2s ease, box-shadow 0.2s ease;`);
      lines.push(`  cursor: pointer;`);
      lines.push(`  /* hover */ transform: translateY(-${lift}px);`);
      lines.push(`  /* hover */ box-shadow: 0 ${lift}px ${lift * 3}px rgba(0,0,0,0.2);`);
      break;
    }
    case 'hover-rotate': {
      const deg = props.deg ?? 3;
      lines.push(`  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);`);
      lines.push(`  cursor: pointer;`);
      lines.push(`  /* hover */ transform: rotate(${deg}deg) scale(1.02);`);
      break;
    }
    default:
      lines.push(`  /* ${effect.effectId}: requires React renderer for interactive hover */`);
      break;
  }
  return lines;
}

function extractClickCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'click-bounce': {
      const scale = props.scale ?? 0.92;
      lines.push(`  transition: transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);`);
      lines.push(`  cursor: pointer;`);
      lines.push(`  /* active */ transform: scale(${scale});`);
      break;
    }
    case 'click-press':
      lines.push(`  transition: transform 0.1s ease;`);
      lines.push(`  cursor: pointer;`);
      lines.push(`  /* active */ transform: scale(0.97) translateY(2px);`);
      break;
    default:
      lines.push(`  /* ${effect.effectId}: requires React renderer for click effects */`);
      break;
  }
  return lines;
}

function extractAnimationCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  const duration = props.duration ?? 3;

  switch (effect.effectId) {
    case 'anim-float': {
      const distance = props.distance ?? 6;
      lines.push(`  animation: float ${duration}s ease-in-out infinite;`);
      lines.push(`  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-${distance}px); }
  }`);
      break;
    }
    case 'anim-pulse': {
      const scale = props.scale ?? 1.03;
      lines.push(`  animation: pulse ${duration}s ease-in-out infinite;`);
      lines.push(`  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(${scale}); opacity: 0.9; }
  }`);
      break;
    }
    case 'anim-spin':
      lines.push(`  animation: spin ${duration}s linear infinite;`);
      lines.push(`  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }`);
      break;
    case 'anim-shimmer': {
      const color = props.color ?? 'rgba(255,255,255,0.1)';
      lines.push(`  position: relative; overflow: hidden;`);
      lines.push(`  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, ${color}, transparent);
    background-size: 200% 100%;
    animation: shimmer ${duration}s linear infinite;
  }`);
      lines.push(`  @keyframes shimmer {
    from { background-position: -200% 0; }
    to { background-position: 200% 0; }
  }`);
      break;
    }
    default:
      lines.push(`  /* ${effect.effectId}: requires React renderer */`);
      break;
  }
  return lines;
}

function extractTypographyCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'typo-gradient-text': {
      const angle = props.angle ?? 90;
      const colors = props.colors ?? ['#00f5ff', '#8b5cf6'];
      lines.push(`  background-image: linear-gradient(${angle}deg, ${colors.join(', ')});`);
      lines.push(`  -webkit-background-clip: text;`);
      lines.push(`  background-clip: text;`);
      lines.push(`  -webkit-text-fill-color: transparent;`);
      break;
    }
    case 'typo-glow-text': {
      const color = props.color ?? '#00f5ff';
      const intensity = props.intensity ?? 1;
      lines.push(`  color: ${color};`);
      lines.push(`  text-shadow: 0 0 ${10 * intensity}px ${color}80, 0 0 ${20 * intensity}px ${color}40;`);
      break;
    }
    default:
      lines.push(`  /* ${effect.effectId}: requires React renderer */`);
      break;
  }
  return lines;
}

function extractStructureCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  switch (effect.effectId) {
    case 'struct-card':
      lines.push(`  border-radius: 16px;`);
      lines.push(`  overflow: hidden;`);
      lines.push(`  padding: ${props.padding ?? 24}px;`);
      break;
    case 'struct-button':
      lines.push(`  display: inline-flex;`);
      lines.push(`  align-items: center;`);
      lines.push(`  justify-content: center;`);
      lines.push(`  border-radius: 12px;`);
      lines.push(`  font-weight: 500;`);
      lines.push(`  padding: ${props.paddingY ?? 12}px ${props.paddingX ?? 24}px;`);
      lines.push(`  transition: all 0.2s;`);
      break;
    case 'struct-input':
      lines.push(`  border-radius: 12px;`);
      lines.push(`  padding: ${props.paddingY ?? 12}px ${props.paddingX ?? 16}px;`);
      break;
    case 'struct-badge':
      lines.push(`  display: inline-flex;`);
      lines.push(`  align-items: center;`);
      lines.push(`  border-radius: 9999px;`);
      lines.push(`  padding: ${props.paddingY ?? 4}px ${props.paddingX ?? 12}px;`);
      lines.push(`  font-size: ${props.fontSize ?? 12}px;`);
      break;
    case 'struct-modal':
      lines.push(`  position: fixed;`);
      lines.push(`  inset: 0;`);
      lines.push(`  z-index: 50;`);
      lines.push(`  display: flex;`);
      lines.push(`  align-items: center;`);
      lines.push(`  justify-content: center;`);
      lines.push(`  padding: ${props.padding ?? 24}px;`);
      break;
    case 'struct-navbar':
      lines.push(`  display: flex;`);
      lines.push(`  align-items: center;`);
      lines.push(`  height: ${props.height ?? 64}px;`);
      lines.push(`  padding: 0 ${props.paddingX ?? 24}px;`);
      break;
    default:
      break;
  }
  return lines;
}

function extractTransitionCSS(effect: ResolvedEffect, props: Record<string, any>): string[] {
  const lines: string[] = [];
  const duration = props.duration ?? 0.3;
  lines.push(`  transition: all ${duration}s ease;`);
  return lines;
}

// ============================================================
// BASE STYLES FROM COMPONENT DEFAULTS
// ============================================================

function generateBaseStyles(
  composition: ComposedComponent,
  component?: any
): string {
  const lines: string[] = [];
  lines.push(`  /* Base styles */`);
  lines.push(`  position: relative;`);
  lines.push(`  box-sizing: border-box;`);

  if (component) {
    const defaults = component.defaultProps || {};
    if (defaults.className) {
      lines.push(`  /* ${component.name} defaults: ${defaults.className} */`);
    }
  }

  // Add token-derived base properties
  const radius = composition.tokens.find(t => t.key === 'radius');
  if (radius) {
    lines.push(`  border-radius: ${getTokenWithUnit(composition.tokens, 'radius', '12px')};`);
  }

  const padding = composition.tokens.find(t => t.key === 'padding');
  if (padding) {
    lines.push(`  padding: ${getTokenWithUnit(composition.tokens, 'padding', '16px')};`);
  }

  return lines.join('\n');
}

// ============================================================
// REACT-CSS GENERATION
// ============================================================

function generateReactCSS(composition: ComposedComponent): ExportResult {
  const tsx = generateReactTSX(composition);
  const cssClasses = generateCSSClasses(composition);
  const kebabName = toKebabCase(composition.name);

  const combinedCode = [
    `/* ============================================ */`,
    `/* ${composition.name} - CSS Classes */`,
    `/* Generated by GodUI Composer */`,
    `/* ============================================ */`,
    '',
    cssClasses,
    '',
    `/* ============================================ */`,
    `/* React Component */`,
    `/* ============================================ */`,
    '',
    tsx.code,
  ].join('\n');

  return {
    format: 'react-css',
    code: combinedCode,
    filename: `${kebabName}.tsx`,
    dependencies: tsx.dependencies,
  };
}

// ============================================================
// HTML-CSS GENERATION
// ============================================================

function generateHTMLCSS(composition: ComposedComponent): ExportResult {
  const kebabName = toKebabCase(composition.name);
  const cssClasses = generateCSSClasses(composition);
  const component = COMPONENT_REGISTRY[composition.baseComponent];

  const htmlContent = generateHTMLStructure(composition);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${composition.name}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    ${cssClasses}
  </style>
</head>
<body>
  <div class="${kebabName}">
    ${indentCode(htmlContent, 4)}
  </div>
</body>
</html>`;

  const code = [
    `/* ============================================ */`,
    `/* ${composition.name} - HTML + CSS */`,
    `/* Generated by GodUI Composer */`,
    `/* ============================================ */`,
    '',
    html,
  ].join('\n');

  return {
    format: 'html-css',
    code,
    filename: `${kebabName}.html`,
    dependencies: [],
  };
}

function generateHTMLStructure(
  composition: ComposedComponent
): string {
  const componentReg = COMPONENT_REGISTRY[composition.baseComponent];
  const componentName = componentReg?.name || 'Content';

  // Generate basic HTML structure based on component type
  const baseType = composition.baseComponent;

  if (baseType.includes('button') || baseType === 'gooey-fab' || baseType === 'jelly-button' || baseType === 'magic-button' || baseType === 'mask-button') {
    return `<button class="${toKebabCase(composition.name)}__button">
      <span>Button</span>
    </button>`;
  }

  if (baseType.includes('input') || baseType === 'otp-input') {
    return `<div class="${toKebabCase(composition.name)}__input-wrapper">
      <input type="text" placeholder="Enter text..." class="${toKebabCase(composition.name)}__input" />
    </div>`;
  }

  if (baseType === 'morphing-dialog' || baseType === 'command-palette' || baseType === 'drawer' || baseType === 'toast') {
    return `<div class="${toKebabCase(composition.name)}__overlay">
    <div class="${toKebabCase(composition.name)}__dialog">
      <h2>Dialog Title</h2>
      <p>Dialog content goes here.</p>
      <button>Close</button>
    </div>
  </div>`;
  }

  if (baseType === 'dynamic-island' || baseType === 'godui-dock' || baseType === 'floating-toolbar') {
    return `<nav class="${toKebabCase(composition.name)}__nav">
      <div class="${toKebabCase(composition.name)}__item">Item 1</div>
      <div class="${toKebabCase(composition.name)}__item">Item 2</div>
      <div class="${toKebabCase(composition.name)}__item">Item 3</div>
    </nav>`;
  }

  if (baseType.includes('card') || baseType.includes('card')) {
    return `<div class="${toKebabCase(composition.name)}__card">
      <h3>Card Title</h3>
      <p>Card content goes here.</p>
    </div>`;
  }

  // Default: generic content
  return `<div class="${toKebabCase(composition.name)}__content">
    <h3>${componentName}</h3>
    <p>Component content goes here.</p>
  </div>`;
}

// ============================================================
// TAILWIND GENERATION
// ============================================================

function generateTailwind(composition: ComposedComponent): ExportResult {
  const component = COMPONENT_REGISTRY[composition.baseComponent];
  const layerDefinitions = component?.layers || [];
  const resolvedLayers = mergeEngine.resolve(composition, layerDefinitions);
  const componentName = toComponentName(composition.name);
  const kebabName = toKebabCase(composition.name);

  // Collect unique effect imports
  const effectImports = new Map<string, { name: string; path: string }>();
  for (const layer of resolvedLayers) {
    for (const effect of layer.effects) {
      const effectModule = getEffectById(effect.effectId);
      if (effectModule && !effectImports.has(effect.effectId)) {
        const importPath =
          EFFECT_IMPORT_PATHS[effect.effectId] ||
          `effects/${effect.category}/${effectModule.name.replace(/\s+/g, '')}`;
        effectImports.set(effect.effectId, {
          name: `${toComponentName(effectModule.name)}Effect`,
          path: importPath,
        });
      }
    }
  }

  // Build Tailwind class map from effects
  const tailwindMap = convertToTailwindClasses(resolvedLayers, composition);

  // Build import statements
  const importStatements: string[] = [];
  importStatements.push(`import React from "react";`);

  if (component) {
    importStatements.push(
      `import { ${component.name} } from "@/components/${component.registryName}";`
    );
  }

  for (const [, imp] of effectImports) {
    importStatements.push(
      `import { ${imp.name} } from "${imp.path}";`
    );
  }

  // Check if we need motion
  const usesMotion = resolvedLayers.some(layer =>
    layer.effects.some(effect => {
      const mod = getEffectById(effect.effectId);
      return mod?.category === 'hover' || mod?.category === 'click' || mod?.category === 'animation' || mod?.category === 'transition';
    })
  );
  if (usesMotion) {
    importStatements.push(`import { motion } from "motion/react";`);
  }

  // Props interface
  const propsInterface = `interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}`;

  // Generate component body with Tailwind classes
  const componentBody = generateTailwindBody(
    resolvedLayers,
    composition,
    component,
    tailwindMap
  );

  const componentCode = `/**
 * ${componentName} - Generated by GodUI Composer (Tailwind)
 */
export function ${componentName}({ children, className }: ${componentName}Props) {
  return (
    ${indentCode(componentBody, 4)}
  );
}`;

  const code = [
    ...importStatements,
    '',
    propsInterface,
    '',
    componentCode,
    '',
    `/* ============================================ */`,
    `/* Tailwind Class Reference */`,
    `/* ============================================ */`,
    '',
    `/* Base: ${tailwindMap.base || 'none'} */`,
    ...Array.from(tailwindMap.effects.entries()).map(
      ([id, classes]) => `/* ${id}: ${classes} */`
    ),
    '',
  ].join('\n');

  const dependencies: string[] = [];
  if (usesMotion) dependencies.push('motion/react');
  if (component?.dependencies) dependencies.push(...component.dependencies);
  for (const [, imp] of effectImports) {
    dependencies.push(imp.path);
  }

  return {
    format: 'tailwind',
    code,
    filename: `${kebabName}.tsx`,
    dependencies: [...new Set(dependencies)],
  };
}

// ============================================================
// TAILWIND CLASS CONVERSION
// ============================================================

function convertToTailwindClasses(
  resolvedLayers: ResolvedLayer[],
  composition: ComposedComponent
): { base: string; effects: Map<string, string> } {
  const baseClasses: string[] = [
    'relative',
    'rounded-2xl',
    'overflow-hidden',
  ];

  // Add token-based classes
  const radius = composition.tokens.find(t => t.key === 'radius');
  if (radius) {
    const val = Number(radius.value);
    if (val <= 4) baseClasses.push('rounded');
    else if (val <= 8) baseClasses.push('rounded-lg');
    else if (val <= 12) baseClasses.push('rounded-xl');
    else if (val <= 16) baseClasses.push('rounded-2xl');
    else baseClasses.push('rounded-3xl');
  }

  const padding = composition.tokens.find(t => t.key === 'padding');
  if (padding) {
    const val = Number(padding.value);
    if (val <= 8) baseClasses.push('p-2');
    else if (val <= 12) baseClasses.push('p-3');
    else if (val <= 16) baseClasses.push('p-4');
    else if (val <= 20) baseClasses.push('p-5');
    else if (val <= 24) baseClasses.push('p-6');
    else baseClasses.push('p-8');
  }

  // Add color classes from tokens
  const bgColor = composition.tokens.find(t => t.key === 'bg-color');
  if (bgColor) {
    baseClasses.push('bg-[var(--bg-color)]');
  }

  const textColor = composition.tokens.find(t => t.key === 'text-color');
  if (textColor) {
    baseClasses.push('text-[var(--text-color)]');
  }

  const effectClasses = new Map<string, string>();

  for (const layer of resolvedLayers) {
    for (const effect of layer.effects) {
      const classes = getTailwindClassesForEffect(effect);
      if (classes) {
        effectClasses.set(effect.effectId, classes);
      }
    }
  }

  return {
    base: baseClasses.join(' '),
    effects: effectClasses,
  };
}

function getTailwindClassesForEffect(effect: ResolvedEffect): string {
  const classes: string[] = [];

  switch (effect.effectId) {
    case 'bg-glass':
      classes.push('backdrop-blur-xl', 'border', 'border-white/20');
      break;
    case 'bg-gradient':
      classes.push('bg-gradient-to-br', 'from-[#667eea]', 'to-[#764ba2]');
      break;
    case 'bg-solid':
      classes.push('bg-[var(--bg-color)]');
      break;
    case 'bg-blur':
      classes.push('backdrop-blur-lg', 'bg-white/5');
      break;
    case 'border-neon':
      classes.push('border-2', 'border-cyan-400');
      break;
    case 'border-dashed':
      classes.push('border-2', 'border-dashed', 'border-white/20');
      break;
    case 'border-glow':
      classes.push('border', 'border-yellow-400/40');
      break;
    case 'shadow-soft':
      classes.push('shadow-lg');
      break;
    case 'shadow-neon':
      classes.push('shadow-cyan-400/30');
      break;
    case 'shadow-deep':
      classes.push('shadow-2xl');
      break;
    case 'shadow-glow':
      classes.push('shadow-lg', 'shadow-yellow-400/20');
      break;
    case 'hover-scale':
      classes.push('hover:scale-105', 'transition-transform', 'duration-200');
      break;
    case 'hover-lift':
      classes.push('hover:-translate-y-2', 'hover:shadow-xl', 'transition-all', 'duration-200');
      break;
    case 'hover-rotate':
      classes.push('hover:rotate-3', 'hover:scale-105', 'transition-transform', 'duration-200');
      break;
    case 'click-bounce':
      classes.push('active:scale-95', 'transition-transform', 'duration-100');
      break;
    case 'click-press':
      classes.push('active:scale-[0.97]', 'active:translate-y-0.5', 'transition-transform', 'duration-100');
      break;
    case 'anim-float':
      classes.push('animate-bounce');
      break;
    case 'anim-pulse':
      classes.push('animate-pulse');
      break;
    case 'anim-spin':
      classes.push('animate-spin');
      break;
    case 'struct-card':
      classes.push('rounded-2xl', 'p-6');
      break;
    case 'struct-button':
      classes.push('inline-flex', 'items-center', 'justify-center', 'rounded-xl', 'font-medium', 'px-6', 'py-3');
      break;
    case 'struct-input':
      classes.push('rounded-xl', 'px-4', 'py-3');
      break;
    case 'struct-badge':
      classes.push('inline-flex', 'items-center', 'rounded-full', 'px-3', 'py-1', 'text-xs');
      break;
    case 'struct-navbar':
      classes.push('flex', 'items-center', 'h-16', 'px-6');
      break;
    default:
      break;
  }

  return classes.join(' ');
}

// ============================================================
// TAILWIND BODY GENERATION
// ============================================================

function generateTailwindBody(
  resolvedLayers: ResolvedLayer[],
  composition: ComposedComponent,
  component?: any,
  tailwindMap?: { base: string; effects: Map<string, string> }
): string {
  const effectLayers = resolvedLayers.filter(l => l.effects.length > 0);
  const baseClasses = tailwindMap?.base || 'relative rounded-2xl overflow-hidden';

  // Build inner content
  let innerContent: string;
  if (component) {
    innerContent = `<${component.name} className={cn("${baseClasses}", className)}>\n        {children}\n      </${component.name}>`;
  } else {
    innerContent = `<div className={cn("${baseClasses}", className)}>\n        {children}\n      </div>`;
  }

  // Wrap with effect HOCs
  let body = innerContent;
  for (const layer of [...effectLayers].reverse()) {
    for (const effect of [...layer.effects].reverse()) {
      const effectModule = getEffectById(effect.effectId);
      const effectName = effectModule
        ? `${toComponentName(effectModule.name)}Effect`
        : `${effect.effectId}Effect`;
      const configStr = formatConfig(effect.config);
      body = `<${effectName} config={${configStr}}>\n        ${body}\n      </${effectName}>`;
    }
  }

  return body;
}

// ============================================================
// PUBLIC API: Generate preview code (lightweight, for UI)
// ============================================================

export function generatePreviewCode(
  composition: ComposedComponent,
  format: ExportFormat = 'react-tsx'
): string {
  return generateCode(composition, format).code;
}

// ============================================================
// PUBLIC API: Get component dependencies
// ============================================================

export function getComponentDependencies(
  composition: ComposedComponent
): string[] {
  return generateCode(composition, 'react-tsx').dependencies;
}

// ============================================================
// PUBLIC API: Validate composition for code generation
// ============================================================

export function validateForExport(
  composition: ComposedComponent
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!composition.name || composition.name.trim().length === 0) {
    errors.push('Composition must have a name');
  }

  if (!composition.baseComponent) {
    errors.push('Composition must have a base component');
  }

  const component = COMPONENT_REGISTRY[composition.baseComponent];
  if (!component) {
    errors.push(`Component "${composition.baseComponent}" not found in registry`);
  }

  // Validate all effects exist
  for (const layer of composition.layers) {
    for (const effect of layer.effects) {
      if (effect.enabled) {
        const effectModule = getEffectById(effect.effectId);
        if (!effectModule) {
          errors.push(`Effect "${effect.effectId}" not found in registry`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
