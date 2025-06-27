import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
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

  // Verifica se o balão já foi fechado anteriormente
  useEffect(() => {
    const balloonClosed = localStorage.getItem('whatsapp-balloon-closed');
    if (balloonClosed === 'true') {
      setShowBalloon(false);
    }
  }, []);

  const handleCloseBalloon = () => {
    setShowBalloon(false);
    localStorage.setItem('whatsapp-balloon-closed', 'true');
  };

  const handleWhatsAppClick = () => {
    const phone = '554799955711';
    const message =
      'Olá! Gostaria de saber mais sobre os serviços da Gameficare Studio.';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

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
