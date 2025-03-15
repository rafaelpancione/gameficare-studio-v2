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
const ArrowDownSVG = React.lazy(() => import('../../../assets/icons/arrow-down.svg'));

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
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado para loading

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
    setIsTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (isTouched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }, [isTouched, validateField]);

  const handleSubmit = useCallback(
    debounce(async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      const validationErrors = Object.entries(formData).reduce((acc, [key, value]) => {
        const error = validateField(key, value);
        return error ? { ...acc, [key]: error } : acc;
      }, {});

      if (Object.keys(validationErrors).length > 0) {
        setIsTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        setErrors(validationErrors);
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxJkYgbUIz1HDvkJRTPCzdBJ1EFwqYabUMWQNVyh-7tRqCDvyvPO64T-jv2HhPlDf-m/exec',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json(); // Adicione esta linha para debug

        if (!response.ok) throw new Error(result.error || 'Erro desconhecido');

        onSubmit(formData);
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
        console.error('Erro no envio:', error.message); // Log detalhado
        setErrors({ general: error.message || 'Erro ao enviar. Tente novamente.' });
      } finally {
        setIsSubmitting(false);
      }
    }, 500),
    [
      formData, // Dependência explícita
      isSubmitting, // Dependência explícita
      onSubmit, // Dependência explícita
      validateField, // Dependência explícita
    ]
  );

  return (
    <FormWrapper>
      <FormContainer>
        <Form noValidate onSubmit={handleSubmit} aria-label="Formulário de contato">
          <InputGroup>
            <Label htmlFor="name">Nome *</Label>
            <InputField
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              /* Altere de hasError para $hasError */
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
              /* Altere de hasError para $hasError */
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
                /* Altere de hasError para $hasError */
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
              /* Altere de hasError para $hasError */
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

          <SubmitButton type="submit" aria-live="polite" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </SubmitButton>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default ContactForm;
