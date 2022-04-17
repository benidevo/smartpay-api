const Product = require("../../models/Product");
const AppError = require("../../utils/appError");

const showByCategory = async (req, res) => {
  const { name } = req.params;
  try {
    const products = await Product.find({ category: name });
    res.json({
      success: true,
      message: "products retrieved successfully",
      products,
    });
  } catch (err) {
    console.error(err);
    throw new AppError("Internal server error", 500);
  }
};

module.exports = showByCategory;
