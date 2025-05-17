// client/src/utils/shareUtils.js

/**
 * Captura o conteúdo de um <canvas> como Blob PNG.
 * @param {HTMLCanvasElement} canvas
 * @returns {Promise<Blob>}
 */
export function captureCanvas(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

/**
 * Combina o screenshot base com logo e texto de resultado,
 * desenhando tudo num canvas auxiliar e retornando um Blob.
 * @param {{ baseBlob: Blob, logoSrc: string, scoreText: string }} params
 * @returns {Promise<Blob>}
 */
export async function composeShareImage({ baseBlob, logoSrc, scoreText }) {
  // Cria ImageBitmap a partir do blob
  const imgBitmap = await createImageBitmap(baseBlob);

  // Define dimensões de saída (por ex. 800×600)
  const width = 800;
  const height = 600;
  const offscreen =
    typeof OffscreenCanvas !== 'undefined'
      ? new OffscreenCanvas(width, height)
      : document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d');

  // Desenha a captura original redimensionada
  ctx.drawImage(imgBitmap, 0, 0, width, height * 0.8);

  // Desenha logo abaixo
  const logo = new Image();
  logo.crossOrigin = 'anonymous';
  logo.src = logoSrc;
  await new Promise((res) => (logo.onload = res));
  const logoSize = 80;
  ctx.drawImage(logo, 10, height * 0.8 + 10, logoSize, logoSize);

  // Desenha texto de pontuação ao lado do logo
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = '#fff';
  ctx.fillText(scoreText, logoSize + 20, height * 0.8 + 40);

  // Converte para Blob
  if (offscreen.convertToBlob) {
    return offscreen.convertToBlob({ type: 'image/png' });
  }
  return new Promise((resolve) => {
    offscreen.toBlob((blob) => resolve(blob), 'image/png');
  });
}

/**
 * Tenta compartilhar via Web Share API (arquivos + texto + url).
 * @param {{ blob: Blob, text: string, url: string }} params
 */
export async function doWebShare({ blob, text, url }) {
  const file = new File([blob], 'meu-score.png', { type: blob.type });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], text, url });
    return;
  }
  throw new Error('Web Share API não suportado ou sem permissão');
}

/**
 * Fallback: força download da imagem e abre popups de share em redes sociais.
 * @param {{ blobUrl: string, url: string, text: string }} params
 */
export function openSocialFallback({ blobUrl, url, text }) {
  // 1) Download direto da imagem
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = 'meu-score.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 2) Abrir janelas de compartilhamento: Facebook, Twitter, WhatsApp
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    '_blank'
  );
  window.open(
    `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    '_blank'
  );
  window.open(
    `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    '_blank'
  );
}
