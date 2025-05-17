import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as shareUtils from '../../../utils/shareUtils';
import { Button, FallbackMessage } from './styles';
import logoShare from '../../../assets/images/logo-share.png';

export default function ShareButton({
  canvasRef,
  score,
  timeBonus,
  lifeBonus,
  gameUrl,
}) {
  const [loading, setLoading] = useState(false);
  const [showFallbackMsg, setShowFallbackMsg] = useState(false);

  const seconds = Math.floor(timeBonus / 50);
  const livesCount = Math.floor(lifeBonus / 500);
  const shareText = `Conquistei ${score}pts em ${seconds}s com ${livesCount} vidas! #GameficareStudio #BreakoutChallenge`;

  async function handleShare() {
    if (!canvasRef.current) return;
    setLoading(true);
    try {
      const blob = await shareUtils.captureCanvas(canvasRef.current);
      const finalBlob = await shareUtils.composeShareImage({
        baseBlob: blob,
        logoSrc: logoShare,
        scoreText: shareText,
      });
      await shareUtils.doWebShare({
        blob: finalBlob,
        text: shareText,
        url: gameUrl,
      });
    } catch {
      const blob = await shareUtils.captureCanvas(canvasRef.current);
      const blobUrl = URL.createObjectURL(blob);
      shareUtils.openSocialFallback({ blobUrl, url: gameUrl, text: shareText });
      setShowFallbackMsg(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={handleShare} disabled={loading}>
        {loading ? 'Carregando…' : 'Compartilhar resultado'}
      </Button>
      {showFallbackMsg && (
        <FallbackMessage>
          Imagem salva! Agora abra o Instagram ou TikTok, selecione esta imagem
          e poste. Não esqueça de marcar <strong>@GameficareStudio</strong> e
          usar <strong>#BreakoutChallenge</strong>.
        </FallbackMessage>
      )}
    </>
  );
}

ShareButton.propTypes = {
  canvasRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  score: PropTypes.number.isRequired,
  timeBonus: PropTypes.number.isRequired,
  lifeBonus: PropTypes.number.isRequired,
  gameUrl: PropTypes.string.isRequired,
};
