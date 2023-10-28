const express = require("express");
const database = require("./database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const md5 = require("md5");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = 3000;
const JWT_SECRET = "vincent";

// Функция создания JWT-токена
const createToken = (user) => {
  return jwt.sign(user, JWT_SECRET);
};

// Роут на удаление пользователя
app.delete("/users/:id", async (req, res) => {
  // Провекра наличия авторизационного заголовка с JWT-токеном
  console.log(req.headers);
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Не авторизован",
    });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = req.params.id;
    console.log("decodedToken", decodedToken);

    if (decodedToken.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Доступ запрещен!",
      });
    }

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
    // Если ошибка токена
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Неверный JWT-токен",
      });
    }
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

      const token = createToken({ id: newUser.insertId });
      console.log("token =>", token);

      res.cookie("token", token, {
        httpOnly: true,
        // Раскомментируйте, если используете HTTPS
        // secure: true
      });

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
      const token = createToken({ id: user[0].id });

      res.cookie("token", token, {
        httpOnly: true,
        // Раскомментируйте, если используете HTTPS
        // secure: true
      });

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

// Роути для проверки авторизации пользователя
app.get("/check-auth/:id", async (req, res) => {
  try {
    // Проверка наличия авторизационной куки
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
      return res.json({
        success: false,
        message: "Не авторизован!",
      });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    // console.log("decodedToken =>", decodedToken);
    const user = await database.getUserById(decodedToken.id);
    console.log("user check => ", user);

    if (user) {
      res.json({
        success: true,
        user,
      });
    } else {
      return res.json({
        success: false,
        message: "Не авторизован!",
      });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message: "Неверный JWT-токен",
      });
    }
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
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
