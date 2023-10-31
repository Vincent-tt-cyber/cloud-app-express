import React, { useEffect, useState } from "react";
import styles from "./AuthForm.module.scss";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthForm = ({ type, isAuth, setIsAuth }) => {
  const [name, setName] = useState("Евгений");
  const [surname, setSurname] = useState("Петров");
  const [email, setEmail] = useState("evgeniy01@gmail.com");
  const [password, setPassword] = useState("12345678");

  // Navigate
  const navigate = useNavigate();

  // Cookies
  const [cookies, setCookies] = useCookies(["user"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Авторизация
    if (type == "login") {
      const data = axios
        .post("http://localhost:3000/login", { email, password })
        .then((res) => {
          const expirationDate = new Date();
          expirationDate.setTime(
            expirationDate.getTime() + 24 * 60 * 60 * 1000
          );
          setIsAuth(true);
          setCookies("user", res.data.user, {
            path: "/",
            expires: expirationDate,
          });
        });
    } else {
      // Регистрация
      return axios
        .post("http://localhost:3000/register", {
          name,
          surname,
          email,
          password,
        })
        .then((res) => {
          return navigate("/login");
        });
    }
  };

  // useEffect(() => {
  //   if (isAuth) {
  //     return navigate("/");
  //   }
  // }, [isAuth]);
  return (
    <>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <h1>{type == "register" ? "Регистрация" : "Вход"}</h1>
        <div className={styles["inputs-row"]}>
          {type == "register" && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                required
              />
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Фамилия"
                required
              />
            </>
          )}

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
        </div>
        {type == "register" && (
          <>
            <button>Создать аккаунт</button>
            или <Link to="/login">Войти в аккаунт</Link>
          </>
        )}
        {type == "login" && (
          <>
            <button>Войти аккаунт</button>
            или <Link to="/register">Создать аккаунт</Link>
          </>
        )}
      </form>
    </>
  );
};

export default AuthForm;
