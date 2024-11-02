// src/components/VideoPlayer/index.js

import React from 'react';
import PropTypes from 'prop-types';
import { VideoContainer, VideoFrame } from './styles';

/**
 * Componente de Player de Vídeo
 *
 * @param {string} videoId - ID do vídeo do YouTube a ser exibido.
 */
const VideoPlayer = ({ videoId }) => {
  return (
    <VideoContainer>
      <VideoFrame
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube Video Player"
      ></VideoFrame>
    </VideoContainer>
  );
};

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoPlayer;
