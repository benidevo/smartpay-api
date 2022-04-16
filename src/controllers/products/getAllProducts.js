const Item = require("../../models/Items");
const AppError = require("../../utils/appError");
const { productsLogger } = require("../../utils/logger");

exports.getAllProducts = async (req, res) => {
  try {
    const items = await Item.find();
    productsLogger.info(`products fetched {action: "get all products"}`);
    res.json({
      success: true,
      message: "products retrieved successfully",
      items,
    });
  } catch (err) {
    productsLogger.error(`${err.message}, {action: "retrieve all products"}`);
    throw new AppError("Internal server error", 500);
  }
};
