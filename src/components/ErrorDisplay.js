import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { initiateErrorState } from "../features/auth/authSlice";
import Button from "./Button";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(50%);
  align-items: center;

  .error-title {
    font-size: 50px;
    font-weight: 700;
  }

  .error-detail {
    padding: 20px;
    font-size: 30px;
  }
`;

function ErrorDisplay({ text = "An error has been occurred!" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleHomeButtonClick() {
    navigate(-1);
    dispatch(initiateErrorState());
  }

  return (
    <ErrorContainer>
      <div className="error-title">{text}</div>
      <div className="error-detail">{}</div>
      <Button text="Back" onClick={handleHomeButtonClick} width={200} />
    </ErrorContainer>
  );
}

ErrorDisplay.propTypes = {
  text: PropTypes.string,
};

export default ErrorDisplay;
