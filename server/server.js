const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    return console.log(`http://localhost:${PORT}`);
  }
});
