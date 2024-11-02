// src/components/CTAButton/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

/**
 * Botão de Chamada de Ação
 *
 * @param {string} text - Texto exibido no botão.
 * @param {string} variant - Variante de cor do botão ('primary' ou 'secondary').
 * @param {string} size - Tamanho do botão ('small', 'medium', 'large').
 * @param {function} onClick - Função chamada ao clicar no botão.
 */
const CTAButton = ({ text, variant, size, onClick }) => {
  return (
    <Button variant={variant} size={size} onClick={onClick}>
      {text}
    </Button>
  );
};

CTAButton.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
};

CTAButton.defaultProps = {
  variant: 'primary',
  size: 'medium',
  onClick: () => {},
};

export default CTAButton;