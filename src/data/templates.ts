import { BuilderComponentInstance } from '../types/builder';
import { GODUI_CATALOG } from './goduiCatalog';

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  components: Omit<BuilderComponentInstance, 'id'>[];
}

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Platform Pro',
    description: 'Landing page moderna com Dynamic Island, Aurora Text de alto impacto, botões Shimmer & Liquid Glass, Spotlight Card e Rodapé.',
    badge: 'Popular',
    components: [
      {
        type: 'blueprint-grid',
        name: 'Blueprint Grid Background',
        props: { ...GODUI_CATALOG['blueprint-grid'].defaultProps },
        isVisible: true,
      },
      {
        type: 'dynamic-island',
        name: 'Dynamic Island Header',
        props: {
          ...GODUI_CATALOG['dynamic-island'].defaultProps,
          title: 'GodUI Cloud',
          statusText: 'v2.4 Online • All Systems Normal',
          ctaText: 'Start Free Trial',
        },
        isVisible: true,
      },
      {
        type: 'aurora-text',
        name: 'Aurora Text Headline',
        props: {
          ...GODUI_CATALOG['aurora-text'].defaultProps,
          text: 'Interfaces de Próxima Geração',
          subtitle: 'Componha componentes reais do GodUI com animações táteis, Three.js 3D e exportação com 0% de conflito de CSS.',
        },
        isVisible: true,
      },
      {
        type: 'floating-toolbar',
        name: 'Floating Toolbar (Mesclada)',
        props: {
          ...GODUI_CATALOG['floating-toolbar'].defaultProps,
          badgeText: 'GodUI Fusion Active',
        },
        isVisible: true,
        fusions: [
          {
            id: 'fusion-default-1',
            sourceEffect: 'liquid-glass',
            sourceComponentName: 'Liquid Glass Button',
            targetSlot: 'active-item',
            intensity: 0.9,
            withShimmer: true,
            active: true,
          },
          {
            id: 'fusion-default-2',
            sourceEffect: 'gooey-liquid',
            sourceComponentName: 'Gooey FAB',
            targetSlot: 'active-item',
            intensity: 0.8,
            active: true,
          }
        ],
      },
      {
        type: 'liquid-glass-button',
        name: 'Primary Liquid Glass Action',
        props: {
          ...GODUI_CATALOG['liquid-glass-button'].defaultProps,
          label: 'Deploy com GodUI',
          variant: 'liquid',
        },
        isVisible: true,
      },
      {
        type: 'shimmer-button',
        name: 'Secondary Shimmer Action',
        props: {
          ...GODUI_CATALOG['shimmer-button'].defaultProps,
          label: 'Explorar Documentação',
          shimmerColor: 'cyan',
        },
        isVisible: true,
      },
      {
        type: 'spotlight-card',
        name: 'Spotlight Feature Card',
        props: {
          ...GODUI_CATALOG['spotlight-card'].defaultProps,
          title: 'Refração Especular & Border Beam',
          description: 'Desenvolvido especificamente para Tailwind CSS v4 e Motion com tipagem estrita TypeScript.',
          enableBorderBeam: true,
        },
        isVisible: true,
      },
      {
        type: 'bento-grid',
        name: 'Bento Grid System',
        props: { ...GODUI_CATALOG['bento-grid'].defaultProps },
        isVisible: true,
      },
      {
        type: 'glass-footer',
        name: 'Minimal Glass Footer',
        props: { ...GODUI_CATALOG['glass-footer'].defaultProps },
        isVisible: true,
      },
    ],
  },
  {
    id: 'spatial-3d',
    name: 'Spatial 3D & AI Studio',
    description: 'Showcase imersivo com malha Three.js WebGL em tempo real, 3D Gyro Tilt Card, AI Voice Orb e Dock de navegação.',
    badge: 'Immersive',
    components: [
      {
        type: 'interactive-3d-mesh',
        name: 'Interactive 3D WebGL Mesh',
        props: { ...GODUI_CATALOG['interactive-3d-mesh'].defaultProps, speed: 1.2 },
        isVisible: true,
      },
      {
        type: 'dynamic-island',
        name: 'Dynamic Island Header',
        props: {
          ...GODUI_CATALOG['dynamic-island'].defaultProps,
          title: 'GodUI Spatial',
          statusText: 'WebGL 3D Core Active',
        },
        isVisible: true,
      },
      {
        type: 'voice-orb',
        name: 'AI Voice Orb',
        props: { ...GODUI_CATALOG['voice-orb'].defaultProps },
        isVisible: true,
      },
      {
        type: 'tilt-3d-card',
        name: '3D Gyro Tilt Card',
        props: { ...GODUI_CATALOG['tilt-3d-card'].defaultProps, maxTilt: 22 },
        isVisible: true,
      },
      {
        type: 'magnetic-button',
        name: 'Magnetic Cursor Button',
        props: { ...GODUI_CATALOG['magnetic-button'].defaultProps, label: 'Magnetic Interaction' },
        isVisible: true,
      },
      {
        type: 'godui-dock',
        name: 'macOS Style Dock',
        props: { ...GODUI_CATALOG['godui-dock'].defaultProps },
        isVisible: true,
      },
    ],
  },
  {
    id: 'minimal-actions',
    name: 'Action & Tooling Kit',
    description: 'Interface compacta focada em interações táteis: Floating Toolbar, Hold Confirm Button de segurança e Gooey FAB líquido.',
    badge: 'Tactile',
    components: [
      {
        type: 'floating-toolbar',
        name: 'Floating Toolbar',
        props: { ...GODUI_CATALOG['floating-toolbar'].defaultProps },
        isVisible: true,
      },
      {
        type: 'aurora-text',
        name: 'Aurora Headline',
        props: {
          ...GODUI_CATALOG['aurora-text'].defaultProps,
          text: 'Ações Físicas & Microinterações',
          subtitle: 'Experimente pressionar, segurar e mover o cursor para testar a reatividade.',
        },
        isVisible: true,
      },
      {
        type: 'hold-confirm-button',
        name: 'Hold Confirm Security Action',
        props: {
          ...GODUI_CATALOG['hold-confirm-button'].defaultProps,
          label: 'Segure para Implantar',
          successText: 'Deploy Efetuado com Sucesso!',
        },
        isVisible: true,
      },
      {
        type: 'gooey-fab',
        name: 'Gooey Morphing FAB',
        props: { ...GODUI_CATALOG['gooey-fab'].defaultProps },
        isVisible: true,
      },
      {
        type: 'glass-footer',
        name: 'Minimal Glass Footer',
        props: { ...GODUI_CATALOG['glass-footer'].defaultProps },
        isVisible: true,
      },
    ],
  },
];
