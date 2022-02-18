import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { loginRequest, initiateErrorState } from "../auth/authSlice";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import ROUTES from "../../constants/routes";
import { ERROR_NAME, ERROR_MESSAGE } from "../../constants/response";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  transform: translateY(50%);
  padding: 70px 0;
  background-color: #ffffff;

  .login-title {
    margin: 5px;
    font-size: 80px;
  }

  .login-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function Login() {
  const [invalidUserError, setInvalidUserError] = useState("");

  const userError = useSelector((state) => state.auth.error);
  const userAuth = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth) {
      navigate(ROUTES.home);
      return;
    }

    if (!userAuth && userError === ERROR_NAME.userNotFound) {
      dispatch(initiateErrorState());
      setInvalidUserError(ERROR_MESSAGE.userNotFound);
      return;
    }

    if (!userAuth && userError === ERROR_NAME.wrongPassword) {
      dispatch(initiateErrorState());
      setInvalidUserError(ERROR_MESSAGE.wrongPassword);
      return;
    }

    if (userError.length) {
      navigate(ROUTES.error, { state: userError });
    }
  }, [userError, userAuth]);

  function handleLoginWithGoogleButtonClick() {
    dispatch(loginRequest());
  }

  function handleLoginWithEmailButtonSubmit(event) {
    event.preventDefault();

    const { email, password } = event.target;

    dispatch(
      loginRequest({
        email: email.value,
        password: password.value,
      })
    );
  }

  return (
    <LoginContainer>
      <div className="login-title">MEMONA C</div>
      <form
        className="login-form-container"
        onSubmit={handleLoginWithEmailButtonSubmit}
      >
        <TextInput
          type="email"
          name="email"
          placeholder="Please Enter Email Address"
          width={300}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Please Enter Password"
          width={300}
        />
        <Button text="Login" width={300} />
      </form>
      <Button
        text="Login With Google"
        onClick={handleLoginWithGoogleButtonClick}
        width={300}
      />
      <p>{invalidUserError}</p>
      <Link to={ROUTES.signup}>
        <div>Dont Have Account? Sign Up Now!</div>
      </Link>
    </LoginContainer>
  );
}

export default Login;
