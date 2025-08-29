// src/pages/UnsubscribePage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  text-align: center;
  max-width: 520px;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.text};
  margin-bottom: 30px;
`;

const Status = styled.div`
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  font-weight: bold;
  background-color: ${props => (props.success ? '#d4edda' : '#f8d7da')};
  color: ${props => (props.success ? '#155724' : '#721c24')};
  border: 1px solid ${props => (props.success ? '#c3e6cb' : '#f5c6cb')};
`;

const Button = styled.button`
  background: ${theme.colors.accent};
  border: 2px solid #000;
  border-radius: 14px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #000;
  padding: 14px 24px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 6px 6px 0 #000;
  transition: all 0.2s;

  &:hover {
    animation: ${pulse} 0.5s infinite;
    box-shadow: 8px 8px 0 #000;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Processando seu descadastro...');

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      setStatus('error');
      setMessage('Link de descadastro inválido. Por favor, utilize o link completo recebido em seu e-mail.');
      return;
    }

    // Chama o proxy da Vercel que retorna JSON padronizado
    const proxyUrl = '/api/proxy';
    const url = `${proxyUrl}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (response.ok && data && data.success) {
          setStatus('success');
          setMessage('Descadastro realizado com sucesso! Você não receberá mais nossas newsletters.');
        } else {
          const err = (data && (data.error || data.message)) || 'Não foi possível processar seu descadastro.';
          setStatus('error');
          setMessage(err);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Erro de conexão. Tente novamente mais tarde.');
      });
  }, [searchParams]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Content>
          <Title>Descadastrar Newsletter</Title>
          {status === 'loading' && <Message>Processando seu descadastro...</Message>}
          {status === 'success' && (
            <>
              <Status success>✅ {message}</Status>
              <Button onClick={() => (window.location.href = 'https://www.gameficare.com.br')}>
                Voltar ao Site
              </Button>
            </>
          )}
          {status === 'error' && <Status>❌ {message}</Status>}
        </Content>
      </Container>
    </ThemeProvider>
  );
};

export default UnsubscribePage;
