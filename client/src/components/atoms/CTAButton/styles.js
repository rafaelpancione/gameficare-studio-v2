import styled from 'styled-components';

export const Button = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.yellow : 'transparent'};
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Press Start 2P', cursive;
  text-transform: uppercase;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `${theme.spacing(2.5)} ${theme.spacing(2.5)}`;
      case 'large':
        return `${theme.spacing(3.75)} ${theme.spacing(5)}`;
      default:
        return `${theme.spacing(1.875)} ${theme.spacing(3.75)}`;
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.8rem';
      case 'large':
        return '1.2rem';
      default:
        return '1rem';
    }
  }};
  position: relative;
  box-shadow: 5px 5px 0 ${({ theme }) => theme.colors.black};
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.white : 'transparent'};
    color: ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.blue : theme.colors.black};
    border-color: ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.blue : theme.colors.black};
    box-shadow: 5px 5px 0
      ${({ theme, variant }) =>
        variant === 'secondary' ? theme.colors.blue : theme.colors.black};
  }

  &:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue};
    outline-offset: 2px;
  }
`;
