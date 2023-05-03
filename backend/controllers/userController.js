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

  const is24hCrossed =
    Date.now() >
    new Date(userExist.lastLoginTime).getTime() + 24 * 60 * 60 * 1000;

  if (userExist.loginCount >= 5 && !is24hCrossed) {
    res.status(401).json({
      message: "maximum login try exceeded",
      time: userExist.lastLoginTime,
    });
    return;
  } else {
    await User.findByIdAndUpdate(userExist._id, {
      $set: { loginCount: 0 },
    });
  }

  if (userExist.password.toString() !== password) {
    const loginCount = userExist.loginCount + 1;
    await User.findByIdAndUpdate(userExist._id, {
      $set: { loginCount },
    });

    if (loginCount > 4) {
      await User.findByIdAndUpdate(userExist._id, {
        $set: { lastLoginTime: new Date().getTime() },
      });
    }

    next(new AppError("Wrong credentials", 404));
    return;
  }

  res.status(200).json({ email: userExist.email, id: userExist._id });
});
