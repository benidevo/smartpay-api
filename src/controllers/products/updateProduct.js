const Item = require("../../models/Items");
const AppError = require("../../utils/appError");
const { productsLogger } = require("../../utils/logger");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndUpdate(id, {
      ...req.body,
    });
    productsLogger.info(
      `product ${item._id} ${item.name} updated {action: "update product"}`
    );
    res.json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch (err) {
    productsLogger.error(`${err.message}, {action: "update product"}`);
    throw new AppError("Internal server error", 500);
  }
};

module.exports = updateProduct;
