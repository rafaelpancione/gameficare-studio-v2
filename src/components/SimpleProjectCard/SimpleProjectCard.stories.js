// src/components/SimpleProjectCard/SimpleProjectCard.stories.js

import React from 'react';
import SimpleProjectCard from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/SimpleProjectCard',
  component: SimpleProjectCard,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <SimpleProjectCard {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Título do Projeto',
  description:
    'Esta é uma breve descrição do projeto. Ela fornece informações suficientes ao usuário sem sobrecarregá-lo com detalhes. O texto pode abranger várias linhas dependendo do conteúdo.',
};
