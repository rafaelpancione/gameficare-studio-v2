// src/pages/JornadaGameficare.js

import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import GlobalStyle from '../styles/GlobalStyle';
import StarryBackground from '../components/organisms/StarryBackground';
// Lazy load SVG for performance
const TrilhaSVG = React.lazy(() =>
  import('../assets/images/main-trilha.svg').then((m) => ({
    default: m.ReactComponent,
  }))
);

// Container ocupa toda altura do viewport e permite rolagem horizontal apenas
const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
`;

// Wrapper para centralizar horizontalmente quando a imagem for menor que a viewport
const CenterWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: 100%;
`;

// SVG responsivo: altura máxima do container, largura automática
const StyledTrilha = styled(TrilhaSVG)`
  height: 100%;
  width: auto;
  pointer-events: all;
`;

export default function JornadaGameficare() {
  return (
    <>
      <Helmet>
        <title>Jornada Gameficare Studio</title>
        <link
          rel="canonical"
          href="https://www.gameficare.com.br/jornada-gameficare"
        />
      </Helmet>
      <GlobalStyle />
      <Container>
        <StarryBackground starCount={150} minSize={3} maxSize={30} />
        <CenterWrapper>
          <Suspense fallback={null}>
            <StyledTrilha preserveAspectRatio="xMinYMid meet" />
          </Suspense>
        </CenterWrapper>
      </Container>
    </>
  );
}
