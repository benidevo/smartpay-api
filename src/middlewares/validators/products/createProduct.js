const { celebrate, Joi, Segments } = require("celebrate");

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
  }),
});
