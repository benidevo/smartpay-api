const express = require("express");
const connectDB = require("./src/config/db");
const { appLogger } = require("./src/utils/logger");

const app = express();

app.use(express.json());

// routes
app.use("/api/items", require("./src/routes/items.routes"));
app.use("/api/auth", require("./src/routes/users.routes"));
app.use("/api/bills", require("./src/routes/bills.routes"));

const port = process.env.PORT || 8000;

connectDB();
app.listen(port, () => appLogger.info(`Server started on port ${port}`));
