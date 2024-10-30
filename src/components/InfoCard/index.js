// src/components/InfoCard/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Title, Description } from './styles';
import AnimatedIcon from '../AnimatedIcon';
import { ReactComponent as ExampleIcon } from '../../assets/images/controle.svg'; // Importa o SVG como componente

/**
 * Componente de Card
 *
 * @param {React.Component} icon - Componente do ícone SVG importado.
 * @param {string} title - Título do card.
 * @param {string} description - Descrição do card.
 */
const InfoCard = ({ icon, title, description }) => {
  return (
    <Card>
      <AnimatedIcon icon={icon} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InfoCard;
