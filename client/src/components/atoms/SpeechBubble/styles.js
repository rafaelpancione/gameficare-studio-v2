import styled from 'styled-components';
import { ReactComponent as BubbleSVG } from '../../../assets/images/speech-bubble.svg';
import { ReactComponent as BubbleMobileSVG } from '../../../assets/images/speech-bubble-mobile.svg';

/**
 * Estratégia:
 * 1) Aumentar o balão horizontalmente (width: 120%) e centralizá-lo com margin-left: -10%.
 * 2) Ajustar o padding-left do conteúdo para “empurrar” o texto pra dentro da área clara.
 * 3) Manter preserveAspectRatio="none" para o balão acompanhar a altura do conteúdo
 *    (aceitando distorção).
 * 4) `overflow: hidden;` no container evita scroll horizontal (corta o excesso se ultrapassar).
 */

export const BubbleContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  overflow: visible; /* Se o rabicho ficar maior que 100%, será cortado. Ajuste para visible se quiser exibir. */
`;

export const BubbleContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  /**
   * "Safe area" horizontal e vertical.
   * Aumente o padding-left se o rabicho estiver à esquerda e ocupar ~4rem.
   * Use testes visuais até encaixar o texto na parte clara do balão.
   */
  padding: 2rem 1.5rem 2rem 2rem;
  
 
`;

export const SpeechBubbleIllustration = styled(BubbleSVG).attrs({
  preserveAspectRatio: 'none',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;/* Ajusta a largura do balão para 120% */
  margin-left: -10%;

  height: 140%;
  z-index: -1;
  display: block;

  @media (max-width: 768px) {
    display: none;
`;

export const BubbleMobileIllustration = styled(BubbleMobileSVG).attrs({
  preserveAspectRatio: 'none',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;/* Ajusta a largura do balão para 120% */
  

  height: 140%;
  z-index: -1;
  display: none;

  @media (max-width: 768px) {
    display: block;
`;

export const Title = styled.h3`
  margin: 0 0 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: ${({ theme }) => theme.colors?.black || '#000'};
`;

export const TextContent = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(0.9rem, 1vw + 0.85rem, 1rem);
  line-height: 1.4;
  color: ${({ theme }) => theme.colors?.black || '#000'};
  
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 90%;/* Evita que o texto fique muito próximo das bordas do balão */

   @media (max-width: 768px) {
    width: 100%;
  }

  `;

export const SliderDots = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  margin-right: 4rem;

  @media (max-width: 768px) {
    justify-content: right;
    margin-top: 2.5rem;
    margin-right: 0.75rem;
  }
`;

export const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${({ active, theme }) =>
    active ? (theme.colors?.black || '#000') : (theme.colors?.yellow || 'yellow')};
  margin-left: 0.5rem;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors?.blue || 'blue'};
    outline-offset: 2px;
  }
`;
