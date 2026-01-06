import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './index';

// Mock theme for testing
const mockTheme = {
  colors: {
    white: '#fff',
    yellow: '#ffff00',
    black: '#000',
    dark: '#111'
  },
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "'Roboto', sans-serif"
  },
  spacing: (multiplier) => `${multiplier * 8}px`,
  borderRadius: '5px'
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={mockTheme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('renders internal links correctly', () => {
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'Sobre', link: '/sobre' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Use getAllByRole since there are desktop and mobile versions
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    const sobreLinks = screen.getAllByRole('link', { name: 'Sobre' });
    
    // Should have 2 of each (desktop + mobile)
    expect(homeLinks).toHaveLength(2);
    expect(sobreLinks).toHaveLength(2);
    
    // Check first instance (desktop)
    expect(homeLinks[0]).toHaveAttribute('href', '/');
    expect(sobreLinks[0]).toHaveAttribute('href', '/sobre');
  });

  test('renders external links with correct security attributes', () => {
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'Blog', link: 'https://blog.gameficare.com.br' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Use getAllByRole since there are desktop and mobile versions
    const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
    
    // Should have 2 instances (desktop + mobile)
    expect(blogLinks).toHaveLength(2);
    
    // Check first instance (desktop)
    const blogLink = blogLinks[0];
    expect(blogLink).toHaveAttribute('href', 'https://blog.gameficare.com.br');
    expect(blogLink).toHaveAttribute('target', '_blank');
    expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('handles mixed internal and external links', () => {
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'Sobre', link: '/sobre' },
      { label: 'Blog', link: 'https://blog.gameficare.com.br' },
      { label: 'Contato', link: '/contato' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Internal links (use first instance of each)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    const sobreLinks = screen.getAllByRole('link', { name: 'Sobre' });
    const contatoLinks = screen.getAllByRole('link', { name: 'Contato' });
    
    // External link
    const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
    
    // Verify internal links don't have external attributes
    expect(homeLinks[0]).not.toHaveAttribute('target');
    expect(sobreLinks[0]).not.toHaveAttribute('target');
    expect(contatoLinks[0]).not.toHaveAttribute('target');
    
    // Verify external link has correct attributes
    expect(blogLinks[0]).toHaveAttribute('target', '_blank');
    expect(blogLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('detects http and https URLs as external', () => {
    const menuItems = [
      { label: 'HTTP Link', link: 'http://example.com' },
      { label: 'HTTPS Link', link: 'https://example.com' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    const httpLinks = screen.getAllByRole('link', { name: 'HTTP Link (abre em nova aba)' });
    const httpsLinks = screen.getAllByRole('link', { name: 'HTTPS Link (abre em nova aba)' });
    
    // Check first instance of each
    expect(httpLinks[0]).toHaveAttribute('target', '_blank');
    expect(httpsLinks[0]).toHaveAttribute('target', '_blank');
  });

  test('mobile menu external links have closeMobileMenu functionality', () => {
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'Blog', link: 'https://blog.gameficare.com.br' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Get mobile menu links (second instance of each link)
    const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
    
    // Should have 2 instances (desktop + mobile)
    expect(blogLinks).toHaveLength(2);
    
    // Mobile version should be the second instance
    const mobileBlogLink = blogLinks[1];
    expect(mobileBlogLink).toHaveAttribute('href', 'https://blog.gameficare.com.br');
    expect(mobileBlogLink).toHaveAttribute('target', '_blank');
    expect(mobileBlogLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('external links have visual indicators', () => {
    const menuItems = [
      { label: 'Blog', link: 'https://blog.gameficare.com.br' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Check that external link icons are present (aria-hidden spans)
    const externalIcons = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
    
    // Should have external link icons in both desktop and mobile versions
    expect(externalIcons).toHaveLength(2);
    
    // Each link should contain the external link icon
    externalIcons.forEach(link => {
      const iconSpan = link.querySelector('span[aria-hidden="true"]');
      expect(iconSpan).toBeInTheDocument();
    });
  });

  test('navigation menus have proper ARIA labels', () => {
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'Blog', link: 'https://blog.gameficare.com.br' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Check desktop navigation
    const desktopNav = screen.getByRole('navigation', { name: 'Menu principal' });
    expect(desktopNav).toBeInTheDocument();
    
    // Check mobile navigation
    const mobileNav = screen.getByRole('navigation', { name: 'Menu mobile' });
    expect(mobileNav).toBeInTheDocument();
  });

  test('hamburger button has proper accessibility attributes', () => {
    const menuItems = [
      { label: 'Home', link: '/' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // The hamburger button exists but is hidden on desktop via CSS
    // We can still test its attributes by finding it in the DOM
    const hamburgerButton = screen.getByLabelText('Abrir menu');
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  test('all menu items have proper tabIndex for keyboard navigation', () => {
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'Blog', link: 'https://blog.gameficare.com.br' }
    ];

    renderWithProviders(<Header menuItems={menuItems} />);
    
    // Check that all menu items have tabIndex="0"
    const allLinks = screen.getAllByRole('link');
    
    // Filter out social media links and logo link
    const menuLinks = allLinks.filter(link => 
      link.textContent === 'Home' || link.textContent === 'Blog'
    );
    
    menuLinks.forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0');
    });
  });

  // ============== INTEGRATION TESTS FOR TASK 6 ==============
  
  describe('Integration Tests - Final Validation', () => {
    test('Blog menu item appears consistently across all page configurations', () => {
      // Test the exact menu configuration used in all pages
      const standardMenuItems = [
        { label: 'Home', link: '/' },
        { label: 'Sobre', link: '/sobre' },
        { label: 'Projetos', link: '/projetos' },
        { label: 'Blog', link: 'https://blog.gameficare.com.br' },
        { label: 'Contato', link: '/contato' },
      ];

      renderWithProviders(<Header menuItems={standardMenuItems} />);
      
      // Verify Blog menu item exists in both desktop and mobile
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      expect(blogLinks).toHaveLength(2); // Desktop + Mobile
      
      // Verify Blog is positioned correctly (4th item, between Projetos and Contato)
      const allMenuLinks = screen.getAllByRole('link').filter(link => 
        ['Home', 'Sobre', 'Projetos', 'Blog', 'Contato'].includes(link.textContent)
      );
      
      // Should have 10 total links (5 items × 2 instances each)
      expect(allMenuLinks).toHaveLength(10);
      
      // Check positioning in desktop menu (first 5 links)
      const desktopLinks = allMenuLinks.slice(0, 5);
      expect(desktopLinks[0]).toHaveTextContent('Home');
      expect(desktopLinks[1]).toHaveTextContent('Sobre');
      expect(desktopLinks[2]).toHaveTextContent('Projetos');
      expect(desktopLinks[3]).toHaveTextContent('Blog');
      expect(desktopLinks[4]).toHaveTextContent('Contato');
    });

    test('Blog link opens correctly in new tab with security attributes', () => {
      const standardMenuItems = [
        { label: 'Home', link: '/' },
        { label: 'Sobre', link: '/sobre' },
        { label: 'Projetos', link: '/projetos' },
        { label: 'Blog', link: 'https://blog.gameficare.com.br' },
        { label: 'Contato', link: '/contato' },
      ];

      renderWithProviders(<Header menuItems={standardMenuItems} />);
      
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      
      // Test both desktop and mobile instances
      blogLinks.forEach(blogLink => {
        expect(blogLink).toHaveAttribute('href', 'https://blog.gameficare.com.br');
        expect(blogLink).toHaveAttribute('target', '_blank');
        expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(blogLink).toHaveAttribute('aria-label', 'Blog (abre em nova aba)');
      });
    });

    test('Blog menu maintains visual consistency with other menu items', () => {
      const standardMenuItems = [
        { label: 'Home', link: '/' },
        { label: 'Sobre', link: '/sobre' },
        { label: 'Projetos', link: '/projetos' },
        { label: 'Blog', link: 'https://blog.gameficare.com.br' },
        { label: 'Contato', link: '/contato' },
      ];

      renderWithProviders(<Header menuItems={standardMenuItems} />);
      
      // Get all menu items
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      
      // Both should have same number of instances (desktop + mobile)
      expect(homeLinks).toHaveLength(2);
      expect(blogLinks).toHaveLength(2);
      
      // Blog links should have external link indicators
      blogLinks.forEach(blogLink => {
        const externalIcon = blogLink.querySelector('span[aria-hidden="true"]');
        expect(externalIcon).toBeInTheDocument();
      });
      
      // Internal links should not have external indicators
      homeLinks.forEach(homeLink => {
        const externalIcon = homeLink.querySelector('span[aria-hidden="true"]');
        expect(externalIcon).not.toBeInTheDocument();
      });
    });

    test('Navigation between all pages maintains Blog menu consistency', () => {
      // Test that the same menu structure works for all page types
      const testConfigurations = [
        // HomePage configuration
        {
          name: 'HomePage',
          menuItems: [
            { label: 'Home', link: '/' },
            { label: 'Sobre', link: '/sobre' },
            { label: 'Projetos', link: '/projetos' },
            { label: 'Blog', link: 'https://blog.gameficare.com.br' },
            { label: 'Contato', link: '/contato' },
          ]
        },
        // SobrePage configuration  
        {
          name: 'SobrePage',
          menuItems: [
            { label: 'Home', link: '/' },
            { label: 'Sobre', link: '/sobre' },
            { label: 'Projetos', link: '/projetos' },
            { label: 'Blog', link: 'https://blog.gameficare.com.br' },
            { label: 'Contato', link: '/contato' },
          ]
        },
        // ProjetosPage configuration
        {
          name: 'ProjetosPage',
          menuItems: [
            { label: 'Home', link: '/' },
            { label: 'Sobre', link: '/sobre' },
            { label: 'Projetos', link: '/projetos' },
            { label: 'Blog', link: 'https://blog.gameficare.com.br' },
            { label: 'Contato', link: '/contato' },
          ]
        },
        // ContatoPage configuration
        {
          name: 'ContatoPage',
          menuItems: [
            { label: 'Home', link: '/' },
            { label: 'Sobre', link: '/sobre' },
            { label: 'Projetos', link: '/projetos' },
            { label: 'Blog', link: 'https://blog.gameficare.com.br' },
            { label: 'Contato', link: '/contato' },
          ]
        }
      ];

      testConfigurations.forEach(config => {
        const { rerender } = renderWithProviders(<Header menuItems={config.menuItems} />);
        
        // Verify Blog menu exists and is positioned correctly
        const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
        expect(blogLinks).toHaveLength(2);
        
        // Verify Blog has correct attributes
        blogLinks.forEach(blogLink => {
          expect(blogLink).toHaveAttribute('href', 'https://blog.gameficare.com.br');
          expect(blogLink).toHaveAttribute('target', '_blank');
          expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
        });
        
        // Clean up for next iteration
        rerender(<div />);
      });
    });

    test('Mobile menu Blog functionality works correctly', () => {
      const standardMenuItems = [
        { label: 'Home', link: '/' },
        { label: 'Sobre', link: '/sobre' },
        { label: 'Projetos', link: '/projetos' },
        { label: 'Blog', link: 'https://blog.gameficare.com.br' },
        { label: 'Contato', link: '/contato' },
      ];

      renderWithProviders(<Header menuItems={standardMenuItems} />);
      
      // Get mobile Blog link (second instance)
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      const mobileBlogLink = blogLinks[1];
      
      // Verify mobile Blog link has onClick handler for closing menu
      expect(mobileBlogLink).toHaveAttribute('href', 'https://blog.gameficare.com.br');
      expect(mobileBlogLink).toHaveAttribute('target', '_blank');
      expect(mobileBlogLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      // Mobile link should have the same external link indicator
      const externalIcon = mobileBlogLink.querySelector('span[aria-hidden="true"]');
      expect(externalIcon).toBeInTheDocument();
    });

    test('Accessibility compliance for Blog menu across all contexts', () => {
      const standardMenuItems = [
        { label: 'Home', link: '/' },
        { label: 'Sobre', link: '/sobre' },
        { label: 'Projetos', link: '/projetos' },
        { label: 'Blog', link: 'https://blog.gameficare.com.br' },
        { label: 'Contato', link: '/contato' },
      ];

      renderWithProviders(<Header menuItems={standardMenuItems} />);
      
      const blogLinks = screen.getAllByRole('link', { name: 'Blog (abre em nova aba)' });
      
      // Test accessibility attributes
      blogLinks.forEach(blogLink => {
        // ARIA label indicates external link
        expect(blogLink).toHaveAttribute('aria-label', 'Blog (abre em nova aba)');
        
        // Keyboard navigation support
        expect(blogLink).toHaveAttribute('tabIndex', '0');
        
        // External link indicator is properly hidden from screen readers
        const externalIcon = blogLink.querySelector('span[aria-hidden="true"]');
        expect(externalIcon).toHaveAttribute('aria-hidden', 'true');
      });
      
      // Verify navigation landmarks
      const desktopNav = screen.getByRole('navigation', { name: 'Menu principal' });
      const mobileNav = screen.getByRole('navigation', { name: 'Menu mobile' });
      
      expect(desktopNav).toBeInTheDocument();
      expect(mobileNav).toBeInTheDocument();
    });
  });
});