import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ROUTES from "../constants/routes";
import Login from "../features/auth/Login";
import Error from "../components/Error";
import Main from "../features/main/Main";
import Signup from "../features/auth/Signup";

function App() {
  const loginStatus = useSelector((state) => state.auth.isLogin);


  return (
    <Routes>
      {loginStatus && <Route path={ROUTES.home} element={<Main />} />}
      {!loginStatus && (
        <Route
          path={ROUTES.home}
          element={<Navigate replace to={ROUTES.login} />}
        />
      )}
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
      <Route path={ROUTES.error} element={<Error />} />
      <Route path={ROUTES.notFound} element={<Error text="Not Found" />} />
    </Routes>
  );
}

export default App;
