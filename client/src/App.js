// src/App.js
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import CookieConsent from "react-cookie-consent"; // Importe o componente
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import politicaPdf from './assets/documents/politica-de-privacidade.pdf'; // Importe o PDF
import { initGA, logPageView } from "./utils/analytics";
import RouteChangeTracker from "./utils/route_change";

// Code Splitting das páginas:
const HomePage = lazy(() => import('./pages/HomePage'));
const SobrePage = lazy(() => import('./pages/SobrePage'));
const ProjetosPage = lazy(() => import('./pages/ProjetosPage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));

function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
      <RouteChangeTracker />
        {/* Banner de Cookies - Aparece em todas as páginas */}
        <CookieConsent
          location="bottom"
          buttonText="Aceitar"
          declineButtonText="Recusar"
          enableDeclineButton
          cookieName="cookieConsentGameficare"
          style={{ 
            background: "#2B373B",
            fontSize: "14px",
            padding: "15px",
            alignItems: "center"
          }}
          buttonStyle={{ 
            background: "#4CAF50",
            color: "white",
            fontSize: "14px",
            borderRadius: "4px",
            padding: "8px 16px"
          }}
          declineButtonStyle={{
            background: "#f44336",
            color: "white",
            fontSize: "14px",
            borderRadius: "4px",
            padding: "8px 16px"
          }}
          expires={365}
          onAccept={() => {
          if (typeof window !== 'undefined') {
            // Declaração correta da dataLayer
            window.dataLayer = window.dataLayer || [];
            
            // Declaração explícita da função gtag
            window.gtag = function() {
              window.dataLayer.push(arguments);
            }

            // Carrega o script do GA
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B2VVGXHYR3';
            script.async = true;
            document.head.appendChild(script);

            // Configuração do GA
            window.gtag('js', new Date());
            window.gtag('config', 'G-B2VVGXHYR3', { 
              anonymize_ip: true,
              allow_google_signals: false
            });
          }
        }}
      >
          Este site utiliza cookies para análise de tráfego através do Google Analytics. 
          <a 
            href={politicaPdf} 
            style={{ 
              color: "#4CAF50",
              marginLeft: "5px",
              textDecoration: "underline"
            }}
          >
            Saiba mais em nossa Política de Privacidade
          </a>
        </CookieConsent>

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