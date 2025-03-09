// src/components/EmailInput/EmailInput.stories.js

import React from 'react';
import EmailInput from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/EmailInput',
  component: EmailInput,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <EmailInput {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (email) => alert(`Email enviado: ${email}`),
};
