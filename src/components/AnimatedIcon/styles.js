// src/components/AnimatedIcon/styles.js

import styled, { keyframes } from 'styled-components';

const sway = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(0); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

export const StyledIcon = styled.div`
  display: block;
  margin: 0 auto 20px; /* Centraliza o ícone e adiciona margem inferior */
  width: 60px;
  height: 60px;

  svg {
    width: 100%;
    height: 100%;
    animation: ${sway} 5s ease-in-out infinite;
  }
`;
