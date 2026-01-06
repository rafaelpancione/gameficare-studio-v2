// src/pages/HomePage.js

import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { Helmet } from 'react-helmet-async';

// Componentes importados
import StarryBackground from '../components/organisms/StarryBackground';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import CTAButton from '../components/atoms/CTAButton';
import InfoCard from '../components/molecules/InfoCard';

// Import de imagens e SVGs
import logoSvg from '../assets/images/logo-texto.svg';
import moonSvg from '../assets/images/moon.svg';
import { ReactComponent as ControleSvg } from '../assets/images/controle.svg';
import { ReactComponent as RocketSvg } from '../assets/images/rocket.svg';
import { ReactComponent as BusinessSvg } from '../assets/images/business.svg';
import characterSvg from '../assets/images/character.svg';
import planet1Svg from '../assets/images/planet1.svg';
import planet2Svg from '../assets/images/planet2.svg';
import character3Svg from '../assets/images/character3.svg';

// Code Splitting do VideoPlayer (lazy load)
const VideoPlayer = lazy(() => import('../components/organisms/VideoPlayer'));

// Animações (usadas apenas em desktop)
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

const characterSwingAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Container principal com grid simétrico
const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 0 10px;
  }
`;

// No desktop, LeftSide fica à esquerda e RightSide à direita.
// Em mobile, definimos a ordem: RightSide (personagem) vem primeiro e LeftSide depois.
const LeftSide = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  @media (max-width: 768px) {
    grid-column: span 6;
    order: 2;
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
    order: 1;
    margin-top: 20px;
  }
`;

const WelcomeText = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.25rem;
  color: #fff;
  margin: 0;
`;

const Logo = styled.img`
  width: 80%;
  height: auto;
  margin: 20px 0;
  display: block;

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 0 40px 0;
  }
`;

const MoonImage = styled.img`
  position: absolute;
  bottom: 30px;
  right: 300px;
  width: 20%;
  height: auto;
  margin: 0;
  aspect-ratio: 1 / 1;
  z-index: -1;
  object-fit: cover;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  animation: ${swingAnimation} 5s infinite ease-in-out;
  display: block;

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 20px;
  }
`;

const ServicesSection = styled.section`
  padding: 80px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const SectionTitle = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: 2rem;
    color: #fff;
    position: relative;
    z-index: 1;
  }
  @media (max-width: 768px) {
    padding: 20px 0 0 0;
  }
`;

const PlanetImage = styled.img`
  position: absolute;
  top: 0;
  right: 10%;
  width: 200px;
  z-index: 0;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out;
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  @media (max-width: 768px) {
    display: none;
  }
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
  bottom: -30px;
  left: 10%;
  width: 200px;
  z-index: -1;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out reverse;
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FeaturedProjectSection = styled.section`
  padding: 80px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const Character3Image = styled.img`
  position: absolute;
  top: 20px;
  right: 250px;
  width: 350px;
  z-index: -1;
  animation: ${characterSwingAnimation} 5s infinite ease-in-out;
  display: block;
  aspect-ratio: 350 / 400;
  object-fit: cover;

  @media (max-width: 768px) {
    display: none;
  }
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          Gameficare Studio – Inovação em Jogos e Soluções Gamificadas
        </title>
        <meta
          name="description"
          content="Desde 2019, a Gameficare Studio une tecnologia e criatividade para criar jogos multiplataforma, soluções B2B e experiências gamificadas que educam, engajam e geram impacto social."
        />
        <link
          rel="canonical"
          href="https://www.gameficare.com.br/"
        />
      </Helmet>
      <GlobalStyle />

      <StarryBackground starCount={150} minSize={3} maxSize={30} />

      <Header
        menuItems={[
          { label: 'Home', link: '/' },
          { label: 'Sobre', link: '/sobre' },
          { label: 'Projetos', link: '/projetos' },
          { label: 'Blog', link: 'https://blog.gameficare.com.br' },
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
            onClick={() => navigate('/projetos')}
          />
          <MoonImage src={moonSvg} alt="Lua decorativa" loading="lazy" />
        </LeftSide>

        <RightSide>
          <CharacterImage src={characterSvg} alt="Personagem na Nave" />
        </RightSide>
      </MainContainer>

      <ServicesSection>
        <SectionTitle>
          <h2>NOSSOS SERVIÇOS</h2>
          <PlanetImage
            src={planet1Svg}
            alt="Planeta decorativo"
            loading="lazy"
          />
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
        <BottomPlanetImage
          src={planet2Svg}
          alt="Planeta decorativo"
          loading="lazy"
        />
      </ServicesSection>

      <FeaturedProjectSection>
        <SectionTitle>
          <h2>PROJETO EM DESTAQUE</h2>
        </SectionTitle>
        <Suspense fallback={<div>Carregando vídeo...</div>}>
          <VideoPlayer videoId="5fSc_gw0tU0" />
        </Suspense>
        <Character3Image
          src={character3Svg}
          alt="Personagem flutuante decorativo"
          loading="lazy"
        />
      </FeaturedProjectSection>

      <Footer />
    </>
  );
}

export default HomePage;
