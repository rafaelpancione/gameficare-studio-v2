// src/components/SimpleProjectCard/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Content, Title, Description } from './styles';

/**
 * Componente de Card Simples de Projeto
 *
 * @param {string} title - Título do projeto.
 * @param {string} description - Descrição do projeto.
 */
const SimpleProjectCard = ({ title, description }) => {
  return (
    <Card>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
};

SimpleProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SimpleProjectCard;
