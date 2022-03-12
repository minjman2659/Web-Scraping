const Joi = require('joi');

const {
  keywordScraper,
  urlScraper,
  createNewsImages,
  validateSchema,
} = require('lib');

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
    newsList = await keywordScraper(keyword, start);

    res.send(newsList);
  } catch (err) {
    next(err);
  }
};

exports.postNewsImages = async (req, res, next) => {
  const schema = Joi.object().keys({
    url: Joi.string().required(),
  });
  if (!validateSchema(res, schema, req.body)) return;

  const { url } = req.body;

  try {
    const news = await urlScraper(url);
    await createNewsImages(url, news.title);

    res.send(news);
  } catch (err) {
    next(err);
  }
};
