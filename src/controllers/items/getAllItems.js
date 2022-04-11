const Item = require("../../models/Items");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.json({
      success: true,
      message: "Items retrieved successfully",
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
