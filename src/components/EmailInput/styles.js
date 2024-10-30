// src/components/EmailInput/styles.js

import styled from 'styled-components';

export const InputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  height: 48px;
  width: 100%;
  border: 2px solid #000;
  border-radius: 5px; /* Mesmo padrão dos cards */
  box-shadow: 5px 5px 0 #000;
  overflow: hidden;
`;

export const InputField = styled.input`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  flex: 1;
  height: 100%;
  padding: 0 10px;
  border: none;
  outline: none;
  background-color: var(--white);
`;

export const SubmitButton = styled.button`
  width: 48px;
  height: 100%;
  background-color: var(--red);
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--yellow);
  }
`;

export const ArrowIcon = styled.span`
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
    fill: #000;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--red);
  font-size: 0.8rem;
  margin-top: 5px;
  display: block;
  font-family: 'Roboto Mono', monospace;
`;
