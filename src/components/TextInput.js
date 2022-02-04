import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const TextInputContainer = styled.input`
  padding: 10px;
  width: ${(props) => `${props.width}px`};
  height: 30px;
  font-size: 16px;
`;

const TextInput = ({ type, placeholder, width }) => {
  return (
    <TextInputContainer
      type={type}
      placeholder={placeholder}
      width={width}
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
