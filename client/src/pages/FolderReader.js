// src/pages/FolderReader.js

import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet-async';
import CTAButton from '../components/atoms/CTAButton';

import page1Url from '../assets/images/folder-page-1.svg';
import page2Url from '../assets/images/folder-page-2.svg';
import page3Url from '../assets/images/trifolder-verso.svg';
import page6Url from '../assets/images/folder-page-6.svg';

const pages = [page1Url, page2Url, page3Url, page6Url];

const Container = styled.main`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const ObjectWrapper = styled.div`
  width: 100%;
  ${({ isFull }) =>
    !isFull &&
    css`
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    `}
  ${({ isFull }) =>
    isFull &&
    css`
      background: #071F56;
      padding: 20px 0;
    `}
`;

const Img = styled.img`
  display: block;
  object-fit: contain;
  ${({ isFull }) =>
    isFull
      ? css`
          width: auto;
          height: auto;
          max-width: 100%;
        `
      : css`
          height: 100%;
          width: auto;
          max-width: 100%;
        `}
`;

const PrevContainer = styled.div`
  position: fixed;
  bottom: ${({ zoomRatio }) => 20 / zoomRatio}px;
  left: ${({ zoomRatio }) => 20 / zoomRatio}px;
  transform: scale(${({ zoomRatio }) => zoomRatio});
  transform-origin: bottom left;
  z-index: 1000;
`;

const NextContainer = styled.div`
  position: fixed;
  bottom: ${({ zoomRatio }) => 20 / zoomRatio}px;
  right: ${({ zoomRatio }) => 20 / zoomRatio}px;
  transform: scale(${({ zoomRatio }) => zoomRatio});
  transform-origin: bottom right;
  z-index: 1000;
`;

export default function FolderReader() {
  const [index, setIndex] = useState(0);
  const [zoomRatio, setZoomRatio] = useState(() => {
    const dpr = window.devicePixelRatio;
    return dpr > 1 ? 1 / dpr : 1;
  });

  // atualiza apenas se DPR > 1
  useEffect(() => {
    const onResize = () => {
      const dpr = window.devicePixelRatio;
      setZoomRatio(dpr > 1 ? 1 / dpr : 1);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // preload imagens
  useEffect(() => {
    pages.forEach((url) => new Image().src = url);
  }, []);

  const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, pages.length - 1)), []);
  const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // navegação por teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const isFull = index === 2;
  const currentUrl = pages[index];
  const lastIndex = pages.length - 1;

  return (
    <Container aria-label="Leitor de folder digital">
      <Helmet>
        <title>Gameficare Studio</title>
      </Helmet>

      <ObjectWrapper isFull={isFull} role="region" aria-label={`Página ${index + 1} de ${pages.length}`}>
        <Img src={currentUrl} alt={`Página ${index + 1} do folder`} isFull={isFull} />
      </ObjectWrapper>

      {index > 0 && (
        <PrevContainer zoomRatio={zoomRatio}>
          <CTAButton
            text="← Anterior"
            variant="primary"
            size="medium"
            onClick={goPrev}
            type="button"
          />
        </PrevContainer>
      )}

      {index < lastIndex && (
        <NextContainer zoomRatio={zoomRatio}>
          <CTAButton
            text="Próximo →"
            variant="primary"
            size="medium"
            onClick={goNext}
            type="button"
          />
        </NextContainer>
      )}
    </Container>
  );
}
