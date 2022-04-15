const bcrypt = require("bcrypt");
const User = require("../../models/User");
const AppError = require("../../utils/appError");

const { usersLogger } = require("../../utils/logger");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    usersLogger.info(`User ${name} created, {action: user registration}`);
    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    usersLogger.info(`${error.message}, {action: "user registration }`);
    if (error.code === 11000) {
      throw new AppError("User with this email already exists");
    }
    throw new AppError("Internal server error", 500);
  }
};

module.exports = createUser;
