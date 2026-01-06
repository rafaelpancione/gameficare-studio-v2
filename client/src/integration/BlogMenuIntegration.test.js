import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Import all pages to test integration
import HomePage from '../pages/HomePage';
import SobrePage from '../pages/SobrePage';
import ProjetosPage from '../pages/ProjetosPage';
import ContatoPage from '../pages/ContatoPage';

// Mock theme for testing
const mockTheme = {
  colors: {
    white: '#fff',
    yellow: '#ffff00',
    black: '#000',
    dark: '#111',
    green: '#00cc66',
    blue: '#3564DA'
  },
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "'Roboto', sans-serif"
  },
  spacing: (multiplier) => `${multiplier * 8}px`,
  borderRadius: '5px',
  containerMaxWidth: '1200px',
  typography: {
    h2: '2rem',
    body: '1rem'
  }
};

// Mock Helmet to avoid issues in tests
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }) => children,
}));

// Mock lazy loading for VideoPlayer
jest.mock('../components/organisms/VideoPlayer', () => {
  return function MockVideoPlayer() {
    return <div data-testid="video-player">Video Player</div>;
  };
});

// Mock ConsoleGame component
jest.mock('../components/organisms/ConsoleGame', () => {
  return function MockConsoleGame() {
    return <div data-testid="console-game">Console Game</div>;
  };
});

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={mockTheme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Blog Menu Integration Tests - Task 6 Final Validation', () => {
  
  describe('Navigation between all pages', () => {
    test('HomePage contains Blog menu in correct position', () => {
      renderWithProviders(<HomePage />);
      
      // Verify Blog menu exists
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      expect(blogLinks).toHaveLength(2); // Desktop + Mobile
      
      // Verify correct URL
      blogLinks.forEach(link => {
        expect(link).toHaveAttribute('href', 'https://blog.gameficare.com.br');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('SobrePage contains Blog menu in correct position', () => {
      renderWithProviders(<SobrePage />);
      
      // Verify Blog menu exists
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      expect(blogLinks).toHaveLength(2); // Desktop + Mobile
      
      // Verify correct URL
      blogLinks.forEach(link => {
        expect(link).toHaveAttribute('href', 'https://blog.gameficare.com.br');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('ProjetosPage contains Blog menu in correct position', () => {
      renderWithProviders(<ProjetosPage />);
      
      // Verify Blog menu exists
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      expect(blogLinks).toHaveLength(2); // Desktop + Mobile
      
      // Verify correct URL
      blogLinks.forEach(link => {
        expect(link).toHaveAttribute('href', 'https://blog.gameficare.com.br');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('ContatoPage contains Blog menu in correct position', () => {
      renderWithProviders(<ContatoPage />);
      
      // Verify Blog menu exists
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      expect(blogLinks).toHaveLength(2); // Desktop + Mobile
      
      // Verify correct URL
      blogLinks.forEach(link => {
        expect(link).toHaveAttribute('href', 'https://blog.gameficare.com.br');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Blog menu appears consistently', () => {
    const pages = [
      { name: 'HomePage', component: HomePage },
      { name: 'SobrePage', component: SobrePage },
      { name: 'ProjetosPage', component: ProjetosPage },
      { name: 'ContatoPage', component: ContatoPage }
    ];

    pages.forEach(({ name, component: PageComponent }) => {
      test(`${name} has Blog menu positioned between Projetos and Contato`, () => {
        renderWithProviders(<PageComponent />);
        
        // Get all menu links (filter out logo and social links)
        const allLinks = screen.getAllByRole('link');
        const menuLinks = allLinks.filter(link => 
          ['Home', 'Sobre', 'Projetos', 'Blog', 'Contato'].includes(link.textContent)
        );
        
        // Should have 10 total links (5 items × 2 instances each)
        expect(menuLinks).toHaveLength(10);
        
        // Check positioning in desktop menu (first 5 links)
        const desktopLinks = menuLinks.slice(0, 5);
        expect(desktopLinks[0]).toHaveTextContent('Home');
        expect(desktopLinks[1]).toHaveTextContent('Sobre');
        expect(desktopLinks[2]).toHaveTextContent('Projetos');
        expect(desktopLinks[3]).toHaveTextContent('Blog');
        expect(desktopLinks[4]).toHaveTextContent('Contato');
        
        // Check positioning in mobile menu (last 5 links)
        const mobileLinks = menuLinks.slice(5, 10);
        expect(mobileLinks[0]).toHaveTextContent('Home');
        expect(mobileLinks[1]).toHaveTextContent('Sobre');
        expect(mobileLinks[2]).toHaveTextContent('Projetos');
        expect(mobileLinks[3]).toHaveTextContent('Blog');
        expect(mobileLinks[4]).toHaveTextContent('Contato');
      });
    });
  });

  describe('Blog link opens correctly in new tab', () => {
    const pages = [
      { name: 'HomePage', component: HomePage },
      { name: 'SobrePage', component: SobrePage },
      { name: 'ProjetosPage', component: ProjetosPage },
      { name: 'ContatoPage', component: ContatoPage }
    ];

    pages.forEach(({ name, component: PageComponent }) => {
      test(`${name} Blog link has correct security attributes`, () => {
        renderWithProviders(<PageComponent />);
        
        const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
        
        // Test both desktop and mobile instances
        blogLinks.forEach(blogLink => {
          expect(blogLink).toHaveAttribute('href', 'https://blog.gameficare.com.br');
          expect(blogLink).toHaveAttribute('target', '_blank');
          expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
          expect(blogLink).toHaveAttribute('aria-label', 'Blog (abre em nova aba)');
          
          // Verify external link indicator
          const externalIcon = blogLink.querySelector('span[aria-hidden="true"]');
          expect(externalIcon).toBeInTheDocument();
        });
      });
    });
  });

  describe('Accessibility and visual consistency', () => {
    test('All pages maintain consistent Blog menu accessibility', () => {
      const pages = [HomePage, SobrePage, ProjetosPage, ContatoPage];
      
      pages.forEach(PageComponent => {
        const { unmount } = renderWithProviders(<PageComponent />);
        
        // Check navigation landmarks exist
        const desktopNav = screen.getByRole('navigation', { name: 'Menu principal' });
        const mobileNav = screen.getByRole('navigation', { name: 'Menu mobile' });
        
        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();
        
        // Check Blog links have proper accessibility
        const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
        blogLinks.forEach(blogLink => {
          expect(blogLink).toHaveAttribute('tabIndex', '0');
          expect(blogLink).toHaveAttribute('aria-label', 'Blog (abre em nova aba)');
        });
        
        unmount();
      });
    });

    test('Blog menu maintains visual consistency across all pages', () => {
      const pages = [HomePage, SobrePage, ProjetosPage, ContatoPage];
      
      pages.forEach(PageComponent => {
        const { unmount } = renderWithProviders(<PageComponent />);
        
        // Get Blog and other menu items
        const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
        const homeLinks = screen.getAllByRole('link', { name: 'Home' });
        
        // Both should have same number of instances
        expect(blogLinks).toHaveLength(2);
        expect(homeLinks).toHaveLength(2);
        
        // Blog links should have external indicators, home links should not
        blogLinks.forEach(blogLink => {
          const externalIcon = blogLink.querySelector('span[aria-hidden="true"]');
          expect(externalIcon).toBeInTheDocument();
        });
        
        homeLinks.forEach(homeLink => {
          const externalIcon = homeLink.querySelector('span[aria-hidden="true"]');
          expect(externalIcon).not.toBeInTheDocument();
        });
        
        unmount();
      });
    });
  });

  describe('Requirements validation', () => {
    test('Validates Requirements 2.1 - Blog menu added to all pages', () => {
      const pages = [
        { name: 'HomePage', component: HomePage },
        { name: 'SobrePage', component: SobrePage },
        { name: 'ProjetosPage', component: ProjetosPage },
        { name: 'ContatoPage', component: ContatoPage }
      ];

      pages.forEach(({ name, component: PageComponent }) => {
        const { unmount } = renderWithProviders(<PageComponent />);
        
        // Verify Blog menu exists on every page
        const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
        expect(blogLinks.length).toBeGreaterThan(0);
        
        unmount();
      });
    });

    test('Validates Requirements 3.4 - Original page remains unchanged', () => {
      // This test verifies that clicking Blog link doesn't affect current session
      // by checking that the page structure remains intact
      renderWithProviders(<HomePage />);
      
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      
      // Verify the link exists and has correct attributes
      expect(blogLinks[0]).toHaveAttribute('href', 'https://blog.gameficare.com.br');
      expect(blogLinks[0]).toHaveAttribute('target', '_blank');
      
      // Verify page content is still present (indicating page wasn't navigated away)
      expect(screen.getByText('BOAS VINDAS À')).toBeInTheDocument();
    });

    test('Validates Requirements 3.5 - External link handling without affecting session', () => {
      renderWithProviders(<ContatoPage />);
      
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      
      // Verify external link attributes that prevent affecting current session
      blogLinks.forEach(blogLink => {
        expect(blogLink).toHaveAttribute('target', '_blank');
        expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
      
      // Verify page content remains (session not affected)
      expect(screen.getByText('VAMOS BATER UM PAPO?')).toBeInTheDocument();
    });
  });
});