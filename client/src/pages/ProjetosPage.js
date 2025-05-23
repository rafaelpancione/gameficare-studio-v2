import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import StarryBackground from '../components/organisms/StarryBackground';
import Header from '../components/organisms//Header';
import Footer from '../components/organisms/Footer';
import GlobalStyle from '../styles/GlobalStyle';
import CTAButton from '../components/atoms/CTAButton';
import InfoCard from '../components/molecules/InfoCard';
import SpeechBubble from '../components/atoms/SpeechBubble';
import ProjectCard from '../components/molecules/ProjectCard';
import ConsoleGame from '../components/organisms/ConsoleGame';
import { Helmet } from 'react-helmet-async';
// Import de imagens e ícones
import gameSvg from '../assets/images/game.svg';
import planet1Svg from '../assets/images/planet1.svg';
import planet2Svg from '../assets/images/planet2.svg';
import sputSvg from '../assets/images/sput.svg';
import img1Png from '../assets/images/img1.webp';
import img2Png from '../assets/images/img2.webp';
import img3Png from '../assets/images/img3.webp';
import logoPlaySvg from '../assets/images/play.svg';
import logoSinapseSvg from '../assets/images/sinapse.svg';
import logoPlaymoveSvg from '../assets/images/playmove.svg';
import { ReactComponent as ControleSvg } from '../assets/images/controle.svg';
import { ReactComponent as RocketSvg } from '../assets/images/rocket.svg';
import { ReactComponent as BusinessSvg } from '../assets/images/business.svg';

// ============== ANIMAÇÕES ==================
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

// ============== SEÇÃO 1: CONSOLE EM DESTAQUE ==================
const ConsoleSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  lign-items: center;
`;

const ConsoleImage = styled.img`
  width: 100%;
  display: block
  z-index: 1;
`;

const ConsoleContainer = styled.div`
  width: 100%;
  max-width: 1100px; /* limita para que não fique enorme em wides */
  position: relative; /* referência para o GameWrapper */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ============== SEÇÃO 2: NOSSOS SERVIÇOS ==================
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
`;

const SectionText = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.5;
  max-width: 1200px; /* limita a largura máxima do texto */
  margin: 0 auto 40px; /* centraliza e mantém espaçamento inferior */
  overflow-wrap: break-word; /* se houver palavras muito longas, elas quebrarão linha */
`;

// O componente PlanetImage exibe uma imagem animada; em mobile, ela é ocultada.
const PlanetImage = styled.img`
  position: absolute;
  top: 0;
  right: 10%;
  width: 200px;
  z-index: -1;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out;
  @media (max-width: 768px) {
    display: none;
  }
`;

