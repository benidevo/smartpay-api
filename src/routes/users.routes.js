const express = require("express");
const UserController = require("../controllers/users");
const {
  loginValidator,
  registerValidator,
} = require("../middlewares/validators/users");

const router = express.Router();

router.post("/register", registerValidator, UserController.create);
router.post("/login", loginValidator, UserController.login);

module.exports = router;
