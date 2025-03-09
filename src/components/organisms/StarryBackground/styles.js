import starSvg from '../../../assets/images/star.svg';
import styled, { keyframes } from 'styled-components';

export const BackgroundContainer = styled.div`
  --bg-color: ${({ theme }) => theme.colors?.blue || '#002244'};
  --grid-color: rgba(255, 255, 255, 0.1);
  --grid-size: 50px;

  position: fixed;
  inset: 0;
  background-color: var(--bg-color);
  z-index: -1;
  overflow: hidden;
  contain: strict;
`;

export const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 
    ${({ $isMobile }) => $isMobile ? '30px 30px' : 'var(--grid-size) var(--grid-size)'};
  will-change: background-size;
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const Star = styled.div.attrs((props) => ({
  style: {
    '--star-size': `${props.$size}px`,
    '--star-top': `${props.$top}%`,
    '--star-left': `${props.$left}%`,
    '--star-rotation': `${props.$rotation}deg`,
    '--star-delay': `${props.$delay}s`,
  }
}))`
  position: absolute;
  top: var(--star-top);
  left: var(--star-left);
  width: var(--star-size);
  height: var(--star-size);
  background-image: url(${starSvg});
  background-size: contain;
  transform: rotate(var(--star-rotation));
  animation: ${blink} 5s var(--star-delay) infinite ease-in-out;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
