const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const helmet = require("helmet");
require("express-async-errors");
const { appLogger } = require("./src/utils/logger");
const errorHandler = require("./src/utils/errorHandler");
const rateLimiter = require("./src/middlewares/rateLimiter");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === "PROD") {
  app.use(rateLimiter);
}
// routes
app.use("/api/products", require("./src/routes/products.routes"));
app.use("/api/auth", require("./src/routes/users.routes"));
app.use("/api/bills", require("./src/routes/bills.routes"));
app.use(errorHandler);

const port = process.env.PORT || 8000;

connectDB();
app.listen(port, () => appLogger.info(`Server started on port ${port}`));
