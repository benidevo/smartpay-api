const express = require("express");
const BillsController = require("../controllers/bills");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, BillsController.create);

router.get("/", auth, BillsController.list);

module.exports = router;
