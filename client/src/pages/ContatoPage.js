import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

import GlobalStyle from '../styles/GlobalStyle';
import StarryBackground from '../components/organisms/StarryBackground';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import ContactForm from '../components/molecules/ContactForm';
import sputmanSvg from '../assets/images/sputman.svg';

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  gap: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  grid-column: 1 / -1;
  font-family: ${({ theme }) =>
    theme.fonts?.heading || "'Press Start 2P', cursive"};
  font-size: ${({ theme }) => theme.typography?.h2 || '2rem'};
  color: ${({ theme }) => theme.colors?.white || '#fff'};
  text-align: center;
`;

const ContactSection = styled.section`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => (theme.spacing ? theme.spacing(5) : '40px')};
  gap: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};
`;

const ContactContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  width: 100%;
  max-width: 1200px;
  gap: ${({ theme }) => (theme.spacing ? theme.spacing(5) : '40px')};

  @media (max-width: 768px) {
    align-items: center;
  }
`;

// Wrapper para o formulário, garantindo que ocupe a mesma altura que a imagem
const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`;

const SputmanWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    display: none;
  }
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const DisclaimerBanner = styled.div`
  grid-column: 1 / -1;
  background-color: ${({ theme }) => theme.colors?.green || '#00cc66'};
  color: ${({ theme }) => theme.colors?.blue || '#3564DA'};
  font-family: ${({ theme }) =>
    theme.fonts?.heading || "'Press Start 2P', cursive"};
  padding: ${({ theme }) =>
    theme.spacing ? theme.spacing(1.25) : '10px 20px'};
  margin-top: ${({ theme }) => (theme.spacing ? theme.spacing(2.5) : '20px')};
  text-align: center;
`;

const ContatoPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Contato | Gameficare Studio – Fale Conosco, Orçamentos e Parcerias
        </title>
        <meta
          name="description"
          content="Fale com a Gameficare Studio: dúvidas, orçamentos e parcerias."
        />
        <link
          rel="canonical"
          href="https://www.gameficare.com.br/contato"
        />
      </Helmet>
      <GlobalStyle />
      <StarryBackground starCount={100} minSize={2} maxSize={15} />
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
        <ContactSection>
          <Title>VAMOS BATER UM PAPO?</Title>
          <ContactContainer>
            <SputmanWrapper>
              <img src={sputmanSvg} alt="Sputman" />
            </SputmanWrapper>
            <FormWrapper>
              <ContactForm />
            </FormWrapper>
          </ContactContainer>
          <DisclaimerBanner>
            STARTUP PRÉ-INCUBADA DO PROGRAMA SINAPSE DA INOVAÇÃO NO PARANÁ.
          </DisclaimerBanner>
        </ContactSection>
      </MainContainer>

      <Footer />
    </>
  );
};

export default ContatoPage;
