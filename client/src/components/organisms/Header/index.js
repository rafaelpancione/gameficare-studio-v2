import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  Logo,
  Tooltip,
  Menu,
  MobileMenuWrapper,
  MenuItem,
  HamburgerButton,
  CloseButton,
  Overlay,
} from './styles';
import logoSvg from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Header = ({ menuItems = [], tooltipText = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => {
      const newState = !prevState;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      closeMobileMenu();
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer as={Link} to="/" title="Voltar para a página inicial">
          <Logo src={logoSvg} alt="Logo Gameficare" />
          <Tooltip>{tooltipText}</Tooltip>
        </LogoContainer>

        {/* Menu Desktop */}
        <Menu $isMobile={false}>
          {menuItems.map((item) => (
            <MenuItem
              as={Link}
              to={item.link}
              key={item.label}
              onClick={closeMobileMenu}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Botão Hambúrguer */}
        <HamburgerButton
          onClick={handleMobileMenu}
          aria-label="Abrir menu"
          aria-expanded={isMobileMenuOpen}
        >
          <FiMenu size={24} />
        </HamburgerButton>

        {/* Menu Mobile */}
        <Overlay
          $isOpen={isMobileMenuOpen}
          onClick={closeMobileMenu}
          onKeyDown={handleOverlayKeyDown}
          tabIndex="0"
          role="button"
          aria-label="Fechar menu"
        />
        <MobileMenuWrapper $isOpen={isMobileMenuOpen}>
          <CloseButton onClick={handleMobileMenu} aria-label="Fechar menu">
            <FiX size={24} />
          </CloseButton>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '24px 0 8px 0',
            }}
          >
            <img
              src={logoSvg}
              alt="Logo Gameficare"
              style={{ width: 64, height: 'auto' }}
            />
          </div>
          <Menu $isMobile={true}>
            {menuItems.map((item) => (
              <MenuItem
                as={Link}
                to={item.link}
                key={item.label}
                onClick={closeMobileMenu}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
          {/* Footer com social icons acima do ano */}
          <div
            style={{
              position: 'absolute',
              bottom: 78,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: 16,
              marginBottom: 8,
            }}
          >
            <a
              href="https://www.instagram.com/gameficare/"
              aria-label="Instagram (abre nova janela)"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', fontSize: 28 }}
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/company/gameficare/"
              aria-label="LinkedIn (abre nova janela)"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', fontSize: 28 }}
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 46,
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 14,
              opacity: 0.7,
            }}
          >
            © 2025
          </div>
        </MobileMenuWrapper>
      </HeaderContent>
    </HeaderContainer>
  );
};

Header.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  tooltipText: PropTypes.string,
};

export default Header;
