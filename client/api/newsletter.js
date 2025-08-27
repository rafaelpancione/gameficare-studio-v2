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
    
    // Ler o body manualmente
    let body = '';
    for await (const chunk of req) {
      body += chunk.toString();
    }

    console.log('Body recebido:', body);

    // Tentar parsear como JSON
    let parsedBody;
    let email;

    try {
      parsedBody = JSON.parse(body);
      email = parsedBody.email;
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError.message);
      return res.status(400).json({
        success: false,
        error: 'JSON inválido no corpo da requisição'
      });
    }

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
      'https://script.google.com/macros/s/AKfycbxv_NI8TPL59AObzha1BIwH5W3eKVit1ELxCl8hq3r4K0au94mpTQy9u-Nf8ZEKEFNTKg/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    console.log('Resposta recebida do Google Apps Script. Status:', response.status);

    // Verificar se a resposta é HTML (erro) ou JSON (sucesso)
    const responseText = await response.text();
    console.log('Conteúdo da resposta do GAS:', responseText.substring(0, 200) + '...'); // Log parcial

    let data;
    if (response.status !== 200 || responseText.includes('<!DOCTYPE html>')) {
      // O GAS retornou um erro HTML
      console.error('Google Apps Script retornou erro HTML. Status:', response.status);
      throw new Error(`Erro no Google Apps Script: Status ${response.status}. Verifique a URL e as permissões.`);
    }

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Erro ao fazer parse da resposta JSON do GAS:', e);
      console.error('Resposta original do GAS:', responseText.substring(0, 500));
      throw new Error('Resposta inválida do Google Apps Script - não é JSON válido');
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
    
    // Retornar erro específico para o frontend
    res.status(500).json({ 
      success: false,
      error: error.message || 'Erro interno do servidor'
    });
  }
}