// src/components/StarryBackground/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { BackgroundContainer, GridOverlay, Star } from './styles';

const StarryBackground = ({ starCount, minSize, maxSize }) => {
  const positions = [];
  let attempts = 0;
  const maxAttempts = starCount * 10; // Define um limite de tentativas

  while (positions.length < starCount && attempts < maxAttempts) {
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    const isFarEnough = positions.every(
      (pos) => Math.hypot(pos.top - top, pos.left - left) > 8
    );

    if (isFarEnough) {
      positions.push({ top, left });
    }

    attempts++;
  }

  if (positions.length < starCount) {
    console.warn(
      `Apenas ${positions.length} estrelas foram geradas após ${attempts} tentativas. Considere reduzir a distância mínima ou o número de estrelas.`
    );
  }

  // Gerar estrelas com as posições determinadas
  const stars = positions.map((pos, index) => {
    const size = Math.random() * (maxSize - minSize) + minSize;
    //console.log(`Star ${index}: size = ${size}`);
    const rotation = Math.random() * 360;
    const delay = Math.random() * 6 + 2;

  // index.js
return (
  <Star
    key={index}
    $size={size}
    $top={pos.top}
    $left={pos.left}
    $rotation={rotation}
    $delay={delay}
  />
);

  });

  return (
    <BackgroundContainer>
      <GridOverlay />
      {stars}
    </BackgroundContainer>
  );
};

StarryBackground.propTypes = {
  starCount: PropTypes.number,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
};



export default StarryBackground;
