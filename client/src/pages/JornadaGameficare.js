// src/pages/JornadaGameficare.js

import React, { Suspense } from 'react';
import styled, {
  ThemeProvider,
  createGlobalStyle,
  keyframes,
} from 'styled-components';
import { Helmet } from 'react-helmet-async';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import StarryBackground from '../components/organisms/StarryBackground';
import {
  BackgroundContainer,
  GridOverlay,
} from '../components/organisms/StarryBackground/styles';

import moonSvg from '../assets/images/moon.svg';
import planet1Svg from '../assets/images/planet1.svg';
import planet2Svg from '../assets/images/planet2.svg';
import rocketSvg from '../assets/images/foguete.svg';
import trofeuSvg from '../assets/images/trofeu.svg';

// Remove os quadrados do GridOverlay apenas nesta página
const HideGridOverlay = createGlobalStyle`
  ${BackgroundContainer} ${GridOverlay} {
    display: none !important;
  }
`;

// Animações
const swingAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-2deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(10px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;
const planetSwingAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(-5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

// Lazy load do SVG para otimizar bundle
const TrilhaSVG = React.lazy(() =>
  import('../assets/images/main-trilha.svg').then((m) => ({
    default: m.ReactComponent,
  }))
);

// Tema local que altera apenas a cor 'blue'
const localTheme = Object.assign({}, theme, {
  colors: Object.assign({}, theme.colors, { blue: '#071F56' }),
});

// Container principal com scroll horizontal
const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  text-align: center; /* centraliza a trilha em telas maiores */
`;

// Wrapper do conteúdo (trilha + elementos) que define o contexto de posição
const ContentWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
`;

// Elemento Lua com posição fixa dentro do ContentWrapper
const Moon = styled.img`
  position: absolute;
  top: 60px;
  left: 450px;
  height: 120px;
  width: auto;
  z-index: -1;
  animation: ${swingAnimation} 6s infinite ease-in-out;
`;

// Primeiro planeta
const PlanetTop = styled.img`
  position: absolute;
  top: 660px;
  right: 460px;
  height: 200px;
  width: auto;
  z-index: -1;
  animation: ${planetSwingAnimation} 7s infinite ease-in-out;
`;

// Segundo planeta
const PlanetBottom = styled.img`
  position: absolute;
  bottom: 400px;
  left: 1px;
  height: 150px;
  width: auto;
  z-index: -1;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out reverse;
`;

const Rocket = styled.img`
  position: absolute;
  top: 10px;
  right: -100px;
  height: 300px;
  width: auto;
  z-index: -1;
  animation: ${planetSwingAnimation} 6s infinite ease-in-out;
`;

const Trophy = styled.img`
  position: absolute;
  bottom: 100px;
  right: -40px;
  height: 300px;
  width: auto;
  z-index: -1;
  animation: ${swingAnimation} 6s infinite ease-in-out;
`;

// Wrapper para o SVG da trilha
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
      <HideGridOverlay />
      <Container>
        <ThemeProvider theme={localTheme}>
          <StarryBackground starCount={150} minSize={3} maxSize={30} />
        </ThemeProvider>
        <ContentWrapper>
          <Moon src={moonSvg} alt="Lua decorativa" loading="lazy" />
          <PlanetTop src={planet1Svg} alt="Planeta decorativo" loading="lazy" />
          <PlanetBottom
            src={planet2Svg}
            alt="Planeta decorativo"
            loading="lazy"
          />
          <Rocket src={rocketSvg} alt="Foguete decorativo" loading="lazy" />
          <Trophy src={trofeuSvg} alt="Troféu decorativo" loading="lazy" />
          <Suspense fallback={null}>
            <StyledTrilha preserveAspectRatio="xMinYMid meet" />
          </Suspense>
        </ContentWrapper>
      </Container>
    </>
  );
}
