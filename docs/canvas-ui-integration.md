# Integração da Canvas UI no Goduix

## Decisão de integração e licença

A Canvas UI oferece 35 efeitos com variantes React e WebGL/WebGPU, distribuídos pelo registry oficial compatível com shadcn: `npx shadcn@latest add @canvas-ui/<componente>-react`.

A licença publicada pelo autor é MIT + Commons Clause. Ela permite utilizar o software como parte de uma aplicação, mas proíbe vender, sublicenciar ou redistribuir os componentes em si, inclusive em pacote ou versão portada. Como o Goduix é um construtor de componentes e pode exportar código para terceiros, copiar esses componentes para o catálogo interno e redistribuí-los seria incompatível com essa restrição.

Por isso, a integração usa o registry oficial diretamente e **não clona nem incorpora o código-fonte Canvas UI** ao repositório Goduix. Assim, os usuários podem obter os arquivos do próprio autor no projeto React de destino, mantendo a origem e os avisos de licença.

## O que foi integrado

- Nova aba **Canvas UI** na biblioteca do Goduix.
- Catálogo pesquisável com os 35 slugs oficiais.
- Comando de instalação por componente, gerado no formato oficial `@canvas-ui/<slug>-react`.
- Ação para copiar o comando e link para a documentação oficial do efeito.
- Nenhuma importação de código remoto em tempo de execução e nenhuma dependência nova no bundle do Goduix.

## Como usar

1. Abra a aba **Canvas UI** na biblioteca.
2. Pesquise o efeito desejado e abra sua documentação oficial para revisar props, requisitos e suporte do navegador.
3. Copie o comando de instalação e execute-o no diretório do projeto React que receberá o componente.
4. Revise o código e os avisos de licença instalados pelo registry oficial antes de publicar ou redistribuir o projeto.

Exemplo:

```bash
npx shadcn@latest add @canvas-ui/liquid-react
```

As variantes WebGPU, quando publicadas para um efeito, usam o sufixo `-webgpu` conforme a documentação oficial.

## Referências

- Projeto: https://github.com/DavidHDev/canvas-ui
- Catálogo: https://canvasui.dev/components
- Documentação: https://canvasui.dev/docs
- Registry: https://canvasui.dev/r/{name}.json
- Licença: https://github.com/DavidHDev/canvas-ui/blob/main/LICENSE.md

## Validação pendente

- Executar `bun run lint` e `bun run build` no ambiente do projeto.
- Validar visualmente a aba em desktop e dispositivos móveis.
- Testar o comando copiado em um projeto React de destino com a configuração de aliases exigida pelo shadcn.
