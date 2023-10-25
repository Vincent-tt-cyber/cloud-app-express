const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

// Роут для аутентификации пользователя
app.post("/login", async (req, res) => {
  try {
    const { userName, email, password } = rea.body;
    // TODO: Создать запрос на сервер
    const user = await null;

    if (user) {
      // ...
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Неверное имя пользователя или пароль!",
    });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    return console.log(`http://localhost:${PORT}`);
  }
});
