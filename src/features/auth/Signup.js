import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { signupRequest, initiateErrorState } from "../auth/authSlice";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import ROUTES from "../../constants/routes";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  transform: translateY(50%);
  padding: 70px 0;
  background-color: #ffffff;

  .signup-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .signup-title {
    margin: 5px;
    font-size: 80px;
  }

  .error-message {
    color: #f03c3c;
  }

  .back-login {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
  }
`;

function Signup() {
  const [inputError, setInputError] = useState("");
  const [invalidUserError, setInvalidUserError] = useState("");

  const userError = useSelector((state) => state.auth.error);
  const userAuth = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignupSubmitClick(event) {
    event.preventDefault();
    setInputError("");

    const { email, name, password, checkPassword } = event.target;

    if (password.value.length < 8) {
      setInputError("Password length cannot be less than 8.");
      return;
    }

    if (password.value !== checkPassword.value) {
      setInputError("Passwords do not match.");
      return;
    }

    dispatch(
      signupRequest({
        email: email.value,
        name: name.value,
        password: password.value,
      })
    );
  }

  function handleHomeButtonClick() {
    navigate(ROUTES.login);
    dispatch(initiateErrorState());
  }

  useEffect(() => {
    if (userAuth) {
      navigate(ROUTES.home);
      return;
    }

    if (!userAuth && userError === "auth/email-already-in-use") {
      setInvalidUserError("이미 존재하는 아이디 입니다.");
      return;
    }

    if (userError.length) {
      navigate(ROUTES.error);
    }
  }, [userError, userAuth]);

  return (
    <SignupContainer>
      <div className="signup-title">Sign Up</div>
      <form
        className="signup-form-container"
        onSubmit={handleSignupSubmitClick}
      >
        <TextInput
          type="email"
          name="email"
          placeholder="Please Enter Email Address"
          width={300}
        />
        <TextInput
          type="text"
          name="name"
          placeholder="Please Enter Username"
          width={300}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Please Enter Password"
          width={300}
        />
        <TextInput
          type="password"
          name="checkPassword"
          placeholder="Re-enter Password"
          width={300}
        />
        {inputError && <div className="error-message">{inputError}</div>}
        <Button text="Sign Up" width={300} />
      </form>
      <p>{invalidUserError}</p>
      <p className="back-login" onClick={handleHomeButtonClick}>
        Back
      </p>
    </SignupContainer>
  );
}

export default Signup;
