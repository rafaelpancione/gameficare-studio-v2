// src/components/CTAButton/CTAButton.stories.js

import React from 'react';
import CTAButton from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/CTAButton',
  component: CTAButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
    },
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <CTAButton {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'Botão Primário',
  variant: 'primary',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Botão Secundário',
  variant: 'secondary',
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  text: 'Botão Pequeno',
  variant: 'primary',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  text: 'Botão Grande',
  variant: 'primary',
  size: 'large',
};

export const HoverState = Template.bind({});
HoverState.args = {
  text: 'Passe o Mouse',
  variant: 'primary',
  size: 'medium',
};
HoverState.parameters = {
  pseudo: { hover: true },
};

export const PressedState = Template.bind({});
PressedState.args = {
  text: 'Pressionado',
  variant: 'primary',
  size: 'medium',
};
PressedState.parameters = {
  pseudo: { active: true },
};
