const express = require("express");

const news = express.Router();

const { getNewsList, postNewsPDF } = require("./news.ctrl");

news.get("/", getNewsList);
news.post("/", postNewsPDF);

module.exports = news;
