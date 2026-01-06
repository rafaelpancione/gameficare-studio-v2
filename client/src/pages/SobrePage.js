import React from 'react';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import StarryBackground from '../components/organisms/StarryBackground';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import SpeechBubble from '../components/atoms/SpeechBubble';
import SimpleProjectCard from '../components/molecules/SimpleProjectCard';
import ProgressBar from '../components/atoms/ProgressBar';
import { Helmet } from 'react-helmet-async';
// Importação de imagens e ícones
import earthSvg from '../assets/images/earth.svg';
import moonSvg from '../assets/images/moon.svg'; // Planeta Rosa
import pacSvg from '../assets/images/pac.svg';

// Animações
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const floatAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(100px); }
  100% { transform: translateX(0); }
`;

// Wrappers para exibir/esconder conteúdo conforme o breakpoint
const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

// Wrapper para limitar a largura do SimpleProjectCard no mobile
const MobileCardWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

/* Container principal da página:
   - Padding horizontal aumentado no mobile para evitar que o conteúdo encoste nas bordas.
   - O gap controla o espaçamento vertical entre as seções.
*/
const PageContainer = styled.main`
  max-width: ${({ theme }) => theme.containerMaxWidth || '1200px'};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing?.(5) || '40px'}
    ${({ theme }) => theme.spacing?.(2.5) || '20px'};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.(5) || '40px'};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing?.(5) || '40px'}
      ${({ theme }) => theme.spacing?.(5) || '40px'};
  }
`;

/* Título centralizado */
const Title = styled.h2`
  font-family: ${({ theme }) =>
    theme.fonts?.heading || "'Press Start 2P', cursive"};
  font-size: ${({ theme }) => theme.typography?.h2 || '2rem'};
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  text-align: center;
  margin-bottom: 40px;
`;

/* Texto centralizado com largura máxima */
const Text = styled.p`
  font-family: ${({ theme }) =>
    theme.fonts?.body || "'Roboto Mono', monospace"};
  font-size: ${({ theme }) => theme.typography?.body || '1rem'};
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  line-height: 1.6;
  text-align: center;
  margin: 0 auto;
`;

/* Seção 1: Sobre Nós */
const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* Seção 2: Planeta e Card de Missão
   - Utiliza grid com duas colunas no desktop e única coluna no mobile.
   - No mobile removemos o padding interno para evitar que o conteúdo fique colado nas bordas.
*/
const SecondSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: top;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    padding: 0;
  }
`;

// Imagem com animação (somente no desktop)
const PlanetWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  img {
    width: 60%;
    height: auto;
    animation: ${rotateAnimation} 10s linear infinite;
  }
`;

// Imagem decorativa com posicionamento absoluto (somente no desktop)
const PinkPlanetWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 20%;
  width: 12%;
  z-index: -1;
  img {
    width: 100%;
    height: auto;
  }
`;

/* Seção 3: Projeto Simples e PAC
   - Utiliza grid para manter duas colunas no desktop e uma no mobile.
*/
const ThirdSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.(2.5) || '20px'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  flex: 1;
`;

const PacWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 250px;
    animation: ${floatAnimation} 3s ease-in-out infinite;
  }
`;

/* Seção 4: Nossos Valores */
export const ProgressBarWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0;
`;

const ValuesSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 colunas iguais no desktop */
  gap: ${({ theme }) => (theme.spacing ? theme.spacing(5) : '40px')};
  margin-top: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* empilha em uma coluna no mobile */
    gap: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};
  }
`;

const ValuesColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};
`;

function Sobre() {
  return (
    <>
      <Helmet>
        <title>
          Sobre Nós | Gameficare Studio – Gamificação, Jogos e Impacto Social
        </title>
        <meta
          name="description"
          content="Conheça a Gameficare Studio: desde 2019 unindo tecnologia, gamificação e design de jogos para criar experiências digitais que engajam, educam e geram impacto social."
        />
        <link
          rel="canonical"
          href="https://www.gameficare.com.br/sobre"
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

      <PageContainer>
        {/* Seção 1: Sobre Nós */}
        <AboutSection>
          <Title>SOBRE NÓS</Title>
          <Text>
            A Gameficare Studio, fundada em 2019, surgiu da paixão de seus
            fundadores por unir tecnologia, gamificação e jogos, com o objetivo
            de melhorar o engajamento e a motivação no desenvolvimento pessoal e
            profissional. Combinando design de jogos, experiência do usuário e
            tecnologia, a Gameficare se destacou no mercado de gamificação,
            conquistando prêmios como o Sinapse da Inovação e a Feira de Ideias
            da Universidade Tecnológica Federal do Paraná.
          </Text>
        </AboutSection>

        {/* Seção 2: Planeta e Card de Missão */}
        <SecondSection>
          <DesktopOnly>
            <PlanetWrapper>
              <img src={earthSvg} alt="Planeta Girando" />
            </PlanetWrapper>
            <PinkPlanetWrapper>
              <img src={moonSvg} alt="Planeta Rosa" />
            </PinkPlanetWrapper>
          </DesktopOnly>

          <DesktopOnly>
            <SpeechBubble
              title="NOSSA MISSÃO"
              texts={[
                'Criar experiências digitais inovadoras que combinam entretenimento com propósito, transformando o dia a dia de jogadores, empresas e instituições.',
              ]}
            />
          </DesktopOnly>
          <MobileOnly>
            <MobileCardWrapper>
              <SimpleProjectCard
                title="NOSSA MISSÃO"
                description="Criar experiências digitais inovadoras que combinam entretenimento com propósito, transformando o dia a dia de jogadores, empresas e instituições."
              />
            </MobileCardWrapper>
          </MobileOnly>
        </SecondSection>

        {/* Seção 3: Projeto Simples e PAC */}
        <ThirdSection>
          <CardWrapper>
            <SimpleProjectCard
              title="NOSSA VISÃO"
              description="Ser referência na criação de jogos e soluções gamificadas inovadoras, unindo entretenimento, engajamento e impacto social."
            />
          </CardWrapper>
          <DesktopOnly>
            <PacWrapper>
              <img src={pacSvg} alt="Imagem PAC se movendo" />
            </PacWrapper>
          </DesktopOnly>
        </ThirdSection>

        {/* Seção 4: Nossos Valores */}
        <ValuesSection>
          <Title>NOSSOS VALORES</Title>
          <ValuesContainer>
            <ValuesColumn>
              <ProgressBarWrapper>
                <ProgressBar
                  color="#30CF7F"
                  label="RESPONSABILIDADE SOCIAL"
                  progress={100}
                />
              </ProgressBarWrapper>
              <ProgressBarWrapper>
                <ProgressBar
                  color="#FED15C"
                  label="COLABORAÇÃO"
                  progress={100}
                />
              </ProgressBarWrapper>
              <ProgressBarWrapper>
                <ProgressBar color="#071F56" label="INOVAÇÃO" progress={100} />
              </ProgressBarWrapper>
            </ValuesColumn>
            <ValuesColumn>
              <ProgressBarWrapper>
                <ProgressBar
                  color="#FD64E0"
                  label="INTEGRIDADE"
                  progress={100}
                />
              </ProgressBarWrapper>
              <ProgressBarWrapper>
                <ProgressBar
                  color="#3564DA"
                  label="COMUNICAÇÃO CLARA"
                  progress={100}
                />
              </ProgressBarWrapper>
              <ProgressBarWrapper>
                <ProgressBar
                  color="#F6282C"
                  label="INTUITIVIDADE"
                  progress={100}
                />
              </ProgressBarWrapper>
            </ValuesColumn>
          </ValuesContainer>
        </ValuesSection>
      </PageContainer>

      <Footer />
    </>
  );
}

export default Sobre;
