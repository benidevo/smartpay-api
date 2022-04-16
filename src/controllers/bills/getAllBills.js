const Bill = require("../../models/Bill");
const AppError = require("../../utils/appError");

const { billsLogger } = require("../../utils/logger");

module.exports = async (req, res) => {
  try {
    const bills = await Bill.find().sort("-createdAt");

    res.json({
      success: true,
      message: "Bills retrieved successfully",
      bills,
    });
  } catch (error) {
    billsLogger.error(`${error.message}, {action: "retrieve all bills"}`);
    throw new AppError("Internal server error", 500);
  }
};
