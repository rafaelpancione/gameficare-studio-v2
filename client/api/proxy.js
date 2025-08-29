// /api/proxy.js
// Encaminha GET/POST para o Apps Script e padroniza retorno em JSON + status

export default async function handler(req, res) {
  // URL do Web App do Apps Script (termina com /exec). Configure no Vercel.
  const targetUrl = process.env.GAS_EXEC_URL;

  // CORS (produçao + local opcional)
  const origin = req.headers.origin || '';
  const allowed = ['https://www.gameficare.com.br', 'http://localhost:3000'];
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0];

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (!targetUrl) {
      return res.status(500).json({ success: false, error: 'GAS_EXEC_URL não configurada' });
    }

    let url = targetUrl;
    const init = { method: req.method, headers: { 'Content-Type': 'application/json' } };

    if (req.method === 'GET') {
      const { email = '', token = '' } = req.query || {};
      url += `?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    } else if (req.method === 'POST') {
      // Aceita body parseado ou stream
      const body = (req.body && Object.keys(req.body).length) ? req.body : await readStream(req);
      init.body = JSON.stringify(body || {});
    }

    const resp = await fetch(url, init);
    const text = await resp.text();

    let data;
    try { data = JSON.parse(text); }
    catch { data = { success: false, error: 'Resposta inválida do Apps Script', raw: text }; }

    const status = data.success ? 200 : (resp.ok ? 400 : resp.status || 500);
    return res.status(status).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do proxy' });
  }
}

async function readStream(req) {
  let body = '';
  for await (const chunk of req) body += chunk.toString();
  try { return JSON.parse(body); } catch { return {}; }
}
