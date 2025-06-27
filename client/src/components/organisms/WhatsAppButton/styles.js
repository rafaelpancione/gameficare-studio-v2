import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WhatsAppContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 30px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0px;
  /* Debug: garantir que seja visível */
  background: rgba(255, 0, 0, 0.3);
  padding: 10px;
  border: 2px solid red;
`;

export const WhatsAppButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.3s ease;
  animation: ${bounce} 4s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    animation-play-state: paused;
  }

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const BalloonContainer = styled.div`
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  

  img {
    width: 360px;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    img {
      width: 300px;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #000;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.2s ease;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    top: 8px;
    right: 15px;
  }
`;
