import React from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { initiateErrorState } from "../features/auth/authSlice";
import { initiateMainErrorState } from "../features/main/mainSlice";

import Button from "./Button";

import ROUTES from "../constants/routes";

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
    dispatch(initiateErrorState());
    dispatch(initiateMainErrorState());
    navigate(ROUTES.home);
  }

  return (
    <ErrorContainer>
      <div className="error-title">{text}</div>
      <div className="error-detail">{state}</div>
      <Button text="Home" onClick={handleHomeButtonClick} width={200} />
    </ErrorContainer>
  );
}

ErrorDisplay.propTypes = {
  text: PropTypes.string,
};

export default ErrorDisplay;
