// src/components/ContactForm/styles.js

import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 500px; /* Ocupa metade do container principal */
  margin: 20px 0;
  @media (max-width: 768px) {
    width: 100%; /* Ocupa 100% em telas menores */
  }
`;

export const FormContainer = styled.div`
  background-color: var(--blue);
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 0 #000;
  padding: 20px;
  box-sizing: border-box;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputField = styled.input`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: #000;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 3px 3px 0 #000;
  margin-bottom: 15px;
  background-color: #fff;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  ${({ hasError }) =>
    hasError &&
    `
    border-color: var(--red);
    box-shadow: 3px 3px 0 var(--red);
  `}
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectField = styled.select`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: #000;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 3px 3px 0 #000;
  margin-bottom: 15px;
  background-color: #fff;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  appearance: none; /* Remove a seta padrão do select */

  ${({ hasError }) =>
    hasError &&
    `
    border-color: var(--red);
    box-shadow: 3px 3px 0 var(--red);
  `}
`;

export const TextAreaField = styled.textarea`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: #000;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 3px 3px 0 #000;
  margin-bottom: 15px;
  background-color: #fff;
  outline: none;
  width: 100%;
  height: 150px; /* Maior altura vertical */
  resize: vertical; /* Permite redimensionar verticalmente */
  box-sizing: border-box;

  ${({ hasError }) =>
    hasError &&
    `
    border-color: var(--red);
    box-shadow: 3px 3px 0 var(--red);
  `}
`;

export const ErrorMessage = styled.span`
  color: var(--red);
  font-size: 0.8rem;
  margin-top: -10px;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
`;

export const ArrowIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
    fill: #000;
  }
`;

export const SubmitButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: #000;
  padding: 15px;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 0 #000;
  background-color: var(--yellow);
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  outline: none;
  text-transform: uppercase;

  &:hover {
    background-color: var(--red);
  }
`;
