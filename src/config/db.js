const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./index");

const { appLogger } = require("../utils/logger");

let DB;
if (process.env.NODE_ENV === "TEST") {
  DB = config.test.mongoURI;
} else if (process.env.NODE_ENV === "DEV") {
  DB = config.development.mongoURI;
} else {
  DB = config.production.mongoURI;
}

const connectDB = async () => {
  mongoose.set("strictQuery", false);

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
