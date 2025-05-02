import styled, { keyframes, css } from 'styled-components';

const popIn = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

export const Card = styled.article`
  background-color: ${({ theme }) =>
    theme.colors?.darkBlue || 'var(--dark-blue)'};
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '5px'};
  box-shadow: 5px 5px 0 ${({ theme }) => theme.colors?.black || '#000'};
  margin: ${({ theme }) => (theme.spacing ? theme.spacing(1.25) : '10px')};
  padding: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: default;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  animation: ${popIn} 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors?.yellow || '#ff0'};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }

  @media (min-width: 768px) {
    width: calc(50% - 20px);
    min-height: 350px;
  }

  @media (min-width: 1024px) {
    width: calc(33.333% - 20px);
    min-height: 400px;
  }

  ${({ theme }) =>
    theme.breakpoints?.xl &&
    css`
      @media (min-width: 1280px) {
        min-height: 450px;
      }
    `}
`;

export const CardContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  margin: 0;
  line-height: 1.4;
  text-wrap: balance;
  text-align: center;

  @media (min-width: 768px) {
    font-size: clamp(1rem, 1.5vw, 1.4rem);
  }
`;

export const Description = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  line-height: 1.6;
  flex: 1;
  hyphens: auto;
  text-wrap: pretty;
  text-align: center;

  @media (min-width: 768px) {
    font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  }
`;
