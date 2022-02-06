import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const TextInputContainer = styled.input`
  margin: 10px;
  padding: 10px;
  width: ${(props) => props.width}px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #000000;
  font-size: 16px;
`;

const TextInput = ({ type, name, placeholder, width }) => {
  return (
    <TextInputContainer
      type={type}
      name={name}
      placeholder={placeholder}
      width={width}
      required
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};
