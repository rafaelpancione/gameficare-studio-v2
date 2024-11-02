// src/components/SpeechBubble/styles.js

import styled from 'styled-components';

export const BubbleContainer = styled.div`
  position: relative;
  width: 66.666%; /* Ocupa 2/3 do container */
  margin: 20px 0;
`;

export const BubbleContent = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  .speech-bubble-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .text-content {
    position: absolute;
    top: 20%; /* Ajuste conforme necessário */
    left: 20%; /* Ajuste conforme necessário */
    width: 80%; /* Ajuste conforme necessário */
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    color: #000;
    text-align: left;
    line-height: 1.4;
  }
`;

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
