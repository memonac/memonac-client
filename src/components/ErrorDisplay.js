import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

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

function ErrorDisplay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.auth.error);

  function handleHomeButtonClick() {
    navigate(-1);
    dispatch(initiateErrorState());
  }

  return (
    <ErrorContainer>
      <div className="error-title">An error has been occurred!</div>
      <div className="error-detail">{errorMessage}</div>
      <Button text="Back" onClick={handleHomeButtonClick} width={200} />
    </ErrorContainer>
  );
}

export default ErrorDisplay;
