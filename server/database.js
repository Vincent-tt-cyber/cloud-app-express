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
  getUsersQuery = "SELECT * FROM `users`";
  let [rows] = await poolPromise.query(getUsersQuery);
  return rows;
};

module.exports.getLoginUser = async (fullName, email, password) => {
  getUserLoginQuery =
    "SELECT `fullName`, `email`, `password`, `avatarUrl` FROM `users` WHERE fullName = ? AND email = ? AND password = ?";
  try {
    let [rows] = await poolPromise.query(getUserLoginQuery, [
      fullName,
      email,
      password,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
