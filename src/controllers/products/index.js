const { getAllProducts } = require("./getAllProducts");
const createProduct = require("./createProduct");
const updateProduct = require("./updateProduct");
const deleteProduct = require("./deleteProduct");
const showByCategory = require("./showByCategory");

module.exports = {
  showAll: getAllProducts,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  showByCategory: showByCategory,
};
