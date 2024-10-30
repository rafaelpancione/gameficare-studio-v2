// src/components/ProjectCard/styles.js

import styled from 'styled-components';

export const ImageContainer = styled.div`
  flex: 1; /* Ocupa 1/3 do card */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  flex: 2; /* Ocupa 2/3 do card */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Card = styled.div`
  display: flex;
  background-color: var(--yellow);
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 0 #000;
  width: 100%;
  margin: 20px 0;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;

    ${ImageContainer} {
      flex: none;
      width: 100%;
    }

    ${Content} {
      flex: none;
      width: 100%;
    }
  }
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: #000;
  margin: 0 0 10px;
  text-align: left;
`;

export const Description = styled.p`
  font-family: 'Roboto mono', monospace;
  font-size: 0.9rem;
  color: #000;
  margin: 0 0 20px;
  line-height: 1.4;
  text-align: left;
  max-height: calc(1.4em * 6); /* Limita a seis linhas */
  overflow: hidden;
`;

export const LearnMore = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
  color: #000;
  text-decoration: none;
  align-self: flex-end;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const ArrowIcon = styled.span`
  margin-left: 5px;
  font-size: 1rem;
`;
