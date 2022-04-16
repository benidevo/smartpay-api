const Item = require("../../models/Items");
const { productsLogger } = require("../../utils/logger");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Item(req.body);
    await newProduct.save();
    productsLogger.info(
      `product ${newProduct._id} ${newProduct.name} created {action: "create product"}`
    );
    res.status(201).json({
      success: true,
      message: "product created",
      item: newProduct,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};

module.exports = createProduct;
