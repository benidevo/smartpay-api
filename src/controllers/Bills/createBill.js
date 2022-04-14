const Bill = require("../../models/Bill");

module.exports = async (req, res) => {
  try {
    const bill = new Bill({
      ...req.body,
      salesPerson: req.user,
    });
    await bill.save();
    res.json({
      success: true,
      message: "Bill charged successfully",
      bill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
