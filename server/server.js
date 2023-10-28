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

// Роут на удаление пользователя
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await database.deleteUser(userId);
    console.log("user => ", user);
    if (user.affectedRows > 0) {
      return res.json({
        success: true,
        message: `Пользователь c id:${userId} был удален`,
      });
    } else {
      return res.status(409).json({
        success: true,
        message: `Пользователь c id:${userId} не был удален`,
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

// Роут на регистрацию нового пользователя
app.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const hashedPassword = md5(password); // Хеширование пароля MD5
    // console.log(hashedPassword);
    const user = await database.getLoginUser(email, hashedPassword);

    if (user.length > 0) {
      // console.log("user from login", user);
      // console.log("Пользователь из DB =>", user);
      return res.status(409).json({
        success: false,
        message: "Такой email уже существует.",
      });
    } else {
      const newUser = await database.registerUser(
        name,
        surname,
        email,
        hashedPassword
      );
      // console.log(newUser);
      return res.json({
        message: "Регистрация прошла успешно!",
        user: {
          id: newUser.insertId,
          name,
          surname,
          email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Роут для аутентификации(LOGIN) пользователя
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = md5(password);
    const user = await database.getLoginUser(email, hashedPassword);
    // console.log("userLogin", user);
    if (user.length > 0) {
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
    // console.log(users);
    if (users.length > 0) {
      return res.json({
        success: true,
        users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
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
