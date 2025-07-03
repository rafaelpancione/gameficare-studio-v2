import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { VideoContainer, VideoFrame } from './styles';

const VideoPlayer = ({ videoId }) => {
  const embedUrl = useMemo(() => 
    `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
    [videoId]
  );

  return (
    <VideoContainer aria-label="Player de vídeo">
      <VideoFrame
        src={embedUrl}
        title="Reprodutor de vídeo do YouTube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        aria-labelledby="videoTitle"
        name="youtube-video-player"
      />
    </VideoContainer>
  );
};

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default React.memo(VideoPlayer);
