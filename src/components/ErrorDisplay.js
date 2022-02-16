import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";
import { initiateErrorState } from "../features/auth/authSlice";

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
  const { state } = useLocation();

  function handleHomeButtonClick() {
    navigate(-1);
    dispatch(initiateErrorState());
  }

  return (
    <ErrorContainer>
      <div className="error-title">{text}</div>
      <div className="error-detail">{state}</div>
      <Button text="Back" onClick={handleHomeButtonClick} width={200} />
    </ErrorContainer>
  );
}

ErrorDisplay.propTypes = {
  text: PropTypes.string,
};

export default ErrorDisplay;
