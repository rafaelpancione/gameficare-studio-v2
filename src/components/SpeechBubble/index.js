// src/components/SpeechBubble/index.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BubbleContainer,
  BubbleContent,
  BubbleTail,
  SliderDots,
  Dot,
} from './styles';

/**
 * Componente de Balão de Diálogo com Slider Opcional
 *
 * @param {string[]} texts - Array de textos a serem exibidos no balão.
 * @param {boolean} slider - Define se o slider está habilitado.
 */
const SpeechBubble = ({ texts, slider }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Alteração automática do slide a cada 10 segundos
  useEffect(() => {
    let interval;
    if (slider) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === texts.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000); // 10 segundos
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [slider, texts.length]);

  // Função para mudar o slide manualmente
  const handleDotClick = (index) => {
    if (slider) {
      setCurrentIndex(index);
    }
  };

  return (
    <BubbleContainer>
      <BubbleContent aria-live="polite">
        {texts[slider ? currentIndex : 0]}
        <BubbleTail />
      </BubbleContent>
      {slider && (
        <SliderDots>
          {texts.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => handleDotClick(index)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleDotClick(index);
                }
              }}
            />
          ))}
        </SliderDots>
      )}
    </BubbleContainer>
  );
};

SpeechBubble.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  slider: PropTypes.bool,
};

SpeechBubble.defaultProps = {
  slider: false,
};

export default SpeechBubble;
