const express = require('express');

const news = express.Router();

const { getNewsList } = require('./news.ctrl');

news.get('/', getNewsList);

module.exports = news;
