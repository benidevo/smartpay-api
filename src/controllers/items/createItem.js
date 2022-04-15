const Item = require("../../models/Items");

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({
      success: true,
      message: "Item created",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      items: null,
    });
  }
};

module.exports = createItem;
