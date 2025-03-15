// src/components/Footer/Footer.stories.js

import React from 'react';
import Footer from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <div style={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
      {/* Simulando conteúdo para rolagem */}
      <Footer {...args} />
    </div>
  </>
);

export const Default = Template.bind({});
Default.args = {};
