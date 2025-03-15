import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BackgroundContainer, GridOverlay, Star } from './styles';

const StarryBackground = ({
  starCount = 20,
  minSize = 1,
  maxSize = 3,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const isMobile = dimensions.width <= 768;

  // Reduz em 80% o número de estrelas em mobile
  const computedStarCount = isMobile ? Math.round(starCount * 0.1) : starCount;

  const calculatePositions = useMemo(() => {
    const positions = [];
    const maxAttempts = computedStarCount * 10;
    let attempts = 0;

    // Reduz a distância mínima em mobile
    const minDistance = isMobile ? 6 : 8;

    while (positions.length < computedStarCount && attempts < maxAttempts) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      const isFarEnough = positions.every(
        (pos) =>
          Math.abs(pos.top - top) > minDistance ||
          Math.abs(pos.left - left) > minDistance
      );

      if (isFarEnough) positions.push({ top, left });
      attempts++;
    }

    return { positions, attempts };
  }, [computedStarCount, isMobile]);

  const stars = useMemo(() => {
    return calculatePositions.positions.map((pos, index) => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      return (
        <Star
          key={`star-${index}`}
          $size={size}
          $top={pos.top}
          $left={pos.left}
          $rotation={Math.random() * 360}
          $delay={Math.random() * 6 + 2}
        />
      );
    });
  }, [calculatePositions, minSize, maxSize]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BackgroundContainer aria-hidden="true" role="presentation">
      <GridOverlay $isMobile={isMobile} />
      {stars}
    </BackgroundContainer>
  );
};

StarryBackground.propTypes = {
  starCount: PropTypes.number,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
};

export default React.memo(StarryBackground);