// Container para os cards de serviços
const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// O componente BottomPlanetImage exibe uma imagem animada; em mobile, ela é ocultada.
const BottomPlanetImage = styled.img`
  position: absolute;
  bottom: -30px;
  left: 10%;
  width: 200px;
  z-index: -1;
  animation: ${planetSwingAnimation} 5s infinite ease-in-out reverse;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// ============== SEÇÃO 3: O QUÊ NOSSOS CLIENTES DIZEM ==================
const ClientsSection = styled.section`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
`;

const ClientsContent = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

// Oculta a imagem do mascote (sput) em mobile
const MascotWrapper = styled.div`
  width: 60%;
  max-width: 300px;
  @media (max-width: 768px) {
    width: 40%;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const SpeechBubbleWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  @media (max-width: 768px) {
    /* Faz com que o balão fique alinhado à direita na coluna */
    align-self: flex-end;
  }
`;

// ============== SEÇÃO 4: PROJETOS RECENTES ==================
const RecentProjectsSection = styled.section`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
`;

const RecentProjectsTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;
  color: var(--white);
  text-align: center;
  margin-bottom: 40px;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ============== SEÇÃO FINAL: NOSSOS CLIENTES + PRESS SPACE ==================
const FinalSection = styled.section`
  width: 100%;
  margin: 80px 0 0;
  text-align: center;
`;

const FinalSectionTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;
  color: var(--white);
  margin-bottom: 40px;
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const LogoItem = styled.img`
  width: 10%;
  @media (max-width: 768px) {
    width: 20%;
  }
`;

const DarkBox = styled.div`
  background-color: var(--dark-blue);
  color: var(--white);
  padding: 40px 0;
`;

const PressSpaceText = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const CountdownText = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;
`;

const ClientsSectionTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;
  color: var(--white);
  text-align: center;
  margin-bottom: 40px;
`;

// ============== COMPONENTE PRINCIPAL ==================
function ProjetosPage() {
  // Ao pressionar espaço, redireciona para a página de contato
  useEffect(() => {
    const handleSpace = (event) => {
      if (event.code === 'Space') {
        window.location.href = '/contato';
      }
    };

    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Projetos &amp; Cases | Gameficare Studio – Gamificação e Impacto
          Social
        </title>
        <meta
          name="description"
          content="Descubra os cases da Gameficare Studio: jogos mobile para triagem auditiva, plataformas educativas customizadas e soluções gamificadas que geram engajamento e resultados mensuráveis."
        />
      </Helmet>
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

      {/* Seção 1: Console em destaque */}
      <ConsoleSection>
        <ConsoleContainer>
          <ConsoleImage src={gameSvg} alt="Console Gameficare" />
          <ConsoleGame />
        </ConsoleContainer>
      </ConsoleSection>

      {/* Seção 2: NOSSOS SERVIÇOS */}
      <ServicesSection>
        <SectionTitle>
          <h2>NOSSOS SERVIÇOS</h2>
          <PlanetImage src={planet1Svg} alt="Planeta no topo" />
        </SectionTitle>

        <SectionText>
          Transforme sua experiência digital com soluções gamificadas
          personalizadas. Da criação de jogos à gamificação de processos e
          soluções corporativas, estamos prontos para levá-lo ao próximo nível.
        </SectionText>

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

        <ButtonWrapper>
          <CTAButton
            text="SOLICITE UM ORÇAMENTO"
            onClick={() => (window.location.href = '/contato')}
          />
        </ButtonWrapper>

        <BottomPlanetImage src={planet2Svg} alt="Planeta inferior" />
      </ServicesSection>

      {/* Seção 3: O QUÊ NOSSOS CLIENTES DIZEM */}
      <ClientsSection>
        <ClientsSectionTitle>O QUÊ NOSSOS CLIENTES DIZEM</ClientsSectionTitle>
        <ClientsContent>
          <MascotWrapper>
            <img src={sputSvg} alt="Mascote da startup" />
          </MascotWrapper>
          <SpeechBubbleWrapper>
            <SpeechBubble
              title="FEEDBACK"
              slider
              texts={[
                '"Pessoal, que jogo fantástico! Muito bacana, de verdade! Parabéns!"',
                '"Completamente apaixonada no gráfico, em cada detalhe!"',
                '"Os designs dos jogos ficaram lindos."',
              ]}
            />
          </SpeechBubbleWrapper>
        </ClientsContent>
      </ClientsSection>

      {/* Seção 4: PROJETOS RECENTES */}
      <RecentProjectsSection>
        <RecentProjectsTitle>PROJETOS RECENTES</RecentProjectsTitle>
        <ProjectsContainer>
          <ProjectCard
            description="Sonora é um jogo para dispositivo móveis para auxiliar na triagem auditiva, uma maneira simples, prática e lúdica que tem o potencial de ajudar a melhorar o desenvolvimento social de milhares de crianças e jovens em todo país."
            image={img1Png}
            link=""
            title="SONORA"
          />
          <ProjectCard
            description="Cliente responsável por disponibilizar de uma plataforma educacional para algumas cidades com notoriedade no Brasil como São Paulo, Salvador, Caucáia e Maringá. Este projeto consistiu na entrega de layouts para jogos customizados de acordo com a necessidade do cliente, respeitando a identidade visual e consistência através de assets que irão compor jogos que serão incorporados no acervo do cliente."
            image={img2Png}
            link=""
            title="LAYOUTS PERSONALIZADOS"
          />
          <ProjectCard
            description="Este jogo foi desenvolvido sob demanda de um cliente para o segmento educacional, onde o jogador estuda matemática se divertindo com as aventuras de Sonora. Ele pode ser executado tanto para apenas um jogador como para 4 simultâneos, além de estar integrado com hardware do cliente que é distribuído para diversas cidades do Brasil."
            image={img3Png}
            link=""
            title="APRENDENDO COM SONORA"
          />
        </ProjectsContainer>
      </RecentProjectsSection>

      {/* Seção Final: NOSSOS CLIENTES + PRESS SPACE */}
      <FinalSection>
        <FinalSectionTitle>NOSSOS CLIENTES</FinalSectionTitle>
        <LogosContainer>
          <LogoItem src={logoPlaySvg} alt="Play Table" />
          <LogoItem src={logoSinapseSvg} alt="Sinapse da Inovação" />
          <LogoItem src={logoPlaymoveSvg} alt="Playmove" />
        </LogosContainer>
        <DarkBox>
          <PressSpaceText>PRESS SPACE TO CONTINUE</PressSpaceText>
          <CountdownText>9</CountdownText>
        </DarkBox>
      </FinalSection>

      <Footer />
    </>
  );
}

export default ProjetosPage;
