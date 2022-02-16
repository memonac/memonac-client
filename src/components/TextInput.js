import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { noop } from "lodash";

const TextInputContainer = styled.input`
  margin: 10px;
  padding: 10px;
  width: ${(props) => props.width}px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #000000;
  background: none;
  font-size: 16px;
`;

const TextInput = ({
  type,
  name,
  placeholder,
  width,
  inputText,
  defaultValue,
  onInputTextChange = noop,
}) => {
  return (
    <TextInputContainer
      type={type}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      width={width}
      onChange={onInputTextChange}
      value={inputText}
      required
    />
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.number.isRequired,
  onInputTextChange: PropTypes.func,
  inputText: PropTypes.string,
};

export default TextInput;
