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
  width: 100%;
  height: 100%;
  display: flex; /* Adicionado */
  align-items: center; /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */

  svg {
    width: 50%;
    height: auto;
    animation: ${sway} 5s ease-in-out infinite;
  }
`;
