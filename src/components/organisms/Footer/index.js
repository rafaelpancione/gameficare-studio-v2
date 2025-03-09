import React, { useCallback } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import EmailInput from '../../atoms/EmailInput';
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
  const handlePrivacyPolicyClick = useCallback((e) => {
    e.preventDefault();
    window.open('/politica-de-privacidade.pdf', '_blank', 'noopener,noreferrer');
  }, []);

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
                <StyledLink 
                  href="#"
                  onClick={handlePrivacyPolicyClick}
                  aria-label="Política de Privacidade (abre nova janela)"
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
                  <ContactLink href="mailto:contato@gameficare.com">
                    contato@gameficare.com
                  </ContactLink>
                </p>
                <p>
                  Telefone:{' '}
                  <ContactLink href="tel:+554799985711">
                    +55 47 9998-5711
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
    </FooterContainer>
  );
};

export default React.memo(Footer);
