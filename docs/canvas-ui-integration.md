# Integração da Canvas UI no Goduix

## Objetivo

Integrar os efeitos da biblioteca oficial [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) ao catálogo Goduix e ao Fusion Engine, sem substituir os componentes existentes nem introduzir efeitos simulados.

## Compatibilidade confirmada

- O Goduix utiliza React 19, TypeScript, Vite 6 e Tailwind CSS v4.
- A Canvas UI oferece fontes por componente via registry compatível com shadcn, com variantes React e WebGL/WebGPU.
- A instalação oficial é feita por componente, por exemplo: `npx shadcn@latest add @canvas-ui/liquid-react`.
- A Canvas UI declara licença MIT + Commons Clause. Verificar e preservar os avisos da licença antes de redistribuir ou publicar componentes derivados.

## Estratégia de integração

1. Adicionar os componentes como código-fonte em `src/components/godui/canvasui/`, seguindo o fluxo oficial de registry. Evitar importar uma coleção inteira no bundle se só alguns efeitos forem utilizados.
2. Integrar cada componente ao tipo `GodUIComponentType`, ao `GODUI_CATALOG` (metadados, propriedades, valores padrão e exemplo de código) e ao `ComponentRenderer.tsx`.
3. Mapear efeitos compatíveis no `FUSION_DONORS` e em `getComponentSignatureEffect()`. Não declarar slots que o componente não suporte.
4. Preservar interação HTML, teclado e foco; efeitos WebGL devem ser decorativos e não interceptar eventos do conteúdo.
5. Respeitar `prefers-reduced-motion`, desmontar recursos WebGL e listeners ao desmontar, e oferecer fallback quando WebGL/WebGPU não estiver disponível.
6. Validar o build e o typecheck após cada lote. Testar visualmente em desktop e mobile antes de considerar a integração concluída.

## Componentes candidatos para o primeiro lote

| Componente | Uso recomendado |
| --- | --- |
| Liquid | Efeito fluido em uma seção ou superfície |
| Glass | Superfície com distorção/refração visual |
| Ripple | Feedback de interação por clique |
| Displacement | Fundo em grade com distorção pelo ponteiro |
| Decrypt Reveal | Revelação animada de texto |
| Shatter | Transição visual de fragmentação |
| Force Field | Campo visual interativo |

A lista acima é uma seleção inicial, não uma declaração de que os componentes já foram portados. Confirmar os nomes, APIs e comandos atuais na [documentação oficial](https://canvasui.dev/docs) antes de cada importação.

## Critérios de aceite

- Componentes aparecem no catálogo e podem ser adicionados ao canvas.
- O inspetor altera props reais e o código exportado compila com os imports correspondentes.
- Fusão de efeitos só é oferecida para slots e triggers realmente suportados.
- Nenhum componente depende de dados mockados ou de import remoto em tempo de execução.
- `bun run lint` e `bun run build` passam; falhas e limitações de WebGL são registradas.
