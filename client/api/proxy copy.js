export default async function handler(req, res) {
  const targetUrl = 'https://script.google.com/macros/s/AKfycbyKAFrZ3-vwxY-QLdHdH0K8rOnV-UXZkIxBzSMpSdYIUAWQFlqt_cZtuQaEJAh0h5qmcQ/exec';

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://www.gameficare.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let url = targetUrl;
    
    // Se for GET, adicionar os parâmetros de query
    if (req.method === 'GET') {
      const { email, token } = req.query;
      
      // Decodificar o email (converter %40 para @)
      const decodedEmail = decodeURIComponent(email);
      
      url += `?email=${encodeURIComponent(decodedEmail)}&token=${encodeURIComponent(token)}`;
    }

    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: 'Erro interno do proxy' });
  }
}