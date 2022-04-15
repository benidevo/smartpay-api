const createBill = require("./createBill");
const getAllBills = require("./getAllBills");

module.exports = {
  create: createBill,
  list: getAllBills,
};
