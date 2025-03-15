import styled from 'styled-components';

export const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  margin-top: auto;
  color: ${({ theme }) => theme.colors?.white || '#fff'};
`;

export const ContainerFooter = styled.div`
  max-width: ${({ theme }) => theme.containerMaxWidth || '1200px'};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing?.(5) || '40px'} ${({ theme }) => theme.spacing?.(2.5) || '20px'};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.(2.5) || '20px'};
`;

export const FooterSection = styled.section`
  padding: ${({ theme }) => theme.spacing?.(2.5) || '20px'} 0;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing?.(2.5) || '20px'};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Centraliza as colunas em dispositivos móveis */
  }
`;

export const Column = styled.div`
  flex: 1;
  min-width: min(100%, 280px);
  margin: 0 ${({ theme }) => theme.spacing?.(1.25) || '10px'};

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing?.(1.25) || '10px'} 0;
    text-align: center; /* Centraliza o texto em dispositivos móveis */
  }
`;

export const ColumnTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts?.heading || "'Press Start 2P', cursive"};
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  margin-bottom: ${({ theme }) => theme.spacing?.(1.25) || '10px'};
`;

export const StyledLink = styled.a`
  font-family: ${({ theme }) => theme.fonts?.body || "'Roboto Mono', monospace"};
  font-size: clamp(0.875rem, 1vw, 1rem);
  color: inherit;
  text-decoration: underline;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing?.(0.625) || '5px'};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.yellow || '#FFD700'};
    outline-offset: 2px;
  }
`;

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts?.body || "'Roboto Mono', monospace"};
  font-size: clamp(0.875rem, 1vw, 1rem);
  margin-bottom: ${({ theme }) => theme.spacing?.(0.625) || '5px'};
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing?.(1.25) || '10px'};
  margin-top: ${({ theme }) => theme.spacing?.(1.25) || '10px'};

  @media (max-width: 768px) {
    justify-content: center; /* Centraliza os ícones em dispositivos móveis */
  }
`;

export const SocialIconLink = styled.a`
  color: inherit;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.yellow || '#FFD700'};
    outline-offset: 2px;
  }
`;

export const FooterText = styled.div`
  font-family: ${({ theme }) => theme.fonts?.body || "'Roboto Mono', monospace"};
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  text-align: center;
  padding: ${({ theme }) => theme.spacing?.(1.25) || '10px'};
  background-color: ${({ theme }) => theme.colors?.red || '#FF0000'};
  border-radius: ${({ theme }) => theme.borderRadius || '4px'};
  margin-top: auto;
`;

/* Novo componente estilizado para agrupar informações de contato semânticas com a fonte correta */
export const ContactAddress = styled.address`
  font-style: normal;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts?.body || "'Roboto Mono', monospace"};
`;

/* Novo componente para links de contato, removendo estilos inline */
export const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;
