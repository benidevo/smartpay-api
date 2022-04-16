const Item = require("../../models/Product");

const showByCategory = async (req, res) => {
  const { name } = req.params;
  try {
    const items = await Item.find({ category: name });
    res.json({
      success: true,
      message: "products retrieved successfully",
      items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      items: null,
    });
  }
};

module.exports = showByCategory;
