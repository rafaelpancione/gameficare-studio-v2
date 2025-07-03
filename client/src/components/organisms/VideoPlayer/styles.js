import styled from 'styled-components';

export const VideoContainer = styled.div`
  --video-border: 2px solid ${({ theme }) => theme.colors?.black || '#000'};
  --video-shadow: 5px 5px 0 ${({ theme }) => theme.colors?.black || '#000'};
  
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints?.lg || '1000px'};
  margin: 2rem auto;
  background: ${({ theme }) => theme.colors?.black || '#000'};
  border-radius: ${({ theme }) => theme.borderRadius?.md || '8px'};
  border: var(--video-border);
  box-shadow: var(--video-shadow);
  overflow: hidden;
  aspect-ratio: 16/9;

  @media (max-width: 768px) {
    margin: 1rem auto;
    border-width: 1px;
    box-shadow: 3px 3px 0 ${({ theme }) => theme.colors?.black || '#000'};
  }
`;

export const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: #000;
  
  /* Suaviza o carregamento */
  transition: opacity 0.3s ease;
  opacity: ${({ isLoading }) => isLoading ? 0 : 1};
`;
