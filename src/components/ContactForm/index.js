// src/components/ContactForm/index.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormWrapper,
  FormContainer,
  Form,
  InputField,
  TextAreaField,
  SelectWrapper,
  SelectField,
  ErrorMessage,
  SubmitButton,
  ArrowIcon,
} from './styles';
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrow-down.svg';

/**
 * Componente de Formulário de Contato
 *
 * @param {function} onSubmit - Função chamada quando o formulário é submetido com sucesso.
 */
const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const subjects = ['Suporte', 'Orçamento', 'Parcerias', 'Outros'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Por favor, insira seu nome.';
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, insira seu email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.';
    }
    if (!formData.subject) newErrors.subject = 'Por favor, selecione um assunto.';
    if (!formData.message.trim()) newErrors.message = 'Por favor, insira uma mensagem.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpa o erro correspondente ao campo
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      // Limpa o formulário após submissão bem-sucedida
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <Form noValidate>
          {/* Nome */}
          <InputField
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            hasError={errors.name}
            aria-label="Nome"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

          {/* Email */}
          <InputField
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            hasError={errors.email}
            aria-label="Email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          {/* Empresa/Instituição (opcional) */}
          <InputField
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Empresa/Instituição (opcional)"
            aria-label="Empresa ou Instituição (opcional)"
          />

          {/* Selecione o Assunto */}
          <SelectWrapper>
            <SelectField
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              hasError={errors.subject}
              aria-label="Selecione o Assunto"
            >
              <option value="">Selecione o Assunto</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </SelectField>
            <ArrowIcon>
              <ArrowDownSVG />
            </ArrowIcon>
          </SelectWrapper>
          {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}

          {/* Mensagem */}
          <TextAreaField
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mensagem"
            hasError={errors.message}
            aria-label="Mensagem"
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
        </Form>
      </FormContainer>
      {/* Botão de Enviar */}
      <SubmitButton type="button" onClick={handleSubmit}>
        Enviar
      </SubmitButton>
    </FormWrapper>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

ContactForm.defaultProps = {
  onSubmit: () => {},
};

export default ContactForm;
