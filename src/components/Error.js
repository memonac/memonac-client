import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import Button from "./Button";
import { initiateErrorState } from "../features/auth/authSlice";

function Error({ text = "Error has been ocurred!", error = {} }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleHomeButtonClick() {
    navigate(-1);
    dispatch(initiateErrorState());
  }

  return (
    <>
      <div>{text}</div>
      <p>{error.message}</p>
      <p>{error.status}</p>
      <Button 
        text="Home"
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
