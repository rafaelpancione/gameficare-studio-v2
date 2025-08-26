// api/newsletter.js
export default async function handler(req, res) {
  // Permitir apenas requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

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

    if (!response.ok) {
      throw new Error('Erro na resposta do Google Apps Script');
    }

    const data = await response.json();
    
    // Retornar a resposta para o frontend
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}