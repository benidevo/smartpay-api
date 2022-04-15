const Bill = require("../../models/Bill");

const { billsLogger } = require("../../utils/logger");

module.exports = async (req, res) => {
  try {
    const bills = await Bill.find().sort("-createdAt");

    res.json({
      success: true,
      message: "Bill charged successfully",
      bills,
    });
  } catch (error) {
    billsLogger.error(`${error.message}, {action: "retrieve all bills"}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
