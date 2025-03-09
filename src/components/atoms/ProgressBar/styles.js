import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: ${({ theme }) => theme.typography?.body || '1rem'};
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  margin-bottom: ${({ theme }) => (theme.spacing ? theme.spacing(1.25) : '10px')};
  text-align: left;
`;

/*
  Alteração principal:
  - Em vez de usar 'auto' nas colunas, usamos '1fr' para que cada célula ocupe uma fração igual do espaço disponível.
  - Dessa forma, se o container ficar mais estreito, as células (quadradinhos) se reduzirão proporcionalmente.
*/
export const BarContainer = styled.div`
  width: 100%;
  border: 0.1875rem solid ${({ theme }) => theme.colors?.black || '#000'};
  background-color: ${({ theme }) => theme.colors?.white || '#fff'};
  padding: ${({ theme }) => (theme.spacing ? theme.spacing(0.625) : '5px')};
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(${({ $totalSquares }) => $totalSquares}, 1fr);
  gap: 0.25rem;
`;

/*
  Alteração principal no Square:
  - Em vez de definir um tamanho fixo, definimos a largura como 100% da célula da grid.
  - Com 'max-width: 1.25rem' garantimos que, em telas maiores, o quadrado não ultrapasse o tamanho desejado.
  - Usando 'aspect-ratio: 1/1' garantimos que ele permaneça quadrado.
*/
export const Square = styled.div`
  width: 100%;
  max-width: 1.25rem;
  aspect-ratio: 1 / 1;
  background-color: ${({ filled, color }) => (filled ? color : 'transparent')};
  border: 0.0625rem solid ${({ theme }) => theme.colors?.black || '#000'};
  box-sizing: border-box;
`;
