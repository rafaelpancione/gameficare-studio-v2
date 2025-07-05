// src/pages/JornadaGameficare.js

import React, { Suspense } from 'react';
//import styled from 'styled-components';
import styled, { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet-async';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

import StarryBackground from '../components/organisms/StarryBackground';
// Lazy load SVG for performance
const TrilhaSVG = React.lazy(() =>
  import('../assets/images/main-trilha.svg').then((m) => ({
    default: m.ReactComponent,
  }))
);

// Container para rolagem horizontal mantendo full height
const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
`;

// Centraliza o SVG quando menor que viewport
const CenterWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: 100%;
`;

// SVG responsivo: altura máxima do container
const StyledTrilha = styled(TrilhaSVG)`
  height: 100%;
  width: auto;
  pointer-events: all;
`;

export default function JornadaGameficare() {
  const localTheme = Object.assign(
    {}, // alvo: um novo objeto vazio
    theme, // primeiro, copia todas as propriedades de theme
    {
      colors: Object.assign(
        {}, // alvo: um novo objeto vazio para colors
        theme.colors, // copia todas as propriedades originais de theme.colors
        { blue: '#071F56' } // sobrescreve apenas a cor blue
      ),
    }
  );

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
        <ThemeProvider theme={localTheme}>
          <StarryBackground starCount={150} minSize={3} maxSize={30} />
        </ThemeProvider>
        <CenterWrapper>
          <Suspense fallback={null}>
            <StyledTrilha preserveAspectRatio="xMinYMid meet" />
          </Suspense>
        </CenterWrapper>
      </Container>
    </>
  );
}
