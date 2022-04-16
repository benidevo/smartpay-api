const express = require("express");
const ItemsController = require("../controllers/items");
const {
  createProductValidator,
  updateProductValidator,
  filterProductValidator,
} = require("../middlewares/validators/products");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, ItemsController.showAll);

router.post("/", [auth, createProductValidator], ItemsController.create);

router.patch("/:id", [auth, updateProductValidator], ItemsController.update);

router.delete("/:id", auth, ItemsController.delete);

router.get(
  "/category/:name",
  [auth, filterProductValidator],
  ItemsController.showByCategory
);

module.exports = router;
