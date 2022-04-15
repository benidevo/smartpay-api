const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../models/User");
const { usersLogger } = require("../../utils/logger");
const AppError = require("../../utils/appError");

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 360000,
    });
    usersLogger.info(
      `User ${user.name} -${user._id} logged in, {action: user login}`
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    usersLogger.error(`${error.message}, {action: "user login"}`);
    throw new AppError("Internal server error", 500);
  }
};

module.exports = authenticateUser;
