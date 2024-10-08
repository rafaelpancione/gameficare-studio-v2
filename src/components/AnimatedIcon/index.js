// src/components/AnimatedIcon/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { StyledIcon } from './styles';

/**
 * Componente de Ícone Animado
 *
 * @param {React.Component} icon - Componente do ícone SVG importado.
 */
const AnimatedIcon = ({ icon: IconComponent, altText = 'Ícone' }) => {
  return (
    <StyledIcon>
      <IconComponent aria-label={altText} />
    </StyledIcon>
  );
};

AnimatedIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  altText: PropTypes.string,
};

export default AnimatedIcon;
