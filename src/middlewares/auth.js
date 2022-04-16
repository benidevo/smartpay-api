const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
require("dotenv").config();

const { usersLogger } = require("../utils/logger");

const auth = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    throw new AppError("Access denied, no token provided", 401);
  }

  token = token.split(" ")[1];

  try {
    user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user.id;
    next();
  } catch (error) {
    usersLogger.error(`${error.message}, {action: "authenticate user"}`);
    throw new AppError("Invalid token", 401);
  }
};

module.exports = auth;
