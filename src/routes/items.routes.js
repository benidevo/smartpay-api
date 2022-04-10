const express = require("express");
const ItemsController = require("../controllers/items");

const router = express.Router();

router.get("/", ItemsController.getAllItems);

module.exports = router;
