// src/components/StarryBackground/StarryBackground.stories.js

import React from 'react';
import StarryBackground from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/StarryBackground',
  component: StarryBackground,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <StarryBackground {...args} />
    {/* Simulando conteúdo para visualizar o background */}
    <div style={{ height: '200vh' }}></div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  starCount: 100,
};
