import styled from 'styled-components';

export const InputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  height: 3rem; /* 48px convertidos para rem */
  width: 100%;
  border: 0.125rem solid ${({ theme }) => theme.colors.black || '#000'};
  border-radius: 0.3125rem; /* 5px */
  box-shadow: 0.3125rem 0.3125rem 0 ${({ theme }) => theme.colors.black || '#000'};
  overflow: hidden;
`;

export const InputField = styled.input`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  flex: 1;
  height: 100%;
  padding: 0 0.625rem; /* 10px */
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.white || 'var(--white)'};
`;

export const SubmitButton = styled.button`
  width: 3rem; /* 48px */
  height: 100%;
  background-color: ${({ theme }) => theme.colors.red || 'var(--red)'};
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow || 'var(--yellow)'};
  }
`;

export const ArrowIcon = styled.span`
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.black || '#000'};
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red || 'var(--red)'};
  font-size: 0.8rem;
  margin-top: 0.3125rem; /* 5px */
  display: block;
  font-family: 'Roboto Mono', monospace;
`;

export const SuccessMessage = styled.span`
  color: ${({ theme }) => theme.colors.green || '#28a745'};
  font-size: 0.8rem;
  margin-top: 0.3125rem;
  display: block;
  font-family: 'Roboto Mono', monospace;
`;
