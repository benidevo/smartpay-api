const { getAllProducts } = require("./getAllItems");
const createProduct = require("./createItem");
const updateProduct = require("./updateItem");
const deleteProduct = require("./deleteItem");
const showByCategory = require("./showByCategory");

module.exports = {
  showAll: getAllProducts,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  showByCategory: showByCategory,
};
