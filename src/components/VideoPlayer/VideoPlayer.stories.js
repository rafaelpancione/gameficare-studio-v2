// src/components/VideoPlayer/VideoPlayer.stories.js

import React from 'react';
import VideoPlayer from './index';
import GlobalStyle from '../../styles/GlobalStyle';

export default {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <GlobalStyle />
    <div style={{ width: '560px' }}>
      <VideoPlayer {...args} />
    </div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  videoId: 'dQw4w9WgXcQ', // Exemplo de ID de vídeo do YouTube
};
