const bcrypt = require("bcrypt");
const User = require("../../models/User");

const createItem = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    // console.log(newUser);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      items: null,
    });
  }
};

module.exports = createItem;
