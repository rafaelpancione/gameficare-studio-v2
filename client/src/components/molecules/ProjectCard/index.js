import React from 'react';
import {
  Card,
  ImageContainer,
  Content,
  Title,
  Description,
  LearnMore,
  ArrowIcon,
} from './styles';

const ProjectCard = ({ image, title, description, link }) => (
  <Card role="article" aria-labelledby="project-title">
    <ImageContainer>
      <img
        src={image}
        alt={`Capa do projeto ${title}`}
        loading="lazy"
        decoding="async"
        width="306"
        height="396"
      />
    </ImageContainer>
    <Content>
      <Title id="project-title">{title}</Title>
      <Description aria-describedby="project-title">{description}</Description>
      {link && (
        <LearnMore
          href={link}
          aria-label={`Saiba mais sobre ${title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          SAIBA MAIS
          <ArrowIcon aria-hidden="true">&rarr;</ArrowIcon>
        </LearnMore>
      )}
    </Content>
  </Card>
);

export default ProjectCard;
