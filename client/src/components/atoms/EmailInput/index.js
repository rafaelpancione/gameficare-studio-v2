import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  InputContainer,
  InputField,
  SubmitButton,
  ArrowIcon,
  ErrorMessage,
} from './styles';
import { ReactComponent as ArrowSVG } from '../../../assets/icons/arrow-right.svg';

// Componente para esconder visualmente elementos, mantendo a acessibilidade
const VisuallyHidden = ({ children }) => (
  <span
    style={{
      position: 'absolute',
      width: '1px',
      height: '1px',
      margin: '-1px',
      border: 0,
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
    }}
  >
    {children}
  </span>
);

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
};

const EmailInput = ({ onSubmit = () => {} }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(''); // Novo estado para feedback

  const isValidEmail = useCallback(
    (emailValue) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue),
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
        await fetch(
          'https://script.google.com/macros/s/AKfycbyij5TQ6ZPXxqiFZLvhMdJKfrnQI9GYC3TBZIBRcZIj1B_tC1hhoso2PVhrHNn4OIfRlw/exec',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
            body: JSON.stringify({ email }),
            mode: 'no-cors', // remover em produção
          }
        );

        setStatus('Inscrição realizada!');
        setEmail('');
        // Aqui você pode chamar onSubmit, se desejar acionar algo externo
        // onSubmit(email);
      } catch (error) {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    },
    [email, isValidEmail]
  );

  const handleChange = useCallback(
    (e) => {
      setEmail(e.target.value);
      if (error) {
        setError('');
      }
    },
    [error]
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputContainer>
        <label htmlFor="email-input">
          <VisuallyHidden>Email</VisuallyHidden>
        </label>
        <InputField
          id="email-input"
          name="email"
          type="email"
          placeholder="Insira seu e-mail."
          autoComplete="email"
          value={email}
          onChange={handleChange}
          aria-label="Insira seu e-mail"
          aria-invalid={!!error}
          aria-describedby={error ? 'email-error' : undefined}
        />
        <SubmitButton type="submit" aria-label="Enviar email">
          <ArrowIcon>
            <ArrowSVG />
          </ArrowIcon>
        </SubmitButton>
      </InputContainer>
      {error && (
        <ErrorMessage id="email-error" role="alert">
          {error}
        </ErrorMessage>
      )}
      {status && !error && (
        <div
          style={{
            color: 'green',
            marginTop: '5px',
            fontFamily: 'Roboto Mono, monospace',
          }}
        >
          {status}
        </div>
      )}
    </form>
  );
};

EmailInput.propTypes = {
  onSubmit: PropTypes.func,
};

export default EmailInput;
