const { getAllItems } = require("./getAllItems");
const createItem = require("./createItem");
const updateItem = require("./updateItem");
const deleteItem = require("./deleteItem");

module.exports = {
  showAll: getAllItems,
  create: createItem,
  update: updateItem,
  delete: deleteItem,
};
