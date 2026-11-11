const { celebrate, Joi } = require("celebrate");

const validateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

module.exports = validateUser;
