// src/pages/HomePage.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import StarryBackground from '../components/StarryBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';
import GlobalStyle from '../styles/GlobalStyle';

//Importar as imagens necessárias
import logoSvg from '../assets/images/logo-texto.svg';
import moonSvg from '../assets/images/moon.svg';
import characterSvg from '../assets/images/character.svg';

// Animação de balanço
const swingAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(-2deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(10px) rotate(2deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

// Estilos dos componentes
const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const LeftSide = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  @media (max-width: 768px) {
    grid-column: span 6;
    align-items: center;
    text-align: center;
  }
`;

const RightSide = styled.div`
  grid-column: span 3;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    grid-column: span 6;
    margin-top: 20px;
  }
`;

const WelcomeText = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.25rem; /* Aproximadamente 36px */
  color: #fff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.0rem;
  }
`;

const Logo = styled.img`
  width: 80%;
  height: auto;
  margin: 20px 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MoonImage = styled.img`
position: absolute; /* Adicionado */
  bottom: 100px; /* Posiciona na parte inferior */
  right: 300px; /* Posiciona à direita */
  width: 20%;
  height: auto;
  margin: 0; /* Remova as margens */

  @media (max-width: 768px) {
    width: 20%;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  animation: ${swingAnimation} 5s infinite ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

function HomePage() {
  return (
    <>
      <GlobalStyle />
      <StarryBackground starCount={150} minSize={3} maxSize={30} />
      <Header
        menuItems={[
          { label: 'Home', link: '/' },
          { label: 'Sobre', link: '/sobre' },
          { label: 'Projetos', link: '/projetos' },
          { label: 'Contato', link: '/contato' },
        ]}
        tooltipText="Oi, tudo bem?!"
      />
      <MainContainer>
        <LeftSide>
          <WelcomeText>BOAS VINDAS À</WelcomeText>
          <Logo src={logoSvg} alt="Gameficare Studio" />
          <CTAButton
            text="CONHEÇA NOSSOS PROJETOS"
            onClick={() => {
                window.location.href = '/projetos';
            }}
          />
          <MoonImage src={moonSvg} alt="Lua" />
        </LeftSide>
        <RightSide>
          <CharacterImage src={characterSvg} alt="Personagem na Nave" />
        </RightSide>
      </MainContainer>
      <Footer />
    </>
  );
}

export default HomePage;
