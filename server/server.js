const express = require("express");
const database = require("./database");
const app = express();
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const md5 = require("md5");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = 3000;

/* 
  TODO: 
  1 - Создать запрос на регистрацию пользователя в БД.
  2 - СОздать JWT-токен для пользователей при авторизации.
  3 - Создать приватный роутинг для проверки JWT-токена.

*/

// Роут на регистрацию нового пользователя
app.post("/register", (req, res) => {
  try {
    const { userName, userSurname, email, password } = req.body;
    const hashedPassword = md5(password); // Хеширование пароля MD5
    const user = [
      {
        userName,
        userSurname,
        email,
        password: hashedPassword,
      },
    ];

    if (user.length > 0) {
      return res.json({
        success: true,
        user,
      });
    } else {
      return res.status(409).json({ error: "Пользователь уже существует" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Роут для аутентификации(LOGIN) пользователя
app.post("/login", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // TODO: Создать запрос на сервер
    const user = await database.getLoginUser(fullName, email, password);

    if (user) {
      return res.json({
        success: true,
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Неверный логин или пароль!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
});

// Роут для запроса на всех пользователей
app.get("/users", async (req, res) => {
  try {
    const users = await database.getUsers();
    console.log("users => ", users);

    if (users) {
      res.json({
        success: true,
        users,
      });
    } else {
      res.status(204).json({
        success: false,
        message: "No Content",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
    throw error;
  }
});

// Запуск сервера
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    return console.log(`http://localhost:${PORT}`);
  }
});
