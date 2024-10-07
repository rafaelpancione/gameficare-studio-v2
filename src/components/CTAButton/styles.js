// src/components/CTAButton/styles.js

import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ variant }) =>
    variant === 'primary' ? 'var(--yellow)' : 'transparent'};
  color: #000;
  font-family: 'Press Start 2P', cursive;
  text-transform: uppercase;
  border: 2px solid #000;
  border-radius: 8px;
  padding: ${({ size }) => {
    if (size === 'small') return '10px 20px';
    if (size === 'large') return '20px 40px';
    return '15px 30px'; // tamanho médio padrão
  }};
  font-size: ${({ size }) => {
    if (size === 'small') return '0.8rem';
    if (size === 'large') return '1.2rem';
    return '1rem'; // tamanho médio padrão
  }};
  position: relative;
  box-shadow: 5px 5px 0 #000;
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary' ? 'var(--white)' : 'transparent'};
    color: ${({ variant }) => (variant === 'secondary' ? 'var(--blue)' : '#000')};
    border-color: ${({ variant }) =>
      variant === 'secondary' ? 'var(--blue)' : '#000'};
    box-shadow: 5px 5px 0
      ${({ variant }) => (variant === 'secondary' ? 'var(--blue)' : '#000')};
  }

  &:active {
    top: 5px;
    left: 5px;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;
