// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

// Code Splitting das páginas:
const HomePage = lazy(() => import('./pages/HomePage'));
const SobrePage = lazy(() => import('./pages/SobrePage'));
const ProjetosPage = lazy(() => import('./pages/ProjetosPage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* GlobalStyle dentro do ThemeProvider, para que tenha acesso às cores etc. */}
      <GlobalStyle />
      <Router>
        {/* Suspense com fallback simples (pode ser um Spinner personalizado) */}
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/projetos" element={<ProjetosPage />} />
            <Route path="/contato" element={<ContatoPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
