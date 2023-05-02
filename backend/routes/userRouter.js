const express = require("express");
const validator = require("../middlewares/validatorMiddleware");
const { login } = require("../controllers/userController");
const { body } = require("express-validator");

const userRouter = express.Router();

userRouter
  .route("/login")
  .post(
    body("email").isEmail().withMessage("Please enter a valid email id"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length of six"),
    validator,
    login
  );

module.exports = userRouter;
