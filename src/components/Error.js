import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import Button from "./Button";
import { initiateErrorState } from "../features/auth/authSlice";

function Error({ text = "Error has been ocurred!" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.auth.error);

  function handleHomeButtonClick() {
    navigate(-1);
    dispatch(initiateErrorState());
  }

  return (
    <>
      <div>{text}</div>
      <p>{errorMessage}</p>
      <Button 
        text="Back"
        onClick={handleHomeButtonClick}
        width="200"
      />
    </>
  )
}

export default Error;

Error.propTypes = {
  text: PropTypes.string,
  error: PropTypes.object,
  route: PropTypes.string,
};
