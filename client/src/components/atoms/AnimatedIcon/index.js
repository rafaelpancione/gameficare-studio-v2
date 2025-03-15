import React from 'react';
import PropTypes from 'prop-types';
import { StyledIcon } from './styles';

const AnimatedIcon = ({ icon: IconComponent, altText = 'Ícone decorativo' }) => (
  <StyledIcon>
<IconComponent
role={altText ? "img" : "presentation"}
aria-label={altText || undefined}
aria-hidden={!altText}
focusable="false"
/>
</StyledIcon>
);

AnimatedIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  altText: PropTypes.string,
};

export default React.memo(AnimatedIcon);






