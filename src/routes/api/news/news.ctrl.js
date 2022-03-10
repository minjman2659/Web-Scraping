const Joi = require("joi");

const {
  keywordCrawler,
  urlCrawler,
  createNewsPDF,
  validateSchema,
} = require("lib");

exports.getNewsList = async (req, res, next) => {
  const schema = Joi.object().keys({
    keyword: Joi.string().min(1).required(),
    start: Joi.number().integer().min(1).allow(null).optional(),
  });

  if (!validateSchema(res, schema, req.query)) return;

  let { keyword, start } = req.query;

  if (!Number(start)) {
    start = 1;
  }

  let newsList = null;
  try {
    newsList = await keywordCrawler(keyword, start);

    res.send(newsList);
  } catch (err) {
    next(err);
  }
};

exports.postNewsPDF = async (req, res, next) => {
  const schema = Joi.object().keys({
    newsUrl: Joi.string().required(),
  });
  if (!validateSchema(res, schema, req.body)) return;

  const { newsUrl } = req.body;

  try {
    const news = await urlCrawler(newsUrl);
    await createNewsPDF(newsUrl, news.title);
    res.send(news);
  } catch (err) {
    next(err);
  }
};
