import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Button = styled.button`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-family: ${theme.fonts.pressStart2P};
  font-size: 0.8rem;
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: default;
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
