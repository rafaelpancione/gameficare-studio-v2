import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  InputContainer,
  InputField,
  SubmitButton,
  ArrowIcon,
  ErrorMessage,
} from './styles';
import { ReactComponent as ArrowSVG } from '../../../assets/icons/arrow-right.svg';

const ENDPOINT = process.env.REACT_APP_NEWSLETTER_ENDPOINT;
const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

// A11y helper
const VisuallyHidden = ({ children }) => (
  <span style={{
    position:'absolute', width:'1px', height:'1px', margin:'-1px',
    border:0, padding:0, clip:'rect(0 0 0 0)', overflow:'hidden'
  }}>{children}</span>
);
VisuallyHidden.propTypes = { children: PropTypes.node };

const EmailInput = ({ onSubmit = () => {} }) => {
  const [email, setEmail] = useState('');
  const [error, setError]   = useState('');
  const [status, setStatus] = useState(''); // mensagens de feedback

  useEffect(() => {
    if (!SITE_KEY) console.error('REACT_APP_RECAPTCHA_SITE_KEY ausente');
    if (!ENDPOINT) console.error('REACT_APP_NEWSLETTER_ENDPOINT ausente');
  }, []);

  const isValidEmail = useCallback(
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()),
    []
  );

 const handleSubmit = useCallback(
  async (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    try {
      // Gera token do reCAPTCHA v3 (se disponível)
      let recaptchaToken = '';
      if (window.grecaptcha && SITE_KEY) {
        await new Promise((res) => window.grecaptcha.ready(res));
        recaptchaToken = await window.grecaptcha.execute(SITE_KEY, { action: 'newsletter' });
      }

      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',                // Apps Script não libera CORS
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'site-newsletter',
          recaptchaToken,              // <- AGORA enviando o token
        }),
      });

      setStatus('Quase lá! Confira sua caixa de entrada para confirmar a inscrição 💌');
      setEmail('');
    } catch (error) {
      console.error(error);
      setError('Erro ao cadastrar. Tente novamente.');
    }
  },
  [email, isValidEmail]
);


  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <VisuallyHidden><label htmlFor="newsletter-email">Seu e-mail</label></VisuallyHidden>

      <InputContainer>
        <InputField
          id="newsletter-email"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          required
        />
        <SubmitButton type="submit" aria-label="Inscrever na newsletter">
          <ArrowIcon as={ArrowSVG} />
        </SubmitButton>
      </InputContainer>

      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      {status && (
        <div style={{ marginTop: 8, fontFamily: 'Roboto Mono, monospace', fontSize: 12 }}>
          {status}
        </div>
      )}
    </form>
  );
};

EmailInput.propTypes = { onSubmit: PropTypes.func };
export default EmailInput;
