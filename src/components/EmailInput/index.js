// src/components/EmailInput/index.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputContainer,
  InputField,
  SubmitButton,
  ArrowIcon,
  ErrorMessage,
} from './styles';
import { ReactComponent as ArrowSVG } from '../../assets/icons/arrow-right.svg';

/**
 * Componente de Entrada de Email
 *
 * @param {function} onSubmit - Função chamada quando um email válido é submetido.
 */
const EmailInput = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    // Regex simples para validação de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (isValidEmail(email)) {
      onSubmit(email);
      setError('');
      setEmail(''); // Limpa o campo após submissão bem-sucedida
    } else {
      setError('Por favor, insira um email válido.');
    }
  };

  return (
    <>
      <InputContainer>
        <label htmlFor="email-input" style={{ display: 'none' }}>
          Email
        </label>
        <InputField
          id="email-input"
          type="email"
          placeholder="Insira seu e-mail."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Insira seu e-mail"
        />
        <SubmitButton onClick={handleSubmit} aria-label="Enviar email">
          <ArrowIcon>
            <ArrowSVG />
          </ArrowIcon>
        </SubmitButton>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

EmailInput.propTypes = {
  onSubmit: PropTypes.func,
};

EmailInput.defaultProps = {
  onSubmit: () => {},
};

export default EmailInput;
