export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://www.gameficare.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder imediatamente para requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Permitir apenas requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Método não permitido' 
    });
  }

  try {
    console.log('Recebida requisição para /api/newsletter');
    
    // Verificar se o content-type é application/json
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Content-Type deve ser application/json'
      });
    }

    // Ler e parsear o body manualmente para melhor tratamento de erro
    let body = '';
    for await (const chunk of req) {
      body += chunk.toString();
    }

    console.log('Body recebido:', body);

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError.message);
      return res.status(400).json({
        success: false,
        error: 'JSON inválido no corpo da requisição'
      });
    }

    const { email } = parsedBody;

    // Validação do e-mail
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Email inválido recebido:', email);
      return res.status(400).json({ 
        success: false,
        error: 'E-mail inválido' 
      });
    }

    console.log('Email válido recebido:', email);
    console.log('Fazendo requisição para Google Apps Script...');
    
    // Fazer a requisição para o Google Apps Script
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyCVRGXQ3Q4buu3y7FdUZdU5Jfzb23PenY8tBU24bgId3p7DboOoykpgB7oyOCkir15zA/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    console.log('Resposta recebida do Google Apps Script. Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta do Google Apps Script:', response.status, errorText);
      throw new Error(`Erro no Google Apps Script: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Conteúdo da resposta do GAS:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Erro ao fazer parse da resposta JSON do GAS:', e);
      console.error('Resposta original do GAS:', responseText);
      throw new Error('Resposta inválida do Google Apps Script');
    }
    
    console.log('Dados parseados do GAS:', data);
    
    // Retornar a resposta para o frontend
    res.status(200).json({
      success: true,
      emailSent: data.emailSent || false,
      message: 'E-mail processado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro detalhado na API:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Retornar erro específico para o frontend
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}