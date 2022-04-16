const Bill = require("../../models/Bill");
const AppError = require("../../utils/appError");

const { billsLogger } = require("../../utils/logger");

module.exports = async (req, res) => {
  try {
    const bill = new Bill({
      ...req.body,
      salesPerson: req.user,
    });
    await bill.save();
    billsLogger.info(
      `Bill ${bill._id} created for ${bill.customerName}, {action: charge bill}`
    );
    res.status(201).json({
      success: true,
      message: "Bill charged successfully",
      bill,
    });
  } catch (error) {
    billsLogger.error(`${error.message}, {action: "charge bill"}`);
    throw new AppError("Internal server error", 500);
  }
};
