// api/proxy.js
export default async function handler(req, res) {
  const targetUrl = 'https://script.google.com/macros/s/AKfycby4I9UUcemqBQz-_96NoDhszKR-xcaS2q3NlPxChMn4lrbTwW-D8UXMSYgS-zfYFnlKgw/exec';

  // Configurar cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://www.gameficare.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com solicitações OPTIONS para preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}