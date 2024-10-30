// src/components/ProjectCard/index.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  ImageContainer,
  Content,
  Title,
  Description,
  LearnMore,
  ArrowIcon,
} from './styles';

/**
 * Componente de Card para Projetos
 *
 * @param {string} image - Caminho para a imagem do projeto.
 * @param {string} title - Título do projeto.
 * @param {string} description - Descrição do projeto (até seis linhas).
 * @param {string} link - URL para a página do projeto.
 */
const ProjectCard = ({ image, title, description, link }) => {
  return (
    <Card>
      <ImageContainer>
        <img src={image} alt={title} />
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <LearnMore href={link}>
          SAIBA MAIS <ArrowIcon>&rarr;</ArrowIcon>
        </LearnMore>
      </Content>
    </Card>
  );
};

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ProjectCard;
