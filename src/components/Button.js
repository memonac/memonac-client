import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.button`
  padding: 10px;
  width: ${(props) => `${props.width}px`};
  height: 30px;
  border: none;
  background-color: ${(props) => props.color || "#cecece"};
  line-height: 30px;
`;

const noop = () => {};

const Button = ({ text, onClick = noop, color, width }) => {
  return (
    <ButtonContainer
      width={width}
      color={color}
      onClick={onClick}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.string.isRequired,
};
