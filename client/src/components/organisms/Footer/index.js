import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import EmailInput from '../../atoms/EmailInput';
import PrivacyPolicyModal from '../../organisms/PrivacyPolicyModal';
import politicaPdf from '../../../assets/documents/politica-de-privacidade.pdf'; 
import {
  FooterContainer,
  ContainerFooter,
  FooterSection,
  ColumnsContainer,
  Column,
  ColumnTitle,
  StyledLink,
  Text,
  SocialIcons,
  SocialIconLink,
  FooterText,
  ContactAddress,
  ContactLink,
} from './styles';

const Footer = () => {
  // Gerencia o estado de abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abre a política de privacidade
  const handleOpenPrivacyPolicy = (e) => {
    e.preventDefault();
    
    if (isMobile) {
      // Em dispositivos móveis: abre em uma nova aba e NÃO exibe modal
      window.open(politicaPdf, '_blank', 'noopener,noreferrer');
    } else {
      // Em desktops: exibe o modal com PDF inline
      setIsModalOpen(true);
    }
  };

    // Fecha o modal (somente em desktop)
    const handleClosePrivacyPolicy = () => {
      setIsModalOpen(false);
    };

  return (
    <FooterContainer role="contentinfo">
      <ContainerFooter>
        <FooterSection aria-label="Seções do rodapé">
          <ColumnsContainer>
            {/* Coluna 1 - Links */}
            <Column aria-labelledby="links-title">
              <ColumnTitle id="links-title">LINKS ÚTEIS</ColumnTitle>
              <nav aria-label="Links úteis">
                <StyledLink href="/sobre">Sobre nós</StyledLink>
                <StyledLink href="/projetos">Nossos serviços</StyledLink>
                <StyledLink href="/contato">Contato</StyledLink>
                {/* Link para abrir o modal de Política de Privacidade */}
                <StyledLink
                  href="#"
                  onClick={handleOpenPrivacyPolicy}
                  aria-label="Política de Privacidade (abre modal ou nova guia em mobile)"
                >
                  Política de Privacidade
                </StyledLink>
              </nav>
            </Column>

            {/* Coluna 2 - Contato */}
            <Column aria-labelledby="contato-title">
              <ColumnTitle id="contato-title">CONTATO</ColumnTitle>
              <ContactAddress>
                <p>
                  E-mail:{' '}
                  <ContactLink href="mailto:contato@gameficare.com.br">
                    contato@gameficare.com.br
                  </ContactLink>
                </p>
                <p>
                  Telefone:{' '}
                  <ContactLink href="tel:+554799955711">
                    +55 47 9995-5711
                  </ContactLink>
                </p>
              </ContactAddress>
              <SocialIcons aria-label="Redes sociais">
                <SocialIconLink
                  href="https://www.instagram.com/gameficare/"
                  aria-label="Instagram (abre nova janela)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram aria-hidden="true" />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.linkedin.com/company/gameficare/"
                  aria-label="LinkedIn (abre nova janela)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin aria-hidden="true" />
                </SocialIconLink>
              </SocialIcons>
            </Column>

            {/* Coluna 3 - Newsletter */}
            <Column aria-labelledby="newsletter-title">
              <ColumnTitle id="newsletter-title">NEWSLETTERS</ColumnTitle>
              <Text as="div">Se cadastre para receber novidades!</Text>
              <EmailInput />
            </Column>
          </ColumnsContainer>
        </FooterSection>

        <FooterText aria-label="Direitos autorais">
          © 2025 Gameficare Studio. Todos os direitos reservados.
        </FooterText>
      </ContainerFooter>

      {/* Modal de Política de Privacidade */}
      <PrivacyPolicyModal
        isOpen={isModalOpen}
        onClose={handleClosePrivacyPolicy}
        pdfUrl={politicaPdf}
      />
    </FooterContainer>
  );
};

export default React.memo(Footer);
