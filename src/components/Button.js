import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import { noop } from "lodash";

const ButtonContainer = styled.button`
  margin: 10px;
  padding: 10px;
  width: ${(props) => `${props.width}px`};
  height: 40px;
  border: none;
  background-color: ${(props) => props.color || "#cecece"};
  font-size: 16px;
  cursor: pointer;
`;

const Button = ({ text, onClick = noop, color, width }) => {
  return (
    <ButtonContainer width={width} color={color} onClick={onClick}>
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
