import React from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "../../Components/AuthForm/AuthForm.jsx";

const LoginPage = ({ isAuth, setIsAuth }) => {
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <AuthForm type="login" isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  );
};

export default LoginPage;
