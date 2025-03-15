import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Content, Title, Description } from './styles';

/**
 * Componente simples de card que apresenta um título e uma descrição.
 * Ajustes realizados para aumentar a acessibilidade, responsividade e performance:
 * - Utilização de IDs dinâmicos para evitar conflitos em caso de múltiplos cards na mesma página.
 * - Melhoria nos atributos ARIA para melhor entendimento por leitores de tela.
 */
const SimpleProjectCard = ({
  title,
  description,
  cardId = null, // Valor padrão definido diretamente aqui
}) => {
  // Se não for fornecido um cardId, geramos um fallback simples.
  // Em produção, normalmente se utilizaria alguma estratégia mais robusta para gerar IDs únicos.
  const uniqueId = cardId || Math.random().toString(36).substring(2, 9);
  const cardTitleId = `project-title-${uniqueId}`;
  const cardDescId = `project-desc-${uniqueId}`;

  return (
    <Card role="article" aria-labelledby={cardTitleId} aria-describedby={cardDescId}>
      <Content>
        <Title id={cardTitleId}>{title}</Title>
        <Description id={cardDescId}>{description}</Description>
      </Content>
    </Card>
  );
};

SimpleProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(SimpleProjectCard);
