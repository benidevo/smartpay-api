const Bill = require("../../models/Bill");

const { billsLogger } = require("../../utils/logger");

module.exports = async (req, res) => {
  try {
    const bill = new Bill({
      ...req.body,
      salesPerson: req.user,
    });
    await bill.save();
    billsLogger.info(`${bill.id}, {action: "charge bill"}`);
    res.json({
      success: true,
      message: "Bill charged successfully",
      bill,
    });
  } catch (error) {
    billsLogger.error(`${error.message}, {action: "charge bill"}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
