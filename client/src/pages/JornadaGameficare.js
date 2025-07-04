// src/pages/JornadaGameficare.js

import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import GlobalStyle from '../styles/GlobalStyle';
import StarryBackground from '../components/organisms/StarryBackground';

const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export default function JornadaGameficare() {
  return (
    <>
      <Helmet>
        <title>Gameficare Studio</title>
        <link
          rel="canonical"
          href="https://www.gameficare.com.br/jornada-gameficare"
        />
      </Helmet>
      <GlobalStyle />
      <Container>
        <StarryBackground starCount={150} minSize={3} maxSize={30} />
      </Container>
    </>
  );
}
