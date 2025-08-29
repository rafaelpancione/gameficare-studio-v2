// /api/newsletter.js
// Endpoint de cadastro que chama o Apps Script (POST) e retorna JSON + status

export default async function handler(req, res) {
  // CORS (produçao + local opcional)
  const origin = req.headers.origin || '';
  const allowed = ['https://www.gameficare.com.br', 'http://localhost:3000'];
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0];

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  try {
    const gasUrl = process.env.GAS_EXEC_URL;
    if (!gasUrl) {
      return res.status(500).json({ success: false, error: 'GAS_EXEC_URL não configurada' });
    }

    // Body pode vir parseado ou como stream (depende do runtime)
    const body = (req.body && Object.keys(req.body).length) ? req.body : await readStream(req);
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'E-mail inválido' });
    }

    const resp = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const text = await resp.text();

    let data;
    try { data = JSON.parse(text); }
    catch { data = { success: false, error: 'Resposta inválida do Apps Script', raw: text }; }

    const status = data.success ? 200 : (resp.ok ? 400 : resp.status || 500);
    return res.status(status).json(data);
  } catch (error) {
    console.error('Erro detalhado na API newsletter:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
}

async function readStream(req) {
  let body = '';
  for await (const chunk of req) body += chunk.toString();
  try { return JSON.parse(body); } catch { return {}; }
}
