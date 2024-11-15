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
import { ReactComponent as ControleSvg } from '../assets/images/controle.svg';
import { ReactComponent as RocketSvg } from '../assets/images/rocket.svg';
import { ReactComponent as BusinessSvg } from '../assets/images/business.svg';
import characterSvg from '../assets/images/character.svg';
import InfoCard from '../components/InfoCard';
import planet1Svg from '../assets/images/planet1.svg';
import planet2Svg from '../assets/images/planet2.svg';
import character1Svg from '../assets/images/character1.svg';
import AnimatedIcon from '../components/AnimatedIcon';

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

// Animação de balanço para os planetas
const planetSwingAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
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

// Estilos NOSSOS SERVIÇOS

const ServicesSection = styled.section`
  padding: 80px 20px;
  position: relative;
`;

const SectionTitle = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: 2rem;
    color: #fff;
    position: relative;
    z-index: 1;
  }
`;

const PlanetImage = styled.img`
  position: absolute;
  top: 0; /* Ajuste conforme necessário */
  right: 10%; /* Aproximar do CardsContainer */
  width: 200px;
  z-index: 0;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BottomPlanetImage = styled.img`
  position: absolute;
  bottom: -30px; /* Ajuste para aproximar dos InfoCards */
  left: 10%; /* Aproximar do CardsContainer */
  width: 150px;
  z-index: 0;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out reverse;
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
      
      <ServicesSection>
      <SectionTitle>
          <h2>NOSSOS SERVIÇOS</h2>
          <PlanetImage src={planet1Svg} alt="Planeta" />
        </SectionTitle>
      <CardsContainer>
          <InfoCard
            icon={ControleSvg}
            title="DESENVOLVIMENTO DE JOGOS"
            description="Criação de jogos multi-plataforma para jogadores casuais ou até mesmo desenvolvimento de serious games."
          />
          <InfoCard
            icon={RocketSvg}
            title="GAMEFICAÇÃO"
            description="Soluções gamificadas para engajar clientes ou aumentar a produtividade em empresas dos diversos segmentos."
          />
          <InfoCard
            icon={BusinessSvg}
            title="SOLUÇÕES B2B"
            description="Da ideia ao lançamento, transformamos sua visão em experiências digitais inesquecíveis!"
          />
        </CardsContainer>

        <BottomPlanetImage src={planet2Svg} alt="Planeta" />
      </ServicesSection>
    
      <Footer />
    </>
  );
}

export default HomePage;
