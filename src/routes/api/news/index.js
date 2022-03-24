const express = require("express");

const news = express.Router();

const {
  getNewsList,
  postNewsImages,
  getNewsByOpenAPI,
} = require("./news.ctrl");

news.get("/scrap", getNewsList);
news.get("/", getNewsByOpenAPI);

news.post("/", postNewsImages);

module.exports = news;
