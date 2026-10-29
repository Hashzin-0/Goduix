# Canvas UI: estado da integração

## Por que o catálogo de comandos foi removido

O Goduix não deve apresentar um catálogo de componentes que exige que o usuário copie comandos para outro projeto. Essa interface foi removida.

O repositório de origem, https://github.com/DavidHDev/canvas-ui, publica seus componentes sob a licença MIT + Commons Clause, disponível em https://github.com/DavidHDev/canvas-ui/blob/main/LICENSE.md. A cláusula proíbe vender, sublicenciar ou redistribuir os próprios componentes, inclusive em um pacote ou versão portada.

Como o Goduix é um repositório público e um construtor que pode exportar componentes, copiar o código-fonte original para o repositório e incorporá-lo ao bundle exigiria autorização/licença compatível do titular. Não devemos contornar essa restrição.

## Caminho para uma integração real

Para incorporar literalmente o código original ao Goduix, obter autorização escrita ou uma licença alternativa do autor que permita redistribuição e incorporação no construtor/exportador.

Sem essa autorização, a alternativa é implementar efeitos próprios no Goduix, com código independente, integrados à biblioteca, ao renderer, às propriedades editáveis, à seleção e à exportação. Isso não deve ser apresentado como uma cópia oficial dos componentes Canvas UI.

## Estado atual

- Aba de catálogo e ações de copiar comandos removidas.
- Nenhum código dos componentes Canvas UI foi copiado.
- A integração completa do código original permanece bloqueada pela condição de licença acima.
