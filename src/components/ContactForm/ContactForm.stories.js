// src/components/ContactForm/ContactForm.stories.js

import React from 'react';
import ContactForm from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <ContactForm {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (data) =>
    alert(`Formulário enviado:\n${JSON.stringify(data, null, 2)}`),
};
