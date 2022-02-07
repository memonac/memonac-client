import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import { noop } from "lodash";

const TextInputContainer = styled.input`
  margin: 10px;
  padding: 10px;
  width: ${(props) => props.width}px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #000000;
  font-size: 16px;
`;

const TextInput = ({
  type,
  name,
  placeholder,
  width,
  inputText,
  onInputTextChange = noop,
}) => {
  return (
    <TextInputContainer
      type={type}
      name={name}
      placeholder={placeholder}
      width={width}
      onChange={onInputTextChange}
      value={inputText}
      required
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onInputTextChange: PropTypes.func,
  inputText: PropTypes.string,
};
