const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

connectDB();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
