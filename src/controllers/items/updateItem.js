const Item = require("../../models/Items");

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, imageUrl } = req.body;

    const item = await Item.findByIdAndUpdate(id, {
      name,
      description,
      price,
      imageUrl,
    });

    res.json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      item: null,
    });
  }
};

module.exports = updateItem;
