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

/**
 * Componente de Entrada de Email
 *
 * @param {function} onSubmit - Função chamada quando um email válido é submetido.
 */
const EmailInput = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = useCallback(
    (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isValidEmail(email)) {
        onSubmit(email);
        setError('');
        setEmail(''); // Limpa o campo após submissão bem-sucedida
      } else {
        setError('Por favor, insira um email válido.');
      }
    },
    [email, isValidEmail, onSubmit]
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
    </form>
  );
};

EmailInput.propTypes = {
  onSubmit: PropTypes.func,
};

EmailInput.defaultProps = {
  onSubmit: () => {},
};

export default EmailInput;
