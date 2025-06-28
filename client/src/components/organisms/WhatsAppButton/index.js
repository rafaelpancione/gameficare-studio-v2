import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useCookieConsent } from '../../../contexts/CookieConsentContext';
import {
  WhatsAppContainer,
  WhatsAppButton,
  BalloonContainer,
  CloseButton,
} from './styles';
import btnWhatsapp from '../../../assets/images/btn-whats.svg';
import balaoSput from '../../../assets/images/balao-sput.svg';

const WhatsAppButtonComponent = () => {
  const [showBalloon, setShowBalloon] = useState(true);
  const { hasConsented } = useCookieConsent();

  const handleCloseBalloon = () => {
    setShowBalloon(false);
  };

  const handleWhatsAppClick = () => {
    const phone = '554799955711';
    const message =
      'Olá! Gostaria de saber mais sobre os serviços da Gameficare Studio.';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Se o usuário não deu consentimento, não renderiza o componente
  if (!hasConsented) {
    return null;
  }

  return (
    <WhatsAppContainer>
      {/* Balão de diálogo - usa apenas o arquivo SVG */}
      {showBalloon && (
        <BalloonContainer>
          <img src={balaoSput} alt="Balão de diálogo" />
          <CloseButton
            onClick={handleCloseBalloon}
            aria-label="Fechar balão de diálogo"
          >
            <FiX size={16} />
          </CloseButton>
        </BalloonContainer>
      )}

      {/* Botão WhatsApp */}
      <WhatsAppButton
        onClick={handleWhatsAppClick}
        aria-label="Abrir WhatsApp"
        title="Fale conosco no WhatsApp"
      >
        <img src={btnWhatsapp} alt="WhatsApp" />
      </WhatsAppButton>
    </WhatsAppContainer>
  );
};

export default WhatsAppButtonComponent;
