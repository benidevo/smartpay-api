const express = require("express");
const productsController = require("../controllers/products");
const {
  createProductValidator,
  updateProductValidator,
  filterProductValidator,
} = require("../middlewares/validators/products");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, productsController.showAll);

router.post("/", [auth, createProductValidator], productsController.create);

router.patch("/:id", [auth, updateProductValidator], productsController.update);

router.delete("/:id", auth, productsController.delete);

router.get(
  "/category/:name",
  [auth, filterProductValidator],
  productsController.showByCategory
);

module.exports = router;
