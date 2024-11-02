// src/components/Header/Header.stories.js

import React from 'react';
import Header from './index';
import GlobalStyle from '../../styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Header {...args} />
    </BrowserRouter>
    {/* Simulando conteúdo para rolagem */}
    <div style={{ height: '200vh', backgroundColor: '#f0f0f0' }}></div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    { label: 'Home', link: '/' },
    { label: 'Sobre', link: '/sobre' },
    { label: 'Projetos', link: '/projetos' },
    { label: 'Contato', link: '/contato' },
  ],
  tooltipText: 'Olá, tudo bem?',
};
