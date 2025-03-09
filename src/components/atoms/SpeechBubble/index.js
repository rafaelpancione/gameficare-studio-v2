import React, { useMemo, useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
  BubbleContainer,
  BubbleContent,
  SpeechBubbleIllustration,
  BubbleMobileIllustration,
  SliderDots,
  Dot,
  Title,
  TextContent
} from './styles';

const SpeechBubble = ({ title, texts, slider }) => {
  const normalizedTexts = useMemo(
    () => (Array.isArray(texts) ? texts : [texts]),
    [texts]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slider && normalizedTexts.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === normalizedTexts.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [slider, normalizedTexts]);

  const handleDotClick = useCallback((index) => {
    if (slider && normalizedTexts.length > 1) {
      setCurrentIndex(index);
    }
  }, [slider, normalizedTexts]);

  const displayText =
    slider && normalizedTexts.length > 1
      ? normalizedTexts[currentIndex]
      : normalizedTexts[0] || '';

  return (
    <BubbleContainer role="region" aria-label="Balão de fala ou mensagem">
      <BubbleContent>
        {/* Balão Desktop (com rabicho) */}
        <SpeechBubbleIllustration aria-hidden="true" />

        {/* Balão Mobile (sem rabicho) */}
        <BubbleMobileIllustration aria-hidden="true" />

        <Title>{title}</Title>
        <TextContent aria-live="polite">
          {displayText}
        </TextContent>
      </BubbleContent>

      {slider && normalizedTexts.length > 1 && (
        <SliderDots>
          {normalizedTexts.map((_, index) => (
            <Dot
              key={index}
              role="button"
              aria-label={`Selecionar slide ${index + 1} de ${normalizedTexts.length}`}
              active={index === currentIndex}
              onClick={() => handleDotClick(index)}
              tabIndex={0}
              onKeyDown={e => {
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
  title: PropTypes.string.isRequired,
  texts: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  slider: PropTypes.bool,
};

SpeechBubble.defaultProps = {
  slider: true,
};

export default memo(SpeechBubble);
