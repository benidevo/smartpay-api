const Item = require("../../models/Items");

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Item deleted successfully",
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

module.exports = deleteItem;
