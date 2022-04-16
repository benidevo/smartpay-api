const { celebrate, Joi, Segments } = require("celebrate");

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    customerName: Joi.string().required(),
    phone: Joi.string().required(),
    subtotal: Joi.number().required(),
    tax: Joi.number().required(),
    total: Joi.number().required(),
    paymentMethod: Joi.string().valid("CASH", "CARD").required(),
    cartItems: Joi.array()
      .items(
        Joi.object().required().keys({
          _id: Joi.string().required(),
          name: Joi.string().required(),
          price: Joi.number().required(),
          quantity: Joi.number().required(),
          category: Joi.string().required(),
          image: Joi.string().required(),
          createdAt: Joi.date().required(),
          updatedAt: Joi.date().required(),
          __v: Joi.number().required(),
        })
      )
      .required()
      .min(1),
  }),
});
