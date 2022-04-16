const Product = require("../../models/Product");
const { productsLogger } = require("../../utils/logger");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    productsLogger.info(
      `product ${newProduct._id} ${newProduct.name} created {action: "create product"}`
    );
    res.status(201).json({
      success: true,
      message: "product created",
      product: newProduct,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};

module.exports = createProduct;
