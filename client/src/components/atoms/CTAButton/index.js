import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

/**
 * Botão de Chamada de Ação
 *
 * @param {object} props - Propriedades do componente.
 * @param {string} props.text - Texto exibido no botão.
 * @param {'primary'|'secondary'} props.variant - Variante de cor do botão.
 * @param {'small'|'medium'|'large'} props.size - Tamanho do botão.
 * @param {function} props.onClick - Função executada ao clicar no botão.
 * @param {string} props.type - Tipo do botão (ex: "button", "submit").
 */
function CTAButtonComponent({ text, variant, size, onClick, type }) {
  return (
    <Button type={type} variant={variant} size={size} onClick={onClick}>
      {text}
    </Button>
  );
}

CTAButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  type: PropTypes.string,
};

CTAButtonComponent.defaultProps = {
  variant: 'primary',
  size: 'medium',
  onClick: () => {},
  type: 'button',
};

export default React.memo(CTAButtonComponent);
