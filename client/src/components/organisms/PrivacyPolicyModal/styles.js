import styled from 'styled-components';

/**
 * Seguindo o mesmo padrão de estilização do componente em anexo:
 * - Uso de cores e bordas consistentes.
 * - Box-shadow e transições similares.
 * - Fontes "Press Start 2P" e "Roboto Mono" (quando necessário).
 * - Layout responsivo com uso de clamp e media queries.
 */

export const Overlay = styled.div`
  position: fixed;
  inset: 0; /* top: 0; right: 0; bottom: 0; left: 0; */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Garante que fique acima de tudo */
  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ModalContainer = styled.div`
  --card-shadow: 0.25rem 0.25rem 0
    ${({ theme }) => theme.colors?.black || '#000'};

  background-color: ${({ theme }) => theme.colors?.white || '#FFFFFF'};
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '0.5rem'};
  box-shadow: var(--card-shadow);
  width: min(95%, 50rem);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Animação suave ao abrir (opcional) */
  @media (prefers-reduced-motion: no-preference) {
    animation: modalFadeIn 0.3s ease;
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(1rem, 3vw, 1.5rem);
  border-bottom: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
`;

export const Title = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1rem, 1.25vw + 0.8rem, 1.25rem);
  color: ${({ theme }) => theme.colors?.black || '#000'};
  line-height: 1.3;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 4vw, 1.3rem);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.black || '#000'};
  font-size: clamp(1.25rem, 1.5vw + 0.8rem, 1.5rem);
  cursor: pointer;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Content = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1; /* Para o PDFViewer ocupar o espaço restante */
  overflow: auto; /* Se necessário rolar */
`;

export const PDFViewer = styled.iframe`
  width: 100%;
  height: 60vh;
  border: none;

  /* Em telas muito pequenas, aumentar a altura para facilitar a leitura */
  @media (max-width: 480px) {
    height: 50vh;
  }
`;

export const DownloadButton = styled.a`
  font-family: 'Roboto Mono', monospace;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors?.black || '#000'};
  color: ${({ theme }) => theme.colors?.white || '#FFF'};
  font-size: clamp(0.875rem, 1vw + 0.7rem, 1rem);
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius || '0.5rem'};
  text-align: center;
  max-width: 12rem;
  align-self: flex-end;

  &:hover {
    filter: brightness(0.9);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
