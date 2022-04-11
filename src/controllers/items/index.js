const { getAllItems } = require("./getAllItems");
const createItem = require("./createItem");

module.exports = {
  showAll: getAllItems,
  create: createItem,
};
