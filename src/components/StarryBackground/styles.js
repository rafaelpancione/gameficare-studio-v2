// src/components/StarryBackground/styles.js

import styled, { keyframes } from 'styled-components';
import starSvg from '../../assets/images/star.svg'; // Certifique-se de que o caminho está correto

export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--blue);
  overflow: hidden;
  z-index: -1;
`;

export const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(
      rgba(255, 255, 255, 0.10) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.10) 1px,
      transparent 1px
    );
  background-size: 50px 50px;
`;

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

// styles.js
export const Star = styled.div`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-image: url(${starSvg});
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  animation: ${blinkAnimation} 5s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;


