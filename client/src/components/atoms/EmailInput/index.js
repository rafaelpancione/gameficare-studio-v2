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
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = useCallback(
    (emailValue) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue),
    []
  );

  const handleSubmit = useCallback(
  async (event) => {
    event.preventDefault();
    
    // Reset estados
    setError('');
    setStatus('');
    
    if (!isValidEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setIsLoading(true);

    try {
      // URL da API do Vercel - note que usamos caminho relativo
      const response = await fetch(
        '/api/newsletter',
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();

      if (data.success) {
        if (data.emailSent) {
          setStatus('Inscrição realizada! Em breve você receberá um e-mail de boas-vindas.');
        } else {
          setStatus('Inscrição realizada! O e-mail de boas-vindas pode demorar um pouco.');
        }
        setEmail('');
        onSubmit(email);
      } else if (data.error) {
        setError(data.error || 'Erro ao processar sua inscrição.');
      } else {
        setError('Erro desconhecido ao processar sua inscrição.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setError('Erro ao cadastrar. Tente novamente em alguns instantes.');
    } finally {
      setIsLoading(false);
    }
  },
  [email, isValidEmail, onSubmit]
);

  const handleChange = useCallback(
    (e) => {
      setEmail(e.target.value);
      if (error) setError('');
      if (status) setStatus('');
    },
    [error, status]
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
          disabled={isLoading}
        />
        <SubmitButton 
          type="submit" 
          aria-label="Enviar email"
          disabled={isLoading}
        >
          <ArrowIcon>
            {isLoading ? (
              <div style={{
                width: '20px', 
                height: '20px', 
                border: '2px solid #f3f3f3', 
                borderTop: '2px solid #3498db', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite'
              }} />
            ) : (
              <ArrowSVG />
            )}
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
            fontSize: '14px',
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