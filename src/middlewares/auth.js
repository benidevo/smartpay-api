const jwt = require("jsonwebtoken");
require("dotenv").config();

const { usersLogger } = require("../utils/logger");

const auth = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({
      errors: [
        {
          msg: "Access denied. No token provided.",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    user = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = user.id;
    next();
  } catch (error) {
    usersLogger.error(`${error.message}, {action: "authenticate user"}`);
    res.status(401).json({ errors: [{ msg: "invalid token" }] });
  }
};

module.exports = auth;
