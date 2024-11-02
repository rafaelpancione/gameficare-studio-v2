// src/components/ProgressBar/ProgressBar.stories.js

import React from 'react';
import ProgressBar from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <div style={{ width: '300px' }}>
      <ProgressBar {...args} />
    </div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Progresso',
  progress: 50,
  color: 'var(--red)',
};

export const FullProgress = Template.bind({});
FullProgress.args = {
  label: 'Progresso Completo',
  progress: 100,
  color: 'var(--green)',
};

export const NoProgress = Template.bind({});
NoProgress.args = {
  label: 'Sem Progresso',
  progress: 0,
  color: 'var(--blue)',
};
