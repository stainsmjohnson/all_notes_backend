const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(cors);

const verifyToken = (req, res, next) => {
  console.log("VERIFYING TOKEN");
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  if (token === "abcd") next();
  else res.send('{"hell":"heell}');
};

//STATIC
const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

//DATABASE
mongoose.connect(
  MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DATABASE CONNECTED");
  }
);

//SERVE HTML
app.use("/", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//MIDDLEWARES
app.use(express.json());

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

//ROUTES
app.use("/api/user", authRoute);
app.use("/api/posts", verifyToken, postsRoute);

//SERVER
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT~~ ${PORT}`);
});
