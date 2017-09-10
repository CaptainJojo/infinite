import React, { PropTypes } from 'react';

const Button = ({onClick = () => {}, text = '', ariaLabel = '' }) => {
  const attributes = {
    onClick,
  };

  if (ariaLabel !== '') {
    attributes['aria-label'] = ariaLabel;
  }

  return (<a
    {...attributes}
  >
    {text}
  </a>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;
