const express = require('express');

const v1 = express.Router();

const news = require('./news');

v1.use('/news', news);

module.exports = v1;
