import styled from 'styled-components';

export const GameWrapper = styled.div`
  ${(p) =>
    p.fullWidth
      ? `
      position: static;
      width: 100vw;
      max-width: 100vw;
      aspect-ratio: 4 / 3;   /* 75 % da largura gera altura */
      background:#071f56;
      display:flex;
      justify-content:center;
      align-items:center;
  `
      : `
      position:absolute;
      top:16.48%; left:30.03%;
      width:39.91%; height:49.2%;
      aspect-ratio:575.803 / 428.822;
      background:#071f56;
  `}

  /* mobile overwrite SÓ quando NÃO for fullWidth */
  @media (max-width:768px) {
    ${(p) =>
      !p.fullWidth &&
      `
        top:16.48%; left:30.03%;
        width:39.91%; aspect-ratio:575.803 / 428.822;
    `}
  }
`;

export const GameCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  touch-action: manipulation;
`;
