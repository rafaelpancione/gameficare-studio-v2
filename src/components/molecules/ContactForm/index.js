import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  FormWrapper,
  FormContainer,
  Form,
  InputGroup,
  Label,
  InputField,
  TextAreaField,
  SelectWrapper,
  SelectField,
  ErrorMessage,
  SubmitButton,
  ArrowIcon,
} from './styles';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});

  const subjects = ['Suporte', 'Orçamento', 'Parcerias', 'Outros'];

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Por favor, insira seu nome.';
      case 'email':
        if (!value.trim()) return 'Por favor, insira seu email.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email inválido.';
      case 'subject':
        return value ? '' : 'Selecione um assunto.';
      case 'message':
        return value.trim() ? '' : 'Insira uma mensagem.';
      default:
        return '';
    }
  }, []);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setIsTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (isTouched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  }, [isTouched, validateField]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setIsTouched(newTouched);
    
    const validationErrors = Object.entries(formData).reduce((acc, [key, value]) => {
      const error = validateField(key, value);
      return error ? { ...acc, [key]: error } : acc;
    }, {});

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
      setIsTouched({});
    }
    setErrors(validationErrors);
  }, [formData, onSubmit, validateField]);

  return (
    <FormWrapper>
      <FormContainer>
        <Form noValidate onSubmit={handleSubmit} aria-label="Formulário de contato">
          {/* Nome */}
          <InputGroup>
            <Label htmlFor="name">Nome *</Label>
            <InputField
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.name}
              aria-describedby="name-error"
              aria-required="true"
            />
            {errors.name && <ErrorMessage id="name-error" role="alert">{errors.name}</ErrorMessage>}
          </InputGroup>

          {/* Email */}
          <InputGroup>
            <Label htmlFor="email">Email *</Label>
            <InputField
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.email}
              aria-describedby="email-error"
              aria-required="true"
            />
            {errors.email && <ErrorMessage id="email-error" role="alert">{errors.email}</ErrorMessage>}
          </InputGroup>

          {/* Empresa */}
          <InputGroup>
            <Label htmlFor="company">Empresa/Instituição</Label>
            <InputField
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby="company-info"
            />
          </InputGroup>

          {/* Assunto */}
          <InputGroup>
            <Label htmlFor="subject">Assunto *</Label>
            <SelectWrapper>
              <SelectField
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.subject}
                aria-describedby="subject-error"
                aria-required="true"
              >
                <option value="">Selecione...</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </SelectField>
              <ArrowIcon aria-hidden="true">
                <img src={ArrowDownSVG} alt="" role="presentation" />
              </ArrowIcon>
            </SelectWrapper>
            {errors.subject && <ErrorMessage id="subject-error" role="alert">{errors.subject}</ErrorMessage>}
          </InputGroup>

          {/* Mensagem */}
          <InputGroup>
            <Label htmlFor="message">Mensagem *</Label>
            <TextAreaField
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.message}
              aria-describedby="message-error"
              aria-required="true"
            />
            {errors.message && <ErrorMessage id="message-error" role="alert">{errors.message}</ErrorMessage>}
          </InputGroup>

          <SubmitButton type="submit" aria-live="polite">
            Enviar Mensagem
          </SubmitButton>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

// ... PropTypes permanecem

export default ContactForm;