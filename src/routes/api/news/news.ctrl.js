const Joi = require('joi');

const { crawler, validateSchema } = require('lib');

exports.getNewsList = async (req, res, next) => {
  const schema = Joi.object().keys({
    keyword: Joi.string().min(2).required(),
    start: Joi.number().integer().min(1).allow(null).optional(),
  });

  if (!validateSchema(res, schema, req.query)) return;

  let { keyword, start } = req.query;

  if (!Number(start)) {
    start = 1;
  }

  let result = null;
  try {
    result = await crawler(keyword, start);

    res.send(result);
  } catch (err) {
    next(err);
  }
};
