// src/components/SimpleProjectCard/styles.js

import styled from 'styled-components';

export const Card = styled.div`
  background-color: var(--white);
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 0 #000;
  width: 66.666%; /* Ocupa 2/3 do container */
  margin: 20px 0;
  overflow: hidden;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: #000;
  margin: 0 0 10px;
  text-align: left;
`;

export const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: #000;
  margin: 0;
  line-height: 1.4;
  text-align: left;
`;
