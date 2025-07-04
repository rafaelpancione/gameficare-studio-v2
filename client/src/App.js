// src/App.js
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import politicaPdf from './assets/documents/politica-de-privacidade.pdf'; // Importe o PDF
import { initGA, logPageView } from './utils/analytics';
import RouteChangeTracker from './utils/route_change';
import WhatsAppButtonComponent from './components/organisms/WhatsAppButton';
import {
  CookieConsentProvider,
  useCookieConsent,
} from './contexts/CookieConsentContext';

// Code Splitting das páginas:
const HomePage = lazy(() => import('./pages/HomePage'));
const SobrePage = lazy(() => import('./pages/SobrePage'));
const ProjetosPage = lazy(() => import('./pages/ProjetosPage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));
const JornadaGameficare = lazy(() => import('./pages/JornadaGameficare'));

function AppContent() {
  const { setConsent, hasConsented } = useCookieConsent();
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  useEffect(() => {
    initGA();
    logPageView();

    // Verifica se o usuário já deu consentimento anteriormente
    const consentCookie = document.cookie.includes('cookieConsentGameficare');
    if (consentCookie) {
      setShowCookieBanner(false);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setShowCookieBanner(false);

    // Salva o cookie
    document.cookie = 'cookieConsentGameficare=true; max-age=31536000; path=/';

    if (typeof window !== 'undefined') {
      // Declaração correta da dataLayer
      window.dataLayer = window.dataLayer || [];

      // Declaração explícita da função gtag
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      // Carrega o script do GA
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B2VVGXHYR3';
      script.async = true;
      document.head.appendChild(script);

      // Configuração do GA
      window.gtag('js', new Date());
      window.gtag('config', 'G-B2VVGXHYR3', {
        anonymize_ip: true,
        allow_google_signals: false,
      });
    }
  };

  const handleDecline = () => {
    setConsent(false);
    setShowCookieBanner(false);

    // Salva o cookie
    document.cookie = 'cookieConsentGameficare=false; max-age=31536000; path=/';
  };

  return (
    <Router>
      <RouteChangeTracker />

      {/* Banner de Cookies - Aparece em todas as páginas */}
      {showCookieBanner && (
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            background: '#2B373B',
            color: 'white',
            padding: '15px',
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            Este site utiliza cookies para análise de tráfego através do Google
            Analytics.
            <a
              href={politicaPdf}
              style={{
                color: '#4CAF50',
                marginLeft: '5px',
                textDecoration: 'underline',
              }}
            >
              Saiba mais em nossa Política de Privacidade
            </a>
          </div>
          <div>
            <button
              onClick={handleDecline}
              style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                marginRight: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Recusar
            </button>
            <button
              onClick={handleAccept}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Aceitar
            </button>
          </div>
        </div>
      )}

      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/projetos" element={<ProjetosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/jornada-gameficare" element={<JornadaGameficare />} />
        </Routes>
      </Suspense>

      {/* Componente WhatsApp flutuante em todas as páginas */}
      <WhatsAppButtonComponent />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CookieConsentProvider>
        <AppContent />
      </CookieConsentProvider>
    </ThemeProvider>
  );
}

export default App;
