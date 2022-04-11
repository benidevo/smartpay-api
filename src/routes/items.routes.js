const express = require("express");
const ItemsController = require("../controllers/items");

const router = express.Router();

router.get("/", ItemsController.showAll);

router.post("/", ItemsController.create);

module.exports = router;
