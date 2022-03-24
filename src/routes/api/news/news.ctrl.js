const Joi = require('joi');

const {
  keywordScraper,
  urlScraper,
  createNewsImages,
  validateSchema,
  getNewsFromOpenAPI,
} = require('lib');

exports.getNewsByOpenAPI = async (req, res, next) => {
  const schema = Joi.object().keys({
    query: Joi.string().min(1).required(), // 검색어 (required)
    display: Joi.number().integer().min(10).max(100).optional(), // 출력 개수 (default: 10)
    start: Joi.number().integer().min(1).max(1000).optional(), // 검색 시작 위치 (default: 1)
    sort: Joi.string().valid('sim', 'date').optional(), // sim: 유사도순 , date: 날짜순 (default: date)
  });

  if (!validateSchema(res, schema, req.query)) return;

  const { query, display, start, sort } = req.query;

  let queryUrl = `query=${encodeURI(query)}`;
  if (display) {
    queryUrl += `&display=${display}`;
  }
  if (start) {
    queryUrl += `&start=${start}`;
  }
  if (sort) {
    queryUrl += `&sort=${encodeURI(sort)}`;
  }

  let news = null;
  try {
    news = await getNewsFromOpenAPI(queryUrl);
  } catch (err) {
    next(err);
    return;
  }

  res.send(news);
};

exports.getScrapNewsList = async (req, res, next) => {
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

exports.postScrapNewsImages = async (req, res, next) => {
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
