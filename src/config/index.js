require("dotenv").config();

module.exports = {
  test: {
    mongoURI: process.env.MONGO_URI_TEST,
  },
  development: {
    mongoURI: process.env.MONGO_URI_DEV,
  },
  production: {
    mongoURI: process.env.MONGO_URI_PROD,
  },
};
