const keywordCrawler = require("./keyword-crawler");
const urlCrawler = require("./url-crawler");
const validateSchema = require("./validate-schema");
const imagesDir = require("./images-dir");
const getToday = require("./get-today");
const getHtml = require("./get-html");
const createNewsPDF = require("./create-newsPDF");

module.exports = {
  keywordCrawler,
  urlCrawler,
  validateSchema,
  imagesDir,
  getToday,
  getHtml,
  createNewsPDF,
};
