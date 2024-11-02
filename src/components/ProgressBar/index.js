// src/components/ProgressBar/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBarContainer, Label, BarContainer, Square } from './styles';

/**
 * Componente de Barra de Progresso
 *
 * @param {string} label - Texto a ser exibido acima da barra de progresso.
 * @param {number} progress - Porcentagem de progresso (0 a 100).
 * @param {string} color - Cor dos quadrados na barra de progresso (exceto branco).
 */
const ProgressBar = ({ label, progress, color }) => {
  // Número de quadrados na barra
  const totalSquares = 10;
  // Calcula quantos quadrados devem estar preenchidos
  const filledSquares = Math.round((progress / 100) * totalSquares);

  return (
    <ProgressBarContainer>
      <Label>{label}</Label>
      <BarContainer>
        {[...Array(totalSquares)].map((_, index) => (
          <Square
            key={index}
            filled={index < filledSquares}
            color={color}
          />
        ))}
      </BarContainer>
    </ProgressBarContainer>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  color: PropTypes.string,
};

ProgressBar.defaultProps = {
  color: 'var(--yellow)', // Cor padrão (exceto branco)
};

export default ProgressBar;
