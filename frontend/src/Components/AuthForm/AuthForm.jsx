import React from "react";
import styles from "./AuthForm.module.scss";

const AuthForm = ({ type = "login" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <div className={styles["inputs-row"]}>
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Surname" required />
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{type == "login" ? "Войти" : "Зарегистрироваться"}</button>
      </form>
    </>
  );
};

export default AuthForm;
