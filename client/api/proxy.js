// /api/proxy.js
// Proxy robusto para GET/POST -> Apps Script
// - Sempre tenta JSON (mesmo em 4xx/5xx)
// - Fallback por headers X-Gameficare-* definidos no GAS
// - Heurística para HTML 200 (alguns retornos do GAS vêm como texto)
// - CORS manual (Vercel não adiciona automaticamente)

export default async function handler(req, res) {
  const targetUrl = process.env.GAS_EXEC_URL;

  // CORS (produção + dev opcional)
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
      const body = (req.body && Object.keys(req.body).length) ? req.body : await readStream(req);
      init.body = JSON.stringify(body || {});
    }

    const resp = await fetch(url, init);
    const respText = await resp.text();

    // Sinais do GAS (adicionados pelo jsonResponse do Apps Script)
    const ct = (resp.headers.get('content-type') || '').toLowerCase();
    const xJson = (resp.headers.get('x-gameficare-json') || '').trim() === '1';
    const xSuccess = (resp.headers.get('x-gameficare-success') || '').trim() === 'true';

    // 1) Tente JSON sempre (removendo XSSI se houver)
    let data = null;
    try {
      data = JSON.parse(stripXssi(respText));
    } catch {
      data = null;
    }

    // 2) Se JSON válido com "success" → confie nele
    if (data && typeof data === 'object' && 'success' in data) {
      const status = data.success ? 200 : 400;
      return res.status(status).json(data);
    }

    // 3) Sem JSON: confie nos headers do GAS
    if (xJson && xSuccess) {
      return res.status(200).json({
        success: true,
        message: 'Operação concluída (fallback por header).'
      });
    }

    // 4) Heurística: HTML com 200 às vezes indica sucesso textual do GAS
    const looksHtml = ct.includes('text/html') || respText.trim().startsWith('<');
    if (resp.ok && looksHtml) {
      return res.status(200).json({
        success: true,
        message: 'Operação concluída (fallback por HTML 200 do GAS).'
      });
    }

    // 5) Caso contrário, devolva erro com diagnóstico
    return res.status(400).json({
      success: false,
      error: 'Resposta inválida do Apps Script',
      upstreamStatus: resp.status,
      raw: truncate(respText, 400),
      contentType: ct
    });
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do proxy' });
  }
}

function stripXssi(text) {
  const t = (text || '').trim();
  if (t.startsWith(")]}'")) {
    const nl = t.indexOf('\n');
    return nl >= 0 ? t.slice(nl + 1) : t.slice(4);
  }
  return t;
}

function truncate(s, n) {
  try { return String(s).slice(0, n); } catch { return ''; }
}

async function readStream(req) {
  let body = '';
  for await (const chunk of req) body += chunk.toString();
  try { return JSON.parse(body); } catch { return {}; }
}
