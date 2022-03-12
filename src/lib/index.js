const keywordScraper = require('./keyword-scraper');
const urlScraper = require('./url-scraper');
const validateSchema = require('./validate-schema');
const imagesDir = require('./images-dir');
const getToday = require('./get-today');
const getHtml = require('./get-html');
const createNewsImages = require('./create-news-images');

module.exports = {
  keywordScraper,
  urlScraper,
  validateSchema,
  imagesDir,
  getToday,
  getHtml,
  createNewsImages,
};
