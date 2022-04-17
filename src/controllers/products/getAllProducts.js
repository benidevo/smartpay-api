const Product = require("../../models/Product");
const AppError = require("../../utils/appError");
const { productsLogger } = require("../../utils/logger");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    productsLogger.info(`products fetched {action: "get all products"}`);
    res.json({
      success: true,
      message: "products retrieved successfully",
      products,
    });
  } catch (err) {
    productsLogger.error(`${err.message}, {action: "retrieve all products"}`);
    throw new AppError("Internal server error", 500);
  }
};
