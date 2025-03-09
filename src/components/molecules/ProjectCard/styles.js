import styled, { css } from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: stretch;
  background-color: ${({ theme }) => theme.colors?.yellow || '#FFD700'};
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '8px'};
  box-shadow: 5px 5px 0 ${({ theme }) => theme.colors?.black || '#000'};
  margin: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px 0')};
  overflow: hidden;
  transition: transform 0.2s ease;
  gap: 1.5rem;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ImageContainer = styled.div`

  
  position: relative;
  background: ${({ theme }) => theme.colors?.black + '15' || 'rgba(0,0,0,0.1)'};

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (max-width: 768px) {
  img {
    height: 100%;
    display: block;
  }
   }
`;

export const Content = styled.div`
  flex: 1; /* Ocupa todo espaço restante */
  padding: clamp(1rem, 2vw, 1.5rem);
  display: flex;
  flex-direction: column;
 justify-content: space-between; 
  height: 100%;
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1rem, 1.1vw + 0.8rem, 1.25rem); /* Tamanho mais compacto */
  color: ${({ theme }) => theme.colors?.black || '#000'};
  margin: 0 0 0.75rem;
  line-height: 1.3;
`;

export const Description = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(0.875rem, 0.9vw + 0.7rem, 0.95rem); /* Redução sutil no tamanho */
  color: ${({ theme }) => theme.colors?.black || '#000'};
  margin: 0 0 1.25rem;
  line-height: 1.5;
  flex-grow: 1; /* Ocupa espaço disponível */
  display: -webkit-box;
 
   -webkit-line-clamp: 6; /* Aumenta número de linhas visíveis */
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    -webkit-line-clamp: 4;
  }
`;

export const LearnMore = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.75rem, 0.8vw + 0.6rem, 0.85rem);
  color: ${({ theme }) => theme.colors?.black || '#000'};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  margin-top: auto; /* Empurra para baixo */
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors?.black || '#000'};
    color: ${({ theme }) => theme.colors?.yellow || '#FFD700'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.red || '#FF0000'};
    outline-offset: 2px;
  }
`;

export const ArrowIcon = styled.span`
  font-weight: 700;
  transition: transform 0.2s ease;

  ${LearnMore}:hover & {
    transform: translateX(3px);
    color: inherit;
  }
`;