const express = require("express");
const UserController = require("../controllers/users");
const userValidator  = require("../middlewares/validators/users/createUser");

const router = express.Router();

router.post("/register", UserController.create);
router.post("/login", UserController.login);

module.exports = router;
