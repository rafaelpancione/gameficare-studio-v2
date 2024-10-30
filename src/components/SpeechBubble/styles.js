// src/components/SpeechBubble/styles.js

import styled from 'styled-components';

export const BubbleContainer = styled.div`
  position: relative;
  width: 66.666%; /* Ocupa 2/3 do container */
  margin: 20px 0;
`;

export const BubbleContent = styled.div`
  position: relative;
  background-color: var(--white);
  border: 2px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0 #000;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #000;
  text-align: left;
  line-height: 1.4;
`;

export const BubbleTail = styled.div`
  position: absolute;
  bottom: -30px; /* Ajuste conforme necessário */
  left: 50px; /* Ajuste conforme necessário */
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 30px 20px 0 20px;
  border-color: var(--white) transparent transparent transparent;
  transform: rotate(-0deg);
  z-index: 0;

  /* Borda da cauda */
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -22px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 32px 22px 0 22px;
    border-color: #000 transparent transparent transparent;
    transform: rotate(-25deg);
    z-index: -1;
  }
`;

/* Ajustes para aproximar as coordenadas fornecidas */
const tailCoordinates = {
  point1: { x: 0, y: 0 }, // Ponto base do balão
  point2: { x: -111.229, y: 403 },
  point3: { x: 230.17, y: -88.515 },
};


export const SliderDots = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ active }) => (active ? '#000' : 'var(--yellow)')};
  margin-left: 5px;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--blue);
  }
`;
