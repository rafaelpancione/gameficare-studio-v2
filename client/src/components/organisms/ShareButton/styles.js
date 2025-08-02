import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Overlay = styled.div`
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  position: relative;
  padding: 6px 18px;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  background: #ffd700;
  color: #000;
  border: 2px solid #000;
  cursor: pointer;
  text-transform: uppercase;
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  /* efeito de "moldura dupla" semelhante ao canvas */
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 0;
    bottom: 0;
    background: #000;
    z-index: -1;
  }
`;

export const FallbackMessage = styled.div`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  font-family: ${theme.fonts.pressStart2P};
  font-size: 0.75rem;
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
  line-height: 1.4;
`;
