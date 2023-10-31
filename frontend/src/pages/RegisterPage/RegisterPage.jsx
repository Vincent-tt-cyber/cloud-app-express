import React from "react";
import AuthForm from "../../Components/AuthForm/AuthForm";
import { Navigate } from "react-router-dom";

const RegisterPage = ({ isAuth }) => {
  if (isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <AuthForm type="register" />
    </>
  );
};

export default RegisterPage;
