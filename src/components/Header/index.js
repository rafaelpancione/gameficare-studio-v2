// src/components/Header/index.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  Logo,
  Tooltip,
  Menu,
  MenuItem,
} from './styles';
//import { Link } from 'react-router-dom';
import logoSvg from '../../assets/images/logo.svg';

/**
 * Componente de Cabeçalho (Header)
 *
 * @param {array} menuItems - Lista de itens do menu com 'label' e 'link'.
 * @param {string} tooltipText - Texto a ser exibido no tooltip do logo.
 */
const Header = ({ menuItems = [], tooltipText = '' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer $scrolled={scrolled}>
      <HeaderContent>
        <LogoContainer>
          <Logo src={logoSvg} alt="Logo" />
          <Tooltip>{tooltipText}</Tooltip>
        </LogoContainer>
        <Menu>
          {menuItems.map((item) => (
            <MenuItem key={item.label} href={item.link}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
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
