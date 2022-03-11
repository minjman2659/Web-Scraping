const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const { missingPath, errorHandler } = require("middleware");
const { imagesDir } = require("lib");
const routes = require("./routes");

const template = path.join(__dirname, "../public", "index.html");
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "30mb" }));

app.get("/", (req, res) => {
  res.sendFile(template);
});
app.use("/", routes);
app.use(missingPath);
app.use(errorHandler);

module.exports = app;
