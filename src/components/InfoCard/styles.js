// src/components/InfoCard/styles.js

import styled, { keyframes } from 'styled-components';


export const Card = styled.div`
  background-color: var(--dark-blue);
  border: 2px solid #000;
  border-radius: 5px; /* Menos arredondado que o botão */
  box-shadow: 5px 5px 0 #000;
  width: calc(33.333% - 20px); /* Ajuste para 3 cards lado a lado com margens */
  min-height: 450px; /* Aumenta a altura mínima do card */
  margin: 10px;
  padding: 20px;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;
  text-align: left; /* Título e descrição alinhados à esquerda */
  display: flex;
  flex-direction: column;
  flex: 1;

  &:hover {
    transform: scale(1.05);
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
   
  }
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  min-height: 60px; /* Define uma altura mínima para o título */
  color: #fff;
  margin: 20px 0 10px;
  line-height: 1.2;
  display: flex;
  align-items: center;
`;

export const Description = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: #fff;
  margin: 0;
  line-height: 1.4;
  flex: 1;
`;
