export default async function handler(req, res) {
  // Configurar CORS primeiro
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
    const { email } = req.body;

    // Validação do e-mail
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'E-mail inválido' 
      });
    }

    // Fazer a requisição para o Google Apps Script
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzAaQsEku_kpSjq9-Vy-2V2ihAl9co7nqH6dVqjjX3vfEdzjbrRXcSntHLsRH5VdEQNXA/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    // Verificar se a resposta do Google Apps Script é OK
    if (!response.ok) {
      throw new Error(`Erro no Google Apps Script: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Retornar a resposta para o frontend
    res.status(200).json({
      success: true,
      emailSent: data.emailSent || false,
      message: data.message || 'E-mail processado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro detalhado na API:', error);
    
    // Retornar erro específico para o frontend
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}