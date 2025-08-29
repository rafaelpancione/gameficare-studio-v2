// /api/newsletter.js
export default async function handler(req, res) {
  // CORS (produção + dev opcional)
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

    // Chama o Apps Script
    const resp = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const respText = await resp.text();
    const ct = (resp.headers.get('content-type') || '').toLowerCase();
    const xJson = (resp.headers.get('x-gameficare-json') || '').trim() === '1';
    const xSuccess = (resp.headers.get('x-gameficare-success') || '').trim() === 'true';

    // 1) Tentar parsear JSON sempre
    let data = null;
    try {
      data = JSON.parse(stripXssi(respText));
    } catch {
      data = null;
    }

    // 2) Se temos JSON válido, respeite o "success"
    if (data && typeof data === 'object' && 'success' in data) {
      const status = data.success ? 200 : 400;
      return res.status(status).json(data);
    }

    // 3) Sem JSON: decidir pelo cabeçalho de sucesso do GAS (que ajustamos no jsonResponse)
    if (xJson && xSuccess) {
      return res.status(200).json({
        success: true,
        emailSent: true,
        message: 'Cadastro concluído (fallback por header).'
      });
    }

    // 4) Heurística final: se veio 200 com conteúdo NÃO-JSON (por ex. HTML),
    //    isso às vezes é o GAS retornando conteúdo textual mesmo após sucesso.
    const looksHtml = ct.includes('text/html') || respText.trim().startsWith('<');
    if (resp.ok && looksHtml) {
      return res.status(200).json({
        success: true,
        emailSent: true,
        message: 'Cadastro concluído (fallback por HTML 200 do GAS).'
      });
    }

    // 5) Se nada funcionou, devolva erro com um trecho da resposta bruta para depuração
    return res.status(400).json({
      success: false,
      error: 'Resposta inválida do Apps Script',
      upstreamStatus: resp.status,
      raw: truncate(respText, 400),
      contentType: ct
    });
  } catch (error) {
    console.error('Erro detalhado na API newsletter:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
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
