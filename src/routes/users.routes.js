const express = require("express");
const UserController = require("../controllers/users");
const userValidator  = require("../middlewares/validators/users");

const router = express.Router();

router.post("/register", [userValidator.create], UserController.create);
router.post("/login", UserController.login);

module.exports = router;
