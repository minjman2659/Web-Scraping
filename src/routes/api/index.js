const express = require("express");

const api = express.Router();

const news = require("./news");

api.use("/news", news);

module.exports = api;
