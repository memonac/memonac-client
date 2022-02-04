import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";


import Button from "../../components/Button";
import { loginRequest } from "../auth/authSlice";
import ROUTES from "../../constants/routes";
import TextInput from "../../components/TextInput";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userError = useSelector((state) => state.auth.hasError);
  const userAuth = useSelector((state) => state.auth.isLogin);
  
  useEffect(() => {
    if (userAuth) {
      navigate(ROUTES.main);
    }

    if (userError) {
      navigate(ROUTES.error);
    }

  }, [userError, userAuth]);

  function handleLoginWithGoogleBtnClick() {
    dispatch(loginRequest());
  }

  return (
    <LoginContainer> 
      <h1>MEMONAC</h1>
      <TextInput 
        type="email"
        placeholder="Please Enter Email Address"
        width="300"
      />
      <TextInput 
        type="password"
        placeholder="Please Enter Password"
        width="300"
      />
      <Button
        text="Login"
        onClick={handleLoginWithGoogleBtnClick}
        width="300"
      />
      <Button
        text="Login With Google"
        onClick={handleLoginWithGoogleBtnClick}
        width="300"
      />
      <Link to={ROUTES.signup}>
        <div>Dont Have Account? Sign Up Now!</div>
      </Link>
    </LoginContainer>
  );
}

export default Login;
