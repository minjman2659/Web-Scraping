const Joi = require('joi');

const { crawler, validateSchema } = require('lib');

exports.getNewsList = async (req, res, next) => {
  const schema = Joi.object().keys({
    keyword: Joi.string().min(2).required(),
    start: Joi.number().integer().min(1).required(),
  });

  if (!validateSchema(res, schema, req.query)) return;

  const { keyword, start } = req.query;

  let result = null;
  try {
    result = await crawler(keyword, start);

    res.send(result);
  } catch (err) {
    next(err);
  }
};
