const { celebrate, Joi } = require('celebrate');

const validateUserLogin = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
});

const validateUserSignup = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
});

module.exports = { validateUserLogin, validateUserSignup };
