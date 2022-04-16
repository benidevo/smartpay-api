const express = require("express");
const BillsController = require("../controllers/bills");
const auth = require("../middlewares/auth");
const { createBillValidator } = require("../middlewares/validators/bills");

const router = express.Router();

router.post("/", [auth, createBillValidator], BillsController.create);

router.get("/", auth, BillsController.list);

module.exports = router;
