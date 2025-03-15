// src/components/AnimatedIcon/AnimatedIcon.stories.js

import React from 'react';
import AnimatedIcon from './index';
import GlobalStyle from '../../styles/GlobalStyle';
import { ReactComponent as ExampleIcon } from '../../assets/images/controle.svg'; // Importação como React Component

export default {
  title: 'Components/AnimatedIcon',
  component: AnimatedIcon,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <AnimatedIcon {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  icon: ExampleIcon, // Passa o componente SVG importado
};
