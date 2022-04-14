const express = require("express");
const connectDB = require("./src/config/db");
connectDB();

const app = express();

app.use(express.json());

// routes
app.use("/api/items", require("./src/routes/items.routes"));
app.use("/api/auth", require("./src/routes/users.routes"));
app.use("/api/bills", require("./src/routes/bills.routes"));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
