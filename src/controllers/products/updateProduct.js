const Product = require("../../models/Product");
const AppError = require("../../utils/appError");
const { productsLogger } = require("../../utils/logger");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return new AppError("Product not found", 404);
    }
    productsLogger.info(
      `product ${product._id} ${product.name} updated {action: "update product"}`
    );
    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    productsLogger.error(`${err.message}, {action: "update product"}`);
    throw new AppError("Internal server error", 500);
  }
};

module.exports = updateProduct;
