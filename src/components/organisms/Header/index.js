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
  Overlay
} from './styles';
import logoSvg from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = ({ menuItems = [], tooltipText = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => {
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
        <LogoContainer>
          <Logo src={logoSvg} alt="Logo" />
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
          <CloseButton 
            onClick={handleMobileMenu}
            aria-label="Fechar menu"
          >
            <FiX size={24} />
          </CloseButton>
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
