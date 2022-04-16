const Item = require("../../models/Items");
const AppError = require("../../utils/appError");
const { productsLogger } = require("../../utils/logger");

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Item deleted successfully",
      item,
    });
  } catch (err) {
    productsLogger.error(`${err.message}, {action: "delete product"}`);
    throw new AppError("Internal server error", 500);
  }
};

module.exports = deleteProduct;
