import React from "react";

const AuthForm = ({ type = "login" }) => {
  const handleSubmit = () => {};
  return (
    <>
      <form>
        <div>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Surname" />
          <input type="text" placeholder="Email" />
        </div>
        <input type="text" placeholder="Password" />
        <button>{type == "login" ? "Войти" : "Зарегистрироваться"}</button>
      </form>
    </>
  );
};

export default AuthForm;
