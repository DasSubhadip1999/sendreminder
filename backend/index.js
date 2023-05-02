require("dotenv").config();
require("colors");
const express = require("express");
const { errorHanlder } = require("./middlewares/errorHanlder");
const AppError = require("./utils/AppError");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/userRouter");
const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to send reminder api" });
});
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHanlder);

app.listen(PORT, () =>
  console.log(`sendreminder: Server started on port ${PORT}`.yellow.underline)
);
