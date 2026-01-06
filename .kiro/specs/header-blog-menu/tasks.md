# Implementation Plan: Header Blog Menu

## Overview

Implementação do novo menu "Blog" no componente Header, posicionado entre "Projetos" e "Contato", que abre o blog da empresa em uma nova aba. A implementação seguirá o padrão existente da aplicação e incluirá suporte para links externos com segurança adequada.

## Tasks

- [x] 1. Modificar o componente Header para suportar links externos
  - Adicionar lógica para detectar links externos (URLs que começam com http/https)
  - Implementar renderização condicional para links internos vs externos
  - Adicionar atributos de segurança (target="_blank", rel="noopener noreferrer")
  - _Requirements: 1.2, 3.1, 3.2, 3.3_

- [ ]* 1.1 Escrever teste de propriedade para comportamento de link externo
  - **Property 2: External link behavior**
  - **Validates: Requirements 1.2, 3.1, 3.2**

- [x] 2. Atualizar todas as páginas com o novo menu Blog
  - [x] 2.1 Atualizar HomePage com menu Blog
    - Adicionar item "Blog" no array menuItems entre "Projetos" e "Contato"
    - _Requirements: 1.1, 2.1_

  - [x] 2.2 Atualizar SobrePage com menu Blog
    - Adicionar item "Blog" no array menuItems entre "Projetos" e "Contato"
    - _Requirements: 1.1, 2.1_

  - [x] 2.3 Atualizar ProjetosPage com menu Blog
    - Adicionar item "Blog" no array menuItems entre "Projetos" e "Contato"
    - _Requirements: 1.1, 2.1_

  - [x] 2.4 Atualizar ContatoPage com menu Blog
    - Adicionar item "Blog" no array menuItems entre "Projetos" e "Contato"
    - _Requirements: 1.1, 2.1_

- [ ]* 2.5 Escrever teste de propriedade para posicionamento do menu
  - **Property 1: Menu positioning and presence**
  - **Validates: Requirements 1.1, 1.4, 2.1**

- [ ]* 2.6 Escrever teste de propriedade para consistência estrutural
  - **Property 3: Structural and visual consistency**
  - **Validates: Requirements 1.3, 2.3**

- [x] 3. Implementar funcionalidade específica para mobile
  - Garantir que o menu Blog funcione corretamente no menu mobile
  - Implementar fechamento do menu mobile ao clicar no link externo
  - _Requirements: 1.4, 1.5_

- [ ]* 3.1 Escrever teste de propriedade para interação mobile
  - **Property 4: Mobile menu interaction**
  - **Validates: Requirements 1.5**

- [x] 4. Implementar melhorias de acessibilidade
  - Adicionar ARIA labels apropriados para links externos
  - Incluir indicadores visuais para links externos
  - Garantir navegação por teclado
  - _Requirements: 2.4, 2.5, 3.3_

- [ ]* 4.1 Escrever teste de propriedade para acessibilidade
  - **Property 5: Accessibility compliance**
  - **Validates: Requirements 2.4, 2.5, 3.3**

- [ ]* 4.2 Escrever testes unitários para casos específicos
  - Testar renderização com diferentes configurações de menuItems
  - Testar comportamento de erro com URLs malformadas
  - Testar estado do menu mobile em diferentes cenários
  - _Requirements: 1.1, 1.2, 1.5_

- [x] 5. Checkpoint - Verificar funcionamento completo
  - Garantir que todos os testes passem
  - Verificar funcionamento em desktop e mobile
  - Validar acessibilidade e segurança
  - Perguntar ao usuário se há dúvidas

- [x] 6. Integração final e validação
  - Testar navegação entre todas as páginas
  - Verificar que o menu Blog aparece consistentemente
  - Validar que o link abre corretamente em nova aba
  - _Requirements: 2.1, 3.4, 3.5_

## Notes

- Tasks marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada task referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de correção
- Testes unitários validam exemplos específicos e casos extremos