const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

//route -> /users/login
//access > Public
//method -> POST
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    next(new AppError("No user found", 404));
    return;
  }

  if (userExist.password.toString() !== password) {
    next(new AppError("Wrong credentials", 404));
    return;
  }

  res.status(200).json({ email: userExist.email, id: userExist._id });
});
