const { celebrate, Joi, Segments } = require("celebrate");

module.exports = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    image: Joi.string().optional(),
    category: Joi.string().optional(),
  }),
});
