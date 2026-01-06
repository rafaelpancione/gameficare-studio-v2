# Requirements Document

## Introduction

Adicionar um novo item de menu "Blog" no header da aplicação, posicionado entre "Projetos" e "Contato", que abre o blog da empresa em uma nova aba.

## Glossary

- **Header**: Componente de navegação principal localizado no topo de todas as páginas
- **Menu_Item**: Item individual de navegação no header
- **Blog_Link**: Link externo que direciona para https://blog.gameficare.com.br
- **New_Tab**: Nova aba/janela do navegador que se abre ao clicar no link

## Requirements

### Requirement 1

**User Story:** Como usuário do site, eu quero acessar o blog da empresa através do menu principal, para que eu possa ler conteúdos relacionados aos projetos e novidades da Gameficare.

#### Acceptance Criteria

1. WHEN a user views any page of the website, THE Header SHALL display a "Blog" menu item between "Projetos" and "Contato"
2. WHEN a user clicks on the "Blog" menu item, THE System SHALL open https://blog.gameficare.com.br in a new tab
3. THE Blog_Link SHALL maintain the same visual styling as other menu items
4. WHEN the mobile menu is opened, THE Blog menu item SHALL appear in the correct position in the mobile navigation
5. WHEN a user clicks the Blog menu item in mobile view, THE System SHALL close the mobile menu and open the blog in a new tab

### Requirement 2

**User Story:** Como desenvolvedor, eu quero que o novo menu seja implementado de forma consistente em todas as páginas, para que a experiência de navegação seja uniforme.

#### Acceptance Criteria

1. THE System SHALL add the Blog menu item to all existing pages (Home, Sobre, Projetos, Contato)
2. WHEN the menuItems array is updated, THE change SHALL be reflected across all page components
3. THE Blog menu item SHALL follow the same data structure as existing menu items
4. THE System SHALL maintain accessibility standards for the new menu item
5. THE Blog link SHALL include proper ARIA labels and external link indicators

### Requirement 3

**User Story:** Como usuário, eu quero que o link do blog seja seguro e otimizado, para que eu tenha uma experiência de navegação confiável.

#### Acceptance Criteria

1. THE Blog_Link SHALL include rel="noopener noreferrer" for security
2. THE Blog_Link SHALL include target="_blank" to open in new tab
3. THE Blog_Link SHALL include appropriate aria-label for accessibility
4. WHEN the blog link is clicked, THE original page SHALL remain unchanged
5. THE System SHALL handle the external link without affecting the current session