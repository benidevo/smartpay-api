const express = require("express");
const BillsController = require("../controllers/bills");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, BillsController.create);

module.exports = router;
