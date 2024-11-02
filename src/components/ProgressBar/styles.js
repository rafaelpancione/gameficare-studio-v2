// src/components/ProgressBar/styles.js

import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: #000;
  margin-bottom: 10px;
  text-align: left;
`;

export const BarContainer = styled.div`
  width: 100%;
  border: 3px solid #000;
  background-color: #fff;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const Square = styled.div`
  width: calc(10% - 4px); /* 10 quadrados com espaço entre eles */
  height: 20px;
  background-color: ${({ filled, color }) => (filled ? color : 'transparent')};
  border: 1px solid #000;
  box-sizing: border-box;
`;
