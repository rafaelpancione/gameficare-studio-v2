import React, { createContext, useContext, useState, useEffect } from 'react';

const CookieConsentContext = createContext();

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      'useCookieConsent deve ser usado dentro de um CookieConsentProvider'
    );
  }
  return context;
};

// Função para verificar se um cookie existe
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const CookieConsentProvider = ({ children }) => {
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já deu consentimento anteriormente
    const consentCookie = getCookie('cookieConsentGameficare');
    if (consentCookie === 'true') {
      setHasConsented(true);
    }
  }, []);

  const setConsent = (consented) => {
    setHasConsented(consented);
  };

  return (
    <CookieConsentContext.Provider value={{ hasConsented, setConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};
