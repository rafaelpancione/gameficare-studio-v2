// src/App.js
import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import politicaPdf from './assets/documents/politica-de-privacidade.pdf';
import { initGA, logPageView } from './utils/analytics';
import RouteChangeTracker from './utils/route_change';
import WhatsAppButtonComponent from './components/organisms/WhatsAppButton';
import {
  CookieConsentProvider,
  useCookieConsent,
} from './contexts/CookieConsentContext';

// Code splitting das páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const SobrePage = lazy(() => import('./pages/SobrePage'));
const ProjetosPage = lazy(() => import('./pages/ProjetosPage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));
const JornadaGameficare = lazy(() => import('./pages/JornadaGameficare'));
const UnsubscribePage = lazy(() => import('./pages/UnsubscribePage'));

function AppContent() {
  const { setConsent, hasConsented } = useCookieConsent();
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const location = useLocation();
  const isJornada = location.pathname === '/jornada-gameficare';

  useEffect(() => {
    initGA();
    logPageView();

    const consentCookie = document.cookie.includes('cookieConsentGameficare');
    if (consentCookie) {
      setShowCookieBanner(false);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setShowCookieBanner(false);
    document.cookie = 'cookieConsentGameficare=true; max-age=31536000; path=/';
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B2VVGXHYR3';
      script.async = true;
      document.head.appendChild(script);
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
    document.cookie = 'cookieConsentGameficare=false; max-age=31536000; path=/';
  };

  return (
    <>
      <RouteChangeTracker />

      {/* Banner de Cookies - aparece em todas as rotas exceto JornadaGameficare */}
      {!isJornada && showCookieBanner && (
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
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          <Route path="/politica-de-privacidade" element={<Navigate to="/politica-de-privacidade-sonora.html" replace />}/>
          <Route path="/politica-de-privacidade-gameficare" element={<Navigate to="/politica-de-privacidade.html" replace />}/>
        </Routes>
      </Suspense>

      {/* Botão WhatsApp - aparece em todas as rotas exceto JornadaGameficare */}
      {!isJornada && <WhatsAppButtonComponent />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CookieConsentProvider>
        <Router>
          <AppContent />
        </Router>
      </CookieConsentProvider>
    </ThemeProvider>
  );
}

export default App;
