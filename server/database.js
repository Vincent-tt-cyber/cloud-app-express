const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "Users_bd",
  password: "root",
});

const poolPromise = pool.promise();

// Получение всех пользователей с БД
module.exports.getUsers = async () => {
  try {
    getUsersQuery = "SELECT * FROM `users`";
    let [rows] = await poolPromise.query(getUsersQuery);
    return rows;
  } catch (error) {
    return error;
  }
};

// Получение пользователя по ID
module.exports.getUserById = async (id) => {
  try {
    const getUserByIdQuery = "SELECT * FROM `users` WHERE `id` = ?";
    const [rows] = await poolPromise.query(getUserByIdQuery, [id]);
    return rows;  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Регистрация пользователя
module.exports.registerUser = async (name, surname, email, password) => {
  try {
    const registerUserQuery =
      "INSERT INTO `users`(`name`, `surname`, `email`, `password`) VALUES (?,?,?,?)";
    let [rows] = await poolPromise.query(registerUserQuery, [
      name,
      surname,
      email,
      password,
    ]);
    return rows;
  } catch (error) {
    return error;
  }
};

// Проверка пользоателя на авторизацию (имеется ли в БД)
module.exports.getLoginUser = async (email, password) => {
  try {
    const getUserLoginQuery =
      "SELECT * FROM `users` WHERE email = ? AND password = ?";
    let [rows] = await poolPromise.query(getUserLoginQuery, [email, password]);
    // console.log("rows => ", rows);
    return rows;
  } catch (error) {
    return error;
  }
};

// Удаление пользователя из БД
module.exports.deleteUser = async (id) => {
  try {
    const deleteUserQuery = "DELETE FROM `users` WHERE `id` = ?";
    let [rows] = await poolPromise.query(deleteUserQuery, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
