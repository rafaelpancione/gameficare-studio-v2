import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce'; // Importação correta do debounce
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
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Mantém para desativar o botão

  // Estado de carregamento aprimorado (4.1)
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const subjects = ['Suporte', 'Orçamento', 'Parcerias', 'Outros'];

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Por favor, insira seu nome.';
      case 'email':
        if (!value.trim()) return 'Por favor, insira seu email.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Email inválido.';
      case 'subject':
        return value ? '' : 'Selecione um assunto.';
      case 'message':
        return value.trim() ? '' : 'Insira uma mensagem.';
      default:
        return '';
    }
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setIsTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (isTouched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    },
    [isTouched, validateField]
  );

  // Cria uma função debounced para o envio do formulário
  const debouncedSubmit = useCallback(
    debounce(async () => {
      // Verifica campos obrigatórios
      const requiredFields = ['name', 'email', 'subject', 'message'];
      const validationErrors = requiredFields.reduce((acc, field) => {
        const error = validateField(field, formData[field]);
        return error ? { ...acc, [field]: error } : acc;
      }, {});

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsTouched(Object.fromEntries(requiredFields.map((f) => [f, true])));
        return;
      }

      try {
        setIsSubmitting(true);
        // Início do envio
        setStatus({ loading: true, success: false, error: null });

        await fetch(
          'https://script.google.com/macros/s/AKfycbw9ju5gvDq4AiH8asWTqZCZPrHwUBvAcbalwjPe1Asd_BsAg_wLn2NV0fFSluooYF0u/exec',
          {
            method: 'POST',
            mode: 'no-cors', // Adicionado para contornar a política de CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }
        );

        // Chama onSubmit somente se for uma função; caso contrário, ignora
        if (typeof onSubmit === 'function') {
          onSubmit(formData);
        } else {
          console.warn('onSubmit não é uma função, ignorando.');
        }

        // Em no-cors, a resposta é opaca; tratamos a requisição como sucesso se não ocorrer erro de rede.
        setStatus({ loading: false, success: true, error: null });
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          honeypot: '',
        });
        alert('Mensagem enviada com sucesso!');
      } catch (error) {
        console.error('Erro no envio:', error.message);
        setErrors({
          general: error.message || 'Erro ao enviar. Tente novamente.',
        });
        setStatus({
          loading: false,
          success: false,
          error: error.message || 'Erro ao enviar. Tente novamente.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 500),
    [formData, onSubmit, validateField]
  );

  // Função de tratamento do evento de submit que não passa o evento para a função debounced
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      debouncedSubmit();
    },
    [debouncedSubmit]
  );

  return (
    <FormWrapper>
      <FormContainer>
        <Form
          noValidate
          onSubmit={handleSubmit}
          aria-label="Formulário de contato"
        >
          <InputGroup>
            <Label htmlFor="name">Nome *</Label>
            <InputField
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={!!errors.name}
              aria-describedby="name-error"
              aria-required="true"
            />
            {errors.name && (
              <ErrorMessage id="name-error" role="alert">
                {errors.name}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email *</Label>
            <InputField
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={!!errors.email}
              aria-describedby="email-error"
              aria-required="true"
            />
            {errors.email && (
              <ErrorMessage id="email-error" role="alert">
                {errors.email}
              </ErrorMessage>
            )}
          </InputGroup>

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

          <InputGroup>
            <Label htmlFor="subject">Assunto *</Label>
            <SelectWrapper>
              <SelectField
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                $hasError={!!errors.subject}
                aria-describedby="subject-error"
                aria-required="true"
              >
                <option value="">Selecione...</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </SelectField>
              <ArrowIcon aria-hidden="true">
                <img src={ArrowDownSVG} alt="" role="presentation" />
              </ArrowIcon>
            </SelectWrapper>
            {errors.subject && (
              <ErrorMessage id="subject-error" role="alert">
                {errors.subject}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="message">Mensagem *</Label>
            <TextAreaField
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              $hasError={!!errors.message}
              aria-describedby="message-error"
              aria-required="true"
            />
            {errors.message && (
              <ErrorMessage id="message-error" role="alert">
                {errors.message}
              </ErrorMessage>
            )}
          </InputGroup>

          {errors.general && (
            <ErrorMessage
              role="alert"
              aria-live="assertive"
              style={{ marginTop: '1rem', textAlign: 'center' }}
            >
              {errors.general}
            </ErrorMessage>
          )}

          {/* Campo honeypot para evitar SPAM (oculto) */}
          <InputGroup style={{ display: 'none' }} aria-hidden="true">
            <Label htmlFor="honeypot">Não preencha este campo</Label>
            <InputField
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </InputGroup>

          <SubmitButton
            type="submit"
            aria-live="polite"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </SubmitButton>
        </Form>

        {/* Componente de Feedback */}
        {status.loading && (
          <div role="alert" aria-live="polite" style={{ marginTop: '1rem' }}>
            Enviando mensagem...
          </div>
        )}

        {status.success && (
          <div
            role="alert"
            aria-live="polite"
            style={{ color: 'green', marginTop: '1rem' }}
          >
            Mensagem enviada com sucesso!
          </div>
        )}

        {status.error && (
          <div
            role="alert"
            aria-live="assertive"
            style={{ color: 'red', marginTop: '1rem' }}
          >
            Erro: {status.error}
          </div>
        )}
      </FormContainer>
    </FormWrapper>
  );
};

export default ContactForm;
