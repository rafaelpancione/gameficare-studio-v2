import styled, { css } from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors?.darkBlue || '#002244'};
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '0.5rem'};
  box-shadow: 0.5rem 0.5rem 0 ${({ theme }) => theme.colors?.black || '#000'};
  padding: clamp(1.5rem, 5vw, 2.5rem);
  position: relative;
  overflow: hidden;
`;

export const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  font-weight: 500;
`;

const sharedInputStyles = css`
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(0.9rem, 2vw, 1rem);
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors?.white || '#fff'};
  width: 100%;
  transition: all 0.2s ease;
  box-shadow: 0.25rem 0.25rem 0 ${({ theme }) => theme.colors?.black || '#000'};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors?.yellow || '#ffd700'};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors?.yellow || '#ffd700'};
  }

  /* Uso de transient prop para evitar passar propriedades não-DOM ao elemento HTML */
  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.colors?.red || '#ff0000'};
      box-shadow: 0.25rem 0.25rem 0 ${theme.colors?.red || '#ff0000'};
    `}
`;

export const InputField = styled.input`
  ${sharedInputStyles}
  min-height: 48px;
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const SelectField = styled.select`
  ${sharedInputStyles}
  appearance: none;
  min-height: 48px;
  cursor: pointer;
`;

export const TextAreaField = styled.textarea`
  ${sharedInputStyles}
  min-height: 150px;
  resize: vertical;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors?.red || '#ff0000'};
  font-size: 0.875rem;
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
  order: 3;
  text-align: center; // Centraliza o texto
  width: 100%; // Ocupa toda a largura
  margin: 1rem 0; // Espaçamento consistente
`;

export const ArrowIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  
  img {
    width: 1.25rem;
    height: 1.25rem;
    filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg);
  }
`;

export const SubmitButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.875rem, 2vw, 1rem);
  background-color: ${({ theme }) => theme.colors?.yellow || '#ffd700'};
  color: ${({ theme }) => theme.colors?.black || '#000'};
  padding: 1rem 2rem;
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: 0.25rem;
  box-shadow: 0.5rem 0.5rem 0 ${({ theme }) => theme.colors?.black || '#000'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  width: 100%;
  margin-top: 1rem;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors?.red || '#ff0000'};
    transform: translateY(-2px);
    box-shadow: 0.75rem 0.75rem 0 ${({ theme }) => theme.colors?.black || '#000'};
  }

  &:active {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
