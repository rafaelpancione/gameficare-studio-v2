// src/components/SpeechBubble/SpeechBubble.stories.js

import React from 'react';
import SpeechBubble from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/SpeechBubble',
  component: SpeechBubble,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <SpeechBubble {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  texts: [
    'Este é o primeiro texto do slider.',
    'Aqui está o segundo texto.',
    'E este é o terceiro texto.',
  ],
  slider: true,
};

export const WithoutSlider = Template.bind({});
WithoutSlider.args = {
  texts: ['Este é um texto fixo sem slider.'],
  slider: false,
};
