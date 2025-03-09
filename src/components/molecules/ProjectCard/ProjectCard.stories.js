// src/components/ProjectCard/ProjectCard.stories.js

import React from 'react';
import ProjectCard from './index';
import GlobalStyle from '../../styles/GlobalStyle';
import ExampleImage from '../../assets/images/example-project.jpg';

export default {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <ProjectCard {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  image: ExampleImage,
  title: 'Título do Projeto',
  description:
    'Esta é uma breve descrição do projeto. Deve conter até seis linhas de texto para fornecer informações suficientes ao usuário sem sobrecarregá-lo com detalhes.',
  link: '#',
};
