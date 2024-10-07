// src/components/CTAButton/CTAButton.stories.js

import React from 'react';
import CTAButton from './index';

export default {
  title: 'Components/CTAButton',
  component: CTAButton,
};

const Template = (args) => <CTAButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Clique Aqui',
};

export const WithAction = Template.bind({});
WithAction.args = {
  text: 'Clique Aqui',
  onClick: () => alert('Botão clicado!'),
};
