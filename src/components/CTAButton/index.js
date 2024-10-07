import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

/**
 * Botão de Chamada de Ação
 *
 * @param {string} text - Texto exibido no botão.
 * @param {function} onClick - Função chamada ao clicar no botão.
 */
const CTAButton = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

CTAButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CTAButton.defaultProps = {
  onClick: () => {},
};

export default CTAButton;
