import styled, { keyframes } from 'styled-components';


const spacingUnit = '8px';

const swayAnimation = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(-${spacingUnit}); }
  50% { transform: translateY(0); }
  75% { transform: translateY(${spacingUnit}); }
  100% { transform: translateY(0); }
`;

export const StyledIcon = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

  svg {
width: 50%;
height: auto;
max-width: 128px;
animation: ${swayAnimation} 3s ease-in-out infinite;
will-change: transform;

@media (prefers-reduced-motion: reduce) {
  animation: none;
}
}
`;
