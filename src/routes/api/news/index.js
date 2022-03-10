const express = require("express");

const news = express.Router();

const { getNewsList, postNewsImages } = require("./news.ctrl");

news.get("/", getNewsList);
news.post("/", postNewsImages);

module.exports = news;
