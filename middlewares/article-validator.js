const { celebrate, Joi } = require('celebrate');
const validateURL = require('./url-validator');

const validateArticle = celebrate({
  body: Joi.object()
    .keys({
      keyword: Joi.string().required().min(2).max(30),
      title: Joi.string().required().min(2),
      text: Joi.string().required().min(2),
      date: Joi.string().required().min(2).max(30),
      source: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    })
    .unknown(true),
});

module.exports = validateArticle;
