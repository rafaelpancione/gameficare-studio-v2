import styled from 'styled-components';

export const GameWrapper = styled.div`
  position: absolute;
  /* Posiciona o canvas dentro do retângulo interno do SVG */
  top: 16.48%;
  left: 30.03%;
  width: 39.91%;
  height: 49.2%;
  overflow: hidden; /* recorta tudo que sai do visor */
  background-color: #071f56; /* garante fundo exato por baixo do canvas */
  pointer-events: auto; /* habilita mouse/touch dentro do console */
  z-index: 0; /* fica abaixo da arte do console */

  @media (max-width: 768px) {
    top: 18%;
    left: 10%;
    width: 80%;
    height: 35%;
  }
`;

export const GameCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;
