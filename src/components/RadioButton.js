import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RadioButtonText = styled.div`
  color: ${(props) => props.color || "#ffffff"};
`;

function RadioButton({ name, value, color, text, currentValue }) {
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={value === currentValue}
        required
      />
      <RadioButtonText color={color}>{text}</RadioButtonText>
    </>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
};

export default RadioButton;
