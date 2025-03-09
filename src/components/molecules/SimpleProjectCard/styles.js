import styled from 'styled-components';

/**
 * A estratégia de estilização segue as melhores práticas para garantir:
 * - Responsividade por meio de unidades dinâmicas (clamp, vw, etc.).
 * - Acessibilidade com transições reduzidas para usuários com preferências de "prefers-reduced-motion".
 * - Correção do problema de texto truncado em telas muito pequenas, removendo o clamp para permitir a leitura completa do conteúdo.
 */

export const Card = styled.article`
  --card-shadow: 0.25rem 0.25rem 0 ${({ theme }) => theme.colors?.black || '#000'};

  background-color: ${({ theme }) => theme.colors?.white || '#FFFFFF'};
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '0.5rem'};
  box-shadow: var(--card-shadow);
  width: min(100%, 40rem);
  margin: ${({ theme }) =>
    typeof theme.spacing === 'function'
      ? theme.spacing(2.5)
      : '1.25rem'} auto;
  overflow: hidden; /* Mantém o layout consistente */
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0.5rem 0.5rem 0 ${({ theme }) => theme.colors?.black || '#000'};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Content = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
  display: grid;
  gap: 0.75rem;
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1rem, 1.25vw + 0.8rem, 1.25rem);
  color: ${({ theme }) => theme.colors?.black || '#000'};
  line-height: 1.3;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 4vw, 1.3rem);
  }
`;

export const Description = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(0.875rem, 1vw + 0.7rem, 1rem);
  color: ${({ theme }) => theme.colors?.black || '#000'};
  line-height: 1.6;
  margin: 0;

  /* Mantém o visual truncado em telas maiores */
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* Em telas muito pequenas (por ex. iPhone SE), 
     removemos o clamp para permitir a leitura completa do conteúdo */
  @media (max-width: 480px) {
    -webkit-line-clamp: unset;
    display: block;
  }
`;
