const express = require("express");
const ItemsController = require("../controllers/items");

const router = express.Router();

router.get("/", ItemsController.showAll);

router.post("/", ItemsController.create);

router.patch("/:id", ItemsController.update);

router.delete("/:id", ItemsController.delete);

router.get("/category/:name", ItemsController.showByCategory);

module.exports = router;
