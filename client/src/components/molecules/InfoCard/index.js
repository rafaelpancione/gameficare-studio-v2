import React from 'react';
import PropTypes from 'prop-types';
import { Card, Title, Description, CardContent } from './styles';
import AnimatedIcon from '../../atoms/AnimatedIcon';

const InfoCard = ({ icon, title, description }) => (
  <Card role="article" aria-labelledby="card-title" aria-describedby="card-desc">
    <CardContent>
      <AnimatedIcon icon={icon} aria-hidden="true" />
      <Title id="card-title">{title}</Title>
      <Description id="card-desc">{description}</Description>
    </CardContent>
  </Card>
);

InfoCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InfoCard;
