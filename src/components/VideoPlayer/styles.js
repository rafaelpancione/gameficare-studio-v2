// src/components/VideoPlayer/styles.js

import styled from 'styled-components';

export const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* Mantém a proporção 16:9 */
  height: 0;
  overflow: hidden;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 0 #000;
  background-color: #000;
`;

export const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;
