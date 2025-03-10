import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  CloseButton,
  Content,
  PDFViewer,
  DownloadButton,
} from './styles';

/**
 * Componente de modal para exibir a Política de Privacidade (PDF).
 * Segue padrões de responsividade, acessibilidade e performance.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Define se o modal está aberto.
 * @param {Function} props.onClose - Função chamada ao fechar o modal.
 * @param {string} props.pdfUrl - URL do PDF da política de privacidade.
 */
function PrivacyPolicyModal({ isOpen, onClose, pdfUrl }) {
  // Se o modal estiver fechado, não renderiza nada (boa prática para performance).
  if (!isOpen) return null;

  const modalTitleId = 'privacy-policy-modal-title';

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      onClick={onClose}
      data-testid="privacy-policy-overlay"
    >
      {/* Impedindo clique no fundo de fechar o PDF imediatamente:
          Usamos stopPropagation ao clicar dentro do container. */}
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        aria-describedby="privacy-policy-modal-description"
      >
        <Header>
          <Title id={modalTitleId}>Política de Privacidade</Title>
          {/* Botão de fechar */}
          <CloseButton
            type="button"
            aria-label="Fechar modal de Política de Privacidade"
            onClick={onClose}
          >
            &times;
          </CloseButton>
        </Header>

        <Content id="privacy-policy-modal-description">
          {/* Visualização do PDF */}
          <PDFViewer
            title="Leitor de PDF - Política de Privacidade"
            src={pdfUrl}
            aria-label="PDF da Política de Privacidade"
          />
          {/* Botão para download (recomendado oferecer essa opção segundo boas práticas da LGPD) */}
          <DownloadButton
            href={pdfUrl}
            download
            aria-label="Baixar PDF da Política de Privacidade"
          >
            Baixar PDF
          </DownloadButton>
        </Content>
      </ModalContainer>
    </Overlay>
  );
}

PrivacyPolicyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,
};

export default memo(PrivacyPolicyModal);
