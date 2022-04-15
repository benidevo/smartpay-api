const mongoose = require("mongoose");
require("dotenv").config();

const { appLogger } = require("../utils/logger");

const DB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    appLogger.info("Connected to MongoDB");
  } catch (error) {
    appLogger.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
