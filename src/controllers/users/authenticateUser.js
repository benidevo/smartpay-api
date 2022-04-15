const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();
const { usersLogger } = require("../../utils/logger");

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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
    let token;
    try {
      token = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 360000,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
    usersLogger.info(`${user.id}, {action: "user login"}`);
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    usersLogger.error(`${error.message}, {action: "user login"}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      items: null,
    });
  }
};

module.exports = authenticateUser;
