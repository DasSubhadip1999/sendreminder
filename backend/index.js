require("dotenv").config();
require("colors");
const express = require("express");
const { errorHanlder } = require("./middlewares/errorHanlder");
const AppError = require("./utils/AppError");
const { connectDB } = require("./config/db");
const PORT = process.env.PORT;

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to send reminder api" });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHanlder);

app.listen(PORT, () =>
  console.log(`sendreminder: Server started on port ${PORT}`.yellow.underline)
);
