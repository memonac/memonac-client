import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import ROUTES from "../constants/routes";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Main from "../features/main/Main";
import MemoRoom from "../features/memoroom/MemoRoom";
import VerifyInvitedUser from "../components/VerifyInvitedUser";
import Error from "../components/ErrorDisplay";
import GlobalStyles from "../utils/GlobalStyles";
import theme from "../utils/theme";

function App() {
  const loginStatus = useSelector((state) => state.auth.isLogin);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        {loginStatus && (
          <>
            <Route path={ROUTES.home} element={<Main />} />
            <Route path={ROUTES.detail} element={<MemoRoom />} />
          </>
        )}
        {!loginStatus && (
          <Route
            path={ROUTES.home}
            element={<Navigate replace to={ROUTES.login} />}
          />
        )}
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<Signup />} />
        <Route path={ROUTES.invite} element={<VerifyInvitedUser />} />
        <Route path={ROUTES.error} element={<Error />} />
        <Route path={ROUTES.notFound} element={<Error text="Not Found" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
