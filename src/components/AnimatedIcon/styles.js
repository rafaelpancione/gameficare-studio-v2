// src/components/AnimatedIcon/styles.js

import styled, { keyframes } from 'styled-components';

const sway = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(-8px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(8px); }
  100% { transform: translateY(0); }
`;

export const StyledIcon = styled.div`
  display: block;
  margin: 0 auto 20px; /* Centraliza o ícone e adiciona margem inferior */
  width: 100px;
  height: 100px;

  svg {
    width: 100%;
    height: 100%;
    animation: ${sway} 5s ease-in-out infinite;
  }
`;
