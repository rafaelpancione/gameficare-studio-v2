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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setStatus('Enviando…');

    try {
      let recaptchaToken = '';
      if (window.grecaptcha && SITE_KEY) {
        recaptchaToken = await window.grecaptcha.execute(SITE_KEY, { action: 'newsletter' });
        console.log('Token reCAPTCHA gerado:', recaptchaToken); // 👈 log temporário
      }

      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Apps Script não expõe CORS; o POST ainda chega
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'site-newsletter', recaptchaToken }),
      });

      // Double opt-in: instruir a conferir o e-mail
      setStatus('Quase lá! Confira sua caixa de entrada para confirmar a inscrição 💌');
      setEmail('');
      onSubmit({ email }); // callback opcional
    } catch (err) {
      console.error(err);
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
      setStatus('');
    }
  }, [email, onSubmit, isValidEmail]);

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
