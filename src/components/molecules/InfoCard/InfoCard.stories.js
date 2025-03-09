// src/components/InfoCard/InfoCard.stories.js

import React from 'react';
import InfoCard from './index';
import GlobalStyle from '../../styles/GlobalStyle';
import { ReactComponent as ExampleIcon } from '../../assets/images/controle.svg'; // Importa o SVG como componente

export default {
  title: 'Components/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <InfoCard {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  icon: ExampleIcon,
  title: 'Título do Card\nSegunda Linha',
  description:
    'Esta é a descrição do card. Deve conter até cinco linhas de texto para simular uma descrição realista do conteúdo.',
};
