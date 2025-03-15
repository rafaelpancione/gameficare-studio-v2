import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ProgressBarContainer, Label, BarContainer, Square } from './styles';

/**
 * Componente de Barra de Progresso
 *
 * @param {object} props - Propriedades do componente.
 * @param {string} props.label - Texto exibido acima da barra de progresso.
 * @param {number} props.progress - Porcentagem de progresso (0 a 100).
 * @param {string} [props.color='var(--yellow)'] - Cor dos quadrados preenchidos na barra.
 */
const ProgressBar = ({
  label,
  progress,
  color = 'var(--yellow)', // Valor padrão aqui
}) => {
  const [totalSquares, setTotalSquares] = useState(16);

  // Utiliza matchMedia para observar mudanças de viewport de forma performática,
  // definindo 16 quadradinhos para telas menores que 768px e 16 para telas maiores (ajustável se desejado).
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateSquaresCount = () => {
      setTotalSquares(mediaQuery.matches ? 16 : 16);
    };

    updateSquaresCount();
    mediaQuery.addEventListener('change', updateSquaresCount);
    return () => {
      mediaQuery.removeEventListener('change', updateSquaresCount);
    };
  }, []);

  // Garante que o progresso esteja entre 0 e 100
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const filledSquares = Math.round((clampedProgress / 100) * totalSquares);

  return (
    <ProgressBarContainer>
      <Label>{label}</Label>
      <BarContainer
        $totalSquares={totalSquares}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={clampedProgress}
        aria-label={`${label}: ${clampedProgress}%`}
      >
        {Array.from({ length: totalSquares }).map((_, index) => (
          <Square
            key={index}
            filled={index < filledSquares}
            color={color}
            aria-hidden="true"
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

export default React.memo(ProgressBar);
